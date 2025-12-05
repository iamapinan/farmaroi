"use client";

import { useEffect, useState } from "react";

interface OpeningHour {
  weekday: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

interface Location {
  id: string;
  name: string;
  address: string;
  phone?: string;
  mapUrl?: string;
  openingHours: OpeningHour[];
}

const WEEKDAYS = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"];

export default function AdminLocationsPage() {
  const [items, setItems] = useState<Location[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/locations");
    if (res.ok) setItems(await res.json());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const openingHours: OpeningHour[] = [];
    for (let i = 0; i < 7; i++) {
      const isClosed = formData.get(`day${i}_closed`) === "on";
      // Map UI index (0=Mon, 1=Tue...) to DB weekday (1=Mon, 2=Tue... 0=Sun)
      const weekday = (i + 1) % 7;
      
      openingHours.push({
        weekday,
        openTime: isClosed ? "00:00" : (formData.get(`day${i}_open`) as string),
        closeTime: isClosed ? "00:00" : (formData.get(`day${i}_close`) as string),
        isClosed,
      });
    }

    const data = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      mapUrl: formData.get("mapUrl") as string,
      openingHours,
    };

    const url = editingItem ? `/api/admin/locations/${editingItem.id}` : "/api/admin/locations";
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
    if (!confirm("ต้องการลบสาขานี้?")) return;
    const res = await fetch(`/api/admin/locations/${id}`, { method: "DELETE" });
    if (res.ok) await fetchItems();
  };

  return (
    <div className="container-site py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="section-title">จัดการสาขา</h1>
          <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="btn btn-primary">เพิ่มสาขา</button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-black/10 p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingItem(item); setShowModal(true); }} className="text-blue-600 hover:underline text-sm">แก้ไข</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline text-sm">ลบ</button>
                </div>
              </div>
              <p className="text-sm text-foreground/70 mb-2">{item.address}</p>
              {item.phone && <p className="text-sm text-foreground/70 mb-2">โทร: {item.phone}</p>}
              <div className="mt-4 text-xs">
                <p className="font-medium mb-1">เวลาทำการ:</p>
                {/* Display sorted by Mon (1) -> Sun (0) */}
                {[1, 2, 3, 4, 5, 6, 0].map((dayCode) => {
                  const hour = item.openingHours.find(h => h.weekday === dayCode);
                  if (!hour) return null;
                  return (
                    <div key={dayCode} className="flex justify-between">
                      <span>{WEEKDAYS[(dayCode + 6) % 7]}</span>
                      <span>{hour.isClosed ? "ปิดทำการ" : `${hour.openTime} - ${hour.closeTime}`}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">{editingItem ? "แก้ไขสาขา" : "เพิ่มสาขาใหม่"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">ชื่อสาขา</label>
                <input type="text" name="name" defaultValue={editingItem?.name} required className="w-full px-3 py-2 border border-black/10 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ที่อยู่</label>
                <textarea name="address" defaultValue={editingItem?.address} rows={2} required className="w-full px-3 py-2 border border-black/10 rounded-lg"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">เบอร์โทร</label>
                  <input type="text" name="phone" defaultValue={editingItem?.phone} className="w-full px-3 py-2 border border-black/10 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ลิงก์แผนที่</label>
                  <input type="text" name="mapUrl" defaultValue={editingItem?.mapUrl} className="w-full px-3 py-2 border border-black/10 rounded-lg" />
                </div>
              </div>
              
              <div className="border-t border-black/10 pt-4">
                <p className="text-sm font-medium mb-3">เวลาทำการ</p>
                <div className="space-y-2">
                  {WEEKDAYS.map((day, idx) => {
                    // Map UI index (0=Mon...) to DB weekday (1=Mon... 0=Sun)
                    const dbWeekday = (idx + 1) % 7;
                    const hour = editingItem?.openingHours.find(h => h.weekday === dbWeekday);
                    return (
                      <div key={idx} className="grid grid-cols-[120px_1fr_1fr_100px] gap-2 items-center">
                        <span className="text-sm">{day}</span>
                        <input type="time" name={`day${idx}_open`} defaultValue={hour?.openTime || "09:00"} className="px-2 py-1 border border-black/10 rounded text-sm" />
                        <input type="time" name={`day${idx}_close`} defaultValue={hour?.closeTime || "18:00"} className="px-2 py-1 border border-black/10 rounded text-sm" />
                        <label className="flex items-center gap-1 text-xs">
                          <input type="checkbox" name={`day${idx}_closed`} defaultChecked={hour?.isClosed} className="rounded" />
                          <span>ปิด</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
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

