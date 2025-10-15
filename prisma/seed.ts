import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@farmaroi.com" },
    update: {},
    create: {
      email: "admin@farmaroi.com",
      name: "Admin",
      passwordHash: adminHash,
      role: Role.ADMIN,
    },
  });
  console.log("✅ Admin user:", admin.email);

  // Staff user
  const staffHash = await bcrypt.hash("staff123", 10);
  const staff = await prisma.user.upsert({
    where: { email: "staff@farmaroi.com" },
    update: {},
    create: {
      email: "staff@farmaroi.com",
      name: "Staff",
      passwordHash: staffHash,
      role: Role.STAFF,
    },
  });
  console.log("✅ Staff user:", staff.email);

  // Categories
  const categories = [
    { name: "กะเพรา", slug: "kaprao" },
    { name: "อาหารจานเดียว", slug: "rice-dishes" },
    { name: "เครื่องดื่มกาแฟ", slug: "coffee" },
    { name: "ชา & โซดา", slug: "tea-soda" },
    { name: "เบเกอรี่", slug: "bakery" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Categories created");

  // Sample menu items
  const kaprao = await prisma.category.findUnique({ where: { slug: "kaprao" } });
  if (kaprao) {
    await prisma.menuItem.upsert({
      where: { slug: "kaprao-moo-sub" },
      update: {},
      create: {
        categoryId: kaprao.id,
        name: "กะเพราหมูสับ",
        slug: "kaprao-moo-sub",
        description: "กะเพราหมูสับสูตรเด็ด ใบกะเพราสด เผ็ดร้อนจัดจ้าน",
        price: 65,
        spicyLevel: 3,
        isSignature: true,
        isActive: true,
      },
    });
    await prisma.menuItem.upsert({
      where: { slug: "kaprao-gai" },
      update: {},
      create: {
        categoryId: kaprao.id,
        name: "กะเพราไก่",
        slug: "kaprao-gai",
        description: "กะเพราไก่สดใหม่ ทานกับข้าวสวยร้อนๆ",
        price: 60,
        spicyLevel: 2,
        isSignature: false,
        isActive: true,
      },
    });
  }

  const coffee = await prisma.category.findUnique({ where: { slug: "coffee" } });
  if (coffee) {
    await prisma.menuItem.upsert({
      where: { slug: "espresso" },
      update: {},
      create: {
        categoryId: coffee.id,
        name: "Espresso",
        slug: "espresso",
        description: "เอสเพรสโซ่เข้มข้น จากเมล็ดคั่วพิเศษ",
        price: 50,
        isActive: true,
      },
    });
    await prisma.menuItem.upsert({
      where: { slug: "latte" },
      update: {},
      create: {
        categoryId: coffee.id,
        name: "Latte",
        slug: "latte",
        description: "ลาเต้นมสด หอมกาแฟ",
        price: 65,
        isActive: true,
      },
    });
  }

  console.log("✅ Menu items created");

  // Location
  const location = await prisma.location.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      name: "ฟาร์มอร่อย สาขาหลัก",
      address: "123 ถนนตัวอย่าง อำเภอเมือง จังหวัดตัวอย่าง 12345",
      phone: "02-123-4567",
      mapUrl: "https://maps.google.com",
    },
  });

  // Opening hours (ปิดวันอังคาร)
  const hours = [
    { weekday: 0, openTime: "09:00", closeTime: "20:00", isClosed: false }, // Sun
    { weekday: 1, openTime: "09:00", closeTime: "20:00", isClosed: false }, // Mon
    { weekday: 2, openTime: "00:00", closeTime: "00:00", isClosed: true },  // Tue CLOSED
    { weekday: 3, openTime: "09:00", closeTime: "20:00", isClosed: false }, // Wed
    { weekday: 4, openTime: "09:00", closeTime: "20:00", isClosed: false }, // Thu
    { weekday: 5, openTime: "09:00", closeTime: "21:00", isClosed: false }, // Fri
    { weekday: 6, openTime: "09:00", closeTime: "21:00", isClosed: false }, // Sat
  ];

  for (const h of hours) {
    await prisma.openingHour.upsert({
      where: { locationId_weekday: { locationId: location.id, weekday: h.weekday } },
      update: {},
      create: { locationId: location.id, ...h },
    });
  }
  console.log("✅ Location & Opening hours created");

  // Sample promotion
  await prisma.promotion.upsert({
    where: { slug: "grand-opening" },
    update: {},
    create: {
      title: "โปรโมชันเปิดร้าน",
      slug: "grand-opening",
      description: "ลด 20% ทุกเมนู สำหรับลูกค้าใหม่",
      isActive: true,
    },
  });
  console.log("✅ Promotion created");

  // Sample post
  await prisma.post.upsert({
    where: { slug: "welcome" },
    update: {},
    create: {
      title: "ยินดีต้อนรับสู่ฟาร์มอร่อย",
      slug: "welcome",
      content: "เรายินดีต้อนรับทุกท่านสู่ฟาร์มคาเฟ่สไตล์ใหม่ พร้อมเมนูกะเพราสูตรเด็ดและกาแฟหอมกรุ่น",
      excerpt: "ฟาร์มคาเฟ่สไตล์ใหม่ เมนูกะเพราและกาแฟ",
      authorId: admin.id,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });
  console.log("✅ Post created");

  // Settings
  await prisma.setting.upsert({
    where: { key: "site_name" },
    update: {},
    create: { key: "site_name", value: "ฟาร์มอร่อย" },
  });
  await prisma.setting.upsert({
    where: { key: "site_tagline" },
    update: {},
    create: { key: "site_tagline", value: "กะเพรา กาแฟ คาเฟ่" },
  });
  console.log("✅ Settings created");

  console.log("✨ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

