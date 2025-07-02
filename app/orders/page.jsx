"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import OrdersList from "@/components/OrdersList";

export default function OrdersPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return <OrdersList />;
} 