import { getLocations } from "@/services/locationService";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ที่ตั้งร้าน | ฟาร์มอร่อย กะเพรา กาแฟ คาเฟ่",
  description: "ค้นหาสาขาฟาร์มอร่อยใกล้คุณ ดูแผนที่ เวลาทำการ และเบอร์โทรศัพท์",
};

const weekdayNames = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

export default async function LocationsPage() {
  const locations = await getLocations();

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
            📍 Find Us
          </span>
          <h1 className="text-display mb-6 animate-slide-down">
            ที่ตั้งร้าน
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100">
            แวะมาทานของอร่อยได้ที่สาขาใกล้บ้านคุณ พร้อมให้บริการด้วยรอยยิ้ม
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="container-site py-16 lg:py-24 -mt-10 relative z-20">
        {locations.length === 0 ? (
          <div className="card p-12 text-center max-w-2xl mx-auto animate-fade-in">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">ไม่พบข้อมูลสาขา</h3>
            <p className="text-gray-600">ขออภัย ขณะนี้ยังไม่มีข้อมูลสาขาที่เปิดให้บริการ</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {locations.map((loc, index) => (
              <div 
                key={loc.id} 
                className="card card-hover group animate-scale-in overflow-hidden border-0 shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header with Map Background Effect */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand-brown to-brand opacity-90 z-10"></div>
                  {/* Abstract Map Pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/map.png')] z-0"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs text-white font-medium mb-3 border border-white/10">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                          เปิดให้บริการ
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-1">{loc.name}</h2>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex flex-col gap-8">
                    {/* Address & Contact */}
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 text-orange-600 mt-1">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">ที่อยู่</h3>
                          <p className="text-gray-600 leading-relaxed">{loc.address}</p>
                        </div>
                      </div>

                      {loc.phone && (
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600 mt-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">เบอร์โทรศัพท์</h3>
                            <a href={`tel:${loc.phone}`} className="text-brand font-medium hover:underline text-lg">
                              {loc.phone}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-gray-100 w-full"></div>

                    {/* Opening Hours */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        เวลาทำการ
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                        {/* Display sorted by Mon (1) -> Sun (0) */}
                        {[1, 2, 3, 4, 5, 6, 0].map((dayCode) => {
                          const oh = loc.openingHours.find(h => h.weekday === dayCode);
                          if (!oh) return null;
                          return (
                            <div 
                              key={oh.id || dayCode} 
                              className={`flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0 text-sm ${
                                oh.isClosed ? "opacity-60" : ""
                              }`}
                            >
                              <span className="font-medium text-gray-700">{weekdayNames[dayCode]}</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                oh.isClosed 
                                  ? "bg-red-50 text-red-600" 
                                  : "bg-green-50 text-green-700"
                              }`}>
                                {oh.isClosed ? "ปิดทำการ" : `${oh.openTime} - ${oh.closeTime}`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    {loc.mapUrl && (
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary w-full justify-center group-hover:shadow-orange-500/25 mt-2"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        นำทางไปที่ร้าน
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="container-site text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-brand/5 to-orange-50 rounded-3xl p-10 border border-brand/5">
            <h2 className="text-2xl md:text-3xl font-bold text-brown mb-4">
              ต้องการสอบถามข้อมูลเพิ่มเติม?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              หากคุณมีข้อสงสัยเกี่ยวกับเส้นทาง หรือต้องการจองโต๊ะล่วงหน้า สามารถติดต่อเราได้โดยตรง
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn btn-secondary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ส่งข้อความหาเรา
              </a>
              <a href="tel:0926451982" className="btn btn-outline">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                โทรสอบถาม
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
