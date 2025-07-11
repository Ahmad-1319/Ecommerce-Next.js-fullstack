"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Checkout from "@/components/Checkout";

export default function CheckoutPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return <Checkout />;
} 