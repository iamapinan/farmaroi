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
      // Reset input
      e.target.value = "";
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("คัดลอกลิ้งค์แล้ว");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">จัดการไฟล์</h1>
        <label className={`btn btn-primary gap-2 ${uploading ? "loading" : ""}`}>
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
          {uploading ? "กำลังอัพโหลด..." : "อัพโหลดไฟล์"}
        </label>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">ตัวอย่าง</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">ชื่อไฟล์</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">ประเภท</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">วันที่อัพโหลด</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    กำลังโหลดข้อมูล...
                  </td>
                </tr>
              ) : files.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    ไม่พบไฟล์ในระบบ
                  </td>
                </tr>
              ) : (
                files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        {file.type?.startsWith("image/") ? (
                          <Image
                            src={file.url}
                            alt={file.alt || "File"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-xs" title={file.alt || file.url}>
                        {file.alt || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">
                        {file.url.split("/").pop()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {file.type || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(file.createdAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => copyToClipboard(file.url)}
                        className="text-brand hover:text-brand-dark font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-brand/5 transition-colors"
                      >
                        คัดลอกลิ้งค์
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
