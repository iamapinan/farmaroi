"use client";

import { useEffect, useState } from "react";

interface ParallaxBgProps {
  imageUrl?: string;
  className?: string;
}

export default function ParallaxBg({ imageUrl, className = "" }: ParallaxBgProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!imageUrl) return null;

  return (
    <div
      className={`absolute inset-0 bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        transform: `translateY(${offset * 0.5}px)`,
      }}
    />
  );
}

