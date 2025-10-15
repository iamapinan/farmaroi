## แผนพัฒนาเว็บไซต์ “ฟาร์มอร่อย” (กะเพรา กาแฟ คาเฟ่)

### บทนำ
- **วัตถุประสงค์**: สร้างเว็บไซต์สำหรับร้าน “ฟาร์มอร่อย” เพื่อเป็นศูนย์กลางข้อมูลเมนู โปรโมชั่น ข่าวสาร ภาพบรรยากาศ และช่องทางติดต่อ-ค้นพบจากเสิร์ช พร้อมระบบหลังบ้านให้พนักงาน/แอดมินอัพเดทข้อมูลได้เอง รองรับ SEO, AI SEO และการตลาดสมัยใหม่
- **เทคโนโลยีหลัก**: Next.js (App Router, TypeScript), MySQL, Prisma ORM, Tailwind CSS, NextAuth (ระบบสมาชิกภายใน), Docker
- **คอนเซปต์ดีไซน์**: “ฟาร์มคาเฟ่” โทนอบอุ่น-ธรรมชาติ โชว์จุดเด่นเมนูกะเพราและคาเฟ่ สร้างภาพลักษณ์สดใหม่ เป็นกันเอง
- **เวลาเปิด-ปิด**: เปิดทุกวันเว้นวันอังคาร (ใช้เพื่อแสดงสถานะร้าน/เวลาทำการบนหน้าเว็บและ Schema)

### แบรนด์ดิ้งและธีมสี
- **Primary**: `#af4c0f`
- **Secondary A**: `#00bf63`
- **Secondary B**: `#32241c`
- **Secondary C (ขาว)**: `#ffffff`
- **Accent**: `#f9d53d`
- ฟอนต์: เน้นอ่านง่าย โทนเป็นมิตร (เช่น Noto Sans Thai / IBM Plex Sans Thai หรือฟอนต์ไทยอ่านสบาย)
- แนวภาพ: อาหารชัด สีสันจัดจ้าน โฟกัสเมนูกะเพรา เครื่องดื่มกาแฟ วิวไร่/สวน วัตถุดิบสดใหม่

### โครงสร้างเว็บไซต์ (Site map) อ้างอิงรูปแบบจาก `kanommae.com` และปรับให้เข้าร้าน
- `/` หน้าแรก: ฮีโร่แบนเนอร์ CTA “ดูเมนู”, ไฮไลต์เมนูกะเพรา/เครื่องดื่ม, โปรโมชั่นเด่น, ภาพบรรยากาศฟาร์มคาเฟ่, รีวิวสั้น, เวลาเปิด-ปิด, แผนที่
- `/menu` เมนูทั้งหมด แยกหมวดหมู่ เช่น กะเพรา อาหารจานเดียว เครื่องดื่มกาแฟ ชา/โซดา เบเกอรี่ พร้อมแท็กเจ/เฮลท์ตี้/เผ็ด
- `/promotions` รวมโปรโมชัน ปักช่วงวันที่ใช้งานและเงื่อนไข
- `/news` ข่าว/บทความ อัปเดตความเคลื่อนไหว (SEO Content)  → `/news/[slug]`
- `/gallery` อัลบั้มภาพบรรยากาศร้านและฟาร์ม
- `/about` เรื่องราว แนวคิด “ฟาร์มคาเฟ่” ที่มาและวัตถุดิบ
- `/locations` สาขา/ที่ตั้ง แผนที่ เบอร์ติดต่อ เวลาทำการ (อังคารปิด)
- `/contact` ฟอร์มติดต่อ ปุ่มโทร/แชท โซเชียลลิงก์ (Facebook/TikTok)
- ระบบอัตโนมัติ SEO: `/sitemap.xml`, `/robots.txt`, OpenGraph/Twitter Card, JSON-LD
- หลังบ้าน: `/admin` (Login), `/admin/dashboard`
  - แบนเนอร์
  - เมนู (หมวดหมู่/รายการ/ราคา/รูป/แท็ก)
  - โปรโมชัน
  - ข่าว/บทความ
  - สาขา/เวลาทำการ
  - รูปภาพ/มีเดีย
  - ผู้ใช้/สิทธิ์ (พนักงาน/แอดมิน)
  - SEO & AI SEO Assistant
  - ตั้งค่า (โซเชียล, พิกเซล, ค่าแบรนด์ดิ้ง ฯลฯ)

### ฟีเจอร์หลัก (Public)
- Hero Section พร้อมปุ่ม CTA และแบนเนอร์หมุนได้
- เมนูแนะนำ/ขายดี และตัวกรองตามหมวด/แท็ก
- แสดงสถานะร้านเปิด/ปิดตามเวลา (ปิดวันอังคาร)
- แผนที่ Google Maps, ปุ่มโทร-แชทเร็ว
- แชร์ลิงก์และรูปพรีวิวสวยบนโซเชียล (OG/Twitter)

