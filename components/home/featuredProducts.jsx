"use client";
import { useEffect, useState } from "react";
import ProductCard from "../productCard"

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products/get");
        if (res.ok) {
          const products = await res.json();
          setFeaturedProducts(products.filter((elem) => elem.featured));
        } else {
          setFeaturedProducts([]);
        }
      } catch (e) {
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading featured products...</div>;
  }

  return (
    <>
         <h1 className='text-4xl sm:text-5xl text-center'>Featured Products</h1>
        <p className='my-5 text-slate-600 text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam harum atque consequuntur?</p>
        <div className='grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-6  my-5 gap-3'>
  
          {featuredProducts.map((p , index)=>{
            return   <ProductCard key={index} {...p}/> 
          })}
       
        </div>
      
    </>
  )
}

export default FeaturedProducts