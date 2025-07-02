import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/db";
import {Product} from "@/models/Product";

export async function GET(request) {
    await connectDB();

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // gets the [id] from URL

    if (!id) {
        return NextResponse.json({ error: 'Product ID missing' }, { status: 400 });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ product });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
