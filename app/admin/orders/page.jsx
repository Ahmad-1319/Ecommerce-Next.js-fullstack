"use client";
import { useEffect, useState } from "react";
import { Package, User, Truck, Loader, CheckCircle, XCircle } from "lucide-react";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/orders", {
      headers: { "auth-token": token },
    });
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders);
    }
    setLoading(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    const token = localStorage.getItem("token");
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "auth-token": token },
      body: JSON.stringify({ orderId, status: newStatus }),
    });
    if (res.ok) {
      await fetchOrders();
    }
    setUpdating("");
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">All Orders</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-xs md:text-sm">{order._id}</td>
                  <td className="p-3 text-xs md:text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium flex items-center"><User className="w-4 h-4 mr-1" />{order.userId?.username || "-"}</span>
                      <span className="text-gray-500">{order.userId?.email}</span>
                    </div>
                  </td>
                  <td className="p-3 text-xs md:text-sm">
                    <ul className="space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded mr-2 border" />
                          <span>{item.title} x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 text-xs md:text-sm">
                    <div>{order.address.fullName}</div>
                    <div className="text-gray-500">{order.address.street}, {order.address.city}</div>
                    <div className="text-gray-400 text-xs">{order.address.country}</div>
                  </td>
                  <td className="p-3 text-xs md:text-sm capitalize">{order.paymentMethod}</td>
                  <td className="p-3 text-xs md:text-sm font-bold">${order.total}</td>
                  <td className="p-3 text-xs md:text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold
                      ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                      ${order.status === "processing" ? "bg-blue-100 text-blue-800" : ""}
                      ${order.status === "shipped" ? "bg-purple-100 text-purple-800" : ""}
                      ${order.status === "delivered" ? "bg-green-100 text-green-800" : ""}
                      ${order.status === "cancelled" ? "bg-red-100 text-red-800" : ""}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs md:text-sm">
                    <select
                      className="border rounded px-2 py-1 text-xs md:text-sm"
                      value={order.status}
                      onChange={e => handleStatusChange(order._id, e.target.value)}
                      disabled={updating === order._id}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {updating === order._id && <Loader className="w-4 h-4 animate-spin inline ml-2" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 