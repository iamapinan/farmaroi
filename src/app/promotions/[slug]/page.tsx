import { getPromotionBySlug } from "@/services/promotionService";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const promotion = await getPromotionBySlug(slug);
  if (!promotion) return { title: "ไม่พบโปรโมชั่น" };
  return {
    title: promotion.title,
    description: promotion.description || undefined,
  };
}

export default async function PromotionDetailPage({ params }: Props) {
  const { slug } = await params;
  const promotion = await getPromotionBySlug(slug);
  if (!promotion || !promotion.isActive) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-accent/10 via-orange-50 to-secondary/10">
        <div className="container-site py-10 mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video w-full bg-gradient-to-br from-accent/20 to-orange-100 rounded-2xl overflow-hidden shadow-2xl mb-8">
              <Image
                src={promotion.image?.url || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80"}
                alt={promotion.image?.alt || promotion.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Badge */}
              <div className="absolute top-6 left-6">
                <span className="badge badge-new shadow-lg text-base px-4 py-2">
                  🎉 โปรโมชัน
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-site pb-16 mt-10">
        <article className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-bold text-brown mb-6">
              {promotion.title}
            </h1>

            {(promotion.startAt || promotion.endAt) && (
              <div className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-accent/10 to-orange-50 rounded-xl border border-accent/20">
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">ระยะเวลาโปรโมชั่น</div>
                  <div className="font-semibold text-brown">
                    {promotion.startAt && new Date(promotion.startAt).toLocaleDateString("th-TH", { 
                      day: "numeric", 
                      month: "long", 
                      year: "numeric" 
                    })}
                    {promotion.startAt && promotion.endAt && " - "}
                    {promotion.endAt && new Date(promotion.endAt).toLocaleDateString("th-TH", { 
                      day: "numeric", 
                      month: "long", 
                      year: "numeric" 
                    })}
                  </div>
                </div>
              </div>
            )}

            {promotion.description && (
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {promotion.description.split("\n").map((para, i) => (
                  <p key={i} className="mb-4">{para}</p>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-4">
                  <Link href="/menu" className="btn btn-primary text-base">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    ดูเมนูอาหาร
                  </Link>
                  <Link href="/locations" className="btn btn-outline text-base">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    ดูที่ตั้งร้าน
                  </Link>
                </div>
                <ShareButton title={promotion.title} />
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Related Promotions */}
      <section className="py-16 bg-gradient-to-r from-brand/5 via-accent/5 to-secondary/5">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brown mb-4">
            โปรโมชันอื่นๆ
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            ดูโปรโมชันและข้อเสนอพิเศษทั้งหมด
          </p>
          <Link href="/promotions" className="btn btn-secondary text-base">
            ดูโปรโมชันทั้งหมด
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

