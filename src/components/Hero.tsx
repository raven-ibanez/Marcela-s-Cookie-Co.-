import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-bakery-cream to-bakery-sugar py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bakery-display font-semibold text-bakery-cocoa mb-4 animate-fade-in">
          Freshly Baked Happiness
          <span className="block text-bakery-caramel mt-2">Marcela's Cookie Co.</span>
        </h1>
        <p className="text-lg md:text-xl text-bakery-cocoa/80 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
          Cookies, pastries, and sweet treats made with love. Classic flavors and local favorites, baked daily.
        </p>
        <div className="flex justify-center gap-3">
          <a 
            href="#cookies"
            className="bg-bakery-caramel text-white px-8 py-3 rounded-full hover:bg-bakery-cherry transition-all duration-300 transform hover:scale-105 font-bakery-sans font-semibold"
          >
            Shop Cookies
          </a>
          <a 
            href="#pastries"
            className="bg-white text-bakery-cocoa px-8 py-3 rounded-full border border-bakery-caramel/40 hover:bg-bakery-vanilla transition-all duration-300 font-bakery-sans"
          >
            View Pastries
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;