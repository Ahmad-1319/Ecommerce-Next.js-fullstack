import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { Product } from '@/models/Product';
import { connectDB } from '@/lib/db';

export async function GET(request) {
  const auth = await requireAdmin(request);
  if (auth.status !== 200) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }
  await connectDB();
  const products = await Product.find({});
  return NextResponse.json({ products });
}

export async function POST(request) {
  const auth = await requireAdmin(request);
  if (auth.status !== 200) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }
  const body = await request.json();
  await connectDB();
  const product = await Product.create(body);
  return NextResponse.json({ message: 'Product added', product });
}

export async function PATCH(request) {
  const auth = await requireAdmin(request);
  if (auth.status !== 200) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }
  const { _id, ...update } = await request.json();
  await connectDB();
  const product = await Product.findByIdAndUpdate(_id, update, { new: true });
  if (!product) return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  return NextResponse.json({ message: 'Product updated', product });
}

export async function DELETE(request) {
  const auth = await requireAdmin(request);
  if (auth.status !== 200) {
    return NextResponse.json({ message: auth.message }, { status: auth.status });
  }
  const { _id } = await request.json();
  await connectDB();
  const product = await Product.findByIdAndDelete(_id);
  if (!product) return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  return NextResponse.json({ message: 'Product deleted' });
} 