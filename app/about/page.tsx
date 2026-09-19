"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Lightbulb,
  Heart,
  Globe,
  Users,
  Cpu,
  UserCheck,
  Phone,
  MessageSquare,
  User,
  Sparkles,
  Layers,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Play,
  Pause,
  ShieldCheck,
  CircleCheck as CheckCircle2,
} from "@animateicons/react/lucide";

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
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const milestones = [
  {
    year: "2000",
    title: "The Rajasthan Genesis",
    location: "Dholpur Basin",
    stone: "Sedimentary Buff Sandstone",
    era: "Founding Era",
    highlight: "Acquired first 15-hectare quarry lease with zero-compromise geological surveying.",
    story: "Founded on the conviction that Indian stone, quarry-managed with geological respect and precision, rivals any material extracted in Carrara or Verona. Our early days focused on supplying historic restorations and private Indian estates.",
    metrics: "Initial yield: 800 m³ / yr",
  },
  {
    year: "2003",
    title: "Peninsular Granite Veins",
    location: "Karnataka & Andhra Pradesh",
    stone: "Precambrian Plutonic Granite",
    era: "Export Expansion",
    highlight: "Discovered the deep-crystal Absolute Black and golden Bronzite Black Galaxy formations.",
    story: "Secured high-yield granite deposits in the Deccan plateau. Installed heavy extraction cranes and established direct container shipping channels through Chennai and Nhava Sheva ports to European distributors.",
    metrics: "Export reach: 14 countries",
  },
  {
    year: "2012",
    title: "The 120,000 Sq Ft Processing Hub",
    location: "Industrial Stone Corridor",
    stone: "Automated Gang Saw Lines",
    era: "Technological Leap",
    highlight: "Commissioned computerized 5-axis CNC bridge saws and multi-head resin treatment lines.",
    story: "Transformed raw block fabrication into a high-precision science. Achieved ±0.5mm slab calibration tolerances and integrated ultrasonic flaw detectors to inspect interior crystalline continuity.",
    metrics: "Capacity: 15,000 m² slabs / mo",
  },
  {
    year: "2019",
    title: "Circular Water & Reforestation",
    location: "All Active Leases",
    stone: "Eco-Quarrying Protocol",
    era: "Sustainable Modernity",
    highlight: "Pioneered closed-loop water filtration, recycling 88% of process slurry into paving bricks.",
    story: "Committed to progressive land rehabilitation. Every extracted bench is backfilled with organic topsoil and indigenous flora, setting the benchmark for ethical stone stewardship in South Asia.",
    metrics: "Recycled water: 450,000 L / day",
  },
  {
    year: "Present",
    title: "Global Architectural Vanguard",
    location: "40+ Sovereign Markets",
    stone: "Bespoke Monumental Supply",
    era: "Global Leadership",
    highlight: "Direct material partner to premier international architects, hotel groups, and civic precincts.",
    story: "From Singapore's waterfront to civic assemblies in Australia and desert towers in the Gulf, Pavan Stones Group provides turnkey quarry-to-port logistics for the world's most demanding projects.",
    metrics: "2,400+ landmarks completed",
  },
];

const quarries = [
  {
    id: "rajasthan",
    name: "North Basin Quarry",
    region: "Rajasthan",
    geology: "Calcitic Limestone & Dholpur Sandstone",
    depth: "48 meters",
    density: "2,600 kg/m³",
    mineral: "Quartz 92% · Iron Oxides 4%",
    featuredStones: ["Dholpur Beige", "Kota Blue", "Jaisalmer Gold"],
    yieldColor: "#c85a32",
  },
  {
    id: "karnataka",
    name: "Deccan Igneous Pluton",
    region: "Karnataka",
    geology: "Deep-crust Plutonic Absolute Black Granite",
    depth: "72 meters",
    density: "2,980 kg/m³",
    mineral: "Feldspar 65% · Pyroxene 25%",
    featuredStones: ["Absolute Black", "Galaxy Bronzite", "Ruby Red"],
    yieldColor: "#d94e34",
  },
  {
    id: "himachal",
    name: "Himalayan Slate Escarpment",
    region: "Himachal Pradesh",
    geology: "Foliated Metamorphic Clay Slate",
    depth: "35 meters (Bench Cut)",
    density: "2,750 kg/m³",
    mineral: "Mica 45% · Quartz 35%",
    featuredStones: ["Autumn Rustic", "Black Raj", "Silver Grey"],
    yieldColor: "#b37d36",
  },
  {
    id: "andhra",
    name: "Riverine Quartzite Fields",
    region: "Andhra Pradesh",
    geology: "Tumbled Basalt & Hard Cobblestone",
    depth: "Surface Alluvial Deposits",
    density: "2,900 kg/m³",
    mineral: "Microcrystalline Silica 95%",
    featuredStones: ["Charcoal Cobbles", "Teak Sandstone", "Pebbles"],
    yieldColor: "#c25e00",
  },
];

interface ManufacturingFacility {
  id: string;
  unitNum: string;
  division: string;
  divisionSlug: string;
  homeColor: string;
  title: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  borderColor: string;
  accentGradient: string;
  location: string;
  area: string;
  annualCapacity: string;
  tolerance: string;
  description: string;
  features: string[];
  machinery: string[];
  image: string;
  badge: string;
}

