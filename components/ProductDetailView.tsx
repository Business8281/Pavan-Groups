"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageSquare,
  Package,
  Layers,
  ShieldCheck,
  FileText,
  Heart,
  ChevronRight,
  Send,
  Compass,
  ArrowRight,
  Truck,
  Download,
  Sparkles,
  Check,
  ExternalLink,
  Info,
  ChevronDown,
  Share,
  Eye,
  CircleCheck as CheckCircle2,
} from "@animateicons/react/lucide";
import { ProductStone } from "@/lib/productsData";
import ProductSceneVisualizer from "./ProductSceneVisualizer";
import ProductContainerCalculator from "./ProductContainerCalculator";
import StoneTextureRotator from "./StoneTextureRotator";

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
  const [activeTab, setActiveTab] = useState<"engineering" | "provenance" | "packaging" | "installation">("engineering");

  // Sticky Glass Dock state
  const [showStickyDock, setShowStickyDock] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // 3D Mouse Tilt Motion Values for Hero Image
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 30 });

  const handleMouseMoveHero = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeaveHero = () => {
    x.set(0);
    y.set(0);
  };

  // Quote Form State & Refs
  const quoteFormRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const rotatorRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    quantity: "",
    projectType: "Commercial Facade / Rainscreen",
    notes: "",
  });

  // Scroll position tracking for Sticky Glass Dock
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyDock(true);
      } else {
        setShowStickyDock(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — Pavan Stones Group`,
          text: product.tagline,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
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

  const handleScrollToCalculator = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const currentGalleryImage = product.gallery[selectedImage] || product.image;
  const activeFinishDetail = product.finishesDetail[selectedFinish] || product.finishesDetail[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Pavan Stones Group team, I am interested in specifying "${product.name}" (${product.id}) for an upcoming project. Could you please share export pricing, availability, and container loading details?`
  );
  const whatsappUrl = `https://wa.me/919440271259?text=${whatsappMessage}`;

  // Parse numeric values for visual strength indicators
  const parseNum = (str: string) => {
    const cleaned = str.replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  };

  const compressiveVal = parseNum(product.compressive);

  return (
    <div className="bg-[#faf8f5] text-[#241919] min-h-screen pt-24 sm:pt-28 pb-24 relative overflow-hidden">
      
      {/* ── BREADCRUMB & UTILITY HEADER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#747474]/15 pb-4 text-xs font-mono">
          
          <nav className="flex items-center gap-2 text-[#747474] flex-wrap">
            <Link href="/" className="hover:text-[#c85a32] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#c85a32] transition-colors">
              Catalog
            </Link>
            <span>/</span>
            <Link
              href={`/companies/${product.companySlug}`}
              className="text-[#c85a32] font-medium hover:underline"
            >
              {product.company}
            </Link>
            <span>/</span>
            <span className="text-[#241919] font-bold truncate max-w-[180px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#747474]/20 hover:border-[#c85a32] bg-white text-[#241919] hover:text-[#c85a32] transition-all cursor-pointer text-xs font-medium shadow-3xs"
              title="Share Stone Dossier"
            >
              <Share size={14} />
              <span>{copied ? "Link Copied!" : "Share Dossier"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#747474]/20 hover:border-[#c85a32] bg-white text-[#241919] transition-all cursor-pointer text-xs font-medium shadow-3xs"
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#747474] hover:text-[#241919] transition-colors text-xs font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ── HERO SECTION: 3D PERSPECTIVE HERO VIEWER & SPEC DOSSIER ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT: 3D TILT GALLERY VIEWER (6 COLS) */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28 self-start">
            
            {/* 3D Motion Perspective Card */}
            <motion.div
              onMouseMove={(e) => {
                handleMouseMoveHero(e);
                setIsHeroHovered(true);
              }}
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => {
                handleMouseLeaveHero();
                setIsHeroHovered(false);
              }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-[#18191c] border border-[#747474]/20 shadow-xl group cursor-pointer"
            >
              {product.gallery && product.gallery.length === 2 ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={product.gallery[0]}
                    alt={`${product.name} - Primary View`}
                    className={`absolute inset-0 w-full h-full object-contain p-2 transition-all duration-700 ease-in-out ${
                      isHeroHovered ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                    }`}
                  />
                  <img
                    src={product.gallery[1]}
                    alt={`${product.name} - Hover Alternate View`}
                    className={`absolute inset-0 w-full h-full object-contain p-2 transition-all duration-700 ease-in-out ${
                      isHeroHovered ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                    }`}
                  />
                </div>
              ) : (
                <img
                  src={currentGalleryImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}

              {/* Dual-Hover Flip Indicator Badge */}
              {product.gallery && product.gallery.length === 2 && (
                <div className="absolute top-4 right-16 z-10 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-2 shadow-lg">
                  <span className={`w-2 h-2 rounded-full ${isHeroHovered ? "bg-emerald-400" : "bg-amber-400"} animate-pulse`} />
                  <span className="font-semibold">{isHeroHovered ? "Hover View: Seated Ganesha" : "Hover to Flip View"}</span>
                </div>
              )}

              {/* Cursor Specular Beam Effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-40"
                style={{ background: product.gradient }}
              />

              {/* Provenance Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono tracking-wider shadow-lg">
                  {product.origin.split(",")[0]}
                </span>
                <span className="px-2.5 py-1.5 rounded-xl bg-[#c85a32]/90 backdrop-blur-md text-white text-[10px] font-mono uppercase font-bold tracking-wider shadow-lg">
                  {product.company}
                </span>
              </div>

              {/* Fullscreen Lightbox Trigger */}
              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-xl hover:scale-110"
                title="Enlarge Texture View"
              >
                <Eye size={16} />
              </button>

              {/* 3D Tilt Visual Indicator */}
              <div className="absolute bottom-4 left-4 z-10 text-[10px] font-mono text-white/70 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                Move cursor to tilt 3D depth
              </div>
            </motion.div>

            {/* Micro Thumbnail Navigation Bar */}
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((imgUrl, idx) => (
                <motion.button
                  key={idx}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === idx
                      ? "border-[#c85a32] shadow-md ring-2 ring-[#c85a32]/30"
                      : "border-[#747474]/20 opacity-70 hover:opacity-100 hover:border-[#747474]/40"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} specimen ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </motion.button>
              ))}
            </div>

            {/* Direct Quarry Certification Banner */}
            <div className="p-4 bg-white border border-[#747474]/20 rounded-2xl flex items-center justify-between gap-4 flex-wrap shadow-3xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#c85a32]/10 border border-[#c85a32]/20 flex items-center justify-center text-[#c85a32] flex-none">
                  <ShieldCheck className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-[#241919]">
                    100% Direct Quarry Reserve
                  </h4>
                  <p className="text-[11px] text-[#747474] font-light">
                    Direct block selection, multi-blade gangsaw processing, zero third-party markups.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#c85a32] bg-[#faf8f5] px-2.5 py-1 rounded-lg border border-[#747474]/15">
                ISPM-15 Certified
              </span>
            </div>

          </div>

          {/* RIGHT: SPECIFICATION DOSSIER & ACTIONS (6 COLS) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header Title & Provenance */}
            <div className="space-y-3 border-b border-[#747474]/15 pb-6">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c85a32] animate-ping" />
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

              <h1 className="font-display font-light text-3xl sm:text-4xl lg:text-[44px] text-[#241919] leading-[1.1] tracking-tight">
                {product.name}
              </h1>

              <p className="font-serif italic text-base sm:text-lg text-[#555555] leading-relaxed">
                &ldquo;{product.tagline}&rdquo;
              </p>

              <p className="text-xs sm:text-[13.5px] text-[#747474] font-light leading-relaxed pt-1">
                {product.description}
              </p>
            </div>

            {/* Specification Dossier Card */}
            <div className="bg-white border border-[#747474]/20 rounded-3xl p-6 space-y-5 shadow-xs">
              
              <div className="flex items-center justify-between border-b border-[#747474]/15 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#c85a32]" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#241919] font-bold">
                    Architectural Specification Dossier
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#747474] uppercase tracking-wider bg-[#faf8f5] px-2 py-0.5 rounded border border-[#747474]/15">
                  ASTM / EN Certified
                </span>
              </div>

              {/* Formats */}
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
                      className="px-3 py-1.5 bg-[#faf8f5] border border-[#747474]/20 rounded-xl text-xs font-mono font-medium text-[#241919] shadow-3xs hover:border-[#c85a32] transition-colors"
                    >
                      {sz}
                    </span>
                  ))}
                  <span className="px-3 py-1.5 bg-white border border-dashed border-[#747474]/30 rounded-xl text-xs font-mono text-[#747474]">
                    + Bespoke CAD Cut-to-Size
                  </span>
                </div>
              </div>

              {/* Interactive Finishes Inspector Selector */}
              <div className="space-y-3 pt-3 border-t border-[#747474]/15">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#747474] font-bold flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#c85a32]" />
                    Surface Textures &amp; Finishes Inspector
                  </span>
                  <span className="text-[10px] font-mono text-[#747474]">
                    Select finish to preview
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {product.finishesDetail.map((fn, idx) => (
                    <button
                      key={fn.name}
                      type="button"
                      onClick={() => setSelectedFinish(idx)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        selectedFinish === idx
                          ? "bg-[#241919] text-white font-bold shadow-sm border border-[#241919]"
                          : "bg-[#faf8f5] text-[#241919] border border-[#747474]/20 hover:border-[#c85a32]"
                      }`}
                    >
                      {fn.name}
                    </button>
                  ))}
                </div>

                {/* Active Finish Description Card */}
                <motion.div
                  key={activeFinishDetail.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#c85a32]">{activeFinishDetail.name}</span>
                    <span className="text-[#747474] bg-white px-2 py-0.5 rounded border border-[#747474]/15">{activeFinishDetail.texture}</span>
                  </div>
                  <p className="text-[12px] text-[#555555] font-light leading-relaxed">
                    {activeFinishDetail.description}
                  </p>
                  <div className="text-[11px] font-mono text-[#747474] pt-1 border-t border-[#747474]/10">
                    Recommended for: <span className="font-semibold text-[#241919]">{activeFinishDetail.recommendedFor}</span>
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <Link
                  href={`/request-sample?stone=${product.id}`}
                  className="flex-1 py-4 px-5 bg-[#c85a32] hover:bg-[#b04a25] text-white rounded-2xl text-xs font-sans font-semibold uppercase tracking-wider text-center transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>Request Physical Sample Box</span>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                  title="Direct WhatsApp with Stone Specialist"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider hidden sm:inline">WhatsApp Specifier</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleScrollToQuote}
                  className="py-3.5 px-4 bg-[#241919] hover:bg-[#3e352a] text-white rounded-2xl text-xs font-sans font-semibold uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Inquire Container Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleScrollToCalculator}
                  className="py-3.5 px-4 bg-white border border-[#747474]/25 hover:border-[#c85a32] text-[#241919] hover:text-[#c85a32] rounded-2xl text-xs font-sans font-semibold uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Package size={14} className="text-[#c85a32]" />
                  <span>Container Estimator</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </motion.section>

      {/* ── 360° SOLAR LIGHTING & TEXTURE INSPECTOR ── */}
      <motion.section
        ref={rotatorRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24"
      >
        <StoneTextureRotator product={product} />
      </motion.section>

      {/* ── IN-SITU ARCHITECTURAL SCENE SIMULATOR ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24"
      >
        <ProductSceneVisualizer product={product} />
      </motion.section>

      {/* ── LIVE CONTAINER & FREIGHT CALCULATOR ── */}
      <motion.section
        ref={calculatorRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24"
      >
        <ProductContainerCalculator
          product={product}
          onQuoteRequested={(areaM2, containerCount) => {
            setFormData((prev) => ({
              ...prev,
              quantity: `${areaM2.toFixed(0)} m² (~${containerCount} 20ft container${containerCount > 1 ? "s" : ""})`,
            }));
            handleScrollToQuote();
          }}
        />
      </motion.section>

      {/* ── TABBED ARCHITECTURAL TECHNICAL DOSSIER WITH MORPHING TABS ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24"
      >
        <div className="bg-white border border-[#747474]/20 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#747474]/15 pb-6">
            <div className="space-y-1">
              <span className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#c85a32] font-semibold">
                Technical Data Sheet
              </span>
              <h2 className="font-display font-light text-2xl sm:text-3xl text-[#241919]">
                Geotechnical &amp; Architectural Dossier
              </h2>
            </div>

            {/* Framer Motion LayoutId Morphing Tabs */}
            <div className="flex items-center bg-[#faf8f5] p-1.5 rounded-2xl border border-[#747474]/20 flex-wrap gap-1 relative">
              {[
                { id: "engineering", label: "Lab & ASTM Specs" },
                { id: "provenance", label: "Quarry Provenance" },
                { id: "packaging", label: "Export Packaging" },
                { id: "installation", label: "Installation Guide" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer z-10 ${
                      isActive ? "text-white font-bold" : "text-[#747474] hover:text-[#241919]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-[#241919] rounded-xl z-[-1] shadow-xs"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: GEOTECHNICAL LAB SPECS WITH ANIMATED PROGRESS METERS */}
          {activeTab === "engineering" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Density */}
                <div className="p-5 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#747474] uppercase font-bold">Volumetric Density</span>
                    <span className="text-[#c85a32] font-bold">ASTM C97</span>
                  </div>
                  <span className="font-mono font-bold text-2xl text-[#241919] block">
                    {product.density}
                  </span>
                  <p className="text-[11px] text-[#747474] font-light">
                    High micro-crystalline mass providing structural longevity.
                  </p>
                </div>

                {/* Compressive Strength with Animated Fill Meter */}
                <div className="p-5 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#747474] uppercase font-bold">Compressive Strength</span>
                    <span className="text-[#c85a32] font-bold">ASTM C170</span>
                  </div>
                  <span className="font-mono font-bold text-2xl text-[#241919] block">
                    {product.compressive}
                  </span>
                  <div className="w-full h-2.5 bg-[#747474]/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, (compressiveVal / 220) * 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-[#c85a32] rounded-full"
                    />
                  </div>
                </div>

                {/* Water Absorption */}
                <div className="p-5 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#747474] uppercase font-bold">Water Absorption</span>
                    <span className="text-[#c85a32] font-bold">ASTM C97</span>
                  </div>
                  <span className="font-mono font-bold text-2xl text-[#241919] block">
                    {product.waterAbs}
                  </span>
                  <p className="text-[11px] text-[#747474] font-light">
                    Ultra-low porosity, resisting acid rain and freeze-thaw cycles.
                  </p>
                </div>

                {/* Slip Rating */}
                <div className="p-5 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#747474] uppercase font-bold">Slip Resistance</span>
                    <span className="text-[#c85a32] font-bold">DIN 51130</span>
                  </div>
                  <span className="font-mono font-bold text-2xl text-[#241919] block">
                    {product.slipResistance}
                  </span>
                  <p className="text-[11px] text-[#747474] font-light">
                    Certified anti-skid traction for wet decks and public plazas.
                  </p>
                </div>

                {/* Mohs Hardness */}
                <div className="p-5 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#747474] uppercase font-bold">Mohs Hardness Scale</span>
                    <span className="text-[#c85a32] font-bold">EN 101</span>
                  </div>
                  <span className="font-mono font-bold text-2xl text-[#241919] block">
                    {product.mohsHardness}
                  </span>
                  <p className="text-[11px] text-[#747474] font-light">
                    Scratch resistant against heavy footwear and commercial footfall.
                  </p>
                </div>

                {/* Flexural Strength */}
                <div className="p-5 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#747474] uppercase font-bold">Flexural Rupture</span>
                    <span className="text-[#c85a32] font-bold">ASTM C880</span>
                  </div>
                  <span className="font-mono font-bold text-2xl text-[#241919] block">
                    {product.flexuralStrength}
                  </span>
                  <p className="text-[11px] text-[#747474] font-light">
                    High bending resistance under mechanical load.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: QUARRY PROVENANCE */}
          {activeTab === "provenance" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c85a32]/10 border border-[#c85a32]/20 text-[#c85a32] text-xs font-mono rounded-lg">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Geological Provenance</span>
                </div>
                <h3 className="font-display font-light text-2xl sm:text-3xl text-[#241919]">
                  Extracted Directly From {product.origin}
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
                  Pavan Stones Group holds direct open-cast quarry reserves in {product.origin}. Our stone blocks are selectively harvested using non-explosive wire-saw technology to eliminate internal stress fractures.
                </p>
                <div className="space-y-2 pt-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c85a32]" />
                    <span>Quarry Type: {product.quarryType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c85a32]" />
                    <span>Guaranteed Lot-to-Lot Color Uniformity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c85a32]" />
                    <span>Zero Third-Party Brokerage Markup</span>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-[#747474]/20 shadow-md">
                <img
                  src={product.image}
                  alt={`${product.name} Quarry`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-xs font-mono text-[#c85a32] uppercase font-bold">Quarry Reserve</span>
                    <h4 className="font-display text-xl">{product.name} Block Harvesting</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: EXPORT PACKAGING */}
          {activeTab === "packaging" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-4 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-1">
                  <span className="text-[10px] uppercase text-[#747474] font-bold">Crate Standard</span>
                  <span className="font-bold text-sm text-[#241919] block">{product.exportPackaging.crateType}</span>
                </div>
                <div className="p-4 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-1">
                  <span className="text-[10px] uppercase text-[#747474] font-bold">Crate Capacity</span>
                  <span className="font-bold text-sm text-[#241919] block">{product.exportPackaging.palletCapacity}</span>
                </div>
                <div className="p-4 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-1">
                  <span className="text-[10px] uppercase text-[#747474] font-bold">20ft FCL Payload</span>
                  <span className="font-bold text-sm text-[#241919] block">{product.exportPackaging.containerCapacity}</span>
                </div>
                <div className="p-4 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-1">
                  <span className="text-[10px] uppercase text-[#747474] font-bold">Fumigation</span>
                  <span className="font-bold text-sm text-[#241919] block">{product.exportPackaging.fumigation}</span>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#747474]/20 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-[#241919]">
                    Export Sea Freight Ports
                  </h4>
                  <p className="text-xs text-[#747474] font-light">
                    Direct shipping from <span className="font-bold text-[#241919]">{product.exportPackaging.portOfLoading}</span> with full phyto-sanitary inspection certificates.
                  </p>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#c85a32] bg-[#faf8f5] px-3 py-1.5 rounded-xl border border-[#747474]/15 font-semibold">
                  FOB / CIF Export Contract
                </span>
              </div>
            </motion.div>
          )}

          {/* TAB 4: INSTALLATION GUIDE */}
          {activeTab === "installation" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 text-xs sm:text-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-2">
                  <h4 className="font-sans font-bold text-sm text-[#241919] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c85a32]" />
                    <span>Adhesive &amp; Substrate Preparation</span>
                  </h4>
                  <p className="text-xs text-[#555555] font-light leading-relaxed">
                    Use high-polymer modified thin-set adhesives (ANSI A118.4 / EN 12004 C2TE standard). Ensure substrate is structurally sound, cured 28 days, and free of dust or oil.
                  </p>
                </div>

                <div className="p-5 bg-[#faf8f5] rounded-2xl border border-[#747474]/15 space-y-2">
                  <h4 className="font-sans font-bold text-sm text-[#241919] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c85a32]" />
                    <span>Sealer &amp; Impregnator Recommendations</span>
                  </h4>
                  <p className="text-xs text-[#555555] font-light leading-relaxed">
                    For exterior facades and wet pool decks, apply a penetrating fluoropolymer stone sealer to maintain oil and water stain protection while preserving natural stone breathability.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </motion.section>

      {/* ── REDESIGNED CAD / BIM ASSET HUB (LIGHT THEME CARD WITH DARK CTA) ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24"
      >
        <div className="bg-white text-[#241919] rounded-3xl p-6 sm:p-10 border border-[#747474]/20 shadow-sm flex flex-wrap items-center justify-between gap-8 relative overflow-hidden group">
          
          <div className="space-y-2 max-w-xl relative z-10">
            <span className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#c85a32] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
              Architectural Asset Hub
            </span>
            <h2 className="font-display font-light text-2xl sm:text-3xl text-[#241919]">
              Download CAD / BIM 4K Texture Maps
            </h2>
            <p className="text-xs sm:text-sm text-[#747474] font-light leading-relaxed">
              Equip your 3D rendering pipeline with high-resolution, seamlessly tileable texture maps (Diffuse, Normal, Roughness) and technical PDF specifications for {product.name}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => {
                alert(`Downloading CAD 4K Texture Pack for ${product.name}...`);
              }}
              className="px-6 py-3.5 bg-[#241919] hover:bg-[#c85a32] text-white rounded-2xl text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download 4K Texture Pack</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => {
                alert(`Downloading Architectural Specification PDF for ${product.name}...`);
              }}
              className="px-6 py-3.5 bg-[#faf8f5] hover:bg-[#f4efe6] text-[#241919] border border-[#747474]/20 rounded-2xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>PDF Tech Spec Sheet</span>
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* ── INLINE PROJECT QUOTE / INQUIRY FORM ── */}
      <motion.section
        ref={quoteFormRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24"
      >
        <div className="bg-white border border-[#747474]/20 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#c85a32] font-semibold">
              Quarry Direct Export Pricing
            </span>
            <h2 className="font-display font-light text-2xl sm:text-3xl md:text-4xl text-[#241919]">
              Inquire Quotation for {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#747474] font-light">
              Connect directly with our quarry engineers for custom cutting, bulk container logistics, or technical test sheets.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 bg-[#faf8f5] border border-[#c85a32]/30 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#c85a32] mx-auto animate-bounce" />
              <h3 className="font-display font-medium text-2xl text-[#241919]">
                Quotation Specification Received
              </h3>
              <p className="text-xs text-[#747474] max-w-md mx-auto leading-relaxed">
                Thank you! Our technical sales director will review your project specification for{" "}
                <span className="font-semibold text-[#241919]">{product.name}</span> and contact you within 12 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1 font-bold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Architect Sarah Lin / Studio Design"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919] bg-[#faf8f5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1 font-bold">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@studioarchitecture.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919] bg-[#faf8f5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1 font-bold">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919] bg-[#faf8f5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1 font-bold">
                    Delivery Port / Country Destination *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sydney Port, Australia / Dubai Port, UAE"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919] bg-[#faf8f5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1 font-bold">
                    Estimated Quantity &amp; Container Target
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 500 m² or 1x 20ft Container"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919] bg-[#faf8f5]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1 font-bold">
                    Project Typology
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919] bg-[#faf8f5] cursor-pointer"
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
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] mb-1 font-bold">
                  Specific Dimensions, Finishes or Edge Profiles
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention desired thicknesses, delivery deadlines, edge profiles, or CAD drawing attachments..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#747474]/25 focus:border-[#c85a32] focus:outline-none text-xs text-[#241919] bg-[#faf8f5]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4 flex-wrap">
                <span className="text-[10px] text-[#747474] font-mono">
                  Direct quarry export contracts guaranteed.
                </span>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#c85a32] hover:bg-[#b04a25] text-white rounded-2xl text-xs font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Specification Request</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </motion.section>

      {/* ── RELATED & COMPLEMENTARY STONES ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="space-y-6">
          
          <div className="flex items-center justify-between border-b border-[#747474]/15 pb-4">
            <div>
              <span className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#c85a32] font-semibold">
                Curated Natural Palette
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
                className="group border border-[#747474]/20 rounded-2xl overflow-hidden bg-white shadow-3xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#18191c]">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-lg">
                    {rel.company}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-sans font-bold text-sm sm:text-base text-[#241919] group-hover:text-[#c85a32] transition-colors leading-snug">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-[#747474] line-clamp-2 font-light leading-relaxed">
                    {rel.tagline}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#c85a32] font-semibold">
                    <span>Inspect Stone Specimen</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </motion.section>

      {/* ── FLOATING GLASS QUICK-ACTION DOCK ── */}
      <AnimatePresence>
        {showStickyDock && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 max-w-2xl w-full"
          >
            <div className="bg-[#18191c]/90 backdrop-blur-xl border border-white/20 p-3 sm:p-3.5 rounded-3xl shadow-2xl flex items-center justify-between gap-3 text-white">
              
              <div className="flex items-center gap-3 pl-2 min-w-0">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-black flex-none border border-white/20 hidden sm:block">
                  <img src={currentGalleryImage} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-sans font-bold text-xs sm:text-sm truncate text-white">
                    {product.name}
                  </h4>
                  <p className="text-[11px] font-mono text-white/60 truncate">
                    {product.company} · {product.origin.split(",")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-none">
                <Link
                  href={`/request-sample?stone=${product.id}`}
                  className="px-3.5 py-2.5 bg-[#c85a32] hover:bg-[#b04a25] text-white rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-all flex items-center gap-1.5"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sample Box</span>
                </Link>

                <button
                  type="button"
                  onClick={handleScrollToQuote}
                  className="px-4 py-2.5 bg-white text-[#241919] hover:bg-[#faf8f5] rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Inquire Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── IMAGE ZOOM LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {isZoomed && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentGalleryImage}
                alt={product.name}
                className="w-full h-full object-contain max-h-[88vh]"
              />
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center cursor-pointer hover:bg-black font-bold"
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
