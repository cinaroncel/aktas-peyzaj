import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/sheets';

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in /api/products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}