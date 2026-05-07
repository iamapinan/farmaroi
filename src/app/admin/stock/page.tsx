  "use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface StockItem {
  id: number;
  name: string;
  category: string;
  inStock: boolean;
}

export default function StockPage() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const res = await fetch("/api/admin/stock");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch stock", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStock = async (item: StockItem) => {
    const newStatus = !item.inStock;
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, inStock: newStatus } : i))
    );

    try {
      await fetch("/api/admin/stock", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, inStock: newStatus }),
      });
    } catch (error) {
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, inStock: item.inStock } : i))
      );
      alert("Failed to update status");
    }
  };

  const copyToClipboard = () => {
    const outOfStockItems = items.filter((i) => !i.inStock);
    if (outOfStockItems.length === 0) {
      alert("สินค้าครบทุกรายการ (All items in stock)");
      return;
    }

    const grouped: Record<string, string[]> = {};
    outOfStockItems.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item.name);
    });

    let text = `🛒 รายการสั่งของ Farm Aroi\n`;
    text += `วันที่: ${new Date().toLocaleDateString("th-TH")}\n`;
    text += `------------------\n`;

    for (const [cat, names] of Object.entries(grouped)) {
      text += `📂 ${cat}\n`;
      names.forEach((name) => (text += `- ${name}\n`));
      text += `------------------\n`;
    }

    navigator.clipboard.writeText(text);
    alert("คัดลอกรายการสั่งซื้อเรียบร้อย!");
  };

  const saveHistory = async () => {
    const outOfStockItems = items.filter((i) => !i.inStock).map(i => i.name);
    if (outOfStockItems.length === 0) {
      if (!confirm("สินค้าครบทุกรายการ คุณต้องการบันทึกว่า 'ไม่มีของขาด' ใช่หรือไม่?")) return;
    } else {
      if (!confirm(`ต้องการบันทึกรายการสินค้าขาด ${outOfStockItems.length} รายการ?`)) return;
    }

    try {
      const res = await fetch("/api/admin/stock/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: outOfStockItems }),
      });
      
      if (res.ok) {
        alert("บันทึกประวัติสำเร็จ!");
        router.push("/admin/stock/history");
      } else {
        alert("บันทึกไม่สำเร็จ");
      }
    } catch (error) {
       alert("Error saving history");
    }
  };

  const resetStock = async () => {
    if (!confirm("ยืนยันการล้างรายการทั้งหมด? (Reset all to 'In Stock'?)")) return;
    
    const oldItems = [...items];
    setItems((prev) => prev.map((i) => ({ ...i, inStock: true })));

    try {
      await fetch("/api/admin/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
    } catch (error) {
      setItems(oldItems);
      alert("Failed to reset");
    }
  };

  const categories = Array.from(new Set(items.map((i) => i.category)));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800">
             รายการเช็คสต็อกร้าน Farm Aroi
           </h1>
           <Link href="/admin/stock/history" className="text-sm text-blue-600 hover:underline">
             ดูประวัติการเช็คสต๊อก &gt;
           </Link>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-end">
          <button
            onClick={resetStock}
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
          >
            ล้างทั้งหมด
          </button>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition text-sm"
          >
            คัดลอกรายการ
          </button>
          <button
            onClick={saveHistory}
            className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition text-sm"
          >
            บันทึกประวัติ
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="space-y-8">
          {categories.map((cat) => {
             const catItems = items.filter((i) => i.category === cat);
             return (
               <div key={cat}>
                 <h2 className="text-xl font-semibold mb-3 text-gray-700 border-b pb-1">
                   {cat}
                 </h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                   {catItems.map((item) => {
                     const isOutOfStock = !item.inStock;
                     return (
                       <div
                         key={item.id}
                         onClick={() => toggleStock(item)}
                         className={`
                           cursor-pointer p-3 rounded-lg border-2 text-center transition-all select-none
                           flex items-center justify-center min-h-[80px]
                           ${
                             isOutOfStock
                               ? "bg-red-50 border-red-500 text-red-700 font-bold shadow-sm"
                               : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                           }
                         `}
                       >
                         {item.name}
                       </div>
                     );
                   })}
                 </div>
               </div>
             );
          })}
        </div>
      )}
    </div>
  );
}
