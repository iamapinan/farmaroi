import { getSignatureItems } from "@/services/menuService";
import { getActivePromotions } from "@/services/promotionService";
import Image from "next/image";
import Link from "next/link";
import ParallaxBg from "@/components/ParallaxBg";
import Script from "next/script";

export default async function Home() {
  type SignatureItems = Awaited<ReturnType<typeof getSignatureItems>>;
  type Promotions = Awaited<ReturnType<typeof getActivePromotions>>;

  let signatureItems: SignatureItems = [];
  let promotions: Promotions = [];

  try {
    signatureItems = await getSignatureItems() || [];
  } catch (error) {
    console.error("Home page: Failed to fetch signature items", error);
  }

  try {
    promotions = await getActivePromotions() || [];
  } catch (error) {
    console.error("Home page: Failed to fetch promotions", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ฟาร์มอร่อย (Farm Aroi)",
    "url": "https://farmaroi.net",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://farmaroi.net/menu?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Script
        id="website-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParallaxBg 
          imageUrl="https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev/uploads/1764961359325-Image_5sg7245sg7245sg7.png" 
          className="opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-10 z-10 mix-blend-overlay"></div>
        
        <div className="container-site relative z-20 text-center text-white">
          <div className="animate-fade-in space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-medium tracking-wider uppercase mb-4">
              Welcome to Farm Aroi
            </span>
            <h1 className="text-display mb-6 drop-shadow-lg">
              รสชาติไทยแท้ จัดจ้าน ถึงใจ<br />
              <span className="text-brand-accent">จากวัตถุดิบคุณภาพ</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              สัมผัสประสบการณ์อาหารไทยแท้ รสชาติที่จัดจ้าน ที่คัดสรรวัตถุดิบสดใหม่ ปรุงด้วยใจในบรรยากาศอบอุ่น ที่คุณจะลืมไม่ลง
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/menu" className="btn btn-primary btn-lg w-full sm:w-auto shadow-orange-500/20">
                ดูเมนูอาหาร
              </Link>
              <Link href="/locations" className="btn btn-outline-white btn-lg w-full sm:w-auto">
                ค้นหาสาขา
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section bg-white relative overflow-hidden">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                <Image
                  src="https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev/uploads/1764960311867-Gemini_Generated_Image_mmhehqmmhehqmmhe.png"
                  alt="Chef cooking"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -z-10"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl animate-float hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">🌿</div>
                  <div>
                    <div className="font-bold text-brown">วัตถุดิบสดใหม่</div>
                    <div className="text-xs text-gray-500">ปรุงด้วยความรักจากหัวใจทุกวัน</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="section-title">กะเพราฟาร์มอร่อย</h2>
                <p className="text-body-large text-gray-600">
                  ความลับที่ทำให้ผัดกะเพราของร้านฟาร์มอร่อยนั้นแตกต่าง นอกจากซอสสูตรเฉพาะของร้าน ก็คือกะเพรา ซึ่งมีแหล่งที่มาจากพันธุ์กะเพรา จากจังหวัดกาญจนบุรี
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-brand/5 rounded-xl flex items-center justify-center text-brand text-2xl mb-2">
                    🌱
                  </div>
                  <h3 className="text-xl font-bold text-brown">Organic Farm</h3>
                  <p className="text-gray-600">ผักสดจากฟาร์มอินทรีย์ของเราเอง ปลอดสารพิษ 100%</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-brand/5 rounded-xl flex items-center justify-center text-brand text-2xl mb-2">
                    👨‍🍳
                  </div>
                  <h3 className="text-xl font-bold text-brown">Expert Chefs</h3>
                  <p className="text-gray-600">ทีมเชฟมากประสบการณ์ที่ใส่ใจในทุกรายละเอียด</p>
                </div>
              </div>

              <Link href="/about" className="btn btn-outline mt-4">
                อ่านเพิ่มเติม
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Menu (Bento Grid Style) */}
      <section className="section-alt relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container-site relative z-10">
          <div className="text-center mb-20 relative">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-brand-orange/50"></div>
              <span className="text-brand-orange font-bold tracking-[0.2em] uppercase text-sm">Signature Menu</span>
              <div className="h-px w-12 bg-brand-orange/50"></div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-brown mb-6 relative inline-block">
              <span className="relative z-10">เมนูแนะนำ</span>
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-brand-accent/20 -skew-x-12 -z-0"></div>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              เมนูยอดนิยมที่ลูกค้าชื่นชอบ และเราอยากให้คุณได้ลอง
              <br className="hidden md:block" />
              <span className="text-base text-gray-500 mt-2 block">คัดสรรวัตถุดิบที่ดีที่สุด ปรุงด้วยใจในทุกจาน</span>
            </p>

            {/* Decorative Icon */}
            <div className="absolute top-0 right-10 md:right-40 opacity-10 rotate-12 pointer-events-none">
              <div className="text-9xl">🌿</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {signatureItems.slice(0, 5).map((item, index) => (
              <div 
                key={item.id}
                className={`group relative rounded-3xl overflow-hidden shadow-lg cursor-pointer ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                } ${index === 3 ? 'md:col-span-2' : ''}`}
              >
                <Image
                  src={item.image?.url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="inline-block px-3 py-1 bg-brand-orange text-white text-xs font-bold rounded-full mb-3">
                        แนะนำ
                      </span>
                      <h3 className={`font-bold text-white mb-2 ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
                        {item.name}
                      </h3>
                      <p className="text-white/80 line-clamp-2 text-sm md:text-base max-w-md">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu" className="btn btn-primary">
              ดูเมนูทั้งหมด
            </Link>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="section bg-brand text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="container-site relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">โปรโมชันพิเศษ</h2>
              <p className="text-white/80 text-lg max-w-xl">
                ข้อเสนอสุดพิเศษสำหรับลูกค้าคนพิเศษของเรา ติดตามโปรโมชันใหม่ๆ ได้ที่นี่
              </p>
            </div>
            <Link href="/promotions" className="btn btn-outline-white">
              ดูโปรโมชันทั้งหมด
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <Link 
                href={`/promotions/${promo.slug}`} 
                key={promo.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <Image
                    src={promo.image?.url || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"}
                    alt={promo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    HOT DEAL
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors">
                    {promo.title}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-4">
                    {promo.description}
                  </p>
                  <span className="text-sm font-medium text-brand-accent flex items-center gap-2">
                    อ่านรายละเอียด
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay z-0"></div>
        
        <div className="container-narrow relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            พร้อมสัมผัสความอร่อย<br />
            <span className="text-brand-orange">ในบรรยากาศสุดพิเศษ?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            สำรองที่นั่งล่วงหน้าเพื่อประสบการณ์ที่ดีที่สุด หรือสั่งอาหารกลับบ้านได้ง่ายๆ
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="btn btn-primary btn-lg shadow-orange-500/20">
              จองโต๊ะทันที
            </Link>
            <Link href="/menu" className="btn btn-outline-white btn-lg">
              ดูเมนูอาหาร
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
