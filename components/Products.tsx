"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { scrollToHash } from "@/components/SmoothScroll";

interface CompanyCollection {
  num: string;
  name: string;
  slug: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  accentLine: string;
  titleColor: string;
  cardBg: string;
  description: string;
  buttonBg: string;
  buttonTextColor: string;
  buttonBorderColor: string;
  buttonShadow: string;
  bgGradient: string;
  image: string;
}

const COLLECTIONS: CompanyCollection[] = [
  {
    num: "01",
    name: "Pavan Impex",
    slug: "pavan-impex",
    tag: "NATURAL SLATE & 3D CLADDING",
    tagColor: "#9a3412",
    tagBg: "transparent",
    accentLine: "linear-gradient(90deg, #9a3412 0%, #ea580c 60%, transparent 100%)",
    titleColor: "#9a3412",
    cardBg: "#ffffff",
    description:
      "Bring natural sophistication indoors and outdoors with Pavan Impex, our natural slate stone extracted directly from Markapur reserves. Ideal for timeless elevations, feature walls, and bespoke architectural detailing.",
    buttonBg: "#241008",
    buttonTextColor: "#fdba74",
    buttonBorderColor: "#c2410c",
    buttonShadow: "rgba(154, 52, 18, 0.25)",
    bgGradient: "linear-gradient(135deg, #1c1f24 0%, #2e343d 50%, #15171a 100%)",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "02",
    name: "Sai Balaji Impex",
    slug: "sai-balaji-impex",
    tag: "CALCAREOUS LIMESTONE & PAVERS",
    tagColor: "#b45309",
    tagBg: "transparent",
    accentLine: "linear-gradient(90deg, #b45309 0%, #fbbf24 60%, transparent 100%)",
    titleColor: "#b45309",
    cardBg: "#ffffff",
    description:
      "Engineered for luxury pool copings, alfresco entertaining terraces, and heavy-duty driveways with Sai Balaji Impex. Dense, fine-grained calcrete limestones with certified anti-skid safety, remaining comfortably cool underfoot in sun-drenched outdoor climates.",
    buttonBg: "#2b2118",
    buttonTextColor: "#fbbf24",
    buttonBorderColor: "#d97706",
    buttonShadow: "rgba(180, 83, 9, 0.25)",
    bgGradient: "linear-gradient(135deg, #2b2823 0%, #443c33 50%, #1c1915 100%)",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "03",
    name: "Pavan Granite",
    slug: "pavan-granite",
    tag: "PREMIUM BLACK GALAXY GRANITE",
    tagColor: "#0f766e",
    tagBg: "transparent",
    accentLine: "linear-gradient(90deg, #0f766e 0%, #2dd4bf 60%, transparent 100%)",
    titleColor: "#0f766e",
    cardBg: "#ffffff",
    description:
      "Experience the pinnacle of natural stone luxury with Pavan Granite. Featuring world-renowned Chimakurthy Black Galaxy with golden bronzite crystals, fabricated into zero-porosity jumbo gangsaw slabs, bespoke kitchen countertops, and grand staircases.",
    buttonBg: "#042f2e",
    buttonTextColor: "#5eead4",
    buttonBorderColor: "#0f766e",
    buttonShadow: "rgba(15, 118, 110, 0.3)",
    bgGradient: "linear-gradient(135deg, #121316 0%, #22211c 50%, #090a0c 100%)",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "04",
    name: "Pavan Stones World",
    slug: "pavan-stones-world",
    tag: "EXOTIC QUARTZITE & MARBLE",
    tagColor: "#722424",
    tagBg: "transparent",
    accentLine: "linear-gradient(90deg, #722424 0%, #f87171 60%, transparent 100%)",
    titleColor: "#722424",
    cardBg: "#ffffff",
    description:
      "Curating the world's most breathtaking exotic stones, crystalline quartzites, pure calcitic marbles, and bespoke architectural artifacts with Pavan Stones World. Precision-engineered for prestige commercial plazas, palatial residences, and visionary interior designs.",
    buttonBg: "#241919",
    buttonTextColor: "#f87171",
    buttonBorderColor: "#722424",
    buttonShadow: "rgba(114, 36, 36, 0.25)",
    bgGradient: "linear-gradient(135deg, #190806 0%, #2d0e0e 50%, #431616 100%)",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
  },
];

