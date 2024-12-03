import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '../../context/LanguageContext';
import { categories } from '../../data/categories';
import { X } from 'lucide-react';
import { Product } from '../../types';

const productSchema = z.object({
  nameBn: z.string().min(1, 'Required'),
  nameEn: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
  price: z.number().min(0, 'Price must be positive'),
  unitBn: z.string().min(1, 'Required'),
  unitEn: z.string().min(1, 'Required'),
  image: z.string().url('Must be a valid URL'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => Promise<void>;
  onClose: () => void;
  initialData?: Product;
  isEdit?: boolean;
}

export function ProductForm({ onSubmit, onClose, initialData, isEdit }: ProductFormProps) {
  const { language } = useLanguage();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ? {
      nameBn: initialData.name.bn,
      nameEn: initialData.name.en,
      category: initialData.category,
      price: initialData.price,
      unitBn: initialData.unit.bn,
      unitEn: initialData.unit.en,
      image: initialData.image,
    } : undefined
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {isEdit 
            ? (language === 'bn' ? 'পণ্য সম্পাদনা' : 'Edit Product')
            : (language === 'bn' ? 'নতুন পণ্য যোগ করুন' : 'Add New Product')}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'bn' ? 'পণ্যের নাম (বাংলা)' : 'Product Name (Bangla)'}
              </label>
              <input
                type="text"
                {...register('nameBn')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.nameBn && (
                <p className="mt-1 text-sm text-red-600">{errors.nameBn.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'bn' ? 'পণ্যের নাম (ইংরেজি)' : 'Product Name (English)'}
              </label>
              <input
                type="text"
                {...register('nameEn')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.nameEn && (
                <p className="mt-1 text-sm text-red-600">{errors.nameEn.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'bn' ? 'ক্যাটাগরি' : 'Category'}
              </label>
              <select
                {...register('category')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              >
                <option value="">{language === 'bn' ? 'ক্যাটাগরি নির্বাচন করুন' : 'Select Category'}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name[language]}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'bn' ? 'মূল্য' : 'Price'}
              </label>
              <input
                type="number"
                {...register('price', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'bn' ? 'একক (বাংলা)' : 'Unit (Bangla)'}
              </label>
              <input
                type="text"
                {...register('unitBn')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.unitBn && (
                <p className="mt-1 text-sm text-red-600">{errors.unitBn.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'bn' ? 'একক (ইংরেজি)' : 'Unit (English)'}
              </label>
              <input
                type="text"
                {...register('unitEn')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
              {errors.unitEn && (
                <p className="mt-1 text-sm text-red-600">{errors.unitEn.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {language === 'bn' ? 'ছবির URL' : 'Image URL'}
            </label>
            <input
              type="url"
              {...register('image')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            >
              {isSubmitting
                ? (language === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...')
                : (language === 'bn' ? 'সংরক্ষণ করুন' : 'Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}