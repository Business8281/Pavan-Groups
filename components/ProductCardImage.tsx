"use client";

import React, { useState, useEffect, useRef } from "react";

interface ProductCardImageProps {
  images: string[];
  alt: string;
  className?: string;
  intervalMs?: number;
  isCardHovered?: boolean;
  showIndicators?: boolean;
}

export default function ProductCardImage({
  images,
  alt,
  className = "w-full h-full object-cover sm:object-contain transition-transform duration-500 ease-out group-hover:scale-105",
  intervalMs = 2000,
  isCardHovered,
  showIndicators = true,
}: ProductCardImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [internalHover, setInternalHover] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter out any undefined or empty strings
  const validImages = Array.isArray(images) && images.length > 0
    ? images.filter(Boolean)
    : ["/images/placeholder.jpg"];

  // Effective hover state: either parent card hovered or inner image hovered
  const activeHover = isCardHovered !== undefined ? isCardHovered : internalHover;

  useEffect(() => {
    if (activeHover && validImages.length > 1) {
      if (validImages.length === 2) {
        // For a 2-image product: immediately switch to second image on hover
        setCurrentIndex(1);
      } else {
        // Start 2-second timer to cycle through images for 3+ images
        timerRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % validImages.length);
        }, intervalMs);
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Return to first image when hover ends
      setCurrentIndex(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeHover, validImages.length, intervalMs]);

  if (validImages.length <= 1) {
    return (
      <img
        src={validImages[0]}
        alt={alt}
        className={className}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
    >
      {validImages.map((src, idx) => (
        <img
          key={src + idx}
          src={src}
          alt={`${alt} - View ${idx + 1}`}
          className={`${className} absolute inset-0 w-full h-full object-cover sm:object-contain transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
          }`}
          loading={idx === 0 ? "eager" : "lazy"}
        />
      ))}

      {/* Visual slide indicator dots when hovered or multi-image */}
      {showIndicators && validImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-xs opacity-70 group-hover:opacity-100 transition-opacity">
          {validImages.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === currentIndex ? "w-3.5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
