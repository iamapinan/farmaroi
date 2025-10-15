import { google } from "googleapis";
import { prisma } from "../src/lib/prisma";

const SHEET_ID = "1s44vrhN7zrS_QR2PmGuz0EqGQyP-G0ts04cWdVT7oIM";

async function importMenu() {
  console.log("🔄 Starting menu import from Google Sheet...");

  // ต้องตั้งค่า Service Account ใน .env
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A2:F", // ปรับตามโครงสร้างจริง
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log("❌ No data found");
      return;
    }

    console.log(`📊 Found ${rows.length} rows`);

    let imported = 0;
    for (const row of rows) {
      const [categoryName, name, description, price, spicyLevel, isSignature] = row;

      if (!categoryName || !name || !price) continue;

      // หาหรือสร้าง category
      const slug = categoryName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      let category = await prisma.category.findUnique({ where: { slug } });
      if (!category) {
        category = await prisma.category.create({
          data: { name: categoryName, slug },
        });
      }

      // สร้างหรืออัปเดต menu item
      const itemSlug = name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      await prisma.menuItem.upsert({
        where: { slug: itemSlug },
        update: {
          name,
          description: description || null,
          price: parseFloat(price),
          spicyLevel: spicyLevel ? parseInt(spicyLevel) : 0,
          isSignature: isSignature === "TRUE" || isSignature === "1",
        },
        create: {
          categoryId: category.id,
          name,
          slug: itemSlug,
          description: description || null,
          price: parseFloat(price),
          spicyLevel: spicyLevel ? parseInt(spicyLevel) : 0,
          isSignature: isSignature === "TRUE" || isSignature === "1",
        },
      });

      imported++;
    }

    console.log(`✅ Imported ${imported} menu items`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

importMenu();

