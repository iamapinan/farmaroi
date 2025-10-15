"use client";

import { useEffect, useState } from "react";

interface Banner {
  id: string;
  title: string;
  link?: string;
  position: string;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminBannersPage() {
  const [items, setItems] = useState<Banner[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/banners");
    if (res.ok) setItems(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      link: formData.get("link") as string,
      position: formData.get("position") as string,
      sortOrder: parseInt(formData.get("sortOrder") as string),
      isActive: formData.get("isActive") === "on",
    };

    const url = editingItem ? `/api/admin/banners/${editingItem.id}` : "/api/admin/banners";
    const method = editingItem ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

    if (res.ok) {
      await fetchItems();
      setShowModal(false);
      setEditingItem(null);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ต้องการลบแบนเนอร์นี้?")) return;
    const res = await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
    if (res.ok) await fetchItems();
  };

  return (
    <div className="container-site py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="section-title">จัดการแบนเนอร์</h1>
          <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="btn btn-primary">เพิ่มแบนเนอร์</button>
        </div>

        <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-black/10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold">ชื่อแบนเนอร์</th>
                <th className="px-4 py-3 text-left text-sm font-bold">ตำแหน่ง</th>
                <th className="px-4 py-3 text-center text-sm font-bold">ลำดับ</th>
                <th className="px-4 py-3 text-center text-sm font-bold">สถานะ</th>
                <th className="px-4 py-3 text-center text-sm font-bold">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3 text-sm">{item.position}</td>
                  <td className="px-4 py-3 text-center text-sm">{item.sortOrder}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {item.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="text-blue-600 hover:underline text-sm">แก้ไข</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline text-sm">ลบ</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">{editingItem ? "แก้ไขแบนเนอร์" : "เพิ่มแบนเนอร์ใหม่"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">ชื่อแบนเนอร์</label>
                <input type="text" name="title" defaultValue={editingItem?.title} required className="w-full px-3 py-2 border border-black/10 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ลิงก์</label>
                <input type="text" name="link" defaultValue={editingItem?.link} className="w-full px-3 py-2 border border-black/10 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">ตำแหน่ง</label>
                  <select name="position" defaultValue={editingItem?.position || "hero"} required className="w-full px-3 py-2 border border-black/10 rounded-lg">
                    <option value="hero">Hero</option>
                    <option value="sidebar">Sidebar</option>
                    <option value="footer">Footer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ลำดับการแสดงผล</label>
                  <input type="number" name="sortOrder" defaultValue={editingItem?.sortOrder || 0} required className="w-full px-3 py-2 border border-black/10 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="isActive" defaultChecked={editingItem?.isActive ?? true} className="rounded" />
                  <span className="text-sm">เปิดใช้งาน</span>
                </label>
              </div>
              <div className="flex gap-2 pt-4">
                <button type="submit" disabled={loading} className="btn btn-primary flex-1">{loading ? "กำลังบันทึก..." : "บันทึก"}</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline flex-1">ยกเลิก</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

