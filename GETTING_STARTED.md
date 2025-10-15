# คู่มือเริ่มต้นใช้งาน

## ขั้นตอนการติดตั้งและรัน (Local Development)

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. ตั้งค่าฐานข้อมูล MySQL

ตรวจสอบว่ามี MySQL 8 รันอยู่ที่ `localhost:3306` หรือปรับ `DATABASE_URL` ใน `.env`

```bash
# ตัวอย่าง .env
DATABASE_URL="mysql://root:password@localhost:3306/farmaroi"
NEXTAUTH_SECRET="dev-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. สร้าง Schema และ Seed ข้อมูล

```bash
npm run db:generate  # สร้าง Prisma Client
npm run db:push      # สร้างตารางในฐานข้อมูล
npm run db:seed      # เพิ่มข้อมูลตัวอย่าง
```

### 4. รัน Development Server

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:3000`

## ข้อมูลล็อกอินเริ่มต้น

- **Admin**: `admin@farmaroi.com` / `admin123`
- **Staff**: `staff@farmaroi.com` / `staff123`

เข้าสู่ระบบหลังบ้านที่: `http://localhost:3000/admin/login`

## หน้าเว็บหลัก

- `/` - หน้าแรก
- `/menu` - เมนูอาหาร
- `/promotions` - โปรโมชัน
- `/news` - ข่าวสาร
- `/about` - เกี่ยวกับเรา
- `/locations` - ที่ตั้งร้าน
- `/contact` - ติดต่อเรา
- `/admin` - หลังบ้าน (ต้องล็อกอิน)

## การใช้งาน Docker

### รันด้วย Docker Compose (แนะนำ)

```bash
docker-compose up
```

ระบบจะสร้าง:
- Web server (Next.js) ที่ port 3000
- MySQL database ที่ port 3306

### หลังจากรัน Docker ครั้งแรก

เข้าไปใน container และรัน seed:

```bash
docker-compose exec web npx prisma db push
docker-compose exec web npm run db:seed
```

## ฟีเจอร์เพิ่มเติม

### นำเข้าเมนูจาก Google Sheet

1. สร้าง Service Account ใน Google Cloud Console
2. แชร์ Google Sheet ให้กับ Service Account
3. เพิ่มข้อมูลใน `.env`:
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```
4. รันคำสั่ง:
   ```bash
   npm run import:menu
   ```

### เปิดใช้งาน Analytics

เพิ่มใน `.env`:
```
GA_MEASUREMENT_ID="G-XXXXXXXXXX"
FB_PIXEL_ID="123456789"
TT_PIXEL_ID="XXXXXXXXXX"
```

### เปิดใช้งาน AI SEO

เพิ่ม OpenAI API Key ใน `.env`:
```
AI_API_KEY="sk-..."
```

## คำสั่งที่ใช้บ่อย

```bash
# Development
npm run dev          # รัน dev server
npm run build        # build production
npm run start        # รัน production

# Database
npm run db:studio    # เปิด Prisma Studio (GUI)
npm run db:seed      # seed ข้อมูลใหม่

# Import
npm run import:menu  # นำเข้าเมนูจาก Google Sheet
```

## การแก้ปัญหา

### ฐานข้อมูลเชื่อมต่อไม่ได้

- ตรวจสอบว่า MySQL รันอยู่
- ตรวจสอบ `DATABASE_URL` ใน `.env`
- ลอง: `mysql -u root -p` เพื่อทดสอบการเชื่อมต่อ

### Prisma Client ไม่อัปเดต

```bash
npm run db:generate
```

### ต้องการรีเซ็ตฐานข้อมูล

```bash
npx prisma db push --force-reset
npm run db:seed
```

## ติดต่อ

หากมีปัญหาหรือข้อสงสัย กรุณาติดต่อทีมพัฒนา

