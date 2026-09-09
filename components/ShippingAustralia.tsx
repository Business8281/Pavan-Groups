"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Ship,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  FileCheck,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  Anchor,
  Truck,
  Sparkles,
  Route,
  Globe,
  Compass,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
} from "lucide-react";
import { GLOBAL_PORTS_DATA } from "@/lib/portsData";
import { scrollToHash } from "@/components/SmoothScroll";

import CalculatorPanel from "@/components/CalculatorPanel";
import {
  IndianPorts,
  Destinations,
  ShippingLogic,
  IndianPort,
  DestinationPort,
} from "@/lib/shippingData";

// Dynamically import D3 Map to prevent SSR issues
const Map2D = dynamic(() => import("@/components/Map2D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[440px] flex flex-col items-center justify-center bg-[#87CEEB] text-[#1e293b] font-mono text-xs gap-3">
      <div className="w-7 h-7 border-2 border-[#1e40af] border-t-transparent rounded-full animate-spin" />
      <span className="tracking-wider uppercase font-semibold text-[#1e40af]">
        LOADING MARITIME SEA MAP...
      </span>
    </div>
  ),
});

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
    location: "Pavan Group Gangsaw & CNC Units",
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
      "Crates stuffed into 20ft/40ft ocean containers with pneumatic dunnage air bags, customs cleared, and sealed with tamper-evident container bolt seal.",
    sopStandard: "ISO 17712 High-Security Bolt Seal",
    deliverables: ["Container Stuffing Photos", "Port Gate-In Pass", "Shipping Bill & Bill of Lading"],
  },
  {
    num: "06",
    stepNumber: 6,
    phaseGroup: "Ocean & Jobsite Handover",
    title: "Ocean Transit to Destination Port",
    subtitle: "Global Maritime Container Freight",
    icon: Ship,
    timeframe: "12–28 Days",
    cumulativeDays: "Days 28–38",
    cumulativePercent: 85,
    location: "International Ocean Shipping Lanes",
    description:
      "Container vessel navigates designated maritime sealanes directly to destination ports across UAE (6–9d), Europe (20–26d), UK (20–25d), USA (22–30d), or Australia (12–22d).",
    sopStandard: "Bonded Marine Cargo Insurance",
    deliverables: ["Direct Ocean Freight Lines", "Continuous Satellite Tracking", "Comprehensive Transit Cover"],
  },
  {
    num: "07",
    stepNumber: 7,
    phaseGroup: "Ocean & Jobsite Handover",
    title: "Destination Port Customs & Quarantine",
    subtitle: "Terminal Handling & Clearance",
    icon: ShieldCheck,
    timeframe: "3–7 Days",
    cumulativeDays: "Days 39–43",
    cumulativePercent: 95,
    location: "Destination Ocean Container Terminal",
    description:
      "Vessel arrives and offloads container; local customs authorities and biosecurity officers inspect documentation and release cargo from terminal.",
    sopStandard: "Local Customs & Quarantine Release",
    deliverables: ["Terminal Handling (THC)", "Quarantine / Biosecurity Clear", "Commercial Release Gate Pass"],
  },
  {
    num: "08",
    stepNumber: 8,
    phaseGroup: "Ocean & Jobsite Handover",
    title: "Direct Jobsite Delivery & Handover",
    subtitle: "Final Offloading at Project Site",
    icon: Building2,
    timeframe: "1–3 Days",
    cumulativeDays: "Days 44–45",
    cumulativePercent: 100,
    location: "Buyer Project / Construction Site",
    description:
      "Flatbed truck transports crates from port terminal directly to buyer's residential or commercial jobsite for immediate installation.",
    sopStandard: "Turnkey Final Jobsite Handover",
    deliverables: ["Direct-to-Site Haulage", "Safe Ground-Level Offloading", "Final Material Verification"],
  },
];

type RegionKey = "all" | "australia" | "uae" | "uk" | "europe" | "usa";

interface RegionTab {
  key: RegionKey;
  label: string;
  flag: string;
}

