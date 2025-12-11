
import React, { useState } from 'react';
import { Product, ViewState } from '../types';
import { Plus, Image as ImageIcon, Save, ArrowLeft, Lock } from 'lucide-react';

interface AdminDashboardProps {
  onAddProduct: (product: Product) => void;
  onCancel: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onAddProduct, onCancel }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Product Form State
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    weight: '',
    imageUrl: '',
    category: 'daily',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'ML123###') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('كلمة المرور غير صحيحة');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      ...formData,
      id: Date.now(),
    };
    onAddProduct(newProduct);
    alert('تم إضافة المنتج بنجاح!');
    setFormData({
      name: '',
      description: '',
      price: 0,
      weight: '',
      imageUrl: '',
      category: 'daily',
    });
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-brand-brown p-6 text-center">
            <div className="mx-auto bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-brand-gold" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white">منطقة الإدارة</h2>
            <p className="text-brand-gold/80 text-sm mt-1">يرجى إدخال كلمة المرور للمتابعة</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-gold outline-none text-left"
                  placeholder="••••••••"
                  autoFocus
                />
                {authError && <p className="text-red-500 text-sm mt-2">{authError}</p>}
              </div>
              
              <button
                type="submit"
                className="w-full bg-brand-gold hover:bg-brand-darkGold text-white font-bold py-3 rounded-lg transition-colors shadow-md"
              >
                تسجيل الدخول
              </button>
              
              <button
                type="button"
                onClick={onCancel}
                className="w-full text-gray-500 hover:text-brand-brown text-sm font-medium transition-colors"
              >
                العودة للرئيسية
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-brand-brown">لوحة التحكم - إضافة منتج</h2>
            <button 
                onClick={onCancel}
                className="flex items-center gap-2 text-gray-600 hover:text-brand-brown transition-colors"
            >
                <ArrowLeft size={20} />
                <span>العودة للمتجر</span>
            </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">اسم المنتج</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="مثال: سكري فاخر"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-gold outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">التصنيف</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-gold outline-none"
                >
                  <option value="daily">يومي</option>
                  <option value="luxury">فاخر</option>
                  <option value="gifts">هدايا</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">السعر (ج.م)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-gold outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">الوزن / الكمية</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  placeholder="مثال: 1 كجم"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-gold outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">وصف المنتج</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="اكتب وصفاً جذاباً للمنتج..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-gold outline-none"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">رابط الصورة</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                        <ImageIcon size={20} />
                    </div>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                        placeholder="https://example.com/image.jpg"
                        className="w-full border border-gray-300 rounded-lg pr-10 pl-4 py-2 focus:ring-2 focus:ring-brand-gold outline-none"
                    />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">يمكنك استخدام روابط صور مباشرة.</p>
            </div>

            {/* Image Preview */}
            {formData.imageUrl && (
                <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex justify-center">
                    <img src={formData.imageUrl} alt="Preview" className="h-48 object-contain rounded-md shadow-sm" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="bg-brand-brown hover:bg-brand-gold text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
              >
                <Save size={20} />
                <span>حفظ المنتج</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
