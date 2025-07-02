import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(request) {
  const auth = await requireAdmin(request);
  if (auth.status !== 200) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }
  // Example admin data
  return NextResponse.json({
    message: 'Welcome, admin!',
    stats: {
      users: 123,
      orders: 456,
      revenue: 7890
    }
  });
} 