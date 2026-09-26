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
  Check,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import { PRODUCTS_DATABASE, ProductStone } from "@/lib/productsData";
import {
  calculateFacetCounts,
  ARCHITECTURAL_FINISHES,
  ARCHITECTURAL_SIZES,
  ARCHITECTURAL_COLORS,
  APPLICATION_AREAS,
  QUARRY_DIVISIONS,
  SLATE_STONE_VARIETIES,
  APPLICATION_SUBTYPES,
  LIMESTONE_SUBTYPES,
  SOUTH_INDIAN_GRANITE_SUBTYPES,
  NORTH_INDIAN_GRANITE_SUBTYPES,
  matchesSlateVariety,
  matchesApplicationSubtype,
  matchesLimestoneSubtype,
  matchesSouthIndianGraniteSubtype,
  matchesNorthIndianGraniteSubtype,
  matchesCategory,
  matchesCompany,
  matchesFinish,
  matchesSize,
  matchesColor,
  matchesArea,
  matchesSearch,
  normalizeFinishParam,
  normalizeSizeParam,
  normalizeColorParam,
} from "@/lib/productFilterUtils";
import ProductCardImage from "@/components/ProductCardImage";
import { useWishlist } from "@/context/WishlistContext";
import ProductPagination, { useResponsiveItemsPerPage } from "@/components/ProductPagination";

