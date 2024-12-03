import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { LogOut, Plus, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { ProductForm } from './ProductForm';
import { categories } from '../../data/categories';

export function AdminDashboard() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('lastUpdated', 'desc'));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
      setFilteredProducts(productsData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(language === 'bn' ? 'পণ্য লোড করতে সমস্যা হয়েছে' : 'Error loading products');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAddProduct = async (data: any) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const newProduct = {
        name: { bn: data.nameBn, en: data.nameEn },
        category: data.category,
        price: data.price,
        unit: { bn: data.unitBn, en: data.unitEn },
        image: data.image,
        lastUpdated: today,
        trend: 'stable' as const,
        priceHistory: [{ date: today, price: data.price }]
      };

      const docRef = await addDoc(collection(db, 'products'), newProduct);
      const productWithId = { ...newProduct, id: docRef.id };
      setProducts([productWithId, ...products]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
      setError(language === 'bn' ? 'পণ্য যোগ করতে সমস্যা হয়েছে' : 'Error adding product');
    }
  };

  const handleUpdateProduct = async (data: any) => {
    if (!editingProduct) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const updatedProduct = {
        name: { bn: data.nameBn, en: data.nameEn },
        category: data.category,
        price: data.price,
        unit: { bn: data.unitBn, en: data.unitEn },
        image: data.image,
        lastUpdated: today,
        trend: data.price > editingProduct.price ? 'up' : 
               data.price < editingProduct.price ? 'down' : 
               editingProduct.trend,
        priceHistory: [
          { date: today, price: data.price },
          ...editingProduct.priceHistory.slice(0, 6)
        ]
      };

      await updateDoc(doc(db, 'products', editingProduct.id), updatedProduct);
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...updatedProduct, id: editingProduct.id } : p
      ));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      setError(language === 'bn' ? 'পণ্য আপডেট করতে সমস্যা হয়েছে' : 'Error updating product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm(language === 'bn' ? 'আপনি কি নিশ্চিত?' : 'Are you sure?')) return;

    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError(language === 'bn' ? 'পণ্য মুছে ফেলতে সমস্যা হয়েছে' : 'Error deleting product');
    }
  };

  const getCategoryStats = (categoryId: string) => {
    const categoryProducts = products.filter(p => p.category === categoryId);
    return {
      count: categoryProducts.length,
      totalValue: categoryProducts.reduce((sum, p) => sum + p.price, 0)
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}
            </h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {language === 'bn' ? 'লগআউট' : 'Logout'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Category Overview */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => {
            const stats = getCategoryStats(category.id);
            return (
              <div 
                key={category.id}
                className={`p-4 rounded-lg shadow-sm ${
                  selectedCategory === category.id ? 'bg-emerald-50 border-2 border-emerald-500' : 'bg-white'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                role="button"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{category.name[language]}</h3>
                  <span className="text-sm text-gray-500">{stats.count} {language === 'bn' ? 'পণ্য' : 'items'}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {language === 'bn' ? 'মোট মূল্য:' : 'Total Value:'} ৳{stats.totalValue.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-medium text-gray-900">
                {language === 'bn' ? 'পণ্যের তালিকা' : 'Product List'}
              </h2>
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  {categories.find(c => c.id === selectedCategory)?.name[language]}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(null);
                    }}
                    className="ml-2 text-emerald-600 hover:text-emerald-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              {language === 'bn' ? 'নতুন পণ্য' : 'New Product'}
            </button>
          </div>

          <div className="border-t border-gray-200">
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
                    {language === 'bn' ? 'মূল্যের ইতিহাস' : 'Price History'}
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
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
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
                          <div className="text-sm text-gray-500">
                            {categories.find(c => c.id === product.category)?.name[language]}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ৳{product.price}/{product.unit[language]}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {product.priceHistory.slice(0, 3).map((history, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span>{history.date}:</span>
                            <span className="font-medium">৳{history.price}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {product.lastUpdated}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="text-emerald-600 hover:text-emerald-900 inline-flex items-center"
                        >
                          {language === 'bn' ? 'এডিট' : 'Edit'}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center"
                        >
                          {language === 'bn' ? 'ডিলিট' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showAddForm && (
        <ProductForm
          onSubmit={handleAddProduct}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {editingProduct && (
        <ProductForm
          onSubmit={handleUpdateProduct}
          onClose={() => setEditingProduct(null)}
          initialData={editingProduct}
          isEdit
        />
      )}
    </div>
  );
}