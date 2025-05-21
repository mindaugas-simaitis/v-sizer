export interface SizeMapping {
  descriptive: string;
  france_spain_portugal: string;
  us: string;
  uk_au: string;
  de_dk_ch: string;
  italy: string;
  japan: string;
  brazil: string;
  russia: string;
}

export interface SizeData {
  men: SizeMapping[];
  women: SizeMapping[];
}

export const sizeData: SizeData = {
  women: [
    {
      descriptive: 'XXS',
      france_spain_portugal: '32',
      us: '0',
      uk_au: '4',
      de_dk_ch: '30',
      italy: '36',
      japan: '3',
      brazil: '34',
      russia: '38',
    },
    {
      descriptive: 'XS',
      france_spain_portugal: '34',
      us: '2',
      uk_au: '6',
      de_dk_ch: '32',
      italy: '38',
      japan: '5',
      brazil: '36',
      russia: '40',
    },
    {
      descriptive: 'S',
      france_spain_portugal: '36',
      us: '4',
      uk_au: '8',
      de_dk_ch: '34',
      italy: '40',
      japan: '7',
      brazil: '38',
      russia: '42',
    },
    {
      descriptive: 'M',
      france_spain_portugal: '38',
      us: '6',
      uk_au: '10',
      de_dk_ch: '36',
      italy: '42',
      japan: '9',
      brazil: '40',
      russia: '44',
    },
    {
      descriptive: 'L',
      france_spain_portugal: '40',
      us: '8',
      uk_au: '12',
      de_dk_ch: '38',
      italy: '44',
      japan: '11',
      brazil: '42',
      russia: '46',
    },
    {
      descriptive: 'XL',
      france_spain_portugal: '42',
      us: '10',
      uk_au: '14',
      de_dk_ch: '40',
      italy: '46',
      japan: '13',
      brazil: '44',
      russia: '48',
    },
    {
      descriptive: 'XXL',
      france_spain_portugal: '44',
      us: '12',
      uk_au: '16',
      de_dk_ch: '42',
      italy: '48',
      japan: '15',
      brazil: '46',
      russia: '50',
    },
    {
      descriptive: 'XXXL',
      france_spain_portugal: '46',
      us: '14',
      uk_au: '18',
      de_dk_ch: '44',
      italy: '50',
      japan: '17',
      brazil: '48',
      russia: '52',
    },
    {
      descriptive: 'XXXXL',
      france_spain_portugal: '48',
      us: '16',
      uk_au: '20',
      de_dk_ch: '46',
      italy: '52',
      japan: '19',
      brazil: '50',
      russia: '54',
    },
  ],
  men: [
    {
      descriptive: 'XXS',
      france_spain_portugal: '32',
      us: '0',
      uk_au: '4',
      de_dk_ch: '30',
      italy: '36',
      japan: '3',
      brazil: '34',
      russia: '38',
    },
    {
      descriptive: 'XS',
      france_spain_portugal: '34',
      us: '2',
      uk_au: '6',
      de_dk_ch: '32',
      italy: '38',
      japan: '5',
      brazil: '36',
      russia: '40',
    },
    {
      descriptive: 'S',
      france_spain_portugal: '36',
      us: '4',
      uk_au: '8',
      de_dk_ch: '34',
      italy: '40',
      japan: '7',
      brazil: '38',
      russia: '42',
    },
    {
      descriptive: 'M',
      france_spain_portugal: '38',
      us: '6',
      uk_au: '10',
      de_dk_ch: '36',
      italy: '42',
      japan: '9',
      brazil: '40',
      russia: '44',
    },
    {
      descriptive: 'L',
      france_spain_portugal: '40',
      us: '8',
      uk_au: '12',
      de_dk_ch: '38',
      italy: '44',
      japan: '11',
      brazil: '42',
      russia: '46',
    },
    {
      descriptive: 'XL',
      france_spain_portugal: '42',
      us: '10',
      uk_au: '14',
      de_dk_ch: '40',
      italy: '46',
      japan: '13',
      brazil: '44',
      russia: '48',
    },
    {
      descriptive: 'XXL',
      france_spain_portugal: '44',
      us: '12',
      uk_au: '16',
      de_dk_ch: '42',
      italy: '48',
      japan: '15',
      brazil: '46',
      russia: '50',
    },
    {
      descriptive: 'XXXL',
      france_spain_portugal: '46',
      us: '14',
      uk_au: '18',
      de_dk_ch: '44',
      italy: '50',
      japan: '17',
      brazil: '48',
      russia: '52',
    },
    {
      descriptive: 'XXXXL',
      france_spain_portugal: '48',
      us: '16',
      uk_au: '20',
      de_dk_ch: '46',
      italy: '52',
      japan: '19',
      brazil: '50',
      russia: '54',
    },
  ],
};

export const regions = [
  { id: 'france_spain_portugal', label: 'France, Spain and Portugal' },
  { id: 'us', label: 'United States' },
  { id: 'uk_au', label: 'United Kingdom and Australia' },
  { id: 'de_dk_ch', label: 'Germany, Denmark and Switzerland' },
  { id: 'italy', label: 'Italy' },
  { id: 'japan', label: 'Japan' },
  { id: 'brazil', label: 'Brazil' },
  { id: 'russia', label: 'Russia' },
] as const;

export type Region = (typeof regions)[number]['id'];

// Helper types for size systems
export type SizeSystem =
  | 'descriptive'
  | 'us'
  | 'uk_au'
  | 'de_dk_ch'
  | 'italy'
  | 'japan'
  | 'brazil'
  | 'russia';

// Helper function to get all available sizes for a specific system
export const getAvailableSizes = (system: SizeSystem): string[] => {
  return [...new Set(sizeData.women.map((size) => size[system]))];
};

// Helper function to convert between size systems
export const convertSize = (
  value: string,
  fromSystem: SizeSystem,
  toSystem: SizeSystem
): string | null => {
  const sizeMapping = sizeData.women.find((size) => size[fromSystem] === value);
  return sizeMapping ? sizeMapping[toSystem] : null;
};
