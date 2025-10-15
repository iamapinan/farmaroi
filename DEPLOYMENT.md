# การ Deploy บน Vercel

## ขั้นตอนการ Deploy

### 1. เตรียม Database (Production)

ต้องมี MySQL database สำหรับ production เช่น:
- **PlanetScale** (แนะนำ - MySQL serverless)
- **Railway**
- **Neon** (Postgres)
- หรือ MySQL hosting อื่นๆ

### 2. Push Code ขึ้น Git Repository

```bash
# Initialize git (ถ้ายังไม่ได้ทำ)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub/GitLab/Bitbucket
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

### 3. Import Project ไปยัง Vercel

1. ไปที่ https://vercel.com
2. คลิก **"Add New Project"**
3. Import repository ของคุณ
4. Configure Project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)

### 4. ตั้งค่า Environment Variables

ใน Vercel Dashboard, ไปที่ **Settings > Environment Variables** และเพิ่ม:

#### Required Variables:

```env
DATABASE_URL=mysql://user:password@host:3306/database_name
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
```

**สำคัญ**: 
- `NEXTAUTH_SECRET` - สร้างโดยใช้: `openssl rand -base64 32`
- `NEXTAUTH_URL` - ใช้ URL ของ Vercel domain ที่ได้รับ (เช่น `https://farmaroi.vercel.app`)

### 5. Deploy

1. คลิก **"Deploy"**
2. รอให้ build เสร็จ
3. Vercel จะให้ URL สำหรับเข้าถึงเว็บไซต์

### 6. Setup Database Schema

หลังจาก deploy เสร็จ ต้อง push database schema:

**วิธีที่ 1: ใช้ Prisma Studio (Local)**
```bash
# Set production database URL
export DATABASE_URL="production-database-url"

# Push schema
npx prisma db push

# Seed data (optional)
npm run db:seed
```

**วิธีที่ 2: ใช้ Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run command on Vercel
vercel env pull .env.local
npx prisma db push
```

### 7. สร้าง Admin User

ใช้ Prisma Studio หรือ SQL command เพื่อสร้าง user แรก:

```bash
# เปิด Prisma Studio
npx prisma studio

# หรือใช้ SQL
# Password: "admin123" (hashed)
INSERT INTO User (id, name, email, passwordHash, role, isActive) 
VALUES (
  'admin001',
  'Admin',
  'admin@farmaroi.com',
  '$2a$10$YourHashedPasswordHere',
  'ADMIN',
  true
);
```

**สร้าง password hash:**
```javascript
const bcrypt = require('bcryptjs');
console.log(bcrypt.hashSync('your-password', 10));
```

## การ Update โปรเจกต์

หลังจาก deploy แล้ว การ push code ไปยัง main branch จะทำให้ Vercel deploy ใหม่อัตโนมัติ:

```bash
git add .
git commit -m "Update features"
git push origin main
```

## Custom Domain (Optional)

1. ไปที่ Vercel Dashboard > Settings > Domains
2. เพิ่ม custom domain
3. อัพเดท DNS records ตามที่ Vercel แนะนำ
4. อัพเดท `NEXTAUTH_URL` ใน Environment Variables

## Troubleshooting

### Build Failed
- ตรวจสอบ Environment Variables ว่าครบถ้วน
- ตรวจสอบ logs ใน Vercel Dashboard
- ลอง build local: `npm run build`

### Database Connection Error
- ตรวจสอบ `DATABASE_URL` format
- ตรวจสอบว่า database ยอมรับ connection จาก Vercel IPs
- ตรวจสอบว่า schema ถูก push แล้ว

### Authentication Error
- ตรวจสอบว่ามี `NEXTAUTH_SECRET`
- ตรวจสอบว่า `NEXTAUTH_URL` ตรงกับ domain
- Clear cookies และลอง login ใหม่

## เพิ่มเติม

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

