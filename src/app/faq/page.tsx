import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย (FAQ) | ฟาร์มอร่อย",
  description: "คำถามที่พบบ่อยเกี่ยวกับฟาร์มอร่อย อาหาร เครื่องดื่ม บริการ และข้อมูลต่างๆ",
};

const faqCategories = [
  {
    category: "food_beverage",
    name: "อาหารและเครื่องดื่ม",
    icon: "🍽️",
    questions: [
      {
        q: "มีเครื่องดื่มแอลกอฮอล์ไหม",
        a: "มีหลายยี่ห้อให้เลือก ราคาไม่แพง เริ่มต้นที่ 50 บาท"
      },
      {
        q: "มีเมนูขนมหรือเค้กไหม",
        a: "มีหลายอย่าง เช่น เค้กทิรามิสุ บานอฟฟี่ เค้กส้ม และรับทำเค้กวันเกิดตามสั่ง (ต้องสั่งล่วงหน้า 2-3 วัน)"
      }
    ]
  },
  {
    category: "pets",
    name: "สัตว์เลี้ยง",
    icon: "🐕",
    questions: [
      {
        q: "มีสัตว์เลี้ยงในร้านไหม เช่น แมว หมา",
        a: "ตอนนี้ยังไม่มีสัตว์เลี้ยงประจำร้าน แต่ยินดีต้อนรับสัตว์เลี้ยงของลูกค้า"
      }
    ]
  },
  {
    category: "services",
    name: "บริการ",
    icon: "🎉",
    questions: [
      {
        q: "รับจัดเลี้ยงนอกสถานที่ไหม",
        a: "รับทั้งอาหารเช้า กลางวัน และเย็น มีเชฟประสบการณ์สูงทำอาหารให้ ราคากันเอง โทรสอบถามได้ที่ 092-645-1982"
      },
      {
        q: "สั่งอาหารล่วงหน้าได้ไหม",
        a: "โทรหรือส่งข้อความ LINE มาสั่งได้ สามารถทำอาหารไว้รอได้ แนะนำสั่งล่วงหน้าอย่างน้อย 30 นาที"
      }
    ]
  },
  {
    category: "reservation",
    name: "การจอง",
    icon: "📅",
    questions: [
      {
        q: "ต้องจองโต๊ะล่วงหน้าไหม",
        a: "ไม่จำเป็นสำหรับกลุ่มเล็ก แต่แนะนำจองล่วงหน้าสำหรับกลุ่มใหญ่ (5 คนขึ้นไป) หรือวันหยุด/เทศกาล"
      }
    ]
  },
  {
    category: "payment",
    name: "การชำระเงิน",
    icon: "💳",
    questions: [
      {
        q: "รับชำระเงินด้วยวิธีใดบ้าง",
        a: "รับเงินสด พร้อมเพย์"
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
      {/* Hero Header */}
      <section className="relative py-20 gradient-brand overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            คำถามที่พบบ่อย
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">FAQ</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            คำถามและคำตอบที่ลูกค้าสนใจ
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="container-site py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((category, catIndex) => (
            <div 
              key={category.category} 
              className="animate-fade-in"
              style={{ animationDelay: `${catIndex * 0.1}s` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-orange text-white flex items-center justify-center text-2xl">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-brown">{category.name}</h2>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((item, qIndex) => (
                  <details 
                    key={qIndex}
                    className="card card-hover group overflow-hidden"
                  >
                    <summary className="p-6 cursor-pointer list-none flex items-center justify-between gap-4">
                      <h3 className="font-bold text-lg text-brown group-hover:text-brand transition-colors flex-1">
                        {item.q}
                      </h3>
                      <svg 
                        className="w-6 h-6 text-brand transition-transform group-open:rotate-180 flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="card bg-gradient-to-br from-orange/10 to-accent/10 border-none text-center p-8 md:p-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand to-orange text-white flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-brown mb-4">ไม่พบคำตอบที่ต้องการ?</h3>
            <p className="text-gray-600 mb-6">
              ติดต่อเราได้ทุกช่องทาง เรายินดีให้บริการและตอบทุกคำถาม
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="tel:0926451982" 
                className="btn btn-primary"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                โทรศัพท์
              </a>
              <a 
                href="https://lin.ee/lyqOFwg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                LINE
              </a>
              <a href="/contact" className="btn btn-outline">
                ฟอร์มติดต่อ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

