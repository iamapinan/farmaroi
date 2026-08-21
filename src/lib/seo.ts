export function generateLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "ฟาร์มอร่อย กะเพรา กาแฟ คาเฟ่",
    alternateName: "Farm Aroi Kaprao & Coffee Cafe",
    description: "ร้านอาหารและคาเฟ่บรรยากาศดีที่ถนนแหลมทอง เด่นเรื่องกะเพรา คั่วพริกเกลือ ผัดผงกะหรี่ และข้าวผัดรถไฟ",
    url: "https://farmaroi.net",
    telephone: "+66-92-645-1982",
    image: "https://farmaroi.net/icon.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "69/21 ถนนแหลมทอง",
      addressLocality: "ทุ่งสุขลา",
      addressRegion: "ศรีราชา, ชลบุรี",
      postalCode: "20230",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.037818193682448,
      longitude: 100.9482738488545,
    },
    servesCuisine: ["Thai", "Cafe", "Asian"],
    priceRange: "฿1-200",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    acceptsReservations: "True",
    paymentAccepted: ["Cash", "PromptPay"],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Pet-Friendly", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air-Conditioned", value: false },
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
  publishedAt?: Date | string | null;
  author: { name: string };
  cover?: { url: string } | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    image: post.cover?.url,
  };
}

export function generatePromotionJsonLd(promotion: {
  title: string;
  description?: string | null;
  startAt?: Date | string | null;
  endAt?: Date | string | null;
  image?: { url: string } | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SaleEvent",
    name: promotion.title,
    description: promotion.description || undefined,
    startDate: promotion.startAt ? new Date(promotion.startAt).toISOString() : undefined,
    endDate: promotion.endAt ? new Date(promotion.endAt).toISOString() : undefined,
    image: promotion.image?.url,
    eventStatus: "EventScheduled",
    eventAttendanceMode: "OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "ฟาร์มอร่อย",
      address: {
        "@type": "PostalAddress",
        streetAddress: "69/21 ถนนแหลมทอง",
        addressLocality: "ทุ่งสุขลา",
        addressRegion: "ศรีราชา, ชลบุรี",
        postalCode: "20230",
        addressCountry: "TH",
      },
    },
  };
}
