import { prisma } from "@/lib/prisma";

export async function getLocations() {
  return prisma.location.findMany({
    include: { openingHours: { orderBy: { weekday: "asc" } } },
  });
}

export async function getMainLocation() {
  return prisma.location.findFirst({
    include: { openingHours: { orderBy: { weekday: "asc" } } },
  });
}

