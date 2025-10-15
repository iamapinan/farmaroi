# 🚀 เริ่มต้นใช้งาน - ฟาร์มอร่อย

## ⚠️ สำคัญ: ต้องทำก่อนรันเว็บไซต์!

### 1. **วางไฟล์โลโก้** 📸

คัดลอกรูปโลโก้ที่ให้มา (รูปหมวกเชฟ + ใบไม้) ไปที่:
```
/public/logo.png
```

**ขนาดแนะนำ:** 400x400px หรือ 512x512px  
**รูปแบบ:** PNG (มีพื้นหลังโปร่งใส)

---

### 2. **เลือกวิธีรัน** 🔧

มี 2 วิธี:

#### **วิธีที่ 1: Docker (แนะนำ - ง่ายที่สุด)** 🐳

```bash
# 1. รัน Docker Compose
docker-compose up -d

# 2. รอ 10-15 วินาที ให้ MySQL เริ่มต้น

# 3. สร้างตารางในฐานข้อมูล
docker-compose exec web npx prisma db push --accept-data-loss

# 4. เพิ่มข้อมูลตัวอย่าง
docker-compose exec web npm run db:seed

# 5. เปิดเบราว์เซอร์
open http://localhost:3000
```

#### **วิธีที่ 2: Local (ต้องมี MySQL)** 💻

```bash
# 1. ติดตั้ง MySQL และสร้างฐานข้อมูล
mysql -u root -p
CREATE DATABASE farmaroi;
EXIT;

# 2. ติดตั้ง dependencies
npm install

# 3. สร้างตารางและข้อมูล
npm run db:generate
npm run db:push
npm run db:seed

# 4. รัน dev server
npm run dev

# 5. เปิดเบราว์เซอร์
open http://localhost:3000
```

---

## 🔐 ข้อมูลล็อกอิน

หลังจากรัน seed แล้ว:

**Admin:**
- Email: `admin@farmaroi.com`
- Password: `admin123`

**Staff:**
- Email: `staff@farmaroi.com`
- Password: `staff123`

**เข้าหลังบ้าน:** http://localhost:3000/admin/login

---

## 🎨 ฟีเจอร์ที่พร้อมใช้งาน

### **หน้าเว็บสาธารณะ**
- ✅ `/` - หน้าแรก (Hero + เมนูแนะนำ + โปรโมชัน)
- ✅ `/menu` - เมนูอาหาร (แยกหมวดหมู่)
- ✅ `/promotions` - โปรโมชัน
- ✅ `/news` - ข่าวสาร
- ✅ `/about` - เกี่ยวกับเรา
- ✅ `/locations` - ที่ตั้งร้าน
- ✅ `/contact` - ติดต่อเรา
- ✅ `/gallery` - แกลเลอรี

### **หลังบ้าน**
- ✅ `/admin/login` - เข้าสู่ระบบ
- ✅ `/admin/dashboard` - แดชบอร์ด
- ✅ โครงสร้างพร้อมสำหรับ CRUD

### **ฟีเจอร์พิเศษ**
- ✅ SEO (Sitemap, Robots, JSON-LD)
- ✅ Analytics (GA4, FB Pixel, TikTok)
- ✅ AI SEO Helper
- ✅ Responsive Design
- ✅ Animations

---

## 🎨 ธีมสีใหม่

```css
Primary:  #af4c0f  (ส้มอุ่น)
Success:  #00bf63  (เขียว - ยืนยัน/สำเร็จเท่านั้น)
Brown:    #32241c  (น้ำตาลเข้ม)
Accent:   #f9d53d  (เหลือง)
Orange:   #ff8c42  (ส้มสด)
```

**หมายเหตุ:** สีเขียวใช้เฉพาะปุ่มยืนยัน/สำเร็จ และสถานะเปิดร้าน

---

## 🔧 แก้ปัญหา

### **ปัญหา: "Can't reach database server"**
**สาเหตุ:** ฐานข้อมูล MySQL ยังไม่ได้รัน

**วิธีแก้:**
```bash
# ถ้าใช้ Docker
docker-compose up -d
docker-compose exec web npx prisma db push --accept-data-loss
docker-compose exec web npm run db:seed

# ถ้าใช้ Local
# ตรวจสอบว่า MySQL รันอยู่
mysql -u root -p
```

### **ปัญหา: โลโก้ไม่แสดง**
**สาเหตุ:** ยังไม่ได้วางไฟล์โลโก้

**วิธีแก้:**
```bash
# คัดลอกรูปโลโก้ไปที่
/public/logo.png
```

### **ปัญหา: Port 3000 ถูกใช้งาน**
**วิธีแก้:**
```bash
# หยุดโปรเซสที่ใช้ port 3000
lsof -ti:3000 | xargs kill -9

# หรือเปลี่ยน port
# แก้ไข package.json: "dev": "next dev -p 3001"
```

---

## 📚 เอกสารเพิ่มเติม

- `README.md` - คู่มือโปรเจกต์
- `QUICK_START.md` - คู่มือเริ่มต้นด่วน
- `GETTING_STARTED.md` - คู่มือละเอียด
- `DESIGN_COMPLETE.md` - สรุปการออกแบบ
- `PROJECT_SUMMARY.md` - สรุปโครงการ
- `docs/plan.md` - แผนโครงการ

---

## 🎯 ขั้นตอนถัดไป

หลังจากรันสำเร็จแล้ว:

1. **วางโลโก้** → `/public/logo.png`
2. **เข้าหลังบ้าน** → `/admin/login`
3. **เพิ่มเนื้อหา** → เมนู, โปรโมชัน, ข่าว
4. **อัปโหลดรูปภาพ** → แทนรูป placeholder
5. **ปรับแต่งข้อมูล** → ที่อยู่, เบอร์โทร, โซเชียล

---

## 💡 Tips

### **คำสั่งที่ใช้บ่อย**
```bash
npm run dev          # รัน development
npm run build        # build production
npm run db:studio    # เปิด Prisma Studio (GUI)
npm run db:seed      # seed ข้อมูลใหม่
```

### **Docker Commands**
```bash
docker-compose up -d           # เริ่ม
docker-compose down            # หยุด
docker-compose logs -f web     # ดู logs
docker-compose exec web bash   # เข้า container
```

---

## 📞 ติดต่อ

หากมีปัญหาหรือข้อสงสัย:
1. ตรวจสอบ error ใน terminal
2. อ่าน `QUICK_START.md` สำหรับแก้ปัญหา
3. ตรวจสอบว่า MySQL รันอยู่
4. ลอง restart Docker/server

---

## ✅ Checklist

ก่อนใช้งานจริง:

- [ ] วางไฟล์โลโก้ที่ `/public/logo.png`
- [ ] รัน Docker หรือ MySQL
- [ ] รัน `db:push` และ `db:seed`
- [ ] เข้าหลังบ้านได้
- [ ] ทดสอบทุกหน้า
- [ ] เพิ่มข้อมูลจริง
- [ ] อัปโหลดรูปภาพ
- [ ] ตั้งค่า Analytics (ถ้าต้องการ)
- [ ] ตั้งค่า AI SEO (ถ้าต้องการ)

---

## 🎉 พร้อมใช้งาน!

เว็บไซต์ "ฟาร์มอร่อย" พร้อมแล้ว!

**ทุกหน้าสวยงาม • ใช้งานง่าย • Responsive • SEO-Ready**

ขอให้โชคดีกับธุรกิจ! 🍀

