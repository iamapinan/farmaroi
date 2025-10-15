"use client";

import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt?: string;
  author: { id: string; name: string };
}

export default function AdminPostsPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/posts");
    if (res.ok) setItems(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      status: formData.get("status") as "DRAFT" | "PUBLISHED",
      publishedAt: formData.get("status") === "PUBLISHED" ? new Date().toISOString() : null,
    };

    const url = editingItem ? `/api/admin/posts/${editingItem.id}` : "/api/admin/posts";
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
    if (!confirm("ต้องการลบข่าวสารนี้?")) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) await fetchItems();
  };

  return (
    <div className="container-site py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="section-title">จัดการข่าวสาร</h1>
          <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="btn btn-primary">เพิ่มข่าวสาร</button>
        </div>

        <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-black/10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold">หัวข้อข่าว</th>
                <th className="px-4 py-3 text-left text-sm font-bold">ผู้เขียน</th>
                <th className="px-4 py-3 text-left text-sm font-bold">วันที่เผยแพร่</th>
                <th className="px-4 py-3 text-center text-sm font-bold">สถานะ</th>
                <th className="px-4 py-3 text-center text-sm font-bold">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.title}</td>
                  <td className="px-4 py-3 text-sm">{item.author.name}</td>
                  <td className="px-4 py-3 text-sm">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("th-TH") : "-"}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${item.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {item.status === "PUBLISHED" ? "เผยแพร่แล้ว" : "แบบร่าง"}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">{editingItem ? "แก้ไขข่าวสาร" : "เพิ่มข่าวสารใหม่"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">หัวข้อข่าว</label>
                <input type="text" name="title" defaultValue={editingItem?.title} required className="w-full px-3 py-2 border border-black/10 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input type="text" name="slug" defaultValue={editingItem?.slug} required className="w-full px-3 py-2 border border-black/10 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">สรุปข่าว</label>
                <textarea name="excerpt" defaultValue={editingItem?.excerpt} rows={2} className="w-full px-3 py-2 border border-black/10 rounded-lg"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">เนื้อหาข่าว</label>
                <textarea name="content" defaultValue={editingItem?.content} rows={8} required className="w-full px-3 py-2 border border-black/10 rounded-lg"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">สถานะ</label>
                <select name="status" defaultValue={editingItem?.status || "DRAFT"} className="w-full px-3 py-2 border border-black/10 rounded-lg">
                  <option value="DRAFT">แบบร่าง</option>
                  <option value="PUBLISHED">เผยแพร่</option>
                </select>
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

