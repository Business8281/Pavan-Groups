"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Grid3x3,
  Grid2x2,
  List,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PRODUCTS_DATABASE, ProductStone } from "@/lib/productsData";


function ProductsContent() {
  const searchParams = useSearchParams();

  // Filter States
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // UI States
  const [viewMode, setViewMode] = useState<"grid3" | "grid2" | "list">("grid3");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [imageIndex, setImageIndex] = useState<Record<string, number>>({});

  // Initialize and Sync Filters from URL Query Params (Homepage Clicks)
  useEffect(() => {
    const companyParam = searchParams.get("company");
    const stoneParam = searchParams.get("stone");
    const colorParam = searchParams.get("color");
    const sizeParam = searchParams.get("size");
    const finishParam = searchParams.get("finish");
    const areaParam = searchParams.get("area");

    if (companyParam) {
      if (companyParam.toLowerCase().includes("pavan impex") || companyParam === "pavan-impex") {
        setSelectedCompanies(["Pavan Impex"]);
      } else if (companyParam.toLowerCase().includes("sai balaji") || companyParam === "sai-balaji-impex") {
        setSelectedCompanies(["Sai Balaji Impex"]);
      } else if (companyParam.toLowerCase().includes("pavan granite") || companyParam === "pavan-granite") {
        setSelectedCompanies(["Pavan Granite"]);
      } else {
        setSelectedCompanies([companyParam]);
      }
    } else if (stoneParam) {
      if (stoneParam === "slate") setSelectedCompanies(["Pavan Impex"]);
      if (stoneParam === "limestone") setSelectedCompanies(["Sai Balaji Impex"]);
      if (stoneParam === "granite") setSelectedCompanies(["Pavan Granite"]);
    }

    if (colorParam) {
      const decodedColor = decodeURIComponent(colorParam);
      if (decodedColor.toLowerCase().includes("midnight") || decodedColor === "black-slate") {
        setSelectedColors(["Midnight Black"]);
      } else if (decodedColor.toLowerCase().includes("gold") || decodedColor === "black-galaxy" || decodedColor.toLowerCase().includes("bronzite")) {
        setSelectedColors(["Gold Bronzite"]);
      } else if (decodedColor.toLowerCase().includes("autumn") || decodedColor.toLowerCase().includes("copper")) {
        setSelectedColors(["Autumn Copper"]);
      } else if (decodedColor.toLowerCase().includes("california")) {
        setSelectedColors(["California Gold"]);
      } else if (decodedColor.toLowerCase().includes("lime yellow") || decodedColor === "lime-yellow") {
        setSelectedColors(["Lime Yellow"]);
      } else {
        setSelectedColors([decodedColor]);
      }
    }

    if (sizeParam) {
      const decodedSize = decodeURIComponent(sizeParam);
      setSelectedSizes([decodedSize]);
    }

    if (finishParam) {
      const decodedFinish = decodeURIComponent(finishParam);
      setSelectedFinishes([decodedFinish]);
    }

    if (areaParam) {
      const decodedArea = decodeURIComponent(areaParam);
      setSelectedAreas([decodedArea]);
    }
  }, [searchParams]);

  // Accordion Expand States for Filter Sections
  const [openSection, setOpenSection] = useState<{
    area: boolean;
    company: boolean;
    finish: boolean;
    size: boolean;
    color: boolean;
  }>({
    area: true,
    company: true,
    finish: true,
    size: true,
    color: true,
  });

  const toggleFilter = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedAreas([]);
    setSelectedCompanies([]);
    setSelectedFinishes([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSearchQuery("");
  };

  // Compute active filter count
  const activeFilterChips = useMemo(() => {
    const chips: { label: string; remove: () => void }[] = [];

    selectedAreas.forEach((area) =>
      chips.push({
        label: area,
        remove: () => setSelectedAreas((prev) => prev.filter((a) => a !== area)),
      })
    );
    selectedCompanies.forEach((company) =>
      chips.push({
        label: company,
        remove: () => setSelectedCompanies((prev) => prev.filter((c) => c !== company)),
      })
    );
    selectedFinishes.forEach((finish) =>
      chips.push({
        label: finish,
        remove: () => setSelectedFinishes((prev) => prev.filter((f) => f !== finish)),
      })
    );
    selectedSizes.forEach((size) =>
      chips.push({
        label: size,
        remove: () => setSelectedSizes((prev) => prev.filter((s) => s !== size)),
      })
    );
    selectedColors.forEach((color) =>
      chips.push({
        label: color,
        remove: () => setSelectedColors((prev) => prev.filter((col) => col !== color)),
      })
    );

    return chips;
  }, [selectedAreas, selectedCompanies, selectedFinishes, selectedSizes, selectedColors]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATABASE.filter((product) => {
      // Search
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Area
      if (
        selectedAreas.length > 0 &&
        !product.area.some((a) => selectedAreas.includes(a))
      ) {
        return false;
      }
      // Company
      if (
        selectedCompanies.length > 0 &&
        !selectedCompanies.includes(product.company)
      ) {
        return false;
      }
      // Finish
      if (
        selectedFinishes.length > 0 &&
        !product.availableFinishes.some((f) => selectedFinishes.includes(f))
      ) {
        return false;
      }
      // Sizes
      if (
        selectedSizes.length > 0 &&
        !product.availableSizes.some((s) => selectedSizes.includes(s))
      ) {
        return false;
      }
      // Colors
      if (
        selectedColors.length > 0 &&
        !selectedColors.includes(product.color)
      ) {
        return false;
      }
      return true;
    });
  }, [
    searchQuery,
    selectedAreas,
    selectedCompanies,
    selectedFinishes,
    selectedSizes,
    selectedColors,
  ]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNextImage = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => ({ ...prev, [id]: ((prev[id] || 0) + 1) % 3 }));
  };

  const handlePrevImage = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => ({ ...prev, [id]: ((prev[id] || 0) - 1 + 3) % 3 }));
  };

  return (
    <div className="bg-[#ffffff] text-[#241919] min-h-screen pt-24 pb-20">
      
      {/* ── BREADCRUMB & HEADER SECTION ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mb-8">
        
        {/* Title */}
        <h1
          className="font-display font-light text-[#241919] leading-[1.04] tracking-[-0.015em] mb-4"
          style={{ fontSize: "clamp(34px, 4.4vw, 56px)" }}
        >
          Tiles & Natural Stones
        </h1>

        {/* Collapsible Editorial Description */}
        <div className="max-w-4xl text-[14px] leading-relaxed text-[#454545] font-light">
          <p>
            Natural stone tiles and calibrated slabs are the premier choice for luxury indoor floors, architectural rainscreen elevations, and heavy-duty outdoor terraces thanks to their high compressive strength, thermal mass, and ease of lifetime maintenance. Pavan Groups extracts and custom-fabricates genuine Markapur Slate, Cuddapah Limestone, and world-renowned Chimakurthy Black Galaxy Granite direct from quarry faces.
          </p>

          {isDescriptionExpanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 text-[#454545]"
            >
              All stone blocks are calibrated to international ASTM C615 and EN 1341 standards, available in monolithic gangsaw slabs, 600x300mm cladding formats, 200x100mm tumbled pavers, and bespoke CNC architectural detailing with worldwide DHL express sample dispatch.
            </motion.p>
          )}

          <button
            type="button"
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-[#0f172a] font-medium text-xs hover:underline mt-2 inline-block cursor-pointer"
          >
            {isDescriptionExpanded ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* ── FILTER CHIPS BAR & CONTROLS ── */}
        <div className="mt-6 pt-6 border-t border-[#747474]/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Active Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {activeFilterChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f5efe6] border border-[#747474]/20 rounded-full text-xs font-sans text-[#241919]"
              >
                <span>{chip.label}</span>
                <button
                  type="button"
                  onClick={chip.remove}
                  className="w-3.5 h-3.5 flex items-center justify-center text-[#747474] hover:text-[#241919] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {activeFilterChips.length > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-sans font-semibold text-[#0f172a] hover:underline ml-2 cursor-pointer"
              >
                Clear All Filters X
              </button>
            )}
          </div>

          {/* View Switcher Icons */}
          <div className="flex items-center gap-1 bg-[#f5efe6] p-1 rounded-md border border-[#747474]/15 flex-none">
            <button
              type="button"
              onClick={() => setViewMode("grid3")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "grid3" ? "bg-white shadow-xs text-[#241919]" : "text-[#747474] hover:text-[#241919]"
              }`}
              title="3 Column Grid"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("grid2")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "grid2" ? "bg-white shadow-xs text-[#241919]" : "text-[#747474] hover:text-[#241919]"
              }`}
              title="2 Column Grid"
            >
              <Grid2x2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                viewMode === "list" ? "bg-white shadow-xs text-[#241919]" : "text-[#747474] hover:text-[#241919]"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* ── MAIN CONTENT: SIDEBAR + PRODUCT GRID ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT SIDEBAR FILTERS (3 Cols) ── */}
          <aside className="lg:col-span-3 space-y-4">
            
            {/* Top Primary Clear Button */}
            <button
              type="button"
              onClick={clearAllFilters}
              className="w-full py-3 bg-[#241919] hover:bg-[#3e352a] text-[#f1f5f9] text-xs font-sans font-semibold uppercase tracking-wider rounded-md shadow-xs transition-all cursor-pointer"
            >
              Clear All Filters
            </button>

            {/* Filter Section 1: Tile Area */}
            <div className="border border-[#747474]/20 rounded-md overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setOpenSection((prev) => ({ ...prev, area: !prev.area }))}
                className="w-full flex items-center justify-between p-3.5 bg-[#e8e4de] text-left text-xs font-sans font-bold uppercase tracking-wider text-[#241919] cursor-pointer"
              >
                <span>Tile Area</span>
                {openSection.area ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSection.area && (
                <div className="p-4 space-y-2.5">
                  {[
                    { key: "elevation", label: "Elevation & Facades" },
                    { key: "flooring", label: "Living Room & Flooring" },
                    { key: "pool", label: "Pool Decks & Wet Areas" },
                    { key: "countertop", label: "Kitchen Countertops" },
                    { key: "driveway", label: "Driveways & Pavers" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2.5 text-xs text-[#454545] hover:text-[#241919] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes(item.key)}
                        onChange={() => toggleFilter(selectedAreas, setSelectedAreas, item.key)}
                        className="w-4 h-4 rounded border-[#747474]/30 text-[#241919] focus:ring-0 cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Section 2: Operating Division / Stone Type */}
            <div className="border border-[#747474]/20 rounded-md overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setOpenSection((prev) => ({ ...prev, company: !prev.company }))}
                className="w-full flex items-center justify-between p-3.5 bg-[#e8e4de] text-left text-xs font-sans font-bold uppercase tracking-wider text-[#241919] cursor-pointer"
              >
                <span>Stone Type</span>
                {openSection.company ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSection.company && (
                <div className="p-4 space-y-2.5">
                  {[
                    { key: "Pavan Impex", label: "Natural Slate (Pavan Impex)" },
                    { key: "Sai Balaji Impex", label: "Limestone (Sai Balaji)" },
                    { key: "Pavan Granite", label: "Black Galaxy (Pavan Granite)" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2.5 text-xs text-[#454545] hover:text-[#241919] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(item.key)}
                        onChange={() => toggleFilter(selectedCompanies, setSelectedCompanies, item.key)}
                        className="w-4 h-4 rounded border-[#747474]/30 text-[#241919] focus:ring-0 cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Section 3: Surface Finishes */}
            <div className="border border-[#747474]/20 rounded-md overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setOpenSection((prev) => ({ ...prev, finish: !prev.finish }))}
                className="w-full flex items-center justify-between p-3.5 bg-[#e8e4de] text-left text-xs font-sans font-bold uppercase tracking-wider text-[#241919] cursor-pointer"
              >
                <span>Surface Finish</span>
                {openSection.finish ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSection.finish && (
                <div className="p-4 space-y-2.5">
                  {[
                    "Natural Cleft",
                    "95+ Mirror Polish",
                    "Honed Matte",
                    "Tumbled Antique",
                    "3D Ledger Relief",
                    "Anti-Skid R11",
                    "Leathered Velvet",
                  ].map((finish) => (
                    <label key={finish} className="flex items-center gap-2.5 text-xs text-[#454545] hover:text-[#241919] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFinishes.includes(finish)}
                        onChange={() => toggleFilter(selectedFinishes, setSelectedFinishes, finish)}
                        className="w-4 h-4 rounded border-[#747474]/30 text-[#241919] focus:ring-0 cursor-pointer"
                      />
                      <span>{finish}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Section 4: Tile Size */}
            <div className="border border-[#747474]/20 rounded-md overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setOpenSection((prev) => ({ ...prev, size: !prev.size }))}
                className="w-full flex items-center justify-between p-3.5 bg-[#e8e4de] text-left text-xs font-sans font-bold uppercase tracking-wider text-[#241919] cursor-pointer"
              >
                <span>Tile Size</span>
                {openSection.size ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSection.size && (
                <div className="p-4 space-y-2.5">
                  {[
                    "600x300 mm",
                    "600x600 mm",
                    "1200x600 mm",
                    "300x300 mm",
                    "Jumbo Gangsaw Slabs",
                    "200x100 mm Pavers",
                    "600x150 mm",
                  ].map((size) => (
                    <label key={size} className="flex items-center gap-2.5 text-xs text-[#454545] hover:text-[#241919] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => toggleFilter(selectedSizes, setSelectedSizes, size)}
                        className="w-4 h-4 rounded border-[#747474]/30 text-[#241919] focus:ring-0 cursor-pointer"
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Section 5: Color Tone */}
            <div className="border border-[#747474]/20 rounded-md overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setOpenSection((prev) => ({ ...prev, color: !prev.color }))}
                className="w-full flex items-center justify-between p-3.5 bg-[#e8e4de] text-left text-xs font-sans font-bold uppercase tracking-wider text-[#241919] cursor-pointer"
              >
                <span>Color Tone</span>
                {openSection.color ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {openSection.color && (
                <div className="p-4 space-y-2.5">
                  {[
                    "Midnight Black",
                    "Gold Bronzite",
                    "Autumn Copper",
                    "California Gold",
                    "Lime Yellow",
                    "Lime Blue",
                  ].map((col) => (
                    <label key={col} className="flex items-center gap-2.5 text-xs text-[#454545] hover:text-[#241919] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(col)}
                        onChange={() => toggleFilter(selectedColors, setSelectedColors, col)}
                        className="w-4 h-4 rounded border-[#747474]/30 text-[#241919] focus:ring-0 cursor-pointer"
                      />
                      <span>{col}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

          </aside>

          {/* ── RIGHT PRODUCT GRID (9 Cols) ── */}
          <main className="lg:col-span-9">
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#f1f5f9] border border-[#747474]/15 rounded-lg p-8">
                <p className="text-base font-sans text-[#241919] mb-3">
                  No matching natural stone tiles found for your selected filters.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#241919] hover:bg-[#3e352a] text-white rounded-md text-xs font-sans font-medium cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid3"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : viewMode === "grid2"
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist[product.id];

                  return (
                    <div
                      key={product.id}
                      className="border border-[#747474]/20 rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      {/* Image Frame with Link to Product Detail Page */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141619]">
                        <Link href={`/products/${product.id}`} className="block w-full h-full">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <div
                              className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                              style={{ background: product.gradient }}
                            />
                          )}
                        </Link>

                        {/* Top-Left Wishlist Heart Icon */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/85 hover:bg-white flex items-center justify-center text-[#241919] shadow-sm transition-all cursor-pointer z-10"
                          title="Save to shortlist"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              isWishlisted ? "fill-[#d94e34] text-[#d94e34]" : "text-[#747474]"
                            }`}
                          />
                        </button>

                        {/* Category Badge */}
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded-lg text-[9.5px] font-mono uppercase tracking-wider text-white">
                          {product.category}
                        </div>
                      </div>

                      {/* Product Content Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          {/* Company / Origin Tag */}
                          <div className="flex items-center justify-between text-[10.5px] font-mono uppercase tracking-wider mb-1.5">
                            <span className="text-[#c85a32] font-semibold">{product.company}</span>
                            <span className="text-[#747474] text-[10px]">{product.origin.split(",")[0]}</span>
                          </div>

                          {/* Stone Name (Clickable link) */}
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-sans font-bold text-[16px] sm:text-[17px] text-[#241919] leading-snug group-hover:text-[#c85a32] transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                        </div>

                        {/* Action Buttons: View Details + Sample + Enquire */}
                        <div className="space-y-2 pt-1">
                          <Link
                            href={`/products/${product.id}`}
                            className="w-full text-center py-2.5 px-3 bg-[#241919] hover:bg-[#c85a32] text-white rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-colors block shadow-2xs hover:shadow-xs"
                          >
                            View Stone Details →
                          </Link>

                          <div className="flex items-center gap-2">
                            <Link
                              href={`/request-sample?stone=${product.id}`}
                              className="flex-1 text-center py-2 px-2.5 bg-[#faf8f5] hover:bg-[#f0ebe1] border border-[#747474]/20 text-[#241919] rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors"
                            >
                              Sample
                            </Link>

                            <Link
                              href="/#contact"
                              className="flex-1 text-center py-2 px-2.5 bg-[#faf8f5] hover:bg-[#f0ebe1] border border-[#747474]/20 text-[#241919] rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors"
                            >
                              Enquire
                            </Link>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </main>

        </div>
      </div>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-32 text-center text-sm font-mono text-[#747474]">Loading Stone Catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
