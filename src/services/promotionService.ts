import { prisma } from "@/lib/prisma";

export async function getActivePromotions() {
  const now = new Date();
  return prisma.promotion.findMany({
    where: {
      isActive: true,
      OR: [
        { startAt: null, endAt: null },
        { startAt: { lte: now }, endAt: null },
        { startAt: null, endAt: { gte: now } },
        { startAt: { lte: now }, endAt: { gte: now } },
      ],
    },
    include: { image: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPromotionBySlug(slug: string) {
  return prisma.promotion.findUnique({
    where: { slug },
    include: { image: true },
  });
}

