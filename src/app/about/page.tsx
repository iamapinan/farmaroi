import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | ฟาร์มอร่อย กะเพรา กาแฟ คาเฟ่",
  description: "เรื่องราวของฟาร์มอร่อย ร้านสไตล์ฟาร์มคาเฟ่ บรรยากาศชิล ใกล้ชิดธรรมชาติ เด่นเรื่องกะเพราสูตรเด็ดและกาแฟหอมคาราเมล",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
      {/* Hero Header */}
      <section className="relative py-20 gradient-brand overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ทำความรู้จัก
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">เกี่ยวกับเรา</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            เรื่องราวและแนวคิดของฟาร์มอร่อย
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-site py-16 max-w-4xl">
        {/* Story */}
        <div className="card p-8 md:p-12 mb-12 animate-fade-in">
          <h2 className="section-title mb-6">ฟาร์มคาเฟ่</h2>
          <div className="prose prose-lg max-w-none space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong className="text-brand">ฟาร์มอร่อย กะเพรา กาแฟ คาเฟ่</strong> ตั้งอยู่ที่ตำบลตะเคียนเตี้ย อำเภอบางละมุง จังหวัดชลบุรี 
              เป็นร้านอาหารและคาเฟ่ที่ตกแต่งสไตล์ฟาร์มคาเฟ่ บรรยากาศดี เหมาะกับนักท่องเที่ยวสายชิลและสายกิน
            </p>
            <p>
              <strong className="text-brand">จุดเด่นคือเมนูกะเพรา</strong> สูตรพิเศษ เช่น กะเพราเนื้อ หมู กุ้ง หมึก รสชาติจัดจ้าน กลมกล่อม หอมกลิ่นกะเพรา 
              กาแฟของร้านเข้มข้น กลิ่นคาราเมลชัด ดื่มแล้วสดชื่น อบอุ่น
            </p>
            <p>
              ใกล้ชิดธรรมชาติ เหมาะทั้งพักผ่อนและถ่ายรูป มีทั้งโซนในร้านติดแอร์และโซนกลางแจ้งร่มรื่น ลานจอดรถกว้างขวาง 
              รองรับนักท่องเที่ยวและกลุ่มครอบครัว ยินดีต้อนรับสัตว์เลี้ยง และมีมุมถ่ายรูปสวยหลายจุด
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="section-title mb-8 text-center">จุดเด่นของเรา</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "กะเพราสูตรเด็ด",
                desc: "หลากหลายสูตร รสจัดจ้าน กลมกล่อม หอมกลิ่นกะเพรา",
                gradient: "from-brand to-orange"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ),
                title: "กาแฟหอมคาราเมล",
                desc: "เข้มข้น กลิ่นคาราเมลชัด ดื่มสดชื่น",
                gradient: "from-brown to-amber-800"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: "บรรยากาศฟาร์มคาเฟ่",
                desc: "ใกล้ชิดธรรมชาติ ทั้งในร้านแอร์และกลางแจ้ง",
                gradient: "from-accent to-yellow-500"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Pet Friendly",
                desc: "ยินดีต้อนรับสัตว์เลี้ยง มุมถ่ายรูปสวย",
                gradient: "from-secondary to-green-600"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "เหมาะทุกโอกาส",
                desc: "รับจัดเลี้ยง Workshop ครอบครัว",
                gradient: "from-orange to-red-500"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "ราคาเข้าถึงได้",
                desc: "เฉลี่ย 60-200 บาท คุณภาพคุ้มค่า",
                gradient: "from-accent to-yellow-600"
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="card card-hover group animate-scale-in" 
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brown mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities & Services */}
        <div className="card p-8 md:p-12 bg-gradient-to-br from-amber-50 to-orange-50 border-none animate-fade-in">
          <h2 className="section-title mb-6">สิ่งอำนวยความสะดวก</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "📶", text: "Wi-Fi ฟรี" },
              { icon: "🔌", text: "ปลั๊กไฟ" },
              { icon: "🚻", text: "ห้องน้ำสะอาด" },
              { icon: "🐕", text: "พาสัตว์เลี้ยงเข้าได้" },
              { icon: "❄️", text: "ห้องปรับอากาศ" },
              { icon: "🌳", text: "โซนนั่งกลางแจ้ง" },
              { icon: "📸", text: "มุมถ่ายรูปสวย" },
              { icon: "🎉", text: "จัดกิจกรรม/Workshop" },
              { icon: "☕", text: "ทดลองชิมกาแฟ" },
              { icon: "🅿️", text: "ลานจอดรถขนาดใหญ่" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">{item.icon}</span>
                <span className="flex-1">{item.text}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-orange-200">
            <h3 className="font-bold text-brown mb-4">บริการของเรา</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-brand">✓</span> ทานที่ร้าน
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand">✓</span> สั่งกลับบ้าน
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand">✓</span> เดลิเวอรี่
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand">✓</span> รับจัดเลี้ยง
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand">✓</span> จองโต๊ะล่วงหน้า
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand">✓</span> พรีออเดอร์
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-brown mb-4">พร้อมมาสัมผัสประสบการณ์แล้วหรือยัง?</h3>
          <p className="text-gray-600 mb-6">มาพบกับเราที่ฟาร์มอร่อย เปิดทุกวันเว้นวันอังคาร</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/menu" className="btn btn-primary">
              ดูเมนู
            </a>
            <a href="/locations" className="btn btn-outline">
              ดูที่ตั้ง
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
