import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const items = await prisma.menuItem.findMany({
      include: { 
        category: true, 
        image: true,
        menuItems: { include: { location: true } } // Include location data
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { locations, ...data } = await req.json();
    
    // Create menu item with locations
    const item = await prisma.menuItem.create({
      data: {
        ...data,
        menuItems: locations ? {
          create: locations.map((loc: any) => ({
             locationId: loc.locationId,
             price: loc.price || null,
             isAvailable: loc.isAvailable ?? true
          }))
        } : undefined
      },
      include: { category: true, image: true, menuItems: { include: { location: true } } }
    });
    
    revalidatePath("/");
    revalidatePath("/menu");
    
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Create menu error:", error);
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}

