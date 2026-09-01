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

async function listImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listImages(absolutePath)));
    else if (supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(absolutePath);
    }
  }

  return files;
}

function relativeSource(absolutePath) {
  return path.relative(sourceRoot, absolutePath).split(path.sep).join("/");
}

function logicalPath(relativePath) {
  return `./img/${relativePath}`;
}

async function loadExistingSourceMap() {
  try {
    return JSON.parse(await readFile(sourceMapPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

async function hashFile(filePath) {
  return createHash("sha256")
    .update(await readFile(filePath))
    .digest("hex");
}

async function buildSourceMap(files) {
  const existing = await loadExistingSourceMap();
  const groups = new Map();

  for (const filePath of files) {
    const hash = await hashFile(filePath);
    const relativePath = relativeSource(filePath);
    const group = groups.get(hash) ?? [];
    group.push(relativePath);
    groups.set(hash, group);
  }

  const aliases = { ...existing };
  const canonicalFiles = new Map();

  for (const [hash, relativePaths] of groups) {
    relativePaths.sort((a, b) => a.localeCompare(b));
    const preferredExisting = Object.values(existing).find((candidate) =>
      relativePaths.includes(candidate),
    );
    const canonical = preferredExisting ?? relativePaths[0];
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

async function createVariants(relativePath, hash) {
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
  const variants = [];

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

  return {
    src: variants[0].src,
    full: variants.at(-1).src,
    srcSet: variants.map(({ src, width }) => `${src} ${width}w`).join(", "),
    width: variants.at(-1).width,
    height: variants.at(-1).height,
  };
}

async function main() {
  await mkdir(outputRoot, { recursive: true });
  await mkdir(path.dirname(runtimeManifestPath), { recursive: true });

  const files = await listImages(sourceRoot);
  const { aliases, canonicalFiles } = await buildSourceMap(files);
  const assetsByCanonical = new Map();

  for (const [relativePath, hash] of canonicalFiles) {
    assetsByCanonical.set(
      relativePath,
      await createVariants(relativePath, hash),
    );
  }

  const manifest = Object.fromEntries(
    Object.entries(aliases)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([alias, canonical]) => [alias, assetsByCanonical.get(canonical)]),
  );

  if (Object.values(manifest).some((asset) => !asset)) {
    throw new Error("Gallery source map points to a missing canonical image.");
  }

  const expectedOutputs = new Set(
    Object.values(manifest).flatMap((asset) =>
      asset.srcSet
        .split(", ")
        .map((entry) => path.basename(entry.split(" ")[0])),
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
