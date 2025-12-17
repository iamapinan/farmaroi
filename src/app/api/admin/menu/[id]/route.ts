import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const item = await prisma.menuItem.findUnique({
      where: { id },
      include: { category: true, image: true },
    });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed to fetch menu item" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { locations, ...data } = await req.json();

    const item = await prisma.$transaction(async (tx) => {
      // 1. Update basic info
      await tx.menuItem.update({
        where: { id },
        data,
      });

      // 2. Update locations if provided
      if (locations) {
        await tx.menuLocation.deleteMany({ where: { menuItemId: id } });
        if (locations.length > 0) {
          await tx.menuLocation.createMany({
            data: locations.map((loc: any) => ({
              menuItemId: id,
              locationId: loc.locationId,
              price: loc.price || null,
              isAvailable: loc.isAvailable ?? true
            })),
          });
        }
      }

      return tx.menuItem.findUnique({
        where: { id },
        include: { 
          category: true, 
          image: true,
          menuItems: { include: { location: true } }
        },
      });
    });
    
    revalidatePath("/");
    revalidatePath("/menu");
    
    return NextResponse.json(item);
  } catch (error) {
    console.error("Update menu error:", error);
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await prisma.menuItem.delete({ where: { id } });
    
    revalidatePath("/");
    revalidatePath("/menu");
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}

