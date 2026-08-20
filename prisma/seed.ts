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
    update: {
      name: "ฟาร์มอร่อย กะเพรา กาแฟ คาเฟ่",
      address: "69/21 ถนนแหลมทอง ตำบลทุ่งสุขลา อำเภอศรีราชา จังหวัดชลบุรี 20230",
      phone: "092-645-1982",
      mapUrl: "https://maps.app.goo.gl/EUeN8NiT87SuWfSM9",
      latitude: 13.037818193682448,
      longitude: 100.9482738488545,
    },
    create: {
      id: "main",
      name: "ฟาร์มอร่อย กะเพรา กาแฟ คาเฟ่",
      address: "69/21 ถนนแหลมทอง ตำบลทุ่งสุขลา อำเภอศรีราชา จังหวัดชลบุรี 20230",
      phone: "092-645-1982",
      mapUrl: "https://maps.app.goo.gl/EUeN8NiT87SuWfSM9",
      latitude: 13.037818193682448,
      longitude: 100.9482738488545,
    },
  });

  // Opening hours (เปิดทุกวัน 09:00-19:00)
  const hours = [
    { weekday: 0, openTime: "09:00", closeTime: "19:00", isClosed: false }, // Sun
    { weekday: 1, openTime: "09:00", closeTime: "19:00", isClosed: false }, // Mon
    { weekday: 2, openTime: "09:00", closeTime: "19:00", isClosed: false }, // Tue
    { weekday: 3, openTime: "09:00", closeTime: "19:00", isClosed: false }, // Wed
    { weekday: 4, openTime: "09:00", closeTime: "19:00", isClosed: false }, // Thu
    { weekday: 5, openTime: "09:00", closeTime: "19:00", isClosed: false }, // Fri
    { weekday: 6, openTime: "09:00", closeTime: "19:00", isClosed: false }, // Sat
  ];

  for (const h of hours) {
    await prisma.openingHour.upsert({
      where: { locationId_weekday: { locationId: location.id, weekday: h.weekday } },
      update: {
        openTime: h.openTime,
        closeTime: h.closeTime,
        isClosed: h.isClosed,
      },
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
      content: "เรายินดีต้อนรับทุกท่านสู่ร้านอาหารและคาเฟ่บรรยากาศดีที่ถนนแหลมทอง พร้อมกะเพรา คั่วพริกเกลือ ผัดผงกะหรี่ ข้าวผัดรถไฟ และกาแฟหอมกรุ่น",
      excerpt: "ร้านอาหารและคาเฟ่บรรยากาศดีที่ถนนแหลมทอง พร้อม 4 เมนูเด็ด",
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

  // Stock Items
  const stockItems = {
    "🥩 เนื้อสัตว์ & อาหารทะเล": ["หมูสับ/หมูบด", "หมูชิ้น/หมูเนื้อแดง", "หมูสามชั้น", "เนื้อวัว/เนื้อบด", "สะโพกไก่", "อกไก่", "ปีกไก่", "โครงไก่", "กุ้ง", "หมึก", "ปลานิล", "กุ้งแห้ง (มีเปลือก)", "ทูน่า/ทูน่ากระป๋อง"],
    "🥬 ผักสด & สมุนไพร": ["กะเพรา", "โหระพา", "คะน้า", "กะหล่ำปลี", "ผักกาดขาว", "ผักกาดหอม/สลัด", "มะเขือเปาะ", "มะเขือพวง", "มะเขือเทศ/ราชินี", "แตงร้าน/แตงกวา", "ถั่วฝักยาว", "ข้าวโพดอ่อน", "เห็ด/เห็ดเข็มทอง", "หน่อไม้", "มะระ", "พริกขี้หนู", "พริกแดง/จินดา", "พริกชี้ฟ้า", "พริกเขียว", "พริกหยวก/เม็ดใหญ่", "กระเทียม", "หอมแดง/หอมแขก", "หอมใหญ่", "ต้นหอม", "ผักชี/ผักชีฝรั่ง", "มะนาว", "ตะไคร้", "ใบมะกรูด", "กระชาย", "พริกไทยอ่อน", "สะระแหน่"],
    "❄️ อาหารแช่แข็ง & แปรรูป": ["นักเก็ต", "เฟรนช์ฟรายส์", "ชีสบอล", "โดนัทกุ้ง", "ไก่ป๊อบ", "ปูอัด/แหนม", "กุนเชียง", "หมูยอ/ลูกชิ้น", "เนย (เค็ม/จืด)", "วิปครีม/ครีมชีส"],
    "🥫 เครื่องปรุง & ของแห้ง": ["ข้าวสาร", "น้ำมันพืช", "น้ำมันทอดเฟรนช์ฟรายส์", "น้ำมันหอย", "ซอสพริก", "ซอสมะเขือเทศ", "น้ำปลา (ทิพรส)", "ผงปรุงรส (รสดี/คนอร์)", "ผงชูรส", "น้ำตาล", "กะทิ", "พริกเผา", "กระเทียมเจียว", "น้ำสลัด/ครีม/มายองเนส", "สลัดครีม", "ปลากระป๋อง", "ผักกาดดอง", "เหล้าจีน"],
    "🍝 เส้น & แป้ง": ["เส้นใหญ่", "เส้นเล็ก", "วุ้นเส้น", "สปาเก็ตตี้", "มักกะโรนี/คาโบนาร่า", "แป้งทอดกรอบ", "เกล็ดขนมปัง", "แป้งเค้ก"],
    "☕ คาเฟ่ & เบเกอรี่": ["เมล็ดกาแฟ", "ชาไทย", "ชาเขียว", "นมสด", "นมข้นหวาน", "นมเมจิ", "ไซรัป (เสาวรส/คาราเมล)", "น้ำผึ้ง", "ไข่มุก/บุก", "สตรอเบอรี่ (สด/แยม)", "บลูเบอรี่ (แยม)", "แครกเกอร์", "เยลลี่/วุ้นป๊อบ"],
    "📦 บรรจุภัณฑ์ & ของใช้": ["กล่องข้าว (ทุกแบบ)", "กล่องเค้ก (3ปอนด์/สามเหลี่ยม)", "ถ้วยซอส", "แก้ว + ฝา", "หลอด/หลอดไข่มุก", "ถุงหิ้ว (8x16)", "ถุงขยะ", "ทิชชู่", "หนังยาง/เชือก", "กาวดักแมลงวัน", "น้ำยาล้างจาน", "ฟองน้ำ"],
    "🛠️ อุปกรณ์ & อื่นๆ": ["แก๊สกระป๋อง (ปืนยิง)", "ถ่าน", "ใบมีด/ใบตัดไม้", "กาวลาเท็กซ์", "เทปพันเกลียว", "หน้ากากอนามัย", "รองเท้าบูท"]
  };

  for (const [category, items] of Object.entries(stockItems)) {
    for (const name of items) {
      // Check if item exists to prevent duplicates (using name as unique identifier logic here mostly, though id is PK)
      // Since we don't have unique constraint on name, we use findFirst.
      const exists = await prisma.stockItem.findFirst({
        where: { name, category }
      });

      if (!exists) {
        await prisma.stockItem.create({
          data: {
            name,
            category,
            isActive: true,
            inStock: true
          }
        });
      }
    }
  }
  console.log("✅ Stock items seeded");

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
