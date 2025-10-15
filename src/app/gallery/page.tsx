import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "แกลเลอรี",
  description: "ภาพบรรยากาศและกิจกรรมจากฟาร์มอร่อย",
};

export default function GalleryPage() {
  // ตัวอย่างข้อมูลแกลเลอรี่ (ในอนาคตจะดึงจากฐานข้อมูล)
  const categories = [
    {
      title: "บรรยากาศร้าน",
      desc: "มุมสวยๆ ภายในร้าน",
      images: 12,
      color: "from-brand to-orange"
    },
    {
      title: "เมนูอาหาร",
      desc: "ภาพอาหารน่าอร่อย",
      images: 24,
      color: "from-brown to-amber-700"
    },
    {
      title: "เครื่องดื่ม",
      desc: "กาแฟและเครื่องดื่มพิเศษ",
      images: 18,
      color: "from-accent to-yellow-500"
    },
    {
      title: "กิจกรรม",
      desc: "กิจกรรมและอีเว้นท์",
      images: 8,
      color: "from-orange to-red-500"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
      {/* Hero Header */}
      <section className="relative py-20 bg-gradient-to-r from-accent via-orange to-brand overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-brown rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            ภาพบรรยากาศ
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">แกลเลอรี</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            ภาพบรรยากาศและกิจกรรมจากฟาร์มอร่อย
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="container-site py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="card card-hover group cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`relative aspect-square bg-gradient-to-br ${cat.color} overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="badge bg-white/20 backdrop-blur-sm text-white">
                    {cat.images} ภาพ
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-brown mb-2 group-hover:text-brand transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-gray-600">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="container-site pb-16">
        <div className="card bg-gradient-to-br from-orange/10 via-accent/10 to-amber-50 border-none">
          <div className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand to-orange text-white flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-brown mb-4">กำลังอัปเดตภาพ</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              เรากำลังรวบรวมภาพสวยๆ มาให้ชม กรุณาติดตามได้ที่โซเชียลมีเดีย
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.facebook.com/farmaroicafe/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              <a
                href="https://www.tiktok.com/@farm.aroi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
