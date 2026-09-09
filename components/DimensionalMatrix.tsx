"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Ship, Scale, Ruler, CheckCircle2, ShieldCheck, Box } from "lucide-react";

interface DimensionalMatrixProps {
  companyName: string;
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
  packaging: {
    crateType: string;
    safetyFeatures: string[];
    capacity: string;
    avgWeightPerSqm20mm: number;
  };
}

export default function DimensionalMatrix({
  companyName,
  specifications,
  packaging,
}: DimensionalMatrixProps) {
  const [useImperialUnits, setUseImperialUnits] = useState(false);
  const [calcArea, setCalcArea] = useState<number>(500);

  // Real-time container calculation (assuming 20mm baseline weight)
  const estimatedWeightKg = calcArea * packaging.avgWeightPerSqm20mm;
  const estimatedWeightTons = (estimatedWeightKg / 1000).toFixed(2);
  const maxContainerPayloadTons = 26; // Typical max sea-freight 20ft payload
  const estContainers = Math.max(1, Math.ceil(parseFloat(estimatedWeightTons) / maxContainerPayloadTons));

  return (
    <div className="bg-white text-[#140d0a] border-b border-[#140d0a]/10">
      
      {/* ── SECTION 1: ARCHITECTURAL SPECIFICATION MATRIX ── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        
        {/* Header Block & Unit Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16 pb-6 border-b border-[#140d0a]/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#c85a32] block mb-2">
              TECHNICAL SPECIFICATIONS · ISO 9001:2015
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-[#140d0a] tracking-tight">
              {companyName} <span className="italic font-serif text-[#c85a32]">Technical Matrix</span>
            </h2>
          </div>

          {/* Unit Toggle Pill (Clean Light Theme) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#f5f3ef] rounded-full border border-[#140d0a]/10 shadow-xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setUseImperialUnits(false)}
              className={`px-5 py-2 rounded-full text-[10.5px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                !useImperialUnits
                  ? "bg-[#140d0a] text-white font-bold shadow-sm"
                  : "text-[#747474] hover:text-[#140d0a]"
              }`}
            >
              Metric
            </button>
            <button
              type="button"
              onClick={() => setUseImperialUnits(true)}
              className={`px-5 py-2 rounded-full text-[10.5px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                useImperialUnits
                  ? "bg-[#140d0a] text-white font-bold shadow-sm"
                  : "text-[#747474] hover:text-[#140d0a]"
              }`}
            >
              Imperial
            </button>
          </div>
        </div>

        {/* ── 2-CARD TECHNICAL SPECIFICATION SPREAD (PURE WHITE ARCHITECTURAL) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Card 1: Dimensions & Sizing */}
          <div className="bg-white border border-[#140d0a]/10 p-7 sm:p-9 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#140d0a]/10">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-[#8c8273]">
                  01 · SIZING & CALIBRATION
                </span>
                <span className="text-[10px] font-mono text-[#c85a32] font-medium uppercase tracking-wider">
                  ±0.5mm Tolerance
                </span>
              </div>

              <h3 className="font-display font-light text-2xl sm:text-3xl text-[#140d0a] mb-6">
                Dimensions & Thickness Standards
              </h3>

              {/* Available Thicknesses */}
              <div className="mb-7">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] block mb-3 font-semibold">
                  Available Thickness Standards:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(useImperialUnits
                    ? specifications.thicknessesImperial
                    : specifications.thicknessesMetric
                  ).map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-1.5 bg-[#fcfaf7] border border-[#140d0a]/15 text-[#140d0a] font-mono text-xs font-semibold rounded-xs shadow-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Standard Modular Sizing */}
              <div className="mb-7">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] block mb-3 font-semibold">
                  Standard Architectural Formats:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {(useImperialUnits
                    ? specifications.standardSizesImperial
                    : specifications.standardSizesMetric
                  ).map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-2.5 bg-[#fcfaf7] border border-[#140d0a]/10 text-[#140d0a] font-mono text-xs rounded-xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c85a32]" />
                      <span className="font-medium">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inset Architectural Photo */}
            <div className="mt-4 aspect-[16/8] w-full overflow-hidden bg-[#140d0a] rounded-xs relative group">
              <img
                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
                alt="Installed Stone Sizing"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-4 text-white font-mono text-[10px] uppercase tracking-wider">
                Precision Diamond Gangsaw Sliced
              </span>
            </div>
          </div>

          {/* Card 2: Physical & Laboratory Properties */}
          <div className="bg-white border border-[#140d0a]/10 p-7 sm:p-9 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#140d0a]/10">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-[#8c8273]">
                  02 · PHYSICAL & LAB DATA
                </span>
                <span className="text-[10px] font-mono text-[#c85a32] font-medium uppercase tracking-wider">
                  ASTM & EN Certified
                </span>
              </div>

              <h3 className="font-display font-light text-2xl sm:text-3xl text-[#140d0a] mb-6">
                Laboratory Test Properties
              </h3>

              {/* Data Table Rows */}
              <div className="space-y-4 mb-7">
                {/* Density */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#140d0a]/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#747474]">
                    Mineral Density:
                  </span>
                  <span className="font-mono text-sm font-bold text-[#140d0a]">
                    {useImperialUnits
                      ? specifications.densityImperial
                      : specifications.densityMetric}
                  </span>
                </div>

                {/* Water Absorption */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#140d0a]/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#747474]">
                    Water Absorption:
                  </span>
                  <span className="font-mono text-sm font-bold text-[#140d0a]">
                    {specifications.waterAbsorption}
                  </span>
                </div>

                {/* Compressive Strength */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#140d0a]/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#747474]">
                    Compressive Strength:
                  </span>
                  <span className="font-mono text-sm font-bold text-[#140d0a]">
                    {useImperialUnits
                      ? specifications.compressiveStrengthImperial
                      : specifications.compressiveStrengthMetric}
                  </span>
                </div>

                {/* Quality Standards */}
                <div className="py-2.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#747474] block mb-1">
                    Quality Certification:
                  </span>
                  <p className="text-xs text-[#140d0a] font-medium leading-relaxed">
                    {specifications.exportStandards}
                  </p>
                </div>
              </div>
            </div>

            {/* Inset Mineral Texture Photo */}
            <div className="mt-4 aspect-[16/8] w-full overflow-hidden bg-[#140d0a] rounded-xs relative group">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80"
                alt="Mineral Density Structure"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-4 text-white font-mono text-[10px] uppercase tracking-wider">
                Microcrystalline Matrix Verification
              </span>
            </div>
          </div>

        </div>

        {/* ── CARD 3: INTERNATIONAL EXPORT CRATING (CLEAN FULL-WIDTH SPREAD) ── */}
        <div className="bg-[#fcfaf7] border border-[#140d0a]/10 p-7 sm:p-10 shadow-xs mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-8 border-b border-[#140d0a]/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#c85a32] block mb-1">
                03 · GLOBAL SEAWORTHY PACKAGING
              </span>
              <h3 className="font-display font-light text-2xl sm:text-3xl text-[#140d0a]">
                International Export Crating & Protection
              </h3>
            </div>
            <span className="text-xs font-mono text-[#747474] uppercase tracking-wider">
              ISPM-15 Certified Fumigation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Box 1: Crate Architecture */}
            <div className="flex flex-col justify-between p-6 bg-white border border-[#140d0a]/10 rounded-xs">
              <div>
                <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                  Crate Architecture
                </span>
                <p className="text-xs sm:text-[13px] text-[#3a3532] font-light leading-relaxed mb-6">
                  {packaging.crateType}
                </p>
              </div>
              <div className="p-3 bg-[#fcfaf7] border border-[#140d0a]/10">
                <span className="text-[9px] font-mono uppercase text-[#747474] block mb-0.5">
                  FCL Container Capacity:
                </span>
                <span className="font-mono text-xs font-semibold text-[#140d0a]">
                  {packaging.capacity}
                </span>
              </div>
            </div>

            {/* Box 2: Visual Inspection Photo */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#140d0a] rounded-xs relative group">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80"
                alt="Seaworthy Export Crating"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-4 text-white font-mono text-[10px] uppercase tracking-wider">
                Heavy-Duty Timber Bracing
              </span>
            </div>

            {/* Box 3: Protection Standards */}
            <div className="p-6 bg-white border border-[#140d0a]/10 rounded-xs flex flex-col justify-between">
              <div>
                <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-3">
                  Protection Protocols
                </span>
                <ul className="space-y-3">
                  {packaging.safetyFeatures.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#3a3532]">
                      <span className="text-[#c85a32] text-sm mt-[-2px] flex-none">✔</span>
                      <span className="font-light leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-3 border-t border-[#140d0a]/10 text-[10px] font-mono text-[#747474]">
                <span>Zero Transit Shock Standard</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: THE INTERACTIVE FREIGHT & CONTAINER ESTIMATOR (PURE LIGHT THEME) ── */}
        <div className="bg-[#faf8f5] border border-[#140d0a]/10 p-7 sm:p-10 rounded-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Header */}
            <div className="max-w-md">
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#c85a32] block mb-1.5">
                INTERACTIVE FREIGHT ENGINE
              </span>
              <h4 className="font-display font-light text-2xl sm:text-3xl text-[#140d0a] mb-2">
                Container Load & Weight Estimator
              </h4>
              <p className="text-xs text-[#747474] font-light leading-relaxed">
                Adjust order project area to calculate real-time gross metric tonnage and required 20ft FCL container allocations.
              </p>
            </div>

            {/* Inputs: Number + Range Slider */}
            <div className="flex flex-col sm:flex-row items-center gap-6 flex-1 max-w-lg bg-white p-5 border border-[#140d0a]/10 rounded-xs shadow-xs">
              <div className="w-full sm:w-auto">
                <label className="text-[9px] font-mono uppercase tracking-wider text-[#747474] block mb-1.5 font-bold">
                  Project Area:
                </label>
                <div className="flex items-baseline gap-2 border-b border-[#140d0a]/20 pb-1">
                  <input
                    type="number"
                    min="50"
                    max="5000"
                    step="50"
                    value={calcArea}
                    onChange={(e) => setCalcArea(Number(e.target.value) || 0)}
                    className="bg-transparent text-[#140d0a] font-mono font-bold text-2xl outline-none w-24"
                  />
                  <span className="text-xs font-mono text-[#747474]">SQM</span>
                </div>
              </div>

              <div className="w-full flex-1">
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={calcArea}
                  onChange={(e) => setCalcArea(Number(e.target.value))}
                  className="w-full accent-[#140d0a] h-1.5 bg-[#140d0a]/15 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2 text-[9px] font-mono text-[#747474]">
                  <span>50 SQM</span>
                  <span>5,000 SQM</span>
                </div>
              </div>
            </div>

            {/* Output Metric Cards */}
            <div className="flex items-center gap-5 sm:gap-8 flex-none">
              <div className="text-left sm:text-right">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#747474] block mb-1 font-bold">
                  Gross Weight:
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={estimatedWeightTons}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="font-display text-3xl sm:text-4xl text-[#140d0a] font-light leading-none"
                  >
                    {estimatedWeightTons}{" "}
                    <span className="text-xs font-mono text-[#747474] uppercase">Tons</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="w-px h-12 bg-[#140d0a]/15" />

              <div className="text-left">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#747474] block mb-1 font-bold">
                  Containers:
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={estContainers}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="font-display text-3xl sm:text-4xl text-[#c85a32] font-light leading-none"
                  >
                    ~{estContainers}{" "}
                    <span className="text-xs font-mono text-[#747474] uppercase">x 20ft FCL</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
