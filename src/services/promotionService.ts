import { prisma } from "@/lib/prisma";

export async function getActivePromotions() {
  const now = new Date();
  try {
    return await prisma.promotion.findMany({
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
  } catch (error) {
    console.warn("Failed to fetch active promotions (returning empty list):", error);
    return [];
  }
}

export async function getPromotionBySlug(slug: string) {
  try {
    return await prisma.promotion.findUnique({
      where: { slug },
      include: { image: true },
    });
  } catch (error) {
    console.error(`Failed to fetch promotion with slug ${slug}:`, error);
    return null;
  }
}

