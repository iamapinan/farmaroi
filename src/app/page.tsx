import Image from "next/image";
import Link from "next/link";
import { getSignatureItems } from "@/services/menuService";
import { getActivePromotions } from "@/services/promotionService";
import { generateLocalBusinessJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ParallaxBg from "@/components/ParallaxBg";

export default async function Home() {
  const signatureItems = await getSignatureItems();
  const promotions = await getActivePromotions();

  return (
    <>
      <JsonLd data={generateLocalBusinessJsonLd()} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[600px] md:min-h-[700px] flex items-center gradient-brand overflow-hidden">
          <ParallaxBg 
            imageUrl="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1920&q=80" 
            className="opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand/80 via-brand/70 to-brown/80 z-0"></div>
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-site relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white animate-slide-in">
                <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  เปิดทุกวัน ยกเว้นวันอังคาร
                </div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                  ฟาร์มอร่อย
                  <span className="block text-accent mt-2">กะเพรา • กาแฟ • คาเฟ่</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  บรรยากาศสไตล์ฟาร์มคาเฟ่ ใกล้ชิดธรรมชาติ เด่นเรื่องกะเพราสูตรเด็ดและกาแฟหอมคาราเมล
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/menu" className="btn btn-primary text-base">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    ดูเมนู
                  </Link>
                  <Link href="/promotions" className="btn btn-outline bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-brown">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    โปรโมชัน
                  </Link>
                </div>
              </div>
              
              <div className="relative animate-scale-in">
                <div className="relative aspect-square w-full max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-secondary/30 rounded-3xl rotate-6"></div>
                  <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image 
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" 
                      alt="ฟาร์มอร่อย - อาหารสดใหม่" 
                      fill 
                      className="object-cover" 
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container-site">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="section-title inline-block">จุดเด่นของเรา</h2>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                ความพิเศษที่ทำให้ฟาร์มอร่อยแตกต่าง
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "กะเพราสูตรเด็ด",
                  desc: "หลากหลายสูตร รสจัดจ้าน กลมกล่อม หอมกลิ่นกะเพรา",
                  color: "from-brand to-orange-600"
                },
                {
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  ),
                  title: "กาแฟหอมคาราเมล",
                  desc: "เข้มข้น กลิ่นคาราเมลชัด ดื่มแล้วสดชื่น อบอุ่น",
                  color: "from-brown to-amber-800"
                },
                {
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ),
                  title: "บรรยากาศฟาร์มคาเฟ่",
                  desc: "ใกล้ชิดธรรมชาติ Pet-friendly มุมถ่ายรูปสวย",
                  color: "from-secondary to-green-600"
                }
              ].map((feature, i) => (
                <div key={i} className="card card-hover animate-fade-in group" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <div className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-brown mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signature Menu */}
        {signatureItems.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container-site">
              <div className="text-center mb-16">
                <h2 className="section-title inline-block">เมนูแนะนำ</h2>
                <p className="mt-6 text-lg text-gray-600">เมนูซิกเนเจอร์ที่ห้ามพลาด</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {signatureItems.slice(0, 3).map((item: typeof signatureItems[number], i: number) => (
                  <div key={item.id} className="card card-hover group animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <Image
                        src={item.image?.url || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80`}
                        alt={item.image?.alt || item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="badge badge-signature shadow-lg">
                          ซิกเนเจอร์
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-brown mb-2 group-hover:text-brand transition-colors">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-brand">฿{item.price}</span>
                        {item.spicyLevel > 0 && (
                          <span className="badge badge-spicy">
                            🌶️ เผ็ด {item.spicyLevel}/5
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Link href="/menu" className="btn btn-primary text-base">
                  ดูเมนูทั้งหมด
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Promotions */}
        {promotions.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-accent/10 via-orange-50 to-secondary/10">
            <div className="container-site">
              <div className="text-center mb-16">
                <h2 className="section-title inline-block">โปรโมชันพิเศษ</h2>
                <p className="mt-6 text-lg text-gray-600">ข้อเสนอดีๆ สำหรับคุณ</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {promotions.slice(0, 2).map((promo, i: number) => (
                  <Link key={promo.id} href={`/promotions/${promo.slug}`} className="card card-hover group animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="relative aspect-video w-full bg-gradient-to-br from-accent/20 to-orange-100 overflow-hidden">
                      <Image
                        src={promo.image?.url || `https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80`}
                        alt={promo.image?.alt || promo.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="gradient-overlay"></div>
                      <div className="absolute top-4 left-4">
                        <span className="badge badge-new shadow-lg">
                          โปรโมชัน
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-brown mb-3 group-hover:text-brand transition-colors">{promo.title}</h3>
                      {promo.description && (
                        <p className="text-gray-600 mb-4 line-clamp-3">{promo.description}</p>
                      )}
                      {(promo.startAt || promo.endAt) && (
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {promo.startAt && `${new Date(promo.startAt).toLocaleDateString("th-TH")}`}
                          {promo.startAt && promo.endAt && " - "}
                          {promo.endAt && `${new Date(promo.endAt).toLocaleDateString("th-TH")}`}
                        </div>
                      )}
                      <div className="flex items-center text-brand text-sm font-medium">
                        ดูรายละเอียด
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Link href="/promotions" className="btn btn-secondary text-base">
                  ดูโปรโมชันทั้งหมด
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 gradient-brand relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-site relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">พร้อมมาลิ้มรสแล้วหรือยัง?</h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              มาพบกับประสบการณ์รสชาติใหม่ที่ฟาร์มอร่อย เปิดทุกวันเว้นวันอังคาร 10:00-20:00 น.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/locations" className="btn btn-primary bg-white text-brown hover:bg-white/90">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                ดูที่ตั้งร้าน
              </Link>
              <Link href="/contact" className="btn btn-outline bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-brown">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ติดต่อเรา
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
