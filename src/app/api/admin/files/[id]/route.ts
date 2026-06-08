import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteFromR2 } from "@/lib/r2";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    // Find the media record
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Delete the file from Cloudflare R2
    await deleteFromR2(media.url);

    // Delete the database entry
    await prisma.media.delete({
      where: { id },
    });

    // Revalidate paths that use media
    revalidatePath("/");
    revalidatePath("/menu");
    revalidatePath("/promotions");
    revalidatePath("/news");
    revalidatePath("/gallery");
    revalidatePath("/admin/files");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete media:", error);
    return NextResponse.json(
      { error: "Failed to delete media file" },
      { status: 500 }
    );
  }
}
