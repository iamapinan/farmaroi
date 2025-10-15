import { prisma } from "@/lib/prisma";

export async function getPublishedPosts(limit = 10) {
  return prisma.post.findMany({
    where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
    include: { cover: true, author: { select: { name: true } } },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { cover: true, author: { select: { name: true } } },
  });
}

