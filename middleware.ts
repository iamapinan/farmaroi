import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // เช็คเฉพาะหน้าที่อยู่ใน /admin (ไม่รวม API)
  if (pathname.startsWith("/admin")) {
    const session = await auth();
    
    // ถ้าไม่มี session และไม่ใช่หน้า login -> redirect ไปหน้า login
    if (!session && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    
    // ถ้ามี session แล้วแต่พยายามเข้าหน้า login -> redirect ไปหน้า dashboard
    if (session && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // เช็ค API routes ของ admin
  if (pathname.startsWith("/api/admin")) {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // ครอบคลุมทั้งหน้า admin และ API routes (ยกเว้น auth API)
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};

