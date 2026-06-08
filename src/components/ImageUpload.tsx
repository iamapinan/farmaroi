"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { resizeImage } from "@/lib/image-utils";
import ImageLibraryModal from "@/components/admin/ImageLibraryModal";

interface ImageUploadProps {
  currentImage?: { id: string; url: string; alt?: string | null } | null;
  onImageUploaded: (mediaId: string) => void;
  onUploadComplete?: (media: { id: string; url: string }) => void;
  folder?: string;
}

export default function ImageUpload({ currentImage, onImageUploaded, onUploadComplete, folder = "uploads" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);

  // Sync preview when currentImage changes (e.g. when editing item changes)
  useEffect(() => {
    setPreview(currentImage?.url || null);
  }, [currentImage]);

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

  const handleSelectFromLibrary = (media: { id: string; url: string }) => {
    setPreview(media.url);
    onImageUploaded(media.id);
    onUploadComplete?.({ id: media.id, url: media.url });
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">รูปภาพ</label>
      
      {preview && (
        <div className="relative aspect-video w-full max-w-md bg-gray-100 rounded-lg overflow-hidden border border-black/5">
          <Image
            src={preview}
            alt="Preview"
            fill
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <label className="btn btn-outline cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
          {uploading ? "กำลังอัพโหลด..." : preview ? "อัพโหลดรูปใหม่" : "อัพโหลดรูปภาพ"}
        </label>

        <button
          type="button"
          onClick={() => setShowLibrary(true)}
          disabled={uploading}
          className="btn btn-secondary"
        >
          เลือกจากคลังรูปภาพ
        </button>

        {preview && (
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onImageUploaded("");
            }}
            className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline px-2 py-1"
          >
            ลบรูปภาพ
          </button>
        )}
      </div>

      {showLibrary && (
        <ImageLibraryModal
          onClose={() => setShowLibrary(false)}
          onSelect={handleSelectFromLibrary}
        />
      )}
    </div>
  );
}


