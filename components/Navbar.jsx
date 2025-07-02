"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, User, Search, LogOut, LogIn, UserPlus, Package, Home, ShoppingBag, Grid3X3, Info, Shield, Users, LayoutDashboard, Contact } from "lucide-react";
import Cart from "./Cart";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [role, setRole] = useState("");
  const context = useCart();
  const { cartItems, fetchCart, clearCart } = context;
  const router = useRouter();

  // Check login status on mount and when token changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLogin(!!token);
      if (token) {
        fetchOrderCount();
      }
      const storedRole = localStorage.getItem('role') || "";
      setRole(storedRole);
    };

    // Check initial login status
    checkLoginStatus();

    // Listen for storage changes
    window.addEventListener('storage', checkLoginStatus);

    // Also check when localStorage changes (for same-tab updates)
    window.addEventListener('localStorageChange', checkLoginStatus);

    // Cleanup
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('localStorageChange', checkLoginStatus);
    };
  }, []);

  const fetchOrderCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/orders', {
        headers: {
          'auth-token': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrderCount(data.orders?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching order count:', error);
    }
  };

  const logOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Dispatch a custom event to notify about localStorage change
    window.dispatchEvent(new Event('localStorageChange'));
    setIsLogin(false);
    setOrderCount(0);
    clearCart();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    router.push('/login');
  }, [clearCart, router]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
    fetchCart();
  }, [fetchCart]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">P</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                    Pixo Deals
                  </span>
                  <span className="text-xs text-gray-500">Your Shopping Partner</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium flex items-center sm:text-sm">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium flex items-center sm:text-sm">
                <Info className="w-4 h-4 mr-1" />
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium flex items-center smm:text-sm">
                <Contact className="w-4 h-4 mr-1" />
                Contact
              </Link>
              {/* <Link href="/products" className="text-gray-700 hover:text-gray-900 font-medium flex items-center">
                <ShoppingBag className="w-4 h-4 mr-1" />
                Products
              </Link> */}
              <Link href="/Products&Categories" className="text-gray-700 hover:text-gray-900 font-medium flex items-center ">
                <Grid3X3 className="w-4 h-4 mr-1" />
               Products & Categories
              </Link>
             
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <button
                  onClick={toggleSearch}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <Search className="w-5 h-5" />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-2">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    {!isLogin ? (
                      <>
                        <Link
                          href="/login"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <LogIn className="w-4 h-4 mr-3" />
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <UserPlus className="w-4 h-4 mr-3" />
                          Sign Up
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/orders"
                          className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <Package className="w-4 h-4 mr-3" />
                            My Orders
                          </div>
                          {orderCount > 0 && (
                            <span className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {orderCount > 99 ? '99+' : orderCount}
                            </span>
                          )}
                        </Link>
                        {role === 'admin' && (
                          <>
                            <Link
                              href="/admin/dashboard"
                              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4 mr-3" />
                              Admin Dashboard
                            </Link>
                            <Link
                              href="/admin/orders"
                              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Package className="w-4 h-4 mr-3" />
                              Admin Orders
                            </Link>
                            <Link
                              href="/admin/users"
                              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Users className="w-4 h-4 mr-3" />
                              Users
                            </Link>
                            <div className="border-t border-gray-200 my-1"></div>
                          </>
                        )}
                        <button
                          className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={logOut}
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-full relative transition-colors duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems?.length === 0 ? "" : (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={toggleSearch}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-full relative transition-colors duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems?.length === 0 ? "" : (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Home className="w-5 h-5 mr-3" />
                  Home
                </Link>
                {/* <Link
                  href="/products"
                  className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  Products
                </Link> */}
                <Link
                  href="/Products&Categories"
                  className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Grid3X3 className="w-5 h-5 mr-3" />
                  Products & Categories
                </Link>
                <Link
                  href="/about"
                  className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Info className="w-5 h-5 mr-3" />
                  About
                </Link>
              </div>

              {/* User Section */}
              <div className="border-t border-gray-200 pt-4">
                {!isLogin ? (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <LogIn className="w-5 h-5 mr-3" />
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <UserPlus className="w-5 h-5 mr-3" />
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/orders"
                      className="flex items-center justify-between px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <Package className="w-5 h-5 mr-3" />
                        My Orders
                      </div>
                      {orderCount > 0 && (
                        <span className="bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {orderCount > 99 ? '99+' : orderCount}
                        </span>
                      )}
                    </Link>
                    {role === 'admin' && (
                      <>
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <LayoutDashboard className="w-5 h-5 mr-3" />
                          Admin Dashboard
                        </Link>
                        <Link
                          href="/admin/orders"
                          className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Package className="w-5 h-5 mr-3" />
                          Admin Orders
                        </Link>
                        <Link
                          href="/admin/users"
                          className="flex items-center px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Users className="w-5 h-5 mr-3" />
                          Users
                        </Link>
                        <div className="border-t border-gray-200 my-1"></div>
                      </>
                    )}
                    <button
                      onClick={logOut}
                      className="flex items-center w-full px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden px-4 py-2 bg-white border-t border-gray-200">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        )}
      </nav>

      {/* Cart */}
      <Cart isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
}
