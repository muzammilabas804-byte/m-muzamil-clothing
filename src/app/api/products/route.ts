import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search')?.toLowerCase();

  let filtered = [...PRODUCTS];

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.fabric.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    products: filtered,
  });
}
