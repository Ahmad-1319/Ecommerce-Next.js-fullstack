"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { LayoutDashboard, Package, Users, ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";

const sidebarLinks = [
  { name: "Dashboard", icon: <LayoutDashboard />, href: "/admin/dashboard" },
  { name: "Orders", icon: <Package />, href: "/admin/orders" },
  { name: "Users", icon: <Users />, href: "/admin/users" },
  { name: "Products", icon: <ShoppingBag />, href: "/admin/products" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ users: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/dashboard", {
        headers: { "auth-token": token },
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        // Example chart data, replace with real if available
        setChartData([
          { name: "Users", value: data.stats.users },
          { name: "Orders", value: data.stats.orders },
          { name: "Revenue", value: data.stats.revenue },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed z-40 inset-y-0 top-20 left-0 bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? "w-56" : "w-16"} flex flex-col h-full`}>
       
      <div className={`flex items-center ${sidebarOpen ?"justify-between border-b p-3":"justify-normal mt-2"}  `}>
          <span className="font-bold text-lg text-black">{sidebarOpen ? "Admin":""}</span>
          <button onClick={() => setSidebarOpen((prev) => !prev)} className="ml-2 p-1 rounded hover:bg-gray-100 ">
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-2">
          {/* <div className="flex justify-between items-end p-4">
          <span className="font-bold text-lg text-black">{sidebarOpen ? "Admin" : "A"}</span>
         <button onClick={() => setSidebarOpen((prev) => !prev)} className="ml-2 p-1 rounded hover:bg-gray-100 ">
            {sidebarOpen ? <X /> : <Menu  />}
          </button>
          </div> */}
          {sidebarLinks.map((link) => (
            <Link key={link.name} href={link.href} className={`flex items-center px-4 py-3 rounded-lg transition-colors hover:bg-gray-100 text-gray-700 ${sidebarOpen ? "justify-start" : "justify-center"}`}>
              <span className="mr-3">{link.icon}</span>
              {sidebarOpen && <span>{link.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen? "ml-56":"ml-20"} transition-all duration-300 p-4 md:p-8   `}> 
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <Users className="w-10 h-10 text-blue-500 mr-4" />
                <div>
                  <div className="text-2xl font-bold">{stats.users}</div>
                  <div className="text-gray-500">Users</div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <Package className="w-10 h-10 text-green-500 mr-4" />
                <div>
                  <div className="text-2xl font-bold">{stats.orders}</div>
                  <div className="text-gray-500">Orders</div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex items-center">
                <LayoutDashboard className="w-10 h-10 text-yellow-500 mr-4" />
                <div>
                  <div className="text-2xl font-bold">${stats.revenue}</div>
                  <div className="text-gray-500">Revenue</div>
                </div>
              </div>
            </div>
            {/* Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Overview</h2>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 