import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, MapPin } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "محمد أحمد",
    location: "القاهرة",
    text: "تعامل راقي جداً وتغليف ممتاز. التمر وصل طازج وكأنه لسه مجموع، فعلاً طعم الأصالة.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "سارة محمود",
    location: "الإسكندرية",
    text: "جربت المجدول الأردني وكان حبة كبيرة وطعم خيال. شكراً على سرعة التوصيل للإسكندرية.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "عمر خالد",
    location: "الجيزة",
    text: "أفضل متجر تمور تعاملت معه في مصر، الأسعار مقابل الجودة ممتازة جداً. أنصح بالسكري المفتل.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "هدى عبد الرحمن",
    location: "المنصورة",
    text: "عجوة المدينة عندهم أصلية ونظيفة جداً، طلبتها للوالدة وعجبتها جداً. ربنا يبارك لكم.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "يوسف علي",
    location: "أسوان",
    text: "طلبت بوكس الهدايا بالمكسرات، كان واجهة مشرفة جداً قدام ضيوفي. التغليف لوحده حكاية.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "منى السيد",
    location: "طنطا",
    text: "خدمة العملاء محترمة جداً والشحن كان سريع رغم المسافة. التمر وصل بحالته الممتازة.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=200&auto=format&fit=crop"
  }
];

const TestimonialsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // Update items per page based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      (prev + 1) >= (testimonials.length - itemsPerPage + 1) ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - itemsPerPage : prev - 1
    );
  };

  return (
    <div className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-brown mb-3">آراء عملائنا</h2>
          <p className="text-gray-500">نفخر بثقة عملائنا في جميع أنحاء الجمهورية</p>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button 
            onClick={nextSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-brand-gold text-brand-brown p-3 rounded-full shadow-lg hover:bg-brand-gold hover:text-white transition-all transform hover:scale-110 rtl:right-auto rtl:left-[-20px] lg:rtl:left-[-50px]"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={prevSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-brand-gold text-brand-brown p-3 rounded-full shadow-lg hover:bg-brand-gold hover:text-white transition-all transform hover:scale-110 rtl:left-auto rtl:right-[-20px] lg:rtl:right-[-50px]"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden py-8">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {testimonials.map((item) => (
                <div 
                  key={item.id} 
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div className="bg-brand-cream/30 border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col items-center text-center relative group">
                    <Quote className="absolute top-4 right-4 text-brand-gold/20" size={40} />
                    
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-brand-gold text-white p-1.5 rounded-full shadow-sm">
                        <Quote size={12} fill="currentColor" />
                      </div>
                    </div>

                    <p className="text-gray-600 italic mb-6 leading-relaxed min-h-[80px]">
                      "{item.text}"
                    </p>

                    <div className="mt-auto">
                      <h4 className="font-bold text-brand-brown text-lg">{item.name}</h4>
                      <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-1">
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: testimonials.length - itemsPerPage + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === idx ? 'bg-brand-brown scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;