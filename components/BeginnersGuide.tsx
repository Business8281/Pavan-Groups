"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToHash } from "@/components/SmoothScroll";

// ── STONE DATA WITH IMAGE CONTAINERS & EXTENDED DOSSIERS ──
interface DetailedDossier {
  formationStory: string;
  geologicalAge: string;
  australianClimateSuitability: string;
  idealFinishes: string[];
  installationTip: string;
  durabilityRating: string;
}

interface StoneComparisonItem {
  id: string;
  name: string;
  division: string;
  category: string;
  whatItIs: string;
  bestUses: string[];
  keyAdvantage: string;
  maintenance: string;
  accentColor: string;
  badgeBg: string;
  gradient: string;
  imageAlt: string;
  imageCaption: string;
  metrics: {
    hardness: number;
    slipResistance: number;
    heatCoolness: number;
    stainProof: number;
  };
  matchedTags: string[];
  dossier: DetailedDossier;
}

const STONE_TYPES: StoneComparisonItem[] = [
  {
    id: "slate",
    name: "Slate Stone",
    division: "Pavan Impex",
    category: "Metamorphic Foliated Rock",
    whatItIs:
      "Natural layered rock with rich organic texture and natural color variation. Formed through intense geological pressure, each piece extracted is completely unique.",
    bestUses: [
      "Exterior Wall Cladding & Facades",
      "Feature Walls & Fireplaces",
      "Garden Landscaping & Waterfalls",
      "Indoor & Outdoor Flooring",
    ],
    keyAdvantage: "Unique 3D cleft texture — no two pieces are identical. 100% weatherproof.",
    maintenance: "Very low. Hose down with water or wipe with a damp cloth.",
    accentColor: "#c85a32",
    badgeBg: "rgba(255, 68, 58, 0.08)",
    gradient: "linear-gradient(135deg, #1f2328 0%, #2e333b 50%, #15171a 100%)",
    imageAlt: "Markapur Natural Slate Texture & Wall Cladding",
    imageCaption: "Markapur Foliated Natural Cleft Slate",
    metrics: {
      hardness: 6,
      slipResistance: 92,
      heatCoolness: 90,
      stainProof: 94,
    },
    matchedTags: ["walls", "landscape", "waterfalls", "facade"],
    dossier: {
      formationStory:
        "Formed over 500 million years ago from volcanic ash and sedimentary clay under extreme tectonic pressure and metamorphic heat in Markapur, India.",
      geologicalAge: "500+ Million Years (Precambrian Era)",
      australianClimateSuitability:
        "Exceptional frost and thermal shock resistance. The naturally foliated mineral planes reflect harsh UV radiation without fading or surface chalking.",
      idealFinishes: ["Natural Cleft (Hand-Split)", "Calibrated Backing", "Honed Velvet", "Tumbled Rustic"],
      installationTip:
        "Use polymer-modified stone adhesive with 100% trowel coverage to prevent air pockets behind vertical cladding panels.",
      durabilityRating: "50+ Year Commercial Lifespan",
    },
  },
  {
    id: "limestone",
    name: "Limestone",
    division: "Sai Balaji Impex",
    category: "Calcareous Sedimentary Rock",
    whatItIs:
      "Sedimentary rock formed over millions of years from compressed marine minerals and shells. Features a naturally dense, non-slip textured finish.",
    bestUses: [
      "Swimming Pool Surrounds",
      "Driveways & Heavy Load Paths",
      "Outdoor Flooring & Patios",
      "Garden Steps & Courtyards",
    ],
    keyAdvantage:
      "Natural anti-skid surface that remains cool underfoot even in harsh Australian summer heat.",
    maintenance: "Low. Seal once a year for outdoor and wet-area use.",
    accentColor: "#ff6e8f",
    badgeBg: "rgba(255, 110, 143, 0.08)",
    gradient: "linear-gradient(135deg, #37424d 0%, #536374 50%, #232a31 100%)",
    imageAlt: "Calibrated Anti-Skid Limestone Pool Pavers",
    imageCaption: "Dense Cuddapah & Lime Blue Calcareous Pavers",
    metrics: {
      hardness: 5,
      slipResistance: 98,
      heatCoolness: 96,
      stainProof: 88,
    },
    matchedTags: ["pools", "driveways", "patios", "steps"],
    dossier: {
      formationStory:
        "Originates from prehistoric shallow marine basins in Andhra Pradesh, where microscopic calcite crystals bonded over millennia under natural hydrostatic pressure.",
      geologicalAge: "300+ Million Years (Paleozoic Era)",
      australianClimateSuitability:
        "Gold-standard safety material for Australian pool decks and wet areas. Its natural crystalline microporosity dissipates heat rapidly, keeping barefoot walking comfortable under 40°C+ summer sun.",
      idealFinishes: ["Natural Anti-Skid", "Sawn & Tumbled", "Brushed Texture", "Bullnosed Pool Coping"],
      installationTip:
        "Apply a breathable penetrating silane-siloxane impregnating sealer once post-installation to protect against chlorine or saltwater pooling.",
      durabilityRating: "100+ Year Heritage Lifespan",
    },
  },
  {
    id: "granite",
    name: "Monolithic Granite",
    division: "Pavan Granite",
    category: "Plutonic Igneous Rock",
    whatItIs:
      "Igneous rock crystallized from cooled molten magma deep within the Earth's crust. One of the hardest natural minerals on Earth with high-gloss mirror polish.",
    bestUses: [
      "Luxury Kitchen Countertops",
      "Commercial & Hotel Lobbies",
      "Monolithic Staircases",
      "High-Traffic Public Floors",
    ],
    keyAdvantage:
      "Most durable natural stone. Scratch-proof, heat-proof, non-porous and lifetime stain-resistant.",
    maintenance: "Very low. Wipe clean with a damp microfiber cloth.",
    accentColor: "#d97706",
    badgeBg: "rgba(217, 119, 6, 0.08)",
    gradient: "linear-gradient(135deg, #0f1013 0%, #20232a 50%, #090a0c 100%)",
    imageAlt: "Black Galaxy Monolithic Granite Slab Specimen",
    imageCaption: "Mirror-Polished Black Galaxy Golden Bronzite Slabs",
    metrics: {
      hardness: 9,
      slipResistance: 80,
      heatCoolness: 86,
      stainProof: 99,
    },
    matchedTags: ["kitchen", "commercial", "stairs", "counters"],
    dossier: {
      formationStory:
        "Slow cooling of underground silica-rich molten magma over hundreds of thousands of years, resulting in giant interlocking quartz, feldspar, and golden bronzite crystals.",
      geologicalAge: "1.2+ Billion Years (Precambrian Shield)",
      australianClimateSuitability:
        "Impervious to direct hot culinary cookware up to 600°C, direct knife blade slicing, and corrosive citrus/wine spills. Completely UV stable for outdoor kitchen islands.",
      idealFinishes: ["Mirror Diamond Polish", "Flamed Anti-Slip", "Leathered Satin", "CNC Waterjet Edge"],
      installationTip:
        "Ensure solid, level substrate cabinetry with silicone mounting dampeners to support structural 30mm gangsaw slabs.",
      durabilityRating: "Indefinite / Permanent Lifetime",
    },
  },
];

