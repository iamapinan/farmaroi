import React from "react";
import Link from "next/link";

export const metadata = {
  title: "นโยบายความเป็นส่วนตัว (Privacy Policy) - Farm Aroi",
  description: "นโยบายการคุ้มครองข้อมูลส่วนบุคคลของฟาร์มอร่อย",
};

export default function PrivacyPage() {
  const lastUpdated = "7 ธันวาคม 2568";

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/3"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 translate-x-1/3"></div>

      {/* Header Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="container-site text-center">
          <h1 className="text-display mb-6 text-gradient animate-fade-in">
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto animate-slide-in delay-100">
            เราให้ความสำคัญกับการปกป้องข้อมูลส่วนบุคคลของคุณ
          </p>
          <div className="mt-8 animate-scale-in delay-200">
            <span className="inline-block px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-brand/10 text-brand-brown text-sm font-medium">
              อัปเดตล่าสุด: {lastUpdated}
            </span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24 relative z-10">
        <div className="container-site max-w-4xl">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 animate-slide-down delay-300">
            
            <div className="prose prose-lg prose-headings:font-bold prose-headings:text-brand-brown prose-p:text-gray-600 prose-a:text-brand-orange hover:prose-a:text-brand-orange-light prose-strong:text-brand-brown max-w-none">
              
              <h3>1. บทนำ</h3>
              <p>
                ฟาร์มอร่อย ("เรา") ตระหนักถึงความสำคัญของข้อมูลส่วนบุคคลของท่าน 
                นโยบายความเป็นส่วนตัวนี้อธิบายถึงวิธีการที่เราเก็บรวบรวม ใช้ เปิดเผย และปกป้องข้อมูลส่วนบุคคลของท่าน 
                เมื่อท่านเข้าเยี่ยมชมเว็บไซต์ หรือใช้บริการของเรา
              </p>

              <h3>2. ข้อมูลที่เราเก็บรวบรวม</h3>
              <p>
                เราอาจเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน ดังนี้:
              </p>
              <ul>
                <li><strong>ข้อมูลระบุตัวตน:</strong> ชื่อ, นามสกุล</li>
                <li><strong>ข้อมูลการติดต่อ:</strong> ที่อยู่, อีเมล, หมายเลขโทรศัพท์</li>
                <li><strong>ข้อมูลการใช้งาน:</strong> ข้อมูลเกี่ยวกับการใช้งานเว็บไซต์ของท่าน, คุกกี้, ที่อยู่ IP</li>
                <li><strong>ข้อมูลธุรกรรม:</strong> ประวัติการสั่งซื้อ, การจองโต๊ะ</li>
              </ul>

              <h3>3. วิธีการใช้ข้อมูล</h3>
              <p>
                เราใช้ข้อมูลส่วนบุคคลของท่านเพื่อวัตถุประสงค์ต่อไปนี้:
              </p>
              <ul>
                <li>เพื่อให้บริการและดำเนินการตามคำสั่งซื้อของท่าน</li>
                <li>เพื่อปรับปรุงประสบการณ์การใช้งานเว็บไซต์และการบริการของเรา</li>
                <li>เพื่อติดต่อสื่อสารกับท่านเกี่ยวกับบริการ โปรโมชั่น หรือข่าวสารต่างๆ (หากท่านยินยอม)</li>
                <li>เพื่อปฏิบัติตามกฎหมายและข้อบังคับที่เกี่ยวข้อง</li>
              </ul>

              <h3>4. การเปิดเผยข้อมูล</h3>
              <p>
                เราจะไม่ขาย หรือให้เช่าข้อมูลส่วนบุคคลของท่านแก่บุคคลที่สาม 
                เราอาจเปิดเผยข้อมูลของท่านแก่ผู้ให้บริการที่เชื่อถือได้ซึ่งช่วยเราในการดำเนินธุรกิจ 
                (เช่น ผู้ให้บริการชำระเงิน, ผู้ให้บริการขนส่ง) โดยมีเงื่อนไขว่าพวกเขาตกลงที่จะรักษาความลับของข้อมูลนั้น
              </p>

              <h3>5. คุกกี้ (Cookies)</h3>
              <p>
                เว็บไซต์ของเราใช้คุกกี้เพื่อเพิ่มประสบการณ์การใช้งานของท่าน 
                คุกกี้คือไฟล์ข้อความขนาดเล็กที่จัดเก็บไว้ในคอมพิวเตอร์ของท่าน 
                ท่านสามารถเลือกที่จะปิดการใช้งานคุกกี้ได้ผ่านการตั้งค่าเบราว์เซอร์ของท่าน 
                แต่อาจส่งผลต่อการทำงานบางส่วนของเว็บไซต์
              </p>

              <h3>6. ความปลอดภัยของข้อมูล</h3>
              <p>
                เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของท่านจากการเข้าถึง 
                การใช้ หรือการเปิดเผยโดยไม่ได้รับอนุญาต อย่างไรก็ตาม ไม่มีการส่งข้อมูลผ่านอินเทอร์เน็ตใดที่ปลอดภัย 100%
              </p>

              <h3>7. สิทธิ์ของท่าน</h3>
              <p>
                ท่านมีสิทธิ์ในการเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของท่านที่เราเก็บรักษาไว้ 
                หากท่านต้องการใช้สิทธิ์ดังกล่าว โปรดติดต่อเราตามช่องทางที่ระบุไว้ด้านล่าง
              </p>

              <h3>8. การเปลี่ยนแปลงนโยบาย</h3>
              <p>
                เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว 
                ฉบับล่าสุดจะประกาศบนเว็บไซต์นี้พร้อมวันที่ระบุไว้ด้านบน
              </p>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-xl font-bold mb-4">ติดต่อเจ้าหน้าที่คุ้มครองข้อมูล</h4>
                <p>
                  หากท่านมีข้อสงสัยหรือข้อกังวลเกี่ยวกับนโยบายความเป็นส่วนตัวนี้ โปรดติดต่อเราที่:
                </p>
                <ul className="list-none pl-0 space-y-2 mt-4">
                  <li><strong>อีเมล:</strong> contact@farmaroi.com</li>
                  <li><strong>โทรศัพท์:</strong> 092-645-1982</li>
                  <li><strong>ที่อยู่:</strong> 7/1 หมู่ 1 ต.ตะเคียนเตี้ย อ.บางละมุง ชลบุรี 20130</li>
                </ul>
              </div>

            </div>
            
            <div className="mt-12 flex justify-center">
              <Link href="/" className="btn btn-primary">
                กลับสู่หน้าหลัก
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
