import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
});

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, phone, message } = data;

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@farmaroi.net',
    to: process.env.EMAIL_TO || 'farm.aroicafe@gmail.com',
    subject: `ฟอร์มติดต่อจาก ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B4513; border-bottom: 2px solid #D2691E; padding-bottom: 10px;">
          ข้อความติดต่อจากเว็บไซต์ฟาร์มอร่อย
        </h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>ชื่อ:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>อีเมล:</strong> ${email}</p>
          ${phone ? `<p style="margin: 10px 0;"><strong>เบอร์โทร:</strong> ${phone}</p>` : ''}
        </div>

        <div style="margin: 20px 0;">
          <strong>ข้อความ:</strong>
          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #D2691E; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        
        <p style="color: #666; font-size: 12px;">
          ข้อความนี้ถูกส่งจากฟอร์มติดต่อบนเว็บไซต์ farmaroi.net<br>
          วันที่: ${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
}

