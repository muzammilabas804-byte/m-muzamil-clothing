import { NextRequest, NextResponse } from 'next/server';
import { getAllContactMessages } from '@/lib/db';

export async function GET(req: NextRequest) {
  const contacts = await getAllContactMessages();
  return NextResponse.json({ success: true, contacts });
}