function ProductsContent() {
  const searchParams = useSearchParams();

  // Compute live facets across the database
  const catalogFacets = useMemo(() => calculateFacetCounts(PRODUCTS_DATABASE), []);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSlateVarieties, setSelectedSlateVarieties] = useState<string[]>([]);
  const [selectedApplicationSubtypes, setSelectedApplicationSubtypes] = useState<string[]>([]);
  const [selectedLimestoneSubtypes, setSelectedLimestoneSubtypes] = useState<string[]>([]);
  const [selectedSouthGraniteSubtypes, setSelectedSouthGraniteSubtypes] = useState<string[]>([]);
  const [selectedNorthGraniteSubtypes, setSelectedNorthGraniteSubtypes] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "featured" | "rating" | "name-asc" | "name-desc"
  >("featured");

  // Dynamic live facets:
  // When categories are selected, facet counts reflect products in those categories.
  // When no category is selected, facet counts reflect all products.
  const activePoolForFacets = useMemo(() => {
    if (selectedCategories.length === 0) return PRODUCTS_DATABASE;
    return PRODUCTS_DATABASE.filter((p) => matchesCategory(p, selectedCategories));
  }, [selectedCategories]);

  const liveFacets = useMemo(() => calculateFacetCounts(activePoolForFacets), [activePoolForFacets]);

  // Top Category Banner Definitions with live dynamic counts
  const TOP_CATEGORIES = useMemo(
    () => [
      {
        id: "slate",
        slug: "slate-stone",
        title: "SLATE STONE",
        subtitle: "Markapur Slates & CNC Carvings",
        count: liveFacets.categories.slate || 88,
        href: "/products/slate",
        image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "applications",
        slug: "applications",
        title: "APPLICATIONS",
        subtitle: "Wall Cladding, Pavers & Cobbles",
        count: liveFacets.categories.applications || 2,
        href: "/products/applications",
        image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "limestone",
        slug: "limestone",
        title: "LIMESTONE",
        subtitle: "Cuddapah Black & Lime Yellow",
        count: liveFacets.categories.limestone || 2,
        href: "/products/limestone",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "south-indian-granite",
        slug: "south-indian-granite",
        title: "SOUTH INDIAN GRANITE",
        subtitle: "Black Galaxy & Steel Grey",
        count: liveFacets.categories["south-indian-granite"] || 3,
        href: "/products/south-indian-granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "north-indian-granite",
        slug: "north-indian-granite",
        title: "NORTH INDIAN GRANITE",
        subtitle: "Rajasthan Slabs & Crystals",
        count: liveFacets.categories["north-indian-granite"] || 2,
        href: "/products/north-indian-granite",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      },
    ],
    [liveFacets]
  );

  // UI States
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState<ProductStone | null>(null);
  const [activeQuickViewImage, setActiveQuickViewImage] = useState<string | null>(null);

  // Sync Filters from URL Query Params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const companyParam = searchParams.get("company");
    const stoneParam = searchParams.get("stone");
    const colorParam = searchParams.get("color");
    const sizeParam = searchParams.get("size");
    const finishParam = searchParams.get("finish");
    const areaParam = searchParams.get("area");
    const queryParam = searchParams.get("q") || searchParams.get("search");

    if (queryParam) {
      setSearchQuery(decodeURIComponent(queryParam));
    }

    if (categoryParam) {
      const catLower = categoryParam.toLowerCase();
      if (catLower.includes("slate") || catLower.includes("cnc")) setSelectedCategories(["slate"]);
      else if (catLower.includes("application") || catLower.includes("paver") || catLower.includes("cladding")) setSelectedCategories(["applications"]);
      else if (catLower.includes("limestone")) setSelectedCategories(["limestone"]);
      else if (catLower.includes("south")) setSelectedCategories(["south-indian-granite"]);
      else if (catLower.includes("north")) setSelectedCategories(["north-indian-granite"]);
      else if (catLower.includes("granite")) setSelectedCategories(["south-indian-granite"]);
      else setSelectedCategories([catLower]);
    }

    if (companyParam) {
      const compLower = companyParam.toLowerCase();
      if (compLower.includes("psg") || compLower.includes("psg stones") || compLower === "psg-stones") {
        setSelectedCompanies(["PSG Stones"]);
      } else if (compLower.includes("pavan impex") || compLower === "pavan-impex") {
        setSelectedCompanies(["Pavan Impex"]);
      } else if (compLower.includes("sai balaji") || compLower === "sai-balaji-impex") {
        setSelectedCompanies(["Sai Balaji Impex"]);
      } else if (compLower.includes("pavan granite") || compLower === "pavan-granite") {
        setSelectedCompanies(["Pavan Granite"]);
      } else if (compLower.includes("stones world") || compLower === "pavan-stones-world") {
        setSelectedCompanies(["Pavan Stones World"]);
      }
    }

    if (stoneParam) {
      const sLower = stoneParam.toLowerCase();
      if (sLower === "slate") setSelectedCategories(["slate"]);
      if (sLower === "limestone") setSelectedCategories(["limestone"]);
      if (sLower === "granite") setSelectedCategories(["granite"]);
      if (sLower === "cnc") setSelectedCategories(["cnc"]);
      if (sLower.includes("paver")) setSelectedCategories(["pavers"]);
    }

    if (colorParam) {
      const decoded = decodeURIComponent(colorParam);
      setSelectedColors([decoded]);
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

  // Sidebar Accordion Expand States (Closed by default)
  const [openSections, setOpenSections] = useState<{
    category: boolean;
    slateVariety: boolean;
    applicationSubtype: boolean;
    limestoneSubtype: boolean;
    southGraniteSubtype: boolean;
    northGraniteSubtype: boolean;
    company: boolean;
    color: boolean;
    finish: boolean;
    size: boolean;
    area: boolean;
  }>({
    category: false,
    slateVariety: false,
    applicationSubtype: false,
    limestoneSubtype: false,
    southGraniteSubtype: false,
    northGraniteSubtype: false,
    company: false,
    color: false,
    finish: false,
    size: false,
    area: false,
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

  const handleTopCategoryClick = (catId: string) => {
    if (selectedCategories.includes(catId) && selectedCategories.length === 1) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([catId]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSlateVarieties([]);
    setSelectedApplicationSubtypes([]);
    setSelectedLimestoneSubtypes([]);
    setSelectedSouthGraniteSubtypes([]);
    setSelectedNorthGraniteSubtypes([]);
    setSelectedCompanies([]);
    setSelectedFinishes([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedAreas([]);
    setSearchQuery("");
  };

  // Compute Active Filter Chips
  const activeChips = useMemo(() => {
    const chips: { label: string; remove: () => void }[] = [];

    if (searchQuery) {
      chips.push({
        label: `"${searchQuery}"`,
        remove: () => setSearchQuery(""),
      });
    }

    selectedCategories.forEach((cat) => {
      const match = TOP_CATEGORIES.find((c) => c.id === cat);
      chips.push({
        label: match ? match.title : cat.toUpperCase(),
        remove: () => setSelectedCategories((prev) => prev.filter((c) => c !== cat)),
      });
    });

    selectedSlateVarieties.forEach((vId) => {
      const match = SLATE_STONE_VARIETIES.find((v) => v.id === vId || v.label.toLowerCase() === vId.toLowerCase());
      chips.push({
        label: match ? match.label : vId,
        remove: () => setSelectedSlateVarieties((prev) => prev.filter((v) => v !== vId)),
      });
    });

    selectedApplicationSubtypes.forEach((sId) => {
      const match = APPLICATION_SUBTYPES.find((s) => s.id === sId || s.label.toLowerCase() === sId.toLowerCase());
      chips.push({
        label: match ? match.label : sId,
        remove: () => setSelectedApplicationSubtypes((prev) => prev.filter((s) => s !== sId)),
      });
    });

    selectedLimestoneSubtypes.forEach((lId) => {
      const match = LIMESTONE_SUBTYPES.find((l) => l.id === lId || l.label.toLowerCase() === lId.toLowerCase());
      chips.push({
        label: match ? match.label : lId,
        remove: () => setSelectedLimestoneSubtypes((prev) => prev.filter((l) => l !== lId)),
      });
    });

    selectedSouthGraniteSubtypes.forEach((sgId) => {
      const match = SOUTH_INDIAN_GRANITE_SUBTYPES.find((sg) => sg.id === sgId || sg.label.toLowerCase() === sgId.toLowerCase());
      chips.push({
        label: match ? match.label : sgId,
        remove: () => setSelectedSouthGraniteSubtypes((prev) => prev.filter((sg) => sg !== sgId)),
      });
    });

    selectedNorthGraniteSubtypes.forEach((ngId) => {
      const match = NORTH_INDIAN_GRANITE_SUBTYPES.find((ng) => ng.id === ngId || ng.label.toLowerCase() === ngId.toLowerCase());
      chips.push({
        label: match ? match.label : ngId,
        remove: () => setSelectedNorthGraniteSubtypes((prev) => prev.filter((ng) => ng !== ngId)),
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
  }, [
    searchQuery,
    selectedCategories,
    selectedSlateVarieties,
    selectedApplicationSubtypes,
    selectedLimestoneSubtypes,
    selectedSouthGraniteSubtypes,
    selectedNorthGraniteSubtypes,
    selectedCompanies,
    selectedFinishes,
    selectedSizes,
    selectedColors,
    selectedAreas,
    TOP_CATEGORIES,
  ]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    const result = PRODUCTS_DATABASE.filter((product) => {
      if (!matchesSearch(product, searchQuery)) return false;
      if (!matchesCategory(product, selectedCategories)) return false;
      if (!matchesSlateVariety(product, selectedSlateVarieties)) return false;
      if (!matchesApplicationSubtype(product, selectedApplicationSubtypes)) return false;
      if (!matchesLimestoneSubtype(product, selectedLimestoneSubtypes)) return false;
      if (!matchesSouthIndianGraniteSubtype(product, selectedSouthGraniteSubtypes)) return false;
      if (!matchesNorthIndianGraniteSubtype(product, selectedNorthGraniteSubtypes)) return false;
      if (!matchesCompany(product, selectedCompanies)) return false;
      if (!matchesFinish(product, selectedFinishes)) return false;
      if (!matchesSize(product, selectedSizes)) return false;
      if (!matchesColor(product, selectedColors)) return false;
      if (!matchesArea(product, selectedAreas)) return false;
      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "rating") return (b.rating || 4.5) - (a.rating || 4.5);
      return 0; // featured natural order
    });
  }, [
    searchQuery,
    selectedCategories,
    selectedSlateVarieties,
    selectedApplicationSubtypes,
    selectedLimestoneSubtypes,
    selectedSouthGraniteSubtypes,
    selectedNorthGraniteSubtypes,
    selectedCompanies,
    selectedFinishes,
    selectedSizes,
    selectedColors,
    selectedAreas,
    sortBy,
  ]);

  // Responsive items per page (20 desktop / 16 tablet / 8 mobile)
  const itemsPerPage = useResponsiveItemsPerPage();
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 whenever any filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategories,
    selectedSlateVarieties,
    selectedApplicationSubtypes,
    selectedLimestoneSubtypes,
    selectedSouthGraniteSubtypes,
    selectedNorthGraniteSubtypes,
    selectedCompanies,
    selectedFinishes,
    selectedSizes,
    selectedColors,
    selectedAreas,
    sortBy,
  ]);

  // Paginated product slice
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <div className="bg-[#ffffff] text-[#111111] min-h-screen pt-20 sm:pt-24 pb-24 font-sans selection:bg-[#ff5500] selection:text-white">
      
      {/* ── 1. HEADER SECTION (MATCHING REFERENCE IMAGE) ── */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 pb-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold tracking-tight uppercase text-[#111111] font-sans">
          ARCHITECTURAL STONE COLLECTION
        </h1>
        <p className="mt-3 max-w-3xl mx-auto text-xs sm:text-sm md:text-[13.5px] leading-relaxed text-[#555555] font-normal tracking-wide">
          Our Architectural Stone Collection delivers the best quarry-direct natural stones for luxury indoor floors, monumental elevations, and heavy-duty outdoor hardscapes. The collection features Slate Stone (including CNC 3D carvings), Applications, Limestones, South Indian Granites, and North Indian Granites engineered for timeless durability.
        </p>
      </section>

      {/* ── 2. TOP CATEGORY BANNERS ROW (DEDICATED CATEGORY PAGE ROUTING) ── */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
          {TOP_CATEGORIES.map((cat) => {
            const isActive = selectedCategories.includes(cat.id);

            return (
              <Link
                key={cat.id}
                href={cat.href}
                className={`group relative aspect-[16/9] sm:aspect-[16/10] rounded-none overflow-hidden block select-none transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "ring-2 ring-[#111111] ring-offset-2 shadow-md"
                    : "hover:opacity-95"
                }`}
              >
                {/* Photographic Background */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity group-hover:opacity-90" />

                {/* Active Indicator Top Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#111111] z-10" />
                )}

                {/* Category Title Label (Bottom Left, Uppercase, Bold) */}
                <div className="absolute bottom-3 left-3 sm:bottom-3.5 sm:left-4 z-10 text-left pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="block text-[13px] sm:text-[14px] md:text-[15px] font-extrabold uppercase tracking-wider text-white drop-shadow-sm font-sans">
                      {cat.title}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-white/90 bg-black/40 border border-white/20 px-1.5 py-0.5 rounded-xs">
                      {cat.count}
                    </span>
                  </div>
                  <span className="block text-[9.5px] sm:text-[10.5px] text-white/80 font-medium tracking-wide mt-0.5">
                    {cat.subtitle}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white/80 group-hover:text-white underline mt-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                    View Collection →
                  </span>
                </div>

                {/* Active Badge Checkmark */}
                {isActive && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-white text-[#111111] rounded-full flex items-center justify-center shadow-sm z-10">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 3. TOOLBAR / ACTION BAR (MATCHING REFERENCE IMAGE) ── */}
      <section className="border-t border-b border-[#e5e5e5] bg-white">
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
              {isFilterOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Mobile Filter Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#111111] py-1.5 px-3 border border-[#e5e5e5] rounded-none hover:bg-[#f9f9f9] cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>
                FILTERS {activeChips.length > 0 ? `(${activeChips.length})` : ""}
              </span>
            </button>

            {/* Live Search Input Bar */}
            <div className="relative flex items-center w-full sm:w-56 md:w-60">
              <Search className="w-3.5 h-3.5 text-[#71717a] absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${PRODUCTS_DATABASE.length} stone specimens...`}
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

            {/* Horizontal Company Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar flex-nowrap sm:flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedCompanies([])}
                className={`text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition-all cursor-pointer whitespace-nowrap border ${
                  selectedCompanies.length === 0
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-[#f4f4f5] text-[#555555] hover:text-[#111111] border-[#e4e4e7] hover:border-[#111111]"
                }`}
              >
                All Companies
              </button>
              {[
                { key: "Pavan Stones World", label: "Pavan Stones World" },
                { key: "PSG Stones", label: "PSG Stones" },
                { key: "Pavan Granite", label: "Pavan Granite" },
                { key: "Pavan Impex", label: "Pavan Impex" },
                { key: "Sai Balaji Impex", label: "Sai Balaji Impex" },
              ].map((comp) => {
                const isSelected = selectedCompanies.includes(comp.key);
                const count = liveFacets.companies[comp.key] || 0;

                return (
                  <button
                    key={comp.key}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCompanies(selectedCompanies.filter((c) => c !== comp.key));
                      } else {
                        setSelectedCompanies([...selectedCompanies, comp.key]);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-1.5 transition-all cursor-pointer whitespace-nowrap border ${
                      isSelected
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-[#f4f4f5] text-[#555555] hover:text-[#111111] border-[#e4e4e7] hover:border-[#111111]"
                    }`}
                  >
                    <span>{comp.label}</span>
                    <span className={`text-[10px] font-mono ${isSelected ? "text-[#cccccc]" : "text-[#888888]"}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
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
              {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
            </span>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <label htmlFor="sort-select" className="sr-only">Sort By</label>
              <div className="relative flex items-center">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-transparent pl-2 pr-7 py-1 text-[11px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer border-none focus:outline-hidden"
                >
                  <option value="featured">SORT BY: FEATURED</option>
                  <option value="rating">SORT BY: TOP RATED</option>
                  <option value="name-asc">SORT BY: NAME (A - Z)</option>
                  <option value="name-desc">SORT BY: NAME (Z - A)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#111111] pointer-events-none absolute right-1" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. MAIN CONTENT (COLLAPSIBLE SIDEBAR + CLEAN BORDER GRID) ── */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 pt-6">
        <div className="flex items-start">
          
          {/* ── LEFT DESKTOP SIDEBAR ACCORDION FILTERS ── */}
          {isFilterOpen && (
            <aside className="hidden lg:block w-64 xl:w-72 flex-none pr-8 pb-12 select-none border-r border-[#e5e5e5] mr-6">
              
              <div className="divide-y divide-[#e5e5e5]">
                
                {/* Filter 1: Category */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleSection("category")}
                    className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                  >
                    <span>Category</span>
                    {openSections.category ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {openSections.category && (
                    <div className="mt-3.5 space-y-2.5">
                      {[
                        { key: "slate", label: "Slate Stone (incl. CNC)", count: liveFacets.categories.slate || 90 },
                        { key: "applications", label: "Applications (Pavers & Cladding)", count: liveFacets.categories.applications || 2 },
                        { key: "limestone", label: "Limestone", count: liveFacets.categories.limestone || 2 },
                        { key: "south-indian-granite", label: "South Indian Granite", count: liveFacets.categories["south-indian-granite"] || 3 },
                        { key: "north-indian-granite", label: "North Indian Granite", count: liveFacets.categories["north-indian-granite"] || 2 },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(item.key)}
                              onChange={() =>
                                toggleFilter(selectedCategories, setSelectedCategories, item.key)
                              }
                              className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer"
                            />
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-[10.5px] text-[#888888] font-mono">
                            ({item.count})
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filter 1.1: Slate Stone Variety (Official 6 Types) */}
                {(selectedCategories.length === 0 || selectedCategories.includes("slate")) && (
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleSection("slateVariety")}
                      className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                    >
                      <span>Slate Stone Variety</span>
                      {openSections.slateVariety ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {openSections.slateVariety && (
                      <div className="mt-3.5 space-y-2.5">
                        {SLATE_STONE_VARIETIES.map((v) => {
                          const count = liveFacets.slateVarieties?.[v.id] || 0;
                          return (
                            <label
                              key={v.id}
                              className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <input
                                  type="checkbox"
                                  checked={selectedSlateVarieties.includes(v.id)}
                                  onChange={() =>
                                    toggleFilter(selectedSlateVarieties, setSelectedSlateVarieties, v.id)
                                  }
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
                                  <span className="group-hover:translate-x-0.5 transition-transform font-medium">
                                    {v.label}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10.5px] text-[#888888] font-mono">
                                ({count})
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Filter 1.2: Application Subtypes (Official 5 Types) */}
                {(selectedCategories.length === 0 || selectedCategories.includes("applications")) && (
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleSection("applicationSubtype")}
                      className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                    >
                      <span>Application Type</span>
                      {openSections.applicationSubtype ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {openSections.applicationSubtype && (
                      <div className="mt-3.5 space-y-2.5">
                        {APPLICATION_SUBTYPES.map((s) => {
                          const count = liveFacets.applicationSubtypes?.[s.id] || 0;
                          return (
                            <label
                              key={s.id}
                              className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <input
                                  type="checkbox"
                                  checked={selectedApplicationSubtypes.includes(s.id)}
                                  onChange={() =>
                                    toggleFilter(selectedApplicationSubtypes, setSelectedApplicationSubtypes, s.id)
                                  }
                                  className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer"
                                />
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                                    style={{
                                      background: s.hex,
                                    }}
                                  />
                                  <span className="group-hover:translate-x-0.5 transition-transform font-medium">
                                    {s.label}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10.5px] text-[#888888] font-mono">
                                ({count})
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Filter 1.3: Limestone Subtypes (Official 6 Types) */}
                {(selectedCategories.length === 0 || selectedCategories.includes("limestone")) && (
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleSection("limestoneSubtype")}
                      className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                    >
                      <span>Limestone Variety</span>
                      {openSections.limestoneSubtype ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {openSections.limestoneSubtype && (
                      <div className="mt-3.5 space-y-2.5">
                        {LIMESTONE_SUBTYPES.map((l) => {
                          const count = liveFacets.limestoneSubtypes?.[l.id] || 0;
                          return (
                            <label
                              key={l.id}
                              className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <input
                                  type="checkbox"
                                  checked={selectedLimestoneSubtypes.includes(l.id)}
                                  onChange={() =>
                                    toggleFilter(selectedLimestoneSubtypes, setSelectedLimestoneSubtypes, l.id)
                                  }
                                  className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer"
                                />
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                                    style={{
                                      background: l.hex,
                                    }}
                                  />
                                  <span className="group-hover:translate-x-0.5 transition-transform font-medium">
                                    {l.label}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10.5px] text-[#888888] font-mono">
                                ({count})
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Filter 1.4: South Indian Granite (Official 13 Types) */}
                {(selectedCategories.length === 0 || selectedCategories.includes("south-indian-granite")) && (
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleSection("southGraniteSubtype")}
                      className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                    >
                      <span>South Indian Granite</span>
                      {openSections.southGraniteSubtype ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {openSections.southGraniteSubtype && (
                      <div className="mt-3.5 space-y-2.5">
                        {SOUTH_INDIAN_GRANITE_SUBTYPES.map((sg) => {
                          const count = liveFacets.southGraniteSubtypes?.[sg.id] || 0;
                          return (
                            <label
                              key={sg.id}
                              className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <input
                                  type="checkbox"
                                  checked={selectedSouthGraniteSubtypes.includes(sg.id)}
                                  onChange={() =>
                                    toggleFilter(selectedSouthGraniteSubtypes, setSelectedSouthGraniteSubtypes, sg.id)
                                  }
                                  className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer"
                                />
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                                    style={{
                                      background: sg.hex,
                                    }}
                                  />
                                  <span className="group-hover:translate-x-0.5 transition-transform font-medium">
                                    {sg.label}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10.5px] text-[#888888] font-mono">
                                ({count})
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Filter 1.5: North Indian Granite (Official 2 Types) */}
                {(selectedCategories.length === 0 || selectedCategories.includes("north-indian-granite")) && (
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleSection("northGraniteSubtype")}
                      className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                    >
                      <span>North Indian Granite</span>
                      {openSections.northGraniteSubtype ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {openSections.northGraniteSubtype && (
                      <div className="mt-3.5 space-y-2.5">
                        {NORTH_INDIAN_GRANITE_SUBTYPES.map((ng) => {
                          const count = liveFacets.northGraniteSubtypes?.[ng.id] || 0;
                          return (
                            <label
                              key={ng.id}
                              className="flex items-center justify-between text-[12px] text-[#444444] hover:text-[#111111] cursor-pointer group"
                            >
                              <div className="flex items-center gap-2.5">
                                <input
                                  type="checkbox"
                                  checked={selectedNorthGraniteSubtypes.includes(ng.id)}
                                  onChange={() =>
                                    toggleFilter(selectedNorthGraniteSubtypes, setSelectedNorthGraniteSubtypes, ng.id)
                                  }
                                  className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer"
                                />
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                                    style={{
                                      background: ng.hex,
                                    }}
                                  />
                                  <span className="group-hover:translate-x-0.5 transition-transform font-medium">
                                    {ng.label}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10.5px] text-[#888888] font-mono">
                                ({count})
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Filter 2: Stone Division / Operating Quarry */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleSection("company")}
                    className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                  >
                    <span>Quarry Division</span>
                    {openSections.company ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {openSections.company && (
                    <div className="mt-3.5 space-y-2.5">
                      {[
                        { key: "Pavan Impex", label: "Pavan Impex (Slates)", count: liveFacets.companies["Pavan Impex"] || 0 },
                        { key: "PSG Stones", label: "PSG Stones (CNC & Murals)", count: liveFacets.companies["PSG Stones"] || 0 },
                        { key: "Sai Balaji Impex", label: "Sai Balaji (Limestones)", count: liveFacets.companies["Sai Balaji Impex"] || 0 },
                        { key: "Pavan Granite", label: "Pavan Granite (Black Galaxy)", count: liveFacets.companies["Pavan Granite"] || 0 },
                        { key: "Pavan Stones World", label: "Pavan Stones World (Exotics)", count: liveFacets.companies["Pavan Stones World"] || 0 },
                      ].map((item) => {
                        const isSelected = selectedCompanies.includes(item.key);
                        const isDisabled = item.count === 0 && !isSelected;

                        return (
                          <label
                            key={item.key}
                            className={`flex items-center justify-between text-[12px] group ${
                              isDisabled
                                ? "opacity-35 cursor-not-allowed text-[#999999]"
                                : "text-[#444444] hover:text-[#111111] cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() =>
                                  toggleFilter(selectedCompanies, setSelectedCompanies, item.key)
                                }
                                className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                              />
                              <span className="group-hover:translate-x-0.5 transition-transform truncate max-w-[170px]">
                                {item.label}
                              </span>
                            </div>
                            <span className="text-[10.5px] text-[#888888] font-mono">
                              ({item.count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Filter 3: Color Tone */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleSection("color")}
                    className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                  >
                    <span>Color Tone</span>
                    {openSections.color ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {openSections.color && (
                    <div className="mt-3.5 space-y-2.5">
                      {ARCHITECTURAL_COLORS.map((col) => {
                        const count = liveFacets.colors[col.id] || 0;
                        const isSelected = selectedColors.includes(col.id);
                        const isDisabled = count === 0 && !isSelected;

                        return (
                          <label
                            key={col.id}
                            className={`flex items-center justify-between text-[12px] group ${
                              isDisabled
                                ? "opacity-35 cursor-not-allowed text-[#999999]"
                                : "text-[#444444] hover:text-[#111111] cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() =>
                                  toggleFilter(selectedColors, setSelectedColors, col.id)
                                }
                                className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
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
                            <span className="text-[10.5px] text-[#888888] font-mono">
                              ({count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Filter 4: Surface Finishes */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleSection("finish")}
                    className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                  >
                    <span>Surface Finish</span>
                    {openSections.finish ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {openSections.finish && (
                    <div className="mt-3.5 space-y-2.5">
                      {ARCHITECTURAL_FINISHES.map((finish) => {
                        const count = liveFacets.finishes[finish.id] || 0;
                        const isSelected = selectedFinishes.includes(finish.id);
                        const isDisabled = count === 0 && !isSelected;

                        return (
                          <label
                            key={finish.id}
                            className={`flex items-center justify-between text-[12px] group ${
                              isDisabled
                                ? "opacity-35 cursor-not-allowed text-[#999999]"
                                : "text-[#444444] hover:text-[#111111] cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() =>
                                  toggleFilter(selectedFinishes, setSelectedFinishes, finish.id)
                                }
                                className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                              />
                              <span className="group-hover:translate-x-0.5 transition-transform">{finish.label}</span>
                            </div>
                            <span className="text-[10.5px] text-[#888888] font-mono">
                              ({count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Filter 5: Tile / Slab Size */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleSection("size")}
                    className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                  >
                    <span>Tile & Slab Size</span>
                    {openSections.size ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {openSections.size && (
                    <div className="mt-3.5 space-y-2.5">
                      {ARCHITECTURAL_SIZES.map((sz) => {
                        const count = liveFacets.sizes[sz.id] || 0;
                        const isSelected = selectedSizes.includes(sz.id);
                        const isDisabled = count === 0 && !isSelected;

                        return (
                          <label
                            key={sz.id}
                            className={`flex items-center justify-between text-[12px] group ${
                              isDisabled
                                ? "opacity-35 cursor-not-allowed text-[#999999]"
                                : "text-[#444444] hover:text-[#111111] cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() =>
                                  toggleFilter(selectedSizes, setSelectedSizes, sz.id)
                                }
                                className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                              />
                              <span className="group-hover:translate-x-0.5 transition-transform">{sz.label}</span>
                            </div>
                            <span className="text-[10.5px] text-[#888888] font-mono">
                              ({count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Filter 6: Application Area */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleSection("area")}
                    className="w-full flex items-center justify-between text-left text-[11.5px] font-bold uppercase tracking-wider text-[#111111] hover:text-black cursor-pointer"
                  >
                    <span>Application Area</span>
                    {openSections.area ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {openSections.area && (
                    <div className="mt-3.5 space-y-2.5">
                      {APPLICATION_AREAS.map((item) => {
                        const count = liveFacets.areas[item.id] || 0;
                        const isSelected = selectedAreas.includes(item.id);
                        const isDisabled = count === 0 && !isSelected;

                        return (
                          <label
                            key={item.id}
                            className={`flex items-center justify-between text-[12px] group ${
                              isDisabled
                                ? "opacity-35 cursor-not-allowed text-[#999999]"
                                : "text-[#444444] hover:text-[#111111] cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() =>
                                  toggleFilter(selectedAreas, setSelectedAreas, item.id)
                                }
                                className="w-3.5 h-3.5 rounded-none border-[#cccccc] text-[#111111] focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
                              />
                              <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                            </div>
                            <span className="text-[10.5px] text-[#888888] font-mono">
                              ({count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>

              {/* ── BOTTOM RESET BUTTON (EXACT MATCH TO SCREENSHOT) ── */}
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

          {/* ── RIGHT PRODUCT GRID (BORDER-GRID AESTHETIC LIKE SCREENSHOT) ── */}
          <main id="product-catalog-grid" className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 px-6 border border-[#e5e5e5] bg-[#fafafa]">
                <Sparkles className="w-8 h-8 mx-auto text-[#71717a] mb-3 stroke-[1.5]" />
                <h3 className="text-base font-bold uppercase tracking-wider text-[#111111] mb-2">
                  No Matching Stones Found
                </h3>
                <p className="text-xs text-[#71717a] max-w-md mx-auto mb-6">
                  Try unchecking some of your active filters or clear all filters to browse our complete architectural stone collection.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#111111] hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider rounded-none cursor-pointer"
                >
                  Reset All Filters
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
                {paginatedProducts.map((product) => {
                  const isItemWishlisted = isWishlisted(product.id);

                  return (
                    <div
                      key={product.id}
                      className="border-r border-b border-[#e5e5e5] bg-white group flex flex-col justify-between transition-all duration-200 hover:z-10 relative"
                    >
                      {/* Dual-Tone (#252422 / #e63946) Hover Border Overlay */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                        {/* Top Border (Solid #252422) */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#252422]" />
                        {/* Bottom Border (Solid #e63946) */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e63946]" />
                        {/* Right Border (#252422 at top-right going down 20%, then #e63946) */}
                        <div
                          className="absolute top-0 bottom-0 right-0 w-[2px]"
                          style={{
                            background: "linear-gradient(to bottom, #252422 0%, #252422 20%, #e63946 20%, #e63946 100%)",
                          }}
                        />
                        {/* Left Border (#252422 from top 80%, turning to #e63946 at bottom-left 20% going up) */}
                        <div
                          className="absolute top-0 bottom-0 left-0 w-[2px]"
                          style={{
                            background: "linear-gradient(to bottom, #252422 0%, #252422 80%, #e63946 80%, #e63946 100%)",
                          }}
                        />
                      </div>

                      {/* Top Action Tags & Badge Bar */}
                      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#f9f9f9]">

                        {/* Top-Left Wishlist Heart Toggle */}
                        <button
                          type="button"
                          onClick={(e) => toggleWishlist(product.id, e)}
                          className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 w-7 h-7 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#111111] shadow-2xs transition-all cursor-pointer"
                          title="Save to shortlist"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 transition-colors ${
                              isItemWishlisted
                                ? "fill-[#ef4444] text-[#ef4444]"
                                : "text-[#71717a] hover:text-[#ef4444]"
                            }`}
                          />
                        </button>

                        {/* Product Image Link with 2-second hover rotation for multi-image products */}
                        <Link
                          href={`/products/${product.id}`}
                          className="block w-full h-full p-4 sm:p-5"
                        >
                          <ProductCardImage
                            images={product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]}
                            alt={product.name}
                            intervalMs={2000}
                          />
                        </Link>

                        {/* Quick View Button Hover Overlay */}
                        <div className="absolute inset-x-0 bottom-2.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex justify-center pointer-events-none">
                          <button
                            type="button"
                            onClick={() => {
                              setQuickViewProduct(product);
                              setActiveQuickViewImage(product.gallery?.[0] || product.image);
                            }}
                            className="pointer-events-auto px-3.5 py-1.5 bg-white/95 hover:bg-[#660708] text-[#241919] hover:text-[#d3d3d3] text-[9.5px] font-mono font-bold uppercase tracking-wider rounded-[5px] shadow-md border border-[#241919]/10 backdrop-blur-md flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 hover:scale-105"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Quick View</span>
                          </button>
                        </div>

                      </div>

                      {/* Product Metadata & Information */}
                      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white border-t border-[#f0f0f0]">
                        <div>
                          {/* Product Title */}
                          <Link href={`/products/${product.id}`}>
                            <h2 className="text-[13px] sm:text-[14px] font-semibold text-[#241919] leading-snug hover:text-[#c85a32] transition-colors line-clamp-1">
                              {product.name}
                            </h2>
                          </Link>

                          {/* 5-Star Rating Row */}
                          <div className="flex items-center gap-1 mt-1 mb-1.5">
                            <div className="flex text-[#f59e0b]">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3 h-3 fill-current text-[#f59e0b]"
                                />
                              ))}
                            </div>
                            <span className="text-[10px] font-mono text-[#747474] ml-1">
                              ({product.reviewCount || 24})
                            </span>
                          </div>

                          {/* Badge tag under rating */}
                          {product.badge && (
                            <div className="mt-1 mb-0.5">
                              <span className="inline-block text-[#d97706] text-[9.5px] font-mono uppercase tracking-wider font-extrabold">
                                {product.badge}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Bottom Direct Links */}
                        <div className="mt-3 pt-2.5 border-t border-[#f4f4f5] flex items-center justify-between text-[10.5px] font-mono uppercase tracking-wider">
                          <span className="truncate max-w-[130px] font-semibold text-[#ff5500]">{product.company}</span>
                          <Link
                            href={`/products/${product.id}`}
                            className="inline-flex items-center gap-0.5 font-bold transition-colors group/specs"
                          >
                            <span className="text-[#111111] group-hover/specs:underline">Specs</span>
                            <ArrowUpRight className="w-3 h-3 text-[#ff5500] group-hover/specs:translate-x-0.5 group-hover/specs:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {filteredProducts.length > 0 && (
              <ProductPagination
                totalItems={filteredProducts.length}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                scrollTargetId="product-catalog-grid"
              />
            )}
          </main>

        </div>
      </section>

      {/* ── 5. MOBILE FILTER DRAWER (FOR PHONES & SMALL TABLETS) ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-2xs"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="relative w-full max-w-xs sm:max-w-sm bg-white h-full overflow-y-auto z-10 flex flex-col justify-between p-6 shadow-xl"
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

                {/* Mobile Filter Sections */}
                <div className="divide-y divide-[#e5e5e5] py-2">
                  
                  {/* Category */}
                  <div className="py-3">
                    <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                      Category
                    </span>
                    <div className="space-y-2">
                      {[
                        { key: "slate", label: "Slate Stone (incl. CNC)", count: liveFacets.categories.slate || 88 },
                        { key: "applications", label: "Applications (Pavers & Cladding)", count: liveFacets.categories.applications || 2 },
                        { key: "limestone", label: "Limestone", count: liveFacets.categories.limestone || 2 },
                        { key: "south-indian-granite", label: "South Indian Granite", count: liveFacets.categories["south-indian-granite"] || 3 },
                        { key: "north-indian-granite", label: "North Indian Granite", count: liveFacets.categories["north-indian-granite"] || 2 },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between text-xs text-[#444444]">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(item.key)}
                              onChange={() =>
                                toggleFilter(selectedCategories, setSelectedCategories, item.key)
                              }
                              className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                            />
                            <span>{item.label}</span>
                          </div>
                          <span className="text-[10px] text-[#888888] font-mono">
                            ({item.count})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Slate Stone Variety (Official 6 Types) */}
                  {(selectedCategories.length === 0 || selectedCategories.includes("slate")) && (
                    <div className="py-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                        Slate Stone Variety
                      </span>
                      <div className="space-y-2">
                        {SLATE_STONE_VARIETIES.map((v) => (
                          <label key={v.id} className="flex items-center justify-between text-xs text-[#444444]">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedSlateVarieties.includes(v.id)}
                                onChange={() =>
                                  toggleFilter(selectedSlateVarieties, setSelectedSlateVarieties, v.id)
                                }
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
                              ({liveFacets.slateVarieties?.[v.id] || 0})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Application Subtypes (Official 5 Types) */}
                  {(selectedCategories.length === 0 || selectedCategories.includes("applications")) && (
                    <div className="py-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                        Application Type
                      </span>
                      <div className="space-y-2">
                        {APPLICATION_SUBTYPES.map((s) => (
                          <label key={s.id} className="flex items-center justify-between text-xs text-[#444444]">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedApplicationSubtypes.includes(s.id)}
                                onChange={() =>
                                  toggleFilter(selectedApplicationSubtypes, setSelectedApplicationSubtypes, s.id)
                                }
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                                  style={{
                                    background: s.hex,
                                  }}
                                />
                                <span className="font-medium">{s.label}</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({liveFacets.applicationSubtypes?.[s.id] || 0})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Limestone Subtypes (Official 6 Types) */}
                  {(selectedCategories.length === 0 || selectedCategories.includes("limestone")) && (
                    <div className="py-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                        Limestone Variety
                      </span>
                      <div className="space-y-2">
                        {LIMESTONE_SUBTYPES.map((l) => (
                          <label key={l.id} className="flex items-center justify-between text-xs text-[#444444]">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedLimestoneSubtypes.includes(l.id)}
                                onChange={() =>
                                  toggleFilter(selectedLimestoneSubtypes, setSelectedLimestoneSubtypes, l.id)
                                }
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                                  style={{
                                    background: l.hex,
                                  }}
                                />
                                <span className="font-medium">{l.label}</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({liveFacets.limestoneSubtypes?.[l.id] || 0})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* South Indian Granite (Official 13 Types) */}
                  {(selectedCategories.length === 0 || selectedCategories.includes("south-indian-granite")) && (
                    <div className="py-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                        South Indian Granite
                      </span>
                      <div className="space-y-2">
                        {SOUTH_INDIAN_GRANITE_SUBTYPES.map((sg) => (
                          <label key={sg.id} className="flex items-center justify-between text-xs text-[#444444]">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedSouthGraniteSubtypes.includes(sg.id)}
                                onChange={() =>
                                  toggleFilter(selectedSouthGraniteSubtypes, setSelectedSouthGraniteSubtypes, sg.id)
                                }
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                                  style={{
                                    background: sg.hex,
                                  }}
                                />
                                <span className="font-medium">{sg.label}</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({liveFacets.southGraniteSubtypes?.[sg.id] || 0})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* North Indian Granite (Official 2 Types) */}
                  {(selectedCategories.length === 0 || selectedCategories.includes("north-indian-granite")) && (
                    <div className="py-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                        North Indian Granite
                      </span>
                      <div className="space-y-2">
                        {NORTH_INDIAN_GRANITE_SUBTYPES.map((ng) => (
                          <label key={ng.id} className="flex items-center justify-between text-xs text-[#444444]">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedNorthGraniteSubtypes.includes(ng.id)}
                                onChange={() =>
                                  toggleFilter(selectedNorthGraniteSubtypes, setSelectedNorthGraniteSubtypes, ng.id)
                                }
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                                  style={{
                                    background: ng.hex,
                                  }}
                                />
                                <span className="font-medium">{ng.label}</span>
                              </div>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({liveFacets.northGraniteSubtypes?.[ng.id] || 0})
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quarry Division */}
                  <div className="py-3">
                    <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                      Quarry Division
                    </span>
                    <div className="space-y-2">
                      {[
                        { key: "Pavan Impex", label: "Pavan Impex (Slates)", count: liveFacets.companies["Pavan Impex"] || 0 },
                        { key: "PSG Stones", label: "PSG Stones (CNC & Murals)", count: liveFacets.companies["PSG Stones"] || 0 },
                        { key: "Sai Balaji Impex", label: "Sai Balaji (Limestones)", count: liveFacets.companies["Sai Balaji Impex"] || 0 },
                        { key: "Pavan Granite", label: "Pavan Granite (Black Galaxy)", count: liveFacets.companies["Pavan Granite"] || 0 },
                        { key: "Pavan Stones World", label: "Pavan Stones World (Exotics)", count: liveFacets.companies["Pavan Stones World"] || 0 },
                      ].map((item) => {
                        const isSelected = selectedCompanies.includes(item.key);
                        const isDisabled = item.count === 0 && !isSelected;

                        return (
                          <label
                            key={item.key}
                            className={`flex items-center justify-between text-xs ${
                              isDisabled ? "opacity-35 text-[#999999]" : "text-[#444444]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() =>
                                  toggleFilter(selectedCompanies, setSelectedCompanies, item.key)
                                }
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <span className="truncate max-w-[180px]">{item.label}</span>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({item.count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Color Tone */}
                  <div className="py-3">
                    <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                      Color Tone
                    </span>
                    <div className="space-y-2">
                      {ARCHITECTURAL_COLORS.map((col) => {
                        const count = liveFacets.colors[col.id] || 0;
                        const isSelected = selectedColors.includes(col.id);
                        const isDisabled = count === 0 && !isSelected;

                        return (
                          <label
                            key={col.id}
                            className={`flex items-center justify-between text-xs ${
                              isDisabled ? "opacity-35 text-[#999999]" : "text-[#444444]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() =>
                                  toggleFilter(selectedColors, setSelectedColors, col.id)
                                }
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
                              ({count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Surface Finish */}
                  <div className="py-3">
                    <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                      Surface Finish
                    </span>
                    <div className="space-y-2">
                      {ARCHITECTURAL_FINISHES.map((fin) => {
                        const count = liveFacets.finishes[fin.id] || 0;
                        const isSelected = selectedFinishes.includes(fin.id);
                        const isDisabled = count === 0 && !isSelected;

                        return (
                          <label
                            key={fin.id}
                            className={`flex items-center justify-between text-xs ${
                              isDisabled ? "opacity-35 text-[#999999]" : "text-[#444444]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() =>
                                  toggleFilter(selectedFinishes, setSelectedFinishes, fin.id)
                                }
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <span>{fin.label}</span>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tile & Slab Size */}
                  <div className="py-3">
                    <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                      Tile & Slab Size
                    </span>
                    <div className="space-y-2">
                      {ARCHITECTURAL_SIZES.map((sz) => {
                        const count = liveFacets.sizes[sz.id] || 0;
                        const isSelected = selectedSizes.includes(sz.id);
                        const isDisabled = count === 0 && !isSelected;

                        return (
                          <label
                            key={sz.id}
                            className={`flex items-center justify-between text-xs ${
                              isDisabled ? "opacity-35 text-[#999999]" : "text-[#444444]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() =>
                                  toggleFilter(selectedSizes, setSelectedSizes, sz.id)
                                }
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <span>{sz.label}</span>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Application Area */}
                  <div className="py-3">
                    <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 text-[#111111]">
                      Application Area
                    </span>
                    <div className="space-y-2">
                      {APPLICATION_AREAS.map((item) => {
                        const count = liveFacets.areas[item.id] || 0;
                        const isSelected = selectedAreas.includes(item.id);
                        const isDisabled = count === 0 && !isSelected;

                        return (
                          <label
                            key={item.id}
                            className={`flex items-center justify-between text-xs ${
                              isDisabled ? "opacity-35 text-[#999999]" : "text-[#444444]"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isDisabled}
                                onChange={() =>
                                  toggleFilter(selectedAreas, setSelectedAreas, item.id)
                                }
                                className="w-4 h-4 rounded-none border-[#cccccc] text-[#111111]"
                              />
                              <span>{item.label}</span>
                            </div>
                            <span className="text-[10px] text-[#888888] font-mono">
                              ({count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* Mobile Drawer Bottom Actions */}
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

      {/* ── 6. QUICK VIEW MODAL (INSPECT SPECIMEN) ── */}
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
              className="relative w-full max-w-3xl bg-white border border-[#241919]/10 rounded-2xl shadow-2xl shadow-[#241919]/25 z-10 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#faf8f5]/90 hover:bg-[#c85a32] flex items-center justify-center text-[#241919] hover:text-white border border-[#241919]/15 shadow-sm cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Column - Fills entire left height seamlessly */}
                <div className="relative flex flex-col justify-between bg-[#f8fafc] p-5 sm:p-6 border-b md:border-b-0 md:border-r border-[#e2e8f0]">
                  {/* Main Image Area */}
                  <div className="relative w-full flex-1 min-h-[220px] sm:min-h-[260px] flex items-center justify-center">
                    <img
                      src={activeQuickViewImage || quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="max-h-[280px] w-full object-contain drop-shadow-sm transition-all duration-300"
                    />
                    {quickViewProduct.badge && (
                      <div className="absolute top-2 left-2 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[#d97706] text-[9.5px] font-mono uppercase tracking-wider font-extrabold rounded-[4px] shadow-xs border border-[#d97706]/30">
                        {quickViewProduct.badge}
                      </div>
                    )}
                  </div>

                  {/* Left Bottom Section: Multi-angle Thumbnails or Quality Badges */}
                  <div className="mt-4 pt-3 border-t border-[#e2e8f0]">
                    {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                          {quickViewProduct.gallery.map((img, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActiveQuickViewImage(img)}
                              className={`relative w-11 h-11 rounded-lg overflow-hidden border-2 flex-none cursor-pointer transition-all ${
                                (activeQuickViewImage || quickViewProduct.image) === img
                                  ? "border-[#059669] ring-2 ring-[#059669]/20 scale-105"
                                  : "border-[#e2e8f0] hover:border-[#059669]/50 opacity-70 hover:opacity-100"
                              }`}
                            >
                              <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#64748b]">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                            {quickViewProduct.company} Verified
                          </span>
                          <span>{quickViewProduct.gallery.length} Quarry Views</span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#64748b]">
                        <div className="flex items-center gap-1.5 bg-white px-2.5 py-2 rounded-lg border border-[#e2e8f0] shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                          <span className="truncate">100% Natural Stone</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white px-2.5 py-2 rounded-lg border border-[#e2e8f0] shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                          <span className="truncate">FOB / CIF Export</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#059669] font-bold mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                      <span>{quickViewProduct.company} • {quickViewProduct.origin.split(",")[0]}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-tight mb-2">
                      {quickViewProduct.name}
                    </h3>
                    
                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex text-[#f59e0b]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-mono font-bold text-[#059669]">
                        {quickViewProduct.rating || 5}
                      </span>
                      <span className="text-xs font-mono text-[#64748b]">
                        ({quickViewProduct.reviewCount || 24} reviews)
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed line-clamp-3 mb-4 font-normal">
                      {quickViewProduct.description}
                    </p>

                    {/* Spec Highlights Container */}
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3.5 my-3 space-y-2 text-[11.5px]">
                      <div className="flex justify-between items-center">
                        <span className="text-[#64748b] font-mono text-[10.5px] uppercase tracking-wider">Primary Finish:</span>
                        <span className="font-semibold text-[#0f172a]">{quickViewProduct.finish}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#64748b] font-mono text-[10.5px] uppercase tracking-wider">Calibrated Thickness:</span>
                        <span className="font-semibold text-[#0f172a]">{quickViewProduct.thickness}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#64748b] font-mono text-[10.5px] uppercase tracking-wider">Quarry Type:</span>
                        <span className="font-semibold text-[#0f172a]">{quickViewProduct.quarryType.split("(")[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-2">
                    <Link
                      href={`/products/${quickViewProduct.id}`}
                      className="w-full text-center py-2.5 sm:py-3 bg-[#111111] hover:bg-black active:scale-[0.99] text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-lg block transition-all shadow-md hover:shadow-lg shadow-black/20 cursor-pointer"
                    >
                      View Product Details
                    </Link>
                    <Link
                      href={`/request-sample?stone=${quickViewProduct.id}`}
                      className="w-full text-center py-2.5 sm:py-3 bg-transparent hover:bg-[#111111] active:scale-[0.99] text-[#111111] hover:text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-lg block transition-all border-2 border-[#111111] cursor-pointer"
                    >
                      Request Sample
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

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white pt-32 text-center text-xs font-mono uppercase tracking-widest text-[#71717a]">
          Loading Stone Collection...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
