import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const location = await prisma.location.findUnique({
    where: { id },
    include: { logo: true },
  });

  if (!location) return { title: "Location Not Found" };

  return {
    title: `${location.name} | Farm Aroi`,
    description: `ข้อมูลติดต่อ เวลาทำการ และแผนที่ สาขา ${location.name}`,
    openGraph: location.logo ? {
        images: [location.logo.url],
    } : undefined,
  };
}

const weekdayNames = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

export default async function LocationDetailPage({ params }: Props) {
  const { id } = await params;
  const location = await prisma.location.findUnique({
    where: { id },
    include: {
      openingHours: { orderBy: { weekday: "asc" } },
      logo: true,
      gallery: {
        include: { image: true },
        orderBy: { sortOrder: "asc" },
      },
      menuItems: {
        where: { isAvailable: true },
        include: {
          menuItem: {
             include: { category: true, image: true }
          }
        }
      }
    },
  });

  if (!location) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] bg-gray-900">
        <div className="absolute inset-0">
          {location.gallery.length > 0 ? (
            <Image
              src={location.gallery[0].image.url}
              alt={location.name}
              fill
              className="object-cover opacity-50"
              priority
            />
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974"
              alt="Default Cover"
              fill
              className="object-cover opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>

        <div className="container-site relative h-full flex flex-col justify-end pb-16 z-10">
          <Link href="/locations" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 transition-colors w-fit">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            กลับไปหน้าสาขาทั้งหมด
          </Link>

          <div className="flex flex-col md:flex-row gap-6 items-end md:items-center">
            {location.logo && (
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl p-2 shadow-xl flex-shrink-0">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image src={location.logo.url} alt={location.name} fill className="object-contain" />
                </div>
              </div>
            )}
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-sm text-sm text-green-300 font-medium border border-green-500/30 mb-2">
                 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                 เปิดให้บริการ
               </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{location.name}</h1>
              <p className="text-xl text-gray-300">{location.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content: Gallery & Info */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Gallery Grid */}
            {location.gallery.length > 0 && (
              <section>
                <h2 className="section-title mb-6">บรรยากาศร้าน</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {location.gallery.map((item, idx) => (
                    <div 
                      key={item.id} 
                      className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group hover:shadow-lg transition-all ${
                        idx === 0 ? "md:col-span-2 md:row-span-2" : ""
                      }`}
                    >
                      <Image
                        src={item.image.url}
                        alt={`Gallery ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Description / Additional Info can go here */}
            
            {/* Menu Section */}
            {location.menuItems.length > 0 && (
              <section className="pt-8 border-t border-gray-100">
                <h2 className="section-title mb-8">เมนูแนะนำที่สาขานี้</h2>
                
                {(() => {
                  // Group items by category
                  const groupedItems = location.menuItems.reduce((acc, item) => {
                    const categoryName = item.menuItem.category.name;
                    if (!acc[categoryName]) acc[categoryName] = [];
                    acc[categoryName].push(item);
                    return acc;
                  }, {} as Record<string, typeof location.menuItems>);

                  return Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="mb-10 last:mb-0">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 px-4 border-l-4 border-brand bg-gray-50 py-2">
                        {category}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {items.map(({ menuItem, price }) => (
                          <div key={menuItem.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-brand/20 hover:shadow-sm transition-all bg-white">
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                              {menuItem.image ? (
                                <Image 
                                  src={menuItem.image.url} 
                                  alt={menuItem.name} 
                                  fill 
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-900 truncate pr-2">{menuItem.name}</h4>
                                <span className="text-brand font-bold whitespace-nowrap">
                                  {(price || menuItem.price).toLocaleString()}.-
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 line-clamp-2 mt-1 mb-2">
                                {menuItem.description}
                              </p>
                              {menuItem.spicyLevel > 0 && (
                                <div className="flex gap-0.5">
                                  {[...Array(menuItem.spicyLevel)].map((_, i) => (
                                    <span key={i} className="text-xs">🌶️</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </section>
            )}
          </div>

          {/* Sidebar: Details */}
          <div className="space-y-8">
             {/* Contact Card */}
             <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-6">ข้อมูลติดต่อ</h3>
                
                <div className="space-y-6">
                  {location.phone && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0 text-brand-orange">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-0.5">เบอร์โทรศัพท์</p>
                        <a href={`tel:${location.phone}`} className="text-lg font-medium text-gray-900 hover:text-brand transition-colors">
                          {location.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 text-brand-green">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-0.5">ที่อยู่</p>
                      <p className="text-gray-900 leading-relaxed">
                        {location.address}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-4"></div>

                  <div>
                     <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        เวลาทำการ
                      </h4>
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5, 6, 0].map((dayCode) => {
                          const oh = location.openingHours.find(h => h.weekday === dayCode);
                          if (!oh) return null;
                          return (
                            <div key={oh.id} className="flex justify-between items-center text-sm">
                              <span className="text-gray-600 w-24">{weekdayNames[dayCode]}</span>
                              <span className={`font-medium ${oh.isClosed ? "text-red-500" : "text-gray-900"}`}>
                                {oh.isClosed ? "ปิดทำการ" : `${oh.openTime} - ${oh.closeTime}`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                  </div>

                  {location.mapUrl && (
                    <a 
                      href={location.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full justify-center mt-6"
                    >
                       นำทางไปที่ร้าน
                    </a>
                  )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
