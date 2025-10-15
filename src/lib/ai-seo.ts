// AI SEO Helper - ใช้ OpenAI API หรือเทมเพลตพื้นฐาน

type SeoInput = {
  title: string;
  content?: string;
  keywords?: string[];
};

type SeoOutput = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  hashtags: string[];
};

export async function generateSeoContent(input: SeoInput): Promise<SeoOutput> {
  const apiKey = process.env.AI_API_KEY;

  // ถ้าไม่มี API Key ใช้เทมเพลตพื้นฐาน
  if (!apiKey) {
    return generateBasicSeo(input);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "คุณเป็นผู้เชี่ยวชาญ SEO สำหรับร้านอาหารไทย ช่วยสร้าง meta title, description, keywords และ hashtags ที่เหมาะสม",
          },
          {
            role: "user",
            content: `สร้าง SEO สำหรับ:\nหัวข้อ: ${input.title}\nเนื้อหา: ${input.content || ""}\nคำสำคัญ: ${input.keywords?.join(", ") || ""}\n\nตอบกลับในรูปแบบ JSON: { "metaTitle": "...", "metaDescription": "...", "keywords": [...], "hashtags": [...] }`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) throw new Error("AI API error");

    const data = await response.json();
    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);

    return {
      metaTitle: parsed.metaTitle || input.title,
      metaDescription: parsed.metaDescription || "",
      keywords: parsed.keywords || [],
      hashtags: parsed.hashtags || [],
    };
  } catch (error) {
    console.error("AI SEO error:", error);
    return generateBasicSeo(input);
  }
}

function generateBasicSeo(input: SeoInput): SeoOutput {
  const title = input.title;
  const description = input.content
    ? input.content.slice(0, 150) + "..."
    : `${title} - ฟาร์มอร่อย กะเพรา กาแฟ คาเฟ่`;

  const keywords = input.keywords || [
    "ฟาร์มอร่อย",
    "กะเพรา",
    "กาแฟ",
    "คาเฟ่",
    "ร้านอาหาร",
  ];

  const hashtags = [
    "#ฟาร์มอร่อย",
    "#กะเพรา",
    "#กาแฟ",
    "#ฟาร์มคาเฟ่",
    "#อาหารไทย",
  ];

  return {
    metaTitle: `${title} | ฟาร์มอร่อย`,
    metaDescription: description,
    keywords,
    hashtags,
  };
}

