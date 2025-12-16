import React, { useState } from 'react';
import { ViewState } from '../types';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, ShoppingBag } from 'lucide-react';

interface FAQViewProps {
  setView: (view: ViewState) => void;
}

const FAQView: React.FC<FAQViewProps> = ({ setView }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "ما هي أنواع التمور المتوفرة لديكم؟",
      answer: "نوفر تشكيلة مميزة من أجود التمور المختارة بعناية، وتشمل: تمور مصرية (مثل: السيوي، الصعيدي، الزغلول، الحياني)، تمور سعودية (مثل: السكري، الخلاص، الصقعي، العجوة)، وتمور أردنية فاخرة مختارة. يتم اختيار التمور من أفضل المزارع لضمان الجودة والطعم المميز."
    },
    {
      question: "هل التمور طبيعية 100%؟",
      answer: "نعم، جميع التمور لدينا طبيعية 100%، بدون أي مواد حافظة أو إضافات صناعية، ويتم تعبئتها وفق معايير صحية عالية."
    },
    {
      question: "هل تقومون بتعبئة التمور بأنفسكم؟",
      answer: "نعم، نقوم بتعبئة التمور في عبوات محكمة داخل منشآت مجهزة، مع مراعاة أعلى معايير النظافة والسلامة الغذائية للحفاظ على جودة التمر وطزاجته."
    },
    {
      question: "كيف أضمن جودة التمور قبل الشراء؟",
      answer: "نلتزم في elmamlaka.online باختيار أجود المحاصيل فقط، وفحص التمور قبل التعبئة، وتوضيح نوع التمر وبلد المنشأ بشكل واضح، مع توفير صور حقيقية للمنتجات ووصف دقيق لكل صنف. رضاكم هو أولويتنا."
    },
    {
      question: "هل الأسعار تشمل التعبئة؟",
      answer: "نعم، جميع الأسعار المعروضة على الموقع تشمل التعبئة والتغليف، ولا توجد أي رسوم خفية."
    },
    {
      question: "ما هي طرق الطلب المتاحة؟",
      answer: "يمكنكم الطلب بسهولة من خلال الموقع الإلكتروني elmamlaka.online مباشرة، أو التواصل عبر وسائل التواصل الاجتماعي الموضحة بالموقع."
    },
    {
      question: "ما طرق الدفع المتوفرة؟",
      answer: "حاليًا نوفر الدفع عند الاستلام فقط، وذلك لضمان راحة واطمئنان عملائنا أثناء الشراء. يتم دفع قيمة الطلب كاملة عند استلامه."
    },
    {
      question: "هل يوجد توصيل داخل مصر؟",
      answer: "نعم، نوفر خدمة التوصيل داخل القاهرة وجميع المحافظات. يتم تحديد تكلفة الشحن حسب المنطقة أثناء تأكيد الطلب."
    },
    {
      question: "كم تستغرق مدة التوصيل؟",
      answer: "داخل القاهرة: من 1 إلى 3 أيام عمل. باقي المحافظات: من 3 إلى 5 أيام عمل. نحرص دائمًا على توصيل الطلبات في أسرع وقت ممكن."
    },
    {
      question: "هل يمكن الطلب بكميات كبيرة أو بالجملة؟",
      answer: "نعم، نوفر أسعار خاصة للطلبات الكبيرة والجملة، سواء للتجار أو المناسبات (رمضان، هدايا، شركات). يرجى التواصل معنا مباشرة للحصول على عرض سعر."
    },
    {
      question: "هل يمكن استبدال أو إرجاع الطلب؟",
      answer: "نعم، في حال وجود أي مشكلة في الجودة أو خطأ في الطلب، يرجى التواصل معنا خلال 24 ساعة من الاستلام، وسنقوم بحل المشكلة فورًا وفق سياسة الاستبدال والاسترجاع."
    },
    {
      question: "كيف يمكن التواصل معكم؟",
      answer: "يمكنكم التواصل معنا عبر صفحة 'اتصل بنا' على الموقع، وسائل التواصل الاجتماعي، البريد الإلكتروني أو رقم الهاتف الموضحين بالموقع، أو التحدث إلى مدير مبيعات المملكة من خلال الموقع الرسمي. فريق خدمة العملاء جاهز للرد على جميع استفساراتكم."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block p-4 bg-brand-brown/10 rounded-full mb-4">
            <HelpCircle size={48} className="text-brand-brown" />
          </div>
          <h2 className="text-4xl font-bold text-brand-brown mb-4">الأسئلة الشائعة</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            مرحبًا بكم في <span className="font-bold text-brand-gold">elmamlaka.online</span>. 
            هنا تجدون إجابات لأكثر الأسئلة شيوعًا لمساعدتكم على تجربة شراء سهلة وواضحة.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 animate-fade-in-up delay-100">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl overflow-hidden transition-all duration-300 border ${
                openIndex === index ? 'border-brand-gold shadow-lg' : 'border-transparent shadow-sm hover:shadow-md'
              }`}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-6 text-right focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-brand-brown' : 'text-gray-700'}`}>
                  {item.question}
                </span>
                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-brand-gold text-white' : 'bg-gray-100 text-gray-500'}`}>
                   {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-dashed border-gray-100 mt-2">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center bg-brand-brown rounded-2xl p-8 text-white relative overflow-hidden shadow-xl animate-fade-in-up delay-200">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 text-brand-gold">لم تجد إجابة لسؤالك؟</h3>
            <p className="text-gray-300 mb-8">
              فريق خدمة العملاء جاهز للرد على جميع استفساراتكم. نقدم لكم التمور كما يجب أن تكون… جودة، أمانة، المذاق العربي.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setView(ViewState.CONTACT)}
                className="bg-brand-gold hover:bg-white hover:text-brand-brown text-white font-bold py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                <span>تواصل معنا</span>
              </button>
              <button 
                onClick={() => setView(ViewState.PRODUCTS)}
                className="border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white font-bold py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                <span>تسوق الآن</span>
              </button>
            </div>
          </div>
          
          {/* Decorative Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-gold rounded-full blur-3xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQView;