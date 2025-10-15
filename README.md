# ฟาร์มอร่อย - เว็บไซต์ร้านอาหาร

เว็บไซต์สำหรับร้าน "ฟาร์มอร่อย" ฟาร์มคาเฟ่ จุดเด่นเมนูกะเพราและกาแฟ

## เทคโนโลยี

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Database**: MySQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Deployment**: Docker

## การติดตั้ง

### 1. Clone และติดตั้ง dependencies

```bash
git clone <repository-url>
cd farmaroi-website
npm install
```

### 2. ตั้งค่าฐานข้อมูล

สร้างไฟล์ `.env` (ดูตัวอย่างจาก `.env.example`):

```env
DATABASE_URL="mysql://root:password@localhost:3306/farmaroi"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. สร้างฐานข้อมูลและ seed ข้อมูล

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 4. รันโปรเจกต์

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000`

## ข้อมูลล็อกอินเริ่มต้น

หลังจากรัน seed จะมีผู้ใช้ 2 คน:

- **Admin**: `admin@farmaroi.com` / `admin123`
- **Staff**: `staff@farmaroi.com` / `staff123`

เข้าสู่ระบบหลังบ้านที่ `/admin/login`

## คำสั่งที่ใช้บ่อย

```bash
# Development
npm run dev                 # รัน dev server
npm run build              # build production
npm run start              # รัน production server

# Database
npm run db:generate        # สร้าง Prisma Client
npm run db:push            # sync schema กับ database
npm run db:seed            # seed ข้อมูลเริ่มต้น
npm run db:studio          # เปิด Prisma Studio

# Import
npm run import:menu        # นำเข้าเมนูจาก Google Sheet
```

## Docker

### Development

```bash
docker-compose up
```

### Production Build

```bash
docker build -t farmaroi-website .
docker run -p 3000:3000 farmaroi-website
```

## โครงสร้างโปรเจกต์

```
├── src/
│   ├── app/              # Pages (App Router)
│   ├── components/       # React components
│   ├── services/         # Data access layer
│   ├── lib/             # Utilities (auth, seo, prisma)
│   └── types/           # TypeScript types
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed script
├── scripts/
│   └── import-menu-from-sheet.ts
├── public/              # Static files
└── docs/
    └── plan.md          # แผนโครงการ
```

## ฟีเจอร์หลัก

### Public Pages
- หน้าแรก (Hero, เมนูแนะนำ, โปรโมชัน)
- เมนูอาหาร (แยกตามหมวดหมู่)
- โปรโมชัน
- ข่าวสาร/บทความ
- เกี่ยวกับเรา
- ที่ตั้งร้าน (เวลาทำการ)
- ติดต่อเรา
- แกลเลอรี

### Admin Panel
- Dashboard
- จัดการเมนู (CRUD)
- จัดการโปรโมชัน
- จัดการข่าวสาร
- จัดการแบนเนอร์
- จัดการสาขา/เวลาทำการ
- จัดการผู้ใช้ (Admin only)

### SEO
- Dynamic metadata
- Sitemap.xml อัตโนมัติ
- Robots.txt
- JSON-LD (LocalBusiness, MenuItem, Article)
- OpenGraph / Twitter Cards

### Analytics
- Google Analytics (GA4)
- Facebook Pixel
- TikTok Pixel

### AI SEO
- สร้าง meta title/description อัตโนมัติ
- แนะนำ keywords และ hashtags
- ใช้ OpenAI API (ถ้าตั้งค่า `AI_API_KEY`)

## การนำเข้าเมนูจาก Google Sheet

1. สร้าง Service Account ใน Google Cloud Console
2. แชร์ Google Sheet ให้กับ Service Account
3. ตั้งค่า `.env`:
   ```env
   GOOGLE_SERVICE_ACCOUNT_EMAIL="..."
   GOOGLE_PRIVATE_KEY="..."
   ```
4. รันคำสั่ง:
   ```bash
   npm run import:menu
   ```

## การ Deploy

### ด้วย Docker

```bash
docker build -t farmaroi-website .
docker run -p 3000:3000 \
  -e DATABASE_URL="..." \
  -e NEXTAUTH_SECRET="..." \
  farmaroi-website
```

### ด้วย Docker Compose

```bash
docker-compose up -d
```

## License

Private - สำหรับร้านฟาร์มอร่อยเท่านั้น
