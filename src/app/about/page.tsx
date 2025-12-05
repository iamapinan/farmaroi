import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | ฟาร์มอร่อย กะเพรา กาแฟ คาเฟ่",
  description: "เรื่องราวของฟาร์มอร่อย ร้านสไตล์ฟาร์มคาเฟ่ บรรยากาศชิล ใกล้ชิดธรรมชาติ เด่นเรื่องกะเพราสูตรเด็ดและกาแฟหอมคาราเมล",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-10 mix-blend-overlay"></div>
        
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 animate-float"></div>

        <div className="container-site relative z-10 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6 animate-fade-in">
            🌱 Our Story
          </span>
          <h1 className="text-display mb-6 animate-slide-down">
            เกี่ยวกับเรา
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100">
            จากความรักในรสชาติกะเพราและกลิ่นหอมของกาแฟ สู่ฟาร์มคาเฟ่ที่อบอุ่นและเป็นกันเอง
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container-site py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1 animate-slide-in">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev/uploads/1764962115438-Gemini_Generated_Image_ef6yifef6yifef6y.png"
                alt="บรรยากาศร้านฟาร์มอร่อย"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-medium text-lg">"ความสุขเริ่มต้นที่จานโปรด"</p>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
              <div className="text-center">
                <span className="block text-3xl font-bold text-brand">100%</span>
                <span className="text-xs text-gray-500 font-medium">Experience</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-fade-in delay-200">
            <h2 className="section-title mb-8">ฟาร์มคาเฟ่<br/>ในบรรยากาศสวน</h2>
            <div className="prose prose-lg text-gray-600 space-y-6">
              <p>
                <strong className="text-brand text-xl">ฟาร์มอร่อย กะเพรา กาแฟ คาเฟ่</strong> เริ่มต้นจากความตั้งใจที่อยากให้ทุกคนได้ทานอาหารรสชาติจัดจ้านถึงเครื่อง ในบรรยากาศที่ผ่อนคลายเหมือนมาเที่ยวบ้านเพื่อน
              </p>
              <p>
                สาขาแรกของเราตั้งอยู่ที่ตำบลตะเคียนเตี้ย อำเภอบางละมุง จังหวัดชลบุรี รายล้อมด้วยธรรมชาติที่ร่มรื่น เหมาะสำหรับทุกคนในครอบครัว ไม่ว่าจะเป็นสายกินที่ชอบรสชาติจัดจ้าน หรือสายชิลที่อยากมานั่งจิบกาแฟหอมๆ ที่เข้มข้นตั้งแต่เอาเข้าปากจนกลืนลงคอยังคงได้รสชาติที่เข้มข้นไม่จางลง
              </p>
              <div className="pl-6 border-l-4 border-brand/30 italic text-gray-500">
                "เราใส่ใจในทุกรายละเอียด ตั้งแต่การคัดเลือกวัตถุดิบ ไปจนถึงการปรุงรส เพื่อให้ได้รสชาติที่เป็นเอกลักษณ์ของฟาร์มอร่อย"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container-site relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title">จุดเด่นของเรา</h2>
            <p className="section-subtitle">สิ่งที่ทำให้ฟาร์มอร่อยพิเศษกว่าใคร</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                ),
                title: "กะเพราสูตรเด็ด",
                desc: "รสชาติจัดจ้าน ถึงเครื่องกะเพราแท้ๆ มีให้เลือกหลากหลายทั้งเนื้อ หมู กุ้ง และหมึก",
                color: "bg-orange-50 text-orange-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "กาแฟหอมคาราเมล",
                desc: "เมล็ดกาแฟคัดพิเศษ คั่วระดับกลางถึงเข้ม ให้กลิ่นหอมคาราเมลที่เป็นเอกลักษณ์",
                color: "bg-amber-50 text-amber-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: "บรรยากาศฟาร์ม",
                desc: "ร่มรื่นด้วยต้นไม้ใหญ่ มีทั้งโซนห้องแอร์และโซนสวน ให้ความรู้สึกผ่อนคลาย",
                color: "bg-green-50 text-green-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Pet Friendly",
                desc: "พาน้องหมาน้องแมวมาเที่ยวได้ เรามีพื้นที่กว้างขวางให้เดินเล่น",
                color: "bg-rose-50 text-rose-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "เปิดทุกวัน",
                desc: "หยุดทุกวันอังคาร เปิดให้บริการตั้งแต่เช้าจรดเย็น พร้อมเสิร์ฟความอร่อย",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "ราคาสบายกระเป๋า",
                desc: "อาหารและเครื่องดื่มคุณภาพดี ในราคาที่ทุกคนเข้าถึงได้ เริ่มต้นเพียงหลักสิบ",
                color: "bg-purple-50 text-purple-600"
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="card card-hover p-8 group animate-scale-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-brown mb-3 group-hover:text-brand transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="container-site py-16 lg:py-24">
        <div className="bg-gradient-to-br from-brand/5 to-orange-50 rounded-3xl p-8 md:p-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="section-title mb-12 text-center">สิ่งอำนวยความสะดวก</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { icon: "📶", text: "Free Wi-Fi" },
                { icon: "❄️", text: "ห้องแอร์" },
                { icon: "🌳", text: "โซนสวน" },
                { icon: "🚗", text: "ที่จอดรถ" },
                { icon: "🐕", text: "Pet Friendly" },
                { icon: "🔌", text: "ปลั๊กไฟ" },
                { icon: "🚻", text: "ห้องน้ำสะอาด" },
                { icon: "📸", text: "มุมถ่ายรูป" },
                { icon: "🎉", text: "รับจัดเลี้ยง" },
                { icon: "🛵", text: "Delivery" },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="font-medium text-gray-700 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-brown">บรรยากาศร้าน</h2>
            <Link href="/gallery" className="text-brand font-medium hover:underline flex items-center gap-1">
              ดูทั้งหมด
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-64 md:h-80">
            <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
              <Image
                src="https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev/uploads/1764962998228-B040334A-39AC-4FEE-8AC9-85B3C8D49869_1_105_c.jpeg"
                alt="Gallery 1"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src="https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev/uploads/1764962448621-IMG_3598.JPG"
                alt="Gallery 2"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src="https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev/uploads/1764962455555-IMG_3601.JPG"
                alt="Gallery 3"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src="https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev/uploads/1764962989555-IMG_1569.jpeg"
                alt="Gallery 4"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src="https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev/uploads/1764962500493-IMG_1207.jpeg"
                alt="Gallery 4"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev/uploads/1764962879114-IMG_1537.jpeg"
            alt="Farmaroi Ambience"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
        </div>
        
        <div className="container-site relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand/20 backdrop-blur-md border border-brand/30 text-brand-light text-sm font-medium mb-6 animate-fade-in">
            👋 Welcome to Farmaroi
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            พร้อมมาสัมผัส<br className="md:hidden" />ความอร่อยหรือยัง?
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            แวะมาทานกะเพรารสเด็ดและจิบกาแฟหอมๆ ท่ามกลางบรรยากาศธรรมชาติ<br className="hidden md:block" />
            เปิดให้บริการทุกวัน (หยุดวันอังคาร)
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/menu" 
              className="w-full sm:w-auto px-8 py-4 bg-brand text-white font-bold rounded-xl hover:bg-brand-dark hover:scale-105 transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2 group"
            >
              <span>ดูเมนูอาหาร</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link 
              href="/locations" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>ดูแผนที่ร้าน</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
