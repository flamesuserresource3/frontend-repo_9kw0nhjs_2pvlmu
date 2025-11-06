import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import GlassPanels from './components/GlassPanels';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen w-full bg-black font-inter text-white">
      <Hero />
      <Features />
      <GlassPanels />
      <Footer />
    </div>
  );
};

export default App;
