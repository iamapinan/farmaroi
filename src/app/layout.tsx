import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import Script from "next/script";
import { generateLocalBusinessJsonLd } from "@/lib/seo";

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
  description: "ฟาร์มอร่อย ร้านอาหารและคาเฟ่บรรยากาศดี ถนนแหลมทอง ทุ่งสุขลา ศรีราชา เมนูเด่นกะเพรา คั่วพริกเกลือ ผัดผงกะหรี่ และข้าวผัดรถไฟ เปิดทุกวัน 09:00-19:00 น.",
  keywords: ["ฟาร์มอร่อย", "Farm Aroi", "ร้านกะเพรา", "คาเฟ่ชลบุรี", "ร้านอาหารศรีราชา", "ร้านอาหารแหลมฉบัง", "กะเพรา", "คั่วพริกเกลือ", "ผัดผงกะหรี่", "ข้าวผัดรถไฟ", "ทุ่งสุขลา"],
  metadataBase: new URL("https://farmaroi.net"),
  openGraph: {
    title: "ฟาร์มอร่อย | กะเพรา กาแฟ คาเฟ่",
    description: "ร้านอาหารและคาเฟ่บรรยากาศดีที่ถนนแหลมทอง เด่นเรื่องกะเพรา คั่วพริกเกลือ ผัดผงกะหรี่ และข้าวผัดรถไฟ",
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
    description: "ร้านอาหารและคาเฟ่บรรยากาศดีที่ถนนแหลมทอง เปิดทุกวัน 09:00-19:00 น.",
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
  const restaurantJsonLd = generateLocalBusinessJsonLd();

  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${notoThai.variable} font-sans antialiased`} suppressHydrationWarning>
        <Script
          id="organization-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="restaurant-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
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
