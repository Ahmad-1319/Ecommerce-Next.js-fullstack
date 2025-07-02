import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import Order from '@/models/Order';
import { connectDB } from '@/lib/db';


export async function GET(request) {
  const auth = await requireAdmin(request);
  if (auth.status !== 200) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }
  await connectDB();
  // Populate user info for each order
  const orders = await Order.find({}).populate('userId', 'username email');
  return NextResponse.json({ orders });
}

export async function PATCH(request) {
  const auth = await requireAdmin(request);
  if (auth.status !== 200) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }
  const { orderId, status } = await request.json();
  if (!orderId || !status) {
    return NextResponse.json({ message: 'Order ID and status are required' }, { status: 400 });
  }
  await connectDB();
  const order = await Order.findById(orderId);
  if (!order) {
    return NextResponse.json({ message: 'Order not found' }, { status: 404 });
  }
  order.status = status;
  await order.save();
  return NextResponse.json({ message: 'Order status updated', order });
} 