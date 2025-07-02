import { Product } from "@/models/Product";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB()
        const {title,description,price,images,category, inStock, featured}= await request.json()
    
    const newProduct= await Product.create({
        title,
        description,
        price,
        images,
        category,
        inStock,
        featured,
    })
    return NextResponse.json({
        status:1,
        message:"Product added Successfully",
        product:newProduct
    })
    } catch (error) {
        console.log(error.message)
        
    }


 }

