import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const r2Url = process.env.R2_PUBLIC_URL || "https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev";
  console.log(`Starting media URL migration...`);
  console.log(`Replacing domain: ${r2Url} -> /media`);

  const mediaItems = await prisma.media.findMany();
  console.log(`Found ${mediaItems.length} media records in database.`);

  let updatedCount = 0;
  for (const media of mediaItems) {
    if (media.url.startsWith(r2Url)) {
      const newUrl = media.url.replace(r2Url, "/media");
      await prisma.media.update({
        where: { id: media.id },
        data: { url: newUrl },
      });
      console.log(`Updated Media ID ${media.id}: ${media.url} -> ${newUrl}`);
      updatedCount++;
    } else {
      console.log(`Skipped Media ID ${media.id}: URL is ${media.url}`);
    }
  }

  console.log(`Migration finished. Updated ${updatedCount} records.`);
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
