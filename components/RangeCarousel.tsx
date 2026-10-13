"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  image?: string;
  [key: string]: any;
}

interface RangeCarouselProps {
  products: Product[];
  subtitle: string;
}

export default function RangeCarousel({ products, subtitle }: RangeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(2); // Start in middle if 5 items

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1));
  };

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [products.length]);

  return (
    <section className="relative py-24 md:py-32 w-full overflow-hidden bg-white border-t border-b border-[#140d0a]/10">
      {/* Title */}
      <div className="text-center mb-14 md:mb-16 px-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#c85a32] block mb-3">
          COLLECTIONS & VARIETIES
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-[#140d0a] uppercase tracking-wide">
          Explore Our <br className="md:hidden" />
          Range For{" "}
          <span className="font-cursive text-[#c85a32] lowercase text-5xl sm:text-6xl md:text-7xl tracking-normal normal-case ml-2 inline-block -translate-y-2">
            {subtitle}
          </span>
        </h2>
      </div>

      {/* Flat Scaled 3D Carousel on Pure White Canvas */}
      <div className="relative w-full max-w-7xl mx-auto h-[420px] sm:h-[500px] md:h-[540px] flex items-center justify-center">
        {products.map((item, index) => {
          let position = "hidden";
          const diff = (index - currentIndex + products.length) % products.length;

          if (diff === 0) position = "center";
          else if (diff === 1) position = "right1";
          else if (diff === 2) position = "right2";
          else if (diff === products.length - 1) position = "left1";
          else if (diff === products.length - 2) position = "left2";

          const isCenter = position === "center";

          return (
            <motion.div
              key={item.id}
              className={`absolute w-[220px] h-[320px] sm:w-[280px] sm:h-[420px] md:w-[340px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer border border-[#140d0a]/10 bg-[#140d0a] ${
                isCenter ? "shadow-2xl" : "shadow-lg"
              }`}
              initial={false}
              animate={position}
              variants={{
                center: { zIndex: 5, x: "0%", scale: 1, opacity: 1 },
                left1: { zIndex: 4, x: "-68%", scale: 0.85, opacity: 0.85 },
                left2: { zIndex: 3, x: "-118%", scale: 0.7, opacity: 0.45 },
                right1: { zIndex: 4, x: "68%", scale: 0.85, opacity: 0.85 },
                right2: { zIndex: 3, x: "118%", scale: 0.7, opacity: 0.45 },
                hidden: { zIndex: 1, x: "0%", scale: 0.5, opacity: 0 },
              }}
              transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => {
                if (position === "left1" || position === "left2") handlePrev();
                if (position === "right1" || position === "right2") handleNext();
              }}
            >
              <img
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                }
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              
              {/* Gradient Scrim for perfect contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Card Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <span className="text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#d8c3a5] block mb-1">
                  NATURAL STONE PROFILE
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-light leading-snug">
                  {item.name}
                </h3>
                {isCenter && (
                  <Link
                    href={`/products/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-wider text-[#d8c3a5] hover:text-white transition-colors mt-2.5 pointer-events-auto"
                  >
                    <span>Inspect Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Left & Right Interactive Navigation Controls */}
        <button
          onClick={handlePrev}
          aria-label="Previous product"
          className="absolute left-3 sm:left-8 md:left-12 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#140d0a]/15 text-[#140d0a] flex items-center justify-center shadow-lg hover:bg-[#140d0a] hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next product"
          className="absolute right-3 sm:right-8 md:right-12 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#140d0a]/15 text-[#140d0a] flex items-center justify-center shadow-lg hover:bg-[#140d0a] hover:text-white transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Interactive Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              currentIndex === idx
                ? "w-8 bg-[#c85a32]"
                : "w-2 bg-[#140d0a]/20 hover:bg-[#140d0a]/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
