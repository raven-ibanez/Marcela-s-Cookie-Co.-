import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bakery-cocoa text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="text-white/90">📞</span>
          <span className="font-semibold tracking-wide">0947-101-8325</span>
        </div>
        <div className="hidden sm:block h-4 w-px bg-white/20" />
        <div className="flex items-center gap-2">
          <span className="text-white/90">📍</span>
          <span className="opacity-90">Guadanoville Subd. North Caloocan</span>
        </div>
        <div className="hidden sm:block h-4 w-px bg-white/20" />
        <div className="flex items-center gap-2">
          <span className="text-white/90">📍</span>
          <span className="opacity-90">The Villas at Dasmariñas Highlands, Cavite</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


