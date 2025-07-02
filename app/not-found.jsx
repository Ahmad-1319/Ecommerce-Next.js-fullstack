import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6 text-base md:text-lg">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-base md:text-lg">Go Home</Link>
    </div>
  );
} 