import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/stock
// Fetch all active stock items
export async function GET() {
  try {
    const items = await prisma.stockItem.findMany({
      where: { isActive: true },
      orderBy: [
        { category: "asc" },
        { name: "asc" }
      ]
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching stock items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

// PATCH /api/admin/stock
// Update a single item's stock status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, inStock } = body;

    if (!id || typeof inStock !== "boolean") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const updatedItem = await prisma.stockItem.update({
      where: { id: Number(id) },
      data: { inStock }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating stock item:", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

// POST /api/admin/stock
// Handle complex actions: RESET or CREATE
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "reset") {
      // Reset all items to inStock = true
      await prisma.stockItem.updateMany({
        where: { isActive: true },
        data: { inStock: true }
      });
      return NextResponse.json({ message: "Reset successful" });
    }
    
    // Future: Add "create" action here if needed

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error in stock action:", error);
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
