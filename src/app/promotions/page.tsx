import { getActivePromotions } from "@/services/promotionService";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "โปรโมชัน",
  description: "โปรโมชันและข้อเสนอพิเศษจากฟาร์มอร่อย",
};

export default async function PromotionsPage() {
  const promotions = await getActivePromotions();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
      {/* Hero Header */}
      <section className="relative py-20 bg-gradient-to-r from-accent via-orange-400 to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-brown">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            ข้อเสนอพิเศษ
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">โปรโมชัน</h1>
          <p className="text-xl text-brown/80 max-w-2xl mx-auto">
            อัปเดตโปรโมชันและส่วนลดพิเศษสำหรับคุณ
          </p>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="container-site py-16">
        {promotions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent/20 to-orange-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-brown mb-2">ไม่มีโปรโมชันในขณะนี้</h3>
            <p className="text-gray-600 mb-8">กรุณาติดตามโปรโมชันใหม่ๆ ได้ที่โซเชียลมีเดีย</p>
            <div className="flex gap-4 justify-center">
              <a 
                href="https://www.facebook.com/farmaroicafe/" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Facebook
              </a>
              <a 
                href="https://www.tiktok.com/@farm.aroi" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                TikTok
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promo, index) => (
              <div
                key={promo.id}
                className="card card-hover group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {promo.image ? (
                  <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-accent/20 to-orange-100 overflow-hidden">
                    <Image
                      src={promo.image.url}
                      alt={promo.image.alt || promo.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="gradient-overlay"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="badge badge-new shadow-lg text-sm">
                        🎉 โปรโมชัน
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-accent via-orange-200 to-secondary flex items-center justify-center">
                    <svg className="w-20 h-20 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                )}
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-brown mb-3 group-hover:text-brand transition-colors">
                    {promo.title}
                  </h2>
                  
                  {promo.description && (
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {promo.description}
                    </p>
                  )}
                  
                  {(promo.startAt || promo.endAt) && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {promo.startAt && `${new Date(promo.startAt).toLocaleDateString("th-TH", { day: "numeric", month: "short" })}`}
                        {promo.startAt && promo.endAt && " - "}
                        {promo.endAt && `${new Date(promo.endAt).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand/5 via-accent/5 to-secondary/5">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brown mb-4">
            อย่าพลาดโปรโมชันพิเศษ!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            ติดตามโปรโมชันและข่าวสารใหม่ๆ ได้ที่โซเชียลมีเดีย
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://www.facebook.com/farmaroicafe/" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
            <a 
              href="https://www.tiktok.com/@farm.aroi" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
              TikTok
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
