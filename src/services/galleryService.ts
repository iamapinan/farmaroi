import { prisma } from "@/lib/prisma";

export async function getGalleryItems() {
  try {
    return await prisma.gallery.findMany({
      where: { isActive: true },
      include: { image: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch gallery items:", error);
    return [];
  }
}
