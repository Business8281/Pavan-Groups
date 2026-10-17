"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Globe, Settings, Leaf, ArrowRight } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";
import { scrollToHash } from "@/components/SmoothScroll";

const MARQUEE_ITEMS = [
  "Granite", "·", "Limestone", "·", "Slate", "·", "Cobbles",
  "·", "Quartzite", "·", "Sandstone", "·", "Basalt", "·",
  "Granite", "·", "Limestone", "·", "Slate", "·", "Cobbles",
  "·", "Quartzite", "·", "Sandstone", "·", "Basalt", "·",
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Hero background video autoplay catch:", error);
        });
      }
    }
  }, []);


  return (
    <section
      id="home"
      className="sticky top-0 z-0 w-full min-h-[92dvh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-[#090706] mt-[72px] md:mt-0 pt-16 sm:pt-20 md:pt-28 pb-0 select-none"
    >
      {/* ── BACKGROUND VIDEO LAYER ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src={getAssetPath("/assets/webpage_front_display_video.mp4")}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-[1.02]"
        >
          <source src={getAssetPath("/assets/webpage_front_display_video.mp4")} type="video/mp4" />
        </video>
      </div>

      {/* ── HERO CONTENT WRAPPER ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex-1 flex flex-col justify-between pt-4 sm:pt-8 pb-8 sm:pb-10">
        
        {/* Main Hero Statement */}
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left my-auto">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center mb-3 sm:mb-4"
          >
            <span className="text-[11px] sm:text-xs md:text-sm font-medium tracking-[0.26em] uppercase text-[#ebd4b8] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              NATURAL STONE &middot; GLOBAL SPACES
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[40px] xs:text-[48px] sm:text-[60px] md:text-[70px] lg:text-[80px] xl:text-[86px] font-normal leading-[1.05] tracking-normal drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] mb-4 sm:mb-6"
          >
            <span className="text-white">Nature Builds</span> <br />
            <span className="bg-gradient-to-r from-[#faecd8] via-[#e8c697] to-[#d4a86c] bg-clip-text text-transparent font-medium">
              A Better Tomorrow
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14px] sm:text-[16px] md:text-[18px] text-[#f3ede4] font-light leading-relaxed max-w-xl mb-7 sm:mb-9 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
          >
            Premium Indian Natural Stones for Architectural, Residential and Commercial Projects Worldwide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-[#ebd6ba] to-[#dfc097] hover:from-[#faecd8] hover:to-[#ebd4b8] text-[#1a1412] text-xs sm:text-[13px] font-semibold tracking-wide rounded-[3px] transition-all duration-200 shadow-[0_4px_18px_rgba(0,0,0,0.45)] hover:shadow-[0_6px_24px_rgba(223,178,120,0.4)] hover:-translate-y-0.5 group"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 border border-black hover:border-black bg-transparent hover:bg-black/10 text-[#ff5500] text-xs sm:text-[13px] font-semibold tracking-wide rounded-[3px] transition-all duration-200 shadow-md cursor-pointer group hover:-translate-y-0.5"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* ── LOWER SECTION: TRUST BADGES (LEFT) & SCRIPT ACCENT (RIGHT) ── */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-4 pt-8 sm:pt-10">
          
          {/* Trust Badges on Bottom Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-5 sm:gap-8 md:gap-11"
          >
            {/* Global Export */}
            <div className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-md border border-[#dfb278]/30 flex items-center justify-center text-[#dfb278] group-hover:text-[#faecd8] group-hover:border-[#dfb278]/60 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                <Globe className="w-5 h-5 stroke-[1.6]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[12px] sm:text-[13px] font-semibold text-white leading-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">Global</span>
                <span className="text-[11px] sm:text-[12px] text-[#ebd4b8]/85 leading-tight">Export</span>
              </div>
            </div>

            {/* Consistent Quality */}
            <div className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-md border border-[#dfb278]/30 flex items-center justify-center text-[#dfb278] group-hover:text-[#faecd8] group-hover:border-[#dfb278]/60 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                <Settings className="w-5 h-5 stroke-[1.6]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[12px] sm:text-[13px] font-semibold text-white leading-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">Consistent</span>
                <span className="text-[11px] sm:text-[12px] text-[#ebd4b8]/85 leading-tight">Quality</span>
              </div>
            </div>

            {/* Sustainable & Natural */}
            <div className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-md border border-[#dfb278]/30 flex items-center justify-center text-[#dfb278] group-hover:text-[#faecd8] group-hover:border-[#dfb278]/60 transition-all shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                <Leaf className="w-5 h-5 stroke-[1.6]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[12px] sm:text-[13px] font-semibold text-white leading-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">Sustainable</span>
                <span className="text-[11px] sm:text-[12px] text-[#ebd4b8]/85 leading-tight">& Natural</span>
              </div>
            </div>
          </motion.div>

          {/* Calligraphic Script Badge on Bottom Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-end text-center pb-1 select-none flex-none self-end sm:self-auto"
          >
            <div
              className="leading-[1.05] tracking-wide select-none drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive" }}
            >
              <div className="text-[30px] xs:text-[34px] sm:text-[38px] font-normal text-white">Stone</div>
              <div className="text-[18px] xs:text-[20px] sm:text-[22px] font-light -mt-1 text-[#ebd4b8]">for a better</div>
              <div className="text-[28px] xs:text-[32px] sm:text-[36px] font-normal -mt-0.5 bg-gradient-to-r from-[#faecd8] via-[#e8c697] to-[#d4a86c] bg-clip-text text-transparent">World</div>
            </div>
            <div className="w-8 sm:w-9 h-[1.5px] bg-[#dfb278]/80 mt-2 mx-auto rounded-full shadow-[0_0_8px_rgba(223,178,120,0.6)]" />
          </motion.div>

        </div>

      </div>

      {/* ── BOTTOM MARQUEE ── */}
      <div className="relative z-10 w-full overflow-hidden py-2 sm:py-2.5 border-t border-white/10 bg-transparent pointer-events-none">
        <div className="marquee-track flex whitespace-nowrap gap-6 sm:gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className={`text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.3em] uppercase flex-none font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] ${
                item === "·" ? "text-[#dfb278]" : "text-[#ebd4b8]"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