### ฟีเจอร์หลังบ้าน (CMS + RBAC)
- ระบบล็อกอินสำหรับพนักงาน/แอดมิน (RBAC: STAFF/ADMIN)
- จัดการ: แบนเนอร์, เมนู, โปรโมชัน, ข่าว, สาขา/เวลาทำการ, มีเดีย, ตั้งค่า
- นำเข้าข้อมูลเมนูจาก Google Sheet ของร้าน (ครั้งแรก/อัปเดตรายงวด)
- ตัวช่วย AI SEO: สร้าง Title/Description/Keywords/Alt text/Hashtag และคำบรรยายโพสต์
- ระบบบันทึกผู้แก้ไขและเวลาแก้ไข (Audit Log)

### SEO และ AI SEO
- Technical SEO: Canonical, Meta tags, OpenGraph/Twitter, Sitemap, Robots, Breadcrumb, Pagination, Structured Data (Organization, LocalBusiness, MenuItem/Product, Article, Offer)
- Performance: พิจารณา LCP/CLS/INP, Image Optimization, Code Splitting, ISR/Cache
- AI SEO Assistant (เลือกเปิดใช้ได้):
  - อินพุต: ชื่อเรื่อง, หัวข้อ, คีย์คำ, จุดขาย
  - เอาต์พุต: Title/Description/Keywords/Alt text/Hashtags/คอนเทนต์สั้น
  - ใช้ผู้ให้บริการ AI ผ่านคีย์ใน `.env` (เช่น OpenAI) ถ้าไม่ตั้งค่า จะใช้เทมเพลตกฎพื้นฐาน

### การตลาดและวัดผล
- ติดตั้ง GA4, Facebook Pixel, TikTok Pixel (เปิด/ปิดได้จากหลังบ้าน)
- UTM Builder เบื้องต้นในหลังบ้าน
- ปุ่มลิงก์ทางการ: Facebook Page, TikTok Profile, Google Business

### โครงสร้างโปรเจกต์
```
app/                 # pages (App Router) แยก route ชัดเจน
components/          # UI components และส่วนย่อยที่นำกลับใช้ซ้ำ
services/            # data-access/services (เมนู โปรโมชัน ข่าว แบนเนอร์ ฯลฯ)
data/                # schema/seed/raw data (เฉพาะข้อมูลไม่ลับ)
lib/                 # utilities (seo, auth, analytics, ai, validators)
styles/              # global.css, tailwind config layers
prisma/              # schema.prisma, migrations, seed
public/              # รูปแบบโลโก้/ไอคอน/รูปคงที่
docs/                # เอกสาร (ไฟล์นี้)
```

### แบบจำลองข้อมูล (MySQL via Prisma)
- User (id, name, email, passwordHash/credential-only สำหรับพนักงาน, role, status)
- Role (ADMIN, STAFF) – ใช้ enum ใน Prisma
- Session/Verification (รองรับ NextAuth ถ้าต้องการขยาย)
- Media (id, url, alt, width, height, type)
- Category (id, name, slug, sortOrder)
- MenuItem (id, categoryId, name, slug, desc, price, spicyLevel, isSignature, imageId, isActive)
- Promotion (id, title, slug, desc, startAt, endAt, imageId, isActive)
- Post (id, title, slug, content, coverId, publishedAt, authorId, status)
- Banner (id, title, imageId, link, position, isActive)
- Location (id, name, address, mapUrl, phone, latitude, longitude)
- OpeningHour (id, locationId, weekday, openTime, closeTime, isClosed)
- Setting (id, key, value)
- SeoContent (id, entity, entityId, title, description, keywords, jsonld)
- AuditLog (id, actorId, action, entity, entityId, diff, createdAt)

หมายเหตุ: ตั้งค่าให้วันอังคารของ Location/OpeningHour เป็น `isClosed=true` เพื่อสะท้อนบนหน้าเว็บและ Schema.org

### บริการ/เลเยอร์
- services/menuService.ts: CRUD เมนู + ตัวกรอง + import จาก Google Sheet
- services/promotionService.ts: CRUD โปรโมชัน + เงื่อนไขวันเวลา
- services/postService.ts: CRUD ข่าว/บทความ + สถานะเผยแพร่
- services/bannerService.ts: CRUD แบนเนอร์ (ตำแหน่ง: hero, หน้าแรก, ฯลฯ)
- services/locationService.ts: ข้อมูลสาขาและเวลาทำการ
- services/seoService.ts: จัดการ JSON-LD/Meta + AI SEO
- services/userService.ts: ผู้ใช้/สิทธิ์ และ AuditLog

### ความปลอดภัยและสิทธิ์ (RBAC)
- Roles: `ADMIN`, `STAFF`
- `STAFF`: จัดการคอนเทนต์ทั่วไป (เมนู/โปรโมชัน/ข่าว/แบนเนอร์)
- `ADMIN`: เพิ่มผู้ใช้, ตั้งค่า, ลบข้อมูล, ดู AuditLog
- บังคับให้ login ก่อนเข้าสู่ `/admin/*`, บันทึกการเปลี่ยนแปลงทุกครั้ง

