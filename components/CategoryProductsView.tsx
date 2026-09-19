"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  Heart,
  Star,
  Sparkles,
  ArrowUpRight,
  Eye,
  Filter,
  ChevronRight,
  Search,
} from "lucide-react";
import { PRODUCTS_DATABASE, ProductStone } from "@/lib/productsData";
import {
  calculateFacetCounts,
  ARCHITECTURAL_FINISHES,
  ARCHITECTURAL_SIZES,
  ARCHITECTURAL_COLORS,
  APPLICATION_AREAS,
  SLATE_STONE_VARIETIES,
  APPLICATION_SUBTYPES,
  LIMESTONE_SUBTYPES,
  SOUTH_INDIAN_GRANITE_SUBTYPES,
  NORTH_INDIAN_GRANITE_SUBTYPES,
  getCategorySubtypes,
  matchesCategorySubtype,
  matchesCompany,
  matchesFinish,
  matchesSize,
  matchesColor,
  matchesArea,
  matchesSearch,
} from "@/lib/productFilterUtils";
import ProductCardImage from "@/components/ProductCardImage";

export interface CategoryConfig {
  key: string;
  slug: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  badge: string;
}

export const CATEGORIES_CONFIG: Record<string, CategoryConfig> = {
  "slate-stone": {
    key: "slate-stone",
    slug: "slate-stone",
    title: "Slate Stone",
    headline: "NATURAL SLATE & CNC ARCHITECTURAL STONE",
    description: "Quarry-direct Markapur Midnight Black, Autumn Rustic slates, and bespoke 5-axis 3D CNC relief carvings.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1800&q=80",
    badge: "METAMORPHIC & PRECISION CNC",
  },
  applications: {
    key: "applications",
    slug: "applications",
    title: "Applications",
    headline: "ARCHITECTURAL WALL CLADDING & HARDSCAPES",
    description: "Tumbled cobbles, calibrated paving stones, and 3D interlocking modular ledger panels built for high-traffic load and exterior facades.",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1800&q=80",
    badge: "HEAVY-DUTY LOAD & FACADES",
  },
  limestone: {
    key: "limestone",
    slug: "limestones",
    title: "Limestones",
    headline: "NATURAL LIMESTONE COLLECTION",
    description: "Quarry-direct Cuddapah Black, Lime Yellow, and Betamcherla calibrated tiles, slabs, and tumbled paving.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=80",
    badge: "CALCAREOUS SEDIMENTARY",
  },
  limestones: {
    key: "limestone",
    slug: "limestones",
    title: "Limestones",
    headline: "NATURAL LIMESTONE COLLECTION",
    description: "Quarry-direct Cuddapah Black, Lime Yellow, and Betamcherla calibrated tiles, slabs, and tumbled paving.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=80",
    badge: "CALCAREOUS SEDIMENTARY",
  },
  "south-indian-granite": {
    key: "south-indian-granite",
    slug: "south-indian-granite",
    title: "South Indian Granite",
    headline: "PREMIUM SOUTH INDIAN GRANITE COLLECTION",
    description: "World-renowned Chimakurthy Black Galaxy with golden bronzite stars, monolithic Steel Grey, and Southern Granulite belt architectural stones.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80",
    badge: "SOUTH INDIAN PLUTONIC IGNEOUS",
  },
  "north-indian-granite": {
    key: "north-indian-granite",
    slug: "north-indian-granite",
    title: "North Indian Granite",
    headline: "PREMIUM NORTH INDIAN GRANITE COLLECTION",
    description: "Rajasthan Royal Black, Alaska White, and North Indian crystal granites engineered for luxury residential and commercial architecture.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80",
    badge: "NORTH INDIAN PLUTONIC IGNEOUS",
  },
  granite: {
    key: "south-indian-granite",
    slug: "granites",
    title: "Granites",
    headline: "PREMIUM GRANITE COLLECTION",
    description: "World-renowned Chimakurthy Black Galaxy with golden bronzite stars and monolithic Steel Grey architectural granite.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80",
    badge: "PLUTONIC IGNEOUS",
  },
  granites: {
    key: "south-indian-granite",
    slug: "granites",
    title: "Granites",
    headline: "PREMIUM GRANITE COLLECTION",
    description: "World-renowned Chimakurthy Black Galaxy with golden bronzite stars and monolithic Steel Grey architectural granite.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80",
    badge: "PLUTONIC IGNEOUS",
  },
  cnc: {
    key: "slate-stone",
    slug: "cnc",
    title: "CNC & Carvings",
    headline: "CNC ARCHITECTURAL STONE COLLECTION",
    description: "High-precision 5-axis milled 3D relief panels, waterjet perforated jali screens, and bespoke stone carvings.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
    badge: "5-AXIS PRECISION MILLED",
  },
  "cnc-carvings": {
    key: "slate-stone",
    slug: "cnc",
    title: "CNC & Carvings",
    headline: "CNC ARCHITECTURAL STONE COLLECTION",
    description: "High-precision 5-axis milled 3D relief panels, waterjet perforated jali screens, and bespoke stone carvings.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
    badge: "5-AXIS PRECISION MILLED",
  },
  slate: {
    key: "slate-stone",
    slug: "slates",
    title: "Slate Stone",
    headline: "NATURAL SLATE & CNC ARCHITECTURAL STONE",
    description: "Authentic Markapur Midnight Black, Indian Autumn Rustic, and California Gold metamorphic hand-split clefted slates.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1800&q=80",
    badge: "METAMORPHIC FOLIATED",
  },
  slates: {
    key: "slate-stone",
    slug: "slates",
    title: "Slate Stone",
    headline: "NATURAL SLATE & CNC ARCHITECTURAL STONE",
    description: "Authentic Markapur Midnight Black, Indian Autumn Rustic, and California Gold metamorphic hand-split clefted slates.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1800&q=80",
    badge: "METAMORPHIC FOLIATED",
  },
  pavers: {
    key: "applications",
    slug: "pavers",
    title: "Pavers & Cobbles",
    headline: "ARCHITECTURAL PAVERS & COBBLES",
    description: "Tumbled calcareous cobblestones, calibrated driveways, and heavy-duty outdoor pavers built for vehicular durability.",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1800&q=80",
    badge: "HEAVY-DUTY LOAD BEARING",
  },
  cladding: {
    key: "applications",
    slug: "cladding",
    title: "Wall Cladding",
    headline: "ARCHITECTURAL WALL CLADDING",
    description: "3D interlocking ledger panels and modular natural stone cladding for luxury facades and interior statement walls.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
    badge: "3D RELIEF FACADES",
  },
};