const MANUFACTURING_FACILITIES: ManufacturingFacility[] = [
  {
    id: "markapur",
    unitNum: "UNIT 01",
    division: "Pavan Impex",
    divisionSlug: "pavan-impex",
    homeColor: "#9a3412",
    title: "Markapur Natural Slate & 3D Cladding Complex",
    tag: "NATURAL SLATE & 3D CLADDING",
    tagColor: "#9a3412",
    tagBg: "rgba(154, 52, 18, 0.1)",
    borderColor: "#9a3412",
    accentGradient: "linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)",
    location: "Markapur Mineral Belt, Andhra Pradesh",
    area: "65,000 Sq Ft Under Roof",
    annualCapacity: "45,000 SQM / Year",
    tolerance: "±0.5 mm Diamond Calibration",
    description:
      "Our Markapur complex specializes in captive natural slate extraction, high-speed multi-blade diamond block sawing, precision hydraulic splitters, and artisanal 3D stacked stone ledger panel fabrication. Operating continuous auto-gauging lines that deliver flawless surface textures for interior feature walls and exterior elevations worldwide.",
    features: [
      "Multi-blade diamond block saws with computerized stroke control",
      "Precision hydraulic stone splitters for authentic rockface cleaves",
      "Automated thickness-calibrating and edge-gauging conveyors",
      "Artisanal mesh-backing assembly lines for seamless 3D ledger panels",
    ],
    machinery: [
      "Multi-Blade Gang Saws",
      "Hydraulic Block Splitters",
      "Auto-Gauging Lines",
      "Mesh Panel Pressing Beds",
    ],
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    badge: "Markapur Slate Reserves Hub",
  },
  {
    id: "cuddapah",
    unitNum: "UNIT 02",
    division: "Sai Balaji Impex",
    divisionSlug: "sai-balaji-impex",
    homeColor: "#b45309",
    title: "Cuddapah Calcareous Limestone & Paver Works",
    tag: "CALCAREOUS LIMESTONE & PAVERS",
    tagColor: "#b45309",
    tagBg: "rgba(180, 83, 9, 0.1)",
    borderColor: "#b45309",
    accentGradient: "linear-gradient(135deg, #78350f 0%, #b45309 100%)",
    location: "Cuddapah Basin, Andhra Pradesh",
    area: "80,000 Sq Ft Under Roof",
    annualCapacity: "40,000 SQM / Year",
    tolerance: "±0.5 mm Diamond Calibration",
    description:
      "Engineered for heavy-duty limestone processing, our Cuddapah works produces high-density calcrete pavers, tumbled driveway setts, certified anti-skid pool copings, and jumbo exterior architectural flagstones. Featuring continuous shot-blasting bays that create barefoot-friendly, thermally stable stone surfaces for luxury hospitality and estate landscaping.",
    features: [
      "Continuous abrasive shot-blasting bays for certified non-slip safety",
      "Heavy-duty industrial tumbling drums for authentic antique finishes",
      "Automated bullnose & pool-coping diamond profile trimmers",
      "Precision bridge cutting lines with automated laser alignment",
    ],
    machinery: [
      "Continuous Shot-Blasters",
      "Heavy-Duty Tumbling Drums",
      "Bullnose Edge Shapers",
      "Laser-Guided Bridge Saws",
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    badge: "Cuddapah Basin Limestone Hub",
  },
  {
    id: "chimakurthy",
    unitNum: "UNIT 03",
    division: "Pavan Granite",
    divisionSlug: "pavan-granite",
    homeColor: "#0f766e",
    title: "Chimakurthy Black Galaxy Gangsaw Plant",
    tag: "PREMIUM BLACK GALAXY GRANITE",
    tagColor: "#0f766e",
    tagBg: "rgba(15, 118, 110, 0.1)",
    borderColor: "#0f766e",
    accentGradient: "linear-gradient(135deg, #134e4a 0%, #0f766e 100%)",
    location: "Chimakurthy Pluton, Andhra Pradesh",
    area: "120,000 Sq Ft Under Roof",
    annualCapacity: "35,000 SQM / Year",
    tolerance: "±0.5 mm Diamond Calibration",
    description:
      "Our flagship granite processing facility transforms raw 30-ton Chimakurthy Black Galaxy granite boulders into mirror-polished jumbo gangsaw slabs, zero-porosity kitchen countertops, and monumental civic facades. Equipped with Italian multi-blade diamond gang saws and automated 16-head line polishing that produces up to 95° mirror gloss.",
    features: [
      "Heavy-duty Italian diamond multi-blade gang saw frames",
      "Automated 16-head continuous resin & line polishing (95°+ gloss)",
      "Vacuum-assisted epoxy resin infusion chambers for crystal integrity",
      "Ultrasonic flaw scanning for subsurface crystalline continuity",
    ],
    machinery: [
      "Italian Diamond Gang Saws",
      "16-Head Line Polishers",
      "Epoxy Vacuum Chambers",
      "Overhead 40-Ton Gantry Cranes",
    ],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    badge: "Galaxy Granite Mega Plant",
  },
  {
    id: "deccan",
    unitNum: "UNIT 04",
    division: "Pavan Stones World",
    divisionSlug: "pavan-stones-world",
    homeColor: "#722424",
    title: "Prestige Exotic Quartzite & Marble Studio",
    tag: "EXOTIC QUARTZITE & MARBLE",
    tagColor: "#722424",
    tagBg: "rgba(114, 36, 36, 0.1)",
    borderColor: "#722424",
    accentGradient: "linear-gradient(135deg, #450a0a 0%, #722424 100%)",
    location: "Deccan Architectural Zone",
    area: "95,000 Sq Ft Under Roof",
    annualCapacity: "30,000 SQM / Year",
    tolerance: "±0.25 mm Ultra-Precision",
    description:
      "An advanced architectural stone studio engineered for high-value crystalline quartzites, calcitic marbles, and bespoke interior installations. Utilizing computerized 5-axis CNC waterjet cutting, diamond wire saws, and backlit digital bookmatching technology for landmark commercial lobbies, private palaces, and luxury culinary islands.",
    features: [
      "Computerized 5-axis waterjet-CNC bridge cutting centers",
      "Multi-axis diamond wire saws for intricate architectural profiling",
      "Backlit translucent stone testing tables & photo-matching software",
      "Bookmatched digital rendering & slab vein layout studio",
    ],
    machinery: [
      "5-Axis CNC Waterjets",
      "Multi-Axis Wire Saws",
      "Bookmatch Optical Scanners",
      "Precision Edge Miterers",
    ],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    badge: "Exotic Stone Atelier",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    phase: "EXTRACTION",
    title: "Quarry Extraction & Geological Audit",
    tagline: "Selective block extraction from captive mineral reserves",
    description:
      "Deep-crust block extraction inspected with non-destructive ultrasonic diagnostics to verify interior crystalline structural continuity before wire sawing and block squaring.",
    highlight: "100% Crystalline Density Scanning",
    equipment: "Ultrasonic Diagnostic Scanners & Wire Saws",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    color: "#ea580c",
  },
  {
    step: "02",
    phase: "GANGSAW SLICING",
    title: "Diamond Multi-Blade Gangsaw Slicing",
    tagline: "Calibrated jumbo slab conversion at ±0.5mm tolerance",
    description:
      "High-speed Italian diamond gang saws slicing massive 30-ton raw boulders into calibrated jumbo gangsaw slabs, monitored by continuous computerized stroke and laser deflection systems.",
    highlight: "±0.5 mm Diamond Calibration",
    equipment: "Italian Multi-Blade Diamond Gang Saws",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    color: "#d97706",
  },
  {
    step: "03",
    phase: "SURFACE POLISH",
    title: "Resin Vacuum Infusion & Line Polishing",
    tagline: "95° specular mirror sheen & vacuum pore consolidation",
    description:
      "Deep-vacuum epoxy resin consolidation followed by automated 16-head continuous line polishing, delivering crystal-clear optical depth and flawless surface reflections.",
    highlight: "95° Specular Mirror Gloss",
    equipment: "16-Head Line Polishers & Vacuum Chambers",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    color: "#c2410c",
  },
  {
    step: "04",
    phase: "5-AXIS CNC",
    title: "5-Axis CNC & Architectural Profiling",
    tagline: "Bespoke digital cutting and bookmatched mitering",
    description:
      "Computerized 5-axis waterjet-CNC bridge cutting centers execute intricate geometric curves, compound miters, bullnose edges, and digital vein bookmatching with ±0.25mm accuracy.",
    highlight: "±0.25 mm Digital Precision",
    equipment: "Computerized 5-Axis CNC Waterjets",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    color: "#0284c7",
  },
  {
    step: "05",
    phase: "EXPORT CRATING",
    title: "Moisture-Sealed Fumigation & Crating",
    tagline: "Seaworthy international export to 40+ sovereign nations",
    description:
      "100% dry-lay inspection before interleaving with high-density protective foam, plastic vapor barriers, and packaging inside heavy-duty ISPM-15 heat-treated seaworthy timber crates.",
    highlight: "ISPM-15 Export Certified",
    equipment: "Automated Seaworthy Crating Lines",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    color: "#16a34a",
  },
];



const QUALITY_STAGES = [
  {
    id: "stage-1",
    step: "01",
    phase: "GEOLOGICAL AUDIT",
    title: "Quarry Bench & Block Provenance",
    tagline: "Selective extraction from virgin mineral reserves",
    description:
      "Virgin stone beds across our captive quarries are surveyed for crystalline density, natural bed stratification, and mineral uniformity before block extraction. Only structural-grade, micro-fissure-free monoliths enter our processing yards.",
    benchmark: "100% Crystalline Matrix Verified",
    equipment: "Ultrasonic Resonance Diagnostics",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    color: "#ea580c",
  },
  {
    id: "stage-2",
    step: "02",
    phase: "CALIBRATION & SLICING",
    title: "Multi-Blade Diamond Gangsaw Slicing",
    tagline: "Sub-millimeter slab leveling and dimensional accuracy",
    description:
      "High-speed Italian gang saws equipped with 80+ diamond blades slice 30-ton boulders into calibrated jumbo slabs at ±0.5mm precision. Multi-beam laser tracking continuously verifies thickness uniformity across the entire run.",
    benchmark: "±0.5 mm Diamond Calibration",
    equipment: "Italian Diamond Multi-Blade Frames",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    color: "#d97706",
  },
  {
    id: "stage-3",
    step: "03",
    phase: "SURFACE REFINEMENT",
    title: "16-Head Mirror Polish & Texture Profiling",
    tagline: "95° specular mirror luster and authentic rockface cleaves",
    description:
      "Vacuum-chamber epoxy resin infusion seals micro-pores before 16-head continuous line polishers bring out optical depth and 95° specular gloss. For non-slip exterior applications, continuous shot-blasting bays produce certified R11 finishes.",
    benchmark: "95° Specular Reflection / R11 Rating",
    equipment: "16-Head Line Polishers & Vacuum Beds",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    color: "#c2410c",
  },
  {
    id: "stage-4",
    step: "04",
    phase: "DAYLIGHT DRY-LAY & EXPORT",
    title: "Daylight Inspection & Seaworthy Crating",
    tagline: "Vein-matched batch layout and ISPM-15 timber protection",
    description:
      "100% of finished tiles and slabs are dry-laid under 5000K daylight-balanced illumination to confirm vein continuity and tonal consistency. Slabs are interleaved with high-density foam, vapor-sealed, and packaged in ISPM-15 certified crates.",
    benchmark: "ISPM-15 Seaworthy Containerized",
    equipment: "Daylight Dry-Lay Floor & Hardwood Crating",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    color: "#16a34a",
  },
];

const QUALITY_METRICS = [
  {
    id: "compression",
    benefit: "Skyscraper Load Capacity",
    standard: "ASTM C170",
    value: "≥ 210 MPa",
    application: "High-Rise Facades & Multi-Story Columns",
    headline: "Monolithic Structural Strength",
    detail: "Certified load-bearing capacity higher than structural concrete, engineered to anchor multi-ton architectural cladding and monumental civic infrastructure without fracturing.",
    badge: "Structural Grade",
  },
  {
    id: "absorption",
    benefit: "Zero-Stain & Water Proof",
    standard: "ASTM C97",
    value: "≤ 0.08%",
    application: "Kitchen Countertops & Luxury Wet Areas",
    headline: "Zero-Porosity Moisture Shield",
    detail: "Ultra-dense crystalline density preventing sub-surface water ingress, red wine or oil staining, and efflorescence degradation over decades of daily commercial use.",
    badge: "100% Stain Immune",
  },
  {
    id: "flexural",
    benefit: "Seismic & Wind Flex",
    standard: "ASTM C880",
    value: "≥ 22.5 MPa",
    application: "Curtain Walls & High-Traffic Transit Floors",
    headline: "High Tensile Bending Modulus",
    detail: "Elevated tensile elasticity engineered to withstand severe wind deflection on high-rise curtain walls, vehicular traffic impact, and seismic vibrations.",
    badge: "Anti-Deflection",
  },
  {
    id: "hardness",
    benefit: "Extreme Scratch Resistance",
    standard: "EN 101",
    value: "6.5 – 7.5 Mohs",
    application: "Airport Terminals & 5-Star Hotel Foyers",
    headline: "Diamond-Hard Mineral Matrix",
    detail: "Natural quartz and feldspathic matrix harder than structural steel, completely impervious to rolling luggage wheels, high heels, and abrasive foot traffic.",
    badge: "Harder than Steel",
  },
  {
    id: "thermal",
    benefit: "All-Weather Climate Proof",
    standard: "EN 12371",
    value: "-25° to +65°C",
    application: "Alpine Ski Resorts & Desert Pavings",
    headline: "100-Cycle Freeze-Thaw Durability",
    detail: "Certified resilience across 100 continuous extreme sub-zero to scorching desert thermal cycles with zero crystalline flaking or micro-fracturing.",
    badge: "100% Frost Proof",
  },
  {
    id: "polish",
    benefit: "Distortion-Free Sheen",
    standard: "ISO 2813",
    value: "92° – 96° Gloss",
    application: "Presidential Suites & Grand Architectural Foyers",
    headline: "Specular Mirror Polish",
    detail: "Automated 16-head Italian diamond resin polishing delivering crystal-clear optical mirror reflection with zero orange-peel waviness.",
    badge: "Specular Mirror",
  },
];

const ACCREDITATION_DOSSIER = [
  {
    id: "ce",
    sigil: "CE",
    code: "EN 12058 · EN 1341",
    standard: "CE Marking",
    authority: "European Conformity",
    territory: "European Union & UK",
    highlight: "Certified load-bearing flexural strength & non-slip safety for European civic infrastructure.",
    category: "European Building Code",
  },
  {
    id: "astm",
    sigil: "ASTM",
    code: "ASTM C170 · C97 · C880",
    standard: "ASTM International",
    authority: "Dimension Stone C18",
    territory: "North America & Global",
    highlight: "Exceeds standard structural compressive (>190 MPa) and tensile ratings for US commercial towers.",
    category: "American Standard",
  },
  {
    id: "iso",
    sigil: "ISO",
    code: "ISO 9001:2015",
    standard: "Certified QMS",
    authority: "Quality Management",
    territory: "Global Operations",
    highlight: "Full block-to-crate traceability with audited diamond-wire dimensional calibration tolerances.",
    category: "International Standard",
  },
  {
    id: "ispm",
    sigil: "IPPC",
    code: "ISPM-15 HT 56°C",
    standard: "Phytosanitary Timber",
    authority: "Maritime Export",
    territory: "Global Ocean Freight",
    highlight: "Heat-treated hardwood crating with vapor barriers for fast-track customs clearance across all ports.",
    category: "Export Phytosanitary",
  },
  {
    id: "leed",
    sigil: "LEED",
    code: "LEED v4.1 & IGBC",
    standard: "Green Building",
    authority: "USGBC & IGBC Certified",
    territory: "Sustainable Projects",
    highlight: "Zero-VOC 100% natural geological stone qualifying for LEED MR and EQ green building credits.",
    category: "Eco Architecture",
  },
];

interface StoneMonolithItem {
  num: string;
  roman: string;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  specimen: string;
  category: string;
  finish: string;
  density: string;
  geology: string;
  accentColor: string;
  accentBg: string;
  bgGradient: string;
  textColor: string;
  mutedColor: string;
  sheenColor: string;
  borderActive: string;
  glowColor: string;
}

const STONE_MONOLITHS: StoneMonolithItem[] = [
  {
    num: "01",
    roman: "I",
    icon: Lightbulb,
    title: "Innovation",
    subtitle: "is a State of Mind",
    description: "Pioneering diamond-wire cutting and computerized calibration to transform raw geological stone into flawless architectural elements.",
    specimen: "Luminescent Quartzite",
    category: "Natural Quartzite",
    finish: "Polished Crystalline Surface",
    density: "2,650 kg/m³",
    geology: "92% Crystalline Silica Matrix",
    accentColor: "#fb923c",
    accentBg: "rgba(251, 146, 60, 0.15)",
    bgGradient: "linear-gradient(160deg, #1c1917 0%, #0c0a09 50%, #151210 100%)",
    textColor: "#ffffff",
    mutedColor: "#a8a29e",
    sheenColor: "rgba(255, 255, 255, 0.45)",
    borderActive: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.2)",
  },
  {
    num: "02",
    roman: "II",
    icon: ShieldCheck,
    title: "Quality",
    subtitle: "Begets Excellence",
    description: "Multi-stage dimensional verification and optical surface inspections enforcing zero-defect tolerances on every slab.",
    specimen: "Absolute Black Granite",
    category: "Plutonic Granite",
    finish: "Diamond Wire Mirror Polish",
    density: "2,980 kg/m³",
    geology: "Deep-Crust Igneous Pluton",
    accentColor: "#f59e0b",
    accentBg: "rgba(245, 158, 11, 0.15)",
    bgGradient: "linear-gradient(160deg, #18191d 0%, #0a0b0d 50%, #131418 100%)",
    textColor: "#ffffff",
    mutedColor: "#94a3b8",
    sheenColor: "rgba(255, 255, 255, 0.45)",
    borderActive: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.2)",
  },
  {
    num: "03",
    roman: "III",
    icon: Heart,
    title: "Integrity",
    subtitle: "Makes Us Who We Are",
    description: "Absolute transparency from quarry source to project handover, built upon four decades of uncompromised trust.",
    specimen: "Himalayan Foliated Slate",
    category: "Metamorphic Slate",
    finish: "Natural Cleft Split-Face",
    density: "2,750 kg/m³",
    geology: "Stratified Bedrock Escarpment",
    accentColor: "#d4a373",
    accentBg: "rgba(212, 163, 115, 0.15)",
    bgGradient: "linear-gradient(160deg, #1e242c 0%, #0f1217 50%, #191e25 100%)",
    textColor: "#f8fafc",
    mutedColor: "#cbd5e1",
    sheenColor: "rgba(255, 255, 255, 0.4)",
    borderActive: "#d4a373",
    glowColor: "rgba(212, 163, 115, 0.2)",
  },
  {
    num: "04",
    roman: "IV",
    icon: Globe,
    title: "A Global Outlook",
    subtitle: "Breaks All Boundaries",
    description: "Seamless multimodal ocean freight connecting Indian natural reserves directly to landmark projects across 40+ countries.",
    specimen: "Verde Imperial Granite",
    category: "Exotic Serpentinite",
    finish: "Water-Jet Calibrated Surface",
    density: "2,890 kg/m³",
    geology: "High-Pressure Metasediment",
    accentColor: "#34d399",
    accentBg: "rgba(52, 211, 153, 0.15)",
    bgGradient: "linear-gradient(160deg, #12251d 0%, #081611 50%, #0f2019 100%)",
    textColor: "#f0fdf4",
    mutedColor: "#a7f3d0",
    sheenColor: "rgba(52, 211, 153, 0.4)",
    borderActive: "#34d399",
    glowColor: "rgba(52, 211, 153, 0.2)",
  },
  {
    num: "05",
    roman: "V",
    icon: Users,
    title: "Teamwork",
    subtitle: "Can Build Empires",
    description: "Quarry masters, precision stonecutters, and structural engineers working together in synchronized harmony.",
    specimen: "Teakwood Sandstone",
    category: "Sedimentary Sandstone",
    finish: "Gang-Saw Cut & Fine Honed",
    density: "2,550 kg/m³",
    geology: "Layered Desert Quartz Matrix",
    accentColor: "#f97316",
    accentBg: "rgba(249, 115, 22, 0.15)",
    bgGradient: "linear-gradient(160deg, #241c16 0%, #130d09 50%, #1c1510 100%)",
    textColor: "#fdf8f6",
    mutedColor: "#d6c7b9",
    sheenColor: "rgba(255, 255, 255, 0.4)",
    borderActive: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.18)",
  },
  {
    num: "06",
    roman: "VI",
    icon: Cpu,
    title: "Systematic",
    subtitle: "Thinking & Precision",
    description: "Audited operating protocols governing extraction, calibration, moisture curing, and sea-worthy crating.",
    specimen: "Kota Blue Limestone",
    category: "Dense Calcarenite",
    finish: "CNC Calibrated Zero-Tolerance",
    density: "2,680 kg/m³",
    geology: "Dense Microcrystalline Matrix",
    accentColor: "#38bdf8",
    accentBg: "rgba(56, 189, 248, 0.15)",
    bgGradient: "linear-gradient(160deg, #14202e 0%, #091018 50%, #101a26 100%)",
    textColor: "#ffffff",
    mutedColor: "#94a3b8",
    sheenColor: "rgba(56, 189, 248, 0.35)",
    borderActive: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.2)",
  },
  {
    num: "07",
    roman: "VII",
    icon: UserCheck,
    title: "Service",
    subtitle: "Mindset Always",
    description: "Dedicated project stewardship from initial specimen curation to port delivery and on-site architectural execution.",
    specimen: "Sunset Porphyry",
    category: "Pavan Signature Igneous",
    finish: "Thermal Flamed & Antiqued",
    density: "2,820 kg/m³",
    geology: "Porphyritic Quartz Feldspar",
    accentColor: "#fda4af",
    accentBg: "rgba(253, 164, 175, 0.18)",
    bgGradient: "linear-gradient(160deg, #2d1419 0%, #16070a 50%, #230f13 100%)",
    textColor: "#ffffff",
    mutedColor: "#fbcfe8",
    sheenColor: "rgba(255, 255, 255, 0.45)",
    borderActive: "#fda4af",
    glowColor: "rgba(253, 164, 175, 0.2)",
  },
];

