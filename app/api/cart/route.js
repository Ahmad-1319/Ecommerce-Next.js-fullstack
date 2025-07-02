import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
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

// ✅ GET: Get cart
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
    const cart = await Cart.findOne({ userId });
    
    return NextResponse.json({
      items: cart?.items || [],
      total: cart?.total || 0
    });
  } catch (error) {
    console.error('Cart fetch error:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ✅ POST: Add to cart
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
    const { productId, quantity, price, title, image } = body;

    if (!productId || !quantity || !price || !title || !image) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await connectDB();
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity, price, title, image }],
        total: price * quantity,
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price, title, image });
      }

      cart.total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    await cart.save();
    return NextResponse.json({ cart, message: "Added to Cart Successfully" });
  } catch (error) {
    console.error('Cart update error:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update quantity
export async function PUT(request) {
  try {
    await connectDB();
    const userId = getUserIdFromToken(request);

    if (!userId) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }

    const { productId, quantity } = await request.json();

    const cart = await Cart.findOne({ userId });
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Cart PUT error:', error);
    return NextResponse.json({ message: "Error updating cart", error: error.message }, { status: 500 });
  }
}

// ✅ DELETE: Remove item
export async function DELETE(request) {
  try {
    await connectDB();
    const userId = getUserIdFromToken(request);

    if (!userId) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 });
    }

    const { productId } = await request.json();

    const cart = await Cart.findOne({ userId });
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Cart DELETE error:', error);
    return NextResponse.json({ message: "Error removing from cart", error: error.message }, { status: 500 });
  }
}
