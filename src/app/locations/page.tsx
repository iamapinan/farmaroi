import { getLocations } from "@/services/locationService";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "สาขาทั้งหมด | Farm Aroi",
  description: "ค้นหาสาขาใกล้บ้านคุณ ฟาร์มอร่อยพร้อมเสิร์ฟความอร่อย",
};

const weekdayNames = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

export default async function LocationsPage() {
  const locations = await getLocations() || [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Header */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-brand">
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0">
          <Image 
             src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974"
             alt="Locations Cover"
             fill
             className="object-cover opacity-20 mix-blend-overlay"
          />
         </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6 animate-fade-in border border-white/20">
            📍 Find Us
          </span>
          <h1 className="text-display mb-6 animate-slide-down text-shadow-lg">
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
          <div className="grid gap-8 lg:grid-cols-3">
            {locations.map((loc) => (
              <Link 
                href={`/locations/${loc.id}`} 
                key={loc.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 block h-full flex flex-col"
              >
                {/* Image / Logo Area */}
                <div className="relative h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  {loc.logo ? (
                    <Image
                      src={loc.logo.url}
                      alt={loc.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="text-6xl text-gray-300 group-hover:scale-110 transition-transform duration-300">📍</div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 z-20">
                    <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-brand-accent transition-colors">{loc.name}</h2>
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-500/20 backdrop-blur-sm text-xs text-green-300 font-medium border border-green-500/30">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                       เปิดให้บริการ
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Address */}
                  <div className="flex gap-3 mb-4 flex-1">
                    <div className="w-5 h-5 flex-shrink-0 text-brand mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {loc.address}
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mt-auto">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-brand font-bold flex items-center gap-1">
                        ดูรายละเอียดสาขา
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