const APPLICATION_QUICK_FILTERS = [
  { id: "all", label: "All Stones" },
  { id: "pools", label: "🏊 Swimming Pools" },
  { id: "kitchen", label: "🍳 Kitchen Counters" },
  { id: "walls", label: "🏛️ Wall Cladding" },
  { id: "driveways", label: "🚗 Driveways & Paths" },
  { id: "landscape", label: "🌿 Waterfalls & Gardens" },
];

const THICKNESS_OPTIONS = [
  {
    mm: 12,
    label: "12mm Calibration",
    category: "Wall & Elevation Spec",
    idealFor: "Exterior wall cladding, feature walls, fireplace facades.",
    structuralNote: "Ultra-lightweight yet rigid. Minimizes wall dead-load during high-rise installation.",
    realWorldAnalogy: "Slim profile — comparable to a sleek architectural phone, engineered for vertical adhesion without heavy wall framing.",
    heightPx: 14,
    imageLabel: "12mm Vertical Facade Profile",
  },
  {
    mm: 18,
    label: "18mm Calibration",
    category: "Balanced Living Spec",
    idealFor: "Indoor living floors, covered patios, residential walkways.",
    structuralNote: "Standard architectural benchmark for crack-free residential traffic.",
    realWorldAnalogy: "Balanced residential standard — provides structural crack resistance for heavy furniture and constant foot traffic.",
    heightPx: 22,
    imageLabel: "18mm Residential Floor Bed",
  },
  {
    mm: 20,
    label: "20mm Calibration",
    category: "Commercial Floor Spec",
    idealFor: "Heavy-traffic floors, outdoor patio slabs, shopping arcades.",
    structuralNote: "High flexural density designed for continuous pedestrian loads.",
    realWorldAnalogy: "Heavy-duty commercial standard — engineered to handle continuous hotel, restaurant, and patio traffic without fatigue.",
    heightPx: 26,
    imageLabel: "20mm Commercial Paver Bed",
  },
  {
    mm: 30,
    label: "30mm Calibration",
    category: "Heavy-Duty & Slabs",
    idealFor: "Heavy vehicle driveways, luxury kitchen waterfall countertops.",
    structuralNote: "Maximum load-bearing structural resilience. Completely impervious to stress fractures.",
    realWorldAnalogy: "Ultra-dense monolithic block — supports multi-ton vehicle wheel loads on driveways and cantilevered kitchen islands.",
    heightPx: 36,
    imageLabel: "30mm Heavy Monolithic Slab",
  },
];

const SIZE_OPTIONS = [
  {
    id: "1x1",
    title: "1×1 ft (30×30 cm)",
    category: "Compact Tile",
    use: "Small tile format for intricate patio layouts, wet area surrounds, and stepping paths.",
    pros: "High layout flexibility on uneven gradients; reduced wastage on curves.",
    aspectClass: "aspect-square",
    previewRatio: "1:1 Ratio",
  },
  {
    id: "2x2",
    title: "2×2 ft (60×60 cm)",
    category: "Medium Architectural Tile",
    use: "Modern balanced grid tile favored for expansive living rooms and open-air villa courtyards.",
    pros: "Minimal grout lines; creates clean geometric spatial continuity.",
    aspectClass: "aspect-square",
    previewRatio: "1:1 Medium Grid",
  },
  {
    id: "8x3",
    title: "8×3 ft / 9×4 ft Slabs",
    category: "Jumbo Monolithic Slab",
    use: "Grand seamless slabs for kitchen waterfall islands, boardroom tables, and luxury lobby walls.",
    pros: "Zero-seam luxury finish; showcases full geological crystal veining.",
    aspectClass: "aspect-[8/3]",
    previewRatio: "8:3 Jumbo Span",
  },
  {
    id: "random",
    title: "Random Sizes",
    category: "Organic Geometry",
    use: "Non-standard, natural-edged hand-split pieces providing a handcrafted rustic appearance.",
    pros: "Artisanal aesthetic; no two floor layouts look identical.",
    aspectClass: "aspect-[4/3]",
    previewRatio: "Organic Freeform",
  },
  {
    id: "ledgers",
    title: "Ledgers (3D Panels)",
    category: "Interlocking System",
    use: "Horizontal stacked stone strips engineered for 3D multi-layered exterior elevation facades.",
    pros: "Rapid modular installation; dramatic 3D shadow depth under facade uplighting.",
    aspectClass: "aspect-[16/5]",
    previewRatio: "3D Stacked Strip",
  },
];

