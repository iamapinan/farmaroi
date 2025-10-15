import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <main className="container-site py-10">
        <h2 className="section-title mb-6">แดชบอร์ด</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <a
            href="/admin/menu"
            className="bg-white border border-black/10 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-lg text-brown">จัดการเมนู</h3>
            <p className="text-sm text-foreground/70 mt-1">เพิ่ม แก้ไข ลบเมนูอาหาร</p>
          </a>

          <a
            href="/admin/promotions"
            className="bg-white border border-black/10 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-lg text-brown">จัดการโปรโมชัน</h3>
            <p className="text-sm text-foreground/70 mt-1">สร้างและแก้ไขโปรโมชัน</p>
          </a>

          <a
            href="/admin/posts"
            className="bg-white border border-black/10 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-lg text-brown">จัดการข่าวสาร</h3>
            <p className="text-sm text-foreground/70 mt-1">เขียนและเผยแพร่ข่าว</p>
          </a>

          <a
            href="/admin/banners"
            className="bg-white border border-black/10 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-lg text-brown">จัดการแบนเนอร์</h3>
            <p className="text-sm text-foreground/70 mt-1">อัปโหลดและจัดการแบนเนอร์</p>
          </a>

          <a
            href="/admin/locations"
            className="bg-white border border-black/10 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-lg text-brown">จัดการสาขา</h3>
            <p className="text-sm text-foreground/70 mt-1">ข้อมูลสาขาและเวลาทำการ</p>
          </a>

          {session.user.role === "ADMIN" && (
            <a
              href="/admin/users"
              className="bg-white border border-black/10 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg text-brown">จัดการผู้ใช้</h3>
              <p className="text-sm text-foreground/70 mt-1">เพิ่มและจัดการพนักงาน</p>
            </a>
          )}
        </div>
      </main>
  );
}

