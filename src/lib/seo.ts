export function generateLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "ฟาร์มอร่อย กะเพรา กาแฟ คาเฟ่",
    alternateName: "Farm Aroi Kaprao & Coffee Cafe",
    description: "ร้านสไตล์ฟาร์มคาเฟ่ บรรยากาศชิล ใกล้ชิดธรรมชาติ เด่นเรื่องกะเพราหลากหลาย และกาแฟเข้มหอมคาราเมล",
    url: "https://farmaroi.net",
    telephone: "+66-92-645-1982",
    image: "https://farmaroi.net/icon.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7/1",
      addressLocality: "ตะเคียนเตี้ย",
      addressRegion: "บางละมุง, ชลบุรี",
      postalCode: "20250",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.0169,
      longitude: 100.9278,
    },
    servesCuisine: ["Thai", "Cafe", "Asian"],
    priceRange: "฿฿",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Wednesday", "Thursday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    acceptsReservations: "True",
    paymentAccepted: ["Cash", "PromptPay"],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pet-Friendly", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air-Conditioned", value: true },
      { "@type": "LocationFeatureSpecification", name: "Outdoor Seating", value: true },
      { "@type": "LocationFeatureSpecification", name: "Large Parking", value: true },
    ],
    sameAs: [
      "https://www.facebook.com/farmaroicafe",
      "https://www.tiktok.com/@farm.aroi",
      "https://lin.ee/lyqOFwg",
    ],
  };
}

export function generateMenuItemJsonLd(item: {
  name: string;
  description?: string | null;
  price: number;
  image?: { url: string } | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: item.name,
    description: item.description || undefined,
    offers: {
      "@type": "Offer",
      price: item.price,
      priceCurrency: "THB",
    },
    image: item.image?.url,
  };
}

export function generateArticleJsonLd(post: {
  title: string;
  excerpt?: string | null;
  publishedAt?: Date | null;
  author: { name: string };
  cover?: { url: string } | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.publishedAt?.toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    image: post.cover?.url,
  };
}

