import React from 'react';
import { categories } from '../data/categories';
import { 
  Salad, 
  Beef, 
  Fish, 
  Milk, 
  Utensils,
  LucideIcon 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const iconMap: Record<string, LucideIcon> = {
  Salad,
  Beef,
  Fish,
  Milk,
  Utensils
};

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { language } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-emerald-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {language === 'bn' ? 'সব পণ্য' : 'All Items'}
      </button>
      {categories.map((category) => {
        const IconComponent = iconMap[category.icon];
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <IconComponent className="h-4 w-4" />
            {category.name[language]}
          </button>
        );
      })}
    </div>
  );
}