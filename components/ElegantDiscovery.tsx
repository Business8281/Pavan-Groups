"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Authentic natural stone images from our website
const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    title: "Monolithic Slabs & Polished Interiors",
    alt: "Luxury Stone Architecture",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80",
    title: "Calibrated Wall Cladding & Tiles",
    alt: "Modern Stone Wall Cladding",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    title: "Exterior Patios & Limestone Pavers",
    alt: "Villa Stone Terrace",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&q=80",
    title: "Architectural Granite Landmark Facades",
    alt: "Monumental Granite Facade",
  },
];

export default function ElegantDiscovery() {
  return (
    <section className="relative z-10 w-full bg-white py-8 sm:py-16 lg:py-24 px-3 sm:px-6 md:px-12 border-t border-[#003049]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* ── 3-COLUMN COMPOSITION: PROPORTIONATE & SYMMETRICAL ── */}
        <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-3 sm:gap-6">
          {/* ── LEFT COLUMN: FEATURED TALL PORTRAIT (30% WIDTH) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[30%] h-[180px] xs:h-[220px] sm:h-[380px] lg:h-[490px] rounded-[4px] overflow-hidden border border-[#003049]/10 shadow-sm group relative flex-none"
          >
            <img
              src={GALLERY_IMAGES[0].src}
              alt={GALLERY_IMAGES[0].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-5">
              <span className="text-white text-[11px] sm:text-xs font-sans font-medium">
                {GALLERY_IMAGES[0].title}
              </span>
            </div>
          </motion.div>

          {/* ── CENTER COLUMN: TEXT HEADER (TOP) + 2 SIDE-BY-SIDE IMAGES (BOTTOM) (40% WIDTH) ── */}
          <div className="w-full lg:flex-1 h-auto lg:h-[490px] flex flex-col justify-between gap-3.5 sm:gap-6 order-first lg:order-none">
            {/* Top: Centered Header Block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center justify-center text-center pt-0 sm:pt-4"
            >
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] sm:tracking-[0.24em] font-bold text-[#ff5500] mb-1 sm:mb-2 block">
                IN FRAME
              </span>

              <h2 className="font-display font-light text-2xl sm:text-4xl lg:text-[42px] text-[#003049] leading-[1.08] tracking-tight uppercase">
                NATURAL STONE <br />
                <span className="italic font-normal">PHOTO GALLERY</span>
              </h2>

              <p className="text-[10.5px] sm:text-[13px] text-[#003049]/70 font-sans font-light tracking-wide uppercase mt-1 sm:mt-2.5 max-w-sm">
                Architectural Installations &amp; Quarry Provenance
              </p>

              <div className="w-8 sm:w-12 h-[1.5px] sm:h-[2px] bg-[#ff5500]/30 mt-2 sm:mt-3" />
            </motion.div>

            {/* Bottom: 2 Smaller Images Side by Side */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-2.5 sm:gap-4 h-[130px] xs:h-[150px] sm:h-[250px] lg:h-[265px] w-full"
            >
              <div className="h-full rounded-[4px] overflow-hidden border border-[#003049]/10 shadow-sm group relative">
                <img
                  src={GALLERY_IMAGES[1].src}
                  alt={GALLERY_IMAGES[1].alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-3.5">
                  <span className="text-white text-[10px] sm:text-[11px] font-sans font-medium truncate">
                    {GALLERY_IMAGES[1].title}
                  </span>
                </div>
              </div>

              <div className="h-full rounded-[4px] overflow-hidden border border-[#003049]/10 shadow-sm group relative">
                <img
                  src={GALLERY_IMAGES[2].src}
                  alt={GALLERY_IMAGES[2].alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-3.5">
                  <span className="text-white text-[10px] sm:text-[11px] font-sans font-medium truncate">
                    {GALLERY_IMAGES[2].title}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: FEATURED TALL PORTRAIT (30% WIDTH) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-[30%] h-[180px] xs:h-[220px] sm:h-[380px] lg:h-[490px] rounded-[4px] overflow-hidden border border-[#003049]/10 shadow-sm group relative flex-none"
          >
            <img
              src={GALLERY_IMAGES[3].src}
              alt={GALLERY_IMAGES[3].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-5">
              <span className="text-white text-[11px] sm:text-xs font-sans font-medium">
                {GALLERY_IMAGES[3].title}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM ACTION: CENTERED BUTTON ROUTING TO GALLERY PAGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="w-full pt-6 sm:pt-12 flex items-center justify-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-[4px] bg-[#003049] hover:bg-[#ff5500] text-white text-[11px] sm:text-xs font-sans uppercase tracking-[0.16em] sm:tracking-[0.18em] font-semibold transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
