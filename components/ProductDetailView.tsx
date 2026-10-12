"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Play,
  Check,
  Share2,
  Heart,
  Eye,
  ShieldCheck,
  Send,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ProductStone } from "@/lib/productsData";
import { useWishlist } from "@/context/WishlistContext";

interface ProductDetailViewProps {
  product: ProductStone;
  relatedProducts: ProductStone[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isItemWishlisted = isWishlisted(product.id);

  // Gallery state
  const galleryImages = [
    product.image,
    ...(product.gallery && product.gallery.length > 0 ? product.gallery : []),
    "/images/calibrated_stone_tiles.jpg",
    "/images/premium_slate_texture.jpg",
    "/images/stone_flooring_installation.jpg",
  ].filter((v, i, a) => v && a.indexOf(v) === i).slice(0, 5);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const currentHeroImage = galleryImages[selectedImageIndex] || product.image;

  // Finishes state (instead of colors)
  const defaultFinishes = [
    { id: "polished", label: "Polished", desc: "Mirror 95° Gloss" },
    { id: "honed", label: "Honed", desc: "Satin Smooth Matte" },
    { id: "flamed", label: "Flamed", desc: "Thermal Anti-Skid" },
    { id: "leathered", label: "Leathered", desc: "Brushed Tactile Relief" },
  ];

  const productFinishes =
    product.availableFinishes && product.availableFinishes.length > 0
      ? product.availableFinishes.map((f) => {
          const matched = defaultFinishes.find((d) => d.label.toLowerCase() === f.toLowerCase());
          return matched || { id: f.toLowerCase().replace(/\s+/g, "-"), label: f, desc: "Architectural Grade" };
        })
      : defaultFinishes;

  const [selectedFinishIndex, setSelectedFinishIndex] = useState(0);

  // Thickness options
  const thicknessOptions = ["18mm Gangsaw", "20mm Calibrated", "30mm Heavy-Duty"];
  const [selectedThickness, setSelectedThickness] = useState(thicknessOptions[1]);

  // Quantity container selector
  const [containersCount, setContainersCount] = useState(1);

  // Inquiry Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Gallery slider scroll ref
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — Pavan Stones Group`,
          text: product.tagline,
          url: window.location.href,
        });
      } catch (err) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleScrollSliderNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const handleScrollSliderPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const selectedFinish = productFinishes[selectedFinishIndex] || productFinishes[0];

  return (
    <div className="bg-white text-[#003049] min-h-screen pt-24 sm:pt-28 pb-20 selection:bg-[#ff5500]/15 selection:text-[#003049]">
      
      {/* ── TOP UTILITY & BREADCRUMB BAR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-6 sm:mb-8">
        <div className="flex items-center justify-between text-xs font-sans pb-3 border-b border-[#003049]/10">
          <nav className="flex items-center gap-2 text-[#003049]/60 truncate">
            <Link href="/" className="hover:text-[#ff5500] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#ff5500] transition-colors">
              Stone Catalog
            </Link>
            <span>/</span>
            <Link
              href={`/companies/${product.companySlug}`}
              className="hover:text-[#ff5500] transition-colors font-medium text-[#003049]"
            >
              {product.company}
            </Link>
            <span>/</span>
            <span className="text-[#003049] font-semibold truncate max-w-[160px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#003049]/20 hover:border-[#ff5500] text-[#003049] hover:text-[#ff5500] transition-colors cursor-pointer text-xs"
              title="Share Stone Dossier"
            >
              <Share2 size={13} />
              <span>{copiedLink ? "Copied!" : "Share"}</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#003049]/20 hover:border-red-500 text-[#003049] hover:text-red-500 transition-colors cursor-pointer text-xs"
              title="Add to Shortlist"
            >
              <Heart
                size={13}
                className={isItemWishlisted ? "fill-red-500 text-red-500" : ""}
              />
              <span>{isItemWishlisted ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MAIN PRODUCT SECTION (EXACT MATCH REFERENCE 2-COLUMN LAYOUT)
      ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── LEFT COLUMN: LARGE HERO PRODUCT IMAGE ── */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/4] sm:aspect-[4/4.2] w-full rounded-2xl overflow-hidden bg-[#f8fafc] border border-[#003049]/10 shadow-lg group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentHeroImage}
                  src={currentHeroImage}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </AnimatePresence>

              {/* Top Provenance Floating Tag */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#003049] text-xs font-sans font-semibold border border-white/60 shadow-xs">
                  {product.origin.split(",")[0]}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#003049] text-white text-xs font-sans font-medium shadow-xs">
                  {product.category.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: PRODUCT DETAILS & SPECIFICATIONS ── */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title Deck */}
            <div className="space-y-2">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#ff5500] font-bold block">
                {product.company} · Direct Quarry Reserve
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#003049] tracking-tight leading-[1.12]">
                {product.name}
              </h1>
            </div>

            {/* Thin Horizontal Divider Line (Matching Reference) */}
            <div className="w-full h-[1px] bg-[#003049]/15" />

            {/* Short Refined Description (Matching Reference) */}
            <p className="text-xs sm:text-[13.5px] font-sans font-light text-[#003049]/80 leading-relaxed">
              {product.tagline} {product.description.slice(0, 190)}...
            </p>

            {/* ── INSTEAD OF "COLOR": SURFACE FINISHES & TEXTURES SELECTOR ── */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-[#003049] font-semibold uppercase tracking-wider text-[11px]">
                  Surface Finish &amp; Texture
                </span>
                <span className="text-[#ff5500] font-medium text-xs">
                  {selectedFinish.label} ({selectedFinish.desc})
                </span>
              </div>

              {/* Finish Selector Chips */}
              <div className="flex flex-wrap items-center gap-2.5">
                {productFinishes.map((f, idx) => {
                  const isSelected = selectedFinishIndex === idx;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFinishIndex(idx)}
                      className={`px-4 py-2 rounded-lg text-xs font-sans font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                        isSelected
                          ? "bg-[#003049] text-white border-[#003049] shadow-sm ring-2 ring-[#00e5ff]/50"
                          : "bg-white text-[#003049] border-[#003049]/20 hover:border-[#ff5500] hover:text-[#ff5500]"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? "bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]" : "bg-[#003049]/30"
                        }`}
                      />
                      <span>{f.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── CALIBRATED THICKNESS SELECTOR ── */}
            <div className="space-y-2 pt-1">
              <span className="text-[#003049] font-semibold uppercase tracking-wider text-[11px] block">
                Calibrated Thickness
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {thicknessOptions.map((th) => {
                  const isSelected = selectedThickness === th;
                  return (
                    <button
                      key={th}
                      type="button"
                      onClick={() => setSelectedThickness(th)}
                      className={`px-3 py-1.5 rounded-md text-xs font-sans transition-all cursor-pointer border ${
                        isSelected
                          ? "border-[#ff5500] bg-[#ff5500]/10 text-[#ff5500] font-semibold"
                          : "border-[#003049]/15 text-[#003049]/70 hover:border-[#003049]/40"
                      }`}
                    >
                      {th}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── QUANTITY SELECTOR (MATCHING REFERENCE: - 01 +) ── */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-sans text-[#003049]/80 font-medium">Quantity:</span>
              <div className="flex items-center border border-[#003049]/20 rounded-md bg-white">
                <button
                  type="button"
                  onClick={() => setContainersCount(Math.max(1, containersCount - 1))}
                  className="w-8 h-8 flex items-center justify-center text-sm font-sans font-bold text-[#003049] hover:bg-[#003049]/5 transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-sans font-semibold text-sm text-[#003049]">
                  {containersCount < 10 ? `0${containersCount}` : containersCount}
                </span>
                <button
                  type="button"
                  onClick={() => setContainersCount(containersCount + 1)}
                  className="w-8 h-8 flex items-center justify-center text-sm font-sans font-bold text-[#003049] hover:bg-[#003049]/5 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
              <span className="text-xs font-sans text-[#003049]/60">
                Full 20ft Container (~{containersCount * 450} SQM / {containersCount * 28} MT)
              </span>
            </div>

            {/* ── PRIMARY ACTION BUTTON (MATCHING REFERENCE PILL BUTTON) ── */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full py-4 px-8 rounded-full bg-[#003049] text-white hover:bg-[#ff5500] font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.16em] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Request Export Quotation</span>
                <span className="text-white/40">•</span>
                <span className="text-[#00e5ff] group-hover:text-white transition-colors">Direct Quarry Pricing</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* ── BULLET SPECIFICATIONS LIST (MATCHING REFERENCE BULLET POINTS) ── */}
            <div className="pt-4 border-t border-[#003049]/10">
              <ul className="space-y-1.5 text-xs sm:text-[13px] font-sans font-light text-[#003049]/80 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#ff5500] font-bold">•</span>
                  <span>Geological Classification: <strong className="text-[#003049] font-medium">{product.category.toUpperCase()}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff5500] font-bold">•</span>
                  <span>Quarry Provenance: <strong className="text-[#003049] font-medium">{product.origin}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff5500] font-bold">•</span>
                  <span>Surface Calibration: <strong className="text-[#003049] font-medium">±0.5mm Diamond Sawn Precision</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff5500] font-bold">•</span>
                  <span>Compressive Strength: <strong className="text-[#003049] font-medium">{product.compressive || "180+ MPa ASTM C170 Certified"}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff5500] font-bold">•</span>
                  <span>Water Absorption: <strong className="text-[#003049] font-medium">{product.waterAbs || "< 0.12% (Zero Efflorescence)"}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff5500] font-bold">•</span>
                  <span>Export Packing: <strong className="text-[#003049] font-medium">ISPM-15 Heat-Treated Hardwood Wooden Crates</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff5500] font-bold">•</span>
                  <span>Ocean Transit SLA: <strong className="text-[#003049] font-medium">30–50 Days via Chennai Ocean Terminal (INMAA)</strong></span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM GALLERY SECTION (MATCHING REFERENCE BOTTOM ROW)
          Multi-image row with preview badge + navigation arrow
      ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-20 sm:mb-24">
        <div className="flex items-center justify-between pb-4">
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#ff5500] font-bold block">
            Detail Views &amp; Surface Inspections
          </span>

          {/* Navigation Arrows for Slider */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleScrollSliderPrev}
              className="w-8 h-8 rounded-full border border-[#003049]/20 flex items-center justify-center text-[#003049] hover:border-[#ff5500] hover:text-[#ff5500] transition-colors cursor-pointer"
              title="Previous Photo"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleScrollSliderNext}
              className="w-8 h-8 rounded-full border border-[#003049]/20 flex items-center justify-center text-[#003049] hover:border-[#ff5500] hover:text-[#ff5500] transition-colors cursor-pointer"
              title="Next Photo"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Gallery Cards Row */}
        <div
          ref={sliderRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth"
        >
          {galleryImages.slice(0, 4).map((imgUrl, idx) => {
            const isSelected = selectedImageIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden border cursor-pointer group transition-all duration-300 ${
                  isSelected
                    ? "border-[#ff5500] ring-2 ring-[#ff5500]/40 shadow-md"
                    : "border-[#003049]/15 hover:border-[#003049]/40 opacity-85 hover:opacity-100"
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${product.name} detail view ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Circular Play / 360 Indicator Icon on the First Item (Matching Reference) */}
                {idx === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/25 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-[#003049] fill-[#003049] ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Sub-label overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/75 to-transparent text-white text-[11px] font-sans">
                  <span>
                    {idx === 0
                      ? "360° Living Space"
                      : idx === 1
                      ? "Texture Micro-Audit"
                      : idx === 2
                      ? "Calibrated Dry-Lay"
                      : "Export Hardwood Crating"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          RELATED QUARRY SPECIMENS (CLEAN 3-CARD ROW)
      ══════════════════════════════════════════════════════════════ */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 border-t border-[#003049]/10">
          <div className="flex items-center justify-between pb-8">
            <div>
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#ff5500] font-bold block">
                Recommended Quarry Portfolios
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#003049] font-normal mt-1">
                Complementary Stone Selections
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-sans uppercase tracking-wider font-semibold text-[#ff5500] hover:text-[#003049] transition-colors"
            >
              Browse All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="group block rounded-xl overflow-hidden border border-[#003049]/10 bg-[#f8fafc] hover:border-[#ff5500] transition-all shadow-xs"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#003049] text-[10px] font-sans font-semibold">
                    {item.origin.split(",")[0]}
                  </div>
                </div>

                <div className="p-5 space-y-1.5">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#ff5500] font-bold block">
                    {item.company}
                  </span>
                  <h3 className="font-display text-lg font-medium text-[#003049] group-hover:text-[#ff5500] transition-colors truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs font-sans text-[#003049]/70 line-clamp-1">
                    {item.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL: REQUEST EXPORT QUOTATION & DOSSIER
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-[#003049]/15"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#003049]/20 flex items-center justify-center text-[#003049] hover:bg-[#003049]/5 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {quoteSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check size={28} />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-[#003049]">
                    Inquiry Received
                  </h3>
                  <p className="text-xs font-sans text-[#003049]/70 max-w-sm mx-auto">
                    Our direct export desk has received your specification for <strong>{product.name}</strong>. A technical dossier and CIF port estimate will be dispatched to your email.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsQuoteModalOpen(false);
                      setQuoteSubmitted(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#003049] text-white text-xs font-sans font-semibold uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setQuoteSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#ff5500] font-bold block">
                      Direct Quarry Export Desk
                    </span>
                    <h3 className="font-display text-2xl font-medium text-[#003049] mt-0.5">
                      Request Quotation: {product.name}
                    </h3>
                    <p className="text-xs font-sans text-[#003049]/70 mt-1">
                      Selected: {selectedFinish.label} · {selectedThickness} · {containersCount} Container(s)
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-sans font-semibold text-[#003049] uppercase tracking-wider mb-1">
                        Your Name / Practice
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Sarah Jenkins, Foster + Partners"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#003049]/20 text-xs font-sans text-[#003049] focus:outline-none focus:border-[#ff5500]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-sans font-semibold text-[#003049] uppercase tracking-wider mb-1">
                          Corporate Email
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="architect@domain.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#003049]/20 text-xs font-sans text-[#003049] focus:outline-none focus:border-[#ff5500]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-sans font-semibold text-[#003049] uppercase tracking-wider mb-1">
                          Destination Port / Country
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. Rotterdam / Houston"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#003049]/20 text-xs font-sans text-[#003049] focus:outline-none focus:border-[#ff5500]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-semibold text-[#003049] uppercase tracking-wider mb-1">
                        Project Notes / Special Edge Cuts
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Specify project type, slab sizing tolerances, or target delivery window..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#003049]/20 text-xs font-sans text-[#003049] focus:outline-none focus:border-[#ff5500] resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#ff5500] text-white hover:bg-[#e04a00] font-sans font-semibold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer mt-4"
                  >
                    Send Quotation Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
