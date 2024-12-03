import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useLanguage } from '../../context/LanguageContext';
import { Product } from '../../types';
import { Edit2, Save } from 'lucide-react';

export function ProductList() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditPrice(product.price);
  };

  const handleSave = async (productId: string) => {
    try {
      const productRef = doc(db, 'products', productId);
      const today = new Date().toISOString().split('T')[0];
      
      await updateDoc(productRef, {
        price: editPrice,
        lastUpdated: today,
        priceHistory: [
          { date: today, price: editPrice },
          ...products.find(p => p.id === productId)?.priceHistory.slice(0, 6) || []
        ]
      });

      setProducts(products.map(p => 
        p.id === productId 
          ? { ...p, price: editPrice, lastUpdated: today }
          : p
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {language === 'bn' ? 'পণ্য' : 'Product'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {language === 'bn' ? 'বর্তমান মূল্য' : 'Current Price'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {language === 'bn' ? 'সর্বশেষ আপডেট' : 'Last Updated'}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {language === 'bn' ? 'অ্যাকশন' : 'Actions'}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map(product => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img 
                    className="h-10 w-10 rounded-full object-cover"
                    src={product.image}
                    alt={product.name[language]}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name[language]}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === product.id ? (
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="w-24 px-2 py-1 border rounded"
                  />
                ) : (
                  <div className="text-sm text-gray-900">
                    ৳{product.price}/{product.unit[language]}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {product.lastUpdated}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {editingId === product.id ? (
                  <button
                    onClick={() => handleSave(product.id)}
                    className="text-emerald-600 hover:text-emerald-900 flex items-center gap-1 ml-auto"
                  >
                    <Save className="h-4 w-4" />
                    {language === 'bn' ? 'সেভ' : 'Save'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-emerald-600 hover:text-emerald-900 flex items-center gap-1 ml-auto"
                  >
                    <Edit2 className="h-4 w-4" />
                    {language === 'bn' ? 'এডিট' : 'Edit'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}