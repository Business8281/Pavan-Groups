"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface StoneCategory {
  id: string;
  title: string[];
  subtitle: string[];
  href: string;
  image: string;
  alt: string;
}

const STONE_CATEGORIES: StoneCategory[] = [
  {
    id: "slate-stone",
    title: ["Slate Stone"],
    subtitle: ["Natural Textures.", "Timeless Appeal."],
    href: "/products/slate-stone",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    alt: "Slate Stone Wall Cladding with Natural 3D Textures",
  },
  {
    id: "limestone",
    title: ["Limestone"],
    subtitle: ["Earthy Elegance.", "Lasting Strength."],
    href: "/products/limestones",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Calcareous Limestone Patio Pavers and Landscaping",
  },
  {
    id: "south-indian-granite",
    title: ["South Indian", "Granite"],
    subtitle: ["Iconic Colours.", "Superior Quality."],
    href: "/products/south-indian-granite",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    alt: "South Indian Granite Polished Countertops and Slabs",
  },
  {
    id: "north-indian-granite",
    title: ["North Indian", "Granite"],
    subtitle: ["Unique Patterns.", "Wide Applications."],
    href: "/products/north-indian-granite",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    alt: "North Indian Granite Architectural Slabs and Patterns",
  },
];

export default function HeroStoneCategories() {
  return (
    <section className="relative z-10 w-full bg-white shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.35)] px-3 sm:px-6 md:px-8 lg:px-12 pt-3 sm:pt-6 md:pt-8 pb-1 sm:pb-2">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 md:gap-5">
          {STONE_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={cat.href}
                className="group relative block aspect-[1.2/1] sm:aspect-[1/1] lg:aspect-[4/3] xl:aspect-[1.15/1] overflow-hidden bg-[#181310] select-none shadow-sm hover:shadow-xl transition-shadow duration-500 rounded-sm sm:rounded-none"
              >
                {/* Background Stone Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.alt}
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Subtle Cinematic Vignette for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/40" />

                {/* Card Content Overlay */}
                <div className="absolute inset-0 p-3 sm:p-5 md:p-6 lg:p-5 xl:p-6 flex flex-col justify-end pointer-events-none">
                  <div className="flex items-end justify-between gap-1.5 sm:gap-3">
                    
                    {/* Left Typography */}
                    <div className="flex flex-col text-left min-w-0">
                      <h3 className="font-display text-[16px] sm:text-[22px] md:text-[26px] lg:text-[24px] xl:text-[28px] font-normal text-white leading-[1.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                        {cat.title.map((line, lIdx) => (
                          <span key={lIdx} className="block truncate">
                            {line}
                          </span>
                        ))}
                      </h3>

                      <div className="mt-1 sm:mt-2 text-[9.5px] sm:text-[12px] md:text-[13px] text-white/85 font-light leading-tight drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                        {cat.subtitle.map((line, sIdx) => (
                          <span key={sIdx} className="block truncate">
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Circular Arrow Button */}
                    <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/70 flex items-center justify-center text-white flex-none transition-all duration-300 group-hover:bg-white group-hover:text-[#161210] group-hover:border-white group-hover:scale-105 shadow-md">
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>

                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
