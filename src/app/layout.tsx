import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["300","400","500","700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ฟาร์มอร่อย | กะเพรา กาแฟ คาเฟ่",
    template: "%s | ฟาร์มอร่อย",
  },
  description: "ร้านฟาร์มคาเฟ่ จุดเด่นเมนูกะเพราและกาแฟ เปิดทุกวันยกเว้นวันอังคาร",
  metadataBase: new URL("https://farmaroi.net"),
  openGraph: {
    title: "ฟาร์มอร่อย | กะเพรา กาแฟ คาเฟ่",
    description: "เมนูกะเพราจัดจ้าน กาแฟหอม บรรยากาศฟาร์มคาเฟ่",
    type: "website",
    url: "/",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${notoThai.variable} font-sans antialiased`} suppressHydrationWarning>
        <Analytics />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
