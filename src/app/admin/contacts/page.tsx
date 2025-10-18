"use client";

import { useEffect, useState } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Contact | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/contacts");
    if (res.ok) setItems(await res.json());
  };

  const handleView = async (item: Contact) => {
    setSelectedItem(item);
    setShowModal(true);
    
    if (!item.isRead) {
      await fetch(`/api/admin/contacts/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      await fetchItems();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ต้องการลบข้อความนี้?")) return;
    const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (res.ok) await fetchItems();
  };

  const toggleRead = async (item: Contact) => {
    await fetch(`/api/admin/contacts/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: !item.isRead }),
    });
    await fetchItems();
  };

  const filteredItems = items.filter((item) => {
    if (filter === "unread") return !item.isRead;
    if (filter === "read") return item.isRead;
    return true;
  });

  const unreadCount = items.filter((item) => !item.isRead).length;

  return (
    <div className="container-site py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="section-title">ข้อความติดต่อ</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              มีข้อความใหม่ {unreadCount} รายการ
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm ${filter === "all" ? "bg-brand text-white" : "bg-gray-100"}`}
          >
            ทั้งหมด ({items.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg text-sm ${filter === "unread" ? "bg-brand text-white" : "bg-gray-100"}`}
          >
            ยังไม่อ่าน ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-4 py-2 rounded-lg text-sm ${filter === "read" ? "bg-brand text-white" : "bg-gray-100"}`}
          >
            อ่านแล้ว ({items.length - unreadCount})
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-black/10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold">สถานะ</th>
              <th className="px-4 py-3 text-left text-sm font-bold">ชื่อ</th>
              <th className="px-4 py-3 text-left text-sm font-bold">อีเมล</th>
              <th className="px-4 py-3 text-left text-sm font-bold">เบอร์โทร</th>
              <th className="px-4 py-3 text-left text-sm font-bold">ข้อความ</th>
              <th className="px-4 py-3 text-left text-sm font-bold">วันที่</th>
              <th className="px-4 py-3 text-center text-sm font-bold">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  ไม่มีข้อความ
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className={`hover:bg-gray-50 ${!item.isRead ? "bg-blue-50/50" : ""}`}>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleRead(item)}
                      title={item.isRead ? "ทำเครื่องหมายว่ายังไม่อ่าน" : "ทำเครื่องหมายว่าอ่านแล้ว"}
                    >
                      {item.isRead ? (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`font-medium ${!item.isRead ? "font-bold" : ""}`}>
                      {item.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{item.email}</td>
                  <td className="px-4 py-3 text-sm">{item.phone || "-"}</td>
                  <td className="px-4 py-3 text-sm max-w-xs truncate">
                    {item.message}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleView(item)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      ดู
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">รายละเอียดข้อความ</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">ชื่อ</label>
                    <p className="text-base mt-1">{selectedItem.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">อีเมล</label>
                    <p className="text-base mt-1">
                      <a href={`mailto:${selectedItem.email}`} className="text-blue-600 hover:underline">
                        {selectedItem.email}
                      </a>
                    </p>
                  </div>
                  {selectedItem.phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">เบอร์โทร</label>
                      <p className="text-base mt-1">
                        <a href={`tel:${selectedItem.phone}`} className="text-blue-600 hover:underline">
                          {selectedItem.phone}
                        </a>
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-600">วันที่</label>
                    <p className="text-base mt-1">
                      {new Date(selectedItem.createdAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">ข้อความ</label>
                <div className="mt-2 bg-white border border-gray-200 rounded-lg p-4 whitespace-pre-wrap">
                  {selectedItem.message}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <a
                  href={`mailto:${selectedItem.email}?subject=Re: ติดต่อจากเว็บไซต์ฟาร์มอร่อย`}
                  className="btn btn-primary flex-1 justify-center"
                >
                  ตอบกลับทางอีเมล
                </a>
                {selectedItem.phone && (
                  <a
                    href={`tel:${selectedItem.phone}`}
                    className="btn btn-success flex-1 justify-center"
                  >
                    โทรกลับ
                  </a>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline flex-1 justify-center"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

