"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Order from "@/components/Order";

export default function OrderPage({ params }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return <Order orderId={params.orderId} />;
} 