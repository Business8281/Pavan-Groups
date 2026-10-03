"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  Layers,
  Sparkles,
  Package,
  Truck,
  Compass,
  Globe,
  CheckCircle2 as CircleCheck,
} from "lucide-react";

// ── RICH 8-STAGE FACTORY TO JOBSITE SUPPLY CHAIN DATA ──
const JOURNEY_STEPS_RICH = [
  {
    num: "01",
    stepNumber: 1,
    phaseGroup: "Quarry & Order Engineering",
    title: "Order Finalization & Technical Specification",
    subtitle: "Stone Extraction Batch Approval",
    icon: FileCheck,
    timeframe: "1–3 Days",
    cumulativeDays: "Days 1–3",
    cumulativePercent: 8,
    location: "Markapur & Chimakurthy Quarry Offices",
    description:
      "Client approves architectural bill of quantities (BOQ), mineral finishes, caliper thickness (+/-1mm tolerance), and stone lot color variation parameters.",
    sopStandard: "IS:1121 & ASTM C615 Stone Testing",
    deliverables: ["Signed Tech Spec Sheet", "Approved Color Master Samples", "Lot Allocation Number"],
  },
  {
    num: "02",
    stepNumber: 2,
    phaseGroup: "Quarry & Order Engineering",
    title: "Precision Quarry Extraction & CNC Calibration",
    subtitle: "Gangsaw Slicing & Edge Profiling",
    icon: Layers,
    timeframe: "7–14 Days",
    cumulativeDays: "Days 4–17",
    cumulativePercent: 38,
    location: "Pavan Stones Group Gangsaw & CNC Units",
    description:
      "Blocks sliced on multi-blade gangsaw frames, calibrated to exact mm thickness, precision edge-profiled, and given specified surface finish (Cleft, Honed, Polished, or Tumbled).",
    sopStandard: "Digital Caliper & Surface Flatness QC",
    deliverables: ["Precision Sized Slabs/Tiles", "Calibrated Edge Profiles", "Batch Uniformity Audit"],
  },
  {
    num: "03",
    stepNumber: 3,
    phaseGroup: "Quarry & Order Engineering",
    title: "100% Dry-Lay Staging & Quality Audit",
    subtitle: "Pre-Pack Visual & Dimension Verification",
    icon: Sparkles,
    timeframe: "2–3 Days",
    cumulativeDays: "Days 18–20",
    cumulativePercent: 45,
    location: "Covered Dry-Lay Staging Facility",
    description:
      "Entire shipment dry-laid across factory staging floor to verify tonal harmony, pattern blend, and zero hairline fissures before crating.",
    sopStandard: "4K Video & High-Res Photo Dossier",
    deliverables: ["Full Lot Layout Photos", "Client Video Walkthrough", "Pre-Shipment Signoff"],
  },
  {
    num: "04",
    stepNumber: 4,
    phaseGroup: "Export Logistics & Packing",
    title: "Export Packing & ISPM-15 Fumigation",
    subtitle: "Seaworthy Heavy-Duty Timber Crates",
    icon: Package,
    timeframe: "2–3 Days",
    cumulativeDays: "Days 21–23",
    cumulativePercent: 52,
    location: "Factory Loading & Packing Bay",
    description:
      "Tiles packed with high-density thermocol separators, moisture-proof plastic wrap, and heavy-duty ISPM-15 certified heat-treated pinewood crates with steel strapping.",
    sopStandard: "ISPM-15 Phytosanitary Compliance",
    deliverables: ["ISPM-15 Heat-Treatment Stamp", "Reinforced Steel Corner Straps", "Fumigation Certificate"],
  },
  {
    num: "05",
    stepNumber: 5,
    phaseGroup: "Export Logistics & Packing",
    title: "Container Stuffing & Chennai Port Dispatch",
    subtitle: "Direct Highway Transit & Terminal Gate-In",
    icon: Truck,
    timeframe: "2–4 Days",
    cumulativeDays: "Days 24–27",
    cumulativePercent: 60,
    location: "Chennai / Krishnapatnam Ocean Terminal",
    description:
      "Dedicated air-suspension container trailers haul strapped crates to Chennai Port (INMAA) container terminal with live GPS tracking telemetry.",
    sopStandard: "Customs Seal & Container Weight Slip",
    deliverables: ["Port Gate-In Certificate", "Verified Gross Mass (VGM)", "Customs Shipping Bill"],
  },
  {
    num: "06",
    stepNumber: 6,
    phaseGroup: "Ocean Transit & Customs Clearance",
    title: "Ocean Freight Transit to Destination Port",
    subtitle: "Maersk / MSC Direct Express Liner Routing",
    icon: Globe,
    timeframe: "14–24 Days",
    cumulativeDays: "Days 28–46",
    cumulativePercent: 85,
    location: "Direct Maritime Sea Lanes",
    description:
      "Container departs on direct weekly maritime sailings from Chennai to Jebel Ali, Felixstowe, Rotterdam, Newark, or Sydney Harbour.",
    sopStandard: "Original Bill of Lading (OBL) Dispatch",
    deliverables: ["Master Bill of Lading", "Marine Cargo Insurance Policy", "Certificate of Origin (COO)"],
  },
  {
    num: "07",
    stepNumber: 7,
    phaseGroup: "Ocean Transit & Customs Clearance",
    title: "Destination Customs Clearance & Biosecurity",
    subtitle: "Import Duties, AQIS / USDA / EU Clearance",
    icon: Compass,
    timeframe: "2–4 Days",
    cumulativeDays: "Days 47–50",
    cumulativePercent: 92,
    location: "Destination Commercial Port Terminal",
    description:
      "Destination customs broker submits electronic import entry, verifies fumigation certificate, and achieves quarantine biosecurity release.",
    sopStandard: "Destination Customs Duty Assessment",
    deliverables: ["Quarantine Clearance Release", "Import Duty Receipt", "Out-of-Port Delivery Order"],
  },
  {
    num: "08",
    stepNumber: 8,
    phaseGroup: "Turnkey Jobsite Handover",
    title: "Jobsite Unloading & Installation Handover",
    subtitle: "Hydraulic Tailgate Offloading at Site",
    icon: CircleCheck,
    timeframe: "1–2 Days",
    cumulativeDays: "Days 51–52",
    cumulativePercent: 100,
    location: "Buyer's Architectural Project Site",
    description:
      "Local flatbed truck with hydraulic crane/tailgate delivers crates directly to jobsite storage bay ready for architectural installation.",
    sopStandard: "Batch Verification & Handover Signoff",
    deliverables: ["Delivered Site Consignment Sheet", "Installation Guidelines Dossier", "Turnkey Handover Note"],
  },
];

