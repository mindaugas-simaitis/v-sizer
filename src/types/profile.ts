import { SizeMapping } from '../data/sizingData';

export interface Profile {
  id: string;
  name: string;
  gender: 'men' | 'women';
  measurements: {
    height: string;
    weight: string;
    heightUnit: 'cm' | 'ft';
    weightUnit: 'kg' | 'lbs';
  };
  selectedSize: SizeMapping;
  createdAt: string;
}
