import { getPostBySlug } from "@/services/postService";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "ไม่พบข่าว" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.status !== "PUBLISHED") notFound();

  return (
    <div className="min-h-screen bg-background">
      <article className="container-site py-10 max-w-3xl">
        {post.cover && (
          <div className="relative aspect-video w-full bg-gray-100 rounded-lg overflow-hidden mb-6">
            <Image
              src={post.cover.url}
              alt={post.cover.alt || post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-brown">{post.title}</h1>
        <p className="mt-2 text-sm text-foreground/60">
          {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("th-TH")} • {post.author.name}
        </p>
        <div className="mt-6 prose prose-lg max-w-none">
          {post.content.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

