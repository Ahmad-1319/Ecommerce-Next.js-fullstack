import { NextResponse } from 'next/server';
import User from '@/models/User';
import { connectDB } from '@/lib/db';
import jwt from 'jsonwebtoken';

// Helper to verify JWT and check admin
const verifyAdmin = async (request) => {
  const token = request.headers.get('auth-token');
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return null;
    return decoded;
  } catch {
    return null;
  }
};

export async function GET(request) {
  await connectDB();
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const users = await User.find({}, '-password').lean();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 });
  }
} 