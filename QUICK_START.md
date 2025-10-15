# เริ่มใช้งานด่วน (Quick Start)

## ⚠️ สำคัญ: ต้องมีฐานข้อมูล MySQL ก่อน!

มี 2 วิธีในการรัน:

---

## วิธีที่ 1: ใช้ Docker (แนะนำ - ง่ายที่สุด)

### ขั้นตอน

```bash
# 1. รัน Docker Compose (จะสร้าง MySQL และ Web server)
docker-compose up -d

# 2. รอประมาณ 10-15 วินาที ให้ MySQL เริ่มต้นเสร็จ

# 3. สร้างตารางในฐานข้อมูล
docker-compose exec web npx prisma db push --accept-data-loss

# 4. เพิ่มข้อมูลตัวอย่าง
docker-compose exec web npm run db:seed

# 5. เปิดเบราว์เซอร์
open http://localhost:3000
```

### ล็อกอินหลังบ้าน
- URL: http://localhost:3000/admin/login
- Admin: `admin@farmaroi.com` / `admin123`
- Staff: `staff@farmaroi.com` / `staff123`

### หยุดการทำงาน
```bash
docker-compose down
```

---

## วิธีที่ 2: รัน Local (ต้องติดตั้ง MySQL เอง)

### ข้อกำหนด
- Node.js 20+
- MySQL 8.0+

### ขั้นตอน

#### 1. ติดตั้ง MySQL
```bash
# macOS (Homebrew)
brew install mysql
brew services start mysql

# หรือใช้ MySQL.app
# หรือติดตั้งจาก https://dev.mysql.com/downloads/mysql/
```

#### 2. สร้างฐานข้อมูล
```bash
mysql -u root -p
# พิมพ์รหัสผ่าน (ถ้ามี) หรือกด Enter

# ใน MySQL prompt:
CREATE DATABASE farmaroi;
EXIT;
```

#### 3. แก้ไข `.env`
สร้างไฟล์ `.env` (ถ้ายังไม่มี):

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/farmaroi"
NEXTAUTH_SECRET="dev-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

**⚠️ แทนที่ `YOUR_PASSWORD` ด้วยรหัสผ่าน MySQL ของคุณ** (ถ้าไม่มีรหัสผ่านให้ลบ `:YOUR_PASSWORD` ออก)

#### 4. ติดตั้ง Dependencies
```bash
npm install
```

#### 5. สร้างตารางและข้อมูล
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

#### 6. รัน Development Server
```bash
npm run dev
```

#### 7. เปิดเบราว์เซอร์
```
http://localhost:3000
```

---

## 🔧 แก้ปัญหา

### ปัญหา: "Cannot fetch data from service: fetch failed"
**สาเหตุ**: ยังไม่ได้สร้างตารางในฐานข้อมูล

**วิธีแก้**:
```bash
# ถ้าใช้ Docker
docker-compose exec web npx prisma db push --accept-data-loss
docker-compose exec web npm run db:seed

# ถ้าใช้ Local
npm run db:push
npm run db:seed
```

### ปัญหา: "the URL must start with the protocol mysql://"
**สาเหตุ**: `DATABASE_URL` ใน `.env` ไม่ถูกต้อง

**วิธีแก้**: ตรวจสอบว่า `.env` มี `DATABASE_URL` ที่ถูกต้อง:
```env
DATABASE_URL="mysql://root:password@localhost:3306/farmaroi"
```

### ปัญหา: "Can't connect to MySQL server"
**สาเหตุ**: MySQL ไม่ได้รันอยู่

**วิธีแก้**:
```bash
# macOS
brew services start mysql

# หรือใช้ Docker แทน
docker-compose up -d
```

### ปัญหา: "Access denied for user 'root'@'localhost'"
**สาเหตุ**: รหัสผ่าน MySQL ไม่ถูกต้อง

**วิธีแก้**: แก้ไข `DATABASE_URL` ใน `.env` ให้ใช้รหัสผ่านที่ถูกต้อง

---

## 📝 หมายเหตุ

- **แนะนำให้ใช้ Docker** เพราะไม่ต้องติดตั้ง MySQL เอง
- หลังจากรัน seed แล้ว จะมีข้อมูลตัวอย่าง:
  - 2 ผู้ใช้ (Admin และ Staff)
  - หมวดหมู่เมนู 5 หมวด
  - เมนูอาหารตัวอย่าง 4 รายการ
  - โปรโมชัน 1 รายการ
  - ข่าว 1 รายการ
  - สาขา 1 สาขา พร้อมเวลาทำการ (ปิดวันอังคาร)

---

## 🚀 ขั้นตอนถัดไป

หลังจากรันสำเร็จแล้ว:

1. เข้าหลังบ้านที่ `/admin/login`
2. ล็อกอินด้วย `admin@farmaroi.com` / `admin123`
3. เริ่มจัดการเนื้อหาได้เลย!

---

## 💡 Tips

- ใช้ `npm run db:studio` เพื่อเปิด Prisma Studio (GUI สำหรับดูข้อมูล)
- ดูคำสั่งทั้งหมดใน `README.md`
- อ่านรายละเอียดเพิ่มเติมใน `GETTING_STARTED.md`

