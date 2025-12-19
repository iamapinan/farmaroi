"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxBgProps {
  imageUrl?: string;
  className?: string;
}

export default function ParallaxBg({ imageUrl, className = "" }: ParallaxBgProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  if (!imageUrl) return null;

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
        <Image
          src={imageUrl}
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      </motion.div>
    </div>
  );
}

