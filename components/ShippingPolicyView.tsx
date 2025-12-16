import React from 'react';
import { ViewState } from '../types';
import { Truck, MapPin, Clock, DollarSign, CheckCircle, Banknote, AlertTriangle, PackageCheck, Headphones, ArrowRight } from 'lucide-react';

interface ShippingPolicyViewProps {
  setView: (view: ViewState) => void;
}

const ShippingPolicyView: React.FC<ShippingPolicyViewProps> = ({ setView }) => {
  const policies = [
    {
      icon: <MapPin className="text-brand-gold" size={32} />,
      title: "1. نطاق الشحن",
      content: (
        <>
          <p>نقوم بالشحن داخل <strong>جمهورية مصر العربية فقط</strong>، ويشمل ذلك:</p>
          <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
            <li>القاهرة الكبرى</li>
            <li>جميع المحافظات</li>
          </ul>
          <p className="mt-2 text-sm text-red-500">لا يتوفر حاليًا شحن خارج مصر.</p>
        </>
      )
    },
    {
      icon: <Clock className="text-brand-gold" size={32} />,
      title: "2. مدة التوصيل",
      content: (
        <>
          <p>تعتمد مدة التوصيل على موقع العميل، وتكون كالتالي:</p>
          <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
            <li><strong>القاهرة الكبرى:</strong> من 1 إلى 3 أيام عمل</li>
            <li><strong>باقي المحافظات:</strong> من 3 إلى 5 أيام عمل</li>
          </ul>
          <div className="mt-3 bg-brand-cream p-3 rounded-lg text-sm border border-brand-gold/20">
             <strong>ملاحظة:</strong> أيام العمل من السبت إلى الخميس، ولا تشمل الإجازات الرسمية.
          </div>
        </>
      )
    },
    {
      icon: <DollarSign className="text-brand-gold" size={32} />,
      title: "3. تكلفة الشحن",
      content: (
        <>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>يتم تحديد <strong>تكلفة الشحن حسب المنطقة</strong> وكمية الطلب.</li>
            <li>يتم إبلاغ العميل بتكلفة الشحن النهائية عند تأكيد الطلب.</li>
          </ul>
          <p className="mt-2 font-medium text-brand-brown">نلتزم بالشفافية الكاملة ولا توجد أي رسوم خفية.</p>
        </>
      )
    },
    {
      icon: <Truck className="text-brand-gold" size={32} />,
      title: "4. طريقة الشحن",
      content: (
        <>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>يتم شحن الطلبات من خلال شركات شحن موثوقة.</li>
            <li>جميع التمور يتم تعبئتها بعناية في عبوات محكمة للحفاظ على الجودة والطزاجة أثناء النقل.</li>
          </ul>
        </>
      )
    },
    {
      icon: <CheckCircle className="text-brand-gold" size={32} />,
      title: "5. تأكيد الطلب",
      content: (
        <>
          <p>بعد إتمام الطلب، يقوم فريق خدمة العملاء بالتواصل مع العميل لتأكيد:</p>
          <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
            <li>بيانات الطلب</li>
            <li>عنوان الشحن</li>
            <li>موعد التوصيل المتوقع</li>
          </ul>
          <p className="mt-2 text-sm font-bold text-brand-brown">لا يتم شحن أي طلب قبل التأكيد النهائي.</p>
        </>
      )
    },
    {
      icon: <Banknote className="text-brand-gold" size={32} />,
      title: "6. طريقة الدفع",
      content: (
        <>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">الدفع عند الاستلام فقط</span>
          </div>
          <p className="text-gray-600">يتم سداد قيمة الطلب كاملة لمندوب الشحن عند الاستلام.</p>
        </>
      )
    },
    {
      icon: <AlertTriangle className="text-brand-gold" size={32} />,
      title: "7. في حالة تعذر التسليم",
      content: (
        <>
          <p>في حال عدم الرد على مندوب الشحن أو عدم تواجد العميل، يتم إعادة جدولة التسليم مرة واحدة.</p>
          <p className="mt-2 text-sm text-red-500">في حال تكرار التعذر، يحق لإدارة الموقع إلغاء الطلب.</p>
        </>
      )
    },
    {
      icon: <PackageCheck className="text-brand-gold" size={32} />,
      title: "8. فحص الطلب عند الاستلام",
      content: (
        <>
          <p>يرجى من العميل فحص الطلب والتأكد من سلامة العبوة عند الاستلام.</p>
          <p className="mt-2 text-gray-600">في حال وجود أي مشكلة، يرجى التواصل معنا فورًا خلال <strong>24 ساعة</strong>.</p>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block p-4 bg-brand-brown rounded-full mb-6 shadow-lg">
            <Truck size={48} className="text-brand-gold" />
          </div>
          <h2 className="text-4xl font-bold text-brand-brown mb-4">سياسة الشحن والتوصيل</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            في <span className="font-bold text-brand-gold">elmamlaka.online</span> نحرص على توصيل أجود أنواع التمور لعملائنا بسرعة وأمان، مع الالتزام بالوضوح الكامل في جميع إجراءات الشحن.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 animate-fade-in-up delay-100">
          {policies.map((policy, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-brand-cream p-3 rounded-xl flex-shrink-0">
                  {policy.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-brown mb-4">{policy.title}</h3>
                  <div className="text-gray-700 leading-relaxed">
                    {policy.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-brand-brown rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-2xl animate-fade-in-up delay-200">
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white/10 p-4 rounded-full mb-6">
                <Headphones size={40} className="text-brand-gold" />
            </div>
            <h3 className="text-2xl font-bold mb-4">لديكم استفسارات أخرى؟</h3>
            <p className="text-gray-300 mb-8 max-w-xl">
              لأي استفسارات متعلقة بالشحن، يمكنكم التواصل معنا عبر صفحة "اتصل بنا" أو وسائل التواصل الاجتماعي.
            </p>
            <button 
              onClick={() => setView(ViewState.CONTACT)}
              className="bg-brand-gold hover:bg-white hover:text-brand-brown text-white font-bold py-4 px-10 rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>تواصل معنا الآن</span>
              <ArrowRight size={20} className="rtl:rotate-180" />
            </button>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="text-center mt-12 text-gray-500 text-sm">
            <p><strong>elmamlaka.online</strong></p>
            <p>نوصّل إليكم أجود التمور… بسرعة، أمان، وثقة 🌴 .. المذاق العربي</p>
        </div>

      </div>
    </div>
  );
};

export default ShippingPolicyView;