// Rich Architectural Stone Palette Themes for Left Monolith Preview
const STEP_STONE_PALETTES = [
  {
    bgGradient: "linear-gradient(145deg, #1c1917 0%, #292524 50%, #0c0a09 100%)",
    textColor: "#f5f5f4",
    mutedColor: "#a8a29e",
    accentColor: "#f97316",
    accentBg: "rgba(249, 115, 22, 0.18)",
    stoneTag: "Markapur Black Slate",
    roman: "I",
  },
  {
    bgGradient: "linear-gradient(145deg, #1e293b 0%, #0f172a 50%, #020617 100%)",
    textColor: "#f8fafc",
    mutedColor: "#94a3b8",
    accentColor: "#38bdf8",
    accentBg: "rgba(56, 189, 248, 0.18)",
    stoneTag: "Cuddapah Blue-Black",
    roman: "II",
  },
  {
    bgGradient: "linear-gradient(145deg, #2e1065 0%, #1e1b4b 50%, #0f172a 100%)",
    textColor: "#faf5ff",
    mutedColor: "#c084fc",
    accentColor: "#e879f9",
    accentBg: "rgba(232, 121, 249, 0.18)",
    stoneTag: "Chimakurthy Black Galaxy",
    roman: "III",
  },
  {
    bgGradient: "linear-gradient(145deg, #14532d 0%, #052e16 50%, #022c22 100%)",
    textColor: "#f0fdf4",
    mutedColor: "#86efac",
    accentColor: "#4ade80",
    accentBg: "rgba(74, 222, 128, 0.18)",
    stoneTag: "Kandla Grey Sandstone",
    roman: "IV",
  },
  {
    bgGradient: "linear-gradient(145deg, #7c2d12 0%, #431407 50%, #270d06 100%)",
    textColor: "#fff7ed",
    mutedColor: "#fdba74",
    accentColor: "#fb923c",
    accentBg: "rgba(251, 146, 60, 0.18)",
    stoneTag: "Teakwood Sandstone",
    roman: "V",
  },
  {
    bgGradient: "linear-gradient(145deg, #082f49 0%, #0c4a6e 50%, #0369a1 100%)",
    textColor: "#f0f9ff",
    mutedColor: "#bae6fd",
    accentColor: "#38bdf8",
    accentBg: "rgba(56, 189, 248, 0.18)",
    stoneTag: "Direct Ocean Freight",
    roman: "VI",
  },
  {
    bgGradient: "linear-gradient(145deg, #312e81 0%, #1e1b4b 50%, #0f172a 100%)",
    textColor: "#eef2ff",
    mutedColor: "#a5b4fc",
    accentColor: "#818cf8",
    accentBg: "rgba(129, 140, 248, 0.18)",
    stoneTag: "Port Customs Clearance",
    roman: "VII",
  },
  {
    bgGradient: "linear-gradient(145deg, #78350f 0%, #451a03 50%, #1c1917 100%)",
    textColor: "#fffbeb",
    mutedColor: "#ffedd5",
    accentColor: "#fed7aa",
    accentBg: "rgba(254, 215, 170, 0.18)",
    stoneTag: "Turnkey Jobsite Handover",
    roman: "VIII",
  },
];

