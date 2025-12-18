import { humanOpeningToday, isOpenNow } from "@/lib/opening-hours";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const open = isOpenNow();
  const today = humanOpeningToday();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-gray-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container-site relative z-10 pt-20 pb-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 transition-transform duration-500 group-hover:rotate-12">
                  <Image 
                    src="/icon-w.png" 
                    alt="ฟาร์มอร่อย" 
                    fill 
                    className="object-contain drop-shadow-lg" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight text-white group-hover:text-brand-orange transition-colors">
                    ฟาร์มอร่อย
                  </span>
                  <span className="text-xs tracking-[0.2em] text-white/50 uppercase">
                    Farm Aroi
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed max-w-sm">
              สัมผัสบรรยากาศสไตล์ฟาร์มคาเฟ่ ใกล้ชิดธรรมชาติ พร้อมเสิร์ฟความอร่อยจากวัตถุดิบคุณภาพที่เราคัดสรรมาเพื่อคุณ
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: "facebook", href: "https://www.facebook.com/farmaroicafe", label: "Facebook" },
                { icon: "tiktok", href: "https://www.tiktok.com/@farm.aroi", label: "TikTok" },
                { icon: "line", href: "https://lin.ee/lyqOFwg", label: "LINE" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-brand hover:border-white transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {social.icon === "facebook" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  )}
                  {social.icon === "tiktok" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
                  )}
                  {social.icon === "line" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-orange rounded-full"></span>
              เมนู
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/menu", label: "เมนูอาหาร" },
                { href: "/promotions", label: "โปรโมชัน" },
                { href: "/news", label: "ข่าวสาร" },
                { href: "/about", label: "เกี่ยวกับเรา" },
                { href: "/locations", label: "สาขาของเรา" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-white/60 hover:text-brand-orange hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-green rounded-full"></span>
              ช่วยเหลือ
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/faq", label: "คำถามที่พบบ่อย" },
                { href: "/contact", label: "ติดต่อเรา" },
                { href: "/privacy", label: "นโยบายความเป็นส่วนตัว" },
                { href: "/terms", label: "เงื่อนไขการให้บริการ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-white/60 hover:text-brand-green hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 text-sm"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <a 
                href="tel:0926451982" 
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl mb-4 bg-brand hover:bg-brand-light text-white font-bold transition-all duration-300 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                โทร 092-645-1982
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="container-site py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>
              © {currentYear} Farm Aroi. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/admin/login" className="hover:text-white transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Staff Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