const STONE_VS_CERAMIC = [
  {
    id: "unique",
    advantage: "Each Piece Is Unique",
    whyPayMore: "No two stones look the same — it is authentic, unrepeatable art created by nature.",
    ceramicComparison: "Ceramic tiles repeat identical printed patterns every 4 to 8 tiles.",
    deepDive: "While synthetic tiles are digitally stamped on conveyor belts, every slab of natural stone contains mineral flows, color gradients, and textures that exist nowhere else in the universe.",
    imageTag: "Authentic Mineral Flow",
  },
  {
    id: "ancient",
    advantage: "Millions of Years Old",
    whyPayMore: "Formed deep in the Earth — timeless prestige and beauty that never feels synthetic.",
    ceramicComparison: "Ceramics are kiln-baked synthetic clays that feel artificial and hollow underfoot.",
    deepDive: "Natural stone has endured billions of years of volcanic heat and tectonic pressure. When installed in your home, you are touching geological history rather than manufactured ceramic powder.",
    imageTag: "Precambrian Geological Time",
  },
  {
    id: "weather",
    advantage: "Weather Resistant",
    whyPayMore: "Does not fade, crack, delaminate, or deteriorate in Australian outdoor climate.",
    ceramicComparison: "Ceramic glazes crack, chalk, and blister under harsh UV radiation.",
    deepDive: "Ceramic glaze surfaces suffer from thermal expansion mismatches, causing micro-cracking and freeze-thaw spalling. Natural stone breathes naturally and expands uniformly.",
    imageTag: "UV & Frost Armor",
  },
  {
    id: "value",
    advantage: "Increases Property Value",
    whyPayMore: "Adds lasting premium aesthetics that buyers, appraisers, and tenants love.",
    ceramicComparison: "Ceramic adds standard baseline value with zero luxury premium appraisal.",
    deepDive: "Real estate appraisers and high-net-worth buyers immediately recognize natural stone installations as high-capital architectural upgrades, boosting property valuation and resale velocity.",
    imageTag: "High-Appraisal Capital ROI",
  },
  {
    id: "maintenance",
    advantage: "Low Maintenance",
    whyPayMore: "No special cleaning chemicals — just water and occasional natural sealing.",
    ceramicComparison: "Grout lines discolor and accumulate mold, requiring harsh chemical bleaching.",
    deepDive: "Because natural stone tiles have precision-calibrated edges and dense crystalline density, simple damp mop water cleanups keep the surface pristine for decades without caustic detergents.",
    imageTag: "Simple Pure Water Wash",
  },
  {
    id: "eco",
    advantage: "100% Eco-Friendly",
    whyPayMore: "Pure natural earth extraction with zero synthetic chemicals in manufacturing.",
    ceramicComparison: "High energy-intensive synthetic baking producing heavy carbon footprints.",
    deepDive: "Natural stone is simply harvested from quarries and cut with waterjet diamond blades — zero toxic resins, zero microplastic emissions, and 100% recyclable back into the earth.",
    imageTag: "Zero Chemical Footprint",
  },
  {
    id: "thermal",
    advantage: "Heat Resistant & Cool",
    whyPayMore: "Stays naturally cool in summer heat (limestone, slate) — ideal for swimming pool decks.",
    ceramicComparison: "Ceramic glazes trap surface heat, burning bare feet in direct sunlight.",
    deepDive: "Limestone and slate have naturally high thermal inertia and diffuse solar radiation rapidly, staying 8°C–12°C cooler under direct sunlight than dark synthetic tiles or concrete pavers.",
    imageTag: "Barefoot Cool Pool Deck",
  },
];

