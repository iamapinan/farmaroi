import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function getMenuItems(filters?: { categoryId?: string; isActive?: boolean }) {
  try {
    return await prisma.menuItem.findMany({
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
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return [];
  }
}

export async function getMenuItemBySlug(slug: string) {
  try {
    return await prisma.menuItem.findUnique({
      where: { slug },
      include: {
        category: true,
        image: true,
      },
    });
  } catch (error) {
    console.error(`Failed to fetch menu item with slug ${slug}:`, error);
    return null;
  }
}

export const getSignatureItems = unstable_cache(
  async () => {
    try {
      return await prisma.menuItem.findMany({
        where: { isSignature: true, isActive: true },
        include: { category: true, image: true },
        take: 6,
      });
    } catch (error) {
      console.error("Failed to fetch signature items:", error);
      return [];
    }
  },
  ["signature-items"],
  { revalidate: 3600 } // Cache for 1 hour
);


