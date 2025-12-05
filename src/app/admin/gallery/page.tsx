"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { resizeImage } from "@/lib/image-utils";

interface GalleryItem {
  id: string;
  imageId: string;
  caption: string | null;
  sortOrder: number;
  image: {
    url: string;
    alt: string | null;
  };
}

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      // 1. Resize image
      let fileToUpload = file;
      try {
        fileToUpload = await resizeImage(file);
      } catch (error) {
        console.error("Resize error:", error);
      }

      // 2. Upload to R2
      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("folder", "gallery");

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");
      const media = await uploadRes.json();

      // 3. Add to Gallery
      const galleryRes = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageId: media.id,
          caption: "",
        }),
      });

      if (!galleryRes.ok) throw new Error("Failed to add to gallery");

      await fetchItems();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มรูปภาพ");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณต้องการลบรูปภาพนี้ออกจากแกลเลอรีใช่หรือไม่?")) return;

    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setItems(items.filter((item) => item.id !== id));
      } else {
        alert("ลบรูปภาพไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("เกิดข้อผิดพลาดในการลบ");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">จัดการแกลเลอรี</h1>
        <label className={`btn btn-primary gap-2 ${uploading ? "loading" : ""}`}>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
          {uploading ? "กำลังอัพโหลด..." : "เพิ่มรูปภาพ"}
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse"></div>
          ))
        ) : items.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            ยังไม่มีรูปภาพในแกลเลอรี
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <Image
                src={item.image.url}
                alt={item.image.alt || "Gallery Image"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="ลบรูปภาพ"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
