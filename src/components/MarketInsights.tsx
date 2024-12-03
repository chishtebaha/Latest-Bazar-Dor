import React from 'react';
import { TrendingUp, ArrowUpRight, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types';

interface MarketInsightsProps {
  products: Product[];
}

export function MarketInsights({ products }: MarketInsightsProps) {
  const { language } = useLanguage();

  // Calculate market insights
  const totalProducts = products.length;
  const increasedPrices = products.filter(p => p.trend === 'up').length;
  const decreasedPrices = products.filter(p => p.trend === 'down').length;
  const stablePrices = products.filter(p => p.trend === 'stable').length;

  const averagePrice = products.reduce((acc, curr) => acc + curr.price, 0) / totalProducts;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-6 w-6 text-emerald-600" />
        <h2 className="text-xl font-semibold">
          {language === 'bn' ? 'বাজার বিশ্লেষণ' : 'Market Insights'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 font-medium">
                {language === 'bn' ? 'গড় মূল্য' : 'Average Price'}
              </p>
              <p className="text-2xl font-bold text-emerald-700">৳{averagePrice.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-500" />
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">
                {language === 'bn' ? 'মূল্য বৃদ্ধি' : 'Price Increases'}
              </p>
              <p className="text-2xl font-bold text-red-700">{increasedPrices}</p>
            </div>
            <ArrowUpRight className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">
                {language === 'bn' ? 'স্থিতিশীল পণ্য' : 'Stable Items'}
              </p>
              <p className="text-2xl font-bold text-green-700">{stablePrices}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}