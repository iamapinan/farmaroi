import { getCategories, getMenuItems } from "@/services/menuService";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เมนูอาหาร",
  description: "เมนูอาหารและเครื่องดื่มครบครัน กะเพราสูตรเด็ด กาแฟหอมกรุ่น",
};

export default async function MenuPage() {
  const categories = await getCategories();
  const menuItems = await getMenuItems({ isActive: true });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Header */}
      <section className="relative py-20 gradient-brand overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            อาหารและเครื่องดื่ม
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">เมนูอาหาร</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            เมนูแนะนำและเมนูยอดนิยมจากฟาร์มอร่อย ทำสดใหม่ทุกวัน
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="container-site py-16">
        {categories.map((cat, catIndex) => {
          const items = menuItems.filter((m) => m.categoryId === cat.id);
          if (items.length === 0) return null;

          return (
            <div key={cat.id} className="mb-20 animate-fade-in" style={{ animationDelay: `${catIndex * 0.1}s` }}>
              {/* Category Header */}
              <div className="mb-10">
                <h2 className="section-title inline-block text-3xl">{cat.name}</h2>
                <div className="mt-2 text-gray-600">
                  {items.length} รายการ
                </div>
              </div>

              {/* Menu Items Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className="card card-hover group animate-scale-in"
                    style={{ animationDelay: `${(catIndex * 0.1) + (itemIndex * 0.05)}s` }}
                  >
                    {item.image ? (
                      <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        {/* Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          {item.isSignature && (
                            <span className="badge badge-signature shadow-lg">
                              ⭐ ซิกเนเจอร์
                            </span>
                          )}
                          {item.spicyLevel > 0 && (
                            <span className="badge badge-spicy shadow-lg">
                              🌶️ เผ็ด {item.spicyLevel}/5
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-brand/10 via-accent/10 to-secondary/10 flex items-center justify-center">
                        <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-bold text-lg text-brown group-hover:text-brand transition-colors flex-1">
                          {item.name}
                        </h3>
                        <span className="text-2xl font-bold text-brand whitespace-nowrap">
                          ฿{item.price}
                        </span>
                      </div>
                      
                      {item.description && (
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {cat.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand/5 via-accent/5 to-secondary/5">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brown mb-4">
            ไม่พบเมนูที่ต้องการ?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            ติดต่อเราเพื่อสอบถามเมนูพิเศษหรือคำแนะนำเพิ่มเติม
          </p>
          <a href="/contact" className="btn btn-primary text-base">
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