// Alias for backward compatibility
const CORE_VALUES = STONE_MONOLITHS;

interface LeadershipMember {
  name: string;
  role: string;
  bio: string;
  contact: string;
  phoneRaw: string;
  whatsapp: string;
  initials: string;
  image: string;
}

const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    name: "Mr. Perla Chalama Rao",
    role: "Chairman",
    bio: "Leading the organization with extensive industry experience and a long-term vision for growth, quality, and customer trust.",
    contact: "+91 92464 62600",
    phoneRaw: "+919246462600",
    whatsapp: "https://wa.me/919246462600",
    initials: "PCR",
    image: "",
  },
  {
    name: "Mr. Perla V. S. Ratnam",
    role: "Managing Director (MD)",
    bio: "Responsible for strategic business development, operations, and the overall growth and direction of the organization.",
    contact: "+91 92464 62500",
    phoneRaw: "+919246462500",
    whatsapp: "https://wa.me/919246462500",
    initials: "PVR",
    image: "",
  },
  {
    name: "Mr. Perla Nageswara Rao",
    role: "Marketing Manager",
    bio: "Focused on customer relationships, marketing activities, business development, and expanding our market presence.",
    contact: "+91 90106 26349",
    phoneRaw: "+919010626349",
    whatsapp: "https://wa.me/919010626349",
    initials: "PNR",
    image: "",
  },
  {
    name: "Mr. Perla Sai Mahesh",
    role: "Marketing Manager | Business Development",
    bio: "Responsible for domestic and international customer enquiries, business development, client coordination, and expanding the company’s global natural stone network.",
    contact: "+91 90638 17054",
    phoneRaw: "+919063817054",
    whatsapp: "https://wa.me/919063817054",
    initials: "PSM",
    image: "",
  },
];

