import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import jwt from "jsonwebtoken";

// Helper function to verify token and get userId
const getUserIdFromToken = (request) => {
  try {
    const token = request.headers.get('auth-token')?.replace('Bearer ', '');
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

// POST: Create new order
export async function POST(request) {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { items, address, paymentMethod } = body;

    if (!items || !address || !paymentMethod) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Calculate subtotal and COD fee
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const codFee = paymentMethod === "cod" ? 2 : 0;
    const total = subtotal + codFee;

    // Create new order
    const order = new Order({
      userId,
      items,
      address,
      paymentMethod,
      subtotal,
      codFee,
      total,
      status: "pending"
    });

    await order.save();

    // Clear the user's cart
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [], totalAmount: 0 } }
    );

    return NextResponse.json({
      message: "Order created successfully",
      orderId: order._id
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Get user's orders
export async function GET(request) {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 