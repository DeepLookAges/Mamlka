import React, { useState } from "react";
import { Wand2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/genai";

// IMPORTANT:
// في Vite لازم أي متغير بيئة يبتدي بـ VITE_ عشان يبان في الـfrontend.
// 1) في جهازك المحلي حط ملف .env.local وفيه:
//    VITE_GEMINI_API_KEY=YOUR_KEY_HERE
// 2) في Vercel: Settings → Environment Variables
//    Name: VITE_GEMINI_API_KEY
//    Value: نفس المفتاح
const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not set. Gemini features will not work.");
}

const client = apiKey
  ? new GoogleGenerativeAI(apiKey)
  : null;

const App: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAsk() {
    setError(null);
    setAnswer("");

    if (!client) {
      setError("إعداد مفتاح Gemini غير مفعّل حاليًا، تواصل مع المطوّر.");
      return;
    }

    if (!prompt.trim()) {
      setError("من فضلك اكتب سؤالك عن تمور المملكة أولًا.");
      return;
    }

    try {
      setLoading(true);

      const model = client.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const result = await model.generateContent(
        `أنت مساعد مبيعات لعلامة تمور المملكة. جاوب بالعربية الفصحى المبسّطة، 
        وركّز على اقتراح أفضل أنواع التمور، العروض، وطريقة الاستخدام. 
        سؤال العميل: ${prompt}`
      );

      const text = result.response.text();
      setAnswer(text);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء جلب الإجابة من المساعد الذكي، حاول مرة أخرى لاحقًا.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-brand-cream">
      <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-xl border border-brand-gold/40 p-5 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-brown">
              تمور المملكة - المذاق العربي الأصيل
            </h1>
            <p className="mt-1 text-sm md:text-base text-brand-brown/80">
              اسأل المساعد الذكي عن الأنواع المناسبة، الهدايا، العروض، والتغليف لعلامة تمور المملكة.
            </p>
          </div>
          <div className="flex items-center gap-2 text-brand-gold">
            <Wand2 className="w-6 h-6" />
            <span className="text-sm font-semibold">مساعد المملكة الذكي</span>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-3">
          <textarea
            className="w-full border border-brand-gold/40 rounded-2xl p-3 md:p-4 bg-brand-cream/60 focus:outline-none focus:ring-2 focus:ring-brand-gold/70 text-sm md:text-base"
            placeholder="مثال: أريد اقتراح هدية من تمور المملكة لعائلة من ٥ أفراد، ما أفضل الأنواع والتغليف؟"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleAsk}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-brand-gold text-white font-semibold text-sm md:text-base hover:bg-brand-darkGold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Wand2 className="w-4 h-4" />
              {loading ? "جارٍ التحليل..." : "اسأل المساعد"}
            </button>

            <button
              type="button"
              onClick={() => {
                setPrompt("");
                setAnswer("");
                setError(null);
              }}
              className="text-xs md:text-sm text-brand-brown/70 hover:text-brand-brown underline"
            >
              مسح المحادثة
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-2xl border border-red-300 bg-red-50/80 p-3 text-xs md:text-sm text-red-700 leading-relaxed">
            {error}
          </div>
        )}

        {/* Answer */}
        {answer && !error && (
          <div className="mt-4 rounded-2xl border border-brand-gold/30 bg-brand-cream/80 p-3 md:p-4 text-sm md:text-base text-brand-brown leading-relaxed whitespace-pre-wrap">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