function AdvantageIcon({ id }: { id: string }) {
  switch (id) {
    case "unique":
      return (
        <svg className="w-5 h-5 text-[#c85a32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 8.5 12 15 22 8.5 12 2" />
          <polyline points="2 15.5 12 22 22 15.5" />
          <polyline points="2 8.5 12 15 22 8.5" />
        </svg>
      );
    case "ancient":
      return (
        <svg className="w-5 h-5 text-[#c85a32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
          <path d="M12 2v2M12 20v2M20 12h2M2 12h2" />
        </svg>
      );
    case "weather":
      return (
        <svg className="w-5 h-5 text-[#c85a32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "value":
      return (
        <svg className="w-5 h-5 text-[#c85a32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    case "maintenance":
      return (
        <svg className="w-5 h-5 text-[#c85a32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case "eco":
      return (
        <svg className="w-5 h-5 text-[#c85a32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "thermal":
      return (
        <svg className="w-5 h-5 text-[#c85a32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-[#c85a32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export default function BeginnersGuide() {
  const [activeTab, setActiveTab] = useState<"compare" | "standards" | "why-stone">("compare");
  const [activeStone, setActiveStone] = useState<string>("slate");
  const [selectedAppFilter, setSelectedAppFilter] = useState<string>("all");
  const [selectedThicknessMm, setSelectedThicknessMm] = useState<number>(20);
  const [selectedSizeId, setSelectedSizeId] = useState<string>("2x2");
  const [expandedAdvantageId, setExpandedAdvantageId] = useState<string | null>("unique");
  const [showFullDossierModal, setShowFullDossierModal] = useState<boolean>(false);

  const selectedStone = STONE_TYPES.find((s) => s.id === activeStone) || STONE_TYPES[0];
  const activeThickness = THICKNESS_OPTIONS.find((t) => t.mm === selectedThicknessMm) || THICKNESS_OPTIONS[1];
  const activeSize = SIZE_OPTIONS.find((s) => s.id === selectedSizeId) || SIZE_OPTIONS[1];

  const handleContactScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash("#contact", 1.6);
    window.history.replaceState(null, "", "#contact");
  };

  const handleAppFilterClick = (tag: string) => {
    setSelectedAppFilter(tag);
    if (tag === "pools" || tag === "driveways" || tag === "patios") {
      setActiveStone("limestone");
    } else if (tag === "kitchen" || tag === "commercial" || tag === "counters") {
      setActiveStone("granite");
    } else if (tag === "walls" || tag === "landscape" || tag === "waterfalls") {
      setActiveStone("slate");
    }
  };

  return (
    <section
      id="guide"
      className="relative py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#f8fafc] text-[#140d0a] border-t border-[#140d0a]/10 overflow-hidden"
    >
      {/* Ambient architectural grid removed as per user request */}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── SECTION 3 HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6 pb-6 border-b border-[#140d0a]/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#140d0a]/10 shadow-sm mb-3">
              <span className="w-2 h-2 rounded-full bg-[#c85a32] animate-pulse" />
              <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] font-semibold text-[#140d0a]">
                SECTION 3 — BEGINNER&apos;S GUIDE TO NATURAL STONE
              </span>
            </div>

            <h2
              className="font-display font-light text-[#140d0a] leading-[1.08] tracking-[-0.015em]"
              style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}
            >
              Beginner&apos;s Guide to{" "}
              <span className="italic font-normal text-[#c85a32]">Natural Stone.</span>
            </h2>

            <p className="text-[13.5px] sm:text-[14.5px] text-[#140d0a]/75 font-light mt-2 max-w-2xl leading-relaxed">
              Use this section to explore our stones through interactive visual showcases — inspect high-definition stone textures, live caliper dimension profiles, and side-by-side material comparisons.
            </p>
          </div>

          {/* Tab Switcher Controller */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white border border-[#140d0a]/10 shadow-sm self-start md:self-end flex-wrap">
            <button
              onClick={() => setActiveTab("compare")}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer border-none ${
                activeTab === "compare"
                  ? "bg-[#c85a32] text-white font-semibold shadow-sm"
                  : "bg-transparent text-[#140d0a]/60 hover:text-[#140d0a]"
              }`}
            >
              01 · Stone Types
            </button>

            <button
              onClick={() => setActiveTab("standards")}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer border-none ${
                activeTab === "standards"
                  ? "bg-[#c85a32] text-white font-semibold shadow-sm"
                  : "bg-transparent text-[#140d0a]/60 hover:text-[#140d0a]"
              }`}
            >
              02 · Thickness & Sizes
            </button>

            <button
              onClick={() => setActiveTab("why-stone")}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer border-none ${
                activeTab === "why-stone"
                  ? "bg-[#c85a32] text-white font-semibold shadow-sm"
                  : "bg-transparent text-[#140d0a]/60 hover:text-[#140d0a]"
              }`}
            >
              03 · Stone vs Ceramic
            </button>
          </div>
        </div>

        {/* ── TAB 1: STONE COMPARISON MATRIX + VISUAL IMAGE SHOWCASE ── */}
        <AnimatePresence mode="wait">
          {activeTab === "compare" && (
            <motion.div
              key="tab-compare"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Application Quick Recommender Bar */}
              <div className="p-3.5 bg-white border border-[#140d0a]/10 shadow-sm flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#140d0a]/60 font-bold">
                    CLICK A PROJECT TO MATCH IDEAL STONE:
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {APPLICATION_QUICK_FILTERS.map((filter) => {
                    const isMatched = selectedAppFilter === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => handleAppFilterClick(filter.id)}
                        className={`px-2.5 py-1 text-xs transition-all cursor-pointer border ${
                          isMatched
                            ? "bg-[#140d0a] text-white border-[#140d0a] font-medium shadow-sm"
                            : "bg-[#ffffff] text-[#140d0a]/75 border-[#140d0a]/10 hover:border-[#140d0a]/30"
                        }`}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3 Interactive Stone Selector Cards with Image Framing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {STONE_TYPES.map((stone) => {
                  const isSelected = activeStone === stone.id;

                  return (
                    <button
                      key={stone.id}
                      onClick={() => {
                        setActiveStone(stone.id);
                        setSelectedAppFilter("all");
                      }}
                      className={`text-left transition-all duration-300 relative border cursor-pointer overflow-hidden flex flex-col justify-between group ${
                        isSelected
                          ? "bg-white border-[#c85a32] shadow-md translate-y-[-2px] ring-1 ring-[#c85a32]"
                          : "bg-white/70 border-[#140d0a]/10 hover:border-[#140d0a]/25 hover:bg-white"
                      }`}
                    >
                      {/* Visual Texture Image Container */}
                      <div className="h-40 w-full relative overflow-hidden bg-[#ffffff] border-b border-[#140d0a]/10 flex items-center justify-center">
                        <div
                          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                          style={{ background: stone.gradient }}
                        />

                        {/* Subtle noise/texture overlay */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />

                        <div className="relative z-10 text-center px-4">
                          <span
                            className="px-2.5 py-1 text-[9px] font-mono font-bold tracking-wider uppercase text-white shadow-sm inline-block mb-1"
                            style={{ background: stone.accentColor }}
                          >
                            {stone.division}
                          </span>
                          <span className="text-[11px] font-mono text-white/90 block drop-shadow-md">
                            {stone.imageCaption}
                          </span>
                        </div>

                        {/* Visual Image Placeholder Tag */}
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-[8.5px] font-mono text-white/80 uppercase">
                          📷 Natural Texture Specimen
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h3 className="font-display text-2xl text-[#140d0a] font-medium">
                            {stone.name}
                          </h3>
                          <span className="text-[10px] text-[#c85a32] font-mono uppercase tracking-wider font-bold">
                            {isSelected ? "● ACTIVE" : "INSPECT"}
                          </span>
                        </div>

                        <p className="text-[10.5px] font-mono uppercase tracking-wider text-[#140d0a]/50 mb-3">
                          {stone.category}
                        </p>

                        <div className="h-px bg-[#140d0a]/10 my-3 w-full" />

                        <p className="text-xs leading-relaxed text-[#140d0a]/75 line-clamp-2 mb-3">
                          {stone.whatItIs}
                        </p>

                        <div className="flex items-center justify-between text-[9.5px] font-mono text-[#140d0a]/50">
                          <span>Lifespan: 50+ Yrs</span>
                          <span className="text-[#c85a32] font-semibold">Tap to view specs →</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detailed Comparative Spec Matrix for Active Stone */}
              <div className="bg-white border border-[#140d0a]/10 p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-15"
                  style={{
                    background: `radial-gradient(circle at top right, ${selectedStone.accentColor} 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  
                  {/* Left Column: Core Identity + Interactive Performance Gauges (5 Cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div>
                      <span
                        className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold block mb-1"
                        style={{ color: selectedStone.accentColor }}
                      >
                        GEOLOGICAL DOSSIER · {selectedStone.division}
                      </span>
                      <h3 className="font-display font-light text-3xl sm:text-4xl text-[#140d0a] leading-tight">
                        {selectedStone.name}
                      </h3>
                      <span className="text-xs font-mono text-[#140d0a]/60 tracking-wider block mt-0.5">
                        {selectedStone.category}
                      </span>
                    </div>

                    {/* Featured Stone Visual Texture Banner Frame */}
                    <div className="w-full h-36 relative overflow-hidden bg-[#ffffff] border border-[#140d0a]/10 flex items-end p-4">
                      <div className="absolute inset-0" style={{ background: selectedStone.gradient }} />
                      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
                      <div className="relative z-10 flex items-center justify-between w-full">
                        <span className="px-2.5 py-1 text-[9.5px] font-mono uppercase bg-black/60 backdrop-blur-sm text-white font-semibold">
                          🖼️ Direct Quarry Extracted Specimen
                        </span>
                        <span className="text-[10px] font-mono text-white/80">
                          {selectedStone.division}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#ffffff] border-l-2 border-[#140d0a]/20">
                      <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#140d0a]/50 block mb-1 font-semibold">
                        WHAT IT IS:
                      </span>
                      <p className="text-[13px] leading-relaxed text-[#140d0a]/85 font-light">
                        {selectedStone.whatItIs}
                      </p>
                    </div>

                    {/* Key Advantage Highlight Box */}
                    <div
                      className="p-4 border border-[#140d0a]/10 relative overflow-hidden"
                      style={{ background: selectedStone.badgeBg }}
                    >
                      <span
                        className="text-[9.5px] font-mono uppercase tracking-wider block mb-1 font-bold"
                        style={{ color: selectedStone.accentColor }}
                      >
                        ★ KEY ARCHITECTURAL ADVANTAGE:
                      </span>
                      <p className="text-[13px] leading-relaxed text-[#140d0a] font-medium">
                        {selectedStone.keyAdvantage}
                      </p>
                    </div>

                    {/* Interactive Engineering Benchmarks */}
                    <div className="p-4 bg-[#ffffff] border border-[#140d0a]/10 space-y-3">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#140d0a]/60 font-bold block">
                        ARCHITECTURAL BENCHMARKS:
                      </span>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#140d0a]/70">Mohs Hardness Scale</span>
                          <span className="font-mono font-bold text-[#140d0a]">{selectedStone.metrics.hardness} / 10</span>
                        </div>
                        <div className="h-1.5 bg-[#140d0a]/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedStone.metrics.hardness * 10}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full"
                            style={{ background: selectedStone.accentColor }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#140d0a]/70">Anti-Skid Traction</span>
                          <span className="font-mono font-bold text-[#140d0a]">{selectedStone.metrics.slipResistance}%</span>
                        </div>
                        <div className="h-1.5 bg-[#140d0a]/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedStone.metrics.slipResistance}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-[#140d0a]"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#140d0a]/70">Summer Heat Resistance</span>
                          <span className="font-mono font-bold text-[#140d0a]">{selectedStone.metrics.heatCoolness}% Cool</span>
                        </div>
                        <div className="h-1.5 bg-[#140d0a]/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedStone.metrics.heatCoolness}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full"
                            style={{ background: selectedStone.accentColor }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Applications & Maintenance + Deep Dive Panel (7 Cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    
                    {/* Best Uses List */}
                    <div className="p-5 bg-[#ffffff] border border-[#140d0a]/10">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#c85a32] block mb-3 font-bold">
                        RECOMMENDED BEST USES:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedStone.bestUses.map((use, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#140d0a]/85">
                            <span className="text-[#c85a32] text-sm leading-none mt-0.5">✔</span>
                            <span>{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Maintenance Protocol */}
                    <div className="p-5 bg-[#ffffff] border border-[#140d0a]/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#140d0a]/60 font-semibold">
                          MAINTENANCE:
                        </span>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 bg-white border border-[#140d0a]/10 text-[#140d0a]/70 font-semibold">
                          Low Maintenance
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#140d0a]/80">
                        {selectedStone.maintenance}
                      </p>
                    </div>

                    {/* Interactive "Click to Know More" Geological Dossier Card */}
                    <div className="p-5 bg-white border border-[#c85a32]/40 shadow-sm relative overflow-hidden">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#c85a32] animate-ping" />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#c85a32] font-bold">
                            GEOLOGICAL DEEP-DIVE & CLIMATE REPORT
                          </span>
                        </div>

                        <button
                          onClick={() => setShowFullDossierModal(!showFullDossierModal)}
                          className="text-xs text-[#c85a32] font-bold hover:underline cursor-pointer border-none bg-transparent"
                        >
                          {showFullDossierModal ? "▲ Collapse Report" : "▼ Click to Know More"}
                        </button>
                      </div>

                      <p className="text-xs text-[#140d0a]/80 leading-relaxed mb-3">
                        <strong className="text-[#140d0a]">Origin Formation: </strong>
                        {selectedStone.dossier.formationStory}
                      </p>

                      <AnimatePresence>
                        {showFullDossierModal && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 pt-3 border-t border-[#140d0a]/10"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div className="p-3 bg-[#ffffff] border border-[#140d0a]/10">
                                <span className="text-[9px] font-mono uppercase text-[#140d0a]/50 block font-bold mb-0.5">
                                  AUSTRALIAN CLIMATE REPORT:
                                </span>
                                <p className="text-[11.5px] text-[#140d0a]/80">
                                  {selectedStone.dossier.australianClimateSuitability}
                                </p>
                              </div>

                              <div className="p-3 bg-[#ffffff] border border-[#140d0a]/10">
                                <span className="text-[9px] font-mono uppercase text-[#140d0a]/50 block font-bold mb-0.5">
                                  PRO INSTALLATION TIP:
                                </span>
                                <p className="text-[11.5px] text-[#140d0a]/80">
                                  {selectedStone.dossier.installationTip}
                                </p>
                              </div>
                            </div>

                            <div className="p-3 bg-[#ffffff] border border-[#140d0a]/10 flex items-center justify-between flex-wrap gap-2 text-xs">
                              <span className="text-[#140d0a]/70">
                                <strong>Geological Age: </strong> {selectedStone.dossier.geologicalAge}
                              </span>
                              <span className="px-2 py-0.5 bg-white border border-[#140d0a]/10 text-[#c85a32] font-mono font-bold">
                                {selectedStone.dossier.durabilityRating}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Collapsible Architectural Project Showcase Photo Frame (Hides when Deep-Dive Expands, Reappears when Collapsed) */}
                    <AnimatePresence>
                      {!showFullDossierModal && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-[#ffffff] border border-[#140d0a]/10 relative group">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] font-mono uppercase tracking-wider text-[#140d0a]/60 font-bold">
                                REAL-WORLD ARCHITECTURAL INSTALLATION:
                              </span>
                              <span className="text-[9px] font-mono text-[#c85a32] font-semibold">
                                {selectedStone.name} Specimen View
                              </span>
                            </div>

                            {/* Architectural Image Container */}
                            <div className="w-full h-44 relative overflow-hidden border border-[#140d0a]/10 flex items-end p-4">
                              <div
                                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                                style={{ background: selectedStone.gradient }}
                              />
                              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />

                              <div className="relative z-10 flex items-center justify-between w-full">
                                <span className="px-2.5 py-1 text-[9px] font-mono uppercase bg-black/70 backdrop-blur-sm text-white font-semibold shadow-sm">
                                  📷 {selectedStone.imageCaption}
                                </span>
                                <span className="px-2 py-0.5 bg-white/90 text-[#140d0a] text-[9px] font-mono font-bold shadow-sm">
                                  {selectedStone.division}
                                </span>
                              </div>
                            </div>

                            <p className="text-[11.5px] text-[#140d0a]/70 font-light mt-2 italic">
                              * Click &quot;▼ Click to Know More&quot; above to expand the full geological climate &amp; engineering report.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#140d0a]/10 flex-wrap gap-3">
                      <span className="text-[10.5px] font-mono text-[#140d0a]/50">
                        Origin: Markapur & Andhra Pradesh Direct Quarries
                      </span>

                      <button
                        onClick={handleContactScroll}
                        className="px-4 py-2 text-[9px] uppercase tracking-[0.2em] font-semibold bg-[#c85a32] text-white hover:bg-[#a84a27] transition-all cursor-pointer border-none shadow-sm"
                      >
                        Request Sample Kit →
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* ── TAB 2: INTERACTIVE THICKNESS CALIPER & SIZE STUDIO WITH VISUAL SAMPLES ── */}
          {activeTab === "standards" && (
            <motion.div
              key="tab-standards"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="bg-white border border-[#140d0a]/10 p-6 sm:p-8 shadow-sm">
                
                {/* 1. Interactive Thickness Calibrator */}
                <div className="mb-8 pb-6 border-b border-[#140d0a]/10">
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                    <div>
                      <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#c85a32] font-bold block mb-1">
                        INTERACTIVE CALIPER STUDIO (CLICK A GAUGE)
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl text-[#140d0a] font-light">
                        1. Thickness (mm) — Physical Cross-Section & Load Profiling
                      </h3>
                    </div>

                    {/* Thickness Selector Pills */}
                    <div className="flex items-center gap-1.5 p-1 bg-[#ffffff] border border-[#140d0a]/10">
                      {THICKNESS_OPTIONS.map((opt) => (
                        <button
                          key={opt.mm}
                          onClick={() => setSelectedThicknessMm(opt.mm)}
                          className={`px-3.5 py-2 text-xs font-mono font-bold transition-all cursor-pointer border-none ${
                            selectedThicknessMm === opt.mm
                              ? "bg-[#c85a32] text-white shadow-sm ring-2 ring-[#c85a32]/30"
                              : "bg-transparent text-[#140d0a]/70 hover:text-[#140d0a]"
                          }`}
                        >
                          {opt.mm}mm
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Interactive Thickness Profile Display */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 bg-[#ffffff] border border-[#140d0a]/10">
                    
                    {/* Visual Caliper Cross-Section (4 Cols) */}
                    <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white border border-[#140d0a]/10 shadow-sm">
                      <span className="text-[9.5px] font-mono uppercase text-[#140d0a]/50 tracking-wider mb-2 font-semibold">
                        Cross-Section Profile Scale
                      </span>

                      {/* Animated Slab Cross-Section */}
                      <div className="w-full max-w-[200px] h-24 flex items-center justify-center relative">
                        <motion.div
                          animate={{ height: activeThickness.heightPx }}
                          transition={{ duration: 0.35, type: "spring", stiffness: 220, damping: 22 }}
                          className="w-full bg-gradient-to-r from-[#140d0a] via-[#3a2720] to-[#140d0a] border border-[#c85a32] shadow-inner relative flex items-center justify-center"
                        >
                          <span className="text-[10.5px] font-mono font-bold text-white tracking-widest uppercase">
                            {activeThickness.mm}mm Solid Stone Bed
                          </span>
                        </motion.div>
                      </div>

                      <span className="text-xs font-mono text-[#c85a32] font-bold mt-2">
                        {activeThickness.label}
                      </span>
                    </div>

                    {/* Architectural Guidance & Real-World Analogy (8 Cols) */}
                    <div className="lg:col-span-8 space-y-3">
                      <div className="inline-block px-2.5 py-0.5 bg-[#140d0a] text-white text-[9.5px] font-mono uppercase tracking-wider font-bold">
                        {activeThickness.category}
                      </div>

                      <h4 className="font-display text-xl text-[#140d0a] font-medium">
                        Ideal Application: {activeThickness.idealFor}
                      </h4>

                      <p className="text-xs leading-relaxed text-[#140d0a]/80 font-light">
                        {activeThickness.structuralNote}
                      </p>

                      <div className="p-3 bg-white border-l-3 border-[#c85a32] text-xs">
                        <span className="text-[9px] font-mono uppercase text-[#c85a32] font-bold block mb-0.5">
                          REAL-WORLD PRACTICAL ANALOGY:
                        </span>
                        <p className="text-[#140d0a]/85 font-normal">
                          {activeThickness.realWorldAnalogy}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2. Dimensions & Standard Sizes Grid with Image Containers */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#c85a32] font-bold block mb-1">
                        INTERACTIVE SIZE FORMAT SELECTOR
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl text-[#140d0a] font-light">
                        2. Standard Size Formats (Click Any Card to Inspect)
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SIZE_OPTIONS.map((sz) => {
                      const isSelected = selectedSizeId === sz.id;
                      return (
                        <button
                          key={sz.id}
                          onClick={() => setSelectedSizeId(sz.id)}
                          className={`text-left transition-all border cursor-pointer overflow-hidden flex flex-col justify-between group ${
                            isSelected
                              ? "bg-white border-[#c85a32] shadow-md ring-1 ring-[#c85a32]"
                              : "bg-[#ffffff] border-[#140d0a]/10 hover:border-[#140d0a]/30 hover:bg-white"
                          }`}
                        >
                          {/* Visual Format Ratio Container */}
                          <div className="h-28 w-full bg-[#f2ece2] border-b border-[#140d0a]/10 flex items-center justify-center p-3 relative overflow-hidden">

                            <div
                              className={`border-2 ${
                                isSelected ? "border-[#c85a32] bg-[#c85a32]/10" : "border-[#140d0a]/40 bg-white/60"
                              } transition-all duration-300 flex items-center justify-center p-2 text-center max-w-[85%] max-h-[85%] ${
                                sz.aspectClass
                              }`}
                            >
                              <span className="text-[10px] font-mono font-bold text-[#140d0a]/80 uppercase">
                                {sz.previewRatio}
                              </span>
                            </div>

                            <span className="absolute bottom-1 right-2 text-[8px] font-mono text-[#140d0a]/40 uppercase">
                              📐 Spatial Ratio
                            </span>
                          </div>

                          <div className="p-5">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-display text-lg text-[#140d0a] font-medium">
                                {sz.title}
                              </h4>
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-white border border-[#140d0a]/10 text-[#140d0a]/70 font-semibold">
                                {sz.category}
                              </span>
                            </div>

                            <p className="text-xs leading-relaxed text-[#140d0a]/75 font-light mb-2.5">
                              {sz.use}
                            </p>

                            <div className="pt-2 border-t border-[#140d0a]/10 text-[10.5px] text-[#c85a32] font-medium">
                              ★ {sz.pros}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ── TAB 3: WHY NATURAL STONE VS CERAMIC TILES (Interactive Image Benchmark) ── */}
          {activeTab === "why-stone" && (
            <motion.div
              key="tab-why-stone"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="bg-white border border-[#140d0a]/10 p-6 sm:p-8 shadow-sm">
                <div className="mb-6 pb-4 border-b border-[#140d0a]/10 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#c85a32] font-bold block mb-1">
                      MATERIAL COMPARISON BENCHMARK
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#140d0a] font-light">
                      Why Natural Stone — Not Ceramic Tiles?
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#c85a32] uppercase font-bold">
                    Click Any Card to Know More Details
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {STONE_VS_CERAMIC.map((item, idx) => {
                    const isExpanded = expandedAdvantageId === item.id;

                    return (
                      <div
                        key={idx}
                        onClick={() => setExpandedAdvantageId(isExpanded ? null : item.id)}
                        className={`transition-all duration-300 group flex flex-col justify-between cursor-pointer border overflow-hidden ${
                          isExpanded
                            ? "bg-white border-[#c85a32] shadow-md ring-1 ring-[#c85a32]"
                            : "bg-[#ffffff] border-[#140d0a]/10 hover:border-[#c85a32]/50 hover:bg-white"
                        }`}
                      >
                        {/* Visual Image Header Container */}
                        <div className="h-28 w-full bg-[#f2ece2] relative overflow-hidden border-b border-[#140d0a]/10 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#140d0a]/15 via-transparent to-[#c85a32]/10" />
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#140d0a_1px,transparent_1px)] [background-size:10px_10px]" />
                          
                          <div className="relative z-10 flex flex-col items-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center">
                              <AdvantageIcon id={item.id} />
                            </div>
                            <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm text-[8.5px] font-mono text-white uppercase font-medium">
                              📷 {item.imageTag}
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-center justify-between gap-3 mb-2.5">
                            <h4 className="font-display text-base sm:text-lg text-[#140d0a] font-medium group-hover:text-[#c85a32] transition-colors">
                              {item.advantage}
                            </h4>

                            <span className="text-xs font-mono font-bold text-[#c85a32]">
                              {isExpanded ? "−" : "+"}
                            </span>
                          </div>

                          <div className="h-px bg-[#140d0a]/10 my-2 w-full" />

                          <p className="text-xs leading-relaxed text-[#140d0a]/80 font-light mb-3">
                            <strong className="text-[#140d0a] font-semibold">Natural Stone: </strong>
                            {item.whyPayMore}
                          </p>

                          {/* Synthetic Ceramic Comparison Callout */}
                          <div className="p-2.5 bg-white border border-[#140d0a]/10 text-xs mb-3">
                            <span className="text-[9px] font-mono uppercase text-[#c85a32] font-bold block mb-0.5">
                              VS. CERAMIC TILES:
                            </span>
                            <span className="text-[#140d0a]/70 text-[11.5px]">
                              {item.ceramicComparison}
                            </span>
                          </div>

                          {/* Interactive Click-to-Reveal Deep Dive Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="p-3 bg-[#ffffff] border-l-2 border-[#c85a32] text-xs text-[#140d0a]/85 leading-relaxed"
                              >
                                <span className="text-[9px] font-mono uppercase text-[#140d0a]/60 block font-bold mb-1">
                                  ARCHITECTURAL INSIGHT:
                                </span>
                                {item.deepDive}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="px-5 pb-4 pt-2 border-t border-[#140d0a]/10 flex items-center justify-between text-[9px] font-mono text-[#140d0a]/45">
                          <span>PILLAR 0{idx + 1}</span>
                          <span className="text-[#c85a32] font-semibold">
                            {isExpanded ? "Click to collapse" : "Click to know more"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Lifetime Value ROI Summary Banner */}
                <div className="mt-8 p-6 bg-[#ffffff] border-l-4 border-[#c85a32] flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#c85a32] font-bold block mb-0.5">
                      30-YEAR ARCHITECTURAL APPRAISAL
                    </span>
                    <h4 className="font-display text-lg text-[#140d0a] font-medium">
                      Natural Stone vs Ceramic: The True Long-Term Investment
                    </h4>
                    <p className="text-xs text-[#140d0a]/75 font-light mt-0.5 max-w-xl">
                      While ceramic tiles require replacement every 7–10 years due to hairline cracking and glaze wear, natural stone lasts for centuries and grows more beautiful with time.
                    </p>
                  </div>

                  <button
                    onClick={handleContactScroll}
                    className="px-5 py-2.5 text-[9.5px] uppercase tracking-[0.2em] font-semibold bg-[#140d0a] text-white hover:bg-[#c85a32] transition-all cursor-pointer border-none shadow-sm flex-none"
                  >
                    Consult Stone Specialist →
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
