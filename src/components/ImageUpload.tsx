"use client";

import { useState } from "react";
import Image from "next/image";
import { resizeImage } from "@/lib/image-utils";

interface ImageUploadProps {
  currentImage?: { id: string; url: string; alt?: string | null } | null;
  onImageUploaded: (mediaId: string) => void;
  onUploadComplete?: (media: { id: string; url: string }) => void;
  folder?: string;
}

export default function ImageUpload({ currentImage, onImageUploaded, onUploadComplete, folder = "uploads" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage?.url || null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    let fileToUpload = file;
    try {
      fileToUpload = await resizeImage(file);
    } catch (error) {
      console.error("Resize error:", error);
      // Continue with original file if resize fails
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const media = await res.json();
        setPreview(media.url);
        onImageUploaded(media.id);
        onUploadComplete?.({ id: media.id, url: media.url });
      } else {
        alert("อัพโหลดรูปภาพล้มเหลว");
      }
    } catch {
      alert("เกิดข้อผิดพลาดในการอัพโหลด");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">รูปภาพ</label>
      
      {preview && (
        <div className="relative aspect-video w-full max-w-md bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <label className="btn btn-outline cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
          {uploading ? "กำลังอัพโหลด..." : preview ? "เปลี่ยนรูปภาพ" : "เลือกรูปภาพ"}
        </label>
        {preview && (
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onImageUploaded("");
            }}
            className="text-sm text-red-600 hover:underline"
          >
            ลบรูปภาพ
          </button>
        )}
      </div>
    </div>
  );
}

