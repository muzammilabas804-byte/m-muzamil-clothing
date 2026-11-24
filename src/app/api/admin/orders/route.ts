import { NextRequest, NextResponse } from 'next/server';
import { getAllGiftOrdersAdmin } from '@/lib/db';

export async function GET(req: NextRequest) {
  // Gift messages are masked and kept strictly secret from admin
  const orders = await getAllGiftOrdersAdmin();
  return NextResponse.json({ success: true, orders });
}
