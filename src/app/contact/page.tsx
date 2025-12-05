import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ติดต่อเรา | Farm Aroi",
  description: "ติดต่อฟาร์มอร่อย สอบถามข้อมูลเพิ่มเติม จองโต๊ะ หรือสั่งอาหาร",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-brown-dark">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80"
            alt="Contact Hero"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white/5"></div>
          <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-10 mix-blend-overlay"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-medium tracking-wider uppercase mb-6 animate-fade-in">
            Get in Touch
          </span>
          <h1 className="text-display mb-6 drop-shadow-lg animate-slide-in">
            ติดต่อเรา
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in delay-100">
            เรายินดีให้บริการและตอบทุกคำถามของคุณ พร้อมต้อนรับคุณสู่บรรยากาศอบอุ่นที่ฟาร์มอร่อย
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-20 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Contact Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-brown mb-4">ช่องทางติดต่อ</h2>
                <p className="text-gray-600 leading-relaxed">
                  หากคุณมีข้อสงสัย ต้องการจองโต๊ะ หรือสอบถามข้อมูลเพิ่มเติม สามารถติดต่อเราได้ผ่านช่องทางด้านล่างนี้
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone Card */}
                <div className="group p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center flex-shrink-0 shadow-brand/30 group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-brown mb-1">โทรศัพท์</h3>
                      <a href="tel:0926451982" className="text-xl font-bold text-brand-orange hover:text-brand-orange-light transition-colors">
                        092-645-1982
                      </a>
                      <p className="text-sm text-gray-500 mt-2">เปิดบริการทุกวัน (หยุดวันอังคาร)<br/>เวลา 10:00 - 20:00 น.</p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="group p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-brown mb-1">อีเมล</h3>
                      <a href="mailto:farm.aroicafe@gmail.com" className="text-lg font-medium text-gray-700 hover:text-brand transition-colors break-all">
                        farm.aroicafe@gmail.com
                      </a>
                      <p className="text-sm text-gray-500 mt-2">ตอบกลับภายใน 24 ชั่วโมง</p>
                    </div>
                  </div>
                </div>

                {/* Social Card */}
                <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-lg">
                  <h3 className="font-bold text-brown mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-brand-green rounded-full"></span>
                    โซเชียลมีเดีย
                  </h3>
                  <div className="flex gap-4">
                    <a href="https://www.facebook.com/farmaroicafe" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-110">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://www.tiktok.com/@farm.aroi" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-black/5 text-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 hover:scale-110">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                    </a>
                    <a href="https://lin.ee/lyqOFwg" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#00B900]/10 text-[#00B900] flex items-center justify-center hover:bg-[#00B900] hover:text-white transition-all duration-300 hover:scale-110">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full pointer-events-none"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-brown mb-6">ส่งข้อความถึงเรา</h2>
                  <ContactForm />
                </div>
              </div>

              {/* Map Section */}
              <div className="mt-8 rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 h-[300px] relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1049.1844004647648!2d100.9482738488545!3d13.037818193682448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102b903c1e4cdb1%3A0x2f1108d5f4db8e31!2z4Lif4Liy4Lij4LmM4Lih4Lit4Lij4LmI4Lit4LiiIOC4geC4sOC5gOC4nuC4o-C4siDguIHguLLguYHguJ8g4LiE4Liy4LmA4Lif4LmI!5e1!3m2!1sen!2sth!4v1764956376146!5m2!1sen!2sth" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
                <a 
                  href="https://maps.app.goo.gl/EUeN8NiT87SuWfSM9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 btn btn-primary btn-sm shadow-lg opacity-90 hover:opacity-100"
                >
                  เปิดใน Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-brown text-center mb-10">คำถามที่พบบ่อย</h2>
            <div className="space-y-4">
              {[
                { q: "ร้านเปิดกี่โมง?", a: "ร้านเปิดให้บริการทุกวัน เวลา 10:00 - 20:00 น. (หยุดทุกวันอังคาร)" },
                { q: "มีที่จอดรถไหม?", a: "มีลานจอดรถกว้างขวาง รองรับรถยนต์ได้มากกว่า 20 คัน" },
                { q: "รับจองโต๊ะล่วงหน้าไหม?", a: "รับจองโต๊ะล่วงหน้า สามารถโทรจองได้ที่เบอร์ 092-645-1982" },
                { q: "มีบริการเดลิเวอรี่ไหม?", a: "มีบริการผ่าน GrabFood และ Lineman หรือสั่งโดยตรงกับทางร้าน" },
                { q: "มีบริการ Wi-Fi ไหม?", a: "มีบริการ Wi-Fi ฟรีสำหรับลูกค้าทุกคน" },
                { q: "นำสัตว์เลี้ยงได้ไหม?", a: "สามารถนำสัตว์เลี้ยงเข้าร้านได้" },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-brown text-lg mb-2">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
