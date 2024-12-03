import { Category } from '../types';

export const categories: Category[] = [
  { 
    id: 'vegetables', 
    name: { bn: 'সবজি', en: 'Vegetables' }, 
    icon: 'Salad' 
  },
  { 
    id: 'meat', 
    name: { bn: 'মাংস', en: 'Meat' }, 
    icon: 'Beef' 
  },
  { 
    id: 'fish', 
    name: { bn: 'মাছ', en: 'Fish' }, 
    icon: 'Fish' 
  },
  { 
    id: 'dairy', 
    name: { bn: 'দুগ্ধজাত', en: 'Dairy' }, 
    icon: 'Milk' 
  },
  { 
    id: 'spices', 
    name: { bn: 'মসলা', en: 'Spices' }, 
    icon: 'Utensils' 
  },
];