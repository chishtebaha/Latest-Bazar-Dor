import React, { useState } from 'react';
import { Partners } from './Partners';
import { useLanguage } from '../../context/LanguageContext';
import { Info, AlertCircle, Mail, Phone } from 'lucide-react';

export function Footer() {
  const { language } = useLanguage();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <footer className="bg-white mt-12">
      <div className="container mx-auto px-4">
        <Partners />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-gray-200">
          {/* About Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </h4>
            <p className="text-gray-600 mb-4">
              {language === 'bn'
                ? 'বাজার দর একটি নির্ভরযোগ্য প্লাটফর্ম যা আপনাকে দৈনিক বাজার দরের সর্বশেষ তথ্য প্রদান করে।'
                : 'Bazar Dor is a reliable platform that provides you with the latest information on daily market prices.'}
            </p>
            <button
              onClick={() => setShowAbout(true)}
              className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              {language === 'bn' ? 'আরও জানুন' : 'Learn More'}
            </button>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </h4>
            <div className="space-y-2">
              <a href="mailto:contact@bazardor.com" className="text-gray-600 hover:text-emerald-600 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contact@bazardor.com
              </a>
              <a href="tel:+8801700000000" className="text-gray-600 hover:text-emerald-600 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +880 170 000 0000
              </a>
            </div>
          </div>

          {/* Disclaimer Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {language === 'bn' ? 'বিশেষ দ্রষ্টব্য' : 'Disclaimer'}
            </h4>
            <p className="text-gray-600 mb-4">
              {language === 'bn'
                ? 'এই তথ্যগুলি নিয়মিত আপডেট করা হয়। তবে বাজার দর পরিবর্তনশীল।'
                : 'Prices are updated regularly. However, market prices are subject to change.'}
            </p>
            <button
              onClick={() => setShowDisclaimer(true)}
              className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4" />
              {language === 'bn' ? 'পূর্ণ বিবরণ' : 'Full Disclaimer'}
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-4 border-t border-gray-200 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Bazar Dor. {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত' : 'All rights reserved.'}
        </div>

        {/* Modal: About */}
        {showAbout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
              </h2>
              <div className="prose max-w-none">
                <p>
                  {language === 'bn'
                    ? 'বাজার দর একটি সম্পূর্ণ স্বাধীন প্লাটফর্ম যা বাংলাদেশের বিভিন্ন বাজারের দৈনিক মূল্য তালিকা প্রকাশ করে। আমরা নিয়মিতভাবে বাজার পর্যবেক্ষণ করি এবং সর্বশেষ দর আপডেট করি। আমাদের লক্ষ্য হল সাধারণ মানুষকে সঠিক বাজার দর সম্পর্কে অবহিত করা।'
                    : 'Bazar Dor is an independent platform that publishes daily price lists from various markets in Bangladesh. We regularly monitor markets and update prices. Our goal is to keep the general public informed about accurate market prices.'}
                </p>
              </div>
              <button
                onClick={() => setShowAbout(false)}
                className="mt-6 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        )}

        {/* Modal: Disclaimer */}
        {showDisclaimer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'bn' ? 'বিশেষ দ্রষ্টব্য' : 'Disclaimer'}
              </h2>
              <div className="prose max-w-none">
                <p>
                  {language === 'bn'
                    ? 'এই ওয়েবসাইটে প্রদর্শিত সকল মূল্য শুধুমাত্র তথ্যমূলক উদ্দেশ্যে প্রদান করা হয়েছে। বাজারের মূল্য বিভিন্ন কারণে পরিবর্তিত হতে পারে। আমরা সর্বোচ্চ যত্ন নিয়ে তথ্য সংগ্রহ করি, তবে কোনো নির্দিষ্ট সময়ে বাস্তব মূল্যের সাথে পার্থক্য থাকতে পারে। ক্রয়-বিক্রয়ের আগে অনুগ্রহ করে সরাসরি বাজার থেকে মূল্য যাচাই করে নিন।'
                    : 'All prices displayed on this website are provided for informational purposes only. Market prices may vary due to various factors. While we collect information with utmost care, actual prices at any specific time may differ. Please verify prices directly from the market before making any purchase decisions.'}
                </p>
              </div>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="mt-6 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}