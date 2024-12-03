import React from 'react';
import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MarketTrendsProps {
  products: Product[];
}

export function MarketTrends({ products }: MarketTrendsProps) {
  const { language } = useLanguage();
  const increasedPrices = products.filter(p => p.trend === 'up');
  const decreasedPrices = products.filter(p => p.trend === 'down');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-emerald-600" />
        <h2 className="text-xl font-semibold">
          {language === 'bn' ? 'আজকের বাজার' : "Today's Market Trends"}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Price Increases */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUp className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-medium text-red-700">
              {language === 'bn' ? 'মূল্য বৃদ্ধি' : 'Price Increases'}
            </h3>
          </div>
          <div className="overflow-hidden rounded-lg border border-red-100">
            <table className="min-w-full divide-y divide-red-200">
              <thead className="bg-red-100">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-red-900">
                    {language === 'bn' ? 'পণ্য' : 'Item'}
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-medium text-red-900">
                    {language === 'bn' ? 'পরিবর্তন' : 'Change'}
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-medium text-red-900">
                    {language === 'bn' ? 'বর্তমান মূল্য' : 'Current Price'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100 bg-white">
                {increasedPrices.map(product => (
                  <tr key={product.id} className="hover:bg-red-50 transition-colors">
                    <td className="px-4 py-2.5 text-sm text-gray-900">{product.name[language]}</td>
                    <td className="px-4 py-2.5 text-sm text-right text-red-600 font-medium">
                      +{product.priceChange}৳
                    </td>
                    <td className="px-4 py-2.5 text-sm text-right font-medium">
                      ৳{product.price}/{product.unit[language]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Price Decreases */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <ArrowDown className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium text-green-700">
              {language === 'bn' ? 'মূল্য হ্রাস' : 'Price Decreases'}
            </h3>
          </div>
          <div className="overflow-hidden rounded-lg border border-green-100">
            <table className="min-w-full divide-y divide-green-200">
              <thead className="bg-green-100">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-green-900">
                    {language === 'bn' ? 'পণ্য' : 'Item'}
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-medium text-green-900">
                    {language === 'bn' ? 'পরিবর্তন' : 'Change'}
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-sm font-medium text-green-900">
                    {language === 'bn' ? 'বর্তমান মূল্য' : 'Current Price'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100 bg-white">
                {decreasedPrices.map(product => (
                  <tr key={product.id} className="hover:bg-green-50 transition-colors">
                    <td className="px-4 py-2.5 text-sm text-gray-900">{product.name[language]}</td>
                    <td className="px-4 py-2.5 text-sm text-right text-green-600 font-medium">
                      {product.priceChange}৳
                    </td>
                    <td className="px-4 py-2.5 text-sm text-right font-medium">
                      ৳{product.price}/{product.unit[language]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}