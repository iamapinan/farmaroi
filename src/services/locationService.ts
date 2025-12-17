import { prisma } from "@/lib/prisma";

export async function getLocations() {
  try {
    return await prisma.location.findMany({
      include: { 
        openingHours: { orderBy: { weekday: "asc" } },
        logo: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return [];
  }
}

export async function getMainLocation() {
  try {
    return await prisma.location.findFirst({
      include: { openingHours: { orderBy: { weekday: "asc" } } },
    });
  } catch (error) {
    console.error("Failed to fetch main location:", error);
    return null;
  }
}

