import React, { useState } from 'react';
import { Search, Languages, Menu, X, Home, Info, ShoppingBag, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-emerald-700 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Top Bar - Always Visible */}
        <div className="flex flex-col space-y-4">
          {/* Logo and Menu Button Row */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <ShoppingBag className="h-6 w-6" />
              <h1 className="text-xl md:text-2xl font-bold">
                {language === 'bn' ? 'বাজার দর' : 'Market Prices'}
              </h1>
            </Link>

            {/* Mobile Menu Button - Only for Navigation Links */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-emerald-600 rounded-lg"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={language === 'bn' ? 'পণ্য খুঁজুন...' : 'Search items...'}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-64 px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              <button
                onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-3 py-2 rounded-lg transition-colors"
              >
                <Languages className="h-5 w-5" />
                {language === 'bn' ? 'English' : 'বাংলা'}
              </button>
            </div>
          </div>

          {/* Search and Language - Always Visible on Mobile */}
          <div className="md:hidden flex flex-col space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder={language === 'bn' ? 'পণ্য খুঁজুন...' : 'Search items...'}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            <button
              onClick={() => {
                setLanguage(language === 'bn' ? 'en' : 'bn');
                closeMenu();
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-3 py-2 rounded-lg transition-colors"
            >
              <Languages className="h-5 w-5" />
              {language === 'bn' ? 'English' : 'বাংলা'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`${
            isMenuOpen ? 'flex flex-col' : 'hidden'
          } md:hidden mt-4 space-y-2`}
        >
          <nav className="space-y-2">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Home className="h-5 w-5" />
              {language === 'bn' ? 'হোম' : 'Home'}
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Info className="h-5 w-5" />
              {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <Phone className="h-5 w-5" />
              {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}