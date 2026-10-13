"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Sun,
  Moon,
  Lightbulb,
  Sparkles,
  Check,
  Info,
  Home as House,
  Utensils,
  Droplet,
  Layers,
  Locate,
} from "lucide-react";
import { ProductStone } from "@/lib/productsData";

interface ProductSceneVisualizerProps {
  product: ProductStone;
}

type SceneId = "facade" | "foyer" | "pool" | "countertop";
type LightingMode = "daylight" | "warm" | "dusk";

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  desc: string;
}

interface SceneOption {
  id: SceneId;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  bgImage: string;
  hotspots: Hotspot[];
  overlayStyle: (product: ProductStone, lighting: LightingMode) => React.CSSProperties;
}

const SCENES: SceneOption[] = [
  {
    id: "facade",
    name: "Exterior Facade & Rainscreen",
    subtitle: "Ventilated wall cladding under ambient sunlight",
    icon: Layers,
    bgImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    hotspots: [
      { id: "h1", x: 45, y: 35, title: "Ventilated Rainscreen", desc: "15mm calibrated panels mounted with concealed stainless clips." },
      { id: "h2", x: 70, y: 60, title: "Weather Resistance", desc: "Resists heavy UV exposure, freeze-thaw cycles, and acid rain." },
    ],
    overlayStyle: (product, lighting) => {
      let brightness = 1;
      let sepia = 0;
      if (lighting === "warm") {
        brightness = 0.9;
        sepia = 0.25;
      } else if (lighting === "dusk") {
        brightness = 0.6;
        sepia = 0.1;
      }
      return {
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%), url(${product.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        mixBlendMode: "overlay",
        opacity: 0.85,
        filter: `brightness(${brightness}) sepia(${sepia})`,
      };
    },
  },
  {
    id: "foyer",
    name: "Luxury Living Foyer",
    subtitle: "Monolithic interior floor expanse",
    icon: House,
    bgImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    hotspots: [
      { id: "h3", x: 50, y: 75, title: "Monolithic Flooring", desc: "600x600mm calibrated slabs laid with 2mm minimal grout joints." },
      { id: "h4", x: 30, y: 40, title: "Radiant Thermal Mass", desc: "Absorbs ambient room warmth and works with underfloor heating." },
    ],
    overlayStyle: (product, lighting) => {
      let brightness = 1;
      if (lighting === "warm") brightness = 0.85;
      if (lighting === "dusk") brightness = 0.55;
      return {
        backgroundImage: `url(${product.image})`,
        backgroundSize: "cover",
        mixBlendMode: "soft-light",
        opacity: 0.9,
        filter: `brightness(${brightness})`,
      };
    },
  },
  {
    id: "pool",
    name: "Resort Pool Deck & Coping",
    subtitle: "Anti-skid wet deck perimeter stone",
    icon: Droplet,
    bgImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80",
    hotspots: [
      { id: "h5", x: 60, y: 65, title: "R11 Anti-Skid Deck", desc: "Certified non-slip texture even when wet under pool splash." },
      { id: "h6", x: 25, y: 80, title: "Cool Underfoot", desc: "High thermal dissipation keeps surface comfortable under intense sun." },
    ],
    overlayStyle: (product, lighting) => {
      let brightness = 1;
      if (lighting === "warm") brightness = 0.9;
      if (lighting === "dusk") brightness = 0.6;
      return {
        backgroundImage: `url(${product.image})`,
        backgroundSize: "cover",
        mixBlendMode: "multiply",
        opacity: 0.75,
        filter: `brightness(${brightness})`,
      };
    },
  },
  {
    id: "countertop",
    name: "Architectural Kitchen Island",
    subtitle: "Polished & leathered waterfall counter",
    icon: Utensils,
    bgImage:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80",
    hotspots: [
      { id: "h7", x: 40, y: 55, title: "Stain & Heat Proof", desc: "Impervious to citrus, oil spills, and hot cookware placement." },
      { id: "h8", x: 75, y: 45, title: "Mitred Edge Profile", desc: "40mm thick look fabricated from 20mm slabs with 45° mitred joint." },
    ],
    overlayStyle: (product, lighting) => {
      return {
        backgroundImage: `url(${product.image})`,
        backgroundSize: "cover",
        mixBlendMode: "overlay",
        opacity: 0.88,
      };
    },
  },
];

export default function ProductSceneVisualizer({
  product,
}: ProductSceneVisualizerProps) {
  const [activeScene, setActiveScene] = useState<SceneId>("facade");
  const [lighting, setLighting] = useState<LightingMode>("daylight");
  const [scale, setScale] = useState<"standard" | "large">("standard");
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const currentScene =
    SCENES.find((s) => s.id === activeScene) || SCENES[0];

  return (
    <div className="bg-[#faf8f5] text-[#241919] rounded-3xl border border-[#747474]/20 overflow-hidden shadow-sm">
      {/* Visualizer Header */}
      <div className="p-5 sm:p-7 border-b border-[#747474]/15 flex flex-wrap items-center justify-between gap-4 bg-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#c85a32] text-xs font-mono uppercase tracking-[0.2em] font-bold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Interactive In-Situ Scene Simulator</span>
          </div>
          <h3 className="font-display font-light text-2xl sm:text-3xl text-[#241919]">
            Architectural Application Simulator
          </h3>
          <p className="text-xs text-[#747474] font-light">
            Toggle lighting conditions and click interactive hotspots to inspect material behavior in real environments.
          </p>
        </div>

        {/* Ambient Lighting Controls */}
        <div className="flex items-center gap-1.5 bg-[#faf8f5] p-1.5 rounded-xl border border-[#747474]/20">
          <button
            type="button"
            onClick={() => setLighting("daylight")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              lighting === "daylight"
                ? "bg-[#c85a32] text-white font-semibold shadow-xs"
                : "text-[#747474] hover:text-[#241919]"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Natural Sun</span>
          </button>

          <button
            type="button"
            onClick={() => setLighting("warm")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              lighting === "warm"
                ? "bg-[#c85a32] text-white font-semibold shadow-xs"
                : "text-[#747474] hover:text-[#241919]"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>3000K Warm LED</span>
          </button>

          <button
            type="button"
            onClick={() => setLighting("dusk")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              lighting === "dusk"
                ? "bg-[#c85a32] text-white font-semibold shadow-xs"
                : "text-[#747474] hover:text-[#241919]"
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Exterior Dusk</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Stage Viewport (8 Cols) */}
        <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black group">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeScene}-${scale}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* Base Scene Image */}
              <img
                src={currentScene.bgImage}
                alt={currentScene.name}
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  scale === "large" ? "scale-125" : "scale-100"
                }`}
              />

              {/* Stone Material Layer */}
              <div
                className="absolute inset-0 transition-all duration-700 pointer-events-none"
                style={currentScene.overlayStyle(product, lighting)}
              />

              {/* Lighting Aura Overlay */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                  lighting === "warm"
                    ? "bg-amber-950/20 mix-blend-color-dodge"
                    : lighting === "dusk"
                    ? "bg-indigo-950/40 mix-blend-multiply"
                    : "bg-transparent"
                }`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Interactive Pulsing Hotspots */}
          {currentScene.hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute z-20"
              style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
            >
              <button
                type="button"
                onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                className="relative group flex items-center justify-center cursor-pointer"
              >
                <span className="w-7 h-7 rounded-full bg-[#c85a32]/80 border-2 border-white text-white flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                  <Locate className="w-4 h-4 animate-spin" style={{ animationDuration: "10s" }} />
                </span>
                <span className="absolute w-12 h-12 rounded-full bg-[#c85a32]/40 animate-ping pointer-events-none" />
              </button>

              {/* Hotspot Tooltip Popup */}
              <AnimatePresence>
                {activeHotspot?.id === spot.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 w-56 p-3.5 bg-[#241919] text-white rounded-2xl border border-white/20 shadow-2xl text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[#c85a32] font-mono font-bold text-[11px]">
                      <span>{spot.title}</span>
                      <button
                        type="button"
                        onClick={() => setActiveHotspot(null)}
                        className="text-white/60 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-[11px] text-white/80 font-light leading-snug">
                      {spot.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Top Left Status Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-xl text-xs font-mono text-white border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c85a32] animate-ping" />
              <span>{currentScene.name}</span>
            </span>
          </div>

          {/* Zoom Toggle */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setScale("standard")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                scale === "standard" ? "bg-white/20 text-white font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              1:1 Standard
            </button>
            <button
              type="button"
              onClick={() => setScale("large")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                scale === "large" ? "bg-white/20 text-white font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              Zoom Specimen
            </button>
          </div>
        </div>

        {/* Right Scene Selection Rail (4 Cols) */}
        <div className="lg:col-span-4 p-5 bg-[#faf8f5] border-t lg:border-t-0 lg:border-l border-[#747474]/15 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#747474] block font-bold">
              Select Architectural Typology
            </span>

            <div className="space-y-2">
              {SCENES.map((scene) => {
                const Icon = scene.icon;
                const isActive = activeScene === scene.id;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => {
                      setActiveScene(scene.id);
                      setActiveHotspot(null);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-white border-[#c85a32] text-[#241919] shadow-sm font-bold"
                        : "bg-white/60 border-[#747474]/20 text-[#747474] hover:bg-white hover:border-[#747474]/40 hover:text-[#241919]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-none ${
                          isActive
                            ? "bg-[#c85a32] text-white"
                            : "bg-[#faf8f5] text-[#241919] border border-[#747474]/20"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-xs sm:text-sm text-[#241919]">
                          {scene.name}
                        </h4>
                        <p className="text-[11px] text-[#747474] font-light">
                          {scene.subtitle}
                        </p>
                      </div>
                    </div>

                    {isActive && (
                      <div className="w-5 h-5 rounded-full bg-[#c85a32] flex items-center justify-center text-white">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#747474]/15 space-y-1.5 text-xs">
            <span className="text-[10px] font-mono text-[#c85a32] uppercase tracking-wider block font-bold">
              Hot-Spot Feature Tip
            </span>
            <p className="text-[#555555] font-light leading-relaxed text-[11.5px]">
              Click target rings on the viewport to reveal architectural installation standards for {product.name}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
