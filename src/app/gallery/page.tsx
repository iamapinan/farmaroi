import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "แกลเลอรี | ฟาร์มอร่อย",
  description: "รวมภาพความประทับใจ บรรยากาศ อาหาร และกิจกรรมต่างๆ ที่ฟาร์มอร่อย",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function GalleryPage() {
  const galleryItems = await prisma.gallery.findMany({
    where: { isActive: true },
    include: { image: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80"
            alt="Gallery Hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6 animate-fade-in">
            📸 Our Memories
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-slide-down">
            แกลเลอรี
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light animate-fade-in delay-100">
            รวมภาพความประทับใจ บรรยากาศ อาหาร และรอยยิ้มจากลูกค้าที่น่ารักของเรา
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container-site py-16 lg:py-24 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
          {galleryItems.length > 0 ? (
            <GalleryGrid items={galleryItems} />
          ) : (
            <div className="text-center py-32">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">ยังไม่มีรูปภาพ</h3>
              <p className="text-gray-400">กำลังรวบรวมภาพบรรยากาศสวยๆ มาให้ชมเร็วๆ นี้</p>
            </div>
          )}
        </div>
      </section>

      {/* Social Links */}
      <section className="container-site pb-24">
        <div className="bg-brown rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8">ติดตามความเคลื่อนไหวของเรา</h2>
            <div className="flex flex-wrap gap-6 justify-center">
              <a
                href="https://www.facebook.com/farmaroicafe/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-brand font-bold rounded-xl hover:bg-gray-50 hover:scale-105 transition-all shadow-lg flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              <a
                href="https://www.tiktok.com/@farm.aroi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-black/90 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-black/90 hover:scale-105 transition-all flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
