import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">เมนูจัดการ</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <a
            href="/admin/menu"
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-brand/20 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🍽️
            </div>
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-brand transition-colors">จัดการเมนู</h3>
            <p className="text-sm text-gray-500 mt-2">เพิ่ม แก้ไข หรือลบรายการอาหารในเมนู</p>
          </a>

          <a
            href="/admin/promotions"
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-brand/20 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🏷️
            </div>
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-brand transition-colors">จัดการโปรโมชัน</h3>
            <p className="text-sm text-gray-500 mt-2">สร้างแคมเปญและส่วนลดพิเศษ</p>
          </a>

          <a
            href="/admin/posts"
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-brand/20 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📰
            </div>
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-brand transition-colors">จัดการข่าวสาร</h3>
            <p className="text-sm text-gray-500 mt-2">อัปเดตข่าวสารและกิจกรรมของร้าน</p>
          </a>

          <a
            href="/admin/banners"
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-brand/20 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🖼️
            </div>
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-brand transition-colors">จัดการแบนเนอร์</h3>
            <p className="text-sm text-gray-500 mt-2">ปรับแต่งภาพสไลด์หน้าแรก</p>
          </a>

          <a
            href="/admin/locations"
            className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-brand/20 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📍
            </div>
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-brand transition-colors">จัดการสาขา</h3>
            <p className="text-sm text-gray-500 mt-2">แก้ไขข้อมูลที่ตั้งและเวลาทำการ</p>
          </a>

          {session.user.role === "ADMIN" && (
            <a
              href="/admin/users"
              className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-brand/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                👥
              </div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-brand transition-colors">จัดการผู้ใช้</h3>
              <p className="text-sm text-gray-500 mt-2">ดูแลสิทธิ์การเข้าถึงระบบ</p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

