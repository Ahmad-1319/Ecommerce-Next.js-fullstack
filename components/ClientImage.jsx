"use client";
import Image from "next/image";
import { useState } from "react";

export default function ClientImage(props) {
  const [src, setSrc] = useState(props.src);
  return (
    <Image
      {...props}
      src={src}
      onError={() => setSrc("/fallback-image.png")}
    />
  );
} 