import { prisma } from "@/lib/prisma";

export async function getPublishedPosts(limit = 10) {
  try {
    return await prisma.post.findMany({
      where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
      include: { cover: true, author: { select: { name: true } } },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
  } catch (error) {
    console.error("Failed to fetch published posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.post.findUnique({
      where: { slug },
      include: { cover: true, author: { select: { name: true } } },
    });
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error);
    return null;
  }
}

