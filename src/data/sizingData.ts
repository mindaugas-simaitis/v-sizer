import { womenSizes, menSizes, regions } from './sizeMappings';

export type Region =
  | keyof (typeof regions.women)[0]
  | keyof (typeof regions.men)[0];

export interface SizeMapping {
  global: string;
  [key: string]: string;
}

export interface SizeData {
  men: SizeMapping[];
  women: SizeMapping[];
}

export const sizeData: SizeData = {
  women: womenSizes,
  men: menSizes,
};

// Helper function to get all available sizes for a specific region
export const getAvailableSizes = (
  gender: 'men' | 'women',
  region: Region
): string[] => {
  return [
    ...new Set(
      sizeData[gender].map((size) => size[region as keyof SizeMapping])
    ),
  ];
};

// Helper function to convert between regions
export const convertSize = (
  gender: 'men' | 'women',
  value: string,
  fromRegion: Region,
  toRegion: Region
): string | null => {
  const sizeMapping = sizeData[gender].find(
    (size) => size[fromRegion as keyof SizeMapping] === value
  );
  return sizeMapping ? sizeMapping[toRegion as keyof SizeMapping] : null;
};
