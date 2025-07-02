'use client'

import Link from "next/link"
import { Home, ShoppingBag, UserPlus, LogIn, X } from "lucide-react"

export default function Sidebar({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Menu</h2>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-6">
          <li>
            <Link href="/" className="flex items-center gap-3 text-slate-800 hover:text-orange-500 transition-colors">
              <Home size={20} />
              <span className="font-medium">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/products" className="flex items-center gap-3 text-slate-800 hover:text-orange-500 transition-colors">
              <ShoppingBag size={20} />
              <span className="font-medium">Products</span>
            </Link>
          </li>
          <li>
            <Link href="/signup" className="flex items-center gap-3 text-slate-800 hover:text-orange-500 transition-colors">
              <UserPlus size={20} />
              <span className="font-medium">Sign Up</span>
            </Link>
          </li>
          <li>
            <Link href="/login" className="flex items-center gap-3 text-slate-800 hover:text-orange-500 transition-colors ">
              <LogIn size={20} />
              <span className="font-medium ">Login</span>
            </Link>
          </li>
          <li>
            <Link href="/about" className="flex items-center gap-3 text-slate-800 hover:text-orange-500 transition-colors ">
              
              <span className="font-medium ">About</span>
            </Link>
          </li>
          <li>
            <Link href="/contact" className="flex items-center gap-3 text-slate-800 hover:text-orange-500 transition-colors ">
              
              <span className="font-medium ">Contact</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
