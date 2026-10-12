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
  ArrowUpRight,
  Play,
  Pause,
  ShieldCheck,
  CheckCircle2,
  Award,
} from "lucide-react";

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
    image: "/images/premium_slate_texture.jpg",
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
    image: "/images/calibrated_stone_tiles.jpg",
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
    image: "/images/rj-black-galaxy-granite.jpg",
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
    image: "/images/new-universe-black-granite.jpg",
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
    title: "Quarry Bench Provenance",
    tagline: "Selective block extraction from virgin mineral reserves",
    standardCode: "ASTM C170",
    benchmark: "100% Crystalline Matrix Verified",
    equipment: "Ultrasonic Diagnostics",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=400&q=80",
    color: "#ea580c",
  },
  {
    id: "stage-2",
    step: "02",
    phase: "CALIBRATION & SLICING",
    title: "Multi-Blade Gangsaw Slicing",
    tagline: "Sub-millimeter laser-calibrated slab leveling",
    standardCode: "EN 12058",
    benchmark: "±0.5 mm Diamond Calibration",
    equipment: "Multi-Blade Frames",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
    color: "#d97706",
  },
  {
    id: "stage-3",
    step: "03",
    phase: "SURFACE REFINEMENT",
    title: "16-Head Specular Polish",
    tagline: "Deep-vacuum resin & mirror luster refinement",
    standardCode: "ISO 2813",
    benchmark: "95° Specular Reflection",
    equipment: "16-Head Line Polishers",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
    color: "#c2410c",
  },
  {
    id: "stage-4",
    step: "04",
    phase: "DAYLIGHT DRY-LAY & EXPORT",
    title: "Daylight Dry-Lay & Crating",
    tagline: "5000K vein-matching & seaworthy timber protection",
    standardCode: "ISPM-15",
    benchmark: "ISPM-15 Seaworthy Containerized",
    equipment: "Hardwood Crating",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
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
    standard: "CE European Conformity",
    authority: "European Construction Products Regulation",
    territory: "European Union & UK",
    highlight: "Certified load-bearing flexural strength & non-slip safety for European civic infrastructure.",
    category: "European Building Code",
    statPrimaryLabel: "Flexural Benchmark",
    statPrimaryValue: "EN 12058 · Class A",
    statSecondaryLabel: "Civic Jurisdiction",
    statSecondaryValue: "European Union & UK",
    complianceScore: "100%",
    progressPercent: 100,
    activeCheckpoint: "EN 12058 / EN 1341 Structural Safety",
    nextAudit: "Annual Notified Body Plant Inspection",
    milestone1: "Quarry Source Traceability",
    milestone2: "EN Standards Compliance",
    iconName: "ShieldCheck",
    images: ["/images/calibrated_stone_tiles.jpg", "/images/stone_flooring_installation.jpg"],
  },
  {
    id: "astm",
    sigil: "ASTM",
    code: "ASTM C170 · C97 · C880",
    standard: "ASTM International C18",
    authority: "Dimension Stone Performance Testing",
    territory: "North America & Global",
    highlight: "Exceeds structural compressive (>190 MPa) and tensile ratings for US commercial towers.",
    category: "American Standard",
    statPrimaryLabel: "Compressive Benchmark",
    statPrimaryValue: "> 190.4 MPa",
    statSecondaryLabel: "Structural Tolerance",
    statSecondaryValue: "ASTM C170 Certified",
    complianceScore: "99.8%",
    progressPercent: 99.8,
    activeCheckpoint: "ASTM C170 Compressive / C97 Absorption",
    nextAudit: "Batch ASTM Tensile Verification",
    milestone1: "Direct Quarry Block Crate",
    milestone2: "ASTM C170 Lab Pass",
    iconName: "Award",
    images: ["/images/premium_slate_texture.jpg", "/images/calibrated_stone_tiles.jpg"],
  },
  {
    id: "iso",
    sigil: "ISO",
    code: "ISO 9001:2015",
    standard: "ISO 9001:2015 QMS",
    authority: "TÜV Audited Quality Management System",
    territory: "Global Operations",
    highlight: "Full block-to-crate traceability with audited diamond-wire dimensional calibration tolerances.",
    category: "Quality Management",
    statPrimaryLabel: "Calibration Tolerance",
    statPrimaryValue: "± 0.5 mm Diamond",
    statSecondaryLabel: "Quality Assurance",
    statSecondaryValue: "100% Crate Audited",
    complianceScore: "100%",
    progressPercent: 100,
    activeCheckpoint: "ISO 9001:2015 Audited Processing Line",
    nextAudit: "Continuous Digital Caliper Verification",
    milestone1: "Automated Gangsaw Line",
    milestone2: "Micron Precision Check",
    iconName: "CheckCircle2",
    images: ["/images/stone_flooring_installation.jpg", "/images/premium_slate_texture.jpg"],
  },
  {
    id: "ispm",
    sigil: "IPPC",
    code: "ISPM-15 HT 56°C",
    standard: "Phytosanitary Timber Maritime",
    authority: "International Plant Protection Convention",
    territory: "Global Ocean Freight Ports",
    highlight: "Heat-treated hardwood crating with vapor barriers for fast-track customs clearance across all ports.",
    category: "Export Phytosanitary",
    statPrimaryLabel: "Thermal Heat Treatment",
    statPrimaryValue: "HT 56°C Core / 30m",
    statSecondaryLabel: "Maritime Clearance",
    statSecondaryValue: "Zero Quarantine Hold",
    complianceScore: "100%",
    progressPercent: 100,
    activeCheckpoint: "IPPC Stamped ISPM-15 Hardwood Packaging",
    nextAudit: "Port Harbor Phytosanitary Issuance",
    milestone1: "Vapor Barrier Crated",
    milestone2: "Customs Green Channel",
    iconName: "Globe",
    images: ["/images/calibrated_stone_tiles.jpg", "/images/premium_slate_texture.jpg"],
  },
  {
    id: "leed",
    sigil: "LEED",
    code: "LEED v4.1 & IGBC",
    standard: "USGBC & IGBC Green Building",
    authority: "U.S. Green Building Council Eco-Credit",
    territory: "Sustainable Architecture",
    highlight: "Zero-VOC 100% natural geological stone qualifying for LEED MR and EQ green building credits.",
    category: "Eco Architecture",
    statPrimaryLabel: "Embodied Carbon / VOC",
    statPrimaryValue: "0.0 g/L (Zero VOC)",
    statSecondaryLabel: "Green Building Points",
    statSecondaryValue: "LEED MR Credits",
    complianceScore: "100%",
    progressPercent: 100,
    activeCheckpoint: "USGBC & IGBC Natural Stone Certification",
    nextAudit: "Low Carbon Embodied Verification",
    milestone1: "100% Captive Solar Quarry",
    milestone2: "Zero Chemical Processing",
    iconName: "Sparkles",
    images: ["/images/premium_slate_texture.jpg", "/images/stone_flooring_installation.jpg"],
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
  const [activeProcessStepIdx, setActiveProcessStepIdx] = useState(0);
  const [hoveredGateIdx, setHoveredGateIdx] = useState<number | null>(null);
  const [activeQualityGateIdx, setActiveQualityGateIdx] = useState(0);
  const [activeCrestIdx, setActiveCrestIdx] = useState(1); // Default to ASTM
  const [isCrestPaused, setIsCrestPaused] = useState(false);
  const facilitySliderRef = useRef<HTMLDivElement>(null);

  // Automatically flow accreditation crests in a continuous loop (pauses on hover)
  useEffect(() => {
    if (isCrestPaused) return;
    const interval = setInterval(() => {
      setActiveCrestIdx((prev) => (prev + 1) % ACCREDITATION_DOSSIER.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isCrestPaused]);

  const currentQualityStage = QUALITY_STAGES[activeQualityGateIdx];

  const prevCrestIdx = (activeCrestIdx - 1 + ACCREDITATION_DOSSIER.length) % ACCREDITATION_DOSSIER.length;
  const nextCrestIdx = (activeCrestIdx + 1) % ACCREDITATION_DOSSIER.length;
  const activeCrest = ACCREDITATION_DOSSIER[activeCrestIdx];
  const prevCrest = ACCREDITATION_DOSSIER[prevCrestIdx];
  const nextCrest = ACCREDITATION_DOSSIER[nextCrestIdx];

  const scrollToFacility = (idx: number) => {
    setActiveFacilityIdx(idx);
    if (facilitySliderRef.current) {
      const container = facilitySliderRef.current;
      const targetChild = container.children[idx] as HTMLElement;
      if (targetChild) {
        targetChild.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  const handleNextFacility = () => {
    const nextIdx = (activeFacilityIdx + 1) % MANUFACTURING_FACILITIES.length;
    scrollToFacility(nextIdx);
  };

  const handlePrevFacility = () => {
    const prevIdx = (activeFacilityIdx - 1 + MANUFACTURING_FACILITIES.length) % MANUFACTURING_FACILITIES.length;
    scrollToFacility(prevIdx);
  };

  const handleContactClick = () => {
    router.push("/#contact");
  };

  const activeFacility = MANUFACTURING_FACILITIES[activeFacilityIdx];
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
            className="font-display font-light text-[#241919] leading-[1.1] tracking-[-0.015em] mb-4 cursor-pointer transition-colors duration-300 group-hover:text-[#181111] flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3"
            style={{ fontSize: "clamp(20px, 4.2vw, 64px)" }}
          >
            <span>About</span>{" "}
            <span className="relative inline-block font-normal whitespace-nowrap">
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
            <strong className="font-semibold text-[#241919]">
              Paving the way to the future of natural stone, <span className="text-[#003049] font-bold">PAVAN STONES GROUP</span> is a premier natural stone conglomerate in India.
            </strong> Established since 2000, the company has made its mark both locally and globally for its unique quarry-extracted natural stone products that amalgamate the finest raw material, gangsaw technology, industrial expertise, and master craftsmanship to create natural slates, limestones, and granites that are of the highest architectural quality and authenticity.
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

      {/* ── FOUR SPECIALIZED MANUFACTURING COMPLEXES (INSPIRATIONAL EDITORIAL ATELIER LAYOUT) ── */}
      <section
        id="manufacturing-facilities"
        className="relative w-full bg-white z-20 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden border-t border-[#003049]/10"
      >
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          
          {/* ── SECTION HEADER (CENTERED) ── */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#003049] leading-[1.12] tracking-tight">
              Four Specialized <br className="hidden sm:inline" />
              <span className="italic font-normal">Manufacturing Complexes.</span>
            </h2>
          </div>

          {/* ── MAIN 2-COLUMN STAGE: FACILITIES LIST (LEFT) & SHOWCASE IMAGE (RIGHT) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ── LEFT COLUMN: INTERACTIVE FACILITIES LIST (~30% WIDTH) ── */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              
              {/* Interactive Facilities List with Dividers */}
              <div className="divide-y divide-[#003049]/10 border-t border-b border-[#003049]/10">
                {MANUFACTURING_FACILITIES.map((facility, idx) => {
                  const isActive = activeFacilityIdx === idx;
                  return (
                    <button
                      key={facility.id}
                      onClick={() => setActiveFacilityIdx(idx)}
                      className={`w-full text-left py-3.5 sm:py-4 group transition-all duration-300 flex items-center justify-between cursor-pointer relative ${
                        isActive ? "text-[#ff5500]" : "text-[#003049] hover:text-[#ff5500]"
                      }`}
                    >
                      {/* Left: Title + Thumbnail + Subtitle */}
                      <div className="space-y-1.5 min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-base sm:text-lg font-display font-medium transition-colors ${
                              isActive ? "text-[#ff5500]" : "text-[#003049] group-hover:text-[#ff5500]"
                            }`}
                          >
                            {facility.division}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          {/* Small Live Stone Thumbnail */}
                          <div
                            className={`w-8 h-8 rounded-md overflow-hidden border transition-all flex-shrink-0 ${
                              isActive
                                ? "border-[#00e5ff] ring-2 ring-[#00e5ff]/40 shadow-xs"
                                : "border-[#003049]/15 group-hover:border-[#ff5500]"
                            }`}
                          >
                            <img
                              src={facility.image}
                              alt={facility.division}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <span className="block text-[11px] font-sans text-[#003049]/60 truncate group-hover:text-[#003049]/80">
                              {facility.tag.split("&")[0].trim()}
                            </span>
                            <span className="block text-[10px] font-sans font-semibold text-[#ff5500]">
                              {facility.annualCapacity.split(" / ")[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Chevron Arrow (turns Electric Blue on hover/active) */}
                      <div className="flex items-center justify-center flex-shrink-0">
                        <ChevronRight
                          className={`w-4 h-4 transition-all duration-300 ${
                            isActive
                              ? "text-[#00e5ff] translate-x-1"
                              : "text-[#003049]/40 group-hover:text-[#00e5ff] group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* ── RIGHT COLUMN: SHOWCASE IMAGE (~70% WIDTH) ── */}
            <div className="lg:col-span-8">
              {/* Main Showcase Image */}
              <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden border border-[#003049]/10 shadow-xl bg-[#f8fafc] group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFacility.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                  >
                    {/* Main Full-Bleed Showcase Image */}
                    <img
                      src={activeFacility.image}
                      alt={activeFacility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />

                    {/* Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003049]/95 via-[#003049]/35 to-transparent" />

                    {/* Bottom Dossier Overlay Card */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 lg:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-5 text-white">
                      <div className="space-y-2.5 max-w-xl">
                        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#ff5500] font-bold block">
                          {activeFacility.tag}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight leading-tight text-white">
                          {activeFacility.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] font-sans font-light text-white/80 leading-relaxed line-clamp-2">
                          {activeFacility.description}
                        </p>

                        {/* Technical Spec Matrix Badges */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1 text-xs font-sans">
                          <div className="flex items-center gap-1.5">
                            <span className="text-white/60">Annual Output:</span>
                            <span className="font-semibold text-white">{activeFacility.annualCapacity.split(" / ")[0]}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-white/60">Tolerance:</span>
                            <span className="font-semibold text-[#00e5ff]">{activeFacility.tolerance}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-white/60">Enclosed Yard:</span>
                            <span className="font-semibold text-white">{activeFacility.area}</span>
                          </div>
                        </div>
                      </div>

                      {/* Direct Division Link Button */}
                      <div className="flex-shrink-0">
                        <Link
                          href={`/companies/${activeFacility.divisionSlug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#003049] hover:bg-[#ff5500] hover:text-white transition-all duration-300 shadow-md group/btn"
                        >
                          <span className="font-sans text-xs uppercase tracking-[0.16em] font-bold">
                            Explore Division
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#003049] group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* ── BOTTOM STATS RIBBON ── */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#003049]/10 text-xs font-sans text-[#0077b6]">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
                <strong className="text-[#003049]">150,000 SQM/YR</strong> Combined Group Output
              </span>
              <span className="hidden sm:inline-block text-[#003049]/20">|</span>
              <span className="hidden sm:inline-block">
                Calibration Standards: <strong className="text-[#ff5500]">±0.5mm Diamond Calibration</strong>
              </span>
              <span className="hidden md:inline-block text-[#003049]/20">|</span>
              <span className="hidden md:inline-block">
                Extraction Model: <strong className="text-[#003049]">100% Captive Leasehold Reserves</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#003049]/50">Active Complex:</span>
              <span className="font-bold text-[#ff5500]">0{activeFacilityIdx + 1} of 04</span>
            </div>
          </div>

        </div>
      </section>

      {/* Wrapping the 5-stage timeline in a safe padded container since we removed the section padding */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 md:px-14 lg:px-20 bg-white relative z-20 border-t border-[#6c757d]/20">
        <div className="max-w-7xl mx-auto">
      {/* ── 5-STAGE PRECISION MANUFACTURING WORKFLOW (ARCHITECTURAL ALTERNATING TIMELINE) ── */}
          <div className="space-y-12 pt-8 border-t border-[#6c757d]/20">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#ff5500] font-semibold block">
                The Craft of Natural Stone
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-[#241919] leading-[1.08] tracking-tight">
                Precision Manufacturing <span className="font-normal text-[#ff5500] italic">Lifecycle</span>
              </h2>
              <div className="w-20 h-[3px] bg-gradient-to-r from-[#ff5500] to-[#ff5500]/20 rounded-full mx-auto my-3" />
              <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed max-w-2xl mx-auto">
                From selective captive quarry bench extraction to multi-blade Italian gangsaw slicing, 16-head specular polishing, 5-axis CNC profiling, and moisture-sealed international export crating.
              </p>
            </div>

            {/* Quick-Jump Milestone Ribbon */}
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none px-2">
              {PROCESS_STEPS.map((step, idx) => (
                <a
                  key={step.step}
                  href={`#process-step-${step.step}`}
                  className="group flex items-center gap-2.5 px-3.5 py-2 rounded-[4px] border border-[#6c757d]/30 bg-white hover:border-[#ff5500] transition-all flex-shrink-0 cursor-pointer shadow-xs"
                >
                  <span className="w-6 h-6 rounded-[3px] bg-[#6c757d]/10 text-[#6c757d] group-hover:bg-[#ff5500] group-hover:text-white font-mono text-[10.5px] font-bold flex items-center justify-center transition-colors">
                    {step.step}
                  </span>
                  <div className="text-left">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#6c757d] group-hover:text-[#ff5500] block transition-colors">
                      {step.phase}
                    </span>
                    <span className="text-xs font-display font-medium text-[#241919] block truncate max-w-[130px]">
                      {step.title}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Alternating Step Timeline Flow with Framer Motion Scroll Reveals */}
            <div className="max-w-5xl mx-auto relative pt-4 pb-8 overflow-hidden">
              {/* Central Spine Line (Desktop) */}
              <div className="hidden lg:block absolute left-1/2 top-8 bottom-12 w-px -translate-x-1/2 bg-gradient-to-b from-[#ff5500] via-[#6c757d]/30 to-[#ff5500]" />

              <div className="space-y-12 sm:space-y-16">
                {PROCESS_STEPS.map((step, idx) => {
                  const isEven = idx % 2 === 0;

                  return (
                    <motion.div
                      key={step.step}
                      id={`process-step-${step.step}`}
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.25 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className="relative scroll-mt-28"
                    >
                      {/* Timeline Node Icon (Center Desktop - Isolated Positioning Wrapper for Perfect Axis Centering) */}
                      <div className="hidden lg:flex absolute left-1/2 top-10 -translate-x-1/2 z-10 pointer-events-none">
                        <motion.div
                          initial={{ scale: 0.4, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: false, amount: 0.25 }}
                          transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                          className="w-10 h-10 rounded-full bg-white border-2 border-[#ff5500] flex items-center justify-center shadow-md font-mono text-xs font-bold text-[#ff5500]"
                        >
                          {step.step}
                        </motion.div>
                      </div>

                      {/* Alternating 2-Column Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
                        {/* Image Column */}
                        <motion.div
                          initial={{ opacity: 0, x: isEven ? -35 : 35, y: 15 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          viewport={{ once: false, amount: 0.25 }}
                          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                          className={`order-1 ${
                            isEven ? "lg:order-1" : "lg:order-2"
                          }`}
                        >
                          <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full rounded-[4px] overflow-hidden border border-[#6c757d] bg-neutral-900 group shadow-xs">
                            <img
                              src={step.image}
                              alt={step.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                          </div>
                        </motion.div>

                        {/* Content Card Column */}
                        <motion.div
                          initial={{ opacity: 0, x: isEven ? 35 : -35, y: 15 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          viewport={{ once: false, amount: 0.25 }}
                          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className={`order-2 ${
                            isEven ? "lg:order-2" : "lg:order-1"
                          }`}
                        >
                          <div className="bg-white border border-[#6c757d] rounded-[4px] p-5 sm:p-7 space-y-4 shadow-xs hover:border-[#ff5500] transition-colors duration-300">
                            {/* Eyebrow & Step Tag */}
                            <div className="flex items-center justify-between gap-2 border-b border-[#6c757d]/15 pb-2.5">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-[3px] bg-[#ff5500] text-white">
                                STAGE {step.step}
                              </span>
                              <span className="text-[10.5px] font-mono text-[#6c757d] font-semibold tracking-wider uppercase">
                                {step.phase}
                              </span>
                            </div>

                            {/* Title & Tagline */}
                            <div className="space-y-1">
                              <h3 className="font-display font-medium text-xl sm:text-2xl text-[#241919] leading-tight">
                                {step.title}
                              </h3>
                              <p className="text-xs sm:text-[13px] text-[#ff5500] font-mono font-medium">
                                {step.tagline}
                              </p>
                            </div>

                            {/* Narrative */}
                            <p className="text-xs sm:text-[13.5px] text-[#555555] font-light leading-relaxed">
                              {step.description}
                            </p>

                            {/* Specification Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                              {/* Electric Blue Benchmark */}
                              <div className="p-3 rounded-[3px] bg-[#00e5ff]/10 border border-[#00e5ff]/40 space-y-1">
                                <span className="text-[9.5px] font-mono uppercase text-[#0077b6] tracking-wider block font-semibold">
                                  Precision Benchmark
                                </span>
                                <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#0077b6] leading-snug">
                                  <CheckCircle2 className="w-4 h-4 text-[#00b4d8] flex-none" />
                                  <span>{step.highlight}</span>
                                </div>
                              </div>

                              {/* Machinery Asset */}
                              <div className="p-3 rounded-[3px] bg-[#6c757d]/8 border border-[#6c757d]/25 space-y-1">
                                <span className="text-[9.5px] font-mono uppercase text-[#6c757d] tracking-wider block font-semibold">
                                  Industrial Machinery
                                </span>
                                <span className="text-xs font-bold font-mono text-[#241919] leading-snug block">
                                  {step.equipment}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
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

          {/* ── FOUNDER'S VISION & EXECUTIVE PROFILE ── */}
          <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 border-y border-[#747474]/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Founder Identity (4 cols) */}
              <div className="lg:col-span-4 space-y-2.5">
                <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#ff5500] font-semibold block">
                  {FOUNDER_INFO.role}
                </span>

                <h3 className="font-display font-medium text-3xl sm:text-4xl text-[#241919] tracking-tight leading-none">
                  {FOUNDER_INFO.name}
                </h3>

                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#747474] pt-0.5">
                  Pavan Stones Group
                </p>

                <div className="w-10 h-0.5 bg-[#ff5500] mt-3" />
              </div>

              {/* Right Column: Narrative & Key Highlights (8 cols) */}
              <div className="lg:col-span-8 space-y-6 lg:border-l lg:border-[#747474]/15 lg:pl-10">
                <p className="text-[14.5px] sm:text-[15.5px] leading-[1.8] text-[#444444] font-light">
                  “{FOUNDER_INFO.bio}”
                </p>

                {/* Highlights Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#747474]/15">
                  {FOUNDER_INFO.highlights.map((item) => (
                    <div key={item.label} className="space-y-1">
                      <span className="text-[9.5px] font-mono uppercase tracking-[0.18em] text-[#747474] font-medium block">
                        {item.label}
                      </span>
                      <span className="text-[13px] font-semibold text-[#241919] block">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── SECTION HEADER FOR EXECUTIVE BOARD (MATCHING REFERENCE IMAGE RHYTHM) ── */}
          <div className="max-w-3xl mx-auto text-center space-y-3 pt-6 pb-2">
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl lg:text-[50px] text-[#003049] leading-[1.08] tracking-tight uppercase">
              Executive Board &amp; <br className="hidden sm:inline" />
              <span className="italic font-normal">Management Operations</span>
            </h2>

            <span className="inline-block text-xs font-sans uppercase tracking-[0.24em] font-bold text-[#ff5500] pt-1">
              Leadership &amp; Corporate Governance
            </span>

            <p className="text-xs sm:text-[14px] text-[#003049]/75 font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Decades of direct captive quarry reserves, precision processing, and client trust—guided by visionary executive leadership across domestic and global natural stone operations.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="h-px w-12 bg-[#ff5500]/30" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#ff5500]" />
              <div className="h-px w-12 bg-[#ff5500]/30" />
            </div>
          </div>

          {/* ── 4 STAGGERED ARCHITECTURAL CARDS (MATCHING REFERENCE IMAGE) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 max-w-7xl mx-auto pt-4 lg:pb-28">
            {LEADERSHIP_TEAM.map((member, idx) => {
              // Undulating vertical offsets matching the exact wave in reference photo
              const staggerClass =
                idx === 0
                  ? "lg:translate-y-8"
                  : idx === 1
                  ? "lg:translate-y-24"
                  : idx === 2
                  ? "lg:translate-y-14"
                  : "lg:translate-y-0";

              return (
                <div
                  key={member.name}
                  className={`relative group transition-transform duration-500 ${staggerClass}`}
                >
                  {/* Architectural Offset Hairline Orange Wireframe */}
                  <div className="absolute -top-3.5 -left-3.5 w-full h-[calc(100%-16px)] border border-[#ff5500]/50 pointer-events-none rounded-[4px] group-hover:-top-4.5 group-hover:-left-4.5 group-hover:border-[#ff5500] transition-all duration-300" />

                  {/* Main Card Shell */}
                  <div className="relative flex flex-col gap-2.5">
                    {/* Upper Text Box (Replacing Photo with Executive Bio & Dossier Text) */}
                    <div className="bg-white border border-[#ff5500] rounded-[4px] p-6 shadow-xs group-hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[300px]">
                      <div>
                        {/* Top Row: Initials Monogram Badge & Label */}
                        <div className="flex items-center justify-between pb-3.5 border-b border-[#ff5500]/20">
                          <span className="px-2.5 py-1 rounded-[2px] text-[10px] font-sans font-bold uppercase tracking-wider text-[#003049] border border-[#ff5500]/40 bg-[#ff5500]/5">
                            {member.initials}
                          </span>
                          <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#ff5500] font-semibold">
                            BOARD DOSSIER
                          </span>
                        </div>

                        {/* Executive Narrative Quote in #003049 */}
                        <div className="pt-4 space-y-2">
                          <span className="text-2xl font-display text-[#ff5500] leading-none block select-none">
                            “
                          </span>
                          <p className="text-xs sm:text-[13px] text-[#003049] font-sans font-light leading-[1.75]">
                            {member.bio}
                          </p>
                        </div>
                      </div>

                      {/* Direct Communication Deck */}
                      <div className="pt-4 mt-4 border-t border-[#ff5500]/20 flex items-center justify-between gap-2">
                        <a
                          href={`tel:${member.phoneRaw}`}
                          className="inline-flex items-center gap-2 group/call text-[11px] font-sans font-bold text-[#003049] hover:text-[#ff5500] transition-colors min-w-0"
                          title={`Call ${member.name}`}
                        >
                          <div className="w-7 h-7 rounded-[4px] bg-white border border-[#ff5500] group-hover/call:bg-[#ff5500] flex items-center justify-center text-[#003049] group-hover/call:text-white transition-colors flex-none">
                            <Phone className="w-3 h-3" />
                          </div>
                          <span className="truncate">{member.contact}</span>
                        </a>

                        <a
                          href={member.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/40 transition-all text-[10.5px] font-sans font-semibold flex-none shadow-2xs"
                          title={`Chat on WhatsApp with ${member.name}`}
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    {/* Lower Info Box (Matching Name & Title Frame in Reference Image) */}
                    <div className="bg-white border border-[#ff5500] rounded-[4px] p-4 shadow-xs group-hover:shadow-md transition-all duration-300">
                      <h3 className="font-display font-medium text-base sm:text-[17.5px] text-[#003049] uppercase tracking-wide leading-tight group-hover:text-[#ff5500] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-sans font-semibold text-[#ff5500] uppercase tracking-wider mt-1 leading-snug">
                        {member.role}
                      </p>
                      <p className="text-[11px] font-sans text-[#003049]/60 font-light mt-1">
                        Pavan Stones Group
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Trust & Inquiry Callout */}
          <div className="mt-8 bg-white border border-[#ff5500] rounded-[4px] p-6 sm:p-8 max-w-4xl mx-auto shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <h4 className="font-display font-medium text-xl text-[#003049]">
                Have a Commercial Project or Custom Sourcing Inquiry?
              </h4>
              <p className="text-xs sm:text-sm text-[#003049]/70 font-sans font-light">
                Our leadership team provides direct advisory for global architects, distributors, and bulk container procurement.
              </p>
            </div>
            <button
              onClick={handleContactClick}
              className="flex-none px-6 py-3 bg-[#003049] hover:bg-[#ff5500] text-white text-[11px] font-sans uppercase tracking-[0.18em] font-semibold rounded-[4px] transition-colors cursor-pointer"
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
          <div className="max-w-4xl space-y-3">
            <span className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-[#ff5500] font-bold block">
              Multi-Stage Quality Protocol
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-[#003049] leading-[1.08] tracking-tight">
              Precision Quality &amp; <span className="font-normal text-[#ff5500] italic">Mastercraft</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#003049]/70 font-light leading-relaxed max-w-3xl pt-1">
              From captive quarry extraction and Italian gangsaw calibration to 16-head line polishing, 5000K daylight dry-laying, and seaworthy containerization, our multi-stage quality assurance protocol guarantees flawless natural stone engineered for prestigious international landmarks across 40+ countries.
            </p>
          </div>

          {/* ── DIAGRAMMATIC INFOGRAPHIC LAYOUT: CIRCULAR SHOWCASE (LEFT) + BRANCHED PROCESS CARDS (RIGHT) ── */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ── LEFT: CIRCULAR FOCUS FRAME WITH SEGMENTED ORBITAL RING ── */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                
                {/* Segmented Orbital Calibration Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-45" viewBox="0 0 200 200">
                  {/* Segment 1 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={activeQualityGateIdx === 0 ? "#ff5500" : "#003049"}
                    strokeOpacity={activeQualityGateIdx === 0 ? 1 : 0.25}
                    strokeWidth={activeQualityGateIdx === 0 ? "5" : "3.5"}
                    strokeDasharray="125 15"
                    strokeDashoffset="0"
                    className="transition-all duration-500"
                  />
                  {/* Segment 2 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={activeQualityGateIdx === 1 ? "#ff5500" : "#003049"}
                    strokeOpacity={activeQualityGateIdx === 1 ? 1 : 0.25}
                    strokeWidth={activeQualityGateIdx === 1 ? "5" : "3.5"}
                    strokeDasharray="125 15"
                    strokeDashoffset="-140"
                    className="transition-all duration-500"
                  />
                  {/* Segment 3 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={activeQualityGateIdx === 2 ? "#ff5500" : "#003049"}
                    strokeOpacity={activeQualityGateIdx === 2 ? 1 : 0.25}
                    strokeWidth={activeQualityGateIdx === 2 ? "5" : "3.5"}
                    strokeDasharray="125 15"
                    strokeDashoffset="-280"
                    className="transition-all duration-500"
                  />
                  {/* Segment 4 */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={activeQualityGateIdx === 3 ? "#ff5500" : "#003049"}
                    strokeOpacity={activeQualityGateIdx === 3 ? 1 : 0.25}
                    strokeWidth={activeQualityGateIdx === 3 ? "5" : "3.5"}
                    strokeDasharray="125 15"
                    strokeDashoffset="-420"
                    className="transition-all duration-500"
                  />
                </svg>

                {/* Inner Circular Showcase Photo */}
                <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-neutral-100 z-10 group/circle">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQualityStage.id}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full"
                    >
                      <img
                        src={currentQualityStage.image}
                        alt={currentQualityStage.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#003049]/80 via-transparent to-transparent" />
                      
                      {/* Floating Badge on Circle */}
                      <div className="absolute bottom-4 inset-x-0 text-center px-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#003049] text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                          {currentQualityStage.phase}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

              {/* Sub-label under circle */}
              <div className="text-center mt-3 space-y-1">
                <span className="text-xs font-mono font-bold text-[#ff5500]">
                  GATE {currentQualityStage.step} · {currentQualityStage.standardCode}
                </span>
                <p className="text-[11px] font-sans text-[#003049]/60 max-w-[240px]">
                  {currentQualityStage.benchmark}
                </p>
              </div>
            </div>

            {/* ── RIGHT: STACKED PROCESS CARDS WITH BRANCH CONNECTORS ── */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 relative">
              
              {QUALITY_STAGES.map((stage, idx) => {
                const isActive = activeQualityGateIdx === idx;
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    onClick={() => setActiveQualityGateIdx(idx)}
                    onMouseEnter={() => {
                      setActiveQualityGateIdx(idx);
                      setHoveredGateIdx(idx);
                    }}
                    onMouseLeave={() => setHoveredGateIdx(null)}
                    className="relative flex items-center gap-3 sm:gap-4 group cursor-pointer"
                  >
                    {/* Step Number Badge (01, 02, etc.) */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-white shrink-0 transition-all duration-300 shadow-2xs ${
                        isActive
                          ? "bg-[#ff5500] shadow-sm scale-105"
                          : "bg-[#003049] group-hover:bg-[#ff5500]"
                      }`}
                    >
                      {stage.step}
                    </div>

                    {/* Card Content Container */}
                    <div
                      className={`flex-1 bg-white border rounded-xl p-4 sm:p-5 transition-all duration-300 ${
                        isActive
                          ? "border-[#ff5500] shadow-md ring-1 ring-[#ff5500]/20 bg-gradient-to-r from-white to-[#ff5500]/[0.02]"
                          : "border-[#003049]/15 hover:border-[#ff5500]/60 hover:shadow-xs"
                      }`}
                    >
                      {/* Top Row: Title + Code Chip */}
                      <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#003049]/10">
                        <div className="min-w-0">
                          <h4
                            className={`font-display font-medium text-base sm:text-lg leading-tight transition-colors truncate ${
                              isActive ? "text-[#ff5500]" : "text-[#003049] group-hover:text-[#ff5500]"
                            }`}
                          >
                            {stage.title}
                          </h4>
                          <span className="text-[10px] font-mono text-[#003049]/70 block uppercase tracking-wider font-semibold">
                            {stage.phase}
                          </span>
                        </div>

                        <span
                          className={`px-2.5 py-0.5 rounded text-[10.5px] font-mono font-bold shrink-0 transition-colors ${
                            isActive
                              ? "bg-[#ff5500] text-white"
                              : "bg-[#003049]/5 text-[#003049] group-hover:bg-[#ff5500]/10 group-hover:text-[#ff5500] border border-[#003049]/10"
                          }`}
                        >
                          {stage.standardCode}
                        </span>
                      </div>

                      {/* 2-Column Specifications (High-contrast dark text, no starting dots) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5 pt-3 text-xs font-sans">
                        {/* Col 1 */}
                        <div className="space-y-1">
                          <div className="text-[#003049] font-medium leading-snug line-clamp-1">
                            {stage.tagline}
                          </div>
                          <div className="text-[11.5px] font-mono text-[#003049] truncate font-medium">
                            Standard: {stage.standardCode} Verified
                          </div>
                        </div>

                        {/* Col 2 */}
                        <div className="space-y-1">
                          <div className="font-semibold text-[#003049] leading-snug truncate">
                            {stage.benchmark}
                          </div>
                          <div className="text-[11.5px] font-mono text-[#003049] truncate font-medium">
                            System: {stage.equipment}
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}

            </div>

          </div>

          {/* Bottom Compliance & Technical Dossier Action Bar */}
          <div className="p-5 sm:p-6 bg-white border border-[#6c757d] rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#ff5500] block">
                OFFICIAL ARCHITECTURAL CERTIFICATIONS
              </span>
              <p className="text-xs font-mono text-[#555555]">
                Full ASTM C170, ASTM C97, ISPM-15, and ISO 9001:2015 laboratory reports available for all export consignments.
              </p>
            </div>

            <Link
              href="/export"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#252422] hover:bg-[#ff5500] text-white text-xs font-mono uppercase tracking-wider font-bold rounded-[4px] transition-all duration-300 shadow-sm hover:shadow-md flex-none cursor-pointer"
            >
              <span>Request ASTM Test Dossier</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
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
              {QUALITY_METRICS.map((metric, idx) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
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
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── GLOBAL STATUTORY COMPLIANCE & ACCREDITATION SEALS (COMPACT COCKPIT DECK SECTION) ── */}
          <div className="space-y-6 pt-6 sm:pt-8 border-t border-[#003049]/15">
            {/* Header */}
            <div className="space-y-1.5 max-w-2xl text-center mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#ff5500] font-bold block">
                Statutory Compliance &amp; Global Accreditations
              </span>
              <h3 className="font-display font-light text-xl sm:text-2xl md:text-3xl text-[#003049]">
                Official Architectural <span className="font-normal text-[#ff5500]">Trust Crests &amp; Seals</span>
              </h3>
              <p className="text-xs text-[#003049]/70 font-light leading-relaxed max-w-xl mx-auto">
                All quarry consignments strictly comply with international building codes, load-bearing engineering benchmarks, and eco-certified green standards.
              </p>
            </div>

            {/* ── 3-TIER COCKPIT DECK (COMPACT SECTION PROFILE - AUTO FLOWING IN LOOP) ── */}
            <div
              onMouseEnter={() => setIsCrestPaused(true)}
              onMouseLeave={() => setIsCrestPaused(false)}
              className="max-w-3xl mx-auto space-y-2.5"
            >
              
              {/* 1. TOP CAPSULE (PREVIOUS ACCREDITATION) */}
              <motion.button
                onClick={() => setActiveCrestIdx(prevCrestIdx)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full max-w-md sm:max-w-lg mx-auto h-9 sm:h-10 px-4 sm:px-5 rounded-[5px] bg-white border border-[#003049]/15 hover:border-[#ff5500] shadow-xs hover:shadow-sm transition-all duration-300 flex items-center justify-between group cursor-pointer"
              >
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs font-sans font-medium text-[#003049] group-hover:text-[#ff5500] truncate transition-colors">
                    {prevCrest.standard}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#003049]/50 group-hover:text-[#003049]/80 shrink-0 ml-2">
                  {prevCrest.statPrimaryValue}
                </div>
              </motion.button>

              {/* 2. MAIN CENTER COCKPIT CARD (ACTIVE ACCREDITATION - 5PX RADIUS) */}
              <div className="relative w-full rounded-[5px] bg-white border border-[#003049]/15 shadow-md p-4 sm:p-5 lg:p-6 overflow-hidden">
                {/* Auto-Flow Loop Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#003049]/5 overflow-hidden z-20">
                  <motion.div
                    key={`${activeCrest.id}-${isCrestPaused}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: isCrestPaused ? 0 : 4,
                      ease: "linear",
                    }}
                    className="h-full bg-gradient-to-r from-[#00e5ff] via-[#ff5500] to-[#00e5ff]"
                  />
                </div>

                {/* Ambient Subtle Architectural Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f8fafc]/70 to-[#003049]/[0.02] pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCrest.id}
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.99 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 space-y-3.5 sm:space-y-4"
                  >
                    {/* Top Row: Title (Left) | Next Step Button (Right) — Audit pass gauge removed as requested */}
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#003049]/10">
                      
                      {/* Left: Standard Title */}
                      <div className="min-w-0">
                        <h4 className="font-display font-medium text-base sm:text-lg text-[#003049] tracking-tight leading-snug truncate">
                          {activeCrest.standard}
                        </h4>
                        <span className="text-[10px] font-mono text-[#003049]/60 block truncate">
                          {activeCrest.category} · {activeCrest.code}
                        </span>
                      </div>

                      {/* Right: Next Step Button (Border removed as requested) */}
                      <button
                        onClick={() => setActiveCrestIdx(nextCrestIdx)}
                        className="inline-flex items-center gap-1.5 px-2 py-1 hover:text-[#ff5500] text-[10.5px] font-sans uppercase font-bold tracking-wider text-[#003049] transition-colors duration-300 group cursor-pointer shrink-0"
                      >
                        <span>Next Step</span>
                        <Play className="w-2.5 h-2.5 fill-current text-[#003049] group-hover:text-[#ff5500] transition-colors" />
                      </button>
                    </div>

                    {/* Stats Row: Distance / Time Equivalent (Split Major Metrics) */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-4 pt-1">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#003049]/60 font-semibold block">
                          {activeCrest.statPrimaryLabel}
                        </span>
                        <div className="font-display font-light text-2xl sm:text-3xl text-[#003049] tracking-tight leading-none">
                          {activeCrest.statPrimaryValue}
                        </div>
                      </div>

                      <div className="space-y-0.5 sm:text-right">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#003049]/60 font-semibold block">
                          {activeCrest.statSecondaryLabel}
                        </span>
                        <div className="font-display font-light text-lg sm:text-xl text-[#003049] tracking-tight leading-none">
                          {activeCrest.statSecondaryValue}
                        </div>
                      </div>
                    </div>

                    {/* Mid Perspective Runway & Landmark Badges (Low-Profile, 5px radius) */}
                    <div className="relative py-1 sm:py-1.5">
                      {/* Flanking Signpost Badges */}
                      <div className="flex items-center justify-between text-xs font-mono text-[#003049]/70 mb-1.5 px-1">
                        {/* Left Signpost */}
                        <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-[#003049]/10 rounded-[5px] px-2.5 py-1 shadow-2xs">
                          <span className="w-4 h-4 rounded-[3px] bg-[#003049]/5 flex items-center justify-center font-bold text-[#ff5500] text-[10px]">
                            ⑂
                          </span>
                          <span className="text-[10.5px] truncate max-w-[140px] sm:max-w-none">
                            {activeCrest.milestone1}
                          </span>
                        </div>

                        {/* Center Path Label */}
                        <div className="text-[9.5px] font-mono uppercase tracking-widest text-[#003049]/40 hidden sm:block">
                          Direct Quarry-To-Crate Highway
                        </div>

                        {/* Right Speed/Code Badge */}
                        <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-[#003049]/10 rounded-[5px] px-2.5 py-1 shadow-2xs">
                          <span className="w-5 h-4 rounded-[3px] bg-[#00e5ff]/15 border border-[#00e5ff]/30 text-[#003049] font-bold text-[9px] flex items-center justify-center">
                            {activeCrest.sigil}
                          </span>
                          <span className="text-[10.5px] truncate max-w-[140px] sm:max-w-none font-semibold text-[#003049]">
                            {activeCrest.milestone2}
                          </span>
                        </div>
                      </div>

                      {/* Perspective Center Track Road (Height compressed from h-24 to h-11) */}
                      <div className="relative w-40 sm:w-52 h-10 sm:h-11 mx-auto flex items-center justify-center">
                        {/* Road Trapezoid (Perspective Surface) */}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-[#003049]/10 via-[#003049]/5 to-transparent border-x border-[#003049]/20 shadow-inner"
                          style={{
                            clipPath: "polygon(22% 0%, 78% 0%, 100% 100%, 0% 100%)",
                          }}
                        />

                        {/* Road Center Dashed Line */}
                        <div className="absolute top-0 bottom-0 w-0.5 border-r border-dashed border-[#003049]/25 z-0" />

                        {/* Animated Directional Beacon */}
                        <motion.div
                          animate={{ y: [2, -2, 2] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="relative z-10 w-7 h-7 rounded-[5px] bg-gradient-to-tr from-[#ff5500] to-[#ff7700] text-white flex items-center justify-center shadow-md shadow-[#ff5500]/25"
                        >
                          <ArrowRight className="w-4 h-4 -rotate-90 fill-current" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Bottom Row: Accent Indicator Milestones */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2.5 border-t border-[#003049]/10">
                      
                      {/* Left: Milestones with Accent Vertical Line */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-1 h-4 rounded-full bg-[#ff5500] shrink-0" />
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-sans">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[#003049]/50 font-mono text-[10px] uppercase tracking-wider shrink-0">
                              Active Standard:
                            </span>
                            <span className="font-semibold text-[#003049] text-[11px] sm:text-xs">
                              {activeCrest.activeCheckpoint}
                            </span>
                          </div>
                          <span className="text-[#003049]/25 hidden sm:inline">•</span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[#003049]/50 font-mono text-[10px] uppercase tracking-wider shrink-0">
                              Next Audit:
                            </span>
                            <span className="text-[#003049]/70 font-mono text-[10.5px]">
                              {activeCrest.nextAudit}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Live Verification Badge (Dot removed as requested) */}
                      <div className="text-[10px] font-mono text-[#003049]/50 shrink-0 self-end sm:self-center">
                        <span>Factory Calibrated</span>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 3. BOTTOM CAPSULE (NEXT ACCREDITATION - 5PX RADIUS) */}
              <motion.button
                onClick={() => setActiveCrestIdx(nextCrestIdx)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full max-w-md sm:max-w-lg mx-auto h-9 sm:h-10 px-4 sm:px-5 rounded-[5px] bg-white border border-[#003049]/15 hover:border-[#ff5500] shadow-xs hover:shadow-sm transition-all duration-300 flex items-center justify-between group cursor-pointer"
              >
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs font-sans font-medium text-[#003049] group-hover:text-[#ff5500] truncate transition-colors">
                    {nextCrest.standard}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#003049]/50 group-hover:text-[#003049]/80 shrink-0 ml-2">
                  {nextCrest.statPrimaryValue}
                </div>
              </motion.button>

              {/* 4. FAST JUMP SELECTOR BAR (5 STANDARDS QUICK ACCESS - 5PX RADIUS) */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {ACCREDITATION_DOSSIER.map((item, idx) => {
                  const isActive = activeCrestIdx === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveCrestIdx(idx)}
                      className={`px-3 py-1 rounded-[5px] text-[11px] font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? "bg-[#003049] text-white shadow-xs font-bold"
                          : "bg-white border border-[#003049]/15 text-[#003049]/70 hover:border-[#ff5500] hover:text-[#ff5500]"
                      }`}
                    >
                      <span className={isActive ? "text-[#00e5ff]" : "text-[#003049]/40"}>
                        0{idx + 1}
                      </span>
                      <span>{item.sigil}</span>
                    </button>
                  );
                })}
              </div>

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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 flex-none items-stretch sm:items-center lg:items-end">
                <Link
                  href="/request-sample"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-[4px] bg-[#241919] hover:bg-[#ff5500] text-white text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] shadow-sm cursor-pointer group text-center"
                >
                  <span>Request Certified Test Reports</span>
                  <ArrowRight className="w-4 h-4 text-[#ff5500] group-hover:text-white transition-colors" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[4px] bg-white hover:bg-[#747474]/8 text-[#241919] hover:text-[#ff5500] text-xs font-mono uppercase tracking-wider font-bold border border-[#747474]/20 hover:border-[#ff5500]/40 transition-all duration-300 text-center"
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
