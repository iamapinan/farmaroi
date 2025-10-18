import { auth, signOut } from "@/lib/auth";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  // ถ้าไม่มี session ให้แสดงแค่ children (login page) โดยไม่มี layout
  if (!session) {
    return <>{children}</>;
  }

  const menuItems = [
    { href: "/admin/dashboard", label: "แดชบอร์ด" },
    { href: "/admin/menu", label: "เมนูอาหาร" },
    { href: "/admin/promotions", label: "โปรโมชัน" },
    { href: "/admin/posts", label: "ข่าวสาร" },
    { href: "/admin/banners", label: "แบนเนอร์" },
    { href: "/admin/locations", label: "สาขา" },
    { href: "/admin/contacts", label: "ข้อความติดต่อ" },
  ];

  if (session.user?.role === "ADMIN") {
    menuItems.push({ href: "/admin/users", label: "ผู้ใช้" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-black/10 sticky top-0 z-40">
        <div className="container-site h-16 flex items-center justify-between">
          <Link href="/admin/dashboard" className="font-bold text-brown">
            ฟาร์มอร่อย - หลังบ้าน
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm hover:text-brown transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground/70">
              {session.user?.name || session.user?.email || "ผู้ใช้"}
            </span>
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              กลับสู่เว็บไซต์
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit" className="btn btn-outline text-xs">
                ออกจากระบบ
              </button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

