"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sun, Sparkles, SlidersHorizontal, RefreshCw } from "lucide-react";
import { ProductStone } from "@/lib/productsData";

interface StoneTextureRotatorProps {
  product: ProductStone;
}

export default function StoneTextureRotator({ product }: StoneTextureRotatorProps) {
  const [lightAngle, setLightAngle] = useState(135);
  const [lightIntensity, setLightIntensity] = useState(80);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotation effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoRotating) {
      interval = setInterval(() => {
        setLightAngle((prev) => (prev + 2) % 360);
      }, 40);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Dynamic style for specular sheen and shadow relief based on angle
  const rad = (lightAngle * Math.PI) / 180;
  const shadowX = Math.cos(rad) * 12;
  const shadowY = Math.sin(rad) * 12;
  const sheenX = 50 + Math.cos(rad) * 40;
  const sheenY = 50 + Math.sin(rad) * 40;

  return (
    <div className="bg-[#faf8f5] text-[#241919] rounded-3xl border border-[#747474]/20 p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#747474]/15 pb-5 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#c85a32] text-xs font-mono uppercase tracking-[0.2em] font-bold">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Interactive Solar Lighting Inspector</span>
          </div>
          <h3 className="font-display font-light text-2xl sm:text-3xl text-[#241919]">
            360° Solar Lighting Simulator
          </h3>
          <p className="text-xs text-[#747474] font-light">
            Rotate the directional solar light source to observe riven cleft shadow relief, sheen reflectivity, and natural texture depth.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
            isAutoRotating
              ? "bg-[#c85a32] text-white border-[#c85a32] shadow-sm font-bold"
              : "bg-white text-[#241919] border-[#747474]/20 hover:border-[#c85a32]"
          }`}
        >
          <RefreshCw size={14} className={isAutoRotating ? "animate-spin" : ""} />
          <span>{isAutoRotating ? "Pause Orbit" : "Auto Orbit Light"}</span>
        </button>
      </div>

      {/* Main Rotator Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Interactive Canvas Viewer (7 Cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            ref={containerRef}
            className="relative aspect-square w-full max-w-[420px] rounded-3xl overflow-hidden border border-[#747474]/20 shadow-lg bg-[#18191c] group select-none cursor-grab active:cursor-grabbing"
          >
            {/* Base Image Specimen */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Specular Dynamic Sheen Layer */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-150 mix-blend-overlay"
              style={{
                background: `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,${
                  (lightIntensity / 100) * 0.9
                }) 0%, rgba(255,255,255,0) 65%)`,
              }}
            />

            {/* Micro Shadow Relief Simulation */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-150 mix-blend-multiply"
              style={{
                boxShadow: `inset ${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.85)`,
              }}
            />

            {/* Orbit Compass Ring Indicator */}
            <div className="absolute inset-4 pointer-events-none rounded-full border border-white/20 border-dashed flex items-center justify-center opacity-50 group-hover:opacity-90 transition-opacity">
              {/* Sun Light Node */}
              <motion.div
                animate={{
                  x: Math.cos(rad) * 160,
                  y: Math.sin(rad) * 160,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-8 h-8 rounded-full bg-[#c85a32] text-white flex items-center justify-center shadow-lg border border-white/40"
              >
                <Sun className="w-4 h-4 animate-spin" style={{ animationDuration: "12s" }} />
              </motion.div>
            </div>

            {/* Dynamic Angle Badge */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-[11px] font-mono text-white">
              Solar Angle: <span className="font-bold text-[#c85a32]">{lightAngle}°</span>
            </div>
          </div>
        </div>

        {/* Right Slider Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Angle Dial Slider */}
          <div className="bg-white p-4 rounded-2xl border border-[#747474]/15 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#241919] font-bold uppercase tracking-wider flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-[#c85a32]" />
                Solar Azimuth Angle
              </span>
              <span className="text-[#c85a32] font-bold">{lightAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={lightAngle}
              onChange={(e) => setLightAngle(parseInt(e.target.value))}
              className="w-full accent-[#c85a32] bg-[#faf8f5] h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#747474]">
              <span>0° (East)</span>
              <span>90° (South)</span>
              <span>180° (West)</span>
              <span>270° (North)</span>
            </div>
          </div>

          {/* Light Intensity Slider */}
          <div className="bg-white p-4 rounded-2xl border border-[#747474]/15 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#241919] font-bold uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-[#c85a32]" />
                Light Sheen Reflectivity
              </span>
              <span className="text-[#c85a32] font-bold">{lightIntensity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={lightIntensity}
              onChange={(e) => setLightIntensity(parseInt(e.target.value))}
              className="w-full accent-[#c85a32] bg-[#faf8f5] h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Quick Angle Presets */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#747474] block font-bold">
              Architectural Lighting Presets
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLightAngle(45)}
                className="py-2.5 px-2 bg-white hover:bg-[#faf8f5] border border-[#747474]/20 rounded-xl text-xs font-mono text-[#241919] transition-all text-center cursor-pointer font-medium"
              >
                Morning 45°
              </button>
              <button
                type="button"
                onClick={() => setLightAngle(180)}
                className="py-2.5 px-2 bg-white hover:bg-[#faf8f5] border border-[#747474]/20 rounded-xl text-xs font-mono text-[#241919] transition-all text-center cursor-pointer font-medium"
              >
                Noon 180°
              </button>
              <button
                type="button"
                onClick={() => setLightAngle(315)}
                className="py-2.5 px-2 bg-white hover:bg-[#faf8f5] border border-[#747474]/20 rounded-xl text-xs font-mono text-[#241919] transition-all text-center cursor-pointer font-medium"
              >
                Golden 315°
              </button>
            </div>
          </div>

          {/* Texture Highlight Note */}
          <div className="p-4 bg-white rounded-2xl border border-[#747474]/15 space-y-1 text-xs">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#c85a32] font-bold block">
              Observed Texture Highlights
            </span>
            <p className="text-[#555555] font-light leading-relaxed text-[11.5px]">
              {product.finish} finish responds to shifting solar angles by highlighting the organic riven depth and crystalline structure of {product.name}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
