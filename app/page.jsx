import FeaturedProducts from '@/components/home/featuredProducts';
import Slider from '@/components/home/Slider';
import ClientImage from '@/components/ClientImage';
import Link from 'next/link';

const res = await fetch("http://localhost:3000/api/products/get", {
  cache: "no-store",
});

const categories = [
  {
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGNsb3RoaW5nJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D',
    href: '/Products&Categories/men',
  },
  {
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D',
    href: '/Products&Categories/women',
  },
  {
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: '/Products&Categories/electronics',
  },
];

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8"></div>
      <Slider/>
      <section className="py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Shop by Category</h1>
          <p className="text-slate-600 my-5">Choose from our top categories</p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="relative group overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300 w-full"
              >
                <ClientImage
                  src={category.image}
                  alt={category.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110 "
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-trasparent bg-opacity-30 group-hover:bg-opacity-[0.4] transition duration-300"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-shadow-2xs text-2xl font-semibold z-10 group-hover:animate-pulse">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <hr className='my-15 border-1 '/>
      <section id='featured-products' className='my-20 max-w-[95vw] w-full flex flex-col gap-2 items-center mx-auto'>
           <FeaturedProducts/>
      </section>
      <hr className='mt-20 border-1' />
      </div>
    </>
  );
}
