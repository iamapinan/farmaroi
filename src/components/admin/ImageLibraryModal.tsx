"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface MediaFile {
  id: string;
  url: string;
  alt: string | null;
  type: string | null;
  createdAt: string;
}

interface ImageLibraryModalProps {
  onClose: () => void;
  onSelect: (media: { id: string; url: string; alt?: string | null }) => void;
}

export default function ImageLibraryModal({ onClose, onSelect }: ImageLibraryModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/admin/files");
      if (res.ok) {
        const data = await res.json();
        // Filter to only show images
        const imageFiles = data.filter((file: MediaFile) => 
          file.type?.startsWith("image/") || 
          file.url.match(/\.(jpg|jpeg|png|gif|webp|svg)/i)
        );
        setFiles(imageFiles);
      }
    } catch (error) {
      console.error("Failed to fetch files for library:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFiles = files.filter(file => {
    const filename = file.url.split("/").pop() || "";
    const alt = file.alt || "";
    return (
      filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleConfirm = () => {
    if (selectedFile) {
      onSelect({
        id: selectedFile.id,
        url: selectedFile.url,
        alt: selectedFile.alt,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">เลือกรูปภาพจากคลัง</h3>
            <p className="text-xs text-gray-500">เลือกรูปภาพที่เคยอัพโหลดไว้แล้วในระบบ</p>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="py-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="ค้นหาชื่อไฟล์ หรือคำอธิบายภาพ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto pr-1 min-h-[350px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-gray-400">
              <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm">กำลังโหลดรูปภาพจากคลัง...</p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[350px] text-gray-400">
              <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium">ไม่พบรูปภาพ</p>
              <p className="text-xs text-gray-500 mt-1">ลองใช้คำค้นหาอื่น หรืออัพโหลดรูปภาพใหม่</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {filteredFiles.map((file) => {
                const isSelected = selectedFile?.id === file.id;
                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`group relative aspect-square bg-gray-50 rounded-xl overflow-hidden cursor-pointer border-2 transition-all hover:scale-[1.02] ${
                      isSelected 
                        ? "border-brand shadow-md shadow-brand/10 ring-2 ring-brand/20" 
                        : "border-black/5 hover:border-black/20"
                    }`}
                  >
                    <Image
                      src={file.url}
                      alt={file.alt || "Media"}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                      className="object-cover"
                    />
                    
                    {/* Selection Overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-brand/10 flex items-center justify-center">
                        <div className="bg-brand text-white rounded-full p-1.5 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Image Name Tooltip on Hover */}
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white p-1 text-[10px] truncate opacity-0 group-hover:opacity-100 transition-opacity">
                      {file.alt || file.url.split("/").pop()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-4 mt-4 border-t border-black/5">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline flex-1 py-2"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedFile}
            className="btn btn-primary flex-1 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ยืนยันการเลือก
          </button>
        </div>
      </div>
    </div>
  );
}