### SEO เชิงเทคนิคที่ต้องมี
- Dynamic `metadata` ต่อหน้า, Canonical, OG/Twitter cards
- `sitemap.xml` อัตโนมัติ (รวมหน้า dynamic ของเมนู/ข่าว/โปรโมชัน)
- `robots.txt` และการตั้งค่า index/noindex ตามสถานะเผยแพร่
- JSON-LD: Organization + LocalBusiness + MenuItem/Product + Article + Breadcrumb
- การแสดงผลเวลาเปิด-ปิด (รวม “ปิดวันอังคาร”) ในหน้าและ Schema

### ข้อมูลภายนอกที่จะเชื่อมต่อ
- เมนูอาหาร: Google Sheet `1s44vrhN7zrS_QR2PmGuz0EqGQyP-G0ts04cWdVT7oIM`
- ร้านค้า/รายละเอียดเพิ่มเติม: ลิงก์แชร์ `share.google/q8HjCAu8ZGMLIzdBA`
- โซเชียล: Facebook Page `farmaroicafe`, TikTok `@farm.aroi`

### Environment Variables (.env)
- `DATABASE_URL` (MySQL): `mysql://user:pass@host:3306/farmaroi`
- `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- `AI_API_KEY` (สำหรับ AI SEO – เลือกใส่ได้)
- `GA_MEASUREMENT_ID`, `FB_PIXEL_ID`, `TT_PIXEL_ID`
- `ASSET_BASE_URL` (ถ้าแยกโดเมนรูปภาพ)

### Docker
- `Dockerfile` multi-stage: build (Node) → production (Node Minimal)
- `docker-compose.yml` (dev): บริการ `web` + `mysql:8` + volume และเครือข่ายภายใน

### การนำเข้าข้อมูลเมนู (Import)
- สคริปต์ `node scripts/import-menu-from-sheet.ts`
  - อ่าน Google Sheet → map เป็น Category/MenuItem → upsert
  - รองรับรูปภาพเป็น URL; เก็บเป็น `Media` ถ้าต้องการแคช
  - มี dry-run และรายงานสรุป

### มาตรวัดคุณภาพ
- Core Web Vitals ผ่าน (LCP < 2.5s บน 4G, CLS < 0.1, INP < 200ms)
- Lighthouse Performance/SEO ≥ 90 บนหน้า Public หลัก
- แผนผังลิงก์ภายในชัดเจน CTA เด่นบน fold แรก

### ไทม์ไลน์/ไมล์สโตน
1) สร้างโปรเจกต์, ธีมสี, Prisma/MySQL, สคริปต์ seed
2) หน้าสาธารณะหลัก (Home, Menu, Promotions, News, About, Locations, Contact)
3) หลังบ้าน (Auth + CRUD ทุกโมดูล + Media)
4) SEO/AI SEO, Analytics/Pixels, Sitemap/Robots/JSON-LD
5) Docker และคู่มือสั้นสำหรับรันโปรเจกต์

### เกณฑ์ยอมรับงาน (Acceptance Criteria)
- ผู้ใช้ทั่วไปเข้าชมได้ครบทุกหน้า พร้อมข้อมูลจริงและรูปภาพ
- หลังบ้านล็อกอินได้ แก้ไขคอนเทนต์หลักได้ครบ (เมนู/โปรโมชัน/ข่าว/แบนเนอร์/สาขา)
- SEO เทคนิครับครบ: sitemap, robots, OG, JSON-LD, canonical
- AI SEO สร้างเมตา/คีย์เวิร์ดได้เมื่อเติมคีย์ AI
- ปิดวันอังคารแสดงผลถูกต้องในหน้าและ Schema
- บิลด์ Docker ผ่าน และรันขึ้นในเครื่อง

### ความเสี่ยง/สมมติฐาน
- รูปภาพและข้อมูลเมนูต้องมีความครบถ้วน/สิทธิการใช้งานถูกต้อง
- การเชื่อมต่อ Google Sheet อาจจำเป็นต้องมี service account/สิทธิ์อ่าน
- ถ้าไม่มีคีย์ AI ระบบยังใช้งานได้ ปรับเป็นเทมเพลตเมตาอัตโนมัติ

### หมายเหตุการออกแบบหน้าแรก (ใกล้เคียงภาพตัวอย่าง แต่ปรับให้เข้าร้าน)
- Hero: ภาพเมนูกะเพรากริลล์/ผัดร้อนๆ + ปุ่ม “ดูเมนู” และ “โปรโมชัน”
- แถบคุณค่า: วัตถุดิบสดจากฟาร์ม/เมล็ดกาแฟคุณภาพ/ทำใหม่ทุกจาน
- Section เมนูเด่น: สไลด์การ์ดรูปใหญ่ ราคา/แท็กเผ็ด/ซิกเนเจอร์
- Section คาเฟ่: เมล็ดและกรรมวิธีชง สไตล์บาริสต้า
- แถบโปรโมชัน: บัตรกำนัล/ช่วงเวลา Happy Hour
- ฟุตเตอร์: เวลาเปิด-ปิด (ปิดวันอังคาร), แผนที่ฝัง, โซเชียลลิงก์


