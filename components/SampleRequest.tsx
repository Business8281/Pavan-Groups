"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowUpRight, Lock, Package, Layers, FileText, TrendingUp, Search } from "lucide-react";
import { PRODUCTS_DATABASE, ProductStone } from "@/lib/productsData";

const CATEGORY_TABS = [
  { id: "all", label: "All Stones" },
  { id: "granite", label: "Granite" },
  { id: "slate", label: "Slate Stone" },
  { id: "limestone", label: "Limestone" },
  { id: "crazy-pattern", label: "Crazy Pattern" },
  { id: "chipouts", label: "Chipouts & Pavers" },
  { id: "cnc", label: "CNC Murals" },
  { id: "pebbles", label: "Natural Pebbles" },
  { id: "mosaic", label: "Stone Mosaics" },
];

const DESTINATION_PORTS = [
  "Sydney, Australia (Port Botany)",
  "Melbourne, Australia (Port of Melbourne)",
  "Brisbane, Australia (Port of Brisbane)",
  "Fremantle / Perth, Australia",
  "Auckland, New Zealand",
  "Dubai / Jebel Ali, UAE",
  "Dammam / Jeddah, Saudi Arabia",
  "Los Angeles / Long Beach, USA",
  "New York / New Jersey, USA",
  "London Gateway / Felixstowe, UK",
  "Hamburg, Germany",
  "Antwerp, Belgium",
  "Singapore, Port of Singapore",
  "Other International Sea Port",
];

