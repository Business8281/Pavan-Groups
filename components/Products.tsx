"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "@animateicons/react/lucide";
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
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card0ImgRef = useRef<HTMLDivElement>(null);
  const card1ImgRef = useRef<HTMLDivElement>(null);

  // Raw dynamic physics targets
  const targetX = useMotionValue(516);
  const targetY = useMotionValue(285);
  const targetRotate = useMotionValue(0);
  const targetScale = useMotionValue(1);
  const stageMotion = useMotionValue(0);

  // Inertial springs critically overdamped for rock-solid lock-in with zero bounce
  const springX = useSpring(targetX, { stiffness: 280, damping: 60, mass: 0.15 });
  const springY = useSpring(targetY, { stiffness: 280, damping: 60, mass: 0.15 });
  const springRotate = useSpring(targetRotate, { stiffness: 55, damping: 30, mass: 0.6 });
  const springScale = useSpring(targetScale, { stiffness: 55, damping: 30, mass: 0.6 });

  // Dynamic division-themed ring stroke color that shifts with each company stage
  const ringColor = useTransform(
    stageMotion,
    [0, 1, 2, 3],
    ["#9a3412", "#b45309", "#0f766e", "#722424"]
  );

  // Dynamic luxury glow aura
  const glowShadow = useTransform(
    stageMotion,
    [0, 1, 2, 3],
    [
      "0 10px 30px rgba(15, 23, 42, 0.14)",
      "0 14px 38px rgba(200, 100, 50, 0.28)",
      "0 14px 38px rgba(156, 104, 0, 0.28)",
      "0 16px 44px rgba(114, 36, 36, 0.35)",
    ]
  );

  // Dynamic stage indicator pill
  const stageLabel = useTransform(stageMotion, (s: number): string => {
    if (s < 0.4) return "Heritage • Est. 2000";
    if (s < 1.4) return "Pavan Impex • Natural Slate";
    if (s < 2.4) return "Sai Balaji Impex • Calcareous Stone";
    return "Pavan Granite & Stones World";
  });

  useEffect(() => {
    let rafId: number;

    const updatePhysics = () => {
      if (
        !stickyContainerRef.current ||
        !imageContainerRef.current ||
        !card0Ref.current ||
        !card1Ref.current ||
        !card2Ref.current
      ) {
        return;
      }

      const isDesktop = window.innerWidth >= 1024;
      const cRect = stickyContainerRef.current.getBoundingClientRect();
      const imgRect = imageContainerRef.current.getBoundingClientRect();
      const card0 = card0Ref.current.getBoundingClientRect();
      const card1 = card1Ref.current.getBoundingClientRect();
      const card2 = card2Ref.current.getBoundingClientRect();

      // ── Station 1: About facility image — right-center vertical seam ──
      const startX = imgRect.right - cRect.left;
      const startY = imgRect.top - cRect.top + imageContainerRef.current.offsetHeight / 2;

      // ── Station 2: Pavan Impex card image — RIGHT TOP CORNER (badge centered on the corner) ──
      const card0Img = card0ImgRef.current ? card0ImgRef.current.getBoundingClientRect() : card0;
      const pavanX = card0Img.right - cRect.left;
      const pavanY = card0Img.top - cRect.top;

      // ── Station 3: Sai Balaji Impex card image — LEFT TOP CORNER ──
      const card1Img = card1ImgRef.current ? card1ImgRef.current.getBoundingClientRect() : card1;
      const balajiX = card1Img.left - cRect.left;
      // Use docked Y when card1 is stuck, live Y when still sliding up
      const balajiY = card1.top <= 104
        ? (card1.top - cRect.top)
        : (card1Img.top - cRect.top);

      // ── Station 4: EXACT CENTER MIDDLE between Pavan Granite & Pavan Stones World ──
      const dualCenterX = (card2.left - cRect.left) + card2.width / 2;
      const dualCenterY = card2.top <= 122
        ? (card2.top - cRect.top) + card2.height / 2
        : (card2.top - cRect.top) + card2.height / 2;

      // ── Progress: About image → Pavan Impex top-right ──
      const enterProgress = (window.innerHeight - card0.top) / (window.innerHeight - 84);
      const t0 = Math.max(0, Math.min(1, enterProgress));
      const prog0 = t0 < 0.2 ? 0 : Math.min(1, (t0 - 0.2) / 0.8);
      // smooth ease-in-out cubic
      const easeProg0 = prog0 < 0.5 ? 4 * prog0 * prog0 * prog0 : 1 - Math.pow(-2 * prog0 + 2, 3) / 2;

      const card0Docked = card0.top <= 86;
      const card1Docked = card1.top <= 104;
      const card2Docked = card2.top <= 122;

      // ── Progress: Pavan Impex → Sai Balaji (straight diagonal cross-down) ──
      const p1Start = Math.min(window.innerHeight * 0.9, card0.bottom + 300);
      const p1End = 104;
      const p1 = p1Start > p1End
        ? Math.max(0, Math.min(1, (p1Start - card1.top) / (p1Start - p1End)))
        : 0;
      // Smooth ease — NO sine arc. Pure linear interpolation between corners.
      const easeP1 = 0.5 - 0.5 * Math.cos(p1 * Math.PI);

      // ── Progress: Sai Balaji → Pavan Granite+Stones World center ──
      const p2Start = Math.min(window.innerHeight * 0.9, card1.bottom + 300);
      const p2End = 122;
      const p2 = p2Start > p2End
        ? Math.max(0, Math.min(1, (p2Start - card2.top) / (p2Start - p2End)))
        : 0;
      const easeP2 = 0.5 - 0.5 * Math.cos(p2 * Math.PI);

      let nextX: number;
      let nextY: number;
      let stageVal = 0;
      let nextScale = 1.0;

      if (card2Docked || (card1Docked && p2 >= 1)) {
        // Station 4: Hard-set directly — no spring bounce at final resting position
        nextX = dualCenterX;
        nextY = dualCenterY;
        stageVal = 3;
        nextScale = isDesktop ? 0.80 : 0.75;
      } else if (card1Docked && p2 > 0) {
        // Station 3 → Station 4: Straight glide from Balaji top-left into center
        nextX = balajiX + (dualCenterX - balajiX) * easeP2;
        nextY = balajiY + (dualCenterY - balajiY) * easeP2;
        stageVal = 2 + p2;
        nextScale = 1.0 - (isDesktop ? 0.20 : 0.25) * easeP2;
      } else if (p1 > 0) {
        // Station 2 → Station 3: STRAIGHT DIAGONAL cross-down (Pavan Impex right-top → Sai Balaji left-top)
        // Pure lerp — no sine arc dip
        nextX = pavanX + (balajiX - pavanX) * easeP1;
        nextY = pavanY + (balajiY - pavanY) * easeP1;
        stageVal = 1 + p1;
        nextScale = 1.0;
      } else if (prog0 > 0) {
        // Station 1 → Station 2: Glide from About image seam to Pavan Impex right-top corner
        nextX = startX + (pavanX - startX) * easeProg0;
        nextY = startY + (pavanY - startY) * easeProg0;
        stageVal = easeProg0;
        nextScale = 1.0;
      } else {
        // Station 1: Heritage / About facility image seam (initial position)
        nextX = startX;
        nextY = startY;
        stageVal = 0;
        nextScale = 1.0;
      }

      targetX.set(nextX);
      targetY.set(nextY);
      targetRotate.set(0);
      targetScale.set(nextScale);
      stageMotion.set(stageVal);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();
    const initTimer1 = setTimeout(updatePhysics, 100);
    const initTimer2 = setTimeout(updatePhysics, 300);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(initTimer1);
      clearTimeout(initTimer2);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetX, targetY, targetRotate, targetScale, stageMotion]);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative z-10 py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#ffffff] text-[#241919] shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.25)] transition-shadow duration-300"
    >
      {/* ── TRAVELLING ORBITAL STAMP BADGE (SMOOTH CONTINUOUS SCROLL TRANSIT) ── */}
      <div className="sticky top-0 left-0 w-full h-0 z-40 pointer-events-none overflow-visible">
        <div ref={stickyContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative h-0">
          <motion.div
            style={{
              position: "absolute",
              left: springX,
              top: springY,
              rotate: springRotate,
              scale: springScale,
              x: "-50%",
              y: "-50%",
            }}
            className="pointer-events-none select-none will-change-transform"
          >
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 flex items-center justify-center">

              {/* Outer 360° Continuous Rotating SVG Text Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <motion.svg viewBox="0 0 200 200" className="w-full h-full overflow-visible" style={{ color: ringColor }}>
                  <defs>
                    <path
                      id="travellingBadgeCirclePath"
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
                    <textPath href="#travellingBadgeCirclePath" startOffset="0%">
                      • PAVAN STONES GROUP • STONE EXCELLENCE • EST. 2000 • PAVAN STONES GROUP • STONE EXCELLENCE • EST. 2000
                    </textPath>
                  </text>
                </motion.svg>
              </motion.div>

              {/* Counter-Rotating Dashed Accent Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
                style={{ borderColor: ringColor }}
                className="absolute inset-3 sm:inset-3.5 rounded-full border-2 border-dashed opacity-35 pointer-events-none"
              />

              {/* Luxury Center Seal Core Disc with Glassmorphic Shimmer & Shadow */}
              <motion.div
                style={{
                  boxShadow: glowShadow,
                  borderColor: ringColor,
                }}
                className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white/95 backdrop-blur-md border flex flex-col items-center justify-center text-center px-2 z-10 transition-colors duration-500 shadow-xl"
              >
                {/* Subtle Ambient Radial Shimmer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/[0.04] via-transparent to-white/60 pointer-events-none" />

                <span className="font-sans font-extrabold text-xl sm:text-2xl md:text-3xl text-[#241919] leading-[1] tracking-tight relative z-10">
                  26+
                </span>
                <span className="font-mono font-bold text-[8px] sm:text-[9px] md:text-[10px] text-[#0f172a]/75 tracking-widest uppercase leading-none relative z-10">
                  YEARS
                </span>

              </motion.div>


            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">

        {/* ── ABOUT PAVAN STONES GROUP SPLIT HERO SECTION (IMAGE 1 LAYOUT) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white relative"
        >
          {/* ── LEFT COLUMN: ARCHITECTURAL FACILITY IMAGE + OVERLAPPING CIRCULAR BADGE ── */}
          <div className="lg:col-span-6 relative pr-0 sm:pr-8 md:pr-12">
            {/* Main Architectural Image Container */}
            <div ref={imageContainerRef} className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-lg shadow-md">
              {/* Inner clip wrapper for the image only */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <img
                  src="/about-hero.jpg"
                  alt="Pavan Stones Group Natural Stone Processing & Quarry Facility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: EDITORIAL NARRATIVE + KNOW MORE BUTTON ── */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 pt-4 lg:pt-0">

            <h2 className="font-display text-5xl md:text-7xl font-medium leading-none tracking-tight">
              <span className="text-[#241919]">Pavan Stones</span>{" "}
              <span className="text-[#747474]">Group</span>
            </h2>

            <p className="text-[13px] sm:text-[13.5px] leading-[1.65] text-[#555555] font-light">
              South India&apos;s premier natural stone conglomerate, extracting and processing finest Slate, Limestone, and Granite from Markapur, Cuddapah, and Chimakurthy reserves for landmark projects worldwide. Operating 9 state-of-the-art manufacturing facilities delivering over 150,000 SQM in annual production capacity.
            </p>

            {/* High Impact Button (Exact Image 1 "KNOW MORE" Style!) */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#241919] hover:bg-[#c85a32] text-white text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <span>Know More</span>
                <ArrowRight className="w-4 h-4 text-[#94a3b8]" />
              </Link>
            </div>

          </div>
        </motion.div>

        {/* ── COMPANY SHOWCASES (STACKING CARDS SCROLL EFFECT) ── */}
        <div className="relative space-y-8 md:space-y-12 pb-8">

          {/* ── CARD 0: PAVAN IMPEX (WITH IMAGE) ── */}
          <motion.div
            key={COLLECTIONS[0].slug}
            ref={card0Ref}
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
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[380px] lg:min-h-[440px] relative z-10">
              <div className="md:col-span-6 lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">

                <h3
                  className="font-display font-normal leading-[1.02] tracking-[-0.015em] mb-3 transition-colors"
                  style={{
                    fontSize: "clamp(40px, 5vw, 62px)",
                    color: COLLECTIONS[0].titleColor,
                  }}
                >
                  <StaggeredText text={COLLECTIONS[0].name} />
                </h3>
                <div
                  className="w-20 h-[2px] mb-5"
                  style={{ background: COLLECTIONS[0].accentLine }}
                />
                <p className="text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[#454545] font-light mb-8 max-w-lg">
                  {COLLECTIONS[0].description}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/companies/${COLLECTIONS[0].slug}`}
                    style={{
                      backgroundColor: COLLECTIONS[0].buttonBg,
                      color: "#ffffff",
                      borderColor: COLLECTIONS[0].buttonBorderColor,
                      boxShadow: `0 4px 14px ${COLLECTIONS[0].buttonShadow}`,
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border text-white"
                  >
                    <span className="text-white">Explore</span>
                    <ArrowUpRight className="w-4 h-4 text-[#fdba74]" style={{ color: COLLECTIONS[0].buttonTextColor }} />
                  </Link>
                </div>
              </div>

              <div
                ref={card0ImgRef}
                className="md:col-span-6 lg:col-span-7 relative min-h-[300px] md:min-h-full overflow-hidden group order-1 md:order-2"
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
            ref={card1Ref}
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
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[380px] lg:min-h-[440px] relative z-10">
              <div
                ref={card1ImgRef}
                className="md:col-span-6 lg:col-span-7 relative min-h-[300px] md:min-h-full overflow-hidden group order-1 md:order-1"
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

              <div className="md:col-span-6 lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-2">

                <h3
                  className="font-display font-normal leading-[1.02] tracking-[-0.015em] mb-3 transition-colors"
                  style={{
                    fontSize: "clamp(40px, 5vw, 62px)",
                    color: COLLECTIONS[1].titleColor,
                  }}
                >
                  <StaggeredText text={COLLECTIONS[1].name} />
                </h3>
                <div
                  className="w-20 h-[2px] mb-5"
                  style={{ background: COLLECTIONS[1].accentLine }}
                />
                <p className="text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[#454545] font-light mb-8 max-w-lg">
                  {COLLECTIONS[1].description}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/companies/${COLLECTIONS[1].slug}`}
                    style={{
                      backgroundColor: COLLECTIONS[1].buttonBg,
                      color: "#ffffff",
                      borderColor: COLLECTIONS[1].buttonBorderColor,
                      boxShadow: `0 4px 14px ${COLLECTIONS[1].buttonShadow}`,
                    }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border text-white"
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
            ref={card2Ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ delay: 0.24, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              top: "120px",
              zIndex: 30,
            }}
            className="sticky border-2 border-[#ea580c] shadow-xl md:shadow-2xl overflow-hidden will-change-transform relative bg-white py-4 sm:py-6 lg:py-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 lg:gap-[180px] xl:gap-[240px] items-stretch relative z-10">

              {/* ── LEFT: PAVAN GRANITE (NO IMAGE - PURE WHITE WITH BRACKET "]" BORDER) ── */}
              <div className="relative p-7 sm:p-9 lg:p-11 md:pr-14 lg:pr-16 flex flex-col justify-between">
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
                    className="font-display font-normal leading-[1.05] tracking-[-0.015em] mb-3 transition-colors text-3xl sm:text-4xl lg:text-5xl"
                    style={{ color: COLLECTIONS[2].titleColor }}
                  >
                    <StaggeredText text={COLLECTIONS[2].name} />
                  </h3>

                  {/* Accent Line */}
                  <div
                    className="w-20 h-[2px] mb-5"
                    style={{ background: COLLECTIONS[2].accentLine }}
                  />

                  {/* Narrative */}
                  <p className="text-[14px] sm:text-[15px] leading-[1.75] text-[#454545] font-light mb-8">
                    {COLLECTIONS[2].description}
                  </p>
                </div>

                {/* Direct Action Button */}
                <div className="pt-2 relative z-10">
                  <Link
                    href={`/companies/${COLLECTIONS[2].slug}`}
                    style={{
                      backgroundColor: COLLECTIONS[2].buttonBg,
                      color: "#ffffff",
                      borderColor: COLLECTIONS[2].buttonBorderColor,
                      boxShadow: `0 4px 14px ${COLLECTIONS[2].buttonShadow}`,
                    }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border w-full sm:w-auto justify-center text-white"
                  >
                    <span className="text-white">Explore</span>
                    <ArrowUpRight className="w-4 h-4 text-[#5eead4]" style={{ color: COLLECTIONS[2].buttonTextColor }} />
                  </Link>
                </div>
              </div>

              {/* ── RIGHT: PAVAN STONES WORLD (NO IMAGE - PURE WHITE WITH BRACKET "[" BORDER) ── */}
              <div className="relative p-7 sm:p-9 lg:p-11 md:pl-14 lg:pl-16 flex flex-col justify-between">
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
                    className="font-display font-normal leading-[1.05] tracking-[-0.015em] mb-3 transition-colors text-3xl sm:text-4xl lg:text-5xl"
                    style={{ color: COLLECTIONS[3].titleColor }}
                  >
                    <StaggeredText text={COLLECTIONS[3].name} />
                  </h3>

                  {/* Accent Line */}
                  <div
                    className="w-20 h-[2px] mb-5"
                    style={{ background: COLLECTIONS[3].accentLine }}
                  />

                  {/* Narrative */}
                  <p className="text-[14px] sm:text-[15px] leading-[1.75] text-[#454545] font-light mb-8">
                    {COLLECTIONS[3].description}
                  </p>
                </div>

                {/* Direct Action Button */}
                <div className="pt-2 relative z-10">
                  <Link
                    href={`/companies/${COLLECTIONS[3].slug}`}
                    style={{
                      backgroundColor: COLLECTIONS[3].buttonBg,
                      color: "#ffffff",
                      borderColor: COLLECTIONS[3].buttonBorderColor,
                      boxShadow: `0 4px 14px ${COLLECTIONS[3].buttonShadow}`,
                    }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border w-full sm:w-auto justify-center text-white"
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
