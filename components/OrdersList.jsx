"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Package, Clock, Truck, CheckCircle, XCircle, Eye, Calendar } from "lucide-react";

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  processing: {
    icon: Package,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  shipped: {
    icon: Truck,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  delivered: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  cancelled: {
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
};

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch("/api/orders", {
          headers: {
            "auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your order history and status</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <button
              onClick={() => router.push("/Products&Categories")}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${statusConfig[order.status].bgColor} ${statusConfig[order.status].borderColor} border`}>
                          <StatusIcon className={`w-5 h-5 ${statusConfig[order.status].color}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h3>
                          <p className="text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center space-x-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status].bgColor} ${statusConfig[order.status].color}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                        <button
                          onClick={() => router.push(`/orders/${order._id}`)}
                          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Items Summary */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Items</h4>
                        <div className="space-y-2">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-600 truncate">{item.title}</span>
                              <span className="text-gray-900">x{item.quantity}</span>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <p className="text-sm text-gray-500">
                              +{order.items.length - 3} more items
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Payment</h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600">
                            Method: <span className="text-gray-900 capitalize">
                              {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
                            </span>
                          </p>
                          <p className="text-gray-600">
                            Status: <span className={`font-medium ${
                              order.paymentMethod === "cod" && order.status === 'delivered' ? "text-green-600" : "text-yellow-600"
                            }`}>
                              {order.paymentMethod === "cod"&& order.status === 'delivered' ? "Paid" : "Pending"}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Total */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Total</h4>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600">
                            Subtotal: <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
                          </p>
                          {order.codFee > 0 && (
                            <p className="text-gray-600">
                              COD Fee: <span className="text-gray-900">${order.codFee.toFixed(2)}</span>
                            </p>
                          )}
                          <p className="text-lg font-semibold text-gray-900">
                            Total: ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 