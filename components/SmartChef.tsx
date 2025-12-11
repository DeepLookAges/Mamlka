
import React, { useState } from 'react';
import { ChefHat, Utensils, Coffee, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { askSmartChef } from '../services/geminiService';
import { ViewState } from '../types';

interface SmartChefProps {
  setView: (view: ViewState) => void;
}

const SmartChef: React.FC<SmartChefProps> = ({ setView }) => {
  const [prompt, setPrompt] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChefRequest = async (customPrompt?: string) => {
    const textToSend = customPrompt || prompt;
    if (!textToSend.trim()) return;

    setIsLoading(true);
    setRecipe('');
    
    try {
      const result = await askSmartChef(textToSend);
      setRecipe(result);
    } catch (error) {
      setRecipe("عذراً، حدث خطأ أثناء الاتصال بالشيف.");
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { label: "سموثي الطاقة بالتمر", icon: <Coffee size={18} />, prompt: "اقترح لي وصفة سموثي طاقة صحي باستخدام التمر ومكونات منعشة" },
    { label: "كيكة التمر الفاخرة", icon: <Utensils size={18} />, prompt: "أريد طريقة عمل كيكة التمر الفاخرة مع صوص التوفي" },
    { label: "سناك صحي وسريع", icon: <Sparkles size={18} />, prompt: "وصفة كرات طاقة بالتمر والمكسرات بدون خبز" },
    { label: "مشروب تمر ساخن", icon: <Coffee size={18} />, prompt: "طريقة عمل مشروب التمر الساخن بالحليب والهيل لفصل الشتاء" },
  ];

  return (
    <div className="min-h-screen bg-brand-cream/50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-brand-brown rounded-full mb-4 shadow-xl">
            <ChefHat size={48} className="text-brand-gold" />
          </div>
          <h2 className="text-4xl font-bold text-brand-brown mb-2">الشيف الذكي</h2>
          <p className="text-gray-600 text-lg">
            أنا شيف "تمور المملكة". أخبرني بالمكونات المتوفرة لديك، أو نوع الطبق الذي تشتهيه، وسأبتكر لك وصفة لا تُقاوم بلمسة التمر السحرية.
          </p>
        </div>

        {/* Search/Input Area */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-brand-gold/20">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="مثال: لدي تمر، شوفان، وحليب... ماذا يمكنني أن أصنع؟"
              className="flex-1 border border-gray-300 rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-brand-gold outline-none shadow-inner"
              onKeyDown={(e) => e.key === 'Enter' && handleChefRequest()}
            />
            <button
              onClick={() => handleChefRequest()}
              disabled={isLoading || !prompt.trim()}
              className="bg-brand-brown hover:bg-brand-gold disabled:bg-gray-300 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 min-w-[160px]"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              <span>ابتكر وصفة</span>
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                    setPrompt(item.prompt); // Just for visual feedback
                    handleChefRequest(item.prompt);
                }}
                className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-brand-gold/40 hover:bg-brand-gold/10 hover:border-brand-gold transition-colors text-center"
              >
                <div className="text-brand-brown">{item.icon}</div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Display Area */}
        {isLoading && (
            <div className="text-center py-12">
                <div className="inline-block animate-bounce mb-4">
                    <ChefHat size={64} className="text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold text-brand-brown animate-pulse">جاري تحضير الوصفة لك...</h3>
                <p className="text-gray-500">الشيف يجمع أفضل المكونات الآن</p>
            </div>
        )}

        {recipe && !isLoading && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-brand-gold animate-fade-in-up">
            <div className="bg-pattern p-8 md:p-12">
               <div className="prose prose-lg max-w-none prose-headings:text-brand-brown prose-p:text-brand-brown prose-li:text-brand-brown prose-strong:text-brand-darkGold">
                 {/* Rendering simple text with line breaks for now. In a real app, use a Markdown renderer */}
                 {recipe.split('\n').map((line, i) => (
                    <p key={i} className={`${line.startsWith('**') || line.startsWith('#') ? 'font-bold text-brand-brown text-xl mt-4' : 'mb-2 text-brand-brown'}`}>
                        {line.replace(/\*\*/g, '').replace(/#/g, '')}
                    </p>
                 ))}
               </div>
            </div>
            
            <div className="bg-brand-brown p-4 text-center">
                 <button 
                    onClick={() => setView(ViewState.PRODUCTS)}
                    className="text-white hover:text-brand-gold font-bold flex items-center justify-center gap-2 mx-auto transition-colors"
                 >
                    <span>هل تحتاج لشراء التمور لهذه الوصفة؟ تسوق الآن</span>
                    <ArrowRight size={20} className="rtl:rotate-180" />
                 </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartChef;
