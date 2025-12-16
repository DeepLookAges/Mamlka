import React from 'react';
import { ViewState } from '../types';

interface HeroProps {
  setView: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <div className="relative bg-brand-brown overflow-hidden min-h-[500px] flex items-center">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://h.top4top.io/p_3632fofz51.png" 
          alt="Dates background" 
          className="w-full h-full object-cover opacity-[0.66]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/90 to-orange-600/80 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-center md:text-right max-w-2xl text-white space-y-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              تمور المملكة
            </h2>
            <div className="text-2xl md:text-3xl font-bold text-yellow-400 mt-2 whitespace-nowrap">
              المذاق العربي في كل تمرة
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-200 font-light">
            نقدم لكم أفخر أنواع التمور السعودية، معبأة بعناية لتعكس المذاق العربي الأصيل. 
            من مزارعنا إلى مائدتكم مباشرة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <button 
              onClick={() => setView(ViewState.PRODUCTS)}
              className="bg-yellow-500 hover:bg-white hover:text-yellow-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              تصفح منتجاتنا
            </button>
            <button 
              onClick={() => setView(ViewState.CONTACT)}
              className="border-2 border-white text-white hover:bg-white hover:text-brand-brown font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              تواصل معنا
            </button>
          </div>
        </div>

        <div className="hidden md:block w-80 h-80 lg:w-96 lg:h-96 relative animate-pulse-slow">
           <img 
            src="https://i.top4top.io/p_36349nhdv1.png" 
            alt="Kingdom Dates Logo Large" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;