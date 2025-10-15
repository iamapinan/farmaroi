"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF";
  isActive: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [items, setItems] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/users");
    if (res.ok) setItems(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: { name: string; email: string; role: "ADMIN" | "STAFF"; isActive: boolean; password?: string } = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as "ADMIN" | "STAFF",
      isActive: formData.get("isActive") === "on",
    };

    const password = formData.get("password") as string;
    if (password) data.password = password;

    const url = editingItem ? `/api/admin/users/${editingItem.id}` : "/api/admin/users";
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
    if (!confirm("ต้องการลบผู้ใช้นี้?")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) await fetchItems();
  };

  return (
    <div className="container-site py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="section-title">จัดการผู้ใช้</h1>
          <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="btn btn-primary">เพิ่มผู้ใช้</button>
        </div>

        <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-black/10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold">ชื่อ</th>
                <th className="px-4 py-3 text-left text-sm font-bold">อีเมล</th>
                <th className="px-4 py-3 text-center text-sm font-bold">บทบาท</th>
                <th className="px-4 py-3 text-center text-sm font-bold">สถานะ</th>
                <th className="px-4 py-3 text-center text-sm font-bold">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3 text-sm">{item.email}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${item.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                      {item.role === "ADMIN" ? "ผู้ดูแลระบบ" : "พนักงาน"}
                    </span>
                  </td>
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
            <h2 className="text-xl font-bold mb-4">{editingItem ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้ใหม่"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">ชื่อ</label>
                <input type="text" name="name" defaultValue={editingItem?.name} required className="w-full px-3 py-2 border border-black/10 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">อีเมล</label>
                <input type="email" name="email" defaultValue={editingItem?.email} required className="w-full px-3 py-2 border border-black/10 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">รหัสผ่าน {editingItem && "(เว้นว่างถ้าไม่ต้องการเปลี่ยน)"}</label>
                <input type="password" name="password" required={!editingItem} className="w-full px-3 py-2 border border-black/10 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">บทบาท</label>
                <select name="role" defaultValue={editingItem?.role || "STAFF"} required className="w-full px-3 py-2 border border-black/10 rounded-lg">
                  <option value="STAFF">พนักงาน</option>
                  <option value="ADMIN">ผู้ดูแลระบบ</option>
                </select>
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

