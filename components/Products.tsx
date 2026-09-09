"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Factory, Layers, Building2, ArrowRight } from "lucide-react";

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
}

const COLLECTIONS: CompanyCollection[] = [
  {
    num: "01",
    name: "Pavan Impex",
    slug: "pavan-impex",
    tag: "NATURAL SLATE & 3D CLADDING",
    tagColor: "#0f172a",
    tagBg: "rgba(139, 69, 19, 0.08)",
    accentLine: "linear-gradient(90deg, #0f172a 0%, #c86432 60%, transparent 100%)",
    titleColor: "#1e1614",
    cardBg: "#f6eee3",
    description:
      "Bring natural sophistication indoors and outdoors with Pavan Impex, our natural slate stone extracted directly from Markapur reserves. Ideal for timeless elevations, feature walls, and bespoke architectural detailing.",
    buttonBg: "#1e1614",
    buttonTextColor: "#ffffff",
    buttonBorderColor: "#0f172a",
    buttonShadow: "rgba(139, 69, 19, 0.25)",
    bgGradient: "linear-gradient(135deg, #1c1f24 0%, #2e343d 50%, #15171a 100%)",
  },
  {
    num: "02",
    name: "Sai Balaji Impex",
    slug: "sai-balaji-impex",
    tag: "CALCAREOUS LIMESTONE & PAVERS",
    tagColor: "#9c6800",
    tagBg: "rgba(156, 104, 0, 0.09)",
    accentLine: "linear-gradient(90deg, #9c6800 0%, #d49b27 60%, transparent 100%)",
    titleColor: "#3d2b18",
    cardBg: "#f7f1e5",
    description:
      "Engineered for luxury pool copings, alfresco entertaining terraces, and heavy-duty driveways with Sai Balaji Impex. Dense, fine-grained calcrete limestones with certified anti-skid safety, remaining comfortably cool underfoot in sun-drenched outdoor climates.",
    buttonBg: "#3d2b18",
    buttonTextColor: "#ffffff",
    buttonBorderColor: "#9c6800",
    buttonShadow: "rgba(156, 104, 0, 0.25)",
    bgGradient: "linear-gradient(135deg, #2b2823 0%, #443c33 50%, #1c1915 100%)",
  },
  {
    num: "03",
    name: "Pavan Granite",
    slug: "pavan-granite",
    tag: "PREMIUM BLACK GALAXY GRANITE",
    tagColor: "#b8860b",
    tagBg: "rgba(30, 24, 20, 0.06)",
    accentLine: "linear-gradient(90deg, #b8860b 0%, #e0b44c 60%, transparent 100%)",
    titleColor: "#141212",
    cardBg: "#f3ece0",
    description:
      "Experience the pinnacle of natural stone luxury with Pavan Granite. Featuring world-renowned Chimakurthy Black Galaxy with golden bronzite crystals, fabricated into zero-porosity jumbo gangsaw slabs, bespoke kitchen countertops, and grand staircases.",
    buttonBg: "#141212",
    buttonTextColor: "#e6c374",
    buttonBorderColor: "#b8860b",
    buttonShadow: "rgba(184, 134, 11, 0.3)",
    bgGradient: "linear-gradient(135deg, #121316 0%, #22211c 50%, #090a0c 100%)",
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

export default function Products() {
  return (
    <section
      id="products"
      className="relative z-10 py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#ffffff] text-[#241919] shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.25)] transition-shadow duration-300"
    >
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        
        {/* ── ABOUT PAVAN GROUPS SPLIT HERO SECTION (IMAGE 1 LAYOUT) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white p-6 sm:p-10 lg:p-12 border border-[#747474]/15 shadow-sm relative overflow-hidden"
        >
          {/* ── LEFT COLUMN: ARCHITECTURAL FACILITY IMAGE + OVERLAPPING CIRCULAR BADGE ── */}
          <div className="lg:col-span-6 relative pr-0 sm:pr-8 md:pr-12">
            {/* Main Architectural Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-lg shadow-md border border-[#747474]/15">
              <img
                src="/about-hero.jpg"
                alt="Pavan Groups Natural Stone Processing & Quarry Facility"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Overlapping Rotating Circular Badge (Animated UI/UX Curved Text & Dashed Rings) */}
            <div className="absolute top-1/2 right-0 sm:-right-4 md:-right-6 -translate-y-1/2 z-20 w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 flex items-center justify-center pointer-events-none">
              
              {/* Outer 360° Rotating Curved Text SVG Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-0 w-full h-full"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <path
                      id="badgeCirclePath"
                      d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
                    />
                  </defs>
                  <text fill="#0f172a" fontSize="7.8" fontWeight="bold" letterSpacing="0.14em">
                    <textPath href="#badgeCirclePath" startOffset="0%">
                      • PAVAN GROUPS • STONE EXCELLENCE • EST. 2000 • PAVAN GROUPS • STONE EXCELLENCE • EST. 2000
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Counter-Rotating Dashed Accent Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
                className="absolute inset-3 sm:inset-3.5 rounded-full border-2 border-dashed border-[#0f172a]/35 pointer-events-none"
              />

              {/* Inner Core White Glassmorphism Badge */}
              <div className="relative w-24 h-24 sm:w-30 sm:h-30 md:w-32 md:h-32 bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-[#0f172a]/25 flex flex-col items-center justify-center text-center p-2 z-10 pointer-events-auto">
                <span className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#241919] leading-none tracking-tight">
                  26+
                </span>
                <span className="font-mono font-bold text-[9px] sm:text-[10px] text-[#0f172a] tracking-widest uppercase mt-0.5 mb-0.5">
                  YEARS
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] font-sans text-[#747474] font-medium leading-tight max-w-[85px]">
                  Quarrying &amp; Processing
                </span>
              </div>

            </div>
          </div>

          {/* ── RIGHT COLUMN: EDITORIAL NARRATIVE + KNOW MORE BUTTON ── */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 pt-4 lg:pt-0">

            <h2 className="font-display text-5xl md:text-7xl font-medium leading-none tracking-tight">
              <span className="text-[#241919]">Pavan</span>{" "}
              <span className="text-[#747474]">Groups</span>
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

        {/* ── 3 COMPANY SHOWCASES (STACKING CARDS SCROLL EFFECT) ── */}
        <div className="relative space-y-8 md:space-y-12 pb-8">
          {COLLECTIONS.map((col, idx) => {
            const isReversed = idx === 1; // Alternating layout for Sai Balaji Impex

            return (
              <motion.div
                key={col.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ delay: idx * 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  backgroundColor: col.cardBg,
                  top: `${84 + idx * 18}px`,
                  zIndex: (idx + 1) * 10,
                }}
                className="sticky border border-[#747474]/20 shadow-xl md:shadow-2xl overflow-hidden will-change-transform relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[380px] lg:min-h-[440px] relative z-10">
                  
                  {/* ── TEXT CONTENT COLUMN ── */}
                  <div
                    className={`md:col-span-6 lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center ${
                      isReversed ? "order-2 md:order-2" : "order-2 md:order-1"
                    }`}
                  >
                    {/* Eyebrow Pill */}
                    <div className="mb-3">
                      <span
                        style={{
                          backgroundColor: col.tagBg,
                          color: col.tagColor,
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-[0.24em] uppercase font-bold"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: col.tagColor }}
                        />
                        {col.tag}
                      </span>
                    </div>

                    {/* Company Title */}
                    <h3
                      className="font-display font-light leading-[1.02] tracking-[-0.015em] mb-3 transition-colors"
                      style={{
                        fontSize: "clamp(40px, 5vw, 62px)",
                        color: col.titleColor,
                      }}
                    >
                      {col.name}
                    </h3>

                    {/* Accent Line */}
                    <div
                      className="w-20 h-[2px] mb-5"
                      style={{ background: col.accentLine }}
                    />

                    {/* Editorial Narrative */}
                    <p className="text-[14.5px] sm:text-[15.5px] leading-[1.75] text-[#454545] font-light mb-8 max-w-lg">
                      {col.description}
                    </p>

                    {/* Distinct Action Button */}
                    <div className="pt-2">
                      <Link
                        href={`/companies/${col.slug}`}
                        style={{
                          backgroundColor: col.buttonBg,
                          color: col.buttonTextColor,
                          borderColor: col.buttonBorderColor,
                          boxShadow: `0 4px 14px ${col.buttonShadow}`,
                        }}
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border"
                      >
                        <span>Explore {col.name} Catalog</span>
                        <ArrowRight className="w-4 h-4 text-[#94a3b8]" />
                      </Link>
                    </div>

                  </div>

                  {/* ── VISUAL ART COLUMN ── */}
                  <div
                    className={`md:col-span-6 lg:col-span-7 relative min-h-[260px] md:min-h-full overflow-hidden ${
                      isReversed ? "order-1 md:order-1" : "order-1 md:order-2"
                    }`}
                    style={{ background: col.bgGradient }}
                  >
                    {/* Background Stone Texture Glow */}
                    <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]" />

                    {/* Center Industrial Entity Mark */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10 space-y-4">
                      <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/80 font-mono text-sm font-bold bg-black/20 backdrop-blur-xs">
                        {col.num}
                      </span>
                      <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#f1f5f9] tracking-[0.15em] uppercase font-light drop-shadow-md">
                        {col.name}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#94a3b8] font-semibold">
                        DIRECT MINING RESERVE · MARKAPUR, AP
                      </span>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
