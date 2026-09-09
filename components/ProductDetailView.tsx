"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Phone,
  MessageSquare,
  Package,
  Layers,
  ShieldCheck,
  Building2,
  FileText,
  Share2,
  Heart,
  ChevronRight,
  Maximize2,
  Send,
  Compass,
  Palette,
  ArrowRight,
  Truck,
  Anchor,
} from "lucide-react";
import { ProductStone } from "@/lib/productsData";

interface ProductDetailViewProps {
  product: ProductStone;
  relatedProducts: ProductStone[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const quoteFormRef = useRef<HTMLDivElement>(null);

  // Quote Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    quantity: "",
    projectType: "Commercial Facade / Flooring",
    notes: "",
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — Pavan Stones Group`,
          text: product.tagline,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleScrollToQuote = () => {
    if (quoteFormRef.current) {
      quoteFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const currentGalleryImage = product.gallery[selectedImage] || product.image;
  const activeFinishDetail = product.finishesDetail[selectedFinish] || product.finishesDetail[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Pavan Groups team, I am interested in specifying "${product.name}" (${product.id}) for an upcoming project. Could you please share export pricing, availability, and container loading details?`
  );
  const whatsappUrl = `https://wa.me/919440271259?text=${whatsappMessage}`;

  return (
    <div className="bg-white text-[#241919] min-h-screen pt-24 sm:pt-28 pb-20">
      
      {/* ── BREADCRUMB & UTILITY BAR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#747474]/15 pb-4 text-xs font-mono">
          
          <nav className="flex items-center gap-2 text-[#747474] flex-wrap">
            <Link href="/" className="hover:text-[#c85a32] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#c85a32] transition-colors">
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/companies/${product.companySlug}`}
              className="text-[#c85a32] font-medium hover:underline"
            >
              {product.company}
            </Link>
            <span>/</span>
            <span className="text-[#241919] font-bold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#747474]/20 hover:border-[#c85a32] text-[#241919] hover:text-[#c85a32] transition-all cursor-pointer text-xs"
              title="Share Stone Dossier"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? "Link Copied!" : "Share"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#747474]/20 hover:border-[#c85a32] text-[#241919] transition-all cursor-pointer text-xs"
              title="Save to Project Shortlist"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  isWishlisted ? "fill-[#d94e34] text-[#d94e34]" : "text-[#747474]"
                }`}
              />
              <span>{isWishlisted ? "Shortlisted" : "Shortlist"}</span>
            </button>

            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-[#747474] hover:text-[#241919] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalog</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ── HERO SECTION: INTERACTIVE GALLERY & PRODUCT IDENTITY ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: MULTI-IMAGE GALLERY (6 COLS) */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28 self-start">
            
            {/* Main Primary Viewer */}
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#18191c] border border-[#747474]/20 shadow-md group">
              <img
                src={currentGalleryImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Texture Gradient Shimmer Fallback Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{ background: product.gradient }}
              />


              {/* Zoom Trigger Button */}
              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                title="Enlarge Texture View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === idx
                      ? "border-[#c85a32] shadow-sm scale-[1.02]"
                      : "border-[#747474]/20 opacity-70 hover:opacity-100 hover:border-[#747474]/50"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </button>
              ))}
            </div>

            {/* Direct Quarry Guarantee Banner */}
            <div className="p-4 bg-[#faf8f5] border border-[#747474]/15 rounded-xl flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#c85a32]/10 border border-[#c85a32]/20 flex items-center justify-center text-[#c85a32] flex-none">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-[#241919]">
                    100% Direct Quarry Reserve
                  </h4>
                  <p className="text-[11px] text-[#747474] font-light">
                    Direct block selection, multi-blade gangsaw processing, and zero third-party broker markups.
                  </p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono font-semibold uppercase tracking-wider text-[#c85a32] bg-white px-2.5 py-1 rounded border border-[#747474]/15">
                ISPM-15 Certified
              </span>
            </div>

          </div>

          {/* RIGHT: COMPLETE ARCHITECTURAL STONE DOSSIER (6 COLS) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 1. Header: Brand, Classification, Provenance & Stone Title */}
            <div className="space-y-2 border-b border-[#747474]/15 pb-5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c85a32]" />
                  <Link
                    href={`/companies/${product.companySlug}`}
                    className="text-xs font-mono uppercase tracking-[0.22em] text-[#c85a32] font-bold hover:underline"
                  >
                    {product.company}
                  </Link>
                  <span className="text-[#747474]/40">·</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#747474]">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#747474]">
                  <MapPin className="w-3.5 h-3.5 text-[#c85a32]" />
                  <span>{product.origin}</span>
                </div>
              </div>

              <h1 className="font-display font-light text-3xl sm:text-4xl lg:text-[40px] text-[#241919] leading-[1.12] tracking-tight">
                {product.name}
              </h1>

              <p className="font-serif italic text-sm sm:text-base text-[#555555] leading-relaxed">
                &ldquo;{product.tagline}&rdquo;
              </p>

              <p className="text-xs sm:text-[13.5px] text-[#747474] font-light leading-relaxed pt-1">
                {product.description}
              </p>
            </div>

            {/* 2. COMPLETE SPECIFICATIONS DOSSIER CARD */}
            <div className="bg-[#faf8f5] border border-[#747474]/20 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xs">
              
              <div className="flex items-center justify-between border-b border-[#747474]/15 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#c85a32]" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#241919] font-bold">
                    Architectural Specifications &amp; Data Sheet
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#747474] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[#747474]/15">
                  ASTM / EN Audited
                </span>
              </div>

              {/* A. SIZES & FORMATS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#747474] font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#c85a32]" />
                    Available Formats &amp; Dimensions
                  </span>
                  <span className="text-[10.5px] font-mono text-[#c85a32] font-semibold">
                    Calibrated ±1mm
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((sz) => (
                    <span
                      key={sz}
                      className="px-3 py-1.5 bg-white border border-[#747474]/20 rounded-lg text-xs font-mono font-medium text-[#241919] shadow-3xs hover:border-[#c85a32] transition-colors"
                    >
                      {sz}
                    </span>
                  ))}
                  <span className="px-3 py-1.5 bg-white/60 border border-dashed border-[#747474]/30 rounded-lg text-xs font-mono text-[#747474]">
                    + Bespoke CAD Cut-to-Size
                  </span>
                </div>
              </div>

              {/* B. SURFACE FINISHES WITH INTERACTIVE SELECTOR */}
              <div className="space-y-2.5 pt-3 border-t border-[#747474]/15">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#747474] font-bold flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-[#c85a32]" />
                    Surface Textures &amp; Finishes
                  </span>
                  <span className="text-[10px] font-mono text-[#747474]">
                    Click finish to preview
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {product.finishesDetail.map((fn, idx) => (
                    <button
                      key={fn.name}
                      type="button"
                      onClick={() => setSelectedFinish(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        selectedFinish === idx
                          ? "bg-[#241919] text-white font-bold shadow-xs border border-[#241919]"
                          : "bg-white text-[#241919] border border-[#747474]/20 hover:border-[#c85a32]"
                      }`}
                    >
                      {fn.name}
                    </button>
                  ))}
                </div>

                {/* Active Finish Interactive Callout */}
                <div className="p-3 bg-white rounded-xl border border-[#747474]/15 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-[#c85a32]">{activeFinishDetail.name}</span>
                    <span className="text-[#747474]">{activeFinishDetail.texture}</span>
                  </div>
                  <p className="text-[11.5px] text-[#555555] font-light leading-relaxed">
                    {activeFinishDetail.description}
                  </p>
                  <div className="text-[10.5px] font-mono text-[#747474] pt-0.5">
                    Recommended for: <span className="font-medium text-[#241919]">{activeFinishDetail.recommendedFor}</span>
                  </div>
                </div>
              </div>

              {/* C. THICKNESS & QUARRY PROVENANCE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#747474]/15">
                <div className="bg-white p-3 rounded-xl border border-[#747474]/15">
                  <span className="text-[10px] font-mono uppercase text-[#747474] block">
                    Calibrated Thickness
                  </span>
                  <span className="font-mono font-bold text-sm text-[#241919] mt-0.5 block">
                    {product.thickness}
                  </span>
                  <span className="text-[10px] text-[#747474] font-light block mt-0.5">
                    Zero hollow-bed calibration
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#747474]/15">
                  <span className="text-[10px] font-mono uppercase text-[#747474] block">
                    Quarry Provenance
                  </span>
                  <span className="font-mono font-bold text-sm text-[#241919] mt-0.5 block truncate">
                    {product.quarryType}
                  </span>
                  <span className="text-[10px] text-[#747474] font-light block mt-0.5 truncate">
                    {product.origin}
                  </span>
                </div>
              </div>

              {/* D. CERTIFIED ENGINEERING & LABORATORY METRICS (6-CELL MATRIX) */}
              <div className="space-y-2 pt-3 border-t border-[#747474]/15">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#747474] font-bold block">
                  Certified Geotechnical &amp; Lab Data
                </span>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2.5 rounded-lg border border-[#747474]/15">
                    <span className="text-[9.5px] font-mono uppercase text-[#747474] block">Density</span>
                    <span className="font-mono font-bold text-xs text-[#241919] mt-0.5 block">{product.density}</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-[#747474]/15">
                    <span className="text-[9.5px] font-mono uppercase text-[#747474] block">Compressive</span>
                    <span className="font-mono font-bold text-xs text-[#241919] mt-0.5 block">{product.compressive}</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-[#747474]/15">
                    <span className="text-[9.5px] font-mono uppercase text-[#747474] block">Water Abs.</span>
                    <span className="font-mono font-bold text-xs text-[#241919] mt-0.5 block">{product.waterAbs}</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-[#747474]/15">
                    <span className="text-[9.5px] font-mono uppercase text-[#747474] block">Slip Rating</span>
                    <span className="font-mono font-bold text-xs text-[#241919] mt-0.5 block">{product.slipResistance.split(" ")[0]}</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-[#747474]/15">
                    <span className="text-[9.5px] font-mono uppercase text-[#747474] block">Mohs Hardness</span>
                    <span className="font-mono font-bold text-xs text-[#241919] mt-0.5 block">{product.mohsHardness}</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-[#747474]/15">
                    <span className="text-[9.5px] font-mono uppercase text-[#747474] block">Flexural Rupture</span>
                    <span className="font-mono font-bold text-xs text-[#241919] mt-0.5 block">{product.flexuralStrength}</span>
                  </div>
                </div>
              </div>

              {/* E. RECOMMENDED ARCHITECTURAL APPLICATIONS */}
              <div className="space-y-2 pt-3 border-t border-[#747474]/15">
                <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#747474] font-bold block">
                  Recommended Architectural Applications
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.applications.map((app, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white border border-[#747474]/15 rounded-md text-[11px] font-mono text-[#241919] flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c85a32]" />
                      {app.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* F. EXPORT PACKING & FREIGHT DISPATCH */}
              <div className="pt-3 border-t border-[#747474]/15 text-xs font-mono space-y-1.5">
                <span className="text-[10.5px] uppercase tracking-wider text-[#747474] font-bold flex items-center gap-1.5">
                  <Anchor className="w-3.5 h-3.5 text-[#0f172a]" />
                  Export Packaging &amp; Ocean Freight
                </span>
                <div className="bg-white p-3 rounded-xl border border-[#747474]/15 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#747474]">Loading Port:</span>
                    <span className="font-bold text-[#241919]">{product.exportPackaging.portOfLoading}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#747474]">Crate Standard:</span>
                    <span className="font-semibold text-[#241919]">{product.exportPackaging.crateType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#747474]">20ft FCL Capacity:</span>
                    <span className="font-semibold text-[#241919]">{product.exportPackaging.containerCapacity}</span>
                  </div>
                </div>
              </div>

              {/* G. DIRECT QUARRY QUALITY HIGHLIGHTS */}
              <div className="pt-2 border-t border-[#747474]/15 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#555555]">
                {product.features.slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c85a32] mt-0.5 flex-none" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* 3. Primary Action Group */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <Link
                  href={`/request-sample?stone=${product.id}`}
                  className="flex-1 py-3.5 px-4 bg-[#c85a32] hover:bg-[#b04a25] text-white rounded-xl text-xs font-sans font-semibold uppercase tracking-wider text-center transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>Request Physical Sample</span>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center"
                  title="Direct WhatsApp with Stone Specialist"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>

              <button
                type="button"
                onClick={handleScrollToQuote}
                className="w-full py-3.5 px-4 bg-[#241919] hover:bg-[#3e352a] text-white rounded-xl text-xs font-sans font-semibold uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get Container / Project Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ── INLINE PROJECT QUOTE / INQUIRY FORM ── */}
      <section ref={quoteFormRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="bg-white border border-[#747474]/20 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#c85a32] font-semibold">
              Direct Factory Pricing
            </span>
            <h2 className="font-display font-light text-2xl sm:text-3xl md:text-4xl text-[#241919]">
              Inquire About {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#747474] font-light">
              Connect directly with our quarry engineers for custom cutting, bulk container logistics, or technical test sheets.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 bg-[#faf8f5] border border-[#c85a32]/30 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#c85a32] mx-auto" />
              <h3 className="font-display font-medium text-xl text-[#241919]">
                Quotation Request Received
              </h3>
              <p className="text-xs text-[#747474] max-w-md mx-auto">
                Thank you! Our technical sales director will review your specification for{" "}
                <span className="font-semibold text-[#241919]">{product.name}</span> and contact you within 12 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe / Architect"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@studioarchitecture.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1">
                    Delivery Destination / Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sydney, Australia / Dubai, UAE"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 500 m² or 1x 20ft Container"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1">
                    Project Typology
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919] bg-white cursor-pointer"
                  >
                    <option>Commercial Facade / Rainscreen</option>
                    <option>Hotel &amp; Resort Development</option>
                    <option>Luxury Residential Villa</option>
                    <option>Civic / Plaza Paving</option>
                    <option>Stone Wholesale / Distribution</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1">
                  Specific Dimensions, Finishes or Edge Profiles
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention desired thicknesses, delivery deadlines, or project details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4 flex-wrap">
                <span className="text-[10px] text-[#747474] font-mono">
                  Quarry direct export contracts guaranteed.
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#c85a32] hover:bg-[#b04a25] text-white rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Specification Request</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </section>

      {/* ── RELATED & COMPLEMENTARY STONES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          
          <div className="flex items-center justify-between border-b border-[#747474]/15 pb-4">
            <div>
              <span className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#c85a32] font-semibold">
                Curated Companions
              </span>
              <h2 className="font-display font-light text-2xl sm:text-3xl text-[#241919] mt-1">
                Complementary Natural Stones
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-mono uppercase tracking-wider text-[#c85a32] font-semibold hover:underline"
            >
              View Full Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.id}`}
                className="group border border-[#747474]/20 rounded-xl overflow-hidden bg-white shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#18191c]">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-mono px-2.5 py-1 rounded">
                    {rel.company}
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-sans font-bold text-sm sm:text-[15px] text-[#241919] group-hover:text-[#c85a32] transition-colors leading-snug">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-[#747474] line-clamp-1 font-light">
                    {rel.tagline}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#c85a32] font-semibold">
                    <span>Explore Stone</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── IMAGE ZOOM MODAL ── */}
      <AnimatePresence>
        {isZoomed && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentGalleryImage}
                alt={product.name}
                className="w-full h-full object-contain max-h-[85vh]"
              />
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer hover:bg-black"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
