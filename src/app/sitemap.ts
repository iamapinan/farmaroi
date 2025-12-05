import { MetadataRoute } from "next";
import { getMenuItems } from "@/services/menuService";
import { getActivePromotions } from "@/services/promotionService";
import { getPublishedPosts } from "@/services/postService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://example.com";

  let menuItems: Awaited<ReturnType<typeof getMenuItems>> = [];
  let promotions: Awaited<ReturnType<typeof getActivePromotions>> = [];
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];

  try {
    menuItems = await getMenuItems({ isActive: true });
  } catch (error) {
    console.warn("Failed to fetch menu items for sitemap:", error);
  }

  try {
    promotions = await getActivePromotions();
  } catch (error) {
    console.warn("Failed to fetch promotions for sitemap:", error);
  }

  try {
    posts = await getPublishedPosts(100);
  } catch (error) {
    console.warn("Failed to fetch posts for sitemap:", error);
  }

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/menu`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/promotions`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/locations`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), priority: 0.6 },
  ];

  const menuPages = menuItems.map((item) => ({
    url: `${baseUrl}/menu/${item.slug}`,
    lastModified: item.updatedAt,
    priority: 0.6,
  }));

  const promoPages = promotions.map((promo) => ({
    url: `${baseUrl}/promotions/${promo.slug}`,
    lastModified: promo.updatedAt,
    priority: 0.7,
  }));

  const postPages = posts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: post.updatedAt,
    priority: 0.7,
  }));

  return [...staticPages, ...menuPages, ...promoPages, ...postPages];
}

