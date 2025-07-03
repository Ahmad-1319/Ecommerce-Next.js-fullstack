"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Star, ShoppingCart, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-toastify";
import ProductCard from "@/components/productCard";

const categories = [
  { id: "electronics", name: "Electronics", },
  { id: "clothing", name: "Clothing", },
  { id: "books", name: "Books", },
  { id: "home", name: "Home & Garden", },
  { id: "sports", name: "Sports", },
  { id: "beauty", name: "Beauty", },
  { id: "toys", name: "Toys", },
  { id: "automotive", name: "Automotive", },
];

export default function CategoriesPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  // Get category from URL on page load
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(product => {
        if (!product.category) return false;
        const productCategory = product.category.toLowerCase();
        const selectedCat = selectedCategory.toLowerCase();
        return productCategory === selectedCat || productCategory.includes(selectedCat);
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products/get");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Show all products initially
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, product.price, product.title, product.images[0]);
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
          <p className="text-gray-600">Browse products by category</p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === "" 
                  ? "bg-black text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  selectedCategory === category.id 
                    ? "bg-black text-white" 
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} products found
            {selectedCategory && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No products found in this category</p>
            {selectedCategory && (
              <p className="text-gray-400 text-sm mt-2">
                Available categories: {products.map(p => p.category).filter((c, i, arr) => arr.indexOf(c) === i).join(", ")}
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product._id || index} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 