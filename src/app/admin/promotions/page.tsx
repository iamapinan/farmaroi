"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";

interface Promotion {
  id: string;
  title: string;
  slug: string;
  description?: string;
  startAt?: string;
  endAt?: string;
  imageId?: string;
  isActive: boolean;
  image?: { id: string; url: string; alt?: string | null } | null;
}

export default function AdminPromotionsPage() {
  const [items, setItems] = useState<Promotion[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Promotion | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageId, setImageId] = useState<string>("");

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (editingItem) {
      setImageId(editingItem.image?.id || editingItem.imageId || "");
    } else {
      setImageId("");
    }
  }, [editingItem]);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/promotions");
    if (res.ok) setItems(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      startAt: formData.get("startAt")
        ? new Date(formData.get("startAt") as string).toISOString()
        : null,
      endAt: formData.get("endAt")
        ? new Date(formData.get("endAt") as string).toISOString()
        : null,
      imageId: imageId || null,
      isActive: formData.get("isActive") === "on",
    };

    const url = editingItem
      ? `/api/admin/promotions/${editingItem.id}`
      : "/api/admin/promotions";
    const method = editingItem ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      await fetchItems();
      setShowModal(false);
      setEditingItem(null);
      setImageId("");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ต้องการลบโปรโมชันนี้?")) return;
    const res = await fetch(`/api/admin/promotions/${id}`, {
      method: "DELETE",
    });
    if (res.ok) await fetchItems();
  };

  return (
    <div className="container-site py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="section-title">จัดการโปรโมชัน</h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setShowModal(true);
          }}
          className="btn btn-primary"
        >
          เพิ่มโปรโมชัน
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-black/10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
          </div>
          <p className="text-gray-400">ยังไม่มีโปรโมชันในขณะนี้</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-black/10 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                {item.image?.url ? (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-50/50 to-teal-50/50 flex items-center justify-center text-emerald-800/30">
                    <svg
                      className="w-12 h-12 stroke-current opacity-40"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm ${item.isActive ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"}`}
                  >
                    {item.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-1 mb-1.5 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-300 italic">
                      ไม่มีรายละเอียด
                    </p>
                  )}
                </div>

                <div className="space-y-2 border-t border-black/5 pt-3">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>วันที่เริ่ม:</span>
                    <span className="font-medium text-gray-700">
                      {item.startAt
                        ? new Date(item.startAt).toLocaleDateString("th-TH")
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>วันที่สิ้นสุด:</span>
                    <span className="font-medium text-gray-700">
                      {item.endAt
                        ? new Date(item.endAt).toLocaleDateString("th-TH")
                        : "-"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-black/5">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setShowModal(true);
                    }}
                    className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? "แก้ไขโปรโมชัน" : "เพิ่มโปรโมชันใหม่"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <ImageUpload
                currentImage={editingItem?.image}
                onImageUploaded={setImageId}
                folder="promotions"
              />
              <div>
                <label className="block text-sm font-medium mb-1">
                  ชื่อโปรโมชัน
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingItem?.title}
                  required
                  className="w-full px-3 py-2 border border-black/10 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  defaultValue={editingItem?.slug}
                  required
                  className="w-full px-3 py-2 border border-black/10 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  รายละเอียด
                </label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description}
                  rows={3}
                  className="w-full px-3 py-2 border border-black/10 rounded-lg"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    วันที่เริ่ม
                  </label>
                  <input
                    type="date"
                    name="startAt"
                    defaultValue={editingItem?.startAt?.split("T")[0]}
                    className="w-full px-3 py-2 border border-black/10 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    วันที่สิ้นสุด
                  </label>
                  <input
                    type="date"
                    name="endAt"
                    defaultValue={editingItem?.endAt?.split("T")[0]}
                    className="w-full px-3 py-2 border border-black/10 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={editingItem?.isActive ?? true}
                    className="rounded"
                  />
                  <span className="text-sm">เปิดใช้งาน</span>
                </label>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary flex-1"
                >
                  {loading ? "กำลังบันทึก..." : "บันทึก"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setImageId("");
                  }}
                  className="btn btn-outline flex-1"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
