"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import ShippingAustralia from "@/components/ShippingAustralia";
import TheJourney from "@/components/TheJourney";
import Link from "next/link";

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

export default function ExportPage() {
  const [activeTab, setActiveTab] = useState<"packaging" | "loading" | "quality">("packaging");
  const [selectedPackaging, setSelectedPackaging] = useState(0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen text-[#140d0a] font-sans selection:bg-[#ff5500] selection:text-white flex flex-col">
      <main className="flex-grow pt-24 sm:pt-28 lg:pt-32 pb-12 flex flex-col justify-between w-full relative">
        {/* ── HERO BANNER ── */}
        <section className="px-4 sm:px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full pt-4 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#140d0a]/10">
            <div className="max-w-3xl space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light leading-[1.08] tracking-tight text-[#140d0a]">
                Global Export &amp;{" "}
                <span className="italic text-[#ff5500]">Seaworthy Logistics</span>
              </h1>
              <p className="text-[15px] sm:text-[16.5px] text-[#140d0a]/70 font-light leading-relaxed max-w-2xl">
                Precision crating, certified container loading protocols, and uncompromising multi-point QA inspection — delivering natural stone from Indian quarries to 40+ international sea ports in factory-fresh condition.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-none">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#ff5500] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-[4px] hover:bg-[#e04b00] transition-colors shadow-sm"
              >
                <span>Export Inquiry Desk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white border border-[#140d0a]/20 text-[#140d0a] text-xs font-mono uppercase tracking-wider font-semibold rounded-[4px] hover:border-[#140d0a] transition-colors"
              >
                <span>Explore Catalog</span>
              </Link>
            </div>
          </div>

          {/* ── 3 CORE SECTION QUICK HOPPER BUTTONS ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <button
              onClick={() => scrollToSection("section-packaging")}
              className="flex items-center gap-4 p-5 bg-white border border-[#140d0a]/10 rounded-[4px] text-left hover:border-[#ff5500] hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-[4px] bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500] group-hover:bg-[#ff5500] group-hover:text-white transition-colors shrink-0">
                <Package className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff5500] font-semibold block">
                  SECTION 01
                </span>
                <h3 className="font-display font-medium text-[17px] text-[#140d0a] group-hover:text-[#ff5500] transition-colors">
                  Packaging
                </h3>
                <p className="text-xs text-[#140d0a]/60 truncate font-light">
                  ISPM-15 Crates, A-Frames &amp; Shock Absorption
                </p>
              </div>
            </button>

            <button
              onClick={() => scrollToSection("section-container-loading")}
              className="flex items-center gap-4 p-5 bg-white border border-[#140d0a]/10 rounded-[4px] text-left hover:border-[#ff5500] hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-[4px] bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500] group-hover:bg-[#ff5500] group-hover:text-white transition-colors shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff5500] font-semibold block">
                  SECTION 02
                </span>
                <h3 className="font-display font-medium text-[17px] text-[#140d0a] group-hover:text-[#ff5500] transition-colors">
                  Container Loading
                </h3>
                <p className="text-xs text-[#140d0a]/60 truncate font-light">
                  20ft FCL Bracing, Dunnage &amp; Weight Balance
                </p>
              </div>
            </button>

            <button
              onClick={() => scrollToSection("section-quality-inspection")}
              className="flex items-center gap-4 p-5 bg-white border border-[#140d0a]/10 rounded-[4px] text-left hover:border-[#ff5500] hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-[4px] bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500] group-hover:bg-[#ff5500] group-hover:text-white transition-colors shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff5500] font-semibold block">
                  SECTION 03
                </span>
                <h3 className="font-display font-medium text-[17px] text-[#140d0a] group-hover:text-[#ff5500] transition-colors">
                  Quality Inspection
                </h3>
                <p className="text-xs text-[#140d0a]/60 truncate font-light">
                  6-Stage QA, Caliper Calibration &amp; Gloss Check
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 1: PACKAGING
        ══════════════════════════════════════════════════════════════ */}
        <section
          id="section-packaging"
          className="py-16 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full border-t border-[#140d0a]/10"
        >
          <div className="space-y-3 mb-10">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a]">
              Seaworthy Export Packaging
            </h2>
            <p className="text-[15px] text-[#140d0a]/70 font-light max-w-3xl leading-relaxed">
              Every shipment is custom-crated using ISPM-15 certified heat-treated hardwood and engineered steel braces to guarantee zero flex, zero moisture ingress, and pristine surface condition across long ocean voyages.
            </p>
          </div>

          {/* Packaging Category Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {PACKAGING_TYPES.map((pkg, idx) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackaging(idx)}
                className={`p-4 text-left rounded-[4px] border transition-all cursor-pointer ${
                  selectedPackaging === idx
                    ? "bg-[#140d0a] text-white border-[#140d0a] shadow-md"
                    : "bg-white text-[#140d0a] border-[#140d0a]/10 hover:border-[#140d0a]/30"
                }`}
              >
                <span
                  className={`text-[9.5px] font-mono uppercase tracking-wider block mb-1 font-semibold ${
                    selectedPackaging === idx ? "text-[#ff7733]" : "text-[#ff5500]"
                  }`}
                >
                  {pkg.badge}
                </span>
                <h4 className="font-display font-medium text-[14.5px] truncate">
                  {pkg.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Active Packaging Detail Card */}
          {(() => {
            const current = PACKAGING_TYPES[selectedPackaging];
            return (
              <div className="bg-white border border-[#140d0a]/10 rounded-[4px] p-6 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <span className="px-2.5 py-1 bg-[#ff5500]/10 border border-[#ff5500]/20 text-[#ff5500] text-[10.5px] font-mono uppercase tracking-wider rounded-[4px]">
                      {current.badge}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-light text-[#140d0a] pt-2">
                      {current.title}
                    </h3>
                    <p className="text-sm font-medium text-[#ff5500] font-mono uppercase tracking-wider">
                      {current.subtitle}
                    </p>
                    <p className="text-[14px] text-[#140d0a]/70 font-light leading-relaxed pt-1">
                      {current.desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h5 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#140d0a]">
                      Technical Packaging Specifications:
                    </h5>
                    <div className="space-y-2.5">
                      {current.specs.map((s, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-[13px] bg-[#fcfbf9] p-3 rounded-[4px] border border-[#140d0a]/5"
                        >
                          <Check className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-medium text-[#140d0a] mr-2">
                              {s.label}:
                            </strong>
                            <span className="text-[#140d0a]/75 font-light">{s.val}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative h-[320px] sm:h-[400px] rounded-[4px] overflow-hidden border border-[#140d0a]/10 shadow-inner">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      <p className="text-[11px] font-mono uppercase tracking-widest text-[#ff7733]">
                        ISPM-15 Certified
                      </p>
                      <p className="font-display text-base font-light">
                        Full Compliance with Global Port Entry Standards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2: CONTAINER LOADING
        ══════════════════════════════════════════════════════════════ */}
        <section
          id="section-container-loading"
          className="py-16 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full border-t border-[#140d0a]/10"
        >
          <div className="space-y-3 mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a]">
              Container Loading &amp; Lashing Protocols
            </h2>
            <p className="text-[15px] text-[#140d0a]/70 font-light max-w-3xl leading-relaxed">
              We maximize safe weight utilization up to 27 Metric Tons per 20ft FCL container using heavy timber floor chocking, certified air dunnage, and ratchet lashing to eliminate any shift during high-seas transit.
            </p>
          </div>

          {/* 5-Step Container Loading Flow */}
          <div className="space-y-6">
            {CONTAINER_STEPS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#140d0a]/10 rounded-[4px] p-6 lg:p-8 hover:border-[#ff5500]/40 transition-all shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-2 flex items-center gap-4">
                  <span className="font-mono text-3xl sm:text-4xl font-light text-[#ff5500] opacity-80">
                    {item.step}
                  </span>
                  <div className="h-8 w-[1px] bg-[#140d0a]/10 hidden lg:block" />
                </div>

                <div className="lg:col-span-5 space-y-1.5">
                  <h3 className="font-display font-medium text-[19px] text-[#140d0a]">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] text-[#140d0a]/70 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-2 bg-[#fcfbf9] p-4 rounded-[4px] border border-[#140d0a]/5">
                  {item.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[12.5px] text-[#140d0a]/80">
                      <ShieldCheck className="w-4 h-4 text-[#ff5500] shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Container Quick Specs Card */}
          <div className="mt-10 bg-[#140d0a] text-white p-8 rounded-[4px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff7733] block mb-1">
                MAX PAYLOAD CAPACITY
              </span>
              <p className="text-2xl font-display font-medium">27.0 Metric Tons</p>
              <p className="text-xs text-white/60 font-light mt-1">
                Optimized to maximum legal maritime road weight
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff7733] block mb-1">
                CONTAINER TYPE
              </span>
              <p className="text-2xl font-display font-medium">20ft Heavy FCL</p>
              <p className="text-xs text-white/60 font-light mt-1">
                Heavy-tested corten steel floor cross-members
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff7733] block mb-1">
                ORIGIN SEAPORTS
              </span>
              <p className="text-2xl font-display font-medium">Chennai &amp; Mundra</p>
              <p className="text-xs text-white/60 font-light mt-1">
                INMAA, INKRI, and INMUN direct customs terminals
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff7733] block mb-1">
                CONTAINER SEALING
              </span>
              <p className="text-2xl font-display font-medium">ISO 17712 Bolt</p>
              <p className="text-xs text-white/60 font-light mt-1">
                Tamper-evident serialized high-security seal
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 3: QUALITY INSPECTION
        ══════════════════════════════════════════════════════════════ */}
        <section
          id="section-quality-inspection"
          className="py-16 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full border-t border-[#140d0a]/10"
        >
          <div className="space-y-3 mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a]">
              Quality Inspection &amp; Pre-Shipment Audit
            </h2>
            <p className="text-[15px] text-[#140d0a]/70 font-light max-w-3xl leading-relaxed">
              Our 6-stage quality assurance protocol ensures zero defect rate. Every slab and tile is inspected for caliber tolerances, 95+ gloss depth, vein continuity, and sound acoustic resonance prior to crate sealing.
            </p>
          </div>

          {/* 6 Quality Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSPECTION_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#140d0a]/10 rounded-[4px] p-6 sm:p-7 shadow-sm hover:border-[#ff5500]/50 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-[4px] bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-1 bg-[#140d0a]/5 text-[#140d0a] text-[10px] font-mono uppercase tracking-wider font-semibold rounded-[4px]">
                        {pillar.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-medium text-[18px] text-[#140d0a] mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-[13px] text-[#140d0a]/70 font-light leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="pt-2 space-y-2 border-t border-[#140d0a]/5">
                      {pillar.criteria.map((c, i) => (
                        <div key={i} className="flex items-start gap-2 text-[12px] text-[#140d0a]/80">
                          <Check className="w-3.5 h-3.5 text-[#ff5500] shrink-0 mt-0.5" />
                          <span className="font-light">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Digital Inspection Report Banner */}
          <div className="mt-10 bg-white border border-[#140d0a]/10 rounded-[4px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff5500] font-semibold">
                DIGITAL QA TRANSPARENCY
              </span>
              <h3 className="font-display text-2xl font-light text-[#140d0a]">
                Receive Live Photos &amp; Video Inspection Prior to Loading
              </h3>
              <p className="text-[14px] text-[#140d0a]/70 font-light leading-relaxed">
                Before containers are dispatched from our factory yards, international buyers receive full ultra-high-definition photo dossiers, calibrated thickness charts, and crate packaging videos.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#140d0a] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-[4px] hover:bg-[#ff5500] transition-colors shrink-0 shadow-sm"
            >
              <span>Request Sample Report</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── THE JOURNEY: FACTORY TO BUYER'S SITE ── */}
        <div className="relative">
          <TheJourney />
        </div>

        {/* ── INTERACTIVE MARITIME SEA SHIPMENT MAP & CALCULATOR ── */}
        <div className="w-full">
          <ShippingAustralia />
        </div>
      </main>
    </div>
  );
}
