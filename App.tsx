
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import ChatAssistant from './components/ChatAssistant';
import AdminDashboard from './components/AdminDashboard';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import SmartChef from './components/SmartChef';
import { ViewState, Product } from './types';
import { MapPin, Phone, Mail } from 'lucide-react';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "عجوة المدينة الفاخرة",
    description: "تمر العجوة المبارك من مزارع المدينة المنورة، يتميز بلونه الأسود وقوامه الطري وفوائده العظيمة.",
    price: 850,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1628151016024-5d988450f3b3?q=80&w=800&auto=format&fit=crop",
    category: "luxury"
  },
  {
    id: 2,
    name: "سكري القصيم الملكي",
    description: "تمر السكري المفتل، حلو المذاق، ذهبي اللون، يعتبر فاكهة التمور.",
    price: 450,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1596660634621-e380f769024f?q=80&w=800&auto=format&fit=crop",
    category: "daily"
  },
  {
    id: 3,
    name: "مجدول الدرجة الأولى",
    description: "ملك التمور، حبة كبيرة وقوام لحمي ومذاق يشبه الكراميل.",
    price: 750,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1601633512752-19e492c64b6e?q=80&w=800&auto=format&fit=crop",
    category: "luxury"
  },
  {
    id: 4,
    name: "بوكس الإهداء الفاخر",
    description: "تشكيلة مختارة من أجود أنواع التمور المحشوة بالمكسرات في علبة جلدية فاخرة.",
    price: 1500,
    weight: "800 جم",
    imageUrl: "https://images.unsplash.com/photo-1574676484305-64d1152a5538?q=80&w=800&auto=format&fit=crop",
    category: "gifts"
  },
  {
    id: 5,
    name: "خلاص الإحساء",
    description: "تمر الخلاص المشهور بلونه الكهرماني وطعمه الغني، رفيق القهوة العربية.",
    price: 350,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1588167056637-29381e428e28?q=80&w=800&auto=format&fit=crop",
    category: "daily"
  },
  {
    id: 6,
    name: "معمول التمر الفاخر",
    description: "معمول هش محشو بأجود أنواع معجون التمر، يذوب في الفم.",
    price: 180,
    weight: "500 جم",
    imageUrl: "https://images.unsplash.com/photo-1629251873133-7c91c3374825?q=80&w=800&auto=format&fit=crop",
    category: "daily"
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    alert(`تم إضافة "${product.name}" إلى السلة بنجاح`);
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handlePlaceOrder = () => {
    // In a real app, send data to backend here
    setCart([]);
    alert("شكراً لك! تم استلام طلبك بنجاح، وسيتم التواصل معك قريباً لتأكيد التوصيل.");
    setCurrentView(ViewState.HOME);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <Hero setView={setCurrentView} />
            <div className="py-12 bg-white">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                   <div className="p-6 rounded-lg bg-brand-cream border border-brand-gold/20">
                     <h3 className="text-xl font-bold text-brand-brown mb-2">جودة عالية</h3>
                     <p className="text-gray-600">نختار أفضل حبات التمر بعناية فائقة لضمان الجودة.</p>
                   </div>
                   <div className="p-6 rounded-lg bg-brand-cream border border-brand-gold/20">
                     <h3 className="text-xl font-bold text-brand-brown mb-2">توصيل سريع</h3>
                     <p className="text-gray-600">شبكة توصيل تغطي جميع مناطق المملكة ودول الخليج.</p>
                   </div>
                   <div className="p-6 rounded-lg bg-brand-cream border border-brand-gold/20">
                     <h3 className="text-xl font-bold text-brand-brown mb-2">تغليف فاخر</h3>
                     <p className="text-gray-600">خيارات تعبئة وتغليف تناسب الإهداء والمناسبات.</p>
                   </div>
                </div>
              </div>
            </div>
            <ProductList products={products} addToCart={handleAddToCart} />
          </>
        );
      case ViewState.PRODUCTS:
        return <ProductList products={products} addToCart={handleAddToCart} />;
      case ViewState.CART:
        return <CartView cart={cart} removeFromCart={removeFromCart} setView={setCurrentView} />;
      case ViewState.CHECKOUT:
        return <CheckoutView 
                  cart={cart} 
                  total={cart.reduce((sum, item) => sum + item.price, 0)} 
                  onPlaceOrder={handlePlaceOrder}
                  onBack={() => setCurrentView(ViewState.CART)}
               />;
      case ViewState.ADMIN:
        return <AdminDashboard onAddProduct={handleAddProduct} onCancel={() => setCurrentView(ViewState.HOME)} />;
      case ViewState.SMART_CHEF:
        return <SmartChef setView={setCurrentView} />;
      case ViewState.ABOUT:
        return (
          <div className="min-h-screen bg-brand-cream py-16">
            <div className="container mx-auto px-4">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1596660634621-e380f769024f?q=80&w=800&auto=format&fit=crop" 
                    alt="About Us" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-brand-brown mb-6">قصة تمور المملكة</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    بدأت رحلتنا من قلب مزارع النخيل في المملكة العربية السعودية، حيث توارثنا حب النخلة جيلاً بعد جيل. تأسست "تمور المملكة" برؤية واضحة: تقديم التمور العربية الفاخرة للعالم بأسلوب عصري يحافظ على الأصالة.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    نحن نؤمن بأن التمر ليس مجرد فاكهة، بل هو رمز للكرم والضيافة العربية. لذلك، نسعى دائماً لاختيار أجود المحاصيل وتعبئتها بأعلى معايير الجودة والنظافة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case ViewState.CONTACT:
        return (
          <div className="min-h-screen bg-brand-cream py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold text-brand-brown text-center mb-12">تواصل معنا</h2>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold text-brand-gold mb-6">معلومات الاتصال</h3>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 text-gray-700">
                        <div className="bg-brand-cream p-3 rounded-full text-brand-brown">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <p className="font-bold">مقرنا الرئيسي</p>
                          <p className="text-sm">طريق الملك فهد، الرياض، المملكة العربية السعودية</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-gray-700">
                        <div className="bg-brand-cream p-3 rounded-full text-brand-brown">
                          <Phone size={24} />
                        </div>
                        <div>
                          <p className="font-bold">الهاتف</p>
                          <p className="text-sm" dir="ltr">+966 11 000 0000</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-gray-700">
                        <div className="bg-brand-cream p-3 rounded-full text-brand-brown">
                          <Mail size={24} />
                        </div>
                        <div>
                          <p className="font-bold">البريد الإلكتروني</p>
                          <p className="text-sm">sales@kingdomdates.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">الاسم</label>
                      <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
                      <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-gold outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">الرسالة</label>
                      <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-gold outline-none"></textarea>
                    </div>
                    <button className="w-full bg-brand-brown hover:bg-brand-darkGold text-white font-bold py-3 rounded-lg transition-colors">
                      إرسال الرسالة
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Hero setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header currentView={currentView} setView={setCurrentView} cartCount={cart.length} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default App;
