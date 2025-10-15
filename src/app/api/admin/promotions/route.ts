import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const promotions = await prisma.promotion.findMany({
      include: { image: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(promotions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch promotions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const promotion = await prisma.promotion.create({ data });
    return NextResponse.json(promotion, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create promotion" }, { status: 500 });
  }
}

