import { NextRequest, NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, email, phone number, and message are required.' },
        { status: 400 }
      );
    }

    // Save to database (Supabase or local JSON fallback)
    const saved = await saveContactMessage({
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().slice(0, 120),
      phone: String(phone).trim().slice(0, 30),
      subject: String(subject || 'General Inquiry').trim().slice(0, 150),
      message: String(message).trim().slice(0, 3000),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. The M Muzamil team will contact you shortly.',
      id: saved.id,
    });
  } catch (err: any) {
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { error: 'Failed to submit contact message. Please try again or message directly on WhatsApp.' },
      { status: 500 }
    );
  }
}
