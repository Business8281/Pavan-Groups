"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const gridItems = [
  // 1. Tall left
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80", 
    className: "col-span-1 row-span-2",
    delay: 0
  },
  // 2. Wide top center
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80", 
    className: "col-span-2 row-span-1",
    delay: 0.1
  },
  // 3. Small top right
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80", 
    className: "col-span-1 row-span-1",
    delay: 0.2
  },
  // 4. TEXT BLOCK (Center)
  {
    type: "text",
    className: "col-span-2 row-span-1 flex flex-col items-center justify-center text-center p-6",
    delay: 0.3
  },
  // 5. Tall right
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&q=80", 
    className: "col-span-1 row-span-2",
    delay: 0.4
  },
  // 6. Small bottom left
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80", 
    className: "col-span-1 row-span-1",
    delay: 0.5
  },
  // 7. Wide bottom center
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80", 
    className: "col-span-2 row-span-1",
    delay: 0.6
  }
];

export default function ElegantDiscovery() {
  return (
    <section className="relative z-10 w-full h-auto md:h-[90vh] min-h-[600px] max-h-[900px] bg-white overflow-hidden border-t border-gray-100 flex items-center justify-center py-12 md:py-0">
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 h-full md:h-[80%] flex flex-col justify-center">
        
        {/* ── DESKTOP: 4-COLUMN BENTO GRID ── */}
        <div className="hidden md:grid md:grid-cols-4 md:grid-rows-3 gap-3 md:gap-4 lg:gap-6 w-full h-full">
          {gridItems.map((item, i) => {
            if (item.type === "text") {
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: item.delay, ease: "easeOut" }}
                  className={`${item.className} bg-white rounded-2xl p-6 lg:p-8 flex flex-col items-center justify-center text-center border border-[#252422]/15 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)]`}
                >
                  <span className="text-[#ff5500] text-[11px] font-mono uppercase tracking-[0.25em] font-bold mb-3 block">
                    Discover Quality
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#252422] font-light tracking-tight leading-none mb-6">
                    Our Gallery
                  </h2>
                  <Link 
                    href="/gallery"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#252422] hover:bg-[#ff5500] text-white text-xs font-mono uppercase tracking-[0.2em] font-bold rounded-[4px] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#ff5500]/20 group cursor-pointer"
                  >
                    <span>View Collection</span>
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: item.delay, ease: "easeOut" }}
                className={`${item.className} relative overflow-hidden shadow-md rounded-2xl group border border-[#252422]/10`}
              >
                <img 
                  src={item.src} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt="Premium Stone Inspiration" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* ── MOBILE: DEDICATED GALLERY SHOWCASE HEADER + 2-COLUMN STONE MOSAIC ── */}
        <div className="flex flex-col gap-6 md:hidden w-full">
          {/* Header */}
          <div className="text-center space-y-2.5">
            <span className="text-[#ff5500] text-[10px] font-mono uppercase tracking-[0.24em] font-bold block">
              DISCOVER QUALITY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#252422] font-light tracking-tight leading-none">
              Our Gallery
            </h2>
            <p className="text-xs text-[#555555] font-light max-w-xs mx-auto leading-relaxed">
              Explore our landmark architectural projects and natural stone installations.
            </p>
            <div className="pt-1">
              <Link 
                href="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#252422] hover:bg-[#ff5500] text-white text-[11px] font-mono uppercase tracking-wider font-bold rounded-[4px] shadow-sm active:scale-95 touch-manipulation transition-colors duration-300"
              >
                <span>View Full Gallery</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* 2-Column Photo Mosaic Grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {gridItems
              .filter((item) => item.type === "image")
              .slice(0, 4)
              .map((item, idx) => (
                <Link
                  key={idx}
                  href="/gallery"
                  className={`relative overflow-hidden rounded-xl shadow-xs border border-[#252422]/15 block group touch-manipulation ${
                    idx === 0 ? "aspect-[3/4]" : idx === 1 ? "aspect-[4/3]" : idx === 2 ? "aspect-[4/3]" : "aspect-[3/4]"
                  }`}
                >
                  <img
                    src={item.src}
                    alt="Pavan Stones Gallery Specimen"
                    className="w-full h-full object-cover group-active:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[9px] font-mono uppercase tracking-wider font-semibold">
                    <span>Project 0{idx + 1}</span>
                    <span className="text-[#ff5500]">↗</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </section>
  );
}
