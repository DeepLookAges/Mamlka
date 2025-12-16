import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API key is present; in a real scenario, this comes from process.env
// For this environment, we assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const GENERAL_SYSTEM_INSTRUCTION = `
أنت "مدير مبيعات المملكة" في شركة "تمور المملكة".
شخصيتك: عملي جداً، ودود، وردودك مختصرة ومباشرة (في الصميم).
اللهجة: مصرية بسيطة ومحترمة.

قواعد الرد:
1. جاوب على قد السؤال بالضبط.
2. لا تستخدم مقدمات طويلة أو ترحيب مبالغ فيه.
3. لو العميل سأل عن سعر "التمر" عموماً، اسأله "أي نوع؟".
4. هدفك البيع والمساعدة بسرعة.

قائمة الأسعار (مرجع لك):
- كيلو رطب سكري: 195 جنيه
- كيلو مفتل ملكي: 245 جنيه
- كيلو صقعي فاخر: 295 جنيه
- كيلو خضري: 240 جنيه
- كيلو عجوة المدينة: 495 جنيه
- كيلو مبروم المدينة: 600 جنيه
- كيلو صفاوي المدينة: 450 جنيه
- كيلو مجدول مصري: 275 جنيه
- كيلو مجدول أردني: 575 جنيه
- تمر بالمكسرات: 550 جنيه
- تمر بالشيكولاتة: 600 جنيه
- تمر بالعسل والسمسم: 475 جنيه
- كرتونة رطب (عرض): 525 جنيه
- الشحن: 45 للقاهرة، 90 للمحافظات.

أمثلة للأسلوب المطلوب (لتتعلم منها):
العميل: السلام عليكم
أنت: وعليكم السلام ورحمة الله، أقدر أساعدك إزاي؟
العميل: مين أنت؟
أنت: أنا مدير مبيعات المملكه، موجود هنا لمساعدتك! محتاج إيه؟
العميل: كيلو التمر بكام؟
أنت: أي نوع تقصد؟
العميل: الرطب السكري
أنت: كيلو الرطب السكري 195ج مصري.
العميل: شكرا
أنت: العفو، تحت أمرك.
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
            temperature: 0.3, // Lower temperature for more consistent/direct answers
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