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
import TestimonialsSlider from './components/TestimonialsSlider';
import { ViewState, Product } from './types';
import { MapPin, Phone, Mail } from 'lucide-react';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "كيلو رطب سكري",
    description: "رطب سكري فاخر، يتميز بمذاقه الحلو وقوامه الرطب الذي يذوب في الفم. خيار مثالي للقهوة.",
    price: 195,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1615486511484-92e172cc416d?q=80&w=800&auto=format&fit=crop",
    category: "saudi"
  },
  {
    id: 2,
    name: "كيلو مفتل ملكي",
    description: "تمر سكري مفتل حبة كبيرة، لون ذهبي ومذاق كراميلي غني. فخر الموائد.",
    price: 245,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1596660634621-e380f769024f?q=80&w=800&auto=format&fit=crop",
    category: "royal"
  },
  {
    id: 3,
    name: "كيلو صقعي فاخر",
    description: "تمر الصقعي المميز بتداخل اللونين الأحمر والأشقر، معتدل الحلاوة وقوام متماسك.",
    price: 295,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1596541460368-466d713c7784?q=80&w=800&auto=format&fit=crop",
    category: "luxury"
  },
  {
    id: 4,
    name: "كيلو خضري",
    description: "تمر خضري داكن اللون، يتميز بقشرة مجعدة وطعم سكري معتدل، غني بالألياف.",
    price: 240,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1628151016024-5d988450f3b3?q=80&w=800&auto=format&fit=crop",
    category: "saudi"
  },
  {
    id: 5,
    name: "كيلو عجوة المدينة",
    description: "عجوة المدينة المنورة المباركة، حبة سوداء مستديرة، شفاء وبركة ومذاق لا يضاهى.",
    price: 495,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800&auto=format&fit=crop",
    category: "royal"
  },
  {
    id: 6,
    name: "كيلو مبروم المدينة",
    description: "تمر مبروم طويل الشكل، أحمر داكن، قوام مطاطي لذيذ يعتبر من أفخر تمور المدينة.",
    price: 600,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1585235882207-6c3d9b4c0263?q=80&w=800&auto=format&fit=crop",
    category: "luxury"
  },
  {
    id: 7,
    name: "كيلو صفاوي المدينة",
    description: "تمر صفاوي أسود اللون، شديد السواد، طري الملمس وحلو المذاق، شبيه بالعجوة.",
    price: 450,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=800&auto=format&fit=crop",
    category: "saudi"
  },
  {
    id: 8,
    name: "كيلو مجدول مصري",
    description: "تمر المجدول (ملك التمور) إنتاج مصري فاخر، حبة كبيرة ولحمية ومذاق رائع.",
    price: 275,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1601633512752-19e492c64b6e?q=80&w=800&auto=format&fit=crop",
    category: "egyptian"
  },
  {
    id: 9,
    name: "كيلو مجدول أردني",
    description: "المجدول الأردني الأصلي، جامبو، قوام طري جداً ومذاق يشبه التوفي. قمة الفخامة.",
    price: 575,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=800&auto=format&fit=crop",
    category: "jordanian"
  },
  {
    id: 10,
    name: "تمر بالمكسرات الفاخرة",
    description: "تمور محشوة بأجود أنواع المكسرات (لوز، فستق، كاجو)، ضيافة راقية ومذاق مقرمش.",
    price: 550,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1574676484305-64d1152a5538?q=80&w=800&auto=format&fit=crop",
    category: "nuts"
  },
  {
    id: 11,
    name: "تمر مغطى بالشيكولاتة",
    description: "توليفة ساحرة من التمر الفاخر المغطى بالشيكولاتة البلجيكية الغنية.",
    price: 600,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1629251873133-7c91c3374825?q=80&w=800&auto=format&fit=crop",
    category: "bahariz"
  },
  {
    id: 12,
    name: "تمر بالعسل والسمسم واللوز",
    description: "خلطة الطاقة والمناعة، تمر مغمس بالعسل الطبيعي والسمسم ومحشو باللوز.",
    price: 475,
    weight: "1 كجم",
    imageUrl: "https://images.unsplash.com/photo-1632822709287-c83138382c2d?q=80&w=800&auto=format&fit=crop",
    category: "bahariz"
  },
  {
    id: 13,
    name: "كرتونة رطب (عرض خاص)",
    description: "كرتونة توفير عائلي من الرطب السكري الطازج، مذاق رائع وسعر اقتصادي.",
    price: 525,
    weight: "3.5 - 4 كجم",
    imageUrl: "https://images.unsplash.com/photo-1588167056637-29381e428e28?q=80&w=800&auto=format&fit=crop",
    category: "saudi"
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
          <div className="min-h-screen bg-brand-cream">
            <div className="py-16">
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
            <TestimonialsSlider />
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
                          <p className="text-sm">الوراق، الجيزة، مصر.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-gray-700">
                        <div className="bg-brand-cream p-3 rounded-full text-brand-brown">
                          <Phone size={24} />
                        </div>
                        <div>
                          <p className="font-bold">واتساب</p>
                          <p className="text-sm" dir="ltr">+20 10 3305 6159</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-gray-700">
                        <div className="bg-brand-cream p-3 rounded-full text-brand-brown">
                          <Mail size={24} />
                        </div>
                        <div>
                          <p className="font-bold">خدمة العملاء</p>
                          <p className="text-sm">مكتوبي</p>
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
      <Footer setView={setCurrentView} />
      <ChatAssistant />
    </div>
  );
};

export default App;