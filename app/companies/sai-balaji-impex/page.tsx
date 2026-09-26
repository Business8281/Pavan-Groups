"use client";
import { use, useState, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RangeCarousel from "@/components/RangeCarousel";
import DimensionalMatrix from "@/components/DimensionalMatrix";
import CompanyEditorialShowcase from "@/components/CompanyEditorialShowcase";
import { SAI_BALAJI_IMPEX_EDITORIAL_DATA } from "@/lib/companyEditorialData";
import { scrollToHash } from "@/components/SmoothScroll";

interface ProductDetail {
  id: string;
  name: string;
  colors: string[];
  description: string;
  finishes: string[];
  gradient: string;
  recommendedUse: string;
  slipRating?: string;
  heatResistance?: string;
  image?: string;
}

interface FinishInfo {
  name: string;
  texture: string;
  reflectivity: string;
  slipRating: string;
  bestFor: string;
  icon: string;
}

interface CompanyData {
  slug: string;
  num: string;
  code: string;
  name: string;
  tagline: string;
  divisionName: string;
  speciality: string;
  established: string;
  location: string;
  coordinates: string;
  accentColor: string;
  overview: string[];
  geologyStory: {
    title: string;
    description: string;
    points: string[];
  };
  products: ProductDetail[];
  finishesGuide: FinishInfo[];
  specifications: {
    thicknessesMetric: string[];
    thicknessesImperial: string[];
    standardSizesMetric: string[];
    standardSizesImperial: string[];
    densityMetric: string;
    densityImperial: string;
    waterAbsorption: string;
    compressiveStrengthMetric: string;
    compressiveStrengthImperial: string;
    exportStandards: string;
  };
  applications: {
    title: string;
    category: string;
    desc: string;
  }[];
  packaging: {
    crateType: string;
    safetyFeatures: string[];
    capacity: string;
    avgWeightPerSqm20mm: number; // kg
  };
}

const COMPANIES_DATABASE: Record<string, CompanyData> = {
  "pavan-impex": {
    slug: "pavan-impex",
    num: "01",
    code: "PI-SLATE",
    name: "Pavan Impex",
    tagline: "Natural Stone Exports — Slate & Wall Cladding",
    divisionName: "Natural Stone Exports Division",
    speciality: "Slate Stones & 3D Cladding Panels",
    established: "2000",
    location: "Markapur Quarry Belt, Prakasam District, Andhra Pradesh, India",
    coordinates: "15.7362° N · 79.2713° E · MARKAPUR",
    accentColor: "#3e352a",
    overview: [
      "Slate is a natural stone with rich texture and layers. It is quarried in Markapur and processed into tiles, ledgers, and mosaic pieces. It is the most popular stone for wall cladding and elevations worldwide."
    ],
    geologyStory: {
      title: "The Markapur Slate Formation",
      description:
        "The Markapur slate belt in Andhra Pradesh is geologically celebrated as one of India's richest metamorphic stone reserves. Formed hundreds of millions of years ago through intense regional metamorphism of clay-rich sedimentary shale, this stone boasts exceptional structural integrity, zero porosity under weathering, and natural thermal insulation.",
      points: [
        "100% ethically sourced from licensed quarry faces in Markapur.",
        "Natural foliated grain provides superior tensile resistance.",
        "Zero chemical bleaching or artificial coloring — organic mineral pigments only.",
        "Naturally fire-resistant, frost-proof, and resilient against acid rain.",
      ],
    },
    finishesGuide: [
      {
        name: "Natural Cleft",
        texture: "Organic riven tactile surface with natural stratum relief",
        reflectivity: "Low Matte (Non-Reflective)",
        slipRating: "R12 (High Grip)",
        bestFor: "Exterior Facades, Accent Elevations & Feature Walls",
        icon: "⬡",
      },
      {
        name: "Calibrated Rear",
        texture: "Precision diamond-sawn back face for uniform adhesive bonding",
        reflectivity: "Machined Standard",
        slipRating: "N/A (Bonding Surface)",
        bestFor: "Fast, uniform thin-set mortar installation",
        icon: "◈",
      },
      {
        name: "Honed",
        texture: "Smooth satin matte finish with subtle stone grain clarity",
        reflectivity: "Semi-Matte Velvet",
        slipRating: "R10 (Comfort Non-Slip)",
        bestFor: "Interior Flooring, Hallways & Bathroom Walls",
        icon: "◎",
      },
      {
        name: "Tumbled Rustic",
        texture: "Softened antiqued edges and rounded corners",
        reflectivity: "Matte Organic",
        slipRating: "R11 (Slip-Resistant)",
        bestFor: "Courtyards, Garden Verandas & Heritage Patios",
        icon: "✦",
      },
    ],
    products: [
      {
        id: "black-slate-stone",
        name: "Black Slate Stone",
        colors: ["Black", "Dark Grey", "Charcoal"],
        description: "Classic dark, bold look. Most popular for modern homes, feature walls, exterior elevations.",
        finishes: ["Natural Cleft", "Calibrated Bottom", "Honed", "Tumbled"],
        gradient: "linear-gradient(135deg, #1c1f24 0%, #2a2d34 50%, #15171a 100%)",
        recommendedUse: "Classic dark, bold look. Most popular for modern homes, feature walls, exterior elevations.",
        slipRating: "R12",
        heatResistance: "Class A1 Fireproof",
      },
      {
        id: "indian-autumn-slate",
        name: "Indian Autumn Slate",
        colors: ["Brown", "Rust", "Copper", "Golden Shades"],
        description: "Warm earthy tones. Gives a rustic, natural feel. Great for farmhouses, garden walls, villas.",
        finishes: ["Hand-Split", "Tumbled", "Natural Layered"],
        gradient: "linear-gradient(135deg, #5a3424 0%, #874e31 50%, #3e2417 100%)",
        recommendedUse: "Warm earthy tones. Gives a rustic, natural feel. Great for farmhouses, garden walls, villas.",
        slipRating: "R11",
        heatResistance: "Class A1 Fireproof",
      },
      {
        id: "california-gold-slate",
        name: "California Gold Slate",
        colors: ["Gold", "Brown", "Rust", "Earthy Tones"],
        description: "Premium golden appearance. Ideal for hotels, resorts, and luxury residential projects.",
        finishes: ["Golden Sparkle", "Riven Surface", "Calibrated"],
        gradient: "linear-gradient(135deg, #7a5423 0%, #a47638 50%, #4f3414 100%)",
        recommendedUse: "Premium golden appearance. Ideal for hotels, resorts, and luxury residential projects.",
        slipRating: "R11",
        heatResistance: "Class A1 Fireproof",
      },
      {
        id: "black-slate-mosaic",
        name: "Black Slate Mosaic",
        colors: ["Black", "Charcoal Grey"],
        description: "Small pieces arranged in patterns. Decorative use for accent walls, pool surrounds, feature areas.",
        finishes: ["Interlocking Z-Shape", "Mesh Mounted", "3D Riven Relief"],
        gradient: "linear-gradient(135deg, #18191c 0%, #2e3036 40%, #121316 100%)",
        recommendedUse: "Small pieces arranged in patterns. Decorative use for accent walls, pool surrounds, feature areas.",
        slipRating: "3D Textured",
        heatResistance: "Class A1 Fireproof",
      },
    ],
    specifications: {
      thicknessesMetric: ["12mm", "15mm", "18mm", "20mm"],
      thicknessesImperial: ["1/2 in", "5/8 in", "3/4 in", "13/16 in"],
      standardSizesMetric: ["300 x 300 mm", "600 x 300 mm", "600 x 600 mm", "1200 x 600 mm", "Random Sizes", "Ledgers"],
      standardSizesImperial: ["1x1 ft", "2x1 ft", "2x2 ft", "2x4 ft", "Random Sizes", "Ledgers"],
      densityMetric: "2,750 kg/m³",
      densityImperial: "171.7 lbs/ft³",
      waterAbsorption: "< 0.30% (Zero Porosity Standard)",
      compressiveStrengthMetric: "165 MPa",
      compressiveStrengthImperial: "23,930 psi",
      exportStandards: "ISO 9001:2015 Certified · Fumigated ISPM-15 Hardwood Packing",
    },
    applications: [
      {
        title: "Exterior Wall Cladding & Elevation Designs",
        category: "Exterior Facade",
        desc: "Ideal for modern homes and commercial building elevations.",
      },
      {
        title: "Flooring (indoor & outdoor)",
        category: "Durable Paving",
        desc: "Perfect for robust, heavy-traffic floors spanning indoors to outdoor patios.",
      },
      {
        title: "Garden Landscaping & Waterfalls",
        category: "Landscape & Water",
        desc: "Natural resistance to water and weathering makes it excellent for landscaping.",
      },
      {
        title: "Feature Walls",
        category: "Interior Luxury",
        desc: "Creates stunning rustic or contemporary focal points in living spaces.",
      },
      {
        title: "Farmhouses, Hotels & Resorts",
        category: "Hospitality & Residential",
        desc: "Adds a premium natural touch to luxury resorts, farmhouses, and hotels.",
      },
    ],
    packaging: {
      crateType: "Heavy-Duty ISPM-15 Fumigated Pine & Hardwood Crates",
      safetyFeatures: ["High-density foam separation", "Plastic water-repellent shrink wrap", "Steel band strapping"],
      capacity: "20-Foot FCL Container (Approx. 750 to 900 sqm of 15mm slate)",
      avgWeightPerSqm20mm: 55, // 55 kg per sqm for 20mm
    },
  },

  "sai-balaji-impex": {
    slug: "sai-balaji-impex",
    num: "02",
    code: "SBI-LIMESTONE",
    name: "Sai Balaji Impex",
    tagline: "Limestone Products",
    divisionName: "Limestone & Precision Paver Division",
    speciality: "Dense Calcareous Limestone & Anti-Skid Pavers",
    established: "1998",
    location: "Markapur & Cuddapah Basin, Andhra Pradesh, India",
    coordinates: "14.4752° N · 78.8260° E · CUDDAPAH",
    accentColor: "#514a38",
    overview: [
      "Limestone is a durable outdoor stone known for its anti-skid surface — making it perfect for areas around swimming pools, pathways, and driveways. It handles Australian outdoor conditions extremely well."
    ],
    geologyStory: {
      title: "The Cuddapah Calcrete Formations",
      description:
        "The Cuddapah basin hosts some of the world's most resilient microcrystalline limestone deposits. Unlike soft chalky limestones, our stones have undergone billions of years of compression, resulting in an ultra-hard, non-porous matrix that is naturally resistant to saltwater, pool chlorine, and freeze-thaw cycles.",
      points: [
        "Micro-textured surface provides natural anti-skid grip (R11 safety rating).",
        "Low solar absorption coefficient — stays significantly cooler than concrete or granite under harsh sun.",
        "Resistant to efflorescence and chemical weathering.",
        "Ideal for saltwater pools and high-moisture exterior environments.",
      ],
    },
    finishesGuide: [
      {
        name: "Natural Non-Slip",
        texture: "Fine grain non-slip surface with subtle natural texture",
        reflectivity: "Natural Matte",
        slipRating: "R11 (Wet Area Rated)",
        bestFor: "Swimming Pool Surrounds, Patios & Alfresco Verandas",
        icon: "⬡",
      },
      {
        name: "Tumbled Antique",
        texture: "Drum-tumbled weathered edges with historic cobble charm",
        reflectivity: "Soft Matte",
        slipRating: "R11 (Slip-Resistant)",
        bestFor: "Driveways, Heritage Walkways & Courtyards",
        icon: "◈",
      },
      {
        name: "Honed Smooth",
        texture: "Silky flat matte surface with zero gloss reflections",
        reflectivity: "Satin Smooth",
        slipRating: "R10 (Pedestrian Standard)",
        bestFor: "Interior Flooring, Kitchens & Corridors",
        icon: "◎",
      },
      {
        name: "Hand-Chiseled",
        texture: "Dressed edges for rugged architectural strength",
        reflectivity: "Rustic Texture",
        slipRating: "R12 (High Grip)",
        bestFor: "Stepping Stones, Garden Curbs & Retaining Edges",
        icon: "✦",
      },
    ],
    products: [
      {
        id: "cuddapah-black-limestone",
        name: "Cuddapah Black Limestone",
        colors: ["Black", "Dark Grey"],
        description: "Dark, premium-looking stone. Heavy-duty outdoor flooring, parking, commercial areas.",
        finishes: ["Natural", "Honed", "Tumbled", "Flamed"],
        gradient: "linear-gradient(135deg, #1b1d20 0%, #2b2e33 50%, #111214 100%)",
        recommendedUse: "Dark, premium-looking stone. Heavy-duty outdoor flooring, parking, commercial areas.",
        slipRating: "R11 Anti-Skid",
        heatResistance: "Cool Underfoot",
      },
      {
        id: "lime-yellow-limestone",
        name: "Lime Yellow Limestone",
        colors: ["Yellow", "Beige"],
        description: "Bright, warm tones. Cheerful look for garden paths, walkways, and outdoor entertaining areas.",
        finishes: ["Brushed", "Antiqued", "Calibrated"],
        gradient: "linear-gradient(135deg, #8a733e 0%, #b39a58 50%, #5d4d27 100%)",
        recommendedUse: "Bright, warm tones. Cheerful look for garden paths, walkways, and outdoor entertaining areas.",
        slipRating: "R11 Anti-Skid",
        heatResistance: "Low Solar Absorption",
      },
      {
        id: "lime-blue-limestone",
        name: "Lime Blue Limestone",
        colors: ["Blue Grey", "Ash Grey"],
        description: "Cool, sophisticated tones. Popular for pool surrounds, modern landscapes.",
        finishes: ["Cobbled", "Calibrated Tiles", "Flamed"],
        gradient: "linear-gradient(135deg, #37424d 0%, #536374 50%, #232a31 100%)",
        recommendedUse: "Cool, sophisticated tones. Popular for pool surrounds, modern landscapes.",
        slipRating: "R11 Anti-Skid",
        heatResistance: "High UV Reflectance",
      },
      {
        id: "limestone-pavers",
        name: "Limestone Pavers",
        colors: ["Natural Stone"],
        description: "Pre-cut paving pieces. Anti-skid surface, ideal for driveways, parking areas, pathways.",
        finishes: ["Tumbled Edges", "Hand-Chiseled", "Flamed Heavy Duty"],
        gradient: "linear-gradient(135deg, #444b54 0%, #616b77 50%, #2d333b 100%)",
        recommendedUse: "Pre-cut paving pieces. Anti-skid surface, ideal for driveways, parking areas, pathways.",
        slipRating: "R12 Vehicular Grade",
        heatResistance: "Heavy Load Compressive",
      },
      {
        id: "stepping-stones",
        name: "Stepping Stones",
        colors: ["Natural Landscape"],
        description: "Individual stones placed in gardens for walking paths. Decorative and functional.",
        finishes: ["Natural Riven Top", "Hand-Dressed Edges"],
        gradient: "linear-gradient(135deg, #534c44 0%, #766d62 50%, #3a342d 100%)",
        recommendedUse: "Individual stones placed in gardens for walking paths. Decorative and functional.",
        slipRating: "R12 Landscape",
        heatResistance: "Weatherproof",
      },
    ],
    specifications: {
      thicknessesMetric: ["15mm", "18mm", "20mm", "25mm"],
      thicknessesImperial: ["5/8 in", "3/4 in", "13/16 in", "1 in"],
      standardSizesMetric: ["300 x 300 mm", "600 x 300 mm", "600 x 600 mm", "Pavers", "Stepping Stones", "Custom Sizes"],
      standardSizesImperial: ["1x1 ft", "2x1 ft", "2x2 ft", "Pavers", "Stepping Stones", "Custom Sizes"],
      densityMetric: "2,650 kg/m³",
      densityImperial: "165.4 lbs/ft³",
      waterAbsorption: "< 0.40%",
      compressiveStrengthMetric: "145 MPa",
      compressiveStrengthImperial: "21,030 psi",
      exportStandards: "Tested & Certified for Australian & European Slip Resistance Standards",
    },
    applications: [
      {
        title: "Outdoor Flooring & Parking Areas",
        category: "Vehicular Load",
        desc: "High-compressive calibrated pavers capable of bearing continuous vehicle traffic.",
      },
      {
        title: "Walkways & Garden Pathways",
        category: "Pedestrian Landscaping",
        desc: "Durable stepping paths and courtyard surfaces that age gracefully.",
      },
      {
        title: "Swimming Pool Areas (anti-skid surface — very important for safety)",
        category: "Wet Area Non-Slip",
        desc: "Certified anti-skid surfaces that remain safe and cool around pools.",
      },
      {
        title: "Farmhouses & Landscape Projects",
        category: "Hospitality & Heritage",
        desc: "Tumbled antique limestone for boutique hotels, farmhouses, and heritage restorations.",
      },
    ],
    packaging: {
      crateType: "Hardwood Export Crates with Corner Reinforcements",
      safetyFeatures: ["Polyethylene sheet wrapping", "Desiccant moisture absorbers", "Heavy strapping"],
      capacity: "20-Foot FCL Container (Approx. 650 to 800 sqm of 20mm limestone)",
      avgWeightPerSqm20mm: 53, // 53 kg per sqm for 20mm
    },
  },

  "pavan-granite": {
    slug: "pavan-granite",
    num: "03",
    code: "PG-GRANITE",
    name: "Pavan Granite",
    tagline: "Premium Granite",
    divisionName: "Premium Monolithic Granite Processing Division",
    speciality: "Black Galaxy & Monolithic Gangsaw Slabs",
    established: "2002",
    location: "Chimakurthy & Markapur Processing Units, Andhra Pradesh, India",
    coordinates: "15.4290° N · 79.8640° E · CHIMAKURTHY",
    accentColor: "#241919",
    overview: [
      "Granite is one of the hardest natural stones on Earth. It is polished to a mirror-like finish and is the top choice for kitchen countertops, commercial spaces, and luxury interiors."
    ],
    geologyStory: {
      title: "Chimakurthy's Precambrian Igneous Formations",
      description:
        "Formed over 1.6 billion years ago during the Proterozoic eon, Black Galaxy granite is a rare pyroxenite gabbro. Deep within the Earth's crust, slow cooling permitted the crystallisation of Enstatite and Bronzite ((Mg,Fe)SiO3) minerals, creating golden and silver metallic flakes that produce a 3D starry sky effect under ambient lighting.",
      points: [
        "Zero porosity crystal lattice — highly impervious to oil, wine, and acidic kitchen stains.",
        "Mohs hardness of 6.5 to 7.0 — virtually scratch-proof under normal cutlery use.",
        "Withstands extreme heat up to 800°C without cracking or discoloration.",
        "90+ Mirror gloss level achieved through 16-head diamond polishing lines without epoxy resin coatings.",
      ],
    },
    finishesGuide: [
      {
        name: "Mirror Diamond Polish",
        texture: "Flawless glass-smooth surface with 90+ gloss reflectivity",
        reflectivity: "90+ High Gloss Mirror",
        slipRating: "Polished Interior",
        bestFor: "Kitchen Countertops, Island Benches & Hotel Lobbies",
        icon: "✦",
      },
      {
        name: "Leathered / Satin Touch",
        texture: "Textured tactile satin finish with closed pores and soft sheen",
        reflectivity: "Silky Low Sheen",
        slipRating: "R10 (Comfort Grip)",
        bestFor: "Contemporary Kitchen Islands & Vanity Tops",
        icon: "◈",
      },
      {
        name: "Honed Matte",
        texture: "Velvety smooth non-reflective matte finish",
        reflectivity: "Ultra Matte",
        slipRating: "R10 (Pedestrian Standard)",
        bestFor: "High-Traffic Commercial Flooring & Wall Panels",
        icon: "◎",
      },
      {
        name: "Flamed / Thermal",
        texture: "High-temperature thermal shock surface with rugged crystalline texture",
        reflectivity: "Zero Reflectivity",
        slipRating: "R12 (High Grip)",
        bestFor: "Exterior Paving, Stair Treads & Public Plazas",
        icon: "⬡",
      },
    ],
    products: [
      {
        id: "black-galaxy-granite",
        name: "Black Galaxy Granite",
        colors: ["Deep Black background with Golden & Silver Speckles"],
        description: "The most prestigious granite variety from India. Stunning in kitchens, hotel lobbies, staircases. Gives a luxury, high-end finish unlike anything else.",
        finishes: ["Mirror Polish (95+ Gloss)", "Leathered Satin", "Honed Matte"],
        gradient: "linear-gradient(135deg, #0d0e10 0%, #24221c 50%, #08090a 100%)",
        recommendedUse: "The most prestigious granite variety from India. Stunning in kitchens, hotel lobbies, staircases. Gives a luxury, high-end finish unlike anything else.",
        slipRating: "95+ Gloss",
        heatResistance: "800°C Heat Proof",
      },
    ],
    specifications: {
      thicknessesMetric: ["16mm", "18mm", "20mm", "30mm"],
      thicknessesImperial: ["5/8 in", "3/4 in", "13/16 in", "1 3/16 in"],
      standardSizesMetric: [
        "240x90 cm Slabs",
        "270x120 cm Slabs",
        "30x30 cm Tiles",
        "60x60 cm Tiles",
        "Custom"
      ],
      standardSizesImperial: [
        "8x3 ft Slabs",
        "9x4 ft Slabs",
        "1x1 ft Tiles",
        "2x2 ft Tiles",
        "Custom"
      ],
      densityMetric: "2,980 kg/m³",
      densityImperial: "186.0 lbs/ft³",
      waterAbsorption: "0.08% (Virtually Zero Absorption)",
      compressiveStrengthMetric: "215 MPa",
      compressiveStrengthImperial: "31,180 psi",
      exportStandards: "ISO 9001:2015 · Slab-by-Slab Photologging & Thickness Calibration",
    },
    applications: [
      {
        title: "Kitchen Countertops (most popular use)",
        category: "Culinary Luxury",
        desc: "Heat-proof, scratch-proof, zero-porosity work surfaces.",
      },
      {
        title: "Flooring & Staircases",
        category: "Structural Elegance",
        desc: "Mirror-finish high-traffic flooring that maintains deep gloss over decades.",
      },
      {
        title: "Wall Cladding (interior)",
        category: "Interior Design",
        desc: "Stunning feature walls with celestial starry appearance.",
      },
      {
        title: "Hotel & Commercial Interiors",
        category: "Prestige Spaces",
        desc: "Luxury reception desks and monumental elevator surrounds.",
      },
      {
        title: "Table Tops",
        category: "Furniture & Decor",
        desc: "Durable and elegant custom dining and coffee tables.",
      },
    ],
    packaging: {
      crateType: "Heavy-Duty A-Frames and Closed Hardwood Bundle Boxes",
      safetyFeatures: ["Plastic film interleafing between slabs", "Timber bracing inside container", "Rubber padding"],
      capacity: "20-Foot FCL Container (Approx. 400 to 500 sqm of 20mm slabs)",
      avgWeightPerSqm20mm: 60, // 60 kg per sqm for 20mm
    },
  },

  "pavan-stones-world": {
    slug: "pavan-stones-world",
    num: "04",
    code: "PSW-WORLD",
    name: "Pavan Stones World",
    tagline: "Architectural Exotic Stones — Rare Quartzites, Marbles & Artifacts",
    divisionName: "Global Architectural Stone & Curation Division",
    speciality: "Exotic Quartzite, Calcitic Marble & Bespoke Murals",
    established: "2008",
    location: "Global Architectural Hub, Andhra Pradesh, India",
    coordinates: "15.6521° N · 79.4312° E · GLOBAL HUB",
    accentColor: "#722424",
    overview: [
      "Pavan Stones World curates the world's most breathtaking exotic stones, crystalline quartzites, legendary calcitic marbles, and bespoke stone murals for visionary architects and landmark projects worldwide."
    ],
    geologyStory: {
      title: "Crystalline Metamorphism & Global Mineral Reserves",
      description:
        "Specializing in high-pressure metamorphic quartzites and pristine calcitic marbles, Pavan Stones World bridges sovereign quarry belts with visionary architecture.",
      points: [
        "Metamorphic quartz formations boasting 7.0+ Mohs hardness.",
        "Natural crystalline light-translucency engineered for backlit installations.",
        "100% natural mineral provenance — zero artificial dye infill.",
        "Precision robotic 5-axis waterjet cutting and laser-guided digital bookmatching.",
      ],
    },
    finishesGuide: [
      {
        name: "Diamond Mirror Polish",
        texture: "High-gloss crystalline reflective surface enhancing rich mineral veins",
        reflectivity: "95+ Diamond Gloss",
        slipRating: "Interior Architectural",
        bestFor: "Backlit Reception Walls, Kitchen Islands & Master Bath Suites",
        icon: "✦",
      },
      {
        name: "Leathered Satin",
        texture: "Organic tactile relief following the natural mineral contours of the stone",
        reflectivity: "Silky Velvet Low-Sheen",
        slipRating: "R10 (Comfort Non-Slip)",
        bestFor: "Contemporary Living Spaces, Vanity Tops & Bar Counters",
        icon: "◈",
      },
    ],
    products: [
      {
        id: "cuddapah-black-limestone",
        name: "Cuddapah Midnight Black Natural Limestone",
        colors: ["Jet Black", "Charcoal Mist", "Velvet Black"],
        description: "Quarried exclusively by Sai Balaji Impex from our certified Cuddapah reserves, celebrated worldwide for dense non-porous structure and velvety honed tactile finish.",
        finishes: ["Honed Velvet", "Natural Cleft", "Tumbled Antique", "Brushed Leather"],
        gradient: "linear-gradient(135deg, #111215 0%, #1e2025 50%, #0a0b0d 100%)",
        recommendedUse: "Residential flooring, pool surrounds, commercial corridors, and exterior patios.",
        slipRating: "R11 (Honed) / R13 (Tumbled)",
        heatResistance: "Naturally Cool Footfall & Weatherproof",
      },
    ],
    specifications: {
      thicknessesMetric: ["18mm", "20mm", "25mm", "30mm"],
      thicknessesImperial: ["3/4 in", "13/16 in", "1 in", "1 3/16 in"],
      standardSizesMetric: ["Jumbo Gangsaw Slabs (3200x1900 mm)", "Bookmatched Pairs", "1200 x 600 mm"],
      standardSizesImperial: ["10x6 ft Jumbo Slabs", "Bookmatched Pairs", "4x2 ft Slabs"],
      densityMetric: "2,710 kg/m³",
      densityImperial: "169.2 lbs/ft³",
      waterAbsorption: "< 0.06% (Impervious Standard)",
      compressiveStrengthMetric: "230 MPa",
      compressiveStrengthImperial: "33,360 psi",
      exportStandards: "ISO 9001:2015 · Spectroscopic Verification & Laser Vein Alignment",
    },
    applications: [
      {
        title: "Backlit Translucent Quartzite Portals",
        category: "Architectural Radiance",
        desc: "Glowing feature walls and reception desks with custom dimmable LED matrices.",
      },
      {
        title: "Waterfall Culinary Islands & Bar Tops",
        category: "Culinary Luxury",
        desc: "Scratch-proof, acid-proof, and heat-resistant monolithic surfaces.",
      },
    ],
    packaging: {
      crateType: "Armored Heavy-Duty A-Frames and Custom Fumigated Timber Crates",
      safetyFeatures: ["High-density EPE foam encasement", "Plastic interleafing between slabs", "Steel band tensioning"],
      capacity: "20-Foot FCL Container (Approx. 420 to 460 sqm of 20mm slabs)",
      avgWeightPerSqm20mm: 56,
    },
  },
};


export default function CompanyDedicatedPage() {
  const company = COMPANIES_DATABASE["sai-balaji-impex"];

  if (!company) {
    notFound();
  }

  const handleContactScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash("#contact", 1.6);
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <main className="relative bg-[#f2f2f2] min-h-screen text-[#140d0a] selection:bg-[#ff5500] selection:text-white">
      
      {/* ── ANIMATED HERO SECTION (STICKY COVER EFFECT) ── */}
      <section className="sticky top-0 z-0 w-full aspect-video md:aspect-auto md:h-screen min-h-[480px] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#140d0a] pt-[72px]">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.08, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          {/* Stunning Natural Background - Poolside Limestone Landscape */}
          <img
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=2000&q=80"
            alt="SAI BALAJI IMPEX Background"
            className="w-full h-full object-cover object-center opacity-100"
          />
          {/* Subtle Overlay for near original look */}
          <div className="absolute inset-0 bg-black/15" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4">
          <motion.svg
            className="w-[95vw] max-w-6xl mx-auto h-24 sm:h-32 md:h-48"
            viewBox="0 0 1200 300"
            initial="hidden"
            animate="visible"
          >
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-display font-bold text-[70px] sm:text-[90px] md:text-[110px] tracking-[0.2em]"
              fill="rgba(255, 255, 255, 0)"
              stroke="white"
              strokeWidth="1.5"
              initial={{ strokeDasharray: 3000, strokeDashoffset: 3000 }}
              animate={{ 
                strokeDashoffset: 0, 
                fill: "rgba(255, 255, 255, 1)" 
              }}
              transition={{
                strokeDashoffset: { duration: 2.2, delay: 0.3, ease: "easeInOut" },
                fill: { duration: 1.0, delay: 1.6, ease: "easeOut" }
              }}
            >
              SAI BALAJI IMPEX
            </motion.text>
          </motion.svg>

        </div>
      </section>

      {/* ── CONTENT BELOW: ROLLS OVER & COVERS HERO ON SCROLL ── */}
      <div className="relative z-10 bg-white shadow-[0_-30px_70px_-15px_rgba(0,0,0,0.35)]">
        
        {/* ── ABOUT SECTION (LEFT IMAGE, RIGHT TEXT & HEADING) ── */}
        <section id="about" className="py-16 md:py-24 px-6 md:px-14 lg:px-20 bg-white border-b border-[#747474]/15">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* Left: Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181615] rounded-none shadow-lg border border-[#747474]/20">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
                alt="Sai Balaji Impex Architectural Limestone"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Heading & Content */}
            <div className="space-y-6">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#241919] tracking-tight">
                What is this about?
              </h2>

              <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.8] text-[#3a3a3a] font-light">
                <p>
                  Specializing in fine architectural limestone,<br className="hidden sm:inline" />
                  the dedicated team at{" "}
                  <span className="relative inline-block whitespace-nowrap mx-1.5">
                    <span className="relative z-10 font-semibold text-[#140d0a]">Sai Balaji Impex</span>
                    <svg
                      viewBox="0 0 740 460"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                      className="absolute -left-4 -right-8 -top-3 -bottom-1.5 w-[calc(100%+48px)] h-[calc(100%+18px)] pointer-events-none overflow-visible"
                      aria-hidden="true"
                    >
                      <path
                        d="M 719.9,309.7 C 713.7,304.2 714.3,304.2 697.9,290.0 C 681.5,275.8 684.3,279.6 661.4,258.9 C 638.5,238.2 643.4,241.0 616.0,216.0 C 588.6,191.0 596.9,194.0 563.7,169.7 C 530.5,145.4 540.2,146.0 497.5,129.2 C 454.8,112.4 464.0,117.5 411.3,109.8 C 358.6,102.1 368.5,106.8 309.3,101.8 C 250.1,96.8 259.2,89.4 200.0,92.0 C 140.8,94.6 144.9,91.3 97.7,111.1 C 50.5,130.9 54.2,124.9 31.6,162.7 C 9.0,200.5 15.6,203.7 17.1,246.2 C 18.6,288.7 15.9,280.5 37.0,314.6 C 58.1,348.7 53.3,343.0 92.5,368.0 C 131.7,393.0 121.3,386.0 176.9,403.9 C 232.5,421.8 223.0,420.9 291.0,432.1 C 359.0,443.3 352.9,441.1 419.9,444.0 C 486.9,446.9 479.8,447.4 530.3,442.5 C 580.8,437.6 568.8,440.7 600.2,426.6 C 631.6,412.5 624.1,415.2 642.4,392.2 C 660.7,369.2 658.2,371.5 665.4,344.3 C 672.6,317.1 675.1,322.8 668.0,295.0 C 660.9,267.2 661.8,275.9 640.0,245.0 C 618.2,214.1 624.4,216.4 590.2,184.8 C 556.0,153.2 563.4,160.7 518.0,132.0 C 472.6,103.3 482.0,106.9 428.0,82.3 C 374.0,57.7 381.0,60.9 325.0,44.2 C 269.0,27.5 271.9,31.6 227.9,22.6 C 183.9,13.6 184.8,15.0 168.0,12.0"
                        stroke="#ff5500"
                        strokeWidth="2.2"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>{" "}
                  delivers quarry-direct<br className="hidden sm:inline" />
                  natural cleft and calibrated limestone paving, tumbled cobbles, and pool copings to landscape architects and builders across 40+ countries.
                </p>

                <p>
                  Extracted directly from captive quarry deposits in Andhra Pradesh, our Kota Blue, Lime Black, and Tandur Yellow stones are diamond-sawn or hand-dressed to preserve their cool underfoot texture and superior slip resistance in exterior environments.
                </p>

                <p>
                  From calibrated thickness standards to fumigated seaworthy hardwood bundle crating and reliable ocean freight, we provide seamless mine-to-site container deliveries for luxury resorts, civic plazas, and residential landscapes worldwide.
                </p>
              </div>

              <div className="pt-4 border-t border-[#747474]/15 grid grid-cols-3 gap-4">
                <div>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-[#747474]">Core Products</span>
                  <span className="text-xs sm:text-sm font-medium text-[#241919]">Limestone Paving & Copings</span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-[#747474]">Global Footprint</span>
                  <span className="text-xs sm:text-sm font-medium text-[#241919]">40+ Sovereign Nations</span>
                </div>
                <div>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-[#747474]">Quality Standard</span>
                  <span className="text-xs sm:text-sm font-medium text-[#241919]">R11 / R12 Slip Grip</span>
                </div>
              </div>
            </div>

          </div>
        </section>
        
        {/* ── OUR HERITAGE & CRAFTSMANSHIP MONOGRAPH (PURE WHITE BACKGROUND) ── */}
        <CompanyEditorialShowcase data={SAI_BALAJI_IMPEX_EDITORIAL_DATA} />

      {/* ── FULL MATERIAL VARIETIES CATALOGUE ── */}
      <RangeCarousel products={company.products} subtitle="Premium Limestone" />

      <DimensionalMatrix 
        companyName={company.name}
        specifications={company.specifications}
        packaging={company.packaging}
      />

      {/* ── SISTER COMPANIES DEDICATED PROFILES ── */}
      <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#f8fafc] border-t border-[#747474]/15">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#514a38] block mb-6">
            EXPLORE OTHER PAVAN STONES GROUP DIVISIONS
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(COMPANIES_DATABASE)
              .filter((c) => c.slug !== company.slug)
              .map((other) => (
                <Link
                  key={other.slug}
                  href={`/companies/${other.slug}`}
                  className="bg-white border border-[#747474]/20 hover:border-[#3e352a] p-6 sm:p-8 flex flex-col justify-between group transition-all shadow-xs hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold text-[#514a38]">{other.num}</span>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#747474]">{other.divisionName}</span>
                    </div>
                    <h4 className="font-display text-2xl font-light text-[#241919] group-hover:text-[#3e352a] transition-colors mb-1">
                      {other.name}
                    </h4>
                    <p className="text-xs font-mono text-[#514a38] font-semibold mb-3">{other.speciality}</p>
                    <p className="text-xs leading-relaxed text-[#454545] font-light">{other.overview[0]}</p>
                  </div>

                  <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] font-semibold text-[#241919] group-hover:text-[#514a38] transition-colors mt-6 pt-4 border-t border-[#747474]/15">
                    <span>View Dedicated {other.name} Profile</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
      </div>

    </main>
  );
}
