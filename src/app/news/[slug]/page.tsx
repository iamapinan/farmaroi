import { getPostBySlug, getPublishedPosts } from "@/services/postService";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "ไม่พบข่าว" };
  return {
    title: `${post.title} | ฟาร์มอร่อย`,
    description: post.excerpt || undefined,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post || post.status !== "PUBLISHED") notFound();

  // Fetch recent posts for "Related News" section
  const recentPosts = await getPublishedPosts(3);
  const relatedPosts = recentPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src={post.cover?.url || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"}
          alt={post.cover?.alt || post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
          <div className="container-site">
            <div className="max-w-4xl animate-slide-down">
              <Link 
                href="/news" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                กลับไปหน้าข่าวสาร
              </Link>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/90 mb-4">
                <span className="px-3 py-1 rounded-full bg-brand/80 backdrop-blur-sm border border-white/20">
                  ข่าวสาร
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("th-TH", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {post.author.name}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <article className="container-site -mt-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 animate-fade-in delay-100">
          <div className="prose prose-lg text-black md:prose-xl max-w-none prose-headings:text-brown prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl">
            {post.content.split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <span className="font-semibold text-gray-700">แชร์บทความนี้:</span>
              <ShareButton title={post.title} />
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container-site py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-brown">ข่าวสารที่น่าสนใจ</h2>
            <Link href="/news" className="text-brand font-medium hover:underline">
              ดูทั้งหมด
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link 
                key={relatedPost.id}
                href={`/news/${relatedPost.slug}`}
                className="group card card-hover flex items-center gap-6 p-4"
              >
                <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={relatedPost.cover?.url || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"}
                    alt={relatedPost.cover?.alt || relatedPost.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-2">
                    {relatedPost.publishedAt && new Date(relatedPost.publishedAt).toLocaleDateString("th-TH")}
                  </div>
                  <h3 className="text-lg font-bold text-brown group-hover:text-brand transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

