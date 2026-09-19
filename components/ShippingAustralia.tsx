"use client";
import { useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight } from "@animateicons/react/lucide";
import { GLOBAL_PORTS_DATA } from "@/lib/portsData";
import { scrollToHash } from "@/components/SmoothScroll";
import CalculatorPanel from "@/components/CalculatorPanel";
import {
  IndianPorts,
  Destinations,
  ShippingLogic,
  IndianPort,
  DestinationPort,
} from "@/lib/shippingData";

// Dynamically import D3 Map to prevent SSR issues
const Map2D = dynamic(() => import("@/components/Map2D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[440px] flex flex-col items-center justify-center bg-[#87CEEB] text-[#1e293b] font-mono text-xs gap-3">
      <div className="w-7 h-7 border-2 border-[#1e40af] border-t-transparent rounded-full animate-spin" />
      <span className="tracking-wider uppercase font-semibold text-[#1e40af]">
        LOADING MARITIME SEA MAP...
      </span>
    </div>
  ),
});

export default function ShippingAustralia() {
  const [origin, setOrigin] = useState<IndianPort | null>(
    () => IndianPorts.find((p) => p.code === "INMAA") || IndianPorts[0]
  );
  const [destination, setDestination] = useState<DestinationPort | null>(
    () => Destinations.find((d) => d.code === "AUSYD") || Destinations[0]
  );

  const handleCountryClick = (countryName: string) => {
    if (!countryName) return;
    const dest = Destinations.find(
      (d) =>
        d.country.toLowerCase() === countryName.toLowerCase() ||
        (d.country === "United States" &&
          (countryName === "United States of America" || countryName === "USA"))
    );
    if (dest) {
      setDestination(dest);
      if (!origin) {
        setOrigin(IndianPorts.find((p) => p.code === "INMAA") || IndianPorts[0]);
      }
    }
  };

  const routePath =
    origin && destination
      ? ShippingLogic(origin, destination).pathCoordinates
      : null;

  const handleContactScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash("#contact", 1.6);
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <section
      id="shipping"
      className="relative z-20 py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-16 bg-white text-[#241919] border-t border-[#747474]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-8 md:space-y-12">
        {/* ── SECTION HEADER & EXECUTIVE MARITIME STATS ── */}
        <div className="space-y-6 pb-6 border-b border-[#0f172a]/15">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <h2 className="font-display font-light leading-[1.05] tracking-tight mb-4">
                <span className="text-[#241919] block text-4xl sm:text-5xl md:text-6xl lg:text-[64px] mb-2">
                  Seamless Ocean Freight
                </span>
                <span className="text-[#c85a32] block text-3xl sm:text-4xl md:text-5xl italic">
                  Chennai to 40+ World Ports
                </span>
              </h2>

              <p className="text-[14px] sm:text-[15.5px] text-[#747474] font-light leading-relaxed max-w-2xl">
                Direct factory-to-port ocean container logistics from Chennai and Krishnapatnam terminals to key sea ports across <strong className="font-medium text-[#241919]">UAE, Europe, United Kingdom, United States, and Australia</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-none">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleContactScroll}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-bold bg-transparent border border-[#241919] text-[#241919] hover:bg-[#241919] hover:text-[#f1f5f9] transition-all duration-300 cursor-pointer rounded-xl"
              >
                <span>Request Sample</span>
                <ArrowRight className="w-4 h-4 text-[#241919] group-hover:text-[#f1f5f9] group-hover:translate-x-1.5 transition-all duration-300" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            INTERACTIVE SEA SHIPMENT MAP & CALCULATOR (2ND IMAGE INTERFACE)
        ══════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col">
          {/* Top Header */}
          <div className="px-6 py-3.5 bg-white border-b border-gray-200 shrink-0">
            <h3 className="text-xl font-bold text-gray-800">
              Interactive Sea Shipment Map
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Click any country to auto-resolve its primary commercial port and calculate shipping cost, transit time &amp; customs requirements.
            </p>
          </div>

          {/* Main Body */}
          <div className="flex flex-col lg:flex-row h-[620px] sm:h-[660px] lg:h-[680px] overflow-hidden">
            {/* 2D Map Panel (78%) */}
            <div
              className="w-full lg:w-[76%] xl:w-[78%] h-[380px] sm:h-[420px] lg:h-full relative flex-1"
              style={{ background: "#87CEEB" }}
            >
              <Map2D
                origin={origin}
                destination={destination}
                onCountryClick={handleCountryClick}
                routePath={routePath}
              />
            </div>

            {/* Calculator Panel (22%) */}
            <div className="w-full lg:w-[24%] xl:w-[22%] min-w-[300px] lg:min-w-[320px] h-[520px] lg:h-full z-20 border-t lg:border-t-0 lg:border-l border-gray-200 shadow-2xl relative bg-white">
              <CalculatorPanel
                origin={origin}
                setOrigin={setOrigin}
                destination={destination}
                setDestination={setDestination}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
