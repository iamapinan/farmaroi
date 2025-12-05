import { getCategories, getMenuItems } from "@/services/menuService";
import Image from "next/image";


export default async function MenuPage() {
  const categories = await getCategories();
  const menuItems = await getMenuItems();

  // Group items by category
  const itemsByCategory = categories.map(category => ({
    ...category,
    items: menuItems.filter(item => item.categoryId === category.id)
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-brown">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1920&q=80"
            alt="Menu Background"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-white/10"></div>
        </div>
        
        <div className="container-site relative z-10 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-sm font-medium tracking-wider uppercase mb-6 animate-fade-in">
            Discover Our Flavors
          </span>
          <h1 className="text-display mb-6 drop-shadow-lg animate-slide-in">
            เมนูอาหาร
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in delay-100">
            คัดสรรวัตถุดิบที่ดีที่สุด ปรุงด้วยความใส่ใจ เพื่อรสชาติที่ลงตัว
          </p>
        </div>
      </section>

      {/* Sticky Category Nav */}
      <div className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container-site overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 py-4 min-w-max">
            {itemsByCategory.map((category) => (
              <a
                key={category.id}
                href={`#category-${category.id}`}
                className="text-gray-500 hover:text-brand font-medium transition-colors whitespace-nowrap text-sm uppercase tracking-wider"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="container-site py-16 space-y-24">
        {itemsByCategory.map((category, catIndex) => (
          <section 
            key={category.id} 
            id={`category-${category.id}`}
            className="scroll-mt-32"
          >
            <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-6">
              <div>
                <span className="text-brand-orange text-sm font-bold tracking-widest uppercase mb-2 block">
                  0{catIndex + 1}
                </span>
                <h2 className="text-4xl font-bold text-brown">{category.name}</h2>
              </div>
              <p className="text-gray-500 hidden md:block max-w-md text-right">
                เมนูคุณภาพที่เราคัดสรรมาเพื่อคุณ
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {category.items.map((item) => (
                <div 
                  key={item.id} 
                  className="group flex gap-6 items-start"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300">
                    <Image
                      src={item.image?.url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="flex-1 pt-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-brown group-hover:text-brand transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    {item.spicyLevel > 0 && (
                      <div className="flex gap-1">
                        {[...Array(item.spicyLevel)].map((_, i) => (
                          <span key={i} className="text-xs">🌶️</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
