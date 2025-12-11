import React from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
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
              <li><a href="#" className="hover:text-white transition-colors">عن الشركة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">منتجاتنا</a></li>
              <li><a href="#" className="hover:text-white transition-colors">سياسة الشحن</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-6 text-brand-gold">تواصل معنا</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center justify-center md:justify-end gap-3">
                <span dir="ltr">+966 50 000 0000</span>
                <Phone size={18} />
              </li>
              <li className="flex items-center justify-center md:justify-end gap-3">
                <span>info@kingdomdates.com</span>
                <Mail size={18} />
              </li>
              <li className="flex items-center justify-center md:justify-end gap-3">
                <span>الرياض، المملكة العربية السعودية</span>
                <MapPin size={18} />
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