const REGION_TABS: RegionTab[] = [
  { key: "all", label: "All Ports", flag: "🌍" },
  { key: "australia", label: "Australia", flag: "🇦🇺" },
  { key: "uae", label: "UAE & Gulf", flag: "🇦🇪" },
  { key: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { key: "europe", label: "Europe", flag: "🇪🇺" },
  { key: "usa", label: "United States", flag: "🇺🇸" },
];

const STEP_STONE_PALETTES = [
  {
    bgGradient: "linear-gradient(155deg, #1c1917 0%, #0c0a09 50%, #141210 100%)",
    textColor: "#ffffff",
    mutedColor: "#a8a29e",
    accentColor: "#fb923c",
    accentBg: "rgba(251, 146, 60, 0.15)",
    stoneTag: "Obsidian & Quarry Ironstone",
    roman: "I",
  },
  {
    bgGradient: "linear-gradient(155deg, #1e2025 0%, #0d0e12 50%, #17191e 100%)",
    textColor: "#ffffff",
    mutedColor: "#94a3b8",
    accentColor: "#f59e0b",
    accentBg: "rgba(245, 158, 11, 0.15)",
    stoneTag: "Gangsaw Calibrated Granite",
    roman: "II",
  },
  {
    bgGradient: "linear-gradient(155deg, #0f172a 0%, #020617 50%, #0a1120 100%)",
    textColor: "#ffffff",
    mutedColor: "#94a3b8",
    accentColor: "#60a5fa",
    accentBg: "rgba(96, 165, 250, 0.15)",
    stoneTag: "Blue Pearl Optical Dry-Lay",
    roman: "III",
  },
  {
    bgGradient: "linear-gradient(155deg, #2b3038 0%, #1b1e24 50%, #252a32 100%)",
    textColor: "#f8fafc",
    mutedColor: "#cbd5e1",
    accentColor: "#d4a373",
    accentBg: "rgba(212, 163, 115, 0.15)",
    stoneTag: "Honed Slate & Timber Crate",
    roman: "IV",
  },
  {
    bgGradient: "linear-gradient(155deg, #181a20 0%, #0f1015 50%, #15171d 100%)",
    textColor: "#ffffff",
    mutedColor: "#94a3b8",
    accentColor: "#38bdf8",
    accentBg: "rgba(56, 189, 248, 0.15)",
    stoneTag: "Port Dispatch Basalt",
    roman: "V",
  },
  {
    bgGradient: "linear-gradient(155deg, #12251d 0%, #081611 50%, #10221a 100%)",
    textColor: "#f0fdf4",
    mutedColor: "#a7f3d0",
    accentColor: "#34d399",
    accentBg: "rgba(52, 211, 153, 0.15)",
    stoneTag: "Verde Ocean Serpentinite",
    roman: "VI",
  },
  {
    bgGradient: "linear-gradient(155deg, #28242b 0%, #18151c 50%, #231f26 100%)",
    textColor: "#faf5ff",
    mutedColor: "#d8b4fe",
    accentColor: "#c084fc",
    accentBg: "rgba(192, 132, 252, 0.15)",
    stoneTag: "Customs Clearance Porphyry",
    roman: "VII",
  },
  {
    bgGradient: "linear-gradient(155deg, #993717 0%, #631e08 50%, #882f12 100%)",
    textColor: "#ffffff",
    mutedColor: "#ffedd5",
    accentColor: "#fed7aa",
    accentBg: "rgba(254, 215, 170, 0.18)",
    stoneTag: "Turnkey Jobsite Handover",
    roman: "VIII",
  },
];

export default function ShippingAustralia() {
  const [origin, setOrigin] = useState<IndianPort | null>(
    () => IndianPorts.find((p) => p.code === "INMAA") || IndianPorts[0]
  );
  const [destination, setDestination] = useState<DestinationPort | null>(
    () => Destinations.find((d) => d.code === "AUSYD") || Destinations[0]
  );

  const handleCountryClick = (countryName: string) => {
    if (!countryName) return;
    const dest = Destinations.find(
      (d) =>
        d.country.toLowerCase() === countryName.toLowerCase() ||
        (d.country === "United States" &&
          (countryName === "United States of America" || countryName === "USA"))
    );
    if (dest) {
      setDestination(dest);
      if (!origin) {
        setOrigin(IndianPorts.find((p) => p.code === "INMAA") || IndianPorts[0]);
      }
    }
  };

  const routePath =
    origin && destination
      ? ShippingLogic(origin, destination).pathCoordinates
      : null;

  const [selectedPortId, setSelectedPortId] = useState<string>("syd");
  const [containerSize, setContainerSize] = useState<"20ft" | "40ft">("20ft");
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>("all");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlayingFlow, setIsPlayingFlow] = useState<boolean>(true);
  const portsListRef = useRef<HTMLDivElement>(null);

  // Auto-play supply chain journey animation flow
  useEffect(() => {
    if (!isPlayingFlow) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % JOURNEY_STEPS_RICH.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlayingFlow]);

  const handleScrollPorts = (direction: "up" | "down") => {
    if (portsListRef.current) {
      const scrollAmount = direction === "up" ? -160 : 160;
      portsListRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  };

  const activeStep = JOURNEY_STEPS_RICH[activeStepIndex];

  const filteredPorts = useMemo(() => {
    if (selectedRegion === "all") return GLOBAL_PORTS_DATA;
    return GLOBAL_PORTS_DATA.filter((p) => p.region === selectedRegion);
  }, [selectedRegion]);

  const selectedPort =
    GLOBAL_PORTS_DATA.find((p) => p.id === selectedPortId) || GLOBAL_PORTS_DATA[0];

  const handleContactScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash("#contact", 1.6);
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <section
      id="shipping"
      className="relative z-30 py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-16 bg-white text-[#241919] border-t border-[#747474]/15 overflow-hidden"
    >
      {/* Subtle background ambient texture removed as per user request */}

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 md:space-y-12">

        {/* ── SECTION HEADER & EXECUTIVE MARITIME STATS ── */}
        <div className="space-y-6 pb-6 border-b border-[#0f172a]/15">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              


              <h2 className="font-display font-light leading-[1.05] tracking-tight mb-4">
                <span className="text-[#241919] block text-4xl sm:text-5xl md:text-6xl lg:text-[64px] mb-2">
                  Seamless Ocean Freight
                </span>
                <span className="text-[#c85a32] block text-3xl sm:text-4xl md:text-5xl italic">
                  Chennai to 40+ World Ports
                </span>
              </h2>

              <p className="text-[14px] sm:text-[15.5px] text-[#747474] font-light leading-relaxed max-w-2xl">
                Direct factory-to-port ocean container logistics from Chennai and Krishnapatnam terminals to key sea ports across <strong className="font-medium text-[#241919]">UAE, Europe, United Kingdom, United States, and Australia</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-none">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleContactScroll}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-bold bg-transparent border border-[#241919] text-[#241919] hover:bg-[#241919] hover:text-[#f1f5f9] transition-all duration-300 cursor-pointer rounded-xl"
              >
                <span>Request Sample</span>
                <ArrowRight className="w-4 h-4 text-[#241919] group-hover:text-[#f1f5f9] group-hover:translate-x-1.5 transition-all duration-300" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            INTERACTIVE SEA SHIPMENT MAP & CALCULATOR (2ND IMAGE INTERFACE)
        ══════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col">
          {/* Top Header */}
          <div className="px-6 py-3.5 bg-white border-b border-gray-200 shrink-0">
            <h3 className="text-xl font-bold text-gray-800">
              Interactive Sea Shipment Map
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Click any country to auto-resolve its primary commercial port and calculate shipping cost, transit time &amp; customs requirements.
            </p>
          </div>

          {/* Main Body */}
          <div className="flex flex-col lg:flex-row h-[620px] sm:h-[660px] lg:h-[680px] overflow-hidden">
            {/* 2D Map Panel (78%) */}
            <div
              className="w-full lg:w-[76%] xl:w-[78%] h-[380px] sm:h-[420px] lg:h-full relative flex-1"
              style={{ background: "#87CEEB" }}
            >
              <Map2D
                origin={origin}
                destination={destination}
                onCountryClick={handleCountryClick}
                routePath={routePath}
              />
            </div>

            {/* Calculator Panel (22%) */}
            <div className="w-full lg:w-[24%] xl:w-[22%] min-w-[300px] lg:min-w-[320px] h-[520px] lg:h-full z-20 border-t lg:border-t-0 lg:border-l border-gray-200 shadow-2xl relative bg-white">
              <CalculatorPanel
                origin={origin}
                setOrigin={setOrigin}
                destination={destination}
                setDestination={setDestination}
              />
            </div>
          </div>
        </div>



        {/* ══════════════════════════════════════════════════════════════
            MINIMAL EDITORIAL SUPPLY CHAIN WORKFLOW (STONE MONOLITH & LEDGER)
        ══════════════════════════════════════════════════════════════ */}
        <div className="pt-12 md:pt-16 space-y-10 sm:space-y-12">
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
                        <div
                          className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-8 group-hover:opacity-100 group-hover:mt-1 transition-all duration-300 ease-out flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-[#78716c] group-hover:text-[#c85a32]"
                        >
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
      </div>
    </section>
  );
}