export default function TheJourney() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlayingFlow, setIsPlayingFlow] = useState<boolean>(true);

  // Auto-play supply chain journey animation flow
  useEffect(() => {
    if (!isPlayingFlow) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % JOURNEY_STEPS_RICH.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlayingFlow]);

  const activeStep = JOURNEY_STEPS_RICH[activeStepIndex];

  return (
    <section
      id="journey"
      className="sticky top-0 z-0 py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#ffffff] text-[#241919] border-t border-[#747474]/15 overflow-hidden"
    >
      {/* Scoped CSS for Polished Granite Light Sheen */}
      <style jsx>{`
        @keyframes stoneLightSweep {
          0% {
            transform: translateX(-160%) skewX(-25deg);
            opacity: 0;
          }
          20% {
            opacity: 0.65;
          }
          80% {
            opacity: 0.65;
          }
          100% {
            transform: translateX(360%) skewX(-25deg);
            opacity: 0;
          }
        }
        .animate-stone-sheen {
          animation: stoneLightSweep 4.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#747474]/15">
          <div className="space-y-2">
            <h3
              className="font-display font-light text-[#241919] leading-tight"
              style={{ fontSize: "clamp(30px, 3.8vw, 48px)" }}
            >
              The Journey: <span className="text-[#0f172a] italic font-normal">Factory to Buyer&apos;s Site</span>
            </h3>
            <p className="text-sm sm:text-base text-[#747474] font-light max-w-xl">
              A step-by-step timeline of how your stone order is manufactured, quality-inspected, and delivered directly to your jobsite.
            </p>
          </div>

          {/* Pure Architectural Turnaround Metric Lockup */}
          <div className="flex flex-col items-start md:items-end self-start md:self-end select-none">
            <span className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.22em] text-[#78716c] flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c85a32]" />
              Factory to Jobsite
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans text-2xl sm:text-[28px] font-semibold text-[#1c1917] tracking-tight leading-none">
                30–45
              </span>
              <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#c85a32]">
                days
              </span>
            </div>
          </div>
        </div>

        {/* ── MINIMAL EDITORIAL SPLIT WORKFLOW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: ARCHITECTURAL STONE SLAB MONOLITH */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {(() => {
              const currentPalette = STEP_STONE_PALETTES[activeStepIndex] || STEP_STONE_PALETTES[0];
              const ActiveIcon = activeStep.icon;

              return (
                <div
                  style={{
                    background: currentPalette.bgGradient,
                  }}
                  className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-[3/4] rounded-3xl p-8 sm:p-9 flex flex-col justify-between overflow-hidden shadow-2xl border border-white/30 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
                >
                  {/* Specular Light Reflection Sweep */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                    <div
                      className="absolute -inset-y-28 w-52 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-stone-sheen"
                      style={{ filter: "blur(4px)" }}
                    />
                  </div>

                  {/* Subtle Stone Texture Grain Overlay */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Top Header */}
                  <div className="flex items-center justify-between relative z-10">
                    <span
                      className="text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-md bg-black/40 border border-white/15"
                      style={{ color: currentPalette.accentColor }}
                    >
                      STEP {activeStep.num}
                    </span>

                    <span
                      className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-black/20 border border-white/10"
                      style={{ color: currentPalette.accentColor }}
                    >
                      {activeStep.timeframe}
                    </span>
                  </div>

                  {/* Center Core Emblem & Typography */}
                  <div className="space-y-4 my-auto relative z-10">
                    {/* Icon with parallel Phase Group on right side */}
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <div
                        className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-xl border border-white/20 flex-none"
                        style={{
                          background: currentPalette.accentBg,
                          color: currentPalette.accentColor,
                        }}
                      >
                        <ActiveIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      <div className="min-w-0">
                        <span
                          className="text-[9.5px] font-mono uppercase tracking-[0.2em] font-semibold block opacity-85"
                          style={{ color: currentPalette.accentColor }}
                        >
                          Pipeline Phase
                        </span>
                        <p
                          className="text-xs sm:text-[13px] font-mono uppercase tracking-wider font-bold leading-snug mt-0.5"
                          style={{ color: currentPalette.textColor }}
                        >
                          {activeStep.phaseGroup}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4
                        className="font-display text-xl sm:text-2xl lg:text-[26px] font-light tracking-tight leading-snug"
                        style={{ color: currentPalette.textColor }}
                      >
                        {activeStep.title}
                      </h4>

                      <p
                        className="font-sans italic text-sm sm:text-base font-medium tracking-wide mt-1.5"
                        style={{ color: currentPalette.accentColor }}
                      >
                        &ldquo;{activeStep.subtitle}&rdquo;
                      </p>
                    </div>

                    <p
                      className="text-xs font-light leading-relaxed line-clamp-3"
                      style={{ color: currentPalette.mutedColor }}
                    >
                      {activeStep.description}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Minimal 8 Step Swatch Dots */}
            <div className="flex items-center gap-2 pt-5">
              {JOURNEY_STEPS_RICH.map((step, idx) => (
                <button
                  key={step.num}
                  onClick={() => {
                    setIsPlayingFlow(false);
                    setActiveStepIndex(idx);
                  }}
                  title={`Step ${step.num}: ${step.title}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeStepIndex === idx
                      ? "w-6 h-2.5 bg-[#c85a32]"
                      : "w-2.5 h-2.5 bg-[#747474]/25 hover:bg-[#c85a32]/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: THE MINIMALIST EDITORIAL SUPPLY CHAIN LEDGER */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-[#747474]/15">
            {JOURNEY_STEPS_RICH.map((step, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={step.num}
                  onClick={() => {
                    setIsPlayingFlow(false);
                    setActiveStepIndex(idx);
                  }}
                  onMouseEnter={() => {
                    setIsPlayingFlow(false);
                    setActiveStepIndex(idx);
                  }}
                  className={`group py-3.5 sm:py-4 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 select-none ${
                    isActive
                      ? "bg-[#faf7f2] shadow-xs"
                      : "hover:bg-[#faf7f2]/70"
                  }`}
                >
                  <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
                    {/* Step Number */}
                    <span
                      className={`font-mono text-xs sm:text-sm tracking-widest transition-colors ${
                        isActive
                          ? "text-[#c85a32] font-bold"
                          : "text-[#78716c] font-semibold group-hover:text-[#c85a32]"
                      }`}
                    >
                      {step.num}
                    </span>

                    {/* Title & On-Hover Address */}
                    <div className="min-w-0">
                      <h4
                        className={`font-display text-base sm:text-lg md:text-xl tracking-tight transition-colors ${
                          isActive
                            ? "text-[#1c1917] font-medium"
                            : "text-[#292524] font-normal group-hover:text-[#c85a32]"
                        }`}
                      >
                        {step.title}
                      </h4>

                      {/* Milestone Address: Reveals smoothly when hovered */}
                      <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-8 group-hover:opacity-100 group-hover:mt-1 transition-all duration-300 ease-out flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-[#78716c] group-hover:text-[#c85a32]">
                        <span className="text-[11px]">📍</span>
                        <span>{step.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Accent Pill / Timeframe */}
                  <div className="flex items-center gap-3 flex-none">
                    <span
                      className={`text-[11px] sm:text-xs font-mono uppercase tracking-wider font-semibold transition-colors ${
                        isActive
                          ? "text-[#c85a32] font-bold"
                          : "text-[#44403c] group-hover:text-[#1c1917]"
                      }`}
                    >
                      {step.timeframe}
                    </span>

                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        isActive
                          ? "w-8 bg-[#c85a32]"
                          : "w-2 bg-[#d6d3d1] group-hover:w-4 group-hover:bg-[#c85a32]/60"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
