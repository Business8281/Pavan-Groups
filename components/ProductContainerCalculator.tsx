"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Box,
  Truck,
  ArrowRight,
  SlidersHorizontal,
  Package,
  Globe,
  TriangleAlert,
} from "lucide-react";
import { ProductStone } from "@/lib/productsData";

interface ProductContainerCalculatorProps {
  product: ProductStone;
  onQuoteRequested?: (areaM2: number, containerCount: number) => void;
}

export default function ProductContainerCalculator({
  product,
  onQuoteRequested,
}: ProductContainerCalculatorProps) {
  const [unit, setUnit] = useState<"m2" | "sqft">("m2");
  const [areaM2Val, setAreaM2Val] = useState<number>(450);
  const [selectedThicknessMm, setSelectedThicknessMm] = useState<number>(20);

  // Parse density e.g. "2,780 kg/m³" -> 2780
  const parseDensity = (densityStr: string): number => {
    const cleaned = densityStr.replace(/[^0-9.]/g, "");
    const val = parseFloat(cleaned);
    return isNaN(val) || val < 1000 ? 2700 : val;
  };

  const densityKgM3 = parseDensity(product.density);

  // Mass calculation
  const thicknessM = selectedThicknessMm / 1000;
  const totalVolumeM3 = areaM2Val * thicknessM;
  const totalWeightKg = totalVolumeM3 * densityKgM3;
  const totalWeightMT = totalWeightKg / 1000;

  // Packaging constants
  const sqMetersPerCrate = selectedThicknessMm >= 30 ? 20 : selectedThicknessMm >= 20 ? 25 : 30;
  const crateCount = Math.ceil(areaM2Val / sqMetersPerCrate);

  // 20ft Heavy-Duty Container Weight Limit = 27 Metric Tons (MT)
  const MAX_CONTAINER_WEIGHT_MT = 27;
  const containerUtilizationPct = Math.min(
    100,
    Math.round((totalWeightMT / MAX_CONTAINER_WEIGHT_MT) * 100)
  );

  const containerCount = Math.ceil(totalWeightMT / MAX_CONTAINER_WEIGHT_MT) || (areaM2Val > 0 ? 1 : 0);
  const isOverweight = totalWeightMT > MAX_CONTAINER_WEIGHT_MT;

  const displayArea = unit === "m2" ? areaM2Val : Math.round(areaM2Val / 0.092903);

  return (
    <div className="bg-[#faf8f5] border border-[#747474]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#747474]/15 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#c85a32] text-xs font-mono uppercase tracking-[0.2em] font-bold">
            <Calculator className="w-4 h-4" />
            <span>Interactive Container Freight Estimator</span>
          </div>
          <h3 className="font-display font-light text-2xl sm:text-3xl text-[#241919]">
            Dynamic Shipping Calculator for {product.name}
          </h3>
          <p className="text-xs text-[#747474] font-light">
            Slide the area control to observe real-time payload mass, ISPM-15 crate counts, and 20ft container fill capacity.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-[#747474]/20">
          <button
            type="button"
            onClick={() => setUnit("m2")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              unit === "m2"
                ? "bg-[#241919] text-white font-bold shadow-xs"
                : "text-[#747474] hover:text-[#241919]"
            }`}
          >
            Square Meters (m²)
          </button>
          <button
            type="button"
            onClick={() => setUnit("sqft")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              unit === "sqft"
                ? "bg-[#241919] text-white font-bold shadow-xs"
                : "text-[#747474] hover:text-[#241919]"
            }`}
          >
            Square Feet (sq ft)
          </button>
        </div>
      </div>

      {/* Input Controls & Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
        {/* Quantity Slider */}
        <div className="sm:col-span-7 bg-white p-5 rounded-2xl border border-[#747474]/15 space-y-4 shadow-3xs">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#747474] font-bold flex items-center gap-1.5">
              <SlidersHorizontal size={14} className="text-[#c85a32]" />
              Target Project Surface Area
            </label>
            <div className="text-right">
              <span className="font-mono font-bold text-xl text-[#241919]">
                {displayArea.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-[#c85a32] ml-1 font-bold">
                {unit === "m2" ? "m²" : "sq ft"}
              </span>
            </div>
          </div>

          <input
            type="range"
            min="50"
            max="3000"
            step="25"
            value={areaM2Val}
            onChange={(e) => setAreaM2Val(parseInt(e.target.value))}
            className="w-full accent-[#c85a32] bg-[#faf8f5] h-2 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[10px] font-mono text-[#747474]">
            <span>50 m² (Small Project)</span>
            <span>1,000 m² (1 Container)</span>
            <span>3,000 m² (Commercial)</span>
          </div>
        </div>

        {/* Thickness Profile Options */}
        <div className="sm:col-span-5 bg-white p-5 rounded-2xl border border-[#747474]/15 space-y-3 shadow-3xs">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[#747474] font-bold">
            Calibrated Thickness Profile
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[15, 20, 30].map((th) => (
              <button
                key={th}
                type="button"
                onClick={() => setSelectedThicknessMm(th)}
                className={`py-3 px-2 rounded-xl text-xs font-mono text-center font-bold transition-all cursor-pointer ${
                  selectedThicknessMm === th
                    ? "bg-[#c85a32] text-white shadow-xs scale-[1.02]"
                    : "bg-[#faf8f5] text-[#241919] border border-[#747474]/20 hover:border-[#c85a32]"
                }`}
              >
                {th} mm
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[#747474] font-mono block">
            Calculated at density of {product.density}.
          </span>
        </div>
      </div>

      {/* Calculated Output Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <motion.div
          key={`mass-${totalWeightMT}`}
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          className="bg-white p-4.5 rounded-2xl border border-[#747474]/15 space-y-1 shadow-3xs"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold flex items-center gap-1.5">
            <Package size={14} className="text-[#c85a32]" />
            Payload Mass
          </span>
          <span className="font-mono font-bold text-xl sm:text-2xl text-[#241919] block">
            {totalWeightMT.toFixed(2)} <span className="text-xs font-normal">MT</span>
          </span>
          <span className="text-[10.5px] text-[#747474] font-mono block">
            ({Math.round(totalWeightKg).toLocaleString()} kg)
          </span>
        </motion.div>

        <motion.div
          key={`crates-${crateCount}`}
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          className="bg-white p-4.5 rounded-2xl border border-[#747474]/15 space-y-1 shadow-3xs"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5 text-[#c85a32]" />
            Wooden Crates
          </span>
          <span className="font-mono font-bold text-xl sm:text-2xl text-[#241919] block">
            ~{crateCount} <span className="text-xs font-normal">crates</span>
          </span>
          <span className="text-[10.5px] text-[#747474] font-mono block">
            ISPM-15 Hardwood
          </span>
        </motion.div>

        <motion.div
          key={`fcl-${containerCount}`}
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          className="bg-white p-4.5 rounded-2xl border border-[#747474]/15 space-y-1 shadow-3xs"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#c85a32]" />
            20ft FCL Containers
          </span>
          <span className="font-mono font-bold text-xl sm:text-2xl text-[#241919] block">
            {containerCount} <span className="text-xs font-normal">FCL</span>
          </span>
          <span className="text-[10.5px] text-[#747474] font-mono block">
            27 MT Safety Limit
          </span>
        </motion.div>

        <div className="bg-white p-4.5 rounded-2xl border border-[#747474]/15 space-y-1 shadow-3xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold flex items-center gap-1.5">
            <Globe size={14} className="text-[#c85a32]" />
            Port of Loading
          </span>
          <span className="font-mono font-bold text-sm text-[#241919] block truncate mt-1">
            {product.exportPackaging.portOfLoading.split("/")[0]}
          </span>
          <span className="text-[10.5px] text-[#747474] font-mono block">
            FOB / CIF Available
          </span>
        </div>
      </div>

      {/* Animated Liquid 20ft Container Fill Capacity Bar */}
      <div className="bg-white p-4.5 rounded-2xl border border-[#747474]/15 space-y-2.5 shadow-3xs">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-[#241919] flex items-center gap-2">
            <span>20ft Heavy Container Fill Meter:</span>
            <span className="text-[#c85a32] font-mono font-bold">{containerUtilizationPct}%</span>
          </span>
          <span className="text-[#747474]">
            {totalWeightMT.toFixed(1)} MT / {MAX_CONTAINER_WEIGHT_MT} MT Max
          </span>
        </div>

        <div className="w-full h-3.5 bg-[#faf8f5] rounded-full overflow-hidden border border-[#747474]/20 p-0.5 relative">
          <motion.div
            className={`h-full rounded-full transition-all ${
              isOverweight ? "bg-amber-600" : "bg-[#c85a32]"
            }`}
            animate={{ width: `${Math.min(100, containerUtilizationPct)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>

        {isOverweight && (
          <div className="flex items-center gap-2 text-amber-700 text-xs font-mono pt-1">
            <TriangleAlert size={16} className="flex-none" />
            <span>
              Order exceeds 1 container limit ({totalWeightMT.toFixed(1)} MT). Will ship across {containerCount} 20ft containers.
            </span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      {onQuoteRequested && (
        <div className="flex items-center justify-between gap-4 flex-wrap pt-2 border-t border-[#747474]/15">
          <div className="text-xs font-mono text-[#747474]">
            Ready to request a formal FOB / CIF container quotation?
          </div>
          <button
            type="button"
            onClick={() => onQuoteRequested(areaM2Val, containerCount)}
            className="px-5 py-3 bg-[#241919] hover:bg-[#c85a32] text-white rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <span>Lock Container Price Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
