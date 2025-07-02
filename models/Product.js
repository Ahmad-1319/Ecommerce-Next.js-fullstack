import mongoose from "mongoose";
// models/Product.js


const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // multiple images
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    inStock: {
      type: Number,
      default: 0,
    },
   featured:{
      type: Boolean,
      default: false,
      
    },
})

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
