
import React, { useState } from 'react';
import { Product, ViewState } from '../types';
import { ArrowRight, CreditCard, Truck, CheckCircle } from 'lucide-react';

interface CheckoutViewProps {
  cart: Product[];
  total: number;
  onPlaceOrder: () => void;
  onBack: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, total, onPlaceOrder, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder();
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-brand-brown mb-8 text-center">إتمام الطلب</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Right Side: Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-brand-brown mb-6 flex items-center gap-2">
                <Truck className="text-brand-gold" />
                <span>عنوان التوصيل</span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-gold outline-none"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">رقم الجوال</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-gold outline-none"
                      placeholder="05xxxxxxxx"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">المدينة</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-gold outline-none"
                      placeholder="الرياض، جدة، ..."
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">العنوان التفصيلي</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-gold outline-none"
                      placeholder="اسم الحي، الشارع، رقم المنزل"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-xl font-bold text-brand-brown mb-4 flex items-center gap-2">
                        <CreditCard className="text-brand-gold" />
                        <span>طريقة الدفع</span>
                    </h3>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-3 p-4 border-2 border-brand-gold/30 bg-brand-gold/5 rounded-lg cursor-pointer w-full">
                            <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-brand-gold focus:ring-brand-gold" />
                            <span className="font-bold text-gray-800">الدفع عند الاستلام</span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row gap-4 pt-4">
                     <button 
                        type="button" 
                        onClick={onBack}
                        className="w-full md:w-1/3 py-3 border border-gray-300 text-gray-600 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                    >
                        عودة للسلة
                    </button>
                    <button 
                        type="submit"
                        className="w-full md:w-2/3 bg-brand-brown hover:bg-brand-gold text-white font-bold py-3 rounded-lg transition-colors shadow-md"
                    >
                        تأكيد الطلب ({total} ج.م)
                    </button>
                </div>
              </form>
            </div>
          </div>

          {/* Left Side: Summary */}
          <div className="lg:w-1/3">
             <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">ملخص الطلب</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto mb-4 scrollbar-thin">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs">{idx + 1}</span>
                                <span className="text-gray-700 truncate max-w-[150px]">{item.name}</span>
                            </div>
                            <span className="font-bold text-brand-brown">{item.price} ج.م</span>
                        </div>
                    ))}
                </div>
                
                <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                        <span>المجموع الفرعي</span>
                        <span>{total} ج.م</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>الشحن</span>
                        <span className="text-green-600 font-bold">مجاني</span>
                    </div>
                     <div className="flex justify-between text-2xl font-bold text-brand-brown pt-2">
                        <span>الإجمالي</span>
                        <span>{total} ج.م</span>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
