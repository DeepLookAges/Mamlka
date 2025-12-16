import React, { useState } from 'react';
import { ViewState } from '../types';
import { Menu, X, ShoppingBag, Settings, ChefHat } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'الرئيسية', view: ViewState.HOME },
    { label: 'منتجاتنا', view: ViewState.PRODUCTS },
    { label: 'الشيف الذكي', view: ViewState.SMART_CHEF },
    { label: 'من نحن', view: ViewState.ABOUT },
    { label: 'تواصل معنا', view: ViewState.CONTACT },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView(ViewState.HOME)}>
          <img 
            src="https://i.top4top.io/p_36349nhdv1.png" 
            alt="Kingdom Dates Logo" 
            className="h-16 w-auto object-contain"
          />
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-brand-brown">تمور المملكة</h1>
            <p className="text-xs text-brand-gold font-medium">المذاق العربي</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`text-lg transition-colors duration-200 flex items-center gap-1 ${
                currentView === item.view
                  ? 'text-brand-gold font-bold border-b-2 border-brand-gold'
                  : 'text-gray-600 hover:text-brand-darkGold'
              }`}
            >
              {item.view === ViewState.SMART_CHEF && <ChefHat size={18} className="mb-1" />}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView(ViewState.ADMIN)}
            className={`p-2 transition-colors ${currentView === ViewState.ADMIN ? 'text-brand-gold' : 'text-brand-brown hover:text-brand-gold'}`}
            title="لوحة التحكم"
          >
            <Settings size={24} />
          </button>

          <button 
            onClick={() => setView(ViewState.CART)}
            className={`p-2 transition-colors relative ${currentView === ViewState.CART ? 'text-brand-gold' : 'text-brand-brown hover:text-brand-gold'}`}
            title="سلة المشتريات"
          >
            <ShoppingBag size={24} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] min-w-[16px] h-4 rounded-full flex items-center justify-center px-1">
              {cartCount}
            </span>
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-brand-brown"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg z-40">
          <div className="flex flex-col p-4 gap-4">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setView(item.view);
                  setIsMenuOpen(false);
                }}
                className={`text-right py-2 flex items-center justify-end gap-2 ${
                  currentView === item.view ? 'text-brand-gold font-bold' : 'text-gray-600'
                }`}
              >
                {item.label}
                {item.view === ViewState.SMART_CHEF && <ChefHat size={18} />}
              </button>
            ))}
             <button
                onClick={() => {
                  setView(ViewState.CART);
                  setIsMenuOpen(false);
                }}
                className={`text-right py-2 ${
                  currentView === ViewState.CART ? 'text-brand-gold font-bold' : 'text-gray-600'
                }`}
              >
                سلة المشتريات ({cartCount})
              </button>
             <button
                onClick={() => {
                  setView(ViewState.ADMIN);
                  setIsMenuOpen(false);
                }}
                className={`text-right py-2 ${
                  currentView === ViewState.ADMIN ? 'text-brand-gold font-bold' : 'text-gray-600'
                }`}
              >
                لوحة التحكم
              </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;