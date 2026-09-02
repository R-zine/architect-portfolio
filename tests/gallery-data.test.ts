import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import data from "../src/components/Buildings/galleryData";
import galleryAssets from "../src/generated/gallery-assets.json";
import type { GalleryAsset } from "../src/types";

const workspace = path.resolve(import.meta.dirname, "..");
const assetManifest: Record<string, GalleryAsset> = galleryAssets;

function isStringRecord(value: unknown): value is Record<string, string> {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.values(value).every((entry) => typeof entry === "string")
  );
}

const parsedSourceMap: unknown = JSON.parse(
  readFileSync(path.join(workspace, "assets", "gallery-sources.json"), "utf8"),
);
if (!isStringRecord(parsedSourceMap)) {
  throw new Error("Gallery source map must contain string path mappings.");
}
const sourceMap: Record<string, string> = parsedSourceMap;

describe("gallery data", () => {
  const entries = Object.values(data).flat();

  it("has a generated responsive asset for every portfolio item", () => {
    for (const item of entries) {
      expect(assetManifest[item.source], item.source).toBeDefined();
      expect(item.srcSet).toMatch(/\d+w/);
      expect(
        existsSync(
          path.join(workspace, "public", item.full.replace(/^\//, "")),
        ),
      ).toBe(true);
    }
  });

  it("uses exact-case source paths that resolve to canonical originals", () => {
    for (const item of entries) {
      const canonical = sourceMap[item.source];
      expect(canonical, item.source).toBeDefined();
      if (!canonical)
        throw new Error(`Missing source mapping for ${item.source}`);
      expect(
        existsSync(
          path.join(workspace, "assets", "gallery-originals", canonical),
        ),
        `${item.source} -> ${canonical}`,
      ).toBe(true);
    }
  });

  it("only links to known categories", () => {
    for (const item of entries.filter((entry) => entry.path !== "none")) {
      expect(data[item.path], `${item.source} -> ${item.path}`).toBeDefined();
    }
  });

  it("has stable, unique source keys inside each category", () => {
    for (const [category, items] of Object.entries(data)) {
      expect(new Set(items.map((item) => item.source)).size, category).toBe(
        items.length,
      );
    }
  });
});
