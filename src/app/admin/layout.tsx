import { auth, signOut } from "@/lib/auth";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  // ถ้าไม่มี session ให้แสดงแค่ children (login page) โดยไม่มี layout
  if (!session) {
    return <>{children}</>;
  }

  const menuItems = [
    { href: "/admin/dashboard", label: "แดชบอร์ด", icon: "📊" },
    { href: "/admin/menu", label: "เมนูอาหาร", icon: "🍽️" },
    { href: "/admin/promotions", label: "โปรโมชัน", icon: "🏷️" },
    { href: "/admin/posts", label: "ข่าวสาร", icon: "📰" },
    { href: "/admin/banners", label: "แบนเนอร์", icon: "🖼️" },
    { href: "/admin/locations", label: "สาขา", icon: "📍" },
    { href: "/admin/contacts", label: "ข้อความติดต่อ", icon: "💬" },
    { href: "/admin/files", label: "ไฟล์", icon: "📁" },
    { href: "/admin/gallery", label: "แกลเลอรี", icon: "🖼️" },
  ];

  if (session.user?.role === "ADMIN") {
    menuItems.push({ href: "/admin/users", label: "ผู้ใช้", icon: "👥" });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-50 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-white font-bold">
              <img src="/icon.png" alt="Farmaroi Logo" className="w-6 h-6" />
            </div>
            <span className="font-bold text-brown text-lg">Farm Admin</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-brand transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs">
              {session.user?.name?.[0] || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session.user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session.user?.email}
              </p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              ออกจากระบบ
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 px-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">
            ระบบจัดการหลังบ้าน
          </h1>
          <Link 
            href="/" 
            className="text-sm text-gray-500 hover:text-brand flex items-center gap-2 transition-colors"
            target="_blank"
          >
            ไปที่หน้าเว็บไซต์
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </header>
        
        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

