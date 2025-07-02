'use client'
import { useEffect, useState } from 'react';

const Slider = () => {
  const sliderImages = [
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://png.pngtree.com/background/20231030/original/pngtree-illustrated-rendering-of-online-shopping-technology-with-ecommerce-add-to-cart-picture-image_5809979.jpg',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  return (
    <div className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[90vh] overflow-hidden">
      {sliderImages.map((src, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-20" />

      {/* Centered Content */}
      <div className="absolute inset-0 z-30 flex items-center justify-center text-white text-center px-4">
        <div className="flex flex-col gap-4 max-w-2xl items-center">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
            {currentIndex === 0
              ? 'Welcome to Our Store'
              : currentIndex === 1
              ? 'Discover Our New Arrivals'
              : 'Shop the Trend Now'}
          </h1>
          <p className="text-slate-200">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <button className="border border-white bg-transparent px-6 py-2 font-semibold transition hover:bg-white hover:text-black cursor-pointer sm:w-[200px] w-[150px]">
            {currentIndex=== 1 ?'Buy Now':'See More'}
          </button>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-white z-30 text-3xl font-bold"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white z-30 text-3xl font-bold"
      >
        ›
      </button>
    </div>
  );
};

export default Slider;
