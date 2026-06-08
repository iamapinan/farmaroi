"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverId?: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt?: string;
  author: { id: string; name: string };
  cover?: { id: string; url: string; alt?: string | null } | null;
}

export default function AdminPostsPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [coverId, setCoverId] = useState<string>("");

  useEffect(() => { fetchItems(); }, []);

  useEffect(() => {
    if (editingItem) {
      setCoverId(editingItem.cover?.id || editingItem.coverId || "");
    } else {
      setCoverId("");
    }
  }, [editingItem]);

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
      coverId: coverId || null,
      status: formData.get("status") as "DRAFT" | "PUBLISHED",
      publishedAt: formData.get("status") === "PUBLISHED"
        ? (editingItem?.publishedAt || new Date().toISOString())
        : null,
    };

    const url = editingItem ? `/api/admin/posts/${editingItem.id}` : "/api/admin/posts";
    const method = editingItem ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

    if (res.ok) {
      await fetchItems();
      setShowModal(false);
      setEditingItem(null);
      setCoverId("");
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

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-black/10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 00-2-2m2 2a2 2 0 11-4 0V7" />
              </svg>
            </div>
            <p className="text-gray-400">ยังไม่มีข่าวสารในขณะนี้</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl border border-black/10 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300">
                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                  {item.cover?.url ? (
                    <Image
                      src={item.cover.url}
                      alt={item.cover.alt || item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50/50 to-indigo-50/50 flex items-center justify-center text-blue-800/30">
                      <svg className="w-12 h-12 stroke-current opacity-40" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm ${item.status === "PUBLISHED" ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"}`}>
                      {item.status === "PUBLISHED" ? "เผยแพร่แล้ว" : "แบบร่าง"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1 mb-1.5 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    {item.excerpt ? (
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{item.excerpt}</p>
                    ) : (
                      <p className="text-sm text-gray-300 italic">ไม่มีข้อมูลสรุปข่าว</p>
                    )}
                  </div>

                  <div className="space-y-2 border-t border-black/5 pt-3">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>ผู้เขียน:</span>
                      <span className="font-medium text-gray-700">{item.author.name}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>วันที่เผยแพร่:</span>
                      <span className="font-medium text-gray-700">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("th-TH") : "-"}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-black/5">
                    <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      แก้ไข
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      ลบ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">{editingItem ? "แก้ไขข่าวสาร" : "เพิ่มข่าวสารใหม่"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <ImageUpload 
                currentImage={editingItem?.cover}
                onImageUploaded={setCoverId}
                folder="posts"
              />
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
                <button type="button" onClick={() => { setShowModal(false); setCoverId(""); }} className="btn btn-outline flex-1">ยกเลิก</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

