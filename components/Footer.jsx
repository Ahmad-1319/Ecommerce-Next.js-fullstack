import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, InstagramIcon, Linkedin } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 border-t border-gray-700 \S  " >
      <div className="container mx-auto text-center space-y-6">
      
        <p className="text-gray-400">Your one-stop shop for the best deals</p>

        <div className="flex justify-center gap-6 mt-4 text-gray-300">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/products" className="hover:text-white">Products</Link>
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="text-gray-400">Follow us on</div>
        <div className="flex justify-center gap-6 text-gray-300 mt-2">
          <Link href="#" className="hover:text-blue-500"><Facebook size={24} /></Link>
          <Link href="#" className="hover:text-blue-400"><Twitter size={24} /></Link>
          <Link href="#" className="hover:text-pink-500"><InstagramIcon size={24} /></Link>
          <Link href="#" className="hover:text-blue-600"><Linkedin size={24} /></Link>
          <Link href="#" className="hover:text-green-600"><BsWhatsapp size={24} /></Link>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="text-gray-500">
          <p>© 2025 Pixo Deals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
