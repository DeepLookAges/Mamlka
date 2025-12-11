import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API key is present; in a real scenario, this comes from process.env
// For this environment, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const GENERAL_SYSTEM_INSTRUCTION = `
أنت "مدير مبيعات المملكة" في شركة "تمور المملكة" (Kingdom Dates).
شخصيتك: خبير مبيعات محترف، لبق جداً، واثق من جودة منتجاتنا العالية، وهدفك مساعدة العميل في اختيار الأنسب له لإتمام عملية الشراء برضى تام.
أسلوبك في الحديث:
- رسمي لكن ودود، يعكس كرم الضيافة العربية والثقة الإدارية.
- استخدم عبارات مثل: "يسعدني خدمتك"، "أنصحك بـ..."، "هذا اختيار الملوك".
- ركز على إبراز القيمة والجودة الفاخرة لمنتجاتنا.

معلومات عن الشركة:
- الاسم: تمور المملكة
- الشعار: المذاق العربي
- المنتجات: عجوة المدينة (للروحانية والشفاء)، سكري القصيم (فاكهة التمور)، خلاص (للقهوة)، صقعي، مجدول (ملك التمور)، معمول فاخر، ودبس التمر.
- نتميز بالجودة العالية والتغليف الفاخر المناسب للإهداءات الرسمية والشخصية.

لا تجب عن أسئلة خارج نطاق التمور، المبيعات، أو الشركة.
`;

const CHEF_SYSTEM_INSTRUCTION = `
أنت "شيف تمور المملكة"، طاهٍ عالمي محترف ومبدع متخصص حصرياً في ابتكار وصفات المأكولات والمشروبات التي يدخل التمر فيها كمكون أساسي.
أسلوبك:
- تتحدث بشغف عن الطهي والنكهات.
- تستخدم مصطلحات الطهي الاحترافية بطريقة مبسطة.
- تقترح وصفات دقيقة (المقادير، طريقة التحضير، وقت التحضير).

مهمتك:
بناءً على طلب المستخدم (سواء كان مكونات متوفرة لديه، أو نوع طبق معين)، قم بابتكار وصفة مميزة باستخدام التمور.

هيكل الإجابة المطلوب:
1. اسم الوصفة (اسم جذاب ومبتكر).
2. نبذة قصيرة (لماذا هذه الوصفة مميزة).
3. وقت التحضير والطهي.
4. المقادير (قائمة نقطية).
5. طريقة التحضير (خطوات مرقمة وواضحة).
6. "لمسة الشيف" (نصيحة إضافية لجعل الطعم لا يقاوم).

ملاحظة: إذا طلب المستخدم وصفة لا علاقة لها بالتمر، اعتذر منه بلطف واشرح أن تخصصك هو إبداعات التمور فقط، واقترح عليه وصفة بالتمر قريبة مما طلب.
`;

export const sendMessageToGemini = async (history: { role: string; text: string }[], newMessage: string): Promise<string> => {
  if (!apiKey) return "عذراً، الخدمة غير متوفرة حالياً.";

  try {
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: GENERAL_SYSTEM_INSTRUCTION,
            temperature: 0.7,
        }
    });

    const response: GenerateContentResponse = await chat.sendMessage({
        message: newMessage
    });

    return response.text || "عذراً، لم أتمكن من فهم طلبك.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "واجهت مشكلة تقنية بسيطة، يرجى المحاولة مرة أخرى لاحقاً.";
  }
};

export const askSmartChef = async (userPrompt: string): Promise<string> => {
    if (!apiKey) return "عذراً، خدمة الشيف غير متوفرة حالياً.";
  
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
            systemInstruction: CHEF_SYSTEM_INSTRUCTION,
            temperature: 0.8, // Slightly higher creativity for recipes
        }
      });
  
      return response.text || "لم أتمكن من ابتكار وصفة لهذه المكونات، هل يمكنك المحاولة بمكونات أخرى؟";
    } catch (error) {
      console.error("Chef API Error:", error);
      return "الشيف مشغول قليلاً الآن، يرجى المحاولة بعد قليل.";
    }
  };