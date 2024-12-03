import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Minus, History } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { format } from 'date-fns';

interface PriceCardProps {
  product: Product;
}

export function PriceCard({ product }: PriceCardProps) {
  const { language } = useLanguage();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="relative pb-[60%] mb-3">
        <img
          src={product.image}
          alt={product.name[language]}
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name[language]}</h3>
        <div className={`flex items-center gap-1 ${
          product.trend === 'up' ? 'text-red-500' :
          product.trend === 'down' ? 'text-green-500' :
          'text-gray-500'
        }`}>
          {product.trend === 'up' && <ArrowUp className="h-4 w-4" />}
          {product.trend === 'down' && <ArrowDown className="h-4 w-4" />}
          {product.trend === 'stable' && <Minus className="h-4 w-4" />}
          {product.priceChange && (
            <span className="text-sm">
              {product.priceChange > 0 ? '+' : ''}{product.priceChange}৳
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-2xl font-bold text-emerald-600">
            ৳{product.price}
            <span className="text-sm text-gray-500 ml-1">/{product.unit[language]}</span>
          </p>
          <p className="text-xs text-gray-500">
            {language === 'bn' ? 'আপডেট:' : 'Updated:'} {format(new Date(product.lastUpdated), 'dd/MM/yyyy')}
          </p>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-emerald-600 hover:text-emerald-700"
          title={language === 'bn' ? 'মূল্যের ইতিহাস' : 'Price History'}
        >
          <History className="h-5 w-5" />
        </button>
      </div>
      {showHistory && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-2">
            {language === 'bn' ? 'মূল্যের ইতিহাস' : 'Price History'}
          </h4>
          <div className="space-y-1">
            {product.priceHistory.map((history) => (
              <div key={history.date} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {format(new Date(history.date), 'dd/MM/yyyy')}
                </span>
                <span className="font-medium">৳{history.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}