
import React, { useState } from 'react';
import { Product, ViewState } from '../types';
import { Trash2, ShoppingBag, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

interface CartViewProps {
  cart: Product[];
  removeFromCart: (index: number) => void;
  setView: (view: ViewState) => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, removeFromCart, setView }) => {
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleDeleteClick = (index: number) => {
    setItemToDelete(index);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      removeFromCart(itemToDelete);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setItemToDelete(null);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 p-4 animate-fade-in">
        <div className="bg-white p-8 rounded-full shadow-lg mb-6">
            <ShoppingBag size={64} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">سلة المشتريات فارغة</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">يبدو أنك لم تقم بإضافة أي منتجات لذيذة إلى سلتك بعد. تصفح منتجاتنا واختر ما يناسب ذوقك الرفيع.</p>
        <button
          onClick={() => setView(ViewState.PRODUCTS)}
          className="bg-brand-brown text-white px-8 py-3 rounded-full hover:bg-brand-gold transition-colors flex items-center gap-2 font-bold shadow-md hover:shadow-xl transform hover:-translate-y-1 duration-300"
        >
          <span>تصفح المنتجات</span>
          <ArrowRight size={20} className="mr-1" />
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-brand-cream/30 relative">
      <h2 className="text-3xl font-bold text-brand-brown mb-8 flex items-center gap-3">
        <ShoppingBag className="text-brand-gold" />
        سلة المشتريات
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="lg:w-2/3 space-y-4">
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg text-brand-brown">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-1">{item.weight}</p>
                <div className="text-brand-gold font-bold text-lg">{item.price} ج.م</div>
              </div>
              
              <button
                onClick={() => handleDeleteClick(index)}
                className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors group"
                title="حذف من السلة"
              >
                <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-brand-gold/20 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">ملخص الطلب</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>عدد المنتجات</span>
                <span className="font-medium">{cart.length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>الشحن</span>
                <span className="text-green-600 font-medium flex items-center gap-1">
                    مجاني
                    <CheckCircle size={14} />
                </span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-brand-brown pt-4 border-t border-dashed border-gray-200">
                <span>الإجمالي</span>
                <span>{total} ج.م</span>
              </div>
            </div>

            <button 
                onClick={() => setView(ViewState.CHECKOUT)}
                className="w-full bg-brand-gold hover:bg-brand-darkGold text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg mb-4 transform active:scale-95 flex justify-center items-center gap-2"
            >
              <span>متابعة الشراء</span>
              <ArrowRight size={20} className="rtl:rotate-180" />
            </button>
            
            <button 
              onClick={() => setView(ViewState.PRODUCTS)}
              className="w-full bg-transparent border-2 border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>إضافة المزيد من المنتجات</span>
            </button>

            <div className="mt-6 text-center text-xs text-gray-400">
                <p>تسوق آمن ومضمون 100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {itemToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
           <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 transform scale-100 transition-all">
              <div className="flex flex-col items-center text-center">
                  <div className="bg-red-100 p-3 rounded-full text-red-500 mb-4">
                      <AlertTriangle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">تأكيد الحذف</h3>
                  <p className="text-gray-600 mb-6">هل أنت متأكد من رغبتك في إزالة هذا المنتج من السلة؟</p>
                  <div className="flex gap-3 w-full">
                      <button
                          onClick={cancelDelete}
                          className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                      >
                          إلغاء
                      </button>
                      <button
                          onClick={confirmDelete}
                          className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
                      >
                          حذف
                      </button>
                  </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
