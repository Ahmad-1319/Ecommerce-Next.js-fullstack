// /context/CartContext.js
'use client'
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

// Create the context
const CartContext = createContext();

// Create provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCartItems([]); // Clear cart when no token
        setLoading(false);
        return;
      }

      const res = await fetch('/api/cart', {
        method: 'GET',
        headers: {
          "auth-token": token,
          "Content-Type": "application/json"
        }
      });

      if (res.status === 200) {
        const data = await res.json();
        setCartItems(data.items || []);
      } else {
        setCartItems([]); // Clear cart on error
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]); // Clear cart on error
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since we don't use any external values

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (id, price, title, image) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Login Required');
        return;
      }

      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          "auth-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1,
          price: price,
          title: title,
          image: image
        })
      });

      if (res.status === 200) {
        const updatedCart = await res.json();
        toast.success(updatedCart.message);
        await fetchCart(); // Fetch fresh cart data
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          "auth-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId })
      });

      if (res.ok) {
        toast.success("Item removed successfully")
        await fetchCart();
            // Fetch fresh cart data
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          "auth-token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId, quantity })
      });

      if (res.status === 200) {
        await fetchCart(); // Fetch fresh cart data
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider value={{
      setCartItems,
      cartItems,
      fetchCart,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
