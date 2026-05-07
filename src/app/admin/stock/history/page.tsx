"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface StockLog {
  id: string;
  date: string;
  items: string; // JSON string
  createdAt: string;
}

export default function StockHistoryPage() {
  const [logs, setLogs] = useState<StockLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<StockLog | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/admin/stock/log");
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 print:p-0 print:max-w-none">
      <div className="mb-6 flex justify-between items-center print:hidden">
         <div className="flex items-center gap-2">
            <Link href="/admin/stock" className="text-gray-500 hover:text-gray-700">
               &larr; กลับ
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">ประวัติการสั่งของ</h1>
         </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:block">
          {/* Sidebar List (Hidden on Print) */}
          <div className="bg-white rounded-lg shadow p-4 h-[calc(100vh-200px)] overflow-y-auto print:hidden">
            <h2 className="font-semibold mb-4 text-gray-700">รายการย้อนหลัง</h2>
            <div className="space-y-2">
              {logs.length === 0 && <p className="text-gray-400 text-sm">ไม่มีประวัติ</p>}
              {logs.map((log) => (
                <button
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`w-full text-left p-3 rounded-lg text-sm border transition ${
                    selectedLog?.id === log.id
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium">{formatDate(log.date)}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    สินค้าขาด {JSON.parse(log.items).length} รายการ
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Details View (Printable) */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6 md:p-8 print:shadow-none print:p-0">
            {selectedLog ? (
              <div>
                <div className="flex justify-between items-start mb-6 border-b pb-4 print:border-none">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">ใบรายการสั่งของ</h2>
                    <p className="text-gray-600 mt-1">
                      วันที่: {new Date(selectedLog.date).toLocaleDateString("th-TH", { dateStyle: "full" })}
                    </p>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="print:hidden px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                  >
                    <span>🖨️ พิมพ์</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    รายการสินค้าที่ต้องซื้อ ({JSON.parse(selectedLog.items).length})
                  </h3>
                  
                  {JSON.parse(selectedLog.items).length === 0 ? (
                    <div className="text-center py-8 text-green-600 font-medium bg-green-50 rounded-lg border border-green-100">
                       ✅ สินค้าครบทุกรายการ (ไม่มีของขาด)
                    </div>
                  ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                      {(JSON.parse(selectedLog.items) as string[]).sort().map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 p-2 border-b border-gray-100 last:border-0">
                           <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                           {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-300 hidden print:block">
                   <div className="flex justify-between text-sm text-gray-500">
                      <div>ผู้ตรวจสอบ: .......................................</div>
                      <div>ผู้สั่งซื้อ: .......................................</div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 print:hidden">
                <span className="text-4xl mb-2">📋</span>
                <p>เลือกรายการจากด้านซ้ายเพื่อดูรายละเอียด</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
