import { getLocations } from "@/services/locationService";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ที่ตั้งร้าน",
  description: "ที่ตั้งและเวลาทำการของฟาร์มอร่อย",
};

const weekdayNames = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/20 to-white">
      {/* Hero Header */}
      <section className="relative py-20 bg-gradient-to-r from-brand via-orange to-amber-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            มาพบเรา
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">ที่ตั้งร้าน</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            ที่อยู่และเวลาทำการของฟาร์มอร่อย
          </p>
        </div>
      </section>

      {/* Locations */}
      <section className="container-site py-16">
        {locations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">ยังไม่มีข้อมูลสาขา</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {locations.map((loc, index) => (
              <div 
                key={loc.id} 
                className="card card-hover group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-brand to-orange p-6 text-white">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{loc.name}</h2>
                      <p className="text-white/90 text-sm leading-relaxed">{loc.address}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Contact */}
                  {loc.phone && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">โทรศัพท์</div>
                        <a href={`tel:${loc.phone}`} className="font-medium text-brand hover:underline">
                          {loc.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Opening Hours */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-brown">เวลาทำการ</h3>
                    </div>
                    <div className="space-y-2 pl-12">
                      {loc.openingHours.map((oh) => (
                        <div 
                          key={oh.id} 
                          className={`flex justify-between text-sm ${
                            oh.isClosed ? "text-red-600 font-medium" : "text-gray-600"
                          }`}
                        >
                          <span>{weekdayNames[oh.weekday]}</span>
                          <span>
                            {oh.isClosed ? (
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                ปิดทำการ
                              </span>
                            ) : (
                              `${oh.openTime} - ${oh.closeTime}`
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Map Button */}
                  {loc.mapUrl && (
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      ดูแผนที่
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand/5 via-orange/5 to-accent/5">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brown mb-4">
            มีคำถามเพิ่มเติม?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            ติดต่อเราได้ทุกช่องทาง เรายินดีให้บริการ
          </p>
          <a href="/contact" className="btn btn-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            ติดต่อเรา
          </a>
        </div>
      </section>
    </div>
  );
}
