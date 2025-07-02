// 1. Dummy array of products
// 2. Return as JSON response
// 3. Use GET request

import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

export async function GET() {
    await connectDB();
    const products = await Product.find({});
    return Response.json(products);
}
  