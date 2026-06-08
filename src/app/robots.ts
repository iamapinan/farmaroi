import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://farmaroi.net";
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Google-Extended",
          "Anthropic-AI",
          "PerplexityBot",
          "Applebot-Extended"
        ],
        allow: "/",
        disallow: ["/admin", "/api"],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}


