import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.ADMIN_PASSWORD || 'muzamil2026';

    if (password === correctPassword) {
      // In production, set secure session cookie or return token
      return NextResponse.json({ success: true, authorized: true });
    }

    return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'Login error' }, { status: 500 });
  }
}
