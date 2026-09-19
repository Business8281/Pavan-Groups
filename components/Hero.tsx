"use client";
import { useEffect, useRef, useState } from "react";
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
  const [phase, setPhase] = useState<"laser" | "split" | "locked" | "glow">("laser");

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

    // 100% Synchronized choreography
    const t1 = setTimeout(() => setPhase("split"), 500);
    const t2 = setTimeout(() => setPhase("locked"), 1300);
    const t3 = setTimeout(() => setPhase("glow"), 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section
      id="home"
      className="sticky top-0 z-0 w-full min-h-[90vh] md:min-h-screen flex flex-col justify-between items-center overflow-hidden bg-[#090706] mt-[72px] md:mt-0 pt-16 md:pt-24 pb-6 select-none"
    >
      <style jsx>{`
        /* ── LUXURY LIQUID PRISM WAVE ── */
        @keyframes liquidPrismSweep {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .liquid-prism-title {
          background: linear-gradient(
            115deg,
            rgba(255, 255, 255, 0.88) 0%,
            rgba(255, 255, 255, 0.98) 35%,
            #ffffff 50%,
            rgba(255, 255, 255, 0.98) 65%,
            rgba(255, 255, 255, 0.88) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: liquidPrismSweep 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* ── LIVING WHITE NEON PULSE ── */
        @keyframes whiteNeonPulse {
          0%, 100% {
            text-shadow:
              0 0 10px rgba(255, 255, 255, 0.95),
              0 0 26px rgba(255, 255, 255, 0.75),
              0 0 58px rgba(255, 255, 255, 0.4);
          }
          50% {
            text-shadow:
              0 0 16px rgba(255, 255, 255, 1),
              0 0 40px rgba(255, 255, 255, 0.95),
              0 0 85px rgba(255, 255, 255, 0.65);
          }
        }

        .white-neon-glow {
          animation: whiteNeonPulse 3.5s ease-in-out infinite alternate;
        }
      `}</style>

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

        {/* ── CINEMATIC DUAL CONTRAST VIGNETTE ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      {/* ── TOP SPACER ── */}
      <div className="relative z-10" />

      {/* ── SOLE HERO FOCUS: SYNCHRONIZED ARCHITECTURAL APERTURE SPLIT ── */}
      <div className="relative z-10 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center my-auto">
        <div className="relative w-full max-w-5xl h-28 sm:h-36 md:h-48 flex items-center justify-center">
          
          {/* Central Laser Filament Ray */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              phase === "laser"
                ? { scaleX: 1, opacity: 1 }
                : phase === "split"
                ? { scaleX: 1.1, opacity: 0.85 }
                : { scaleX: 1.4, opacity: 0 }
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute h-[1.5px] w-full max-w-4xl bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_18px_#ffffff] z-20 pointer-events-none"
          />

          {/* Top Half of Typography (Rises from Laser Horizon) */}
          <motion.div
            initial={{ y: "40%", opacity: 0 }}
            animate={
              phase === "laser"
                ? { y: "40%", opacity: 0 }
                : phase === "split"
                ? { y: "0%", opacity: 1 }
                : { y: "0%", opacity: 1 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ clipPath: phase === "locked" || phase === "glow" ? "none" : "inset(0 0 50% 0)" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span
              className={`font-display font-light text-white uppercase text-[26px] xs:text-[34px] sm:text-[50px] md:text-[66px] lg:text-[76px] leading-none whitespace-nowrap tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.24em] transition-all duration-700 ${
                phase === "glow" ? "white-neon-glow" : "drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
              }`}
            >
              <span className="liquid-prism-title">
                PAVAN STONES GROUP
              </span>
            </span>
          </motion.div>

          {/* Bottom Half of Typography (Lowers from Laser Horizon) */}
          {phase !== "locked" && phase !== "glow" && (
            <motion.div
              initial={{ y: "-40%", opacity: 0 }}
              animate={
                phase === "laser"
                  ? { y: "-40%", opacity: 0 }
                  : { y: "0%", opacity: 1 }
              }
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ clipPath: "inset(50% 0 0 0)" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span className="font-display font-light text-white uppercase text-[26px] xs:text-[34px] sm:text-[50px] md:text-[66px] lg:text-[76px] leading-none whitespace-nowrap tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.24em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
                <span className="liquid-prism-title">
                  PAVAN STONES GROUP
                </span>
              </span>
            </motion.div>
          )}

        </div>
      </div>

      {/* ── BOTTOM MARQUEE ── */}
      <div className="relative z-10 w-full overflow-hidden py-2 sm:py-2.5 border-t border-white/10 bg-black/30 backdrop-blur-sm pointer-events-none">
        <div className="marquee-track flex whitespace-nowrap gap-6 sm:gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className={`text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.3em] uppercase flex-none font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] ${
                item === "·" ? "text-[#c85a32]" : "text-white/85"
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


