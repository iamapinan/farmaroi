import { prisma } from "@/lib/prisma";

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getMenuItems(filters?: { categoryId?: string; isActive?: boolean }) {
  return prisma.menuItem.findMany({
    where: {
      ...(filters?.categoryId && { categoryId: filters.categoryId }),
      ...(filters?.isActive !== undefined && { isActive: filters.isActive }),
    },
    include: {
      category: true,
      image: true,
    },
    orderBy: [{ isSignature: "desc" }, { name: "asc" }],
  });
}

export async function getMenuItemBySlug(slug: string) {
  return prisma.menuItem.findUnique({
    where: { slug },
    include: {
      category: true,
      image: true,
    },
  });
}

export async function getSignatureItems() {
  return prisma.menuItem.findMany({
    where: { isSignature: true, isActive: true },
    include: { category: true, image: true },
    take: 6,
  });
}