const FOUNDER_INFO = {
  name: "Pavan",
  role: "Founder",
  title: "Founder & Visionary",
  initials: "P",
  image: "",
  bio: "Founded Pavan Stones Group on the conviction of direct captive quarry provenance, precision diamond calibration, and architectural stone quality—exporting India's finest natural slates, limestones, and granites across 40+ countries.",
  highlights: [
    { label: "Role", value: "Founder & Visionary" },
    { label: "Philosophy", value: "Direct Quarry Reserves" },
    { label: "Global Reach", value: "40+ Sovereign Nations" },
  ],
};

export default function AboutPage() {
  const router = useRouter();
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [activeFacilityIdx, setActiveFacilityIdx] = useState(0);
  const [activeQualityStageIdx, setActiveQualityStageIdx] = useState(0);
  const [activeProcessStepIdx, setActiveProcessStepIdx] = useState(0);

  const handleContactClick = () => {
    router.push("/#contact");
  };

  const activeFacility = MANUFACTURING_FACILITIES[activeFacilityIdx];
  const activeQualityStage = QUALITY_STAGES[activeQualityStageIdx];
  const activeProcessStep = PROCESS_STEPS[activeProcessStepIdx];

  return (
    <div className="bg-white text-[#140d0a] overflow-hidden min-h-screen">
      {/* ── 16:9 ASPECT RATIO ARCHITECTURAL HERO PHOTO ── */}
      <section className="relative w-full aspect-video max-h-[70vh] overflow-hidden bg-[#140d0a]">
        {/* Default Full-Bleed Architectural Living Space Background Photo (16:9 Ratio) */}
        <img
          src="/about-hero.jpg"
          alt="Pavan Stones Group Luxury Architectural Stone Living Space"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
            isHeroHovered ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto"
          }`}
        />

        {/* Alternate Background Photo (Revealed when hovering About Pavan Stones Group) */}
        <img
          src="https://images.unsplash.com/photo-160058515526-990dced4db0d?auto=format&fit=crop&w=2000&q=85"
          alt="Pavan Stones Group Architectural Stone Quarry Operations"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
            isHeroHovered ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
          }`}
        />

        {/* Extremely Subtle Overlay (letting the original image shine 80%+) */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-10" />
      </section>

      {/* ── ABOUT PAVAN STONES GROUP EDITORIAL CARD (POSITIONED AT CENTER BOTTOM OF HERO IMAGE) ── */}
      <div id="company" className="relative max-w-5xl mx-auto px-4 sm:px-6 -mt-24 sm:-mt-32 md:-mt-40 z-30 mb-12 sm:mb-16 scroll-mt-28">
        <div
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
          className="bg-white border border-[#747474]/20 p-8 sm:p-12 md:p-14 text-center shadow-2xl rounded-sm transition-all duration-500 hover:border-[#c85a32]/40 group"
        >
          
          {/* Main Grand Title with Sketch Mark directly under PAVAN STONES GROUP */}
          <h1
            onMouseEnter={() => setIsHeroHovered(true)}
            className="font-display font-light text-[#241919] leading-[1.1] tracking-[-0.015em] mb-4 cursor-pointer transition-colors duration-300 group-hover:text-[#181111]"
            style={{ fontSize: "clamp(34px, 4.5vw, 64px)" }}
          >
            About{" "}
            <span className="relative inline-block font-normal">
              PAVAN STONES GROUP
              <svg
                viewBox="0 0 280 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full text-[#ff5500] overflow-visible pointer-events-none transition-transform duration-500 group-hover:scale-x-[1.02]"
                style={{ color: "#ff5500", stroke: "#ff5500" }}
              >
                <path
                  d="M 3 7.5 C 52 3.8, 112 9.2, 172 5.5 C 212 3, 248 6.8, 277 4.2"
                  stroke="#ff5500"
                  style={{ stroke: "#ff5500" }}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h1>

          {/* Border Divider Line */}
          <div className="w-full h-[1px] bg-[#747474]/15 max-w-3xl mx-auto my-6 sm:my-8 transition-colors duration-500 group-hover:bg-[#c85a32]/30" />

          {/* Lead Narrative Sentence */}
          <p className="text-[14.5px] sm:text-[16px] md:text-[17px] leading-[1.8] text-[#333333] font-light max-w-4xl mx-auto text-center sm:text-justify">
            <strong className="font-semibold text-[#241919]">Paving the way to the future of natural stone, PAVAN STONES GROUP is a premier natural stone conglomerate in India.</strong> Established since 2000, the company has made its mark both locally and globally for its unique quarry-extracted natural stone products that amalgamate the finest raw material, gangsaw technology, industrial expertise, and master craftsmanship to create natural slates, limestones, and granites that are of the highest architectural quality and authenticity.
          </p>

        </div>
      </div>

      {/* ── WHAT WE GOT: CLEAN EDITORIAL COUNTER METRICS SECTION (COMPACT LOW HEIGHT LAYOUT) ── */}
      <section className="relative py-8 sm:py-12 md:py-14 px-6 md:px-14 lg:px-20 bg-white text-[#140d0a] overflow-hidden z-20">

        <div className="max-w-6xl mx-auto relative z-10 space-y-6 sm:space-y-8">
          
          {/* Main Headline (Compact Sans-Serif Clean Editorial Typography) */}
          <h2 className="font-sans font-medium text-[#140d0a] text-xl sm:text-2xl md:text-3xl lg:text-[34px] leading-[1.25] tracking-tight max-w-4xl mx-auto text-center">
            More Than Products — We Quarry, Translate Complex Requirements, And Help You Choose With Confidence.
          </h2>

          {/* 3 Count Up Metrics Grid (Compact Floating Numbers, Low Height) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-4xl mx-auto text-center">
            
            {/* Metric 1 */}
            <div className="space-y-1">
              <div className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a] tracking-tight flex items-baseline justify-center">
                <AnimatedCounter target={26} />
                <span className="text-2xl sm:text-3xl font-light text-[#0f172a] ml-0.5">+</span>
              </div>
              <p className="text-[11px] sm:text-xs font-sans text-[#555555] font-normal leading-relaxed max-w-[190px] mx-auto">
                Years of Combined Expertise in Quarrying &amp; Stone Processing
              </p>
            </div>

            {/* Metric 2 */}
            <div className="space-y-1">
              <div className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a] tracking-tight flex items-baseline justify-center">
                <AnimatedCounter target={40} />
                <span className="text-2xl sm:text-3xl font-light text-[#0f172a] ml-0.5">+</span>
              </div>
              <p className="text-[11px] sm:text-xs font-sans text-[#555555] font-normal leading-relaxed max-w-[200px] mx-auto">
                Thousand Corporate &amp; Architectural Clients Worldwide
              </p>
            </div>

            {/* Metric 3 */}
            <div className="space-y-1">
              <div className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a] tracking-tight flex items-baseline justify-center">
                <AnimatedCounter target={500} />
                <span className="text-2xl sm:text-3xl font-light text-[#140d0a] ml-0.5">k+</span>
              </div>
              <p className="text-[11px] sm:text-xs font-sans text-[#555555] font-normal leading-relaxed max-w-[200px] mx-auto">
                Slab &amp; Dimensional Stone Portfolios Under Management
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── STATE-OF-THE-ART MANUFACTURING FACILITIES SECTION (INTERACTIVE ARCHITECTURAL COMMAND CONSOLE) ── */}
      <section
        id="manufacturing-facilities"
        className="py-16 sm:py-20 px-4 sm:px-6 md:px-14 lg:px-20 bg-white border-t border-[#747474]/15 relative z-20 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto space-y-10 lg:space-y-12">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#9a3412] font-semibold block">
              Industrial Infrastructure &amp; Processing Hubs
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-[#241919] leading-[1.08] tracking-tight">
              Four Specialized <span className="font-normal text-[#9a3412]">Manufacturing</span> Divisions
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed max-w-2xl mx-auto">
              Operating 9 specialized fabrication plants and jumbo gangsaw yards spanning 150,000+ SQM annual capacity across South India&apos;s most mineral-rich geological reserves.
            </p>
          </div>

          {/* ── 4-HUB QUICK SWITCHER STRIP (SELECTED: ORANGE TEXT, UNSELECTED: ORANGE BORDER ON HOVER) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {MANUFACTURING_FACILITIES.map((facility, idx) => {
              const isActive = activeFacilityIdx === idx;
              return (
                <button
                  key={facility.id}
                  onClick={() => setActiveFacilityIdx(idx)}
                  className={`flex items-center justify-center text-center p-4 sm:p-5 rounded-[4px] border bg-white transition-all duration-300 relative overflow-hidden group cursor-pointer min-h-[60px] sm:min-h-[68px] ${
                    isActive ? "shadow-sm" : ""
                  }`}
                  style={{
                    borderColor: facility.homeColor,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "#ff5500";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = facility.homeColor;
                    }
                  }}
                >
                  <h3
                    className="font-sans font-bold text-sm sm:text-base md:text-lg leading-snug transition-colors duration-200"
                    style={{
                      color: isActive ? "#ff5500" : facility.homeColor,
                    }}
                  >
                    {facility.division}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* ── CINEMATIC ACTIVE DIVISION SHOWCASE STAGE (DYNAMIC SIGNATURE PALETTE) ── */}
          <div className="rounded-2xl border border-[#747474]/15 bg-white p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFacility.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Visual Column (7 cols) */}
                <div className="lg:col-span-7 relative">
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#747474]/15 shadow-sm group">
                    <img
                      src={activeFacility.image}
                      alt={activeFacility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                {/* Narrative & Specification Column (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#747474] font-semibold">
                        {activeFacility.tag}
                      </span>
                    </div>

                    <h3 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-[#241919] leading-tight">
                      {activeFacility.division}
                    </h3>
                    <p style={{ color: activeFacility.homeColor }} className="text-xs sm:text-sm font-medium">
                      {activeFacility.title}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
                    {activeFacility.description}
                  </p>

                  {/* 4 Precision Spec Tiles */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-2.5 rounded-[4px] bg-[#747474]/[0.04] border border-[#747474]/15">
                      <span className="text-[9px] font-mono uppercase text-[#747474] block">Capacity</span>
                      <span className="text-xs font-mono font-bold text-[#241919] block mt-0.5">
                        {activeFacility.annualCapacity.split(" / ")[0]}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-[4px] bg-[#747474]/[0.04] border border-[#747474]/15">
                      <span className="text-[9px] font-mono uppercase text-[#747474] block">Covered Yard</span>
                      <span className="text-xs font-mono font-bold text-[#241919] block mt-0.5 truncate">
                        {activeFacility.area.split(" ")[0]} Sq Ft
                      </span>
                    </div>
                    <div className="p-2.5 rounded-[4px] bg-[#747474]/[0.04] border border-[#747474]/15">
                      <span className="text-[9px] font-mono uppercase text-[#747474] block">Tolerance</span>
                      <span className="text-xs font-mono font-bold text-[#241919] block mt-0.5">
                        {activeFacility.tolerance.split(" ")[0]}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-[4px] bg-[#747474]/[0.04] border border-[#747474]/15">
                      <span className="text-[9px] font-mono uppercase text-[#747474] block">Logistics</span>
                      <span className="text-xs font-mono font-bold text-[#241919] block mt-0.5">
                        ISPM-15 Crates
                      </span>
                    </div>
                  </div>

                  {/* Deployed Machinery Asset Chips */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-semibold block">
                      Heavy Machinery Assets
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeFacility.machinery.map((machine) => (
                        <span
                          key={machine}
                          className="text-[10.5px] font-mono px-2 py-0.5 rounded-[4px] bg-[#747474]/8 text-[#241919] border border-[#747474]/10"
                        >
                          ⚙ {machine}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Division Portal Actions */}
                  <div className="pt-3 border-t border-[#747474]/15 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/companies/${activeFacility.divisionSlug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] text-white text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] shadow-sm cursor-pointer group"
                      style={{ backgroundColor: activeFacility.homeColor }}
                    >
                      <span>Explore {activeFacility.division}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:text-white transition-colors" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] bg-white text-[#241919] text-xs font-mono uppercase tracking-wider font-bold border border-[#747474]/20 transition-all duration-300"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = activeFacility.homeColor;
                        e.currentTarget.style.color = activeFacility.homeColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(116, 116, 116, 0.2)";
                        e.currentTarget.style.color = "#241919";
                      }}
                    >
                      <span>Schedule Plant Visit</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stage Bottom Navigation Strip */}
            <div className="mt-6 pt-5 border-t border-[#747474]/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#241919]">
                  0{activeFacilityIdx + 1}
                </span>
                <span className="text-xs font-mono text-[#747474]">/ 04 Specialized Hubs</span>
              </div>

              {/* Progress Dots */}
              <div className="hidden sm:flex items-center gap-2">
                {MANUFACTURING_FACILITIES.map((facility, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveFacilityIdx(dotIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeFacilityIdx === dotIdx
                        ? "w-8"
                        : "w-2 bg-[#747474]/25 hover:bg-[#747474]/60"
                    }`}
                    style={{
                      backgroundColor: activeFacilityIdx === dotIdx ? facility.homeColor : undefined,
                    }}
                    aria-label={`Switch to facility 0${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveFacilityIdx((prev) => (prev - 1 + MANUFACTURING_FACILITIES.length) % MANUFACTURING_FACILITIES.length)
                  }
                  className="w-8 h-8 rounded-[4px] border border-[#747474]/20 text-[#241919] flex items-center justify-center transition-colors cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = activeFacility.homeColor;
                    e.currentTarget.style.color = activeFacility.homeColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(116, 116, 116, 0.2)";
                    e.currentTarget.style.color = "#241919";
                  }}
                  aria-label="Previous facility"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveFacilityIdx((prev) => (prev + 1) % MANUFACTURING_FACILITIES.length)
                  }
                  className="w-8 h-8 rounded-[4px] border border-[#747474]/20 text-[#241919] flex items-center justify-center transition-colors cursor-pointer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = activeFacility.homeColor;
                    e.currentTarget.style.color = activeFacility.homeColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(116, 116, 116, 0.2)";
                    e.currentTarget.style.color = "#241919";
                  }}
                  aria-label="Next facility"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── 5-STAGE PRECISION MANUFACTURING WORKFLOW (EDITORIAL MASTERCRAFT SHOWCASE) ── */}
          <div className="space-y-10 pt-8 border-t border-[#747474]/15">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#ff5500] font-semibold block">
                The Craft of Natural Stone
              </span>
              <h3 className="font-display font-light text-2xl sm:text-3xl md:text-4xl text-[#241919]">
                Precision Manufacturing Lifecycle
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed max-w-2xl mx-auto">
                From selective quarry bench extraction to multi-blade diamond slicing, mirror polishing, 5-axis CNC profiling, and international seaworthy export.
              </p>
            </div>

            {/* 5-Phase Horizontal Architectural Timeline Ribbon (Single Horizontal Line, Equal Spacing & Ends) */}
            <div className="w-full max-w-5xl mx-auto border-b border-[#747474]/20 pb-4">
              <div className="grid grid-cols-5 w-full items-center text-center">
                {PROCESS_STEPS.map((step, idx) => {
                  const isActive = activeProcessStepIdx === idx;
                  return (
                    <button
                      key={step.step}
                      onClick={() => setActiveProcessStepIdx(idx)}
                      className={`group relative pb-2 text-xs sm:text-sm font-sans transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 cursor-pointer select-none ${
                        isActive
                          ? "font-bold"
                          : "text-[#555555] hover:text-[#ff5500] font-medium"
                      }`}
                      style={{
                        color: isActive ? step.color : undefined,
                      }}
                    >
                      <span
                        className="font-mono text-[11px] sm:text-xs font-bold transition-colors duration-200 group-hover:text-[#ff5500]"
                        style={{ color: isActive ? step.color : "#888888" }}
                      >
                        {step.step}
                      </span>
                      <span className="tracking-tight uppercase text-[10.5px] sm:text-xs transition-colors duration-200 group-hover:text-[#ff5500]">
                        {step.phase}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeProcessUnderline"
                          className="absolute bottom-0 left-2 right-2 sm:left-4 sm:right-4 h-[2px]"
                          style={{ backgroundColor: step.color }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Editorial Showcase Viewport: Large Photography & Refined Story */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProcessStep.step}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border border-[#747474]/15 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left: High-Resolution Visual with Live Spec Badges (7 cols) */}
                <div className="lg:col-span-7 relative">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full rounded-2xl overflow-hidden border border-[#747474]/15 shadow-md group">
                    <img
                      src={activeProcessStep.image}
                      alt={activeProcessStep.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    {/* Top Corner Phase Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/40 text-xs font-mono font-bold text-[#241919] shadow-sm">
                      PHASE 0{activeProcessStep.step}
                    </div>

                    {/* Bottom Technical Spec Pill */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/40 text-[#241919] shadow-lg text-xs">
                      <span className="font-semibold truncate max-w-[200px] sm:max-w-none">
                        ⚙ {activeProcessStep.equipment}
                      </span>
                      <span className="font-mono font-bold" style={{ color: activeProcessStep.color }}>
                        {activeProcessStep.highlight}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Editorial Narrative & Specifications (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <span
                      className="text-xs font-mono uppercase tracking-[0.22em] font-bold block"
                      style={{ color: activeProcessStep.color }}
                    >
                      STAGE 0{activeProcessStep.step} · {activeProcessStep.phase}
                    </span>
                    <h3 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-[#241919] leading-tight">
                      {activeProcessStep.title}
                    </h3>
                    <p className="text-sm font-medium text-[#454545] pt-1">
                      {activeProcessStep.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
                    {activeProcessStep.description}
                  </p>

                  {/* 2 Clean Benchmark Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-[#747474]/5 border border-[#747474]/15 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#747474] tracking-wider block">
                        Precision Standard
                      </span>
                      <span className="text-xs font-bold font-mono text-[#241919] block">
                        {activeProcessStep.highlight}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#747474]/5 border border-[#747474]/15 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-[#747474] tracking-wider block">
                        Technology Asset
                      </span>
                      <span
                        className="text-xs font-bold font-mono truncate block"
                        style={{ color: activeProcessStep.color }}
                      >
                        {activeProcessStep.equipment.split(" & ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Phase Step Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-4 border-t border-[#747474]/15 text-xs font-mono">
                    <button
                      onClick={() =>
                        setActiveProcessStepIdx(
                          (prev) => (prev - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length
                        )
                      }
                      className="inline-flex items-center gap-2 text-[#555555] hover:text-[#241919] font-bold cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Phase</span>
                    </button>

                    <button
                      onClick={() =>
                        setActiveProcessStepIdx(
                          (prev) => (prev + 1) % PROCESS_STEPS.length
                        )
                      }
                      className="inline-flex items-center gap-2 font-bold cursor-pointer transition-colors"
                      style={{ color: activeProcessStep.color }}
                    >
                      <span>Next Phase</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ── OUR LEADERSHIP TEAM / LEADERSHIP & MANAGEMENT SECTION ── */}
      <section
        id="team"
        className="py-20 sm:py-28 px-4 sm:px-6 md:px-14 lg:px-20 bg-white border-t border-b border-[#747474]/15 relative z-20 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#241919] leading-[1.1] tracking-tight">
              Leadership &amp; Management
            </h2>

            <p className="text-sm sm:text-[15.5px] text-[#555555] font-light leading-relaxed max-w-2xl mx-auto">
              Our leadership team brings together extensive experience in the natural stone industry, international business, sourcing, processing, and customer relationships. With a strong focus on quality and reliability, we are committed to delivering premium natural stone solutions to customers worldwide.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="h-px w-12 bg-[#747474]/20" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#ff5500]" />
              <div className="h-px w-12 bg-[#747474]/20" />
            </div>
          </div>

          {/* ── FEATURED FOUNDER SECTION: 3 EQUAL COLUMNS (IMAGE, WHITE SPACE, TEXT) ── */}
          <div className="w-full">
            <div className="group grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch sm:h-[320px]">
              {/* Card 1 (1/3 Width): Executive Monogram Placeholder on the left */}
              <div className="h-[280px] sm:h-full w-full relative rounded-2xl overflow-hidden bg-white border border-[#747474]/15 shadow-xs flex flex-col items-center justify-center p-6 text-center group-hover:border-[#ff5500]/30 transition-all duration-300">
                {FOUNDER_INFO.image ? (
                  <img
                    src={FOUNDER_INFO.image}
                    alt={`${FOUNDER_INFO.name} - Founder`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white border border-[#747474]/20 shadow-sm flex flex-col items-center justify-center group-hover:scale-105 group-hover:border-[#ff5500] transition-all duration-300">
                    <span className="font-display font-medium text-3xl sm:text-4xl text-[#241919] tracking-widest group-hover:text-[#ff5500] transition-colors">
                      {FOUNDER_INFO.initials}
                    </span>
                    <span className="text-[8.5px] font-mono uppercase tracking-[0.28em] text-[#ff5500] font-bold -mt-0.5">
                      PAVAN
                    </span>
                  </div>
                )}
              </div>

              {/* Card 2 (1/3 Width): LOGO Placeholder in the middle */}
              <div className="flex items-center justify-center p-6 select-none">
                <span className="font-display font-medium text-3xl sm:text-4xl text-[#747474]/35 tracking-[0.3em] uppercase">
                  LOGO
                </span>
              </div>

              {/* Card 3 (1/3 Width): Text on the right */}
              <div className="w-full flex flex-col justify-between py-1 space-y-3">
                <div className="space-y-2">
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#747474] block">
                    Pavan Stones Group
                  </span>

                  <div>
                    <h3 className="font-display font-medium text-2xl sm:text-3xl text-[#241919] tracking-tight leading-tight group-hover:text-[#ff5500] transition-colors">
                      Pavan
                    </h3>
                    <div className="w-10 h-0.5 bg-[#ff5500] mt-1.5 group-hover:w-16 transition-all duration-300" />
                  </div>

                  <p className="text-[12.5px] sm:text-[13px] leading-[1.65] text-[#555555] font-light pt-1">
                    {FOUNDER_INFO.bio}
                  </p>
                </div>

                {/* Highlights Strip (3 Cards) */}
                <div className="pt-3 border-t border-[#747474]/15 grid grid-cols-3 gap-2 text-left">
                  {FOUNDER_INFO.highlights.map((item) => (
                    <div key={item.label} className="bg-white rounded-lg p-2 border border-[#747474]/15 shadow-2xs">
                      <span className="block text-[7.5px] font-mono uppercase tracking-wider text-[#747474]">
                        {item.label}
                      </span>
                      <span className="text-[11px] font-semibold text-[#241919] truncate block mt-0.5">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section Divider & Subheading for Executive Board */}
          <div className="text-center pt-2 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] font-semibold text-[#747474] block">
              Executive Board &amp; Management Operations
            </span>
            <div className="h-px w-16 bg-[#747474]/20 mx-auto" />
          </div>

          {/* Leadership Cards Grid (Single Section: 4 Square Cards Row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 max-w-7xl mx-auto">
            {LEADERSHIP_TEAM.map((member) => (
              <div
                key={member.name}
                className="group relative bg-white border border-[#747474]/15 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-2xl hover:border-[#ff5500]/50 transition-all duration-400 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* 1:1 PERFECT SQUARE PHOTO / ALT IMAGE CONTAINER */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-[#747474]/15 shadow-xs mb-4 flex flex-col items-center justify-center p-6 text-center group-hover:border-[#ff5500]/30 transition-all duration-300">
                    {member.image ? (
                      <>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                      </>
                    ) : (
                      <>
                        {/* Executive Monogram Circle with Initials */}
                        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border border-[#747474]/20 shadow-sm flex flex-col items-center justify-center group-hover:scale-105 group-hover:border-[#ff5500] transition-all duration-300">
                          <span className="font-display font-medium text-2xl sm:text-3xl text-[#241919] tracking-widest group-hover:text-[#ff5500] transition-colors">
                            {member.initials}
                          </span>
                          <span className="text-[8px] font-mono uppercase tracking-[0.28em] text-[#ff5500] font-bold -mt-0.5">
                            PAVAN
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Member Meta Info */}
                  <div className="space-y-2">
                    <div className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#ff5500] font-semibold">
                      {member.role}
                    </div>

                    <h3 className="font-display font-medium text-lg sm:text-[21px] text-[#241919] leading-snug group-hover:text-[#ff5500] transition-colors">
                      {member.name}
                    </h3>

                    <div className="w-8 h-0.5 bg-[#ff5500]/30 mt-1.5 mb-2.5 group-hover:w-14 group-hover:bg-[#ff5500] transition-all duration-300" />

                    {/* Narrative Bio */}
                    <p className="text-[12px] sm:text-[12.5px] text-[#555555] font-light leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Footer Direct Contact Actions */}
                <div className="mt-5 pt-3.5 border-t border-[#747474]/15 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${member.phoneRaw}`}
                    className="inline-flex items-center gap-2 group/call py-1 min-w-0"
                    title={`Call ${member.name}`}
                  >
                    <div className="w-7 h-7 rounded-[4px] bg-white border border-[#747474]/20 group-hover/call:border-[#ff5500] flex items-center justify-center text-[#241919] group-hover/call:text-[#ff5500] transition-colors flex-none">
                      <Phone className="w-3 h-3" />
                    </div>
                    <span className="font-mono text-[11.5px] font-bold text-[#241919] group-hover/call:text-[#ff5500] transition-colors truncate">
                      {member.contact}
                    </span>
                  </a>

                  <a
                    href={member.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] bg-white hover:bg-[#25D366]/10 border border-[#747474]/20 hover:border-[#25D366] text-[#241919] hover:text-[#25D366] text-[10.5px] font-mono font-semibold transition-all shadow-2xs flex-none"
                    title={`Chat on WhatsApp with ${member.name}`}
                  >
                    <MessageSquare className="w-3 h-3 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust & Inquiry Callout */}
          <div className="mt-12 bg-white border border-[#747474]/20 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <h4 className="font-display font-medium text-xl text-[#241919]">
                Have a Commercial Project or Custom Sourcing Inquiry?
              </h4>
              <p className="text-xs sm:text-sm text-[#555555] font-light">
                Our leadership team provides direct advisory for global architects, distributors, and bulk container procurement.
              </p>
            </div>
            <button
              onClick={handleContactClick}
              className="flex-none px-6 py-3 bg-[#140d0a] hover:bg-[#ff5500] text-white text-[10.5px] font-mono uppercase tracking-[0.2em] font-medium rounded-lg transition-colors cursor-pointer"
            >
              Connect With Leadership
            </button>
          </div>

        </div>
      </section>

      {/* ── QUALITY & ARCHITECTURAL STANDARDS SECTION (100% NON-CARD SEAMLESS MASTER-EXPERIENCE) ── */}
      <section
        id="quality"
        className="py-20 sm:py-28 px-4 sm:px-6 md:px-14 lg:px-20 bg-white border-t border-[#747474]/15 relative z-20 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#ff5500] font-semibold block">
              Uncompromised Architectural Standards
            </span>
            
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#241919] leading-[1.08] tracking-tight">
              Precision Quality &amp; <span className="font-normal text-[#ff5500]">Mastercraft</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed max-w-2xl mx-auto">
              From captive quarry extraction and Italian gangsaw calibration to 16-head line polishing, 5000K daylight dry-laying, and seaworthy containerization, our multi-stage quality assurance protocol guarantees flawless natural stone engineered for prestigious international landmarks across 40+ countries.
            </p>
          </div>

          {/* ── 4-STAGE PRECISION QUALITY PROTOCOL (SEAMLESS MASTER DOSSIER TABLE) ── */}
          <div className="divide-y divide-[#747474]/15 border-t border-b border-[#747474]/15">
            {QUALITY_STAGES.map((stage) => (
              <div
                key={stage.id}
                className="py-10 sm:py-12 lg:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center group hover:bg-[#747474]/[0.015] transition-colors px-2 sm:px-4"
              >
                {/* Col 1: Step Number & Phase Code (2 cols) */}
                <div className="md:col-span-3 lg:col-span-2 space-y-1.5">
                  <span className="font-display font-light text-5xl sm:text-6xl text-[#241919] group-hover:text-[#ff5500] transition-colors block leading-none">
                    {stage.step}
                  </span>
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#ff5500] block pt-1">
                    {stage.phase}
                  </span>
                  <span className="text-[10px] font-mono text-[#747474] block">
                    Phase Protocol
                  </span>
                </div>

                {/* Col 2: High-Resolution Photo (4 cols) */}
                <div className="md:col-span-4 lg:col-span-4 relative">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#747474]/15 shadow-xs group-hover:border-[#ff5500]/50 transition-colors">
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="text-[10px] font-mono font-semibold text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 block truncate">
                        ⚙ {stage.equipment}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Col 3: Narrative & Engineering Narrative (4 cols) */}
                <div className="md:col-span-5 lg:col-span-4 space-y-2">
                  <h3 className="font-display font-medium text-xl sm:text-2xl text-[#241919] group-hover:text-[#ff5500] transition-colors leading-tight">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#c2410c]">
                    {stage.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed pt-1">
                    {stage.description}
                  </p>
                </div>

                {/* Col 4: Verified Benchmark (2 cols) */}
                <div className="md:col-span-12 lg:col-span-2 space-y-2 p-3.5 rounded-xl bg-[#747474]/[0.03] border border-[#747474]/10">
                  <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#747474] block">
                    Verified Benchmark
                  </span>
                  <span className="text-xs font-mono font-bold text-[#241919] group-hover:text-[#ff5500] transition-colors block leading-snug">
                    {stage.benchmark}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── REAL-WORLD ARCHITECTURAL PERFORMANCE & CAPABILITY SHOWCASE ── */}
          <div className="space-y-10 pt-4">
            {/* Header with clear real-world framing */}
            <div className="space-y-2 max-w-3xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#ff5500] font-semibold block">
                Material Capabilities &amp; Verified Strength
              </span>
              <h3 className="font-display font-light text-2xl sm:text-3xl lg:text-4xl text-[#241919]">
                Engineered by Nature, <span className="font-normal text-[#ff5500]">Proven by Science</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
                How our natural stones perform across demanding real-world applications—from high-traffic international airports and luxury kitchen surfaces to freeze-thaw exterior skyscrapers.
              </p>
            </div>

            {/* 6 Minimal Architectural Capability Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {QUALITY_METRICS.map((metric) => (
                <div
                  key={metric.id}
                  className="group relative p-5 sm:p-6 rounded-[4px] bg-white border border-[#747474]/15 hover:border-[#9a3412] transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  {/* Top Row: Standard Code + Verified Tag */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[11px] font-bold text-[#747474] border border-[#747474]/20 bg-white px-2 py-0.5 rounded-[4px]">
                      {metric.standard}
                    </span>
                    <span className="text-[11px] text-[#9a3412] font-semibold">
                      {metric.badge}
                    </span>
                  </div>

                  {/* Center: Monumental Rating + Capability Title */}
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-[#241919] group-hover:text-[#9a3412] transition-colors">
                      {metric.value}
                    </div>
                    <h4 className="font-sans font-semibold text-sm sm:text-base text-[#241919] leading-snug">
                      {metric.headline}
                    </h4>
                  </div>

                  {/* Bottom: Clean Application Target */}
                  <div className="pt-3 border-t border-[#747474]/10 text-[11.5px] font-mono text-[#747474]">
                    <span>{metric.application}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── GLOBAL STATUTORY COMPLIANCE & ACCREDITATION SEALS ── */}
          <div className="space-y-8 pt-8 border-t border-[#747474]/15">
            {/* Header */}
            <div className="space-y-2 max-w-3xl">
              <span className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#ff5500] font-bold block">
                Statutory Compliance &amp; Global Accreditations
              </span>
              <h3 className="font-display font-light text-2xl sm:text-3xl text-[#241919]">
                Official Architectural <span className="font-normal text-[#ff5500]">Trust Crests &amp; Seals</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
                All quarry consignments and fabricated architectural stone strictly comply with international building codes, load-bearing engineering benchmarks, and eco-certified green building standards.
              </p>
            </div>

            {/* 5 Architectural Trust Crest & Seal Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
              {ACCREDITATION_DOSSIER.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white border border-[#747474]/20 hover:border-[#ff5500] rounded-[4px] p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
                >
                  <div className="space-y-4">
                    {/* Top Row: Insignia Crest + Category Tag */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-12 h-12 rounded-[4px] flex items-center justify-center border border-[#747474]/25 group-hover:border-[#ff5500] bg-white transition-all duration-300">
                        <span className="font-mono font-black text-sm text-[#241919] group-hover:text-[#ff5500] tracking-tight transition-colors">
                          {item.sigil}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-[4px] text-[9.5px] font-mono uppercase tracking-wider text-[#747474] group-hover:text-[#ff5500] border border-[#747474]/20 group-hover:border-[#ff5500]/40 font-semibold transition-colors bg-white">
                        {item.category}
                      </span>
                    </div>

                    {/* Standard Title & Authority */}
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-base text-[#241919] group-hover:text-[#ff5500] transition-colors leading-tight">
                        {item.standard}
                      </h4>
                      <p className="text-[11px] font-mono text-[#747474] leading-snug">
                        {item.authority}
                      </p>
                    </div>

                    {/* Standard Code Chip */}
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded-[4px] text-[10px] font-mono font-bold text-[#241919] group-hover:text-[#ff5500] border border-[#747474]/20 group-hover:border-[#ff5500]/40 bg-white transition-colors">
                        {item.code}
                      </span>
                    </div>

                    {/* Punchy 1-Line Highlight */}
                    <p className="text-xs text-[#555555] group-hover:text-[#241919] font-normal leading-relaxed pt-2 border-t border-[#747474]/10 transition-colors">
                      {item.highlight}
                    </p>
                  </div>

                  {/* Bottom Verification Seal & Territory */}
                  <div className="pt-3 mt-3 border-t border-[#747474]/15 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#747474] truncate">{item.territory}</span>
                    <span className="text-[#241919] group-hover:text-[#ff5500] font-bold transition-colors flex-none ml-1">
                      ✓ Active
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── ARCHITECTURAL PROJECT SUBMITTAL & MATERIAL TEST REPORTS HUB ── */}
            <div className="rounded-[4px] border border-[#747474]/15 bg-white p-6 sm:p-8 lg:p-10 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#ff5500] font-bold block">
                    Architectural Specifiers &amp; Project Consultants
                  </span>
                  <h4 className="font-display font-medium text-xl sm:text-2xl text-[#241919]">
                    Need Certified Material Test Reports (MTR) for Your Project?
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
                  We furnish comprehensive third-party laboratory test reports including compressive load curves, petrographic thin-section analysis, water absorption data, and 5000K daylight dry-lay records for architectural tender submittals.
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs font-mono text-[#241919]">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#ff5500] font-bold">1.</span>
                    <span>Quarry Source Traceability</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#ff5500] font-bold">2.</span>
                    <span>ASTM / EN Lab Certs</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#ff5500] font-bold">3.</span>
                    <span>Dry-Lay Batch Records</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#ff5500] font-bold">4.</span>
                    <span>ISPM-15 Phytosanitary Cleared</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons with Cross / Staggered Offset Layout */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 flex-none items-stretch sm:items-center lg:items-end">
                <Link
                  href="/request-sample"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[4px] bg-[#241919] hover:bg-[#ff5500] text-white text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] shadow-sm cursor-pointer group text-center lg:-translate-x-8 sm:-translate-x-3"
                >
                  <span>Request Certified Test Reports</span>
                  <ArrowRight className="w-4 h-4 text-[#ff5500] group-hover:text-white transition-colors" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[4px] bg-white hover:bg-[#747474]/8 text-[#241919] hover:text-[#ff5500] text-xs font-mono uppercase tracking-wider font-bold border border-[#747474]/20 hover:border-[#ff5500]/40 transition-all duration-300 text-center lg:translate-x-0"
                >
                  <span>Schedule Factory Inspection</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
