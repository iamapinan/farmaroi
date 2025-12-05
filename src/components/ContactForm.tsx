"use client";

import { useState } from "react";
import Turnstile from "react-turnstile";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (!turnstileToken) {
      setMessage({ type: "error", text: "กรุณายืนยันตัวตน (Turnstile)" });
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      turnstileToken,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        setMessage({ type: "error", text: result.error || "เกิดข้อผิดพลาด" });
        return;
      }

      const result = await response.json();
      setMessage({ type: "success", text: result.message || "ส่งข้อความสำเร็จ เราจะติดต่อกลับโดยเร็วที่สุด" });
      form.reset();
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setMessage({ type: "error", text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="bg-brown p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">ส่งข้อความถึงเรา</h2>
        <p className="text-white/90">กรอกฟอร์มด้านล่าง เราจะติดต่อกลับโดยเร็ว</p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {message && (
          <div className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
            <div className="flex items-center gap-2">
              {message.type === "success" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          </div>
        )}
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            ชื่อ-นามสกุล <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isSubmitting}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="ชื่อของคุณ"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            อีเมล <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isSubmitting}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="email@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            เบอร์โทรศัพท์
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            disabled={isSubmitting}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="08X-XXX-XXXX"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            ข้อความ <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            disabled={isSubmitting}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="ข้อความของคุณ..."
          />
        </div>

        {/* Cloudflare Turnstile */}
        <div className="flex justify-start">
          <Turnstile
            sitekey="0x4AAAAAACE_yZQV12tdok_H"
            onVerify={(token) => setTurnstileToken(token)}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn btn-primary w-full justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังส่ง...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              ส่งข้อความ
            </>
          )}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          เราจะติดต่อกลับภายใน 24 ชั่วโมง
        </p>
      </form>
    </div>
  );
}

