import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const partners = [
  {
    name: 'Prothom Alo',
    logo: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=100&h=50&fit=crop',
    url: 'https://www.prothomalo.com'
  },
  {
    name: 'ICT Division',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=50&fit=crop',
    url: 'https://ictd.gov.bd'
  },
  {
    name: 'The Daily Star',
    logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100&h=50&fit=crop',
    url: 'https://www.thedailystar.net'
  },
  {
    name: 'BASIS',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=50&fit=crop',
    url: 'https://basis.org.bd'
  },
  {
    name: 'TCB',
    logo: 'https://images.unsplash.com/photo-1554774853-719586f82d77?w=100&h=50&fit=crop',
    url: 'http://www.tcb.gov.bd'
  }
];

export function Partners() {
  const { language } = useLanguage();
  
  return (
    <div className="py-8 border-t border-gray-200">
      <h3 className="text-center text-lg font-semibold mb-6">
        {language === 'bn' ? 'সহযোগিতায়' : 'Supported By'}
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {partners.map((partner) => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="grayscale hover:grayscale-0 transition-all"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
}