const CATEGORY_TABS = [
  { slug: "all", label: "All Products", href: "/products" },
  { slug: "slate-stone", label: "Slate Stone", href: "/products/slate" },
  { slug: "applications", label: "Applications", href: "/products/applications" },
  { slug: "limestone", label: "Limestone", href: "/products/limestone" },
  { slug: "south-indian-granite", label: "South Indian Granite", href: "/products/south-indian-granite" },
  { slug: "north-indian-granite", label: "North Indian Granite", href: "/products/north-indian-granite" },
];

function CategoryProductsViewInner({ categorySlug }: { categorySlug: string }) {
  const searchParams = useSearchParams();
  const currentConfig = CATEGORIES_CONFIG[categorySlug] || CATEGORIES_CONFIG["limestone"];

  // Base Category Products
  const baseCategoryProducts = useMemo(() => {
    return PRODUCTS_DATABASE.filter((p) => {
      if (currentConfig.key === "slate-stone" || currentConfig.key === "slate") {
        return p.category === "slate" || p.category === "cnc";
      }
      if (currentConfig.key === "applications" || currentConfig.key === "pavers" || currentConfig.key === "cladding") {
        return p.category === "pavers" || p.category === "cladding";
      }
      if (currentConfig.key === "south-indian-granite") {
        if (p.category !== "granite") return false;
        const originLower = (p.origin || "").toLowerCase();
        const badgeLower = (p.badge || "").toLowerCase();
        return !originLower.includes("rajasthan") && !originLower.includes("north") && !badgeLower.includes("north indian");
      }
      if (currentConfig.key === "north-indian-granite") {
        if (p.category !== "granite") return false;
        const originLower = (p.origin || "").toLowerCase();
        const badgeLower = (p.badge || "").toLowerCase();
        return originLower.includes("rajasthan") || originLower.includes("north") || badgeLower.includes("north indian");
      }
      return p.category === currentConfig.key;
    });
  }, [currentConfig.key]);

  // Filter States
  const [selectedVarieties, setSelectedVarieties] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "rating" | "name-asc" | "name-desc"
  >("featured");

  // Sync with URL query parameters
  useEffect(() => {
    const varietyParam = searchParams.get("variety") || searchParams.get("slateVariety") || searchParams.get("type");
    const companyParam = searchParams.get("company");
    const colorParam = searchParams.get("color");
    const sizeParam = searchParams.get("size");
    const finishParam = searchParams.get("finish");
    const areaParam = searchParams.get("area");
    const queryParam = searchParams.get("q") || searchParams.get("search");

    if (varietyParam) {
      setSelectedVarieties([decodeURIComponent(varietyParam)]);
    }

    if (queryParam) {
      setSearchQuery(decodeURIComponent(queryParam));
    }

    if (companyParam) {
      const compLower = companyParam.toLowerCase();
      if (compLower.includes("pavan impex") || compLower === "pavan-impex") {
        setSelectedCompanies(["Pavan Impex"]);
      } else if (compLower.includes("sai balaji") || compLower === "sai-balaji-impex") {
        setSelectedCompanies(["Sai Balaji Impex"]);
      } else if (compLower.includes("pavan granite") || compLower === "pavan-granite") {
        setSelectedCompanies(["Pavan Granite"]);
      } else if (compLower.includes("stones world") || compLower === "pavan-stones-world") {
        setSelectedCompanies(["Pavan Stones World"]);
      }
    }

    if (colorParam) {
      setSelectedColors([decodeURIComponent(colorParam)]);
    }

    if (sizeParam) {
      setSelectedSizes([decodeURIComponent(sizeParam)]);
    }

    if (finishParam) {
      setSelectedFinishes([decodeURIComponent(finishParam)]);
    }

    if (areaParam) {
      setSelectedAreas([decodeURIComponent(areaParam)]);
    }
  }, [searchParams]);

  // Calculate faceted counts for the current category
  const categoryFacets = useMemo(() => {
    return calculateFacetCounts(baseCategoryProducts);
  }, [baseCategoryProducts]);

  // UI States
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [quickViewProduct, setQuickViewProduct] = useState<ProductStone | null>(null);

  // Accordion Expand States (Closed by default)
  const [openSections, setOpenSections] = useState<{
    variety: boolean;
    finish: boolean;
    size: boolean;
    color: boolean;
    area: boolean;
    company: boolean;
  }>({
    variety: false,
    finish: false,
    size: false,
    color: false,
    area: false,
    company: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    val: string
  ) => {
    if (list.includes(val)) {
      setList(list.filter((item) => item !== val));
    } else {
      setList([...list, val]);
    }
  };

  const clearAllFilters = () => {
    setSelectedVarieties([]);
    setSelectedCompanies([]);
    setSelectedFinishes([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedAreas([]);
    setSearchQuery("");
  };

  // Subtypes for the active category
  const currentSubtypes = useMemo(() => {
    return getCategorySubtypes(currentConfig.key);
  }, [currentConfig.key]);

  const subtypeFacetCounts = useMemo<Record<string, number>>(() => {
    if (currentConfig.key === "slate-stone" || currentConfig.key === "slate" || currentConfig.key === "cnc") {
      return categoryFacets.slateVarieties || {};
    }
    if (currentConfig.key === "applications" || currentConfig.key === "pavers" || currentConfig.key === "cladding") {
      return categoryFacets.applicationSubtypes || {};
    }
    if (currentConfig.key === "limestone" || currentConfig.key === "limestones") {
      return categoryFacets.limestoneSubtypes || {};
    }
    if (currentConfig.key === "south-indian-granite" || currentConfig.key === "granite") {
      return categoryFacets.southGraniteSubtypes || {};
    }
    if (currentConfig.key === "north-indian-granite") {
      return categoryFacets.northGraniteSubtypes || {};
    }
    return {};
  }, [currentConfig.key, categoryFacets]);

  const subtypeSectionTitle = useMemo(() => {
    if (currentConfig.key === "slate-stone" || currentConfig.key === "slate" || currentConfig.key === "cnc") {
      return "Slate Stone Variety";
    }
    if (currentConfig.key === "applications" || currentConfig.key === "pavers" || currentConfig.key === "cladding") {
      return "Application Type";
    }
    if (currentConfig.key === "limestone" || currentConfig.key === "limestones") {
      return "Limestone Variety";
    }
    if (currentConfig.key === "south-indian-granite" || currentConfig.key === "granite" || currentConfig.key === "north-indian-granite") {
      return "Granite Variety";
    }
    return "Sub-type Variety";
  }, [currentConfig.key]);

  // Only display options relevant to current category with > 0 items
  const availableFinishes = useMemo(() => {
    return ARCHITECTURAL_FINISHES.filter((f) => (categoryFacets.finishes[f.id] || 0) > 0);
  }, [categoryFacets]);

  const availableSizes = useMemo(() => {
    return ARCHITECTURAL_SIZES.filter((s) => (categoryFacets.sizes[s.id] || 0) > 0);
  }, [categoryFacets]);

  const availableColors = useMemo(() => {
    return ARCHITECTURAL_COLORS.filter((c) => (categoryFacets.colors[c.id] || 0) > 0);
  }, [categoryFacets]);

  const availableAreas = useMemo(() => {
    return APPLICATION_AREAS.filter((a) => (categoryFacets.areas[a.id] || 0) > 0);
  }, [categoryFacets]);

  const availableCompanies = useMemo(() => {
    const compNames = Array.from(new Set(baseCategoryProducts.map((p) => p.company)));
    return compNames.map((name) => ({
      id: name,
      label: name,
      count: categoryFacets.companies[name] || 0,
    }));
  }, [baseCategoryProducts, categoryFacets]);

  // Active chips
  const activeChips = useMemo(() => {
    const chips: { label: string; remove: () => void }[] = [];

    if (searchQuery) {
      chips.push({
        label: `"${searchQuery}"`,
        remove: () => setSearchQuery(""),
      });
    }

    selectedVarieties.forEach((vId) => {
      const match = currentSubtypes.find((v) => v.id === vId || v.label.toLowerCase() === vId.toLowerCase());
      chips.push({
        label: match ? match.label : vId,
        remove: () => setSelectedVarieties((prev) => prev.filter((v) => v !== vId)),
      });
    });

    selectedCompanies.forEach((comp) => {
      chips.push({
        label: comp,
        remove: () => setSelectedCompanies((prev) => prev.filter((c) => c !== comp)),
      });
    });

    selectedFinishes.forEach((fin) => {
      const match = ARCHITECTURAL_FINISHES.find((f) => f.id === fin || f.label === fin);
      chips.push({
        label: match ? match.label : fin,
        remove: () => setSelectedFinishes((prev) => prev.filter((f) => f !== fin)),
      });
    });

    selectedSizes.forEach((sz) => {
      const match = ARCHITECTURAL_SIZES.find((s) => s.id === sz || s.label === sz);
      chips.push({
        label: match ? match.label : sz,
        remove: () => setSelectedSizes((prev) => prev.filter((s) => s !== sz)),
      });
    });

    selectedColors.forEach((col) => {
      const match = ARCHITECTURAL_COLORS.find((c) => c.id === col || c.label === col);
      chips.push({
        label: match ? match.label : col,
        remove: () => setSelectedColors((prev) => prev.filter((c) => c !== col)),
      });
    });

    selectedAreas.forEach((ar) => {
      const match = APPLICATION_AREAS.find((a) => a.id === ar || a.label === ar);
      chips.push({
        label: match ? match.label : ar,
        remove: () => setSelectedAreas((prev) => prev.filter((a) => a !== ar)),
      });
    });

    return chips;
  }, [searchQuery, selectedVarieties, selectedCompanies, selectedFinishes, selectedSizes, selectedColors, selectedAreas, currentSubtypes]);

  // Filtered and Sorted Category Products
  const filteredProducts = useMemo(() => {
    const result = baseCategoryProducts.filter((product) => {
      if (!matchesSearch(product, searchQuery)) return false;
      if (!matchesCategorySubtype(product, currentConfig.key, selectedVarieties)) return false;
      if (!matchesCompany(product, selectedCompanies)) return false;
      if (!matchesFinish(product, selectedFinishes)) return false;
      if (!matchesSize(product, selectedSizes)) return false;
      if (!matchesColor(product, selectedColors)) return false;
      if (!matchesArea(product, selectedAreas)) return false;
      return true;
    });

    return result.sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "rating") return (b.rating || 4.5) - (a.rating || 4.5);
      if (sortBy === "price-asc") {
        const priceA = parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0");
        const priceB = parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0");
        return priceA - priceB;
      }
      if (sortBy === "price-desc") {
        const priceA = parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0");
        const priceB = parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0");
        return priceB - priceA;
      }
      return 0;
    });
  }, [
    baseCategoryProducts,
    currentConfig.key,
    searchQuery,
    selectedVarieties,
    selectedCompanies,
    selectedFinishes,
    selectedSizes,
    selectedColors,
    selectedAreas,
    sortBy,
  ]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };


  return (
    <div className="bg-[#ffffff] text-[#111111] min-h-screen pt-16 sm:pt-20 pb-24 font-sans selection:bg-[#241919] selection:text-white">
      
      {/* ── 1. EXPANDED FULL-WIDTH SCREEN BANNER (NO BLACK SHADE, FULL VIVID PHOTO) ── */}
      <section className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[400px] overflow-hidden bg-[#e5e5e5] flex items-center">
        {/* Background Photo with 100% full opacity and NO black shade */}
        <img
          src={currentConfig.image}
          alt={currentConfig.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Transparent Content Container directly over image */}
        <div className="relative z-10 w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
          <div className="max-w-2xl text-left">
            
            {/* Breadcrumb row */}
            <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11.5px] font-mono uppercase tracking-widest text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mb-2.5">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/70" />
              <Link href="/products" className="hover:text-white/80 transition-colors">Products</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/70" />
              <span className="text-white font-bold">{currentConfig.title}</span>
            </div>


            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold uppercase tracking-tight text-white leading-tight font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {currentConfig.headline}
            </h1>

            {/* Subtitle description */}
            <p className="mt-2.5 text-xs sm:text-[14px] text-white/95 font-normal leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] max-w-xl">
              {currentConfig.description}
            </p>

          </div>
        </div>
      </section>

      {/* ── 1B. QUICK CATEGORY HOPPER TABS BAR ── */}
      <section className="bg-[#f8f8f8] border-b border-[#e5e5e5]">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] mr-2 flex-none hidden sm:inline-block">
            Browse Category:
          </span>
          {CATEGORY_TABS.map((tab) => {
            const isCurrent =
              tab.slug === currentConfig.slug ||
              (tab.slug === "pavers" && currentConfig.slug === "cladding");

            return (
              <Link
                key={tab.slug}
                href={tab.href}
                className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors flex-none ${
                  isCurrent
                    ? "bg-[#111111] text-white"
                    : "bg-white text-[#333333] hover:text-black border border-[#e5e5e5] hover:bg-[#eaeaea]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 2. TOOLBAR / ACTION BAR ── */}
      <section className="border-b border-[#e5e5e5] bg-white">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 py-2.5 flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
          
          {/* Left: Hide/Show Filters Toggle + Search Input + Active Chips */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap flex-1 min-w-0">
            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="hidden lg:inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#111111] hover:text-black py-1.5 px-2.5 border border-[#e5e5e5] rounded-none hover:bg-[#f9f9f9] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>
                {isFilterOpen ? "HIDE FILTERS" : "SHOW FILTERS"}
                {activeChips.length > 0 ? ` (${activeChips.length})` : ""}
              </span>
              {isFilterOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile Filter Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#111111] py-1.5 px-3 border border-[#e5e5e5] rounded-none hover:bg-[#f9f9f9] cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>FILTERS {activeChips.length > 0 ? `(${activeChips.length})` : ""}</span>
            </button>

            {/* Live Search Input Bar */}
            <div className="relative flex items-center w-full sm:w-60 md:w-68">
              <Search className="w-3.5 h-3.5 text-[#71717a] absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${currentConfig.title}...`}
                className="w-full bg-[#f4f4f5] hover:bg-[#ededf0] focus:bg-white text-[11.5px] text-[#111111] placeholder:text-[#888888] pl-8 pr-7 py-1.5 border border-[#e4e4e7] focus:border-[#111111] focus:outline-none transition-colors rounded-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 p-0.5 text-[#71717a] hover:text-[#111111] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Active Filter Chips */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
              {activeChips.map((chip, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f4f4f5] border border-[#e4e4e7] text-[11px] font-medium text-[#18181b] rounded-none"
                >
                  <span className="truncate max-w-[140px] sm:max-w-none">{chip.label}</span>
                  <button
                    type="button"
                    onClick={chip.remove}
                    className="w-3.5 h-3.5 flex items-center justify-center text-[#71717a] hover:text-[#09090b] cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {activeChips.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-[11px] font-semibold text-[#18181b] hover:underline cursor-pointer ml-1 py-1"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Right: Product Count & Sort Dropdown */}
          <div className="flex items-center gap-4 flex-none ml-auto">
            <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-wider text-[#71717a]">
              {filteredProducts.length} {filteredProducts.length === 1 ? "Stone Specimen" : "Stone Specimens"}
            </span>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <label htmlFor="cat-sort-select" className="sr-only">Sort By</label>
              <div className="relative flex items-center">
                <select
                  id="cat-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-transparent pl-2 pr-7 py-1 text-[11px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer border-none focus:outline-hidden"
                >
                  <option value="featured">SORT BY: FEATURED</option>
                  <option value="rating">SORT BY: TOP RATED</option>
                  <option value="price-asc">SORT BY: PRICE (LOW TO HIGH)</option>
                  <option value="price-desc">SORT BY: PRICE (HIGH TO LOW)</option>
                  <option value="name-asc">SORT BY: NAME (A - Z)</option>
                  <option value="name-desc">SORT BY: NAME (Z - A)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#111111] pointer-events-none absolute right-1" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. MAIN CONTENT: SIDEBAR + PRODUCT GRID ── */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 pt-6">
        <div className="flex items-start">
          
          {/* ── LEFT DESKTOP SIDEBAR ACCORDION FILTERS ── */}
          {isFilterOpen && (
            <aside className="hidden lg:block w-64 xl:w-72 flex-none pr-8 pb-12 select-none border-r border-[#e5e5e5] mr-6">
              
              <div className="divide-y divide-[#e5e5e5]">
                
                {/* Filter: Category Subtypes (Variety / Application / Limestone / Granite) */}
                {currentSubtypes.length > 0 && (
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleSection("variety")}
                      className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                    >
                      <span>{subtypeSectionTitle}</span>
                      {openSections.variety ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {openSections.variety && (
                      <div className="mt-3.5 space-y-2.5">
                        {currentSubtypes.map((v) => {
                          const count = subtypeFacetCounts[v.id] || 0;
                          return (
                            <label
                              key={v.id}
                              className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <input
                                  type="checkbox"
                                  checked={selectedVarieties.includes(v.id)}
                                  onChange={() => toggleFilter(selectedVarieties, setSelectedVarieties, v.id)}
                                  className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer"
                                />
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                                    style={{
                                      background: v.hex.startsWith("linear") ? v.hex : undefined,
                                      backgroundColor: !v.hex.startsWith("linear") ? v.hex : undefined,
                                    }}
                                  />
                                  <span className="group-hover:translate-x-0.5 transition-transform font-medium">{v.label}</span>
                                </div>
                              </div>
                              <span className="text-[10.5px] text-[#888888] font-mono">({count})</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Filter 1: Surface Finish */}
                {availableFinishes.length > 0 && (
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleSection("finish")}
                      className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                    >
                      <span>Surface Finish</span>
                      {openSections.finish ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {openSections.finish && (
                      <div className="mt-3.5 space-y-2.5">
                        {availableFinishes.map((finish) => {
                          const count = categoryFacets.finishes[finish.id] || 0;
                          return (
                            <label
                              key={finish.id}
                              className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <input
                                  type="checkbox"
                                  checked={selectedFinishes.includes(finish.id)}
                                  onChange={() => toggleFilter(selectedFinishes, setSelectedFinishes, finish.id)}
                                  className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer"
                                />
                                <span className="group-hover:translate-x-0.5 transition-transform">{finish.label}</span>
                              </div>
                              <span className="text-[10.5px] text-[#888888] font-mono">({count})</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Filter 2: Tile & Slab Size */}
                {availableSizes.length > 0 && (
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleSection("size")}
                      className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                    >
                      <span>Tile & Slab Size</span>
                      {openSections.size ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {openSections.size && (
                      <div className="mt-3.5 space-y-2.5">
                        {availableSizes.map((sz) => {
                          const count = categoryFacets.sizes[sz.id] || 0;
                          return (
                            <label
                              key={sz.id}
                              className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <input
                                  type="checkbox"
                                  checked={selectedSizes.includes(sz.id)}
                                  onChange={() => toggleFilter(selectedSizes, setSelectedSizes, sz.id)}
                                  className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer"
                                />
                                <span className="group-hover:translate-x-0.5 transition-transform">{sz.label}</span>
                              </div>
                              <span className="text-[10.5px] text-[#888888] font-mono">({count})</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Filter 3: Color Tone */}
                {availableColors.length > 0 && (
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleSection("color")}
                      className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                    >
                      <span>Color Tone</span>
                      {openSections.color ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {openSections.color && (
                      <div className="mt-3.5 space-y-2.5">
                        {availableColors.map((col) => {
                          const count = categoryFacets.colors[col.id] || 0;
                          return (
                            <label
                              key={col.id}
                              className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <input
                                  type="checkbox"
                                  checked={selectedColors.includes(col.id)}
                                  onChange={() => toggleFilter(selectedColors, setSelectedColors, col.id)}
                                  className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer"
                                />
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                                    style={{
                                      background: col.hex.startsWith("linear") ? col.hex : undefined,
                                      backgroundColor: !col.hex.startsWith("linear") ? col.hex : undefined,
                                    }}
                                  />
                                  <span className="group-hover:translate-x-0.5 transition-transform">{col.label}</span>
                                </div>
                              </div>
                              <span className="text-[10.5px] text-[#888888] font-mono">({count})</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Filter 4: Application Area */}
                {availableAreas.length > 0 && (
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleSection("area")}
                      className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                    >
                      <span>Application Area</span>
                      {openSections.area ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {openSections.area && (
                      <div className="mt-3.5 space-y-2.5">
                        {availableAreas.map((item) => {
                          const count = categoryFacets.areas[item.id] || 0;
                          return (
                            <label
                              key={item.id}
                              className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <input
                                  type="checkbox"
                                  checked={selectedAreas.includes(item.id)}
                                  onChange={() => toggleFilter(selectedAreas, setSelectedAreas, item.id)}
                                  className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer"
                                />
                                <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                              </div>
                              <span className="text-[10.5px] text-[#888888] font-mono">({count})</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Filter 5: Quarry Division */}
                {availableCompanies.length > 1 && (
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleSection("company")}
                      className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                    >
                      <span>Quarry Division</span>
                      {openSections.company ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {openSections.company && (
                      <div className="mt-3.5 space-y-2.5">
                        {availableCompanies.map((comp) => (
                          <label
                            key={comp.id}
                            className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={selectedCompanies.includes(comp.id)}
                                onChange={() => toggleFilter(selectedCompanies, setSelectedCompanies, comp.id)}
                                className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer"
                              />
                              <span className="group-hover:translate-x-0.5 transition-transform">{comp.label}</span>
                            </div>
                            <span className="text-[10.5px] text-[#888888] font-mono">({comp.count})</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* ── BOTTOM RESET BUTTON ── */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="w-full py-2.5 px-4 bg-transparent hover:bg-[#111111] text-[#111111] hover:text-white border border-[#111111] rounded-none text-[11px] font-bold uppercase tracking-widest transition-colors cursor-pointer text-center"
                >
                  RESET
                </button>
              </div>

            </aside>
          )}

          {/* ── RIGHT PRODUCT GRID (BORDER-GRID AESTHETIC) ── */}
          <main className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 px-6 border border-[#e5e5e5] bg-[#fafafa]">
                <Sparkles className="w-8 h-8 mx-auto text-[#71717a] mb-3 stroke-[1.5]" />
                <h3 className="text-base font-bold uppercase tracking-wider text-[#111111] mb-2">
                  No Matching {currentConfig.title} Found
                </h3>
                <p className="text-xs text-[#71717a] max-w-md mx-auto mb-6">
                  Try clearing your filters to see all available {currentConfig.title.toLowerCase()} specimens.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#111111] hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider rounded-none cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid border-t border-l border-[#e5e5e5] ${
                  isFilterOpen
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                }`}
              >
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist[product.id];

                  return (
                    <div
                      key={product.id}
                      className="border-r border-b border-[#e5e5e5] bg-white group flex flex-col justify-between transition-colors hover:border-[#111111]/40 relative"
                    >
                      {/* Top Action Tags & Badge Bar */}
                      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#f9f9f9]">

                        {/* Wishlist Heart Toggle */}
                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#111111] shadow-2xs transition-all cursor-pointer"
                          title="Save to shortlist"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 transition-colors ${
                              isWishlisted
                                ? "fill-[#d94e34] text-[#d94e34]"
                                : "text-[#71717a] hover:text-[#111111]"
                            }`}
                          />
                        </button>

                        {/* Product Image Link with 2-second hover rotation for multi-image products */}
                        <Link href={`/products/${product.id}`} className="block w-full h-full p-4 sm:p-5">
                          <ProductCardImage
                            images={product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]}
                            alt={product.name}
                            intervalMs={2000}
                          />
                        </Link>

                        {/* Quick View Hover Overlay */}
                        <div className="absolute inset-x-2 bottom-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setQuickViewProduct(product)}
                            className="flex-1 py-1.5 bg-white/95 hover:bg-white text-[#111111] text-[10px] font-bold uppercase tracking-wider border border-[#e5e5e5] shadow-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Quick View</span>
                          </button>
                          <Link
                            href={`/request-sample?stone=${product.id}`}
                            className="flex-1 py-1.5 bg-[#111111] hover:bg-black text-white text-[10px] font-bold uppercase tracking-wider shadow-xs flex items-center justify-center gap-1 cursor-pointer transition-colors text-center"
                          >
                            <span>Sample</span>
                          </Link>
                        </div>

                      </div>

                      {/* Product Metadata & Information */}
                      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white border-t border-[#f0f0f0]">
                        <div>
                          {/* Title */}
                          <Link href={`/products/${product.id}`}>
                            <h2 className="text-[13px] sm:text-[14px] font-semibold text-[#111111] leading-snug hover:underline line-clamp-1">
                              {product.name}
                            </h2>
                          </Link>

                          {/* 5-Star Rating Row */}
                          <div className="flex items-center gap-1 mt-1 mb-1.5">
                            <div className="flex text-[#111111]">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current text-[#111111]" />
                              ))}
                            </div>
                            <span className="text-[10px] font-mono text-[#71717a] ml-1">
                              ({product.reviewCount || 24})
                            </span>
                          </div>

                          {/* Badge tag under rating */}
                          {product.badge && (
                            <div className="mt-1 mb-0.5">
                              <span className="inline-block px-1.5 py-0.5 bg-black text-white text-[9px] font-mono uppercase tracking-wider font-semibold rounded-none">
                                {product.badge}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Bottom Direct Links */}
                        <div className="mt-3 pt-2.5 border-t border-[#f4f4f5] flex items-center justify-between text-[10.5px] font-mono uppercase tracking-wider text-[#555555]">
                          <span className="truncate max-w-[130px]">{product.company}</span>
                          <Link
                            href={`/products/${product.id}`}
                            className="inline-flex items-center gap-0.5 text-[#111111] font-semibold hover:underline"
                          >
                            <span>Specs</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </main>

        </div>
      </section>

      {/* ── 4. MOBILE FILTER DRAWER ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-2xs"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="relative w-full max-w-xs bg-white h-full overflow-y-auto z-10 flex flex-col justify-between p-6 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e5]">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
                    Filters ({activeChips.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-[#71717a] hover:text-[#111111] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="divide-y divide-[#e5e5e5] py-2">
                  {/* Dynamic Category Subtypes */}
                  {currentSubtypes.length > 0 && (
                    <div className="py-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                        {subtypeSectionTitle}
                      </span>
                      <div className="space-y-2">
                        {currentSubtypes.map((v) => (
                          <label key={v.id} className="flex items-center justify-between text-xs text-[#444444]">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedVarieties.includes(v.id)}
                                onChange={() => toggleFilter(selectedVarieties, setSelectedVarieties, v.id)}
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                                  style={{
                                    background: v.hex.startsWith("linear") ? v.hex : undefined,
                                    backgroundColor: !v.hex.startsWith("linear") ? v.hex : undefined,
                                  }}
                                />
                                <span className="font-medium">{v.label}</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({subtypeFacetCounts[v.id] || 0})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Finishes */}
                  {availableFinishes.length > 0 && (
                    <div className="py-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                        Surface Finish
                      </span>
                      <div className="space-y-2">
                        {availableFinishes.map((fin) => (
                          <label key={fin.id} className="flex items-center justify-between text-xs text-[#444444]">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedFinishes.includes(fin.id)}
                                onChange={() => toggleFilter(selectedFinishes, setSelectedFinishes, fin.id)}
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <span>{fin.label}</span>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({categoryFacets.finishes[fin.id] || 0})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes */}
                  {availableSizes.length > 0 && (
                    <div className="py-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                        Tile & Slab Size
                      </span>
                      <div className="space-y-2">
                        {availableSizes.map((sz) => (
                          <label key={sz.id} className="flex items-center justify-between text-xs text-[#444444]">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedSizes.includes(sz.id)}
                                onChange={() => toggleFilter(selectedSizes, setSelectedSizes, sz.id)}
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <span>{sz.label}</span>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({categoryFacets.sizes[sz.id] || 0})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Colors */}
                  {availableColors.length > 0 && (
                    <div className="py-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                        Color Tone
                      </span>
                      <div className="space-y-2">
                        {availableColors.map((col) => (
                          <label key={col.id} className="flex items-center justify-between text-xs text-[#444444]">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedColors.includes(col.id)}
                                onChange={() => toggleFilter(selectedColors, setSelectedColors, col.id)}
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                                  style={{
                                    background: col.hex.startsWith("linear") ? col.hex : undefined,
                                    backgroundColor: !col.hex.startsWith("linear") ? col.hex : undefined,
                                  }}
                                />
                                <span>{col.label}</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({categoryFacets.colors[col.id] || 0})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Areas */}
                  {availableAreas.length > 0 && (
                    <div className="py-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                        Application Area
                      </span>
                      <div className="space-y-2">
                        {availableAreas.map((item) => (
                          <label key={item.id} className="flex items-center justify-between text-xs text-[#444444]">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedAreas.includes(item.id)}
                                onChange={() => toggleFilter(selectedAreas, setSelectedAreas, item.id)}
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <span>{item.label}</span>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({categoryFacets.areas[item.id] || 0})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Companies */}
                  {availableCompanies.length > 1 && (
                    <div className="py-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                        Quarry Division
                      </span>
                      <div className="space-y-2">
                        {availableCompanies.map((comp) => (
                          <label key={comp.id} className="flex items-center justify-between text-xs text-[#444444]">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedCompanies.includes(comp.id)}
                                onChange={() => toggleFilter(selectedCompanies, setSelectedCompanies, comp.id)}
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <span>{comp.label}</span>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({comp.count})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e5e5e5] space-y-2">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Show {filteredProducts.length} Results
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearAllFilters();
                    setMobileFilterOpen(false);
                  }}
                  className="w-full py-2.5 bg-transparent border border-[#111111] text-[#111111] text-xs font-bold uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 5. QUICK VIEW MODAL ── */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-white border border-[#e5e5e5] shadow-2xl z-10 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#111111] border border-[#e5e5e5] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square bg-[#f5f5f5]">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {quickViewProduct.badge && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-black text-white text-[9px] font-mono uppercase tracking-wider font-semibold">
                      {quickViewProduct.badge}
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] mb-1">
                      {quickViewProduct.company} • {quickViewProduct.origin.split(",")[0]}
                    </div>
                    <h3 className="text-xl font-bold text-[#111111] leading-tight mb-2">
                      {quickViewProduct.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-[#111111]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-mono text-[#71717a] ml-1">
                        {quickViewProduct.rating || 4.9} ({quickViewProduct.reviewCount || 24} reviews)
                      </span>
                    </div>

                    <div className="text-lg font-bold text-[#111111] mb-4">
                      {quickViewProduct.price || "Direct Quarry Pricing"}
                    </div>

                    <p className="text-xs text-[#555555] leading-relaxed line-clamp-4 mb-4">
                      {quickViewProduct.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Link
                      href={`/products/${quickViewProduct.id}`}
                      className="w-full text-center py-2.5 bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-wider block transition-colors"
                    >
                      View Complete Technical Dossier
                    </Link>
                    <Link
                      href={`/request-sample?stone=${quickViewProduct.id}`}
                      className="w-full text-center py-2 bg-transparent hover:bg-[#f5f5f5] text-[#111111] border border-[#111111] text-xs font-bold uppercase tracking-wider block transition-colors"
                    >
                      Order Physical Quarry Sample Box
                    </Link>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function CategoryProductsView({ categorySlug }: { categorySlug: string }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <CategoryProductsViewInner categorySlug={categorySlug} />
    </Suspense>
  );
}
