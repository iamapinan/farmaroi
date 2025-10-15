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
    const { openingHours, ...data } = await req.json();
    
    await prisma.openingHour.deleteMany({ where: { locationId: id } });
    
    const location = await prisma.location.update({
      where: { id },
      data: {
        ...data,
        openingHours: openingHours ? { create: openingHours } : undefined,
      },
      include: { openingHours: true },
    });
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

