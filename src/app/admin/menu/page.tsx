"use client";

import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";

interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  spicyLevel: number;
  isSignature: boolean;
  isActive: boolean;
  categoryId: string;
  imageId?: string;
  category: { id: string; name: string };
  image?: { id: string; url: string; alt?: string | null } | null;
  menuItems?: MenuLocation[];
}

interface MenuLocation {
  locationId: string;
  price: number | null;
  isAvailable: boolean;
  location?: { id: string; name: string };
}

interface Category {
  id: string;
  name: string;
}

interface Location {
  id: string;
  name: string;
}

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageId, setImageId] = useState<string>("");
  
  // Local state for location settings in modal
  const [locationSettings, setLocationSettings] = useState<Map<string, { selected: boolean; price: string }>>(new Map());

  useEffect(() => {
    fetchItems();
    fetchCategories();
    fetchLocations();
  }, []);

  useEffect(() => {
    if (editingItem) {
      setImageId(editingItem.image?.id || editingItem.imageId || "");
      
      // Initialize location settings from existing item
      const map = new Map();
      // First populate with all available locations (default unchecked)
      locations.forEach(loc => {
        map.set(loc.id, { selected: false, price: "" });
      });
      
      // Then override with existing menu locations
      if (editingItem.menuItems) {
        editingItem.menuItems.forEach((ml: MenuLocation) => {
           map.set(ml.locationId, { 
             selected: true, 
             price: ml.price ? ml.price.toString() : "" 
           });
        });
      }
      setLocationSettings(map);
    } else {
      setImageId("");
      // Reset location settings for new item
       const map = new Map();
      locations.forEach(loc => {
        map.set(loc.id, { selected: true, price: "" }); // Default to all selected for new items
      });
      setLocationSettings(map);
    }
  }, [editingItem, locations]);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/menu");
    if (res.ok) setItems(await res.json());
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    if (res.ok) setCategories(await res.json());
  };

  const fetchLocations = async () => {
    const res = await fetch("/api/admin/locations");
    if (res.ok) setLocations(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Prepare locations data
    const selectedLocationsData: any[] = [];
    locationSettings.forEach((val, key) => {
        if (val.selected) {
            selectedLocationsData.push({
                locationId: key,
                price: val.price ? parseFloat(val.price) : null,
                isAvailable: true
            });
        }
    });

    const data = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      spicyLevel: parseInt(formData.get("spicyLevel") as string),
      isSignature: formData.get("isSignature") === "on",
      isActive: formData.get("isActive") === "on",
      categoryId: formData.get("categoryId") as string,
      imageId: imageId || null,
      locations: selectedLocationsData
    };

    const url = editingItem ? `/api/admin/menu/${editingItem.id}` : "/api/admin/menu";
    const method = editingItem ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });

    if (res.ok) {
      await fetchItems();
      setShowModal(false);
      setEditingItem(null);
      setImageId("");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ต้องการลบรายการนี้?")) return;
    const res = await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
    if (res.ok) await fetchItems();
  };

  const handleLocationToggle = (locId: string) => {
      const newMap = new Map(locationSettings);
      const current = newMap.get(locId) || { selected: false, price: "" };
      newMap.set(locId, { ...current, selected: !current.selected });
      setLocationSettings(newMap);
  };

  const handleLocationPriceChange = (locId: string, price: string) => {
      const newMap = new Map(locationSettings);
      const current = newMap.get(locId) || { selected: false, price: "" };
      newMap.set(locId, { ...current, price });
      setLocationSettings(newMap);
  };

  return (
    <div className="container-site py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="section-title">จัดการเมนูอาหาร</h1>
          <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="btn btn-primary">เพิ่มเมนู</button>
        </div>

        <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-black/10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold">ชื่อเมนู</th>
                <th className="px-4 py-3 text-left text-sm font-bold">หมวดหมู่</th>
                <th className="px-4 py-3 text-right text-sm font-bold">ราคา (เริ่มต้น)</th>
                <th className="px-4 py-3 text-center text-sm font-bold">สาขาที่ขาย</th>
                <th className="px-4 py-3 text-center text-sm font-bold">สถานะ</th>
                <th className="px-4 py-3 text-center text-sm font-bold">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{item.name}</div>
                    {item.isSignature && <span className="text-xs text-orange-600">เมนูแนะนำ</span>}
                  </td>
                  <td className="px-4 py-3 text-sm">{item.category.name}</td>
                  <td className="px-4 py-3 text-right text-sm">{item.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-sm">
                      {item.menuItems && item.menuItems.length > 0 ? (
                          <span className="text-green-600 font-medium">{item.menuItems.length} สาขา</span>
                      ) : (
                          <span className="text-gray-400">ไม่ได้ระบุ</span>
                      )}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">{editingItem ? "แก้ไขเมนู" : "เพิ่มเมนูใหม่"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Basic Info */}
                <div className="space-y-4">
                    <ImageUpload 
                        folder="menu"
                        currentImage={editingItem?.image}
                        onImageUploaded={setImageId}
                    />
                    <div>
                        <label className="block text-sm font-medium mb-1">ชื่อเมนู</label>
                        <input type="text" name="name" defaultValue={editingItem?.name} required className="w-full px-3 py-2 border border-black/10 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug</label>
                        <input type="text" name="slug" defaultValue={editingItem?.slug} required className="w-full px-3 py-2 border border-black/10 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">หมวดหมู่</label>
                        <select name="categoryId" defaultValue={editingItem?.categoryId} required className="w-full px-3 py-2 border border-black/10 rounded-lg">
                        <option value="">เลือกหมวดหมู่</option>
                        {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">ราคาเริ่มต้น (บาท)</label>
                        <input type="number" name="price" defaultValue={editingItem?.price} step="0.01" required className="w-full px-3 py-2 border border-black/10 rounded-lg" />
                    </div>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                        <input type="checkbox" name="isSignature" defaultChecked={editingItem?.isSignature} className="rounded" />
                        <span className="text-sm">เมนูแนะนำ</span>
                        </label>
                        <label className="flex items-center gap-2">
                        <input type="checkbox" name="isActive" defaultChecked={editingItem?.isActive ?? true} className="rounded" />
                        <span className="text-sm">เปิดใช้งาน</span>
                        </label>
                    </div>
                </div>

                {/* Right Column: Details & Locations */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">รายละเอียด</label>
                        <textarea name="description" defaultValue={editingItem?.description} rows={3} className="w-full px-3 py-2 border border-black/10 rounded-lg"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">ระดับความเผ็ด (0-5)</label>
                        <input type="number" name="spicyLevel" defaultValue={editingItem?.spicyLevel} min="0" max="5" className="w-full px-3 py-2 border border-black/10 rounded-lg" />
                    </div>

                    <div className="border-t border-black/10 pt-4 mt-4">
                        <h3 className="font-medium mb-3 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            ความพร้อมให้บริการ & ราคาแยกสาขา
                        </h3>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                            {locations.length === 0 ? (
                                <p className="text-sm text-gray-500">กรุณาเพิ่มสาขาในหน้า Location ก่อน</p>
                            ) : (
                                locations.map(loc => {
                                    const settings = locationSettings.get(loc.id) || { selected: false, price: "" };
                                    return (
                                        <div key={loc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-black/5">
                                            <label className="flex items-center gap-2 cursor-pointer flex-1">
                                                <input 
                                                    type="checkbox" 
                                                    checked={settings.selected} 
                                                    onChange={() => handleLocationToggle(loc.id)}
                                                    className="rounded border-gray-300 text-brand focus:ring-brand" 
                                                />
                                                <span className="text-sm">{loc.name}</span>
                                            </label>
                                            {settings.selected && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-500">ราคา:</span>
                                                    <input 
                                                        type="number" 
                                                        placeholder="ใช้ราคาหลัก"
                                                        value={settings.price}
                                                        onChange={(e) => handleLocationPriceChange(loc.id, e.target.value)}
                                                        className="w-24 px-2 py-1 text-sm border border-black/10 rounded bg-white"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-black/10">
                <button type="submit" disabled={loading} className="btn btn-primary flex-1">{loading ? "กำลังบันทึก..." : "บันทึก"}</button>
                <button type="button" onClick={() => { setShowModal(false); setImageId(""); }} className="btn btn-outline flex-1">ยกเลิก</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
