import { NextRequest, NextResponse } from 'next/server';
import { createContact } from '@/services/contactService';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, turnstileToken } = body;

    // Cloudflare Turnstile Verification
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'กรุณายืนยันตัวตน (Turnstile)' },
        { status: 400 }
      );
    }

    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: "0x4AAAAAACE_yRdPpY2gV-RyzCH-KkD1hmk",
        response: turnstileToken,
      }),
    });

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json(
        { error: 'การยืนยันตัวตนล้มเหลว กรุณาลองใหม่' },
        { status: 400 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    const contact = await createContact({
      name,
      email,
      phone: phone || undefined,
      message,
    });

    sendContactEmail({ name, email, phone, message }).catch((emailError) => {
      console.error('Failed to send email notification:', emailError);
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'ส่งข้อความสำเร็จ เราจะติดต่อกลับโดยเร็วที่สุด',
        data: contact 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    );
  }
}