export default function SampleRequest() {
  // Deduplicate products strictly by name to ensure no duplicates
  const uniqueProducts = useMemo(() => {
    const map = new Map<string, ProductStone>();
    PRODUCTS_DATABASE.forEach((p) => {
      const key = p.name.trim().toLowerCase();
      if (!map.has(key)) {
        map.set(key, p);
      }
    });
    return Array.from(map.values());
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(18);
  const [selectedProductId, setSelectedProductId] = useState<string>("black-galaxy-granite");
  const [selectedFinish, setSelectedFinish] = useState<string>("High-Gloss Mirror Polished");
  const [selectedSize, setSelectedSize] = useState<string>("600 x 300 mm (2x1 ft)");
  const [selectedThickness, setSelectedThickness] = useState<string>("20mm (3/4 in)");
  const [estimatedVolume, setEstimatedVolume] = useState<string>("1 x 20ft FCL Container (~700-900 sqm)");
  const [destinationPort, setDestinationPort] = useState<string>("Sydney, Australia (Port Botany)");
  const [customPort, setCustomPort] = useState<string>("");

  const [companyName, setCompanyName] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [courierAddress, setCourierAddress] = useState<string>("");
  const [projectNotes, setProjectNotes] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return uniqueProducts.filter((p) => {
      const matchesCat =
        selectedCategory === "all" ||
        p.category === selectedCategory ||
        (selectedCategory === "limestone" && p.category.includes("limestone")) ||
        (selectedCategory === "slate" && p.category.includes("slate"));

      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase().trim());

      return matchesCat && matchesSearch;
    });
  }, [uniqueProducts, selectedCategory, searchQuery]);

  const currentProduct = useMemo(() => {
    return (
      uniqueProducts.find((p) => p.id === selectedProductId) ||
      uniqueProducts.find((p) => p.id === "black-galaxy") ||
      uniqueProducts[0]
    );
  }, [uniqueProducts, selectedProductId]);

  const availableFinishes = useMemo(() => {
    if (currentProduct?.availableFinishes && currentProduct.availableFinishes.length > 0) {
      return currentProduct.availableFinishes;
    }
    return ["Natural Cleft", "Honed Matte", "High-Gloss Mirror Polish", "Thermal Flamed", "Tumbled Antique"];
  }, [currentProduct]);

  const handleProductSelect = (product: ProductStone) => {
    setSelectedProductId(product.id);
    const finishes =
      product.availableFinishes && product.availableFinishes.length > 0
        ? product.availableFinishes
        : ["Natural Cleft", "Honed Matte", "High-Gloss Mirror Polish", "Thermal Flamed", "Tumbled Antique"];
    setSelectedFinish(finishes[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `PAVAN-SMP-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceNumber(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section
      id="request-sample"
      className="relative pt-10 pb-20 md:pt-14 md:pb-28 px-4 sm:px-6 md:px-12 lg:px-16 bg-gradient-to-b from-[#faf8f5] via-white to-[#faf8f5] overflow-hidden"
    >
      {/* Subtle brand ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ff5500]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#003049]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="max-w-3xl mb-8 md:mb-12">
          <h2 className="font-display font-light text-[#003049] leading-[1.08] tracking-[-0.02em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            Request an Architectural <span className="text-[#ff5500] italic font-serif font-normal">Sample Kit</span>
          </h2>
          <p className="text-[#003049]/75 text-sm sm:text-base md:text-[17px] font-light leading-relaxed">
            Complimentary air courier dispatch of calibrated natural stone specimens, finish swatches, and certified ASTM laboratory test reports delivered to your office or atelier worldwide within 48–72 hours.
          </p>
        </div>

        {/* ── 2-COLUMN ATELIER LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── LEFT COLUMN: BESPOKE SAMPLE REQUEST CONCIERGE FORM (7 Cols) ── */}
          <div className="lg:col-span-7 bg-white border border-[#003049]/12 rounded-xl p-5 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(0,48,73,0.06)] relative overflow-hidden">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff5500] to-[#e04300] flex items-center justify-center mx-auto shadow-xl shadow-[#ff5500]/30 text-3xl text-white ring-8 ring-[#ff5500]/15"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Check size={38} className="text-white stroke-[2.5]" />
                  </motion.div>
                </motion.div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.26em] font-bold text-[#ff5500] block mb-3">
                    SAMPLE DISPATCH QUEUED SUCCESSFULLY
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-light text-[#003049] mb-3">
                    Thank You, {contactName || "Valued Client"}
                  </h3>
                  <div className="inline-flex items-center justify-center gap-2.5 text-xs font-mono text-[#003049] font-semibold mb-5 bg-[#faf8f5] px-4 py-2 rounded-lg border border-[#003049]/15 shadow-sm">
                    <span>Sample Tracking ID:</span>
                    <span className="text-[#ff5500] font-bold tracking-wider">{referenceNumber}</span>
                  </div>
                  <p className="text-sm sm:text-[15px] text-[#003049]/75 font-light max-w-md mx-auto leading-relaxed">
                    Our export logistics desk has queued your curated <strong className="text-[#003049] font-semibold">{currentProduct.name}</strong> sample kit for priority air courier dispatch to <strong className="text-[#003049] font-semibold">{destinationPort}</strong>.
                  </p>
                </div>

                <div className="p-5 bg-[#faf8f5] border border-[#003049]/12 rounded-lg max-w-md mx-auto text-left space-y-3 text-xs font-mono text-[#003049]/80">
                  <div className="flex justify-between border-b border-[#003049]/10 pb-2">
                    <span>Stone Specimen:</span>
                    <span className="font-bold text-[#003049] text-right">{currentProduct.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#003049]/10 pb-2">
                    <span>Selected Finish:</span>
                    <span className="font-bold text-[#003049] text-right">{selectedFinish}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#003049]/10 pb-2">
                    <span>Target Port:</span>
                    <span className="font-bold text-[#003049] text-right">{destinationPort}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Est. Dispatch:</span>
                    <span className="font-bold text-[#ff5500]">Within 48 Hours (Air Priority)</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3.5 bg-[#003049] hover:bg-[#ff5500] text-white rounded-lg text-[11px] font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 cursor-pointer shadow-md shadow-[#003049]/20 hover:shadow-lg hover:shadow-[#ff5500]/30"
                  >
                    Submit Another Request
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">

                {/* ── STEP 1: STONE SPECIMEN SELECTION ── */}
                <div className="space-y-5 pb-8 border-b border-[#003049]/10">
                  <div className="flex items-center gap-3.5">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#ff5500] to-[#e04300] text-white font-mono text-xs sm:text-sm flex items-center justify-center font-bold shadow-md shadow-[#ff5500]/25 ring-4 ring-[#ff5500]/15 flex-none">
                      1
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-normal text-[#003049] tracking-tight">
                      Select Stone Variety & Texture
                    </h3>
                  </div>

                  {/* Category Filter Tabs */}
                  <div className="pl-0 sm:pl-11">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2.5">
                      Select by Category:
                    </label>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                      {CATEGORY_TABS.map((cat) => {
                        const isCatActive = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat.id);
                              setVisibleCount(18);
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer ${isCatActive
                              ? "bg-[#003049] text-white font-bold shadow-xs"
                              : "bg-white border border-[#003049]/15 text-[#003049]/70 hover:text-[#003049] hover:border-[#ff5500]/50"
                              }`}
                          >
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Search */}
                  <div className="pl-0 sm:pl-11">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#003049]/40 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search our stones (e.g. Black Galaxy, Slate, Lime Blue, Red Granite)..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setVisibleCount(18);
                        }}
                        className="w-full bg-[#fbf9f6] focus:bg-white border border-[#003049]/15 focus:border-[#ff5500] focus:ring-2 focus:ring-[#ff5500]/15 rounded-lg text-xs text-[#003049] pl-9 pr-14 py-2 outline-none transition-all placeholder:text-[#003049]/40 font-mono"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#747474] hover:text-[#ff5500] cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Visual Specimen Swatch Grid with Genuine Products */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-3 pl-0 sm:pl-11">
                      Choose Your Stone Specimen ({filteredProducts.length} Available): *
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pl-0 sm:pl-11">
                      {filteredProducts.slice(0, visibleCount).map((prod) => {
                        const isSelected = selectedProductId === prod.id;
                        return (
                          <button
                            key={prod.id}
                            type="button"
                            onClick={() => handleProductSelect(prod)}
                            className={`p-2.5 sm:p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 sm:gap-3 relative overflow-hidden group ${isSelected
                              ? "bg-[#fff9f5] border-2 border-[#ff5500] shadow-[0_4px_16px_rgba(255,85,0,0.14)] ring-1 ring-[#ff5500]/40"
                              : "bg-white hover:bg-[#fffbf8] border-[#003049]/15 hover:border-[#ff5500]/40 shadow-xs hover:shadow"
                              }`}
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden bg-[#faf8f5] border border-black/10 flex-none relative shadow-2xs">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                            <div className="min-w-0 relative z-10 flex-1">
                              <span className={`text-[11.5px] sm:text-[12px] block leading-tight truncate transition-colors ${isSelected ? "text-[#003049] font-bold" : "text-[#003049] font-medium group-hover:text-[#ff5500]"
                                }`}>
                                {prod.name}
                              </span>
                              <span className="text-[9.5px] font-mono text-[#747474] capitalize block truncate mt-0.5">
                                {prod.category.replace("-", " ")}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {filteredProducts.length > visibleCount && (
                      <div className="pl-0 sm:pl-11 mt-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => setVisibleCount((prev) => prev + 24)}
                          className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#003049] hover:text-white bg-white hover:bg-[#003049] border border-[#003049]/20 hover:border-[#003049] rounded-lg transition-all cursor-pointer font-bold shadow-xs"
                        >
                          Show More Stones ({filteredProducts.length - visibleCount} more)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Surface Finish Chips for the selected product */}
                  <div className="pl-0 sm:pl-11 mt-4">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-3">
                      Surface Finish Profile: *
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {availableFinishes.map((fin) => {
                        const isSelected = selectedFinish === fin;
                        return (
                          <button
                            key={fin}
                            type="button"
                            onClick={() => setSelectedFinish(fin)}
                            className={`px-3.5 sm:px-4 py-2 text-xs font-mono rounded-lg transition-all duration-200 cursor-pointer flex items-center ${isSelected
                              ? "bg-[#003049] text-white border-2 border-[#003049] shadow-md shadow-[#003049]/20 font-bold"
                              : "bg-white border border-[#003049]/20 text-[#003049]/80 hover:border-[#ff5500] hover:text-[#ff5500] hover:bg-[#fff9f5]"
                              }`}
                          >
                            <span>{fin}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ── STEP 2: DIMENSIONS & VOLUME ESTIMATE ── */}
                <div className="space-y-5 pb-8 border-b border-[#003049]/10">
                  <div className="flex items-center gap-3.5">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#ff5500] to-[#e04300] text-white font-mono text-xs sm:text-sm flex items-center justify-center font-bold shadow-md shadow-[#ff5500]/25 ring-4 ring-[#ff5500]/15 flex-none">
                      2
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-normal text-[#003049] tracking-tight">
                      Target Sizing & Project Scope
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pl-0 sm:pl-11">
                    <div>
                      <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2">
                        Target Sizing / Form Factor:
                      </label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full bg-[#faf8f5] hover:bg-white focus:bg-white border border-[#003049]/20 hover:border-[#003049]/40 focus:border-[#ff5500] focus:ring-4 focus:ring-[#ff5500]/15 rounded-lg text-[#003049] p-3 sm:p-3.5 text-sm transition-all cursor-pointer outline-none font-medium"
                      >
                        <option value="600 x 300 mm (2x1 ft)">600 x 300 mm (2x1 ft)</option>
                        <option value="600 x 600 mm (2x2 ft)">600 x 600 mm (2x2 ft)</option>
                        <option value="300 x 300 mm (1x1 ft)">300 x 300 mm (1x1 ft)</option>
                        <option value="1200 x 600 mm (4x2 ft)">1200 x 600 mm (4x2 ft)</option>
                        <option value="Jumbo Gangsaw Slabs (10x6 ft)">Jumbo Gangsaw Slabs (10x6 ft)</option>
                        <option value="Tumbled Pavers (200x100mm)">Tumbled Pavers (200x100mm)</option>
                        <option value="Custom Cut-to-Size">Custom Cut-to-Size (Architectural)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2">
                        Target Thickness:
                      </label>
                      <select
                        value={selectedThickness}
                        onChange={(e) => setSelectedThickness(e.target.value)}
                        className="w-full bg-[#faf8f5] hover:bg-white focus:bg-white border border-[#003049]/20 hover:border-[#003049]/40 focus:border-[#ff5500] focus:ring-4 focus:ring-[#ff5500]/15 rounded-lg text-[#003049] p-3 sm:p-3.5 text-sm transition-all cursor-pointer outline-none font-medium"
                      >
                        <option value="12mm (1/2 in)">12mm (1/2 in)</option>
                        <option value="15mm (5/8 in)">15mm (5/8 in)</option>
                        <option value="18mm (3/4 in)">18mm (3/4 in)</option>
                        <option value="20mm (3/4 in) [Most Popular]">20mm (3/4 in) [Standard]</option>
                        <option value="25mm (1 in)">25mm (1 in)</option>
                        <option value="30mm (1 3/16 in)">30mm (1 3/16 in)</option>
                        <option value="40mm (1 1/2 in) Paver">40mm (1 1/2 in) Paver</option>
                      </select>
                    </div>
                  </div>

                  <div className="pl-0 sm:pl-11 mt-4">
                    <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2">
                      Estimated Project Requirement: *
                    </label>
                    <select
                      value={estimatedVolume}
                      onChange={(e) => setEstimatedVolume(e.target.value)}
                      className="w-full bg-[#faf8f5] hover:bg-white focus:bg-white border border-[#003049]/20 hover:border-[#003049]/40 focus:border-[#ff5500] focus:ring-4 focus:ring-[#ff5500]/15 rounded-lg text-[#003049] p-3 sm:p-3.5 text-sm transition-all cursor-pointer outline-none font-medium"
                      required
                    >
                      <option value="Trial Sample Evaluation (< 200 sqm)">Trial Sample Evaluation (&lt; 200 sqm)</option>
                      <option value="200 to 500 sqm (Partial Container)">200 to 500 sqm (Partial Container / LCL)</option>
                      <option value="1 x 20ft FCL Container (~700-900 sqm)">1 x 20ft FCL Container (~700-900 sqm)</option>
                      <option value="2 to 5 x 20ft FCL Containers (1,500 - 4,000 sqm)">2 to 5 x 20ft FCL Containers (1,500 - 4,000 sqm)</option>
                      <option value="5+ FCL Containers (Commercial Project Supply)">5+ FCL Containers (Commercial Project Supply)</option>
                    </select>
                  </div>
                </div>

                {/* ── STEP 3: DESTINATION SEA PORT ── */}
                <div className="space-y-5 pb-8 border-b border-[#003049]/10">
                  <div className="flex items-center gap-3.5">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#ff5500] to-[#e04300] text-white font-mono text-xs sm:text-sm flex items-center justify-center font-bold shadow-md shadow-[#ff5500]/25 ring-4 ring-[#ff5500]/15 flex-none">
                      3
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-normal text-[#003049] tracking-tight">
                      Destination Sea Port <span className="text-[#ff5500] text-base font-sans font-medium hidden sm:inline">(For CIF Freight Quotation)</span>
                    </h3>
                  </div>

                  <div className="pl-0 sm:pl-11">
                    <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2">
                      Nearest Port of Discharge: *
                    </label>
                    <select
                      value={destinationPort}
                      onChange={(e) => setDestinationPort(e.target.value)}
                      className="w-full bg-[#faf8f5] hover:bg-white focus:bg-white border border-[#003049]/20 hover:border-[#003049]/40 focus:border-[#ff5500] focus:ring-4 focus:ring-[#ff5500]/15 rounded-lg text-[#003049] p-3 sm:p-3.5 text-sm transition-all cursor-pointer outline-none font-medium"
                      required
                    >
                      {DESTINATION_PORTS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  {destinationPort.includes("Other") && (
                    <div className="pl-0 sm:pl-11 mt-4">
                      <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2">
                        Specify Your Target Port / City:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Port of Rotterdam, Netherlands"
                        value={customPort}
                        onChange={(e) => setCustomPort(e.target.value)}
                        className="w-full bg-[#faf8f5] hover:bg-white focus:bg-white border border-[#003049]/20 hover:border-[#003049]/40 focus:border-[#ff5500] focus:ring-4 focus:ring-[#ff5500]/15 rounded-lg text-[#003049] p-3 sm:p-3.5 text-sm transition-all outline-none font-medium"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* ── STEP 4: COMPANY & COURIER DISPATCH DETAILS ── */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3.5">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#ff5500] to-[#e04300] text-white font-mono text-xs sm:text-sm flex items-center justify-center font-bold shadow-md shadow-[#ff5500]/25 ring-4 ring-[#ff5500]/15 flex-none">
                      4
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-normal text-[#003049] tracking-tight">
                      Company & Courier Delivery
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pl-0 sm:pl-11">
                    <div>
                      <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2">
                        Company / Practice: *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Studio Arc / Stone Direct"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-[#faf8f5] hover:bg-white focus:bg-white border border-[#003049]/20 hover:border-[#003049]/40 focus:border-[#ff5500] focus:ring-4 focus:ring-[#ff5500]/15 rounded-lg text-[#003049] p-3 sm:p-3.5 text-sm transition-all outline-none font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2">
                        Contact Person: *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. David Henderson"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-[#faf8f5] hover:bg-white focus:bg-white border border-[#003049]/20 hover:border-[#003049]/40 focus:border-[#ff5500] focus:ring-4 focus:ring-[#ff5500]/15 rounded-lg text-[#003049] p-3 sm:p-3.5 text-sm transition-all outline-none font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pl-0 sm:pl-11 mt-4">
                    <div>
                      <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2">
                        Corporate Email: *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. hello@studioarc.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#faf8f5] hover:bg-white focus:bg-white border border-[#003049]/20 hover:border-[#003049]/40 focus:border-[#ff5500] focus:ring-4 focus:ring-[#ff5500]/15 rounded-lg text-[#003049] p-3 sm:p-3.5 text-sm transition-all outline-none font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2">
                        Phone / WhatsApp: *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +61 412 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#faf8f5] hover:bg-white focus:bg-white border border-[#003049]/20 hover:border-[#003049]/40 focus:border-[#ff5500] focus:ring-4 focus:ring-[#ff5500]/15 rounded-lg text-[#003049] p-3 sm:p-3.5 text-sm transition-all outline-none font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="pl-0 sm:pl-11 mt-4">
                    <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2">
                      Sample Delivery Street Address (For DHL / FedEx): *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Suite 402, Level 4, 120 Collins Street, Melbourne VIC 3000, Australia"
                      value={courierAddress}
                      onChange={(e) => setCourierAddress(e.target.value)}
                      className="w-full bg-[#faf8f5] hover:bg-white focus:bg-white border border-[#003049]/20 hover:border-[#003049]/40 focus:border-[#ff5500] focus:ring-4 focus:ring-[#ff5500]/15 rounded-lg text-[#003049] p-3 sm:p-3.5 text-sm transition-all outline-none resize-none font-medium"
                      required
                    />
                  </div>

                  <div className="pl-0 sm:pl-11 mt-4">
                    <label className="text-[10.5px] font-mono uppercase tracking-wider text-[#003049] font-bold block mb-2">
                      Specific Architectural Requirements (Optional):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Looking for pool coping pieces with bullnose edge profiles or specific slip resistance."
                      value={projectNotes}
                      onChange={(e) => setProjectNotes(e.target.value)}
                      className="w-full bg-[#faf8f5] hover:bg-white focus:bg-white border border-[#003049]/20 hover:border-[#003049]/40 focus:border-[#ff5500] focus:ring-4 focus:ring-[#ff5500]/15 rounded-lg text-[#003049] p-3 sm:p-3.5 text-sm transition-all outline-none resize-none font-medium"
                    />
                  </div>
                </div>

                {/* ── SUBMIT BUTTON ── */}
                <div className="pt-4 pl-0 sm:pl-11">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-[#ff5500] via-[#ff661a] to-[#ff4400] hover:from-[#e64d00] hover:to-[#cc3700] text-white text-[11.5px] sm:text-xs font-mono uppercase tracking-[0.22em] font-bold transition-all duration-300 shadow-lg shadow-[#ff5500]/25 hover:shadow-xl hover:shadow-[#ff5500]/35 hover:scale-[1.005] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Queuing Express Dispatch...
                      </span>
                    ) : (
                      <>
                        <span>Submit Sample Kit Dispatch Request</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                  <div className="text-[10.5px] font-mono text-[#003049]/70 text-center mt-4 flex items-center justify-center gap-2">
                    <Lock size={13} className="text-[#ff5500] flex-none" />
                    <span>Compliant with ISO 9001:2015 & ASTM standards. Factory-dispatched within 48–72 hours.</span>
                  </div>
                </div>

              </form>
            )}

          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE SAMPLE ATELIER BOX VISUALIZER (5 Cols) ── */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">

            {/* 3D-Feel Luxury Curated Sample Box Visualizer */}
            <div className="bg-white border border-[#003049]/12 rounded-xl p-5 sm:p-7 shadow-[0_4px_20px_rgba(0,48,73,0.06)] relative overflow-hidden">
              {/* Dynamic Live Specimen Image (Real Stone Photograph) */}
              <div className="w-full h-52 sm:h-60 mb-5 rounded-lg border border-black/15 shadow-sm relative overflow-hidden bg-[#faf8f5]">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/images/black-slate-stone-1.jpg";
                  }}
                />
              </div>

              {/* Live Specimen Summary Details */}
              <div className="p-4 rounded-lg bg-[#faf8f5] border border-[#003049]/10 text-xs font-mono space-y-2.5 text-[#003049]">
                <div className="flex justify-between items-center border-b border-[#003049]/10 pb-2">
                  <span className="text-[#003049]/65">Selected Stone:</span>
                  <span className="font-bold text-[#003049] max-w-[65%] text-right truncate">{currentProduct.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#003049]/10 pb-2">
                  <span className="text-[#003049]/65">Selected Finish:</span>
                  <span className="font-bold text-[#ff5500] max-w-[65%] text-right truncate">{selectedFinish}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#003049]/65">Target Port:</span>
                  <span className="font-bold text-[#003049] max-w-[60%] text-right truncate">{destinationPort.split("(")[0]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#003049]/65">Project Scope:</span>
                  <span className="font-bold text-[#003049] max-w-[60%] text-right truncate">{estimatedVolume.split("(")[0]}</span>
                </div>
              </div>
            </div>

            {/* What is Included Inside the Pavan Stones Group Sample Box */}
            <div className="bg-gradient-to-br from-[#003049] via-[#00283d] to-[#001f30] text-white rounded-xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#003049]">
              {/* Energetic orange ambient glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#ff5500]/25 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-6 border-b border-white/10 pb-5 relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#ff7733] font-bold block mb-2">
                  EXPRESS SAMPLE KIT CONTENTS
                </span>
                <h4 className="font-display text-2xl sm:text-3xl font-light text-white">
                  What&apos;s Inside Your Box
                </h4>
              </div>

              <div className="space-y-5 relative z-10">
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#ff5500]/20 border border-[#ff5500]/30 flex items-center justify-center flex-none text-[#ff7733] shadow-sm">
                    <Package size={16} />
                  </div>
                  <div>
                    <strong className="block text-[12px] text-white uppercase tracking-wider font-bold mb-0.5">3x Calibrated Specimens</strong>
                    <span className="text-[13.5px] text-white/70 font-light leading-snug">150x150mm genuine quarry cut samples in your selected finish.</span>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#ff5500]/20 border border-[#ff5500]/30 flex items-center justify-center flex-none text-[#ff7733] shadow-sm">
                    <Layers size={16} />
                  </div>
                  <div>
                    <strong className="block text-[12px] text-white uppercase tracking-wider font-bold mb-0.5">Multi-Finish Swatch Deck</strong>
                    <span className="text-[13.5px] text-white/70 font-light leading-snug">Physical reference cards for Cleft, Honed, Polished & Tumbled finishes.</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#ff5500]/20 border border-[#ff5500]/30 flex items-center justify-center flex-none text-[#ff7733] shadow-sm">
                    <FileText size={16} />
                  </div>
                  <div>
                    <strong className="block text-[12px] text-white uppercase tracking-wider font-bold mb-0.5">ASTM Test Reports</strong>
                    <span className="text-[13.5px] text-white/70 font-light leading-snug">Certified documentation for Density, Compressive Strength & Slip Ratings.</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#ff5500]/20 border border-[#ff5500]/30 flex items-center justify-center flex-none text-[#ff7733] shadow-sm">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <strong className="block text-[12px] text-white uppercase tracking-wider font-bold mb-0.5">FOB & CIF Pricing Schedule</strong>
                    <span className="text-[13.5px] text-white/70 font-light leading-snug">Calculated logistics data tailored to your specific discharge sea port.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Export WhatsApp Hotline */}
            <div className="p-5 bg-white border border-[#003049]/12 rounded-xl shadow-sm flex items-center justify-between gap-4">
              <div>
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-[#ff5500] block font-bold mb-1">
                  DIRECT EXPORT DESK:
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-[#003049] block">
                  +91 9063817054
                </span>
                <span className="text-[11px] font-mono text-[#003049]/65">
                  export@pavangroups.com
                </span>
              </div>

              <a
                href="https://wa.me/919063817054?text=Hello%2C%20I%20would%20like%20to%20request%20natural%20stone%20samples%20from%20Pavan%20Stones%20Group."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-[10.5px] font-mono uppercase tracking-wider font-bold shadow-md shadow-[#25D366]/20 transition-all duration-200 flex-none flex items-center gap-1.5"
              >
                <span>WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
