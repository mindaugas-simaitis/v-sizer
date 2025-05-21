export interface SizeMapping {
  global: string;
  [key: string]: string;
}

export interface MenSizeMapping extends SizeMapping {
  global: string;
  eu: string;
  us_uk: string;
  japan: string;
  brazil: string;
}

export interface RegionInfo {
  id: string;
  label: string;
}

export type Region =
  | 'global'
  | 'france_spain_portugal'
  | 'us'
  | 'uk_au'
  | 'germany_denmark_switzerland'
  | 'italy'
  | 'japan'
  | 'brazil'
  | 'russia'
  | 'eu'
  | 'us_uk';

export const womenSizes: SizeMapping[] = [
  {
    global: 'XXS',
    france_spain_portugal: '32',
    us: '0',
    uk_au: '4',
    germany_denmark_switzerland: '30',
    italy: '36',
    japan: '3',
    brazil: '34',
    russia: '38',
  },
  {
    global: 'XS',
    france_spain_portugal: '34',
    us: '2',
    uk_au: '6',
    germany_denmark_switzerland: '32',
    italy: '38',
    japan: '5',
    brazil: '36',
    russia: '40',
  },
  {
    global: 'S',
    france_spain_portugal: '36',
    us: '4',
    uk_au: '8',
    germany_denmark_switzerland: '34',
    italy: '40',
    japan: '7',
    brazil: '38',
    russia: '42',
  },
  {
    global: 'M',
    france_spain_portugal: '38',
    us: '6',
    uk_au: '10',
    germany_denmark_switzerland: '36',
    italy: '42',
    japan: '9',
    brazil: '40',
    russia: '44',
  },
  {
    global: 'L',
    france_spain_portugal: '40',
    us: '8',
    uk_au: '12',
    germany_denmark_switzerland: '38',
    italy: '44',
    japan: '11',
    brazil: '42',
    russia: '46',
  },
  {
    global: 'XL',
    france_spain_portugal: '42',
    us: '10',
    uk_au: '14',
    germany_denmark_switzerland: '40',
    italy: '46',
    japan: '13',
    brazil: '44',
    russia: '48',
  },
  {
    global: 'XXL',
    france_spain_portugal: '44',
    us: '12',
    uk_au: '16',
    germany_denmark_switzerland: '42',
    italy: '48',
    japan: '15',
    brazil: '46',
    russia: '50',
  },
  {
    global: 'XXXL',
    france_spain_portugal: '46',
    us: '14',
    uk_au: '18',
    germany_denmark_switzerland: '44',
    italy: '50',
    japan: '17',
    brazil: '48',
    russia: '52',
  },
  {
    global: 'XXXXL',
    france_spain_portugal: '48',
    us: '16',
    uk_au: '20',
    germany_denmark_switzerland: '46',
    italy: '52',
    japan: '19',
    brazil: '50',
    russia: '54',
  },
];

export const menSizes: MenSizeMapping[] = [
  {
    global: 'XS',
    eu: '44',
    us_uk: '34',
    japan: '1',
    brazil: 'PP',
  },
  {
    global: 'S',
    eu: '46',
    us_uk: '36',
    japan: '2',
    brazil: 'P',
  },
  {
    global: 'M',
    eu: '48',
    us_uk: '38',
    japan: '3',
    brazil: 'M',
  },
  {
    global: 'L',
    eu: '50',
    us_uk: '40',
    japan: '4',
    brazil: 'M/G',
  },
  {
    global: 'XL',
    eu: '52',
    us_uk: '42',
    japan: '5',
    brazil: 'G',
  },
  {
    global: 'XXL',
    eu: '54',
    us_uk: '44',
    japan: '6',
    brazil: 'GG',
  },
  {
    global: '3XL',
    eu: '56',
    us_uk: '46',
    japan: '7',
    brazil: 'XGG',
  },
];

export const regions: {
  women: RegionInfo[];
  men: RegionInfo[];
} = {
  women: [
    { id: 'global', label: 'Global' },
    { id: 'france_spain_portugal', label: 'France, Spain & Portugal' },
    { id: 'us', label: 'United States' },
    { id: 'uk_au', label: 'UK & Australia' },
    {
      id: 'germany_denmark_switzerland',
      label: 'Germany, Denmark & Switzerland',
    },
    { id: 'italy', label: 'Italy' },
    { id: 'japan', label: 'Japan' },
    { id: 'brazil', label: 'Brazil' },
    { id: 'russia', label: 'Russia' },
  ],
  men: [
    { id: 'global', label: 'Global' },
    { id: 'eu', label: 'EU (France, Italy, Germany, Spain & Portugal)' },
    { id: 'us_uk', label: 'US & UK' },
    { id: 'japan', label: 'Japan' },
    { id: 'brazil', label: 'Brazil' },
  ],
};
