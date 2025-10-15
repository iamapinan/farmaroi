import { prisma } from "@/lib/prisma";

export async function getBannersByPosition(position: string) {
  return prisma.banner.findMany({
    where: { position, isActive: true },
    include: { image: true },
    orderBy: { sortOrder: "asc" },
  });
}

