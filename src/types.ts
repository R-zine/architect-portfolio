import type { CSSProperties } from "react";

export type Language = 0 | 1;

export type LocalizedText = readonly [bulgarian: string, english: string];

export interface GalleryAsset {
  src: string;
  full: string;
  srcSet: string;
  width: number;
  height: number;
}

export interface GalleryItem extends Omit<GalleryAsset, "src"> {
  source: string;
  img: string;
  path: string;
  desc?: LocalizedText;
}

export type GalleryData = Record<string, readonly GalleryItem[]>;

export type CSSPropertiesWithVariables = CSSProperties &
  Record<`--${string}`, string | number>;
