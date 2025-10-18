import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ติดต่อฟาร์มอร่อย สอบถามข้อมูลเพิ่มเติม",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
      {/* Hero Header */}
      <section className="relative py-20 gradient-brand overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            ติดต่อสอบถาม
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">ติดต่อเรา</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            ยินดีให้บริการและตอบคำถาม
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-site py-16">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6 animate-slide-in">
            <h2 className="section-title mb-6">ช่องทางติดต่อ</h2>
            
            {/* Phone */}
            <div className="card card-hover group">
              <div className="p-6 flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand to-orange text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-brown mb-2">โทรศัพท์</h3>
                  <a href="tel:0926451982" className="text-brand hover:underline text-lg font-medium">
                    092-645-1982
                  </a>
                  <p className="text-sm text-gray-500 mt-1">จันทร์-อาทิตย์ (ยกเว้นอังคาร) 10:00-20:00 น.</p>
                </div>
              </div>
            </div>
            
            {/* Email */}
            <div className="card card-hover group">
              <div className="p-6 flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-green-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-brown mb-2">อีเมล</h3>
                  <a href="mailto:farm.aroicafe@gmail.com" className="text-brand hover:underline text-lg font-medium break-all">
                    farm.aroicafe@gmail.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">ตอบภายใน 24 ชั่วโมง</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="card">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-yellow-500 text-white flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-brown">โซเชียลมีเดีย</h3>
                </div>
                <div className="space-y-3 pl-17">
                  <a
                    href="https://www.facebook.com/farmaroicafe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-brand transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Facebook</div>
                      <div className="text-sm text-gray-500">@farmaroicafe</div>
                    </div>
                  </a>
                  <a
                    href="https://www.tiktok.com/@farm.aroi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-brand transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">TikTok</div>
                      <div className="text-sm text-gray-500">@farm.aroi</div>
                    </div>
                  </a>
                  <a
                    href="https://lin.ee/lyqOFwg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-brand transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-50 group-hover:bg-green-100 flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">LINE Official</div>
                      <div className="text-sm text-gray-500">Farm Aroi Cafe</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Location Quick Link */}
            <div className="card bg-gradient-to-br from-orange/10 to-accent/10 border-none">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-brown">ที่อยู่ร้าน</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  7/1 ตำบลตะเคียนเตี้ย<br />
                  อำเภอบางละมุง จังหวัดชลบุรี 20250
                </p>
                <div className="space-y-2">
                  <a 
                    href="https://maps.app.goo.gl/EUeN8NiT87SuWfSM9"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="btn btn-primary w-full justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    เปิด Google Maps
                  </a>
                  <a href="/locations" className="btn btn-outline w-full justify-center">
                    ดูเวลาทำการ
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
