import React from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { ViewState } from '../types';

interface FooterProps {
  setView: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-brand-brown text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <img 
                src="https://e.top4top.io/p_3632anluh1.png" 
                alt="Logo" 
                className="h-12 w-auto brightness-200 grayscale"
              />
              <h3 className="text-2xl font-bold text-brand-gold">تمور المملكة</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              نحرص في تمور المملكة على تقديم أجود أنواع التمور السعودية، مع الاهتمام بأدق التفاصيل من المزرعة حتى مائدتكم. المذاق العربي الأصيل.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-xl font-bold mb-6 text-brand-gold">روابط سريعة</h4>
            <ul className="space-y-3 text-gray-300">
              <li><button onClick={() => setView(ViewState.ABOUT)} className="hover:text-white transition-colors">عن الشركة</button></li>
              <li><button onClick={() => setView(ViewState.PRODUCTS)} className="hover:text-white transition-colors">منتجاتنا</button></li>
              <li><button onClick={() => setView(ViewState.HOME)} className="hover:text-white transition-colors">سياسة الشحن</button></li>
              <li><button onClick={() => setView(ViewState.CONTACT)} className="hover:text-white transition-colors">الأسئلة الشائعة</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-6 text-brand-gold">تواصل معنا</h4>
            <ul className="space-y-4 text-gray-300 flex flex-col items-center md:items-end">
              {/* WhatsApp Button */}
              <li className="w-full md:w-auto">
                <a 
                  href="https://wa.me/201033056159" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-white/10 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-3 w-full md:w-64"
                >
                  <span className="font-bold">واتساب</span>
                  <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              </li>

              {/* Maktoubi Button */}
              <li className="w-full md:w-auto">
                <button 
                  onClick={() => setView(ViewState.CONTACT)}
                  className="group bg-white/10 hover:bg-brand-gold text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-3 w-full md:w-64"
                >
                  <span className="font-bold">مكتوبي</span>
                  <Mail size={20} className="group-hover:scale-110 transition-transform" />
                </button>
              </li>

              {/* Address */}
              <li className="flex items-center justify-center md:justify-end gap-3 mt-2">
                <span>الوراق، الجيزة، مصر.</span>
                <MapPin size={18} className="text-brand-gold" />
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-right">
            <p className="text-gray-400 text-sm">© 2025 تمور المملكة. جميع الحقوق محفوظة.</p>
            <span className="hidden md:block text-gray-600">|</span>
            <p className="text-gray-400 text-sm flex gap-1 items-center" dir="ltr">
              <span>Development by:</span>
              <a 
                href="https://hamzahilal.art" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-gold hover:text-white transition-colors font-bold"
              >
                HAMZA Hilal
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-gold transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-gold transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;