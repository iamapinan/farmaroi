"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(pathname);

  useEffect(() => {
    setHoveredPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if currently open (mock - you can connect to real logic)
  const isOpen = true; 
  
  // Determine if navbar should be transparent (only on home page and not scrolled)
  const isTransparent = pathname === "/" && !scrolled;

  const navItems = [
    { href: "/", label: "หน้าแรก" },
    { href: "/menu", label: "เมนู" },
    { href: "/promotions", label: "โปรโมชัน" },
    { href: "/news", label: "ข่าวสาร" },
    { href: "/about", label: "เรื่องราวของเรา" },
    { href: "/locations", label: "สาขา" },
  ];

  // Hide navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          !isTransparent 
            ? "py-3 bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20" 
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group relative z-50"
              onClick={() => setMobileOpen(false)}
            >
              <div className={`relative transition-all duration-500 ${!isTransparent ? 'w-10 h-10' : 'w-12 h-12 md:w-14 md:h-14'}`}>
                <Image 
                  src="/logo-farmaroi.png" 
                  alt="ฟาร์มอร่อย" 
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>
              <div className={`flex flex-col transition-all duration-300 ${!isTransparent ? 'opacity-100' : 'opacity-100 text-white drop-shadow-md'}`}>
                <span className={`font-bold leading-none tracking-tight transition-colors duration-300 ${!isTransparent ? 'text-xl text-brown' : 'text-xl md:text-2xl text-white'}`}>
                  ฟาร์มอร่อย
                </span>
                <span className={`text-[10px] tracking-widest uppercase font-medium transition-colors duration-300 ${!isTransparent ? 'text-brand-orange' : 'text-white/90'}`}>
                  Farm Aroi
                </span>
              </div>
            </Link>
            

            {/* Desktop Nav */}
            <nav 
              className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 ${
                !isTransparent ? 'bg-gray-100/50 backdrop-blur-sm' : 'bg-black/20 backdrop-blur-md border border-white/10'
              }`}
              onMouseLeave={() => setHoveredPath(pathname)}
            >
              {navItems.map((item) => {
                const isActive = item.href === hoveredPath;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      isActive 
                        ? (!isTransparent ? "text-brand" : "text-brand")
                        : (!isTransparent ? "text-gray-600 hover:text-brand" : "text-white/90 hover:text-white")
                    }`}
                    onMouseEnter={() => setHoveredPath(item.href)}
                  >
                    {item.href === hoveredPath && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className={`absolute inset-0 rounded-full ${
                          !isTransparent ? "bg-white shadow-sm" : "bg-white shadow-lg"
                        }`}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {isOpen && (
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all duration-300 ${
                  !isTransparent ? 'bg-green-100 text-green-700' : 'bg-green-500/20 text-white border border-green-400/30'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-brown animate-pulse"></span>
                  OPEN
                </div>
              )}
              
              <Link 
                href="/contact" 
                className={`btn btn-sm rounded-full transition-all duration-300 ${
                  !isTransparent 
                    ? 'bg-brand text-white hover:bg-brand-light shadow-brand/20' 
                    : 'bg-white text-brand hover:bg-gray-100 shadow-lg'
                }`}
              >
                ติดต่อเรา
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden relative z-50 p-2 rounded-full transition-colors ${
                !isTransparent ? 'text-brown hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? 'bg-brown rotate-45 translate-y-2' : 'bg-current'}`}></span>
                <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : 'bg-current'}`}></span>
                <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? 'bg-brown -rotate-45 -translate-y-2' : 'bg-current'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col justify-center items-center ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <nav className="relative z-10 flex flex-col items-center gap-6 w-full px-6">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-2xl font-bold text-brown hover:text-brand-orange transition-all duration-300 transform ${
                mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          <div 
            className={`w-12 h-1 bg-gray-100 rounded-full my-4 transition-all duration-500 ${
              mobileOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`} 
            style={{ transitionDelay: '300ms' }}
          ></div>

          <Link
            href="/contact"
            className={`btn btn-primary btn-lg w-full max-w-xs shadow-xl transition-all duration-500 transform ${
              mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
            onClick={() => setMobileOpen(false)}
          >
            ติดต่อเรา
          </Link>
        </nav>
      </div>
    </>
  );
}
