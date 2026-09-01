import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import data from "../src/components/Buildings/buildings";
import galleryAssets from "../src/generated/gallery-assets.json";

const workspace = path.resolve(import.meta.dirname, "..");
const sourceMap = JSON.parse(
  readFileSync(path.join(workspace, "assets", "gallery-sources.json"), "utf8"),
);

describe("gallery data", () => {
  const entries = Object.values(data).flat();

  it("has a generated responsive asset for every portfolio item", () => {
    for (const item of entries) {
      expect(galleryAssets[item.source], item.source).toBeDefined();
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
