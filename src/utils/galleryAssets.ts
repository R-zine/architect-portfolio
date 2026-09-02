import galleryAssets from "../generated/gallery-assets.json";
import type { GalleryAsset } from "../types";

const assetManifest: Record<string, GalleryAsset> = galleryAssets;

export function getGalleryAsset(sourcePath: string): GalleryAsset {
  const asset = assetManifest[sourcePath];
  if (!asset)
    throw new Error(`Missing generated gallery asset for ${sourcePath}`);
  return asset;
}
