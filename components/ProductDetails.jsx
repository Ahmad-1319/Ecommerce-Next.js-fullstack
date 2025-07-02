"use client";

import { useCart } from '@/contexts/CartContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ProductDetails({ slug }) {
  // All hooks at the top!
  const context = useCart();
  const { addToCart, fetchCart } = context;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'John Doe', text: 'Great product! Really love the quality.', rating: 5, date: '2025-05-20' },
    { id: 2, user: 'Jane Smith', text: 'Good but could be improved.', rating: 3, date: '2025-05-18' },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/products/product-details/${slug}`);
        const data = await res.json();
        setProduct(data.product);
        // Set the first image as default if images array exists, else fallback to single image
        if (data.product.images && data.product.images.length > 0) {
          setSelectedImage(data.product.images[0]);
        } else if (data.product.image) {
          setSelectedImage(data.product.image);
        } else {
          setSelectedImage(null);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    }
    fetchData();
  }, [slug]);

  // Handle add to cart
  const handleCart = async () => {
    if (!product) return;
    addToCart(product._id, product.price, product.title, product.image || product.images[0]);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="text-center text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  const { title, description, price, category } = product;
  // Use images array if available, else fallback to single image
  const images = product.images && product.images.length > 0
    ? product.images
    : product.image
    ? [product.image]
    : [];

  // Calculate average rating
  const averageRating = comments.length > 0
    ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
    : 0;

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() && userRating > 0) {
      const newComment = {
        id: comments.length + 1,
        user: 'Anonymous User', // Replace with actual user data from auth
        text: comment,
        rating: userRating,
        date: new Date().toISOString().split('T')[0],
      };
      setComments([newComment, ...comments]);
      setComment('');
      setUserRating(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-24 sm:py-24 md:py-24 lg:py-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Image
                src={selectedImage || '/fallback-image.png'}
                alt={title}
                width={500}
                height={500}
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-contain transition-transform duration-500 ease-in-out transform hover:scale-105"
                onError={(e) => { e.target.src = '/fallback-image.png'; }}
                priority
              />
              <div className="flex gap-2 p-4 overflow-x-auto">
                {images.map((img, index) => (
                  <Image
                    key={index}
                    src={img || '/fallback-image.png'}
                    alt={`Thumbnail ${index + 1} for ${title}`}
                    width={80}
                    height={80}
                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain rounded-lg cursor-pointer border-2 ${selectedImage === img ? 'border-indigo-600' : 'border-transparent'} hover:border-indigo-400 transition-all duration-300`}
                    onClick={() => setSelectedImage(img)}
                    onError={(e) => { e.target.src = '/fallback-image.png'; }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 transition-all duration-300">
                {title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                {description}
              </p>
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900">
                  ${price}
                </span>
                <span className="text-base sm:text-lg md:text-xl text-red-400 line-through">
                  ${(price * 1.25).toFixed(2)}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-red-500">
                  {(100 - (price / (price * 1.25)) * 100).toFixed(0)}% OFF
                </span>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base md:text-lg text-gray-600">
                  <p>
                    <strong>Category:</strong> {category}
                  </p>
              
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                <button
                  className="w-full sm:w-auto bg-slate-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md"
                 onClick={handleCart}>
                  Add to Cart
                </button>
                <button
                  className="w-full sm:w-auto bg-gray-200 text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md"
                >
                  Add to Wishlist
                </button>
              </div>

              {/* Ratings Section */}
              <div className="mb-6">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3">
                  Ratings & Reviews
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${
                          star <= averageRating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm sm:text-base md:text-lg text-gray-600">
                    {averageRating} / 5 ({comments.length} reviews)
                  </span>
                </div>

                {/* User Rating Input */}
                <div className="mb-4">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-2">
                    Rate this product
                  </h3>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer ${
                          star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-500 transition-colors duration-200`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        onClick={() => setUserRating(star)}
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3">
                  Customer Comments
                </h2>
                {/* Comment Input */}
                <div className="mb-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-300 text-sm sm:text-base"
                    rows="4"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!comment.trim() || userRating === 0}
                  >
                    Submit Review
                  </button>
                </div>
                {/* Comment List */}
                <div className="space-y-4">
                  {comments.map((c) => (
                    <div key={c.id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800">{c.user}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
                                star <= c.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{c.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}