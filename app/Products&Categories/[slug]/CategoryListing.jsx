"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/productCard";

export default function CategoryListing() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/get");
        if (res.ok) {
          const allProducts = await res.json();
          setProducts(
            allProducts.filter(
              (p) => p.category && p.category.toLowerCase() === slug.toLowerCase()
            )
          );
        } else {
          setProducts([]);
        }
      } catch (e) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-10 text-xl animate-pulse font-bold">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-28 px-4">
      <h1 className="text-3xl font-bold mb-6 capitalize">{slug} Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
} 