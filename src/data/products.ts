import { Product } from '../types';
import { subDays } from 'date-fns';

const today = new Date().toISOString().split('T')[0];
const yesterday = subDays(new Date(), 1).toISOString().split('T')[0];
const twoDaysAgo = subDays(new Date(), 2).toISOString().split('T')[0];

export const products: Product[] = [
  {
    id: '1',
    name: { bn: 'ডিম', en: 'Eggs' },
    category: 'dairy',
    price: 140,
    unit: { bn: 'ডজন', en: 'dozen' },
    lastUpdated: today,
    trend: 'up',
    priceChange: 5,
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300',
    priceHistory: [
      { date: today, price: 140 },
      { date: yesterday, price: 135 },
      { date: twoDaysAgo, price: 135 }
    ]
  },
  {
    id: '2',
    name: { bn: 'আলু', en: 'Potatoes' },
    category: 'vegetables',
    price: 35,
    unit: { bn: 'কেজি', en: 'kg' },
    lastUpdated: today,
    trend: 'stable',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300',
    priceHistory: [
      { date: today, price: 35 },
      { date: yesterday, price: 35 },
      { date: twoDaysAgo, price: 35 }
    ]
  },
  {
    id: '3',
    name: { bn: 'পেঁয়াজ', en: 'Onions' },
    category: 'spices',
    price: 65,
    unit: { bn: 'কেজি', en: 'kg' },
    lastUpdated: today,
    trend: 'down',
    priceChange: -3,
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=300',
    priceHistory: [
      { date: today, price: 65 },
      { date: yesterday, price: 68 },
      { date: twoDaysAgo, price: 70 }
    ]
  },
  {
    id: '4',
    name: { bn: 'রসুন', en: 'Garlic' },
    category: 'spices',
    price: 120,
    unit: { bn: 'কেজি', en: 'kg' },
    lastUpdated: today,
    trend: 'up',
    priceChange: 10,
    image: 'https://images.unsplash.com/photo-1615477550927-6ec8445fcf25?w=300',
    priceHistory: [
      { date: today, price: 120 },
      { date: yesterday, price: 110 },
      { date: twoDaysAgo, price: 110 }
    ]
  },
  {
    id: '5',
    name: { bn: 'দুধ', en: 'Milk' },
    category: 'dairy',
    price: 80,
    unit: { bn: 'লিটার', en: 'liter' },
    lastUpdated: today,
    trend: 'stable',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300',
    priceHistory: [
      { date: today, price: 80 },
      { date: yesterday, price: 80 },
      { date: twoDaysAgo, price: 80 }
    ]
  },
  {
    id: '6',
    name: { bn: 'গরুর মাংস', en: 'Beef' },
    category: 'meat',
    price: 750,
    unit: { bn: 'কেজি', en: 'kg' },
    lastUpdated: today,
    trend: 'up',
    priceChange: 15,
    image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?w=300',
    priceHistory: [
      { date: today, price: 750 },
      { date: yesterday, price: 735 },
      { date: twoDaysAgo, price: 735 }
    ]
  },
  {
    id: '7',
    name: { bn: 'ইলিশ মাছ', en: 'Hilsa Fish' },
    category: 'fish',
    price: 1200,
    unit: { bn: 'কেজি', en: 'kg' },
    lastUpdated: today,
    trend: 'down',
    priceChange: -50,
    image: 'https://images.unsplash.com/photo-1611171711791-b34b41c4f827?w=300',
    priceHistory: [
      { date: today, price: 1200 },
      { date: yesterday, price: 1250 },
      { date: twoDaysAgo, price: 1250 }
    ]
  }
];