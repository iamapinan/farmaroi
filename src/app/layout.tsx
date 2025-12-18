import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import Script from "next/script";

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["300","400","500","700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ฟาร์มอร่อย | กะเพรา กาแฟ คาเฟ่ - Farm Aroi Cafe",
    template: "%s | ฟาร์มอร่อย",
  },
  description: "ฟาร์มอร่อย (Farm Aroi) ร้านอาหารและคาเฟ่สไตล์ฟาร์ม ขึ้นชื่อเรื่องกะเพราจัดจ้านและกาแฟหอมกรุ่น บรรยากาศดี มี 2 สาขา ตะเคียนเตี้ย บางละมุง และ ศรีราชา ชลบุรี",
  keywords: ["ฟาร์มอร่อย", "Farm Aroi", "ร้านกะเพรา", "คาเฟ่ชลบุรี", "ร้านกาแฟบางละมุง", "ร้านอาหารศรีราชา", "กะเพราถาด", "อาหารตามสั่ง", "ตะเคียนเตี้ย", "ศรีราชา"],
  metadataBase: new URL("https://farmaroi.net"),
  openGraph: {
    title: "ฟาร์มอร่อย | กะเพรา กาแฟ คาเฟ่",
    description: "เมนูกะเพราจัดจ้าน กาแฟหอม บรรยากาศฟาร์มคาเฟ่ พร้อมต้อนรับที่ 2 สาขา ในชลบุรี",
    type: "website",
    url: "/",
    siteName: "Farm Aroi",
    locale: "th_TH",
    images: [
      {
        url: "/og-image.jpg", // Ensure this exists or use a default image
        width: 1200,
        height: 630,
        alt: "ฟาร์มอร่อย บรรยากาศร้านและอาหาร",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ฟาร์มอร่อย | กะเพรา กาแฟ คาเฟ่",
    description: "สัมผัสบรรยากาศสไตล์ฟาร์มคาเฟ่ พร้อมเสิร์ฟความอร่อยจากกะเพราและกาแฟ",
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ฟาร์มอร่อย (Farm Aroi)",
    "url": "https://farmaroi.net",
    "logo": "https://farmaroi.net/icon-w.png",
    "sameAs": [
      "https://www.facebook.com/farmaroicafe",
      "https://www.tiktok.com/@farm.aroi",
      "https://lin.ee/lyqOFwg"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66-92-645-1982",
      "contactType": "customer service",
      "areaServed": "TH",
      "availableLanguage": "Thai"
    }
  };

  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${notoThai.variable} font-sans antialiased`} suppressHydrationWarning>
        <Script
          id="organization-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <Analytics />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
