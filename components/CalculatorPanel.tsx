"use client";

import React, { useState } from "react";
import {
  IndianPort,
  DestinationPort,
  IndianPorts,
  Destinations,
  ShippingLogic,
} from "@/lib/shippingData";
import {
  Map as MapIcon,
  Ship,
  Anchor,
  FileCheck,
  Calendar,
  ArrowRight,
  Box,
} from "lucide-react";
import { scrollToHash } from "@/components/SmoothScroll";

interface CalculatorPanelProps {
  origin: IndianPort | null;
  setOrigin: (port: IndianPort | null) => void;
  destination: DestinationPort | null;
  setDestination: (port: DestinationPort | null) => void;
}

export default function CalculatorPanel({
  origin,
  setOrigin,
  destination,
  setDestination,
}: CalculatorPanelProps) {
  const [isFCL, setIsFCL] = useState<boolean>(true);
  const [is40ft, setIs40ft] = useState<boolean>(false);
  const [destSearch, setDestSearch] = useState<string>("");
  const [isDestOpen, setIsDestOpen] = useState<boolean>(false);

  const stats =
    origin && destination ? ShippingLogic(origin, destination) : null;

  const estArrival = () => {
    if (!stats) return "-";
    const days = parseInt(stats.transitDays.split(" ")[0]) || 20;
    const date = new Date();
    date.setDate(date.getDate() + days + 5);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToHash("#contact", 1.6);
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <div className="w-full h-full bg-white p-4 lg:p-5 shadow-xl flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Anchor className="text-indigo-600 mr-2 flex-none" size={20} />
            Sea Shipment Calculator
          </h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Select your origin port in India and destination country to calculate
            customs status and shipping parameters.
          </p>
        </div>

        <div className="space-y-3">
          {/* Origin */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 mb-1">
              FROM (Origin Port in India)
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              value={origin ? origin.code : ""}
              onChange={(e) => {
                const code = e.target.value;
                if (!code) {
                  setOrigin(null);
                } else {
                  const found = IndianPorts.find((p) => p.code === code);
                  if (found) setOrigin(found);
                }
              }}
            >
              <option value="">Select origin port...</option>
              {IndianPorts.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold text-gray-500">
                TO (Destination Country)
              </label>
              {destination && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDestination(null);
                    setDestSearch("");
                  }}
                  className="text-[10px] text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <div
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-800 bg-gray-50 outline-none focus-within:ring-2 focus-within:ring-indigo-500 cursor-pointer relative flex items-center"
              onClick={() => setIsDestOpen(true)}
            >
              <input
                type="text"
                placeholder="Search or select destination..."
                className="w-full bg-transparent outline-none cursor-text pr-5"
                value={
                  isDestOpen
                    ? destSearch
                    : destination
                    ? `${destination.country} (${destination.port})`
                    : ""
                }
                onChange={(e) => {
                  setDestSearch(e.target.value);
                  setIsDestOpen(true);
                }}
                onFocus={() => setIsDestOpen(true)}
                onBlur={() => {
                  setTimeout(() => setIsDestOpen(false), 250);
                }}
              />
              {destination && !isDestOpen && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDestination(null);
                    setDestSearch("");
                  }}
                  className="text-gray-400 hover:text-gray-600 text-xs px-1"
                >
                  ✕
                </button>
              )}
            </div>
            {isDestOpen && (
              <div className="absolute z-30 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {Destinations.filter(
                  (d) =>
                    d.country
                      .toLowerCase()
                      .includes(destSearch.toLowerCase()) ||
                    d.port.toLowerCase().includes(destSearch.toLowerCase())
                ).map((p) => (
                  <div
                    key={p.code}
                    className="p-2 text-sm hover:bg-indigo-50 cursor-pointer text-gray-800 transition-colors"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setDestination(p);
                      setDestSearch("");
                      setIsDestOpen(false);
                    }}
                  >
                    {p.country}{" "}
                    <span className="text-gray-400 text-xs">({p.port})</span>
                  </div>
                ))}
                {Destinations.filter(
                  (d) =>
                    d.country
                      .toLowerCase()
                      .includes(destSearch.toLowerCase()) ||
                    d.port.toLowerCase().includes(destSearch.toLowerCase())
                ).length === 0 && (
                  <div className="p-2 text-sm text-gray-500 text-center">
                    No matches found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mode Toggles */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                className={`flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center transition-all cursor-pointer ${
                  isFCL
                    ? "bg-white shadow text-indigo-600 font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => setIsFCL(true)}
              >
                FCL (Full)
              </button>
              <button
                type="button"
                className={`flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center transition-all cursor-pointer ${
                  !isFCL
                    ? "bg-white shadow text-indigo-600 font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => setIsFCL(false)}
              >
                LCL (Shared)
              </button>
            </div>
            {isFCL && (
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center transition-all cursor-pointer ${
                    !is40ft
                      ? "bg-white shadow text-indigo-600 font-semibold"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                  onClick={() => setIs40ft(false)}
                >
                  20ft Cont.
                </button>
                <button
                  type="button"
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center transition-all cursor-pointer ${
                    is40ft
                      ? "bg-white shadow text-indigo-600 font-semibold"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                  onClick={() => setIs40ft(true)}
                >
                  40ft Cont.
                </button>
              </div>
            )}
          </div>

          {/* Route Strip */}
          {origin && destination && (
            <div className="flex items-center justify-between bg-indigo-50 p-2.5 rounded-lg text-indigo-800 text-sm">
              <span className="font-bold font-mono">{origin.code}</span>
              <div className="flex-1 flex items-center justify-center relative mx-3">
                <div className="w-full border-t-2 border-dashed border-indigo-300" />
                <Ship size={14} className="absolute text-indigo-600 bg-indigo-50 px-0.5" />
              </div>
              <span className="font-bold font-mono">{destination.code}</span>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <div className="flex items-center text-indigo-500 mb-1">
                <Ship size={13} className="mr-1.5 flex-none" />
                <span className="text-[10px] font-semibold text-gray-500 uppercase">
                  TRANSIT TIME
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold text-gray-800">
                {stats ? stats.transitDays : "-"}
              </div>
            </div>

            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <div className="flex items-center text-purple-500 mb-1">
                <FileCheck size={13} className="mr-1.5 flex-none" />
                <span className="text-[10px] font-semibold text-gray-500 uppercase">
                  CUSTOMS
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold text-gray-800">
                {stats ? stats.customsDays : "-"}
              </div>
            </div>

            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <div className="flex items-center text-blue-500 mb-1">
                <MapIcon size={13} className="mr-1.5 flex-none" />
                <span className="text-[10px] font-semibold text-gray-500 uppercase">
                  DISTANCE
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold text-gray-800">
                {stats ? `${stats.distanceNm} nm` : "-"}
              </div>
              {stats?.chokepoints && (
                <div className="text-[8.5px] text-indigo-600 mt-1 uppercase leading-tight line-clamp-3">
                  via {stats.chokepoints}
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <div className="flex items-center text-green-500 mb-1">
                <Box size={13} className="mr-1.5 flex-none" />
                <span className="text-[10px] font-semibold text-gray-500 uppercase">
                  MODE
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold text-gray-800">
                {isFCL ? (is40ft ? "FCL 40ft" : "FCL 20ft") : "LCL Cargo"}
              </div>
            </div>

            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 col-span-2 flex items-center justify-between">
              <div>
                <div className="flex items-center text-orange-500 mb-0.5">
                  <Calendar size={13} className="mr-1.5 flex-none" />
                  <span className="text-[10px] font-semibold text-gray-500 uppercase">
                    EST. VESSEL ARRIVAL
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-800">
                  {estArrival()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 shrink-0 pt-2">
        {origin && destination ? (
          <>
            <button
              type="button"
              onClick={handleQuoteClick}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-md flex items-center justify-center transition-colors text-sm cursor-pointer"
            >
              <span>Get Shipping Quote</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
            <button
              type="button"
              className="w-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition-colors text-sm cursor-pointer"
              onClick={() => {
                setOrigin(null);
                setDestination(null);
              }}
            >
              Reset Route
            </button>
          </>
        ) : (
          <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-xs flex items-start leading-relaxed">
            <MapIcon className="mr-2 shrink-0 mt-0.5" size={15} />
            <span>
              Select origin port & destination country, or click any country on
              the globe, to display instant sea shipment stats.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
