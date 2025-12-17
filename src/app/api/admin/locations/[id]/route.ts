import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const location = await prisma.location.findUnique({
      where: { id },
      include: { openingHours: { orderBy: { weekday: "asc" } } },
    });
    if (!location) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(location);
  } catch {
    return NextResponse.json({ error: "Failed to fetch location" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { openingHours, logoId, gallery, ...data } = await req.json();
    
    // Transaction to update everything
    const location = await prisma.$transaction(async (tx) => {
      // 1. Update basic info and logo
      await tx.location.update({
        where: { id },
        data: { ...data, logoId },
      });

      // 2. Update opening hours if provided
      if (openingHours) {
        await tx.openingHour.deleteMany({ where: { locationId: id } });
        await tx.openingHour.createMany({
          data: openingHours.map((h: any) => ({ ...h, locationId: id })),
        });
      }

      // 3. Update gallery if provided
      if (gallery) {
        await tx.locationGallery.deleteMany({ where: { locationId: id } });
        if (gallery.length > 0) {
          await tx.locationGallery.createMany({
            data: gallery.map((item: any, index: number) => ({
              locationId: id,
              imageId: item.imageId,
              sortOrder: index,
            })),
          });
        }
      }

      return tx.location.findUnique({
        where: { id },
        include: { 
          openingHours: { orderBy: { weekday: "asc" } },
          logo: true,
          gallery: { 
            include: { image: true }, 
            orderBy: { sortOrder: "asc" } 
          }
        },
      });
    });
    return NextResponse.json(location);
    return NextResponse.json(location);
  } catch {
    return NextResponse.json({ error: "Failed to update location" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await prisma.location.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete location" }, { status: 500 });
  }
}