// Smooth Animated Number Counter Component
function AnimatedCounter({
  target,
  duration = 2.0,
  decimals = 0,
  suffix = "",
}: {
  target: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const startValue = 0;
    let animationFrameId: number;

    const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = startValue + (target - startValue) * easedProgress;

      setCount(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

// Staggered Character / Letter-by-Letter Scroll Reveal Component (Replays smoothly on re-entry)
function StaggeredText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: "blur(6px)",
      transition: {
        duration: 0.35,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      aria-label={text}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative z-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#ffffff] text-[#241919]"
    >
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">

        {/* ── ABOUT PAVAN STONES GROUP SPLIT HERO SECTION (IMAGE 1 LAYOUT) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white relative"
        >
          {/* ── LEFT COLUMN: ARCHITECTURAL FACILITY IMAGE + STATIC OVERLAPPING CIRCULAR BADGE ── */}
          <div className="lg:col-span-6 relative pr-0 sm:pr-8 md:pr-12">
            {/* Main Architectural Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#252422]/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] bg-white">
              {/* Inner clip wrapper for the image only */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/about-hero.jpg"
                  alt="Pavan Stones Group Natural Stone Processing & Quarry Facility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Static Orbit Badge - centered on image on mobile, positioned on right seam on desktop */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:left-auto sm:-right-4 md:-right-8 sm:translate-x-0 z-20 pointer-events-none select-none">
              <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center">

                {/* Outer 360° Continuous Rotating SVG Text Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible text-[#ff5500]">
                    <defs>
                      <path
                        id="staticBadgeCirclePath"
                        d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
                      />
                    </defs>

                    {/* Concentric hairline circles */}
                    <circle
                      cx="100"
                      cy="100"
                      r="64"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeOpacity="0.4"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="84"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeOpacity="0.28"
                    />

                    <text fill="currentColor" fontSize="10.5" fontWeight="bold" letterSpacing="0.14em">
                      <textPath href="#staticBadgeCirclePath" startOffset="0%">
                        • PAVAN STONES GROUP • STONE EXCELLENCE • EST. 2000 • PAVAN STONES GROUP • STONE EXCELLENCE • EST. 2000
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                {/* Counter-Rotating Dashed Accent Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
                  className="absolute inset-2.5 sm:inset-3.5 rounded-full border-2 border-dashed border-[#ff5500] opacity-35 pointer-events-none"
                />

                {/* Luxury Center Seal Core Disc */}
                <div
                  style={{
                    boxShadow: "0 14px 38px rgba(255, 85, 0, 0.22)",
                    borderColor: "#ff5500",
                  }}
                  className="relative w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur-md border flex flex-col items-center justify-center text-center px-1.5 sm:px-2 z-10 shadow-xl"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/[0.04] via-transparent to-white/60 pointer-events-none" />

                  <span className="font-sans font-extrabold text-base xs:text-lg sm:text-2xl md:text-3xl text-[#252422] leading-[1] tracking-tight relative z-10">
                    26+
                  </span>
                  <span className="font-mono font-bold text-[6px] xs:text-[7px] sm:text-[9px] md:text-[10px] text-[#ff5500] tracking-widest uppercase leading-none relative z-10">
                    YEARS
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: EDITORIAL NARRATIVE + COLOR COMBO & STATS + KNOW MORE BUTTON ── */}
          <div className="lg:col-span-6 space-y-5 pt-2 lg:pt-0">

            {/* Rich Two-Tone Display Title */}
            <div>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-[#003049] leading-[1.08] tracking-tight">
                Pavan Stones{" "}
                <span className="italic font-normal text-[#ff5500]">Group</span>
              </h2>
              <div className="w-20 h-[3px] bg-gradient-to-r from-[#ff5500] to-[#ff5500]/20 rounded-full mt-3.5" />
              <div className="mt-3.5 inline-flex items-center gap-2 select-none">
                <ShieldCheck className="w-4 h-4 text-[#ff5500] stroke-[2]" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#7c3a1d]">
                  IEC NUMBER
                </span>
                <span className="h-3.5 w-[1px] bg-gray-300" />
                <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.12em] text-[#252422]">
                  0909020744
                </span>
              </div>
            </div>

            {/* Narrative with Context Highlights */}
            <p className="text-[14px] sm:text-[15px] leading-[1.75] text-[#555555] font-light">
              South India&apos;s premier natural stone conglomerate, extracting and processing finest{" "}
              <strong className="text-[#252422] font-semibold">Slate, Limestone, and Granite</strong> from Markapur, Cuddapah, and Chimakurthy reserves for landmark projects worldwide. Operating 9 state-of-the-art manufacturing facilities delivering over{" "}
              <strong className="text-[#252422] font-semibold">150,000 SQM</strong> in annual production capacity.
            </p>

            {/* High Impact Button */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#252422] hover:bg-[#ff5500] text-white text-xs font-mono uppercase tracking-[0.2em] font-bold rounded-[4px] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#ff5500]/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer touch-manipulation group"
              >
                <span>Explore Group Heritage</span>
                <ArrowUpRight className="w-4 h-4 text-[#ff5500] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </Link>
            </div>

          </div>
        </motion.div>

        {/* ── COMPANY SHOWCASES (STACKING CARDS SCROLL EFFECT) ── */}
        <div className="relative space-y-6 sm:space-y-8 md:space-y-12 pb-8">

          {/* ── CARD 0: PAVAN IMPEX (WITH IMAGE) ── */}
          <motion.div
            key={COLLECTIONS[0].slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ delay: 0, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundColor: COLLECTIONS[0].cardBg,
              top: "84px",
              zIndex: 10,
            }}
            className="sticky border-2 border-[#ea580c] shadow-xl md:shadow-2xl overflow-hidden will-change-transform relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[360px] lg:min-h-[440px] relative z-10">
              <div className="md:col-span-6 lg:col-span-5 p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">

                <h3
                  className="font-display font-normal leading-[1.02] tracking-[-0.015em] mb-2 sm:mb-3 transition-colors"
                  style={{
                    fontSize: "clamp(30px, 4.5vw, 62px)",
                    color: COLLECTIONS[0].titleColor,
                  }}
                >
                  <StaggeredText text={COLLECTIONS[0].name} />
                </h3>
                <div
                  className="w-16 sm:w-20 h-[2px] mb-3 sm:mb-5"
                  style={{ background: COLLECTIONS[0].accentLine }}
                />
                <p className="text-[13.5px] sm:text-[15px] leading-[1.7] text-[#454545] font-light mb-6 sm:mb-8 max-w-lg">
                  {COLLECTIONS[0].description}
                </p>
                <div className="pt-1">
                  <Link
                    href={`/companies/${COLLECTIONS[0].slug}`}
                    style={{
                      backgroundColor: COLLECTIONS[0].buttonBg,
                      color: "#ffffff",
                      borderColor: COLLECTIONS[0].buttonBorderColor,
                      boxShadow: `0 4px 14px ${COLLECTIONS[0].buttonShadow}`,
                    }}
                    className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border rounded-[4px] text-white touch-manipulation"
                  >
                    <span className="text-white">Explore</span>
                    <ArrowUpRight className="w-4 h-4 text-[#fdba74]" style={{ color: COLLECTIONS[0].buttonTextColor }} />
                  </Link>
                </div>
              </div>

              <div
                className="md:col-span-6 lg:col-span-7 relative min-h-[220px] sm:min-h-[280px] md:min-h-full overflow-hidden group order-1 md:order-2"
              >
                <img
                  src={COLLECTIONS[0].image}
                  alt={`${COLLECTIONS[0].name} Architectural Natural Stone`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.38) 100%)",
                  }}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* ── CARD 1: SAI BALAJI IMPEX (WITH IMAGE, REVERSED) ── */}
          <motion.div
            key={COLLECTIONS[1].slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ delay: 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundColor: COLLECTIONS[1].cardBg,
              top: "102px",
              zIndex: 20,
            }}
            className="sticky border-2 border-[#ea580c] shadow-xl md:shadow-2xl overflow-hidden will-change-transform relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[360px] lg:min-h-[440px] relative z-10">
              <div
                className="md:col-span-6 lg:col-span-7 relative min-h-[220px] sm:min-h-[280px] md:min-h-full overflow-hidden group order-1 md:order-1"
              >
                <img
                  src={COLLECTIONS[1].image}
                  alt={`${COLLECTIONS[1].name} Architectural Natural Stone`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.38) 100%)",
                  }}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>

              <div className="md:col-span-6 lg:col-span-5 p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-2">

                <h3
                  className="font-display font-normal leading-[1.02] tracking-[-0.015em] mb-2 sm:mb-3 transition-colors"
                  style={{
                    fontSize: "clamp(30px, 4.5vw, 62px)",
                    color: COLLECTIONS[1].titleColor,
                  }}
                >
                  <StaggeredText text={COLLECTIONS[1].name} />
                </h3>
                <div
                  className="w-16 sm:w-20 h-[2px] mb-3 sm:mb-5"
                  style={{ background: COLLECTIONS[1].accentLine }}
                />
                <p className="text-[13.5px] sm:text-[15px] leading-[1.7] text-[#454545] font-light mb-6 sm:mb-8 max-w-lg">
                  {COLLECTIONS[1].description}
                </p>
                <div className="pt-1">
                  <Link
                    href={`/companies/${COLLECTIONS[1].slug}`}
                    style={{
                      backgroundColor: COLLECTIONS[1].buttonBg,
                      color: "#ffffff",
                      borderColor: COLLECTIONS[1].buttonBorderColor,
                      boxShadow: `0 4px 14px ${COLLECTIONS[1].buttonShadow}`,
                    }}
                    className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border rounded-[4px] text-white touch-manipulation"
                  >
                    <span className="text-white">Explore</span>
                    <ArrowUpRight className="w-4 h-4 text-[#fbbf24]" style={{ color: COLLECTIONS[1].buttonTextColor }} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── CARD 2: PAVAN GRANITE & PAVAN STONES WORLD (SIDE BY SIDE, NO IMAGES) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ delay: 0.24, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              top: "120px",
              zIndex: 30,
            }}
            className="sticky border-2 border-[#ea580c] shadow-xl md:shadow-2xl overflow-hidden will-change-transform relative bg-white py-3 sm:py-6 lg:py-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-20 lg:gap-[160px] xl:gap-[200px] items-stretch relative z-10">

              {/* ── LEFT: PAVAN GRANITE (NO IMAGE - PURE WHITE WITH BRACKET "]" BORDER) ── */}
              <div className="relative p-5 sm:p-7 lg:p-11 md:pr-14 lg:pr-16 flex flex-col justify-between">
                {/* Architectural Bracket "]" for Pavan Granite (covers 50% width top & bottom) */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  {/* Right vertical line of ] */}
                  <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-[#0f766e]" />
                  {/* Top right line of ] (covers half width) */}
                  <div className="absolute top-0 right-0 w-1/2 h-[2px] bg-[#0f766e]" />
                  {/* Bottom right line of ] (covers half width) */}
                  <div className="absolute bottom-0 right-0 w-1/2 h-[2px] bg-[#0f766e]" />
                </div>

                <div className="relative z-10">

                  {/* Title */}
                  <h3
                    className="font-display font-normal leading-[1.05] tracking-[-0.015em] mb-2 sm:mb-3 transition-colors text-2xl sm:text-3xl lg:text-5xl"
                    style={{ color: COLLECTIONS[2].titleColor }}
                  >
                    <StaggeredText text={COLLECTIONS[2].name} />
                  </h3>

                  {/* Accent Line */}
                  <div
                    className="w-16 sm:w-20 h-[2px] mb-3 sm:mb-5"
                    style={{ background: COLLECTIONS[2].accentLine }}
                  />

                  {/* Narrative */}
                  <p className="text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#454545] font-light mb-6 sm:mb-8">
                    {COLLECTIONS[2].description}
                  </p>
                </div>

                {/* Direct Action Button */}
                <div className="pt-1 relative z-10">
                  <Link
                    href={`/companies/${COLLECTIONS[2].slug}`}
                    style={{
                      backgroundColor: COLLECTIONS[2].buttonBg,
                      color: "#ffffff",
                      borderColor: COLLECTIONS[2].buttonBorderColor,
                      boxShadow: `0 4px 14px ${COLLECTIONS[2].buttonShadow}`,
                    }}
                    className="inline-flex items-center gap-2.5 px-6 py-3 sm:py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border rounded-[4px] w-full sm:w-auto justify-center text-white touch-manipulation"
                  >
                    <span className="text-white">Explore</span>
                    <ArrowUpRight className="w-4 h-4 text-[#5eead4]" style={{ color: COLLECTIONS[2].buttonTextColor }} />
                  </Link>
                </div>
              </div>

              {/* ── RIGHT: PAVAN STONES WORLD (NO IMAGE - PURE WHITE WITH BRACKET "[" BORDER) ── */}
              <div className="relative p-5 sm:p-7 lg:p-11 md:pl-14 lg:pl-16 flex flex-col justify-between">
                {/* Architectural Bracket "[" for Pavan Stones World (covers 50% width top & bottom) */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  {/* Left vertical line of [ */}
                  <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#722424]" />
                  {/* Top left line of [ (covers half width) */}
                  <div className="absolute top-0 left-0 w-1/2 h-[2px] bg-[#722424]" />
                  {/* Bottom left line of [ (covers half width) */}
                  <div className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-[#722424]" />
                </div>

                <div className="relative z-10">

                  {/* Title */}
                  <h3
                    className="font-display font-normal leading-[1.05] tracking-[-0.015em] mb-2 sm:mb-3 transition-colors text-2xl sm:text-3xl lg:text-5xl"
                    style={{ color: COLLECTIONS[3].titleColor }}
                  >
                    <StaggeredText text={COLLECTIONS[3].name} />
                  </h3>

                  {/* Accent Line */}
                  <div
                    className="w-16 sm:w-20 h-[2px] mb-3 sm:mb-5"
                    style={{ background: COLLECTIONS[3].accentLine }}
                  />

                  {/* Narrative */}
                  <p className="text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#454545] font-light mb-6 sm:mb-8">
                    {COLLECTIONS[3].description}
                  </p>
                </div>

                {/* Direct Action Button */}
                <div className="pt-1 relative z-10">
                  <Link
                    href={`/companies/${COLLECTIONS[3].slug}`}
                    style={{
                      backgroundColor: COLLECTIONS[3].buttonBg,
                      color: "#ffffff",
                      borderColor: COLLECTIONS[3].buttonBorderColor,
                      boxShadow: `0 4px 14px ${COLLECTIONS[3].buttonShadow}`,
                    }}
                    className="inline-flex items-center gap-2.5 px-6 py-3 sm:py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border rounded-[4px] w-full sm:w-auto justify-center text-white touch-manipulation"
                  >
                    <span className="text-white">Explore</span>
                    <ArrowUpRight className="w-4 h-4 text-[#f87171]" style={{ color: COLLECTIONS[3].buttonTextColor }} />
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
