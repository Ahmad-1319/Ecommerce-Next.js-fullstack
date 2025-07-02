'use client'
import { FiShoppingCart } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import Image from 'next/image';



export default function ProductCard({ title, price, image, _id ,images}) {
  const context=useCart()
  const {addToCart , fetchCart} = context
  const handleCart= async()=>{
    const res = await fetch(`/api/products/product-details/${_id}`);
    const data = await res.json();
    
    
    addToCart(data.product._id,data.product.price,data.product.title,data.product.image||data.product.images[0])
    
  }
 
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 relative cursor-pointer">

      {/* Image Section */}
      <div className="relative w-full h-52 overflow-hidden">
        <Link href={`/products/product-details/${_id}`}>
          <Image
            src={image || images[0]}
            alt={title}
            width={400}
            height={400}
            className="w-full h-auto object-cover rounded-t-lg"
            // onError={(e) => { e.target.src = '/fallback-image.png'; }}
            // priority
          />
        </Link>
        <Badge variant="destructive" className="absolute top-2 left-2">Sale</Badge>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col  min-h-[160px] gap-1">
        <h2 
          className="text-md font-semibold text-gray-800  truncate w-full"
          title={title}
        >
          {title}
        </h2>

        {/* Price Section */}
        <p className="text-lg font-bold text-gray-800 mt-2">${price}</p>

        {/* Action Button */}
        <Button variant="outline" className="cursor-pointer shadow-xs my-3" onClick={handleCart} >
          <FiShoppingCart className="text-xl " />
          <span  >Add to Cart</span>
        </Button>
      </div>
    </div>
  );
}
