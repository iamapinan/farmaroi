import { getPublishedPosts } from "@/services/postService";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ข่าวสาร",
  description: "ข่าวสารและบทความจากฟาร์มอร่อย",
};

export default async function NewsPage() {
  const posts = await getPublishedPosts(20);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Hero Header */}
      <section className="relative py-20 bg-gradient-to-r from-brown via-brand to-amber-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            บทความและกิจกรรม
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">ข่าวสาร</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            อัปเดตข่าวสารและกิจกรรมจากฟาร์มอร่อย
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container-site py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand/20 to-amber-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-brown mb-2">ยังไม่มีข่าวสาร</h3>
            <p className="text-gray-600">กรุณาติดตามข่าวสารใหม่ๆ เร็วๆ นี้</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {posts[0] && (
              <Link
                href={`/news/${posts[0].slug}`}
                className="block mb-12 card card-hover group animate-fade-in"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {posts[0].cover && (
                    <div className="relative aspect-video md:aspect-auto md:h-full bg-gradient-to-br from-brand/20 to-amber-100 overflow-hidden">
                      <Image
                        src={posts[0].cover.url}
                        alt={posts[0].cover.alt || posts[0].title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="badge badge-new shadow-lg">
                          ⭐ เรื่องเด่น
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {posts[0].publishedAt && new Date(posts[0].publishedAt).toLocaleDateString("th-TH", { 
                        day: "numeric", 
                        month: "long", 
                        year: "numeric" 
                      })}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-brown mb-4 group-hover:text-brand transition-colors">
                      {posts[0].title}
                    </h2>
                    {posts[0].excerpt && (
                      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                        {posts[0].excerpt}
                      </p>
                    )}
                    <div className="flex items-center text-brand font-medium group-hover:gap-3 transition-all">
                      อ่านเพิ่มเติม
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Other Posts */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.slice(1).map((post, index) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="card card-hover group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {post.cover && (
                    <div className="relative aspect-video w-full bg-gradient-to-br from-brand/20 to-amber-100 overflow-hidden">
                      <Image
                        src={post.cover.url}
                        alt={post.cover.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("th-TH")}
                    </div>
                    <h2 className="text-xl font-bold text-brown mb-3 line-clamp-2 group-hover:text-brand transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center text-brand text-sm font-medium">
                      อ่านต่อ
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
