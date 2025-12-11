import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Star, Heart } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  const [filter, setFilter] = useState<string>('all');
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const filteredProducts = filter === 'all' 
    ? products 
    : filter === 'favorites'
    ? products.filter(p => likedProducts.includes(p.id))
    : products.filter(p => p.category === filter);

  const toggleLike = (id: number) => {
    setLikedProducts(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'luxury', label: 'فاخر' },
    { id: 'royal', label: 'ملكي' },
    { id: 'nuts', label: 'مكسرات' },
    { id: 'bahariz', label: 'بهاريز' },
    { id: 'egyptian', label: 'مصري' },
    { id: 'saudi', label: 'سعودي' },
    { id: 'jordanian', label: 'أردني' },
  ];

  return (
    <section className="py-16 bg-brand-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-brown mb-4">منتجاتنا المميزة</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2 rounded-full border transition-all text-sm md:text-base ${
                  filter === cat.id 
                    ? 'bg-brand-brown text-white border-brand-brown shadow-md' 
                    : 'border-brand-brown text-brand-brown hover:bg-brand-brown/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
            
            <button 
              onClick={() => setFilter('favorites')}
              className={`px-5 py-2 rounded-full border transition-all flex items-center gap-2 text-sm md:text-base ${filter === 'favorites' ? 'bg-red-500 text-white border-red-500 shadow-md' : 'border-red-300 text-red-500 hover:bg-red-50'}`}
            >
              <Heart size={16} className={filter === 'favorites' ? 'fill-white' : ''} />
              <span>المفضلة</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const isLiked = likedProducts.includes(product.id);
              return (
                <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product.weight}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-brand-brown">{product.name}</h3>
                        <button 
                          onClick={() => toggleLike(product.id)}
                          className="transition-transform duration-200 active:scale-90 focus:outline-none"
                        >
                          <Heart 
                            size={20} 
                            className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors`}
                          />
                        </button>
                      </div>
                      <div className="flex text-yellow-400">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-bold text-brand-green">{product.price} ج.م</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-brand-brown hover:bg-brand-gold text-white p-3 rounded-full transition-colors flex items-center gap-2 active:scale-95"
                      >
                        <ShoppingBag size={20} />
                        <span className="text-sm font-medium">أضف للسلة</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-1 md:col-span-3 text-center py-12 text-gray-500 bg-white/50 rounded-lg border border-dashed border-gray-300">
              <p className="text-xl font-medium">
                {filter === 'favorites' ? 'لم تقم بإضافة أي منتجات للمفضلة بعد.' : 'لا توجد منتجات متاحة في هذا التصنيف حالياً.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;