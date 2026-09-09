"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { getAssetPath } from "@/lib/basePath";

const MARQUEE_ITEMS = [
  "Granite", "·", "Limestone", "·", "Slate", "·", "Cobbles",
  "·", "Quartzite", "·", "Sandstone", "·", "Basalt", "·",
  "Granite", "·", "Limestone", "·", "Slate", "·", "Cobbles",
  "·", "Quartzite", "·", "Sandstone", "·", "Basalt", "·",
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force play & mute via JS ref to bypass strict browser autoplay policies
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
      className="sticky top-0 z-0 w-full aspect-video md:aspect-auto md:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0a0604] mt-[72px] md:mt-0 md:pt-[72px]"
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
          className="w-full h-full object-cover object-center"
        >
          <source src={getAssetPath("/assets/webpage_front_display_video.mp4")} type="video/mp4" />
        </video>

        {/* ── SUBTLE CINEMATIC HAZE LAYER ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.42) 100%)",
          }}
        />
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 px-3 sm:px-8 md:px-14 lg:px-20 max-w-7xl mx-auto w-full flex flex-col items-center text-center -translate-y-3 sm:-translate-y-12 md:-translate-y-36">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extralight text-white leading-[1.05] tracking-[0.04em] max-w-xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]"
          style={{ fontSize: "clamp(24px, 4.5vw, 60px)", fontWeight: 200 }}
        >
          PAVAN GROUPS
        </motion.h1>
      </div>

      {/* ── BOTTOM TRANSPARENT MARQUEE ── */}
      <div className="absolute bottom-0 inset-x-0 z-10 overflow-hidden py-1.5 sm:py-2.5 md:py-3.5 border-t border-white/15 bg-black/20 pointer-events-none">
        <div className="marquee-track flex whitespace-nowrap gap-6 sm:gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className={`text-[8.5px] sm:text-[9.5px] md:text-[11px] tracking-[0.32em] uppercase flex-none font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] ${item === "·" ? "text-[#c25e3e]" : "text-white/90"
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
