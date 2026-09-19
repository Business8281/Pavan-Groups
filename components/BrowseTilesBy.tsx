"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "@animateicons/react/lucide";

interface StoneCollection {
  id: string;
  num: string;
  name: string;
  category: string;
  thickness: string;
  edgeType: string;
  application: string;
  quarryOrigin: string;
  description: string;
  imageUrl: string;
  linkHref: string;
}

const STONE_COLLECTIONS: StoneCollection[] = [
  {
    id: "stone-slate",
    num: "01",
    name: "Natural Slate Flooring",
    category: "Markapur Foliated Cleft",
    thickness: "20mm Calibrated Slab",
    edgeType: "Chiselled Cleft Edge",
    application: "Living Room Foyers & High-Traffic Floors",
    quarryOrigin: "Markapur Quarry, Andhra Pradesh",
    description: "Extracted from ancient metamorphic beds, offering high anti-skid tactile traction and natural crystalline mica strata.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    linkHref: "/products?company=Pavan+Impex&stone=slate",
  },
  {
    id: "stone-granite",
    num: "02",
    name: "Black Galaxy Granite",
    category: "Chimakurthy Gold Sparkle",
    thickness: "30mm Heavy Slab",
    edgeType: "Diamond Sawn & Polished",
    application: "Bespoke Kitchen Islands & Luxury Countertops",
    quarryOrigin: "Chimakurthy Mines, Andhra Pradesh",
    description: "Deep obsidian black hypersthene matrix embedded with shimmering golden bronzite crystals for peerless luxury.",
    imageUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
    linkHref: "/products?company=Pavan+Granite&stone=granite",
  },
  {
    id: "stone-limestone",
    num: "03",
    name: "Calcareous Limestone",
    category: "Cuddapah Anti-Skid Pavers",
    thickness: "25mm Calibrated Paver",
    edgeType: "Tumbled Antique R11",
    application: "Luxury Spa Wet Rooms, Verandas & Bathrooms",
    quarryOrigin: "Cuddapah Basin, Andhra Pradesh",
    description: "Dense calcareous sedimentation with fine-grain calcite crystals. Highly resistant to water moisture and weathering.",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85",
    linkHref: "/products?company=Sai+Balaji+Impex&stone=limestone",
  },
  {
    id: "stone-3d-cladding",
    num: "04",
    name: "3D Wall Cladding",
    category: "Stacked Interlocking Panels",
    thickness: "35mm Relief Strata",
    edgeType: "Split-Face Rock",
    application: "Architectural Exterior Facades & Feature Walls",
    quarryOrigin: "Pavan Impex Works, Andhra Pradesh",
    description: "Interlocking Z-shaped stone ledgers cut with multi-tier cleft depths to cast dramatic architectural raking shadows.",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    linkHref: "/products?finish=3D+Ledger+Relief",
  },
  {
    id: "stone-pavers",
    num: "05",
    name: "Tumbled Cobble Pavers",
    category: "Heavy Vehicular Landscaping",
    thickness: "40mm Solid Cobble",
    edgeType: "Quarried Weathered Antique",
    application: "Driveways, Resort Pool Decks & Courtyards",
    quarryOrigin: "Bespoke Quarry Cut, Andhra Pradesh",
    description: "Hardened quartzite rock tumbled to achieve historic European cobble edges, engineered for heavy vehicular loads.",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    linkHref: "/products?finish=Tumbled+Antique&size=200x100+mm+Pavers",
  },
  {
    id: "stone-gangsaw-slabs",
    num: "06",
    name: "Monolithic Gangsaw Slabs",
    category: "Bespoke Bookmatched Slabs",
    thickness: "30mm Jumbo Gangsaw",
    edgeType: "Calibrated Sawn",
    application: "Grand Monolithic Flooring & Executive Walls",
    quarryOrigin: "Monolithic Gangsaw Mill, Ongole",
    description: "Continuous jumbo slabs precision-sawn from single monolithic quarry blocks for uninterrupted crystalline vein alignment.",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    linkHref: "/products?size=Jumbo+Gangsaw+Slabs",
  },
];

