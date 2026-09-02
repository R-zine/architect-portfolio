import { createHash } from "node:crypto";
import {
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";
import type { GalleryAsset } from "../src/types";

type SourceMap = Record<string, string>;

interface ImageVariant {
  src: string;
  width: number;
  height: number;
}

interface SourceMapBuild {
  aliases: SourceMap;
  canonicalFiles: Map<string, string>;
}

const workspace = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const sourceRoot = path.join(workspace, "assets", "gallery-originals");
const outputRoot = path.join(workspace, "public", "img");
const sourceMapPath = path.join(workspace, "assets", "gallery-sources.json");
const runtimeManifestPath = path.join(
  workspace,
  "src",
  "generated",
  "gallery-assets.json",
);
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);
const shouldDedupeSources = process.argv.includes("--dedupe-sources");

async function listImages(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listImages(absolutePath)));
    else if (supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(absolutePath);
    }
  }

  return files;
}

function relativeSource(absolutePath: string): string {
  return path.relative(sourceRoot, absolutePath).split(path.sep).join("/");
}

function logicalPath(relativePath: string): string {
  return `./img/${relativePath}`;
}

function isStringRecord(value: unknown): value is SourceMap {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.values(value).every((entry) => typeof entry === "string")
  );
}

function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}

async function loadExistingSourceMap(): Promise<SourceMap> {
  try {
    const parsed: unknown = JSON.parse(await readFile(sourceMapPath, "utf8"));
    if (!isStringRecord(parsed)) {
      throw new Error("Gallery source map must contain string path mappings.");
    }
    return parsed;
  } catch (error) {
    if (isErrnoException(error) && error.code === "ENOENT") return {};
    throw error;
  }
}

async function hashFile(filePath: string): Promise<string> {
  return createHash("sha256")
    .update(await readFile(filePath))
    .digest("hex");
}

async function buildSourceMap(
  files: readonly string[],
): Promise<SourceMapBuild> {
  const existing = await loadExistingSourceMap();
  const groups = new Map<string, string[]>();

  for (const filePath of files) {
    const hash = await hashFile(filePath);
    const relativePath = relativeSource(filePath);
    const group = groups.get(hash) ?? [];
    group.push(relativePath);
    groups.set(hash, group);
  }

  const aliases = { ...existing };
  const canonicalFiles = new Map<string, string>();

  for (const [hash, relativePaths] of groups) {
    relativePaths.sort((a, b) => a.localeCompare(b));
    const preferredExisting = Object.values(existing).find((candidate) =>
      relativePaths.includes(candidate),
    );
    const canonical = preferredExisting ?? relativePaths[0];
    if (!canonical) throw new Error(`Image hash group ${hash} is empty.`);
    canonicalFiles.set(canonical, hash);

    for (const relativePath of relativePaths) {
      aliases[logicalPath(relativePath)] = canonical;
    }
  }

  for (const [alias, canonical] of Object.entries(aliases)) {
    try {
      await stat(path.join(sourceRoot, canonical));
    } catch {
      delete aliases[alias];
    }
  }

  return { aliases, canonicalFiles };
}

async function createVariants(
  relativePath: string,
  hash: string,
): Promise<GalleryAsset> {
  const inputPath = path.join(sourceRoot, relativePath);
  const metadata = await sharp(inputPath, { failOn: "warning" })
    .rotate()
    .metadata();
  const sourceWidth = metadata.autoOrient?.width ?? metadata.width;
  const sourceHeight = metadata.autoOrient?.height ?? metadata.height;

  if (!sourceWidth || !sourceHeight) {
    throw new Error(`Could not read image dimensions for ${relativePath}`);
  }

  const widths = [
    ...new Set([480, 960, 1920].map((width) => Math.min(width, sourceWidth))),
  ];
  const variants: ImageVariant[] = [];

  for (const width of widths) {
    const filename = `${hash.slice(0, 20)}-${width}.webp`;
    const outputPath = path.join(outputRoot, filename);

    try {
      await stat(outputPath);
    } catch {
      const quality = width <= 480 ? 68 : width <= 960 ? 76 : 84;
      await sharp(inputPath, { failOn: "warning" })
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ effort: 5, quality, smartSubsample: true })
        .toFile(outputPath);
    }

    variants.push({
      src: `/img/${filename}`,
      width,
      height: Math.round((sourceHeight / sourceWidth) * width),
    });
  }

  const firstVariant = variants[0];
  const lastVariant = variants.at(-1);
  if (!firstVariant || !lastVariant) {
    throw new Error(`No responsive variants were created for ${relativePath}`);
  }

  return {
    src: firstVariant.src,
    full: lastVariant.src,
    srcSet: variants.map(({ src, width }) => `${src} ${width}w`).join(", "),
    width: lastVariant.width,
    height: lastVariant.height,
  };
}

async function main() {
  await mkdir(outputRoot, { recursive: true });
  await mkdir(path.dirname(runtimeManifestPath), { recursive: true });

  const files = await listImages(sourceRoot);
  const { aliases, canonicalFiles } = await buildSourceMap(files);
  const assetsByCanonical = new Map<string, GalleryAsset>();

  for (const [relativePath, hash] of canonicalFiles) {
    assetsByCanonical.set(
      relativePath,
      await createVariants(relativePath, hash),
    );
  }

  const manifestEntries = Object.entries(aliases)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([alias, canonical]) => {
      const asset = assetsByCanonical.get(canonical);
      if (!asset) {
        throw new Error(`Missing optimized asset for ${canonical}.`);
      }
      return [alias, asset] as const;
    });
  const manifest: Record<string, GalleryAsset> =
    Object.fromEntries(manifestEntries);

  const expectedOutputs = new Set(
    Object.values(manifest).flatMap((asset) =>
      asset.srcSet
        .split(", ")
        .map((entry) => path.basename(entry.split(" ")[0] ?? entry)),
    ),
  );

  for (const output of await readdir(outputRoot, { withFileTypes: true })) {
    if (output.isFile() && !expectedOutputs.has(output.name)) {
      await rm(path.join(outputRoot, output.name));
    }
  }

  await writeFile(sourceMapPath, `${JSON.stringify(aliases, null, 2)}\n`);
  await writeFile(
    runtimeManifestPath,
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  if (shouldDedupeSources) {
    const canonicalSet = new Set(canonicalFiles.keys());
    for (const filePath of files) {
      if (!canonicalSet.has(relativeSource(filePath))) await rm(filePath);
    }
  }

  console.log(
    `Optimized ${Object.keys(aliases).length} logical images from ${canonicalFiles.size} unique sources.`,
  );
}

await main();
