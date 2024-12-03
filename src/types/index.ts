export interface Product {
  id: string;
  name: {
    bn: string;
    en: string;
  };
  category: string;
  price: number;
  unit: {
    bn: string;
    en: string;
  };
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  priceChange?: number;
  image: string;
  priceHistory: {
    date: string;
    price: number;
  }[];
}

export type Category = {
  id: string;
  name: {
    bn: string;
    en: string;
  };
  icon: string;
};

export type Language = 'bn' | 'en';