export default function BrowseTilesBy() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="browse-tiles"
      className="relative z-40 py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#ffffff] border-t border-[#747474]/15"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#c85a32] font-semibold block mb-2">
              Direct Quarry Extractions
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-none tracking-tight">
              <span className="text-[#241919]">Explore Natural Stone</span>{" "}
              <span className="text-[#747474]">Collections</span>
            </h2>
          </div>

          <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#454545] font-light max-w-md">
            Slate, Limestone, Granite, 3D Ledger Cladding, Heavy Cobbles, and Jumbo Gangsaw Slabs calibrated for commercial and residential architecture.
          </p>
        </div>

        {/* ── DESKTOP: EXPANDING MONOLITHIC SLABS ACCORDION ── */}
        <div className="hidden md:flex h-[520px] lg:h-[560px] gap-2.5 w-full">
          {STONE_COLLECTIONS.map((stone, idx) => {
            const isActive = idx === activeIndex;

            return (
              <Link
                key={stone.id}
                href={stone.linkHref}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`relative overflow-hidden group block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? "flex-[3.5] lg:flex-[4]" : "flex-1"
                } bg-[#181615]`}
              >
                {/* Background Image */}
                <img
                  src={stone.imageUrl}
                  alt={stone.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${
                    isActive ? "scale-105 brightness-[0.88] contrast-[1.04]" : "scale-100 brightness-[0.65] contrast-[1.05]"
                  }`}
                />

                {/* Dark Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 pointer-events-none" />

                {/* ── ACTIVE PANEL EXPANDED VIEW ── */}
                {isActive ? (
                  <div className="relative z-10 w-full h-full flex flex-col justify-end p-6 lg:p-8">
                    {/* Bottom Content Area */}
                    <div className="max-w-xl">
                      <h3 className="text-2xl lg:text-3xl font-sans font-bold text-white tracking-wide flex items-center gap-2">
                        <span>{stone.name}</span>
                        <ArrowUpRight className="w-5 h-5 text-[#c85a32] opacity-90 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </h3>
                    </div>
                  </div>
                ) : (
                  /* ── INACTIVE COMPRESSED VERTICAL SLAB VIEW ── */
                  <div className="relative z-10 w-full h-full flex flex-col justify-center items-center py-6 px-2">
                    {/* Center: Vertical Architectural Spine Title */}
                    <div
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/90 whitespace-nowrap font-medium select-none"
                    >
                      {stone.name}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* ── MOBILE: INTERACTIVE SLAB STACK ── */}
        <div className="flex flex-col gap-4 md:hidden">
          {STONE_COLLECTIONS.map((stone, idx) => {
            const isExpanded = idx === activeIndex;

            return (
              <Link
                key={stone.id}
                href={stone.linkHref}
                onClick={(e) => {
                  if (!isExpanded) {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }
                }}
                className={`relative overflow-hidden block transition-all duration-500 ${
                  isExpanded ? "h-[260px]" : "h-[85px]"
                } bg-[#181615] rounded-none border border-[#747474]/20 cursor-pointer`}
              >
                <img
                  src={stone.imageUrl}
                  alt={stone.name}
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.75] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />

                <div className="relative z-10 w-full h-full p-4 flex flex-col justify-end">
                  {isExpanded ? (
                    <div>
                      <h3 className="text-xl font-sans font-bold text-white flex items-center gap-2">
                        <span>{stone.name}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#c85a32]" />
                      </h3>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-base font-sans font-bold text-white">
                        {stone.name}
                      </h3>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── BOTTOM ACTION BUTTON ── */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-9 py-3.5 bg-[#241919] hover:bg-[#c85a32] text-[#f1f5f9] rounded-full text-xs font-sans font-medium transition-all shadow-md hover:shadow-lg hover:translate-y-[-1px] cursor-pointer"
          >
            <span>View All Stone Slabs & Products</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#94a3b8]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
