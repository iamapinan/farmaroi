import { getActivePromotions } from "@/services/promotionService";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "โปรโมชัน | ฟาร์มอร่อย",
  description: "โปรโมชันและข้อเสนอพิเศษจากฟาร์มอร่อย",
};

export default async function PromotionsPage() {
  const promotions = await getActivePromotions();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
            alt="Promotions Hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand/80 backdrop-blur-md border border-white/20 text-sm font-medium mb-6 animate-fade-in">
            🔥 Special Offers
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-slide-down">
            โปรโมชันสุดพิเศษ
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light animate-fade-in delay-100">
            อิ่มอร่อยคุ้มค่ากับเมนูโปรดของคุณ พร้อมข้อเสนอที่คุณไม่ควรพลาด
          </p>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="container-site py-16 lg:py-24 relative z-20">
        {promotions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">ไม่มีโปรโมชันในขณะนี้</h3>
            <p className="text-gray-400 mb-8">กรุณาติดตามโปรโมชันใหม่ๆ ได้ที่โซเชียลมีเดีย</p>
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
                className="btn btn-outline"
              >
                TikTok
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promo, index) => (
              <Link
                key={promo.id}
                href={`/promotions/${promo.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={promo.image?.url || `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80`}
                    alt={promo.image?.alt || promo.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-brand text-xs font-bold shadow-sm">
                      PROMOTION
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand transition-colors line-clamp-2">
                      {promo.title}
                    </h2>
                    {(promo.startAt || promo.endAt) && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  
                  {promo.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                      {promo.description}
                    </p>
                  )}
                  
                  <div className="flex items-center text-brand font-semibold text-sm group/btn">
                    ดูรายละเอียด
                    <svg className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter / Social CTA */}
      <section className="container-site pb-24">
        <div className="bg-brown rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">ไม่พลาดทุกข่าวสาร</h2>
            <p className="text-white/80 mb-8">
              ติดตามเราบนโซเชียลมีเดียเพื่อรับข่าวสารและโปรโมชันล่าสุดก่อนใคร
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.facebook.com/farmaroicafe/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-brand font-bold rounded-xl hover:bg-gray-50 hover:scale-105 transition-all shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              <a
                href="https://www.tiktok.com/@farm.aroi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-black/30 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-black/40 hover:scale-105 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
