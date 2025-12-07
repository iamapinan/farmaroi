import React from "react";
import Link from "next/link";

export const metadata = {
  title: "เงื่อนไขการให้บริการ (Terms of Service) - Farm Aroi",
  description: "ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์และบริการของฟาร์มอร่อย",
};

export default function TermsPage() {
  const lastUpdated = "7 ธันวาคม 2568"; // Using current year + 543 for Thai BE

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      {/* Header Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="container-site text-center">
          <h1 className="text-display mb-6 text-gradient animate-fade-in">
            เงื่อนไขการให้บริการ
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto animate-slide-in delay-100">
            ข้อตกลงและเงื่อนไขในการใช้งานเว็บไซต์และบริการของเรา
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
                ยินดีต้อนรับสู่เว็บไซต์ Farm Aroi ("เรา", "ของเรา", หรือ "ฟาร์มอร่อย") 
                การเข้าถึงและใช้งานเว็บไซต์นี้แสดงว่าคุณยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขเหล่านี้ 
                หากคุณไม่เห็นด้วยกับส่วนใดส่วนหนึ่งของข้อกำหนดเหล่านี้ โปรดระงับการใช้งานเว็บไซต์ของเรา
              </p>

              <h3>2. การใช้งานเว็บไซต์</h3>
              <p>
                คุณตกลงที่จะใช้งานเว็บไซต์นี้เพื่อวัตถุประสงค์ที่ถูกต้องตามกฎหมายเท่านั้น 
                และจะไม่กระทำการใดๆ ที่เป็นการละเมิดสิทธิ์ของผู้อื่น หรือจำกัดขัดขวางการใช้งานเว็บไซต์ของผู้อื่น 
                ห้ามมิให้ส่งหรือโพสต์เนื้อหาที่ผิดกฎหมาย ข่มขู่ หมิ่นประมาท หรือลามกอนาจาร
              </p>

              <h3>3. ทรัพย์สินทางปัญญา</h3>
              <p>
                เนื้อหาทั้งหมดบนเว็บไซต์นี้ รวมถึงแต่ไม่จำกัดเพียง ข้อความ กราฟิก โลโก้ รูปภาพ และซอฟต์แวร์ 
                เป็นทรัพย์สินของฟาร์มอร่อย หรือผู้ให้บริการเนื้อหาของเรา และได้รับความคุ้มครองตามกฎหมายลิขสิทธิ์ 
                ห้ามทำซ้ำ ดัดแปลง แจกจ่าย หรือใช้เนื้อหาใดๆ โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษรจากเรา
              </p>

              <h3>4. การจองและการสั่งซื้อ</h3>
              <p>
                การจองโต๊ะหรือสั่งซื้ออาหารผ่านเว็บไซต์ขึ้นอยู่กับความพร้อมในการให้บริการ 
                เราขอสงวนสิทธิ์ในการปฏิเสธหรือยกเลิกคำสั่งซื้อใดๆ ตามดุลยพินิจของเรา 
                ราคาและรายละเอียดเมนูอาจมีการเปลี่ยนแปลงโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
              </p>

              <h3>5. บัญชีผู้ใช้</h3>
              <p>
                หากคุณสร้างบัญชีบนเว็บไซต์ของเรา คุณมีหน้าที่รับผิดชอบในการรักษาความลับของรหัสผ่านและข้อมูลบัญชีของคุณ 
                และรับผิดชอบต่อกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของคุณ
              </p>

              <h3>6. การจำกัดความรับผิด</h3>
              <p>
                ฟาร์มอร่อยจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดขึ้นจากการใช้งาน หรือความไม่สามารถใช้งานเว็บไซต์นี้ 
                รวมถึงความเสียหายทางตรง ทางอ้อม หรือความเสียหายที่ตามมา
              </p>

              <h3>7. การแก้ไขข้อกำหนด</h3>
              <p>
                เราขอสงวนสิทธิ์ในการแก้ไขหรือเปลี่ยนแปลงข้อกำหนดและเงื่อนไขเหล่านี้ได้ตลอดเวลา 
                การเปลี่ยนแปลงจะมีผลทันทีเมื่อประกาศบนเว็บไซต์ การใช้งานเว็บไซต์อย่างต่อเนื่องของคุณถือว่าคุณยอมรับการเปลี่ยนแปลงดังกล่าว
              </p>

              <h3>8. กฎหมายที่ใช้บังคับ</h3>
              <p>
                ข้อกำหนดและเงื่อนไขเหล่านี้อยู่ภายใต้บังคับของกฎหมายประเทศไทย 
                และข้อพิพาทใดๆ ที่เกี่ยวข้องจะอยู่ภายใต้อำนาจศาลของประเทศไทย
              </p>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-xl font-bold mb-4">ติดต่อเรา</h4>
                <p>
                  หากคุณมีคำถามเกี่ยวกับเงื่อนไขการให้บริการเหล่านี้ โปรดติดต่อเราที่:
                </p>
                <ul className="list-none pl-0 space-y-2 mt-4">
                  <li><strong>ที่อยู่:</strong> 7/1 หมู่ 1 ต.ตะเคียนเตี้ย อ.บางละมุง ชลบุรี 20130</li>
                  <li><strong>อีเมล:</strong> contact@farmaroi.com</li>
                  <li><strong>โทรศัพท์:</strong> 092-645-1982</li>
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
