import { getPublishedPosts } from "@/services/postService";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ข่าวสารและกิจกรรม | ฟาร์มอร่อย",
  description: "อัปเดตข่าวสาร โปรโมชัน และกิจกรรมล่าสุดจากฟาร์มอร่อย",
};

export default async function NewsPage() {
  const posts = await getPublishedPosts(20);
  const categories = ["ทั้งหมด", "โปรโมชัน", "กิจกรรม", "บทความ", "ประกาศ"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-brand opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-10 mix-blend-overlay"></div>
        
        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-float"></div>

        <div className="container-site relative z-10 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6 animate-fade-in">
            📰 News & Updates
          </span>
          <h1 className="text-display mb-6 animate-slide-down">
            ข่าวสารและกิจกรรม
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-100">
            ติดตามเรื่องราวดีๆ โปรโมชันสุดคุ้ม และกิจกรรมน่าสนใจจากฟาร์มอร่อยได้ที่นี่
          </p>
        </div>
      </section>

      {/* Category Filter (Visual Only) */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container-site py-4 overflow-x-auto">
          <div className="flex items-center justify-center gap-2 min-w-max">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  i === 0
                    ? "bg-brand text-white shadow-lg shadow-brand/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-brand"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container-site py-16 lg:py-24">
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-brown mb-2">ยังไม่มีข่าวสาร</h3>
            <p className="text-gray-500">ติดตามข่าวสารใหม่ๆ ได้เร็วๆ นี้</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className={`group card card-hover flex flex-col h-full animate-scale-in ${
                    index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`relative overflow-hidden ${index === 0 ? "aspect-video md:aspect-[21/9]" : "aspect-video"}`}>
                  <Image
                    src={post.cover?.url || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"}
                    alt={post.cover?.alt || post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    {index === 0 && (
                        <span className="badge badge-signature shadow-lg backdrop-blur-sm">
                            ✨ เรื่องเด่น
                        </span>
                    )}
                    <span className="badge bg-black/50 text-white backdrop-blur-sm border border-white/20">
                        {new Date(post.publishedAt!).toLocaleDateString("th-TH", { day: 'numeric', month: 'short', year: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-6 md:p-8">
                  <div className="mb-4">
                    <h2 className={`font-bold text-brown group-hover:text-brand transition-colors duration-300 ${
                        index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                    }`}>
                      {post.title}
                    </h2>
                  </div>
                  
                  {post.excerpt && (
                    <p className="text-gray-600 line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xs">
                            FA
                        </div>
                        <span>Farm Aroi</span>
                    </div>
                    <span className="text-brand font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      อ่านเพิ่มเติม
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
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
