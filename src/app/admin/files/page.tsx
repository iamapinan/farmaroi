"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { resizeImage } from "@/lib/image-utils";

interface MediaFile {
  id: string;
  url: string;
  alt: string | null;
  type: string | null;
  createdAt: string;
}

export default function FilesPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/admin/files");
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      }
    } catch (error) {
      console.error("Failed to fetch files:", error);
    } finally {
      setLoading(false);
    }
  };

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
    formData.append("folder", "uploads");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        await fetchFiles();
      } else {
        alert("อัพโหลดไฟล์ล้มเหลว");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("เกิดข้อผิดพลาดในการอัพโหลด");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("คุณต้องการลบไฟล์นี้ถาวรใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนคืนได้ และจะถอนรูปภาพนี้ออกจากบทความหรือเมนูทั้งหมดด้วย")) return;

    try {
      const res = await fetch(`/api/admin/files/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFiles(files.filter(file => file.id !== id));
      } else {
        alert("ลบไฟล์ล้มเหลว");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("เกิดข้อผิดพลาดในการลบไฟล์");
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("คัดลอกลิ้งค์แล้ว");
  };

  const filteredFiles = files.filter(file => {
    const filename = file.url.split("/").pop() || "";
    const alt = file.alt || "";
    return (
      filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container-site py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="section-title">คลังรูปภาพและไฟล์</h1>
          <p className="text-sm text-gray-500 mt-1">จัดการไฟล์สื่อสารและรูปภาพที่ใช้บนเว็บไซต์</p>
        </div>
        <label className={`btn btn-primary gap-2 cursor-pointer ${uploading ? "opacity-70 cursor-not-allowed" : ""}`}>
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
            accept="image/*"
          />
          {uploading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              กำลังอัพโหลด...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              อัพโหลดรูปภาพ
            </>
          )}
        </label>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md bg-white rounded-xl shadow-sm border border-black/5">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="ค้นหาชื่อไฟล์ หรือ คำอธิบายภาพ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-transparent border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
        />
      </div>

      {/* Main Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-medium">กำลังโหลดไฟล์ทั้งหมด...</p>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/5 p-12 text-center text-gray-500 shadow-sm">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-bold text-gray-700 mb-1">ไม่พบไฟล์ในคลัง</h3>
          <p className="text-sm text-gray-400">คลิกปุ่มอัพโหลดรูปภาพด้านบนเพื่อเพิ่มไฟล์</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredFiles.map((file) => (
            <div key={file.id} className="group bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              {/* Thumbnail Container */}
              <div className="relative aspect-square w-full bg-gray-50 overflow-hidden border-b border-black/5">
                {file.type?.startsWith("image/") ? (
                  <Image
                    src={file.url}
                    alt={file.alt || "Uploaded file"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
                {/* Delete button (displays on hover) */}
                <button
                  onClick={() => handleDelete(file.id)}
                  className="absolute top-2 right-2 p-1.5 bg-red-600/90 text-white rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-700 hover:scale-105 transition-all shadow-md"
                  title="ลบไฟล์"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Info & Actions */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xs font-bold text-gray-800 line-clamp-1" title={file.alt || "Untitled"}>
                    {file.alt || "Untitled"}
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-0.5 truncate" title={file.url.split("/").pop()}>
                    {file.url.split("/").pop()}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {new Date(file.createdAt).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(file.url)}
                    className="w-full text-center text-xs font-semibold text-brand hover:text-brand-dark py-1.5 px-3 bg-brand/5 hover:bg-brand/10 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    คัดลอกลิ้งค์
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
