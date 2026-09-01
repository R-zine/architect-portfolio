import galleryAssets from "../generated/gallery-assets.json";

export function getGalleryAsset(sourcePath) {
  const asset = galleryAssets[sourcePath];
  if (!asset)
    throw new Error(`Missing generated gallery asset for ${sourcePath}`);
  return asset;
}
