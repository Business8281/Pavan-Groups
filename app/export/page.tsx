"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Package,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Award,
  Layers,
  FileCheck,
  Scale,
  Anchor,
  ArrowRight,
  Eye,
  Check,
  Boxes,
  Sparkles,
  ChevronRight,
  Gauge,
  Sliders,
  Compass,
  AlertCircle,
  Ship,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import ShippingAustralia from "@/components/ShippingAustralia";
import TheJourney from "@/components/TheJourney";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── PACKAGING DATA ──
const PACKAGING_TYPES = [
  {
    id: "gangsaw-slabs",
    title: "Gangsaw Slabs Packaging",
    subtitle: "Heavy-Duty Steel-Braced A-Frames & S-Frames",
    desc: "Engineered for monolithic 20mm & 30mm granite/quartzite slabs up to 3300x2000mm. Each bundle is bound by structural tension straps and insulated with plastic barrier sheeting.",
    specs: [
      { label: "Frame Type", val: "ISPM-15 Hardwood A-Frames with Diagonal Steel Braces" },
      { label: "Bundle Capacity", val: "12 - 16 Slabs per A-Frame (400 - 460 m² per FCL)" },
      { label: "Interlayering", val: "0.5mm PE Film between polished faces to eliminate scratches" },
      { label: "Corner Cushions", val: "High-density vulcanized rubber edge protectors" },
      { label: "Strapping", val: "32mm heavy-gauge polyester composite strapping" },
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    badge: "SLAB PROTECTION",
  },
  {
    id: "slate-tiles",
    title: "Slate & Flagstone Packaging",
    subtitle: "Armored Seaworthy Hardwood Wooden Crates",
    desc: "Built with seasoned, fumigated solid timber slats reinforced with galvanized steel corner bands. Designed to withstand multi-modal rough sea conditions without flexing.",
    specs: [
      { label: "Crate Material", val: "Seasoned Pine & Hardwood, Fumigated & Heat-Treated" },
      { label: "Crate Weight Limit", val: "1,100 kg - 1,250 kg per individual crate" },
      { label: "Lining", val: "Waterproof polyethylene membrane + corrugated sheets" },
      { label: "Desiccants", val: "Silica-gel pouches inside each crate against humidity" },
      { label: "Strapping", val: "4-way heavy steel / poly bands per wooden crate" },
    ],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    badge: "TILE & PAVER PROTECTION",
  },
  {
    id: "limestone-pavers",
    title: "Limestone & Architectural Pavers",
    subtitle: "Palletized Reinforced Wooden Crates",
    desc: "Calibrated limestone, tumbled pavers, and cobbles are stacked vertically on solid base runners with heavy corner brackets and shrink-wrapped for zero movement.",
    specs: [
      { label: "Pallet Base", val: "4-way entry heavy forklift runners" },
      { label: "Stacking Logic", val: "Vertical edge-stacked tiles to eliminate fracture loads" },
      { label: "Outer Enclosure", val: "100-micron UV-stabilized heavy shrink film" },
      { label: "Capacity", val: "22 - 27 MT per 20ft Full Container Load (FCL)" },
      { label: "Fumigation", val: "ISPM-15 Heat Treated phytosanitary stamp on every crate" },
    ],
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80",
    badge: "LIMESTONE CRATING",
  },
  {
    id: "cnc-carvings",
    title: "3D CNC & Bespoke Carvings",
    subtitle: "Custom Foam-Molded Encased Crating",
    desc: "High-value 3D architectural panels, CNC perforated screens, and sculptures receive custom-cut EPE foam contour molds within rigid multi-ply armored crates.",
    specs: [
      { label: "Interior Shell", val: "High-density CNC-cut EPE shock-absorbent foam" },
      { label: "Enclosure", val: "18mm Marine-grade plywood reinforced outer box" },
      { label: "Tilt / Shock Sensors", val: "Optional transit shock-indicator stickers on request" },
      { label: "Handling Marks", val: "International ISO fragility and center-of-gravity labels" },
      { label: "Moisture Seal", val: "Vacuum-sealed internal protective vapor bag" },
    ],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
    badge: "LUXURY CARVING CRATING",
  },
];

// ── CONTAINER LOADING DATA ──
const CONTAINER_STEPS = [
  {
    step: "01",
    title: "Container Pre-Inspection",
    desc: "Every 20ft container supplied by shipping lines is rigorously checked for floor integrity, structural sound walls, watertight seals, and zero odor or moisture.",
    details: ["Dry, clean, and rust-free interior", "Intact rubber door gaskets & locking cams", "Tare weight & payload validation"],
  },
  {
    step: "02",
    title: "Weight Distribution & Centering",
    desc: "Stone crates and A-frames are placed symmetrically along the container's longitudinal axis to ensure even axle weight distribution across sea and road transit.",
    details: ["Centered mass along the container spine", "Prevents tilt during gantry crane hoisting", "Payload strictly capped at 27.0 MT max limit"],
  },
  {
    step: "03",
    title: "Heavy-Duty Timber Bracing & Chocking",
    desc: "Solid 4x4-inch timber blocks are nailed directly to the container floor and side tracks, creating an unyielding perimeter lock around every crate base.",
    details: ["Heavy pine cross-members & floor chocks", "Diagonal wall struts prevent lateral shifting", "Zero empty voids left between crate rows"],
  },
  {
    step: "04",
    title: "Dunnage Air Bags & Webbing Lashing",
    desc: "High-pressure maritime dunnage air bags are inserted and inflated into intermediate voids, while 5-ton rated polyester ratchet belts lash crates to container D-rings.",
    details: ["Polypropylene woven air bags (Level 2/3 certified)", "5,000 kg breaking strength ratchet tie-downs", "Absorbs maritime swell, pitch, and heave stresses"],
  },
  {
    step: "05",
    title: "High-Security Bolt Sealing & Customs Documentation",
    desc: "Once sealed, an ISO 17712 certified tamper-evident bolt seal is fastened. Full digital container photos and complete export dossiers are dispatched to the client.",
    details: ["ISO 17712 Certified High-Security Bolt Seal", "Complete photo report of loading sequence", "E-Bill of Lading, Packing List, Fumigation & Certificate of Origin"],
  },
];

// ── QUALITY INSPECTION DATA ──
const INSPECTION_PILLARS = [
  {
    icon: Scale,
    title: "Caliper & Diagonal Calibration",
    badge: "TOLERANCE ±0.5mm",
    desc: "Electronic digital vernier calipers and laser squares verify uniform thickness, edge orthogonality, and precise dimensional squareness across every single piece.",
    criteria: [
      "Thickness calibration: ±1.0mm for gangsaw slabs, ±0.5mm for calibrated tiles",
      "Diagonal squareness: 90° ±0.5mm to ensure seamless joint alignment",
      "Edge chamfer & bevel precision check",
    ],
  },
  {
    icon: Sparkles,
    title: "Surface Finish & Glossometer Audit",
    badge: "95+ GLOSS RATING",
    desc: "Using multi-angle digital gloss meters, surface reflectivity is measured across 9 test points per slab to ensure flawless, mirror-like depth without waves or haze.",
    criteria: [
      "Mirror Polish: Guaranteed 90-95+ gloss units on premium granites",
      "Flamed / Honed: Uniform tactile texture free of blade scratch marks",
      "Leather / Velvet: Smooth undulating relief with zero resin buildup",
    ],
  },
  {
    icon: Layers,
    title: "Vein Continuity & Color Sequencing",
    badge: "BOOKMATCH ACCURACY",
    desc: "Consecutively sawn slabs from the same quarry block are digitally cataloged and numbered. Vein trajectories are verified for flawless bookmatched and slip-matched installations.",
    criteria: [
      "Block-wise consecutive bundle sequencing",
      "Digital layout preview sent for architect approval before crating",
      "Natural shade consistency verification across the batch",
    ],
  },
  {
    icon: Eye,
    title: "Sonic & Structural Integrity Scan",
    badge: "100% SOUND STONE",
    desc: "Every slab and tile undergoes acoustic resonance and high-intensity back-lighting inspection to detect any latent micro-cracks, dry veins, or natural fissures.",
    criteria: [
      "Acoustic ring resonance check across 4 corners",
      "Visual inspection under 5000K daylight-balanced illumination",
      "Zero artificial dyed resin or cosmetic fillers",
    ],
  },
  {
    icon: FileCheck,
    title: "Pre-Shipment Digital Inspection Report",
    badge: "TRANSPARENT AUDIT",
    desc: "Before any crate is nailed and loaded, our QA team compiles a comprehensive digital PDF dossier with high-resolution photos, measurement tables, and video proof.",
    criteria: [
      "Individual high-res photos of sawn slabs and crates",
      "Batch inspection certificate signed by Lead QA Engineer",
      "Client approval required prior to container gate-in",
    ],
  },
  {
    icon: Award,
    title: "ISPM-15 & Phytosanitary Certification",
    badge: "GOVT. CERTIFIED",
    desc: "All wooden packaging materials undergo certified methyl bromide / heat treatment at approved facilities, stamped with official IPPC phytosanitary emblems.",
    criteria: [
      "ISPM-15 compliant heat treatment (56°C core for 30 mins)",
      "Official Plant Quarantine Fumigation Certificate issued",
      "Hassle-free customs clearance at all global destination ports",
    ],
  },
];

// ── TELEMETRY STATS FOR GSAP ODOMETER ──
const LIVE_METRICS = [
  { id: "ports", label: "Global Destination Ports", target: 42, suffix: "+", sub: "Direct Seaport Terminals" },
  { id: "payload", label: "Max 20ft FCL Payload", target: 27.0, decimals: 1, suffix: " MT", sub: "Legal Seaworthy Weight Limit" },
  { id: "tolerance", label: "Diamond Calibration", text: "±0.5mm", sub: "Precision Caliper Tolerance" },
  { id: "volume", label: "Annual Export Volume", target: 150000, suffix: " SQM", sub: "Combined Quarry Output" },
  { id: "compliance", label: "ISPM-15 Certified Timber", target: 100, suffix: "%", sub: "Heat-Treated Phytosanitary" },
];

// ── GLOBAL TRADE LANES FOR GSAP INFINITE MARQUEE ──
const GLOBAL_TRADE_LANES = [
  { port: "Port of Rotterdam", code: "NLRTM", country: "Netherlands", transit: "22-26 Days" },
  { port: "Port of Hamburg", code: "DEHAM", country: "Germany", transit: "24-28 Days" },
  { port: "Sydney Harbour", code: "AUSYD", country: "Australia", transit: "18-22 Days" },
  { port: "Port Houston", code: "USHOU", country: "USA", transit: "32-38 Days" },
  { port: "Port of Antwerp", code: "BEANR", country: "Belgium", transit: "23-27 Days" },
  { port: "Jebel Ali Port", code: "AEJEA", country: "UAE", transit: "4-6 Days" },
  { port: "Port of Melbourne", code: "AUMEL", country: "Australia", transit: "20-24 Days" },
  { port: "New York / New Jersey", code: "USNYC", country: "USA", transit: "28-34 Days" },
  { port: "Port of Singapore", code: "SGSIN", country: "Singapore", transit: "6-8 Days" },
  { port: "Port of Felixstowe", code: "GBFXT", country: "United Kingdom", transit: "25-30 Days" },
  { port: "Port of Valencia", code: "ESVLC", country: "Spain", transit: "20-24 Days" },
  { port: "Port of Durban", code: "ZADUR", country: "South Africa", transit: "14-18 Days" },
];

// ── INTERACTIVE CARGO SIMULATION MODES ──
const CARGO_SIMULATION_MODES = [
  {
    id: "slabs",
    name: "Gangsaw Slabs (20mm / 30mm)",
    frameType: "Heavy-Duty Steel A-Frames",
    itemsCount: "16 Monolithic Slabs",
    grossWeight: 24.85,
    maxWeight: 27.0,
    dunnagePsi: 1.8,
    chocksCount: 12,
    lashingCount: "8x 5-Ton Ratchet Belts",
    cogBalance: "50.0% / 50.0%",
    status: "Optimal Heavy Weight Center",
    description: "Vertical slab bundles locked along container spine. Diagonal steel struts and rubber cushion strips isolate polished faces against maritime sea swell.",
    color: "#ff5500",
  },
  {
    id: "tiles",
    name: "Calibrated Tiles & Flagstones",
    frameType: "ISPM-15 Armored Hardwood Crates",
    itemsCount: "20 Wooden Crates",
    grossWeight: 26.20,
    maxWeight: 27.0,
    dunnagePsi: 2.1,
    chocksCount: 16,
    lashingCount: "6x Perimeter Steel Bands",
    cogBalance: "50.1% / 49.9%",
    status: "Uniform Bed Symmetry",
    description: "Interlocking crate positioning with double pine floor chocks nailed at each corner to prevent longitudinal movement during crane hoisting.",
    color: "#0077b6",
  },
  {
    id: "pavers",
    name: "Architectural Cobbles & Heavy Pavers",
    frameType: "Reinforced Palletized Crates",
    itemsCount: "22 Pallet Units",
    grossWeight: 27.00,
    maxWeight: 27.0,
    dunnagePsi: 2.4,
    chocksCount: 20,
    lashingCount: "10x Heavy Lashing Straps",
    cogBalance: "50.0% / 50.0%",
    status: "Maximum Legal Road Payload",
    description: "Full container payload utilization. High-pressure maritime air dunnage bags between rows absorb 100% of vessel roll, heave, and pitch shockwaves.",
    color: "#023e8a",
  },
];

export default function ExportPage() {
  const [selectedPackaging, setSelectedPackaging] = useState(0);
  const [simMode, setSimMode] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);

  const weightBarRef = useRef<HTMLDivElement>(null);
  const weightValRef = useRef<HTMLSpanElement>(null);
  const psiValRef = useRef<HTMLSpanElement>(null);
  const currentSimWeight = useRef(CARGO_SIMULATION_MODES[0].grossWeight);
  const currentSimPsi = useRef(CARGO_SIMULATION_MODES[0].dunnagePsi);

  // ── Lenis-Powered Smooth Section Hopper ──
  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined" && window.__lenis) {
      const el = document.getElementById(id);
      if (el) {
        window.__lenis.scrollTo(el, { offset: -80, duration: 1.5 });
        return;
      }
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ── GSAP Context Initialization & ScrollTrigger ──
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. GSAP Counter Odometers (Triggered as metrics scroll into view)
      const counters = containerRef.current?.querySelectorAll<HTMLElement>(".export-gsap-counter");
      counters?.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") || "0");
        const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            el.textContent =
              decimals > 0
                ? obj.val.toFixed(decimals)
                : Math.round(obj.val).toLocaleString();
          },
        });
      });

      // 2. GSAP Infinite Smooth Sea Lanes Marquee
      const track = marqueeTrackRef.current;
      if (track) {
        marqueeTweenRef.current = gsap.to(track, {
          xPercent: -50,
          repeat: -1,
          duration: 38,
          ease: "none",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── GSAP Dynamic Tweens on Container Simulation Change ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mode = CARGO_SIMULATION_MODES[simMode];

    // Animate Weight Gauge Bar
    if (weightBarRef.current) {
      const percentage = (mode.grossWeight / mode.maxWeight) * 100;
      gsap.to(weightBarRef.current, {
        width: `${percentage}%`,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    // Animate Gross Weight Number
    if (weightValRef.current) {
      const obj = { val: currentSimWeight.current };
      gsap.to(obj, {
        val: mode.grossWeight,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          if (weightValRef.current) {
            weightValRef.current.textContent = obj.val.toFixed(2);
          }
        },
        onComplete: () => {
          currentSimWeight.current = mode.grossWeight;
        },
      });
    }

    // Animate Dunnage PSI Gauge
    if (psiValRef.current) {
      const obj = { val: currentSimPsi.current };
      gsap.to(obj, {
        val: mode.dunnagePsi,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          if (psiValRef.current) {
            psiValRef.current.textContent = `${obj.val.toFixed(1)} PSI`;
          }
        },
        onComplete: () => {
          currentSimPsi.current = mode.dunnagePsi;
        },
      });
    }
  }, [simMode]);

  // Marquee hover slow-down & resume
  const handleMarqueeEnter = () => {
    if (marqueeTweenRef.current) {
      gsap.to(marqueeTweenRef.current, { timeScale: 0.25, duration: 0.5 });
    }
  };
  const handleMarqueeLeave = () => {
    if (marqueeTweenRef.current) {
      gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  const currentPackaging = PACKAGING_TYPES[selectedPackaging];
  const currentSim = CARGO_SIMULATION_MODES[simMode];

  return (
    <div
      ref={containerRef}
      className="bg-[#fcfbf9] min-h-screen text-[#140d0a] font-sans selection:bg-[#ff5500] selection:text-white flex flex-col"
    >
      <main className="flex-grow pt-24 sm:pt-28 lg:pt-32 pb-12 flex flex-col justify-between w-full relative">
        {/* ── HERO BANNER ── */}
        <section className="px-4 sm:px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full pt-4 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#140d0a]/10">
            <div className="max-w-3xl space-y-4">
              <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#ff5500] font-bold block">
                GLOBAL MARITIME EXPORT LOGISTICS
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-tight text-[#140d0a]">
                Global Export &amp;{" "}
                <span className="italic text-[#ff5500]">Seaworthy Logistics</span>
              </h1>
              <p className="text-[15px] sm:text-[16.5px] text-[#140d0a]/70 font-sans font-light leading-relaxed max-w-2xl">
                Precision crating, certified container loading protocols, and uncompromising multi-point QA inspection — delivering natural stone from Indian quarries to 40+ international sea ports in factory-fresh condition.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-none">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#ff5500] text-white text-xs font-sans uppercase tracking-wider font-semibold rounded-[4px] hover:bg-[#e04b00] transition-colors shadow-sm"
              >
                <span>Export Inquiry Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white border border-[#140d0a]/20 text-[#140d0a] text-xs font-sans uppercase tracking-wider font-semibold rounded-[4px] hover:border-[#140d0a] transition-colors"
              >
                <span>Explore Catalog</span>
              </Link>
            </div>
          </div>

          {/* ── 4 CORE SECTION QUICK HOPPER BUTTONS (LENIS SMOOTH SCROLL) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-8">
            <button
              onClick={() => scrollToSection("section-packaging")}
              className="flex items-center gap-3.5 p-4 bg-white border border-[#140d0a]/10 rounded-[4px] text-left hover:border-[#ff5500] hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-[4px] bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500] group-hover:bg-[#ff5500] group-hover:text-white transition-colors shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9.5px] font-sans uppercase tracking-widest text-[#ff5500] font-bold block">
                  SECTION 01
                </span>
                <h3 className="font-display font-medium text-[15px] text-[#140d0a] group-hover:text-[#ff5500] transition-colors truncate">
                  Packaging
                </h3>
                <p className="text-[11px] text-[#140d0a]/60 truncate font-sans font-light">
                  ISPM-15 Hardwood Crates
                </p>
              </div>
            </button>

            <button
              onClick={() => scrollToSection("section-container-loading")}
              className="flex items-center gap-3.5 p-4 bg-white border border-[#140d0a]/10 rounded-[4px] text-left hover:border-[#ff5500] hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-[4px] bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500] group-hover:bg-[#ff5500] group-hover:text-white transition-colors shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9.5px] font-sans uppercase tracking-widest text-[#ff5500] font-bold block">
                  SECTION 02
                </span>
                <h3 className="font-display font-medium text-[15px] text-[#140d0a] group-hover:text-[#ff5500] transition-colors truncate">
                  Container Loading
                </h3>
                <p className="text-[11px] text-[#140d0a]/60 truncate font-sans font-light">
                  20ft FCL Bracing &amp; Dunnage
                </p>
              </div>
            </button>

            <button
              onClick={() => scrollToSection("section-container-simulator")}
              className="flex items-center gap-3.5 p-4 bg-white border border-[#140d0a]/10 rounded-[4px] text-left hover:border-[#ff5500] hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-[4px] bg-[#0077b6]/10 flex items-center justify-center text-[#0077b6] group-hover:bg-[#0077b6] group-hover:text-white transition-colors shrink-0">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9.5px] font-sans uppercase tracking-widest text-[#0077b6] font-bold block">
                  INTERACTIVE TOOL
                </span>
                <h3 className="font-display font-medium text-[15px] text-[#140d0a] group-hover:text-[#0077b6] transition-colors truncate">
                  Cargo Simulator
                </h3>
                <p className="text-[11px] text-[#140d0a]/60 truncate font-sans font-light">
                  Weight &amp; Balance Engine
                </p>
              </div>
            </button>

            <button
              onClick={() => scrollToSection("section-quality-inspection")}
              className="flex items-center gap-3.5 p-4 bg-white border border-[#140d0a]/10 rounded-[4px] text-left hover:border-[#ff5500] hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-[4px] bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500] group-hover:bg-[#ff5500] group-hover:text-white transition-colors shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9.5px] font-sans uppercase tracking-widest text-[#ff5500] font-bold block">
                  SECTION 03
                </span>
                <h3 className="font-display font-medium text-[15px] text-[#140d0a] group-hover:text-[#ff5500] transition-colors truncate">
                  Quality Inspection
                </h3>
                <p className="text-[11px] text-[#140d0a]/60 truncate font-sans font-light">
                  6-Stage Caliper &amp; Gloss QC
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* ── GSAP ANIMATED LIVE METRIC TELEMETRY COUNTER STRIP ── */}
        <section className="px-4 sm:px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full pb-8">
          <div className="bg-white border border-[#140d0a]/10 rounded-[4px] p-6 lg:p-7 shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#140d0a]/10">
              {LIVE_METRICS.map((metric, idx) => (
                <div key={metric.id} className={`${idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""}`}>
                  <span className="block text-[10px] font-sans tracking-[0.16em] uppercase text-[#ff5500] font-bold">
                    {metric.label}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    {metric.target !== undefined ? (
                      <>
                        <span
                          className="export-gsap-counter font-sans text-2xl sm:text-3xl font-bold text-[#140d0a] tracking-tight"
                          data-target={metric.target}
                          data-decimals={metric.decimals ?? 0}
                        >
                          0
                        </span>
                        <span className="font-sans text-xl font-bold text-[#140d0a]">
                          {metric.suffix}
                        </span>
                      </>
                    ) : (
                      <span className="font-sans text-2xl sm:text-3xl font-bold text-[#140d0a] tracking-tight">
                        {metric.text}
                      </span>
                    )}
                  </div>
                  <span className="block text-xs font-sans text-[#140d0a]/60 font-light mt-0.5">
                    {metric.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTINUOUS GSAP HIGH-VELOCITY INFINITE SEA LANES MARQUEE ── */}
        <section className="w-full bg-[#140d0a] text-white py-3.5 overflow-hidden border-y border-[#140d0a] select-none">
          <div
            className="flex items-center overflow-hidden"
            onMouseEnter={handleMarqueeEnter}
            onMouseLeave={handleMarqueeLeave}
          >
            <div
              ref={marqueeTrackRef}
              className="flex items-center gap-10 whitespace-nowrap will-change-transform"
              style={{ width: "fit-content" }}
            >
              {[...GLOBAL_TRADE_LANES, ...GLOBAL_TRADE_LANES].map((lane, i) => (
                <div key={i} className="flex items-center gap-3 text-xs font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
                  <span className="font-bold text-white tracking-wide">{lane.port}</span>
                  <span className="text-[#ff7733] font-mono text-[11px]">({lane.code})</span>
                  <span className="text-white/60 font-light">• {lane.country}</span>
                  <span className="text-white/40 text-[11px] bg-white/10 px-1.5 py-0.5 rounded-[2px]">
                    {lane.transit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 1: PACKAGING (FRAMER MOTION TABS + GSAP SCROLL)
        ══════════════════════════════════════════════════════════════ */}
        <section
          id="section-packaging"
          className="py-16 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full"
        >
          <div className="space-y-3 mb-10">
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#ff5500] font-bold block">
              SECTION 01 • CERTIFIED EXPORT CRATING
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a]">
              Seaworthy Export Packaging
            </h2>
            <p className="text-[15px] text-[#140d0a]/70 font-sans font-light max-w-3xl leading-relaxed">
              Every shipment is custom-crated using ISPM-15 certified heat-treated hardwood and engineered steel braces to guarantee zero flex, zero moisture ingress, and pristine surface condition across long ocean voyages.
            </p>
          </div>

          {/* Packaging Category Selector Tabs (Framer Motion spring indicator) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {PACKAGING_TYPES.map((pkg, idx) => {
              const isActive = selectedPackaging === idx;
              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackaging(idx)}
                  className={`relative p-4 text-left rounded-[4px] border transition-all cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-[#140d0a] text-white border-[#140d0a] shadow-md"
                      : "bg-white text-[#140d0a] border-[#140d0a]/10 hover:border-[#140d0a]/30"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="packagingTabGlow"
                      className="absolute inset-0 bg-[#140d0a] -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span
                    className={`text-[9.5px] font-sans uppercase tracking-wider block mb-1 font-bold ${
                      isActive ? "text-[#ff7733]" : "text-[#ff5500]"
                    }`}
                  >
                    {pkg.badge}
                  </span>
                  <h4 className="font-display font-medium text-[14.5px] truncate">
                    {pkg.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active Packaging Detail Card with Framer Motion AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPackaging}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-[#140d0a]/10 rounded-[4px] p-6 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="px-2.5 py-1 bg-[#ff5500]/10 border border-[#ff5500]/20 text-[#ff5500] text-[10.5px] font-sans uppercase tracking-wider rounded-[4px] font-semibold">
                    {currentPackaging.badge}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-[#140d0a] pt-2">
                    {currentPackaging.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#ff5500] font-sans uppercase tracking-wider">
                    {currentPackaging.subtitle}
                  </p>
                  <p className="text-[14px] text-[#140d0a]/70 font-sans font-light leading-relaxed pt-1">
                    {currentPackaging.desc}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-sans uppercase tracking-wider font-bold text-[#140d0a]">
                    Technical Packaging Specifications:
                  </h5>
                  <div className="space-y-2.5">
                    {currentPackaging.specs.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-[13px] bg-[#fcfbf9] p-3 rounded-[4px] border border-[#140d0a]/5"
                      >
                        <Check className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-[#140d0a] mr-2 font-sans">
                            {s.label}:
                          </strong>
                          <span className="text-[#140d0a]/75 font-sans font-light">{s.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative h-[320px] sm:h-[400px] rounded-[4px] overflow-hidden border border-[#140d0a]/10 shadow-inner group">
                <img
                  src={currentPackaging.image}
                  alt={currentPackaging.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <p className="text-[11px] font-sans uppercase tracking-widest text-[#ff7733] font-bold">
                      ISPM-15 Certified Phytosanitary Stamp
                    </p>
                    <p className="font-display text-base font-light">
                      Full Compliance with International Seaport Entry Mandates
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2: CONTAINER LOADING & LASHING PROTOCOLS
        ══════════════════════════════════════════════════════════════ */}
        <section
          id="section-container-loading"
          className="py-16 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full border-t border-[#140d0a]/10"
        >
          <div className="space-y-3 mb-12">
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#ff5500] font-bold block">
              SECTION 02 • SEAWORTHY STOWAGE LOGIC
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a]">
              Container Loading &amp; Lashing Protocols
            </h2>
            <p className="text-[15px] text-[#140d0a]/70 font-sans font-light max-w-3xl leading-relaxed">
              We maximize safe weight utilization up to 27 Metric Tons per 20ft FCL container using heavy timber floor chocking, certified air dunnage, and ratchet lashing to eliminate any shift during high-seas transit.
            </p>
          </div>

          {/* 5-Step Container Loading Flow with Framer Motion view triggers */}
          <div className="space-y-5">
            {CONTAINER_STEPS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white border border-[#140d0a]/10 rounded-[4px] p-6 lg:p-7 hover:border-[#ff5500]/40 transition-all shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-2 flex items-center gap-4">
                  <span className="font-sans text-3xl sm:text-4xl font-light text-[#ff5500] opacity-80">
                    {item.step}
                  </span>
                  <div className="h-8 w-[1px] bg-[#140d0a]/10 hidden lg:block" />
                </div>

                <div className="lg:col-span-5 space-y-1.5">
                  <h3 className="font-display font-medium text-[19px] text-[#140d0a]">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] text-[#140d0a]/70 font-sans font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-2 bg-[#fcfbf9] p-4 rounded-[4px] border border-[#140d0a]/5">
                  {item.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[12.5px] text-[#140d0a]/80 font-sans">
                      <ShieldCheck className="w-4 h-4 text-[#ff5500] shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Container Quick Specs Card */}
          <div className="mt-10 bg-[#140d0a] text-white p-8 rounded-[4px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#ff7733] font-bold block mb-1">
                MAX PAYLOAD CAPACITY
              </span>
              <p className="text-2xl font-sans font-bold">27.0 Metric Tons</p>
              <p className="text-xs text-white/60 font-sans font-light mt-1">
                Optimized to maximum legal maritime road weight
              </p>
            </div>
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#ff7733] font-bold block mb-1">
                CONTAINER TYPE
              </span>
              <p className="text-2xl font-sans font-bold">20ft Heavy FCL</p>
              <p className="text-xs text-white/60 font-sans font-light mt-1">
                Heavy-tested corten steel floor cross-members
              </p>
            </div>
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#ff7733] font-bold block mb-1">
                ORIGIN SEAPORTS
              </span>
              <p className="text-2xl font-sans font-bold">Chennai &amp; Mundra</p>
              <p className="text-xs text-white/60 font-sans font-light mt-1">
                INMAA, INKRI, and INMUN direct customs terminals
              </p>
            </div>
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#ff7733] font-bold block mb-1">
                CONTAINER SEALING
              </span>
              <p className="text-2xl font-sans font-bold">ISO 17712 Bolt</p>
              <p className="text-xs text-white/60 font-sans font-light mt-1">
                Tamper-evident serialized high-security seal
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            NEW INTERACTIVE TOOL: 20FT FCL CARGO STABILITY & WEIGHT SIMULATOR
            POWERED BY GSAP MATH TWEENS + FRAMER MOTION LAYOUT
        ══════════════════════════════════════════════════════════════ */}
        <section
          id="section-container-simulator"
          className="py-16 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full border-t border-[#140d0a]/10"
        >
          <div className="space-y-3 mb-10">
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#0077b6] font-bold block flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0077b6] animate-pulse" />
              INTERACTIVE GSAP ENGINE • MARITIME STOWAGE SIMULATOR
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a]">
              20ft Container Load &amp;{" "}
              <span className="italic text-[#0077b6]">Stability Simulator</span>
            </h2>
            <p className="text-[15px] text-[#140d0a]/70 font-sans font-light max-w-3xl leading-relaxed">
              Explore how our logistics engineers balance weight distributions, calculate timber chocking points, and inflate Level 3 air dunnage for diverse stone consignments inside 20ft Corten steel marine boxes.
            </p>
          </div>

          {/* Mode Selector Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {CARGO_SIMULATION_MODES.map((mode, idx) => {
              const isSelected = simMode === idx;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSimMode(idx)}
                  className={`p-4 rounded-[4px] border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#0077b6] shadow-md ring-1 ring-[#0077b6]"
                      : "bg-white border-[#140d0a]/10 hover:border-[#140d0a]/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-sans uppercase tracking-wider font-bold ${
                        isSelected ? "text-[#0077b6]" : "text-[#140d0a]/50"
                      }`}
                    >
                      MODE 0{idx + 1}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? "bg-[#0077b6]" : "bg-[#140d0a]/20"
                      }`}
                    />
                  </div>
                  <h4 className="font-display font-medium text-[16px] text-[#140d0a]">
                    {mode.name}
                  </h4>
                  <p className="text-xs text-[#140d0a]/60 font-sans font-light mt-0.5">
                    {mode.frameType} • {mode.itemsCount}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Simulator Visual Chassis & Live Gauges */}
          <div className="bg-white border border-[#140d0a]/10 rounded-[4px] p-6 lg:p-8 shadow-sm space-y-8">
            {/* Top Engineering Telemetry Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#f8fafc] border border-[#140d0a]/5 rounded-[4px]">
              <div>
                <span className="block text-[10px] font-sans uppercase tracking-wider text-[#0077b6] font-bold">
                  Certified Gross Mass
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span
                    ref={weightValRef}
                    className="font-sans text-2xl font-bold text-[#140d0a]"
                  >
                    {currentSim.grossWeight.toFixed(2)}
                  </span>
                  <span className="font-sans text-sm font-bold text-[#140d0a]">MT</span>
                </div>
                <span className="block text-[11px] font-sans text-[#140d0a]/50">
                  Legal max: 27.0 MT
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-sans uppercase tracking-wider text-[#0077b6] font-bold">
                  Axle Weight CoG
                </span>
                <span className="block font-sans text-2xl font-bold text-[#140d0a] mt-0.5">
                  {currentSim.cogBalance}
                </span>
                <span className="block text-[11px] font-sans text-[#16a34a] font-semibold">
                  ✓ Symmetric Axis
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-sans uppercase tracking-wider text-[#0077b6] font-bold">
                  Dunnage Air Bag
                </span>
                <span
                  ref={psiValRef}
                  className="block font-sans text-2xl font-bold text-[#140d0a] mt-0.5"
                >
                  {currentSim.dunnagePsi.toFixed(1)} PSI
                </span>
                <span className="block text-[11px] font-sans text-[#140d0a]/50">
                  Maritime Seal Rating
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-sans uppercase tracking-wider text-[#0077b6] font-bold">
                  Perimeter Chocks
                </span>
                <span className="block font-sans text-2xl font-bold text-[#140d0a] mt-0.5">
                  {currentSim.chocksCount} Anchor Blocks
                </span>
                <span className="block text-[11px] font-sans text-[#16a34a] font-semibold">
                  ✓ 100% Floor Nailed
                </span>
              </div>
            </div>

            {/* GSAP Animated Payload Capacity Meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="font-semibold text-[#140d0a]">
                  Payload Weight Utilization:
                </span>
                <span className="text-[#0077b6] font-bold">
                  {((currentSim.grossWeight / currentSim.maxWeight) * 100).toFixed(1)}% Capacity
                </span>
              </div>
              <div className="w-full h-3.5 bg-[#f1f5f9] rounded-[3px] overflow-hidden p-0.5 border border-[#140d0a]/10">
                <div
                  ref={weightBarRef}
                  className="h-full rounded-[2px] transition-all bg-gradient-to-r from-[#0077b6] to-[#023e8a]"
                  style={{
                    width: `${(currentSim.grossWeight / currentSim.maxWeight) * 100}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-sans text-[#140d0a]/50">
                <span>0 MT (Tare Empty)</span>
                <span>20 MT</span>
                <span className="text-[#ff5500] font-semibold">27.0 MT (Max Safe Legal)</span>
              </div>
            </div>

            {/* Architectural 2D Container Cross-Section Diagram */}
            <div className="p-6 bg-[#00171f] text-white rounded-[4px] border border-[#003049] relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-sans">
                <div className="flex items-center gap-2 text-white/80">
                  <Ship className="w-4 h-4 text-[#00e5ff]" />
                  <span>20ft ISO Heavy-Corten Container Interior Schematic</span>
                </div>
                <span className="text-[#00e5ff] font-semibold uppercase tracking-wider text-[11px]">
                  {currentSim.status}
                </span>
              </div>

              {/* 2D Container Floor Plan Visualization */}
              <div className="py-8 px-4 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl h-24 border-2 border-white/20 rounded-[4px] relative bg-white/[0.02] flex items-center justify-between px-3">
                  {/* Left door hinge indicator */}
                  <div className="absolute -left-2 top-0 bottom-0 w-2 bg-[#ff5500]/60 rounded-l" />

                  {/* Cargo elements dynamically rendered */}
                  <div className="w-full flex items-center justify-center gap-2 sm:gap-3">
                    {Array.from({ length: simMode === 0 ? 4 : simMode === 1 ? 5 : 6 }).map((_, i) => (
                      <motion.div
                        key={`${simMode}-${i}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        className="h-16 flex-1 bg-white/10 border border-[#00e5ff]/40 rounded-[2px] flex flex-col items-center justify-center text-[10px] font-sans text-center p-1 text-white/80"
                      >
                        <span className="text-[9px] text-[#00e5ff] font-bold block">
                          C-{i + 1}
                        </span>
                        <span className="text-[8px] truncate hidden sm:block">
                          {simMode === 0 ? "A-FRAME" : simMode === 1 ? "CRATE" : "PALLET"}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Right door locking cam */}
                  <div className="absolute -right-2 top-0 bottom-0 w-2 bg-[#16a34a]/60 rounded-r" />
                </div>

                <div className="flex items-center justify-between w-full max-w-2xl text-[10px] font-sans text-white/40 pt-2">
                  <span>Front Bulkhead (Cab Side)</span>
                  <span className="text-[#00e5ff]">▲ Longitudinal Centerline Equilibrium ▲</span>
                  <span>Rear Double Cargo Doors</span>
                </div>
              </div>

              {/* Engineering Protocol Footnote */}
              <p className="text-xs font-sans text-white/70 font-light pt-3 border-t border-white/10">
                <strong className="text-white font-semibold mr-1">Securing Protocol:</strong>{" "}
                {currentSim.description}
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 3: QUALITY INSPECTION & PRE-SHIPMENT AUDIT
        ══════════════════════════════════════════════════════════════ */}
        <section
          id="section-quality-inspection"
          className="py-24 w-full bg-white relative overflow-hidden border-t border-[#003049]/10"
        >
          <div className="px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full relative z-10">
            {/* ── SECTION HEADER ── */}
            <div className="mb-14 text-center max-w-3xl mx-auto space-y-3.5">
              <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#ff5500] font-bold block">
                SECTION 03 • ZERO DEFECT ASSURANCE
              </span>
              <h2 className="font-display font-normal text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] leading-tight tracking-tight text-[#003049]">
                Quality Inspection &amp;{" "}
                <span className="italic text-[#003049]">Pre-Shipment Audit</span>
              </h2>

              <p className="text-[15px] sm:text-[16px] text-[#003049]/70 font-sans font-light leading-relaxed max-w-2xl mx-auto">
                Our 6-stage quality assurance protocol ensures zero defect rate. Every slab and tile is inspected for caliber tolerances,{" "}
                <span className="text-[#003049] font-semibold">95+ gloss depth</span>,{" "}
                <span className="text-[#003049] font-semibold">vein continuity</span>, and{" "}
                <span className="text-[#003049] font-semibold">sound acoustic resonance</span>{" "}
                prior to crate sealing.
              </p>
            </div>

            {/* ── 6 PILLAR CARDS GRID (FULL VISIBILITY) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INSPECTION_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="relative bg-white border border-[#003049]/12 rounded-2xl overflow-hidden flex flex-col group hover:shadow-[0_20px_45px_rgba(0,48,73,0.12)] hover:border-[#ff5500]/40 hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_12px_rgba(0,48,73,0.05)]"
                  >
                    <div className="p-7 flex flex-col gap-5 flex-1">
                      {/* Icon + Badge row */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-[#003049]/5 flex items-center justify-center text-[#003049] group-hover:bg-[#003049] group-hover:text-white transition-all duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-1 text-[10.5px] font-mono uppercase tracking-wider font-bold bg-[#ff5500]/10 text-[#ff5500] rounded-md border border-[#ff5500]/20">
                          {pillar.badge}
                        </span>
                      </div>

                      {/* Title + desc */}
                      <div>
                        <h3 className="font-display font-semibold text-[18px] text-[#003049] mb-2 leading-snug tracking-normal">
                          {pillar.title}
                        </h3>
                        <p className="text-[13.5px] text-[#003049]/75 font-sans font-light leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>

                      {/* Criteria list */}
                      <div className="pt-4 mt-auto space-y-2.5 border-t border-[#003049]/10">
                        {pillar.criteria.map((c, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#ff5500]" />
                            <span className="text-[12.5px] font-sans text-[#003049]/80 font-light leading-normal">
                              {c}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── CTA BANNER ── */}
            <div className="mt-16 relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,48,73,0.16)] bg-gradient-to-r from-[#003049] via-[#023e8a] to-[#0077b6]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,85,0,0.15),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,48,73,0.5),transparent_60%)]" />

              <div className="relative z-10 p-10 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                <div className="space-y-3 max-w-2xl">
                  <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#90e0ef] font-bold">
                    DIGITAL QA TRANSPARENCY
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl font-light text-white leading-tight">
                    Receive Live Photos &amp;{" "}
                    <span className="italic text-[#caf0f8]">Video Inspection</span>{" "}
                    Prior to Loading
                  </h3>
                  <p className="text-[15px] text-[#ade8f4] font-sans font-light leading-relaxed">
                    Before containers are dispatched from our factory yards, international buyers receive full ultra-high-definition photo dossiers, calibrated thickness charts, and crate packaging videos.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0077b6] text-[12.5px] font-sans uppercase tracking-wider font-bold rounded-xl hover:bg-[#caf0f8] hover:text-[#03045e] transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] group/btn"
                >
                  <span>Request Sample Report</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE JOURNEY: FACTORY TO BUYER'S SITE ── */}
        <div id="section-journey" className="relative">
          <TheJourney />
        </div>

        {/* ── INTERACTIVE MARITIME SEA SHIPMENT MAP & CALCULATOR ── */}
        <div id="section-calculator" className="w-full">
          <ShippingAustralia />
        </div>
      </main>
    </div>
  );
}
