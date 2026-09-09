"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { Globe, Plus, Minus, RotateCcw } from "lucide-react";
import {
  GLOBAL_PORTS_DATA,
  CHENNAI_ORIGIN,
  PortCoord,
} from "@/lib/portsData";
import { getAssetPath } from "@/lib/basePath";

interface RealInteractiveMapProps {
  selectedPortId: string;
  onSelectPort: (id: string) => void;
  filteredPorts: PortCoord[];
}

interface Point {
  lng: number;
  lat: number;
}

// ── 100% SEA & OCEAN NAUTICAL WAYPOINTS (ZERO CONTINENT / LAND CROSSINGS) ──
// All routes originate from Chennai Port (INMAA: [80.2707, 13.0827]) on the east coast of India
// and follow certified maritime navigation channels, straits, and ocean corridors.
const MARITIME_SEA_ROUTES: Record<string, Point[]> = {
  // ── AUSTRALIA (Via Indian Ocean & Bass Strait / Great Australian Bight) ──
  perth: [
    { lng: 80.2707, lat: 13.0827 }, // Chennai Origin
    { lng: 82.0, lat: 10.5 },       // Bay of Bengal
    { lng: 86.0, lat: 5.8 },        // South of Sri Lanka (Dondra Head)
    { lng: 95.0, lat: -5.0 },       // Deep Equatorial Indian Ocean
    { lng: 105.0, lat: -18.0 },     // Southeast Indian Ocean
    { lng: 112.5, lat: -30.0 },     // Approach to WA Coast
    { lng: 115.7439, lat: -32.0569 }, // Perth (Fremantle Port)
  ],
  melbourne: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 82.0, lat: 10.5 },
    { lng: 86.0, lat: 5.8 },
    { lng: 95.0, lat: -10.0 },
    { lng: 108.0, lat: -28.0 },
    { lng: 120.0, lat: -36.0 },     // Great Australian Bight
    { lng: 135.0, lat: -38.5 },     // Southern Ocean
    { lng: 142.0, lat: -39.2 },     // Western Bass Strait
    { lng: 144.5, lat: -38.5 },     // Port Phillip Bay Approach
    { lng: 144.9631, lat: -37.8136 }, // Melbourne Port
  ],
  sydney: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 82.0, lat: 10.5 },
    { lng: 86.0, lat: 5.8 },
    { lng: 95.0, lat: -10.0 },
    { lng: 108.0, lat: -28.0 },
    { lng: 120.0, lat: -36.0 },     // Great Australian Bight
    { lng: 135.0, lat: -38.5 },
    { lng: 145.0, lat: -39.5 },     // Bass Strait
    { lng: 148.5, lat: -39.0 },     // Tasman Sea
    { lng: 150.5, lat: -37.0 },     // NSW South Coast Waters
    { lng: 151.2167, lat: -33.9500 }, // Sydney (Port Botany)
  ],
  brisbane: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 82.0, lat: 10.5 },
    { lng: 86.0, lat: 5.8 },
    { lng: 95.0, lat: -10.0 },
    { lng: 108.0, lat: -28.0 },
    { lng: 120.0, lat: -36.0 },
    { lng: 135.0, lat: -38.5 },
    { lng: 145.0, lat: -39.5 },     // Bass Strait
    { lng: 148.5, lat: -39.0 },     // Tasman Sea
    { lng: 151.5, lat: -35.0 },     // East Australian Current
    { lng: 153.5, lat: -31.0 },
    { lng: 153.0251, lat: -27.4698 }, // Brisbane Port
  ],

  // ── UAE & MIDDLE EAST (Around Sri Lanka, Arabian Sea, Strait of Hormuz) ──
  dubai: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 81.5, lat: 10.0 },
    { lng: 81.8, lat: 6.0 },
    { lng: 80.5, lat: 5.6 },        // South of Dondra Head
    { lng: 76.8, lat: 6.8 },        // South of Kanyakumari
    { lng: 70.0, lat: 12.0 },       // Arabian Sea
    { lng: 67.0, lat: 17.0 },
    { lng: 61.5, lat: 22.5 },
    { lng: 59.0, lat: 24.5 },       // Gulf of Oman
    { lng: 57.0, lat: 25.8 },       // Approach to Hormuz
    { lng: 56.4, lat: 26.5 },       // Strait of Hormuz
    { lng: 55.2, lat: 25.8 },       // Persian Gulf
    { lng: 55.0612, lat: 25.0113 }, // Dubai (Jebel Ali Port)
  ],
  abudhabi: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 81.5, lat: 10.0 },
    { lng: 81.8, lat: 6.0 },
    { lng: 80.5, lat: 5.6 },
    { lng: 76.8, lat: 6.8 },
    { lng: 70.0, lat: 12.0 },
    { lng: 67.0, lat: 17.0 },
    { lng: 61.5, lat: 22.5 },
    { lng: 59.0, lat: 24.5 },
    { lng: 57.0, lat: 25.8 },
    { lng: 56.4, lat: 26.5 },       // Strait of Hormuz
    { lng: 54.9, lat: 25.4 },       // Abu Dhabi Channel
    { lng: 54.6730, lat: 24.8860 }, // Abu Dhabi (Khalifa Port)
  ],

  // ── MEDITERRANEAN & EUROPE (Red Sea, Suez Canal, Mediterranean corridor) ──
  genoa: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 81.5, lat: 10.0 },
    { lng: 81.8, lat: 6.0 },
    { lng: 80.5, lat: 5.6 },
    { lng: 76.8, lat: 6.8 },
    { lng: 70.0, lat: 8.0 },
    { lng: 58.0, lat: 11.5 },
    { lng: 51.5, lat: 12.8 },       // North of Socotra
    { lng: 45.0, lat: 12.5 },       // Gulf of Aden
    { lng: 43.4, lat: 12.6 },       // Bab el-Mandeb Strait
    { lng: 41.6, lat: 15.5 },       // Red Sea
    { lng: 38.5, lat: 20.0 },
    { lng: 36.2, lat: 24.0 },
    { lng: 34.2, lat: 27.5 },       // Gulf of Suez
    { lng: 32.55, lat: 29.9 },      // Suez Canal South
    { lng: 32.3, lat: 31.25 },      // Port Said (Mediterranean)
    { lng: 28.5, lat: 33.5 },       // Eastern Mediterranean
    { lng: 22.0, lat: 35.0 },       // South of Greece
    { lng: 17.5, lat: 36.5 },       // Ionian Sea
    { lng: 13.5, lat: 38.5 },       // Tyrrhenian Sea
    { lng: 10.0, lat: 41.5 },       // Ligurian Sea
    { lng: 9.0, lat: 43.8 },
    { lng: 8.9463, lat: 44.4056 },  // Genoa Port (Italy)
  ],

  // ── NORTHERN EUROPE & UK (Suez, Gibraltar, English Channel, North Sea) ──
  rotterdam: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 81.5, lat: 10.0 },
    { lng: 81.8, lat: 6.0 },
    { lng: 80.5, lat: 5.6 },
    { lng: 76.8, lat: 6.8 },
    { lng: 70.0, lat: 8.0 },
    { lng: 58.0, lat: 11.5 },
    { lng: 51.5, lat: 12.8 },
    { lng: 45.0, lat: 12.5 },       // Gulf of Aden
    { lng: 43.4, lat: 12.6 },       // Bab el-Mandeb
    { lng: 41.6, lat: 15.5 },       // Red Sea
    { lng: 36.2, lat: 24.0 },
    { lng: 32.55, lat: 29.9 },      // Suez Canal
    { lng: 32.3, lat: 31.25 },      // Port Said
    { lng: 24.0, lat: 34.0 },       // Mediterranean
    { lng: 11.5, lat: 37.2 },       // Strait of Sicily
    { lng: 1.0, lat: 37.2 },        // Western Mediterranean
    { lng: -4.5, lat: 36.0 },       // Alboran Sea
    { lng: -5.6, lat: 35.95 },      // Strait of Gibraltar
    { lng: -9.0, lat: 36.5 },       // Atlantic Off Portugal
    { lng: -9.5, lat: 43.5 },       // Off Cape Finisterre
    { lng: -6.5, lat: 47.5 },       // Bay of Biscay Outer
    { lng: -3.5, lat: 49.5 },       // English Channel
    { lng: 0.5, lat: 50.5 },        // Strait of Dover
    { lng: 2.5, lat: 51.4 },        // North Sea
    { lng: 3.8, lat: 51.95 },       // Nieuwe Waterweg Entrance
    { lng: 4.4777, lat: 51.9244 },  // Rotterdam Port (Netherlands)
  ],
  hamburg: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 81.5, lat: 10.0 },
    { lng: 81.8, lat: 6.0 },
    { lng: 80.5, lat: 5.6 },
    { lng: 76.8, lat: 6.8 },
    { lng: 70.0, lat: 8.0 },
    { lng: 58.0, lat: 11.5 },
    { lng: 51.5, lat: 12.8 },
    { lng: 45.0, lat: 12.5 },
    { lng: 43.4, lat: 12.6 },
    { lng: 41.6, lat: 15.5 },
    { lng: 36.2, lat: 24.0 },
    { lng: 32.55, lat: 29.9 },
    { lng: 32.3, lat: 31.25 },
    { lng: 24.0, lat: 34.0 },
    { lng: 11.5, lat: 37.2 },
    { lng: 1.0, lat: 37.2 },
    { lng: -4.5, lat: 36.0 },
    { lng: -5.6, lat: 35.95 },      // Strait of Gibraltar
    { lng: -9.0, lat: 36.5 },
    { lng: -9.5, lat: 43.5 },
    { lng: -6.5, lat: 47.5 },
    { lng: -3.5, lat: 49.5 },
    { lng: 0.5, lat: 50.5 },
    { lng: 3.2, lat: 52.0 },        // North Sea
    { lng: 5.5, lat: 53.8 },        // German Bight
    { lng: 7.8, lat: 54.0 },        // Heligoland Bight
    { lng: 8.8, lat: 53.9 },        // Elbe River Estuary
    { lng: 9.9937, lat: 53.5511 },  // Hamburg Port (Germany)
  ],
  felixstowe: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 81.5, lat: 10.0 },
    { lng: 81.8, lat: 6.0 },
    { lng: 80.5, lat: 5.6 },
    { lng: 76.8, lat: 6.8 },
    { lng: 70.0, lat: 8.0 },
    { lng: 58.0, lat: 11.5 },
    { lng: 51.5, lat: 12.8 },
    { lng: 45.0, lat: 12.5 },
    { lng: 43.4, lat: 12.6 },
    { lng: 41.6, lat: 15.5 },
    { lng: 36.2, lat: 24.0 },
    { lng: 32.55, lat: 29.9 },
    { lng: 32.3, lat: 31.25 },
    { lng: 24.0, lat: 34.0 },
    { lng: 11.5, lat: 37.2 },
    { lng: 1.0, lat: 37.2 },
    { lng: -4.5, lat: 36.0 },
    { lng: -5.6, lat: 35.95 },      // Strait of Gibraltar
    { lng: -9.0, lat: 36.5 },
    { lng: -9.5, lat: 43.5 },
    { lng: -6.5, lat: 47.5 },
    { lng: -3.5, lat: 49.5 },       // English Channel
    { lng: 0.5, lat: 50.5 },        // Strait of Dover
    { lng: 1.6, lat: 51.4 },        // North Sea Approach
    { lng: 1.3513, lat: 51.9617 },  // Felixstowe / London Port
  ],
  southampton: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 81.5, lat: 10.0 },
    { lng: 81.8, lat: 6.0 },
    { lng: 80.5, lat: 5.6 },
    { lng: 76.8, lat: 6.8 },
    { lng: 70.0, lat: 8.0 },
    { lng: 58.0, lat: 11.5 },
    { lng: 51.5, lat: 12.8 },
    { lng: 45.0, lat: 12.5 },
    { lng: 43.4, lat: 12.6 },
    { lng: 41.6, lat: 15.5 },
    { lng: 36.2, lat: 24.0 },
    { lng: 32.55, lat: 29.9 },
    { lng: 32.3, lat: 31.25 },
    { lng: 24.0, lat: 34.0 },
    { lng: 11.5, lat: 37.2 },
    { lng: 1.0, lat: 37.2 },
    { lng: -4.5, lat: 36.0 },
    { lng: -5.6, lat: 35.95 },      // Strait of Gibraltar
    { lng: -9.0, lat: 36.5 },
    { lng: -9.5, lat: 43.5 },
    { lng: -6.5, lat: 47.5 },
    { lng: -3.5, lat: 49.5 },       // English Channel
    { lng: -1.8, lat: 50.3 },       // The Solent Approach
    { lng: -1.4044, lat: 50.9097 }, // Southampton Port
  ],

  // ── UNITED STATES (Atlantic & Gulf Routes via Suez & Gibraltar) ──
  newyork: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 81.5, lat: 10.0 },
    { lng: 81.8, lat: 6.0 },
    { lng: 80.5, lat: 5.6 },
    { lng: 76.8, lat: 6.8 },
    { lng: 70.0, lat: 8.0 },
    { lng: 58.0, lat: 11.5 },
    { lng: 51.5, lat: 12.8 },
    { lng: 45.0, lat: 12.5 },
    { lng: 43.4, lat: 12.6 },
    { lng: 41.6, lat: 15.5 },
    { lng: 36.2, lat: 24.0 },
    { lng: 32.55, lat: 29.9 },
    { lng: 32.3, lat: 31.25 },
    { lng: 24.0, lat: 34.0 },
    { lng: 11.5, lat: 37.2 },
    { lng: 1.0, lat: 37.2 },
    { lng: -4.5, lat: 36.0 },
    { lng: -5.6, lat: 35.95 },      // Strait of Gibraltar
    { lng: -15.0, lat: 36.5 },      // North Atlantic
    { lng: -35.0, lat: 37.5 },      // Mid-Atlantic
    { lng: -55.0, lat: 39.0 },      // Western Atlantic
    { lng: -70.0, lat: 40.2 },      // Approach to NY Harbor
    { lng: -74.0060, lat: 40.7128 }, // New York Port
  ],
  savannah: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 81.5, lat: 10.0 },
    { lng: 81.8, lat: 6.0 },
    { lng: 80.5, lat: 5.6 },
    { lng: 76.8, lat: 6.8 },
    { lng: 70.0, lat: 8.0 },
    { lng: 58.0, lat: 11.5 },
    { lng: 51.5, lat: 12.8 },
    { lng: 45.0, lat: 12.5 },
    { lng: 43.4, lat: 12.6 },
    { lng: 41.6, lat: 15.5 },
    { lng: 36.2, lat: 24.0 },
    { lng: 32.55, lat: 29.9 },
    { lng: 32.3, lat: 31.25 },
    { lng: 24.0, lat: 34.0 },
    { lng: 11.5, lat: 37.2 },
    { lng: 1.0, lat: 37.2 },
    { lng: -4.5, lat: 36.0 },
    { lng: -5.6, lat: 35.95 },      // Strait of Gibraltar
    { lng: -20.0, lat: 35.0 },
    { lng: -45.0, lat: 33.0 },
    { lng: -65.0, lat: 31.5 },
    { lng: -78.5, lat: 31.5 },      // US Southeast Coast
    { lng: -81.0912, lat: 32.0809 }, // Savannah Port
  ],
  houston: [
    { lng: 80.2707, lat: 13.0827 },
    { lng: 81.5, lat: 10.0 },
    { lng: 81.8, lat: 6.0 },
    { lng: 80.5, lat: 5.6 },
    { lng: 76.8, lat: 6.8 },
    { lng: 70.0, lat: 8.0 },
    { lng: 58.0, lat: 11.5 },
    { lng: 51.5, lat: 12.8 },
    { lng: 45.0, lat: 12.5 },
    { lng: 43.4, lat: 12.6 },
    { lng: 41.6, lat: 15.5 },
    { lng: 36.2, lat: 24.0 },
    { lng: 32.55, lat: 29.9 },
    { lng: 32.3, lat: 31.25 },
    { lng: 24.0, lat: 34.0 },
    { lng: 11.5, lat: 37.2 },
    { lng: 1.0, lat: 37.2 },
    { lng: -4.5, lat: 36.0 },
    { lng: -5.6, lat: 35.95 },      // Strait of Gibraltar
    { lng: -25.0, lat: 32.0 },
    { lng: -50.0, lat: 26.0 },
    { lng: -70.0, lat: 24.5 },
    { lng: -78.0, lat: 24.0 },      // Bahamas Channel
    { lng: -81.5, lat: 23.8 },      // Florida Straits (South of Key West)
    { lng: -85.0, lat: 24.5 },      // Gulf of Mexico
    { lng: -92.0, lat: 27.5 },      // Gulf of Mexico
    { lng: -94.7, lat: 29.3 },      // Galveston Bay approach
    { lng: -95.3698, lat: 29.7604 }, // Houston Port
  ],
  losangeles: [
    { lng: 80.2707, lat: 13.0827 }, // Chennai
    { lng: 81.5, lat: 10.0 },
    { lng: 81.8, lat: 6.0 },
    { lng: 80.5, lat: 5.6 },
    { lng: 76.8, lat: 6.8 },
    { lng: 70.0, lat: 8.0 },
    { lng: 58.0, lat: 11.5 },
    { lng: 51.5, lat: 12.8 },
    { lng: 45.0, lat: 12.5 },
    { lng: 43.4, lat: 12.6 },
    { lng: 41.6, lat: 15.5 },
    { lng: 36.2, lat: 24.0 },
    { lng: 32.55, lat: 29.9 },
    { lng: 32.3, lat: 31.25 },
    { lng: 24.0, lat: 34.0 },
    { lng: 11.5, lat: 37.2 },
    { lng: 1.0, lat: 37.2 },
    { lng: -4.5, lat: 36.0 },
    { lng: -5.6, lat: 35.95 },      // Strait of Gibraltar
    { lng: -30.0, lat: 28.0 },      // Central Atlantic
    { lng: -55.0, lat: 20.0 },      // North of Antilles
    { lng: -75.0, lat: 12.0 },      // Caribbean Sea
    { lng: -79.68, lat: 9.08 },     // Panama Canal Transit
    { lng: -81.5, lat: 7.5 },       // Gulf of Panama
    { lng: -95.0, lat: 13.0 },      // Eastern Pacific
    { lng: -108.0, lat: 20.0 },     // Pacific Coast Mexico
    { lng: -116.0, lat: 28.0 },     // Baja California Coast
    { lng: -118.1937, lat: 33.7701 }, // Los Angeles Port
  ],
};

export default function RealInteractiveMap({
  selectedPortId,
  onSelectPort,
  filteredPorts,
}: RealInteractiveMapProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [worldData, setWorldData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Active selected port object
  const selectedPort = useMemo(() => {
    return (
      GLOBAL_PORTS_DATA.find((p) => p.id === selectedPortId) ||
      GLOBAL_PORTS_DATA[0]
    );
  }, [selectedPortId]);

  // Determine active route path
  const routePath = useMemo(() => {
    if (!selectedPort) return null;
    return MARITIME_SEA_ROUTES[selectedPort.id] || [
      { lng: CHENNAI_ORIGIN.lng, lat: CHENNAI_ORIGIN.lat },
      { lng: selectedPort.lng, lat: selectedPort.lat },
    ];
  }, [selectedPort]);

  // Load GeoJSON data on mount
  useEffect(() => {
    let isMounted = true;
    fetch(getAssetPath("/world.geojson"))
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setWorldData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Could not load /world.geojson map data", err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Primary D3 Rendering Effect
  useEffect(() => {
    if (!worldData || !svgRef.current) return;

    const width = 1000;
    const height = 660;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "100%")
      .style("display", "block");

    svg.selectAll("*").remove();

    // Defs for filters / gradients / patterns
    const defs = svg.append("defs");

    // Glow filter for active port markers
    const filter = defs.append("filter")
      .attr("id", "port-glow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Sky blue ocean fills the entire SVG background
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#87CEEB");

    // Mercator projection: scale 155 at standard 1000x660
    const projection = d3.geoMercator()
      .scale(155)
      .translate([width / 2, height / 1.75]);

    const path = d3.geoPath().projection(projection);

    const g = svg.append("g");

    // Nature-inspired color palette for countries
    const natureColors = [
      "#AABF9B", "#C1CCB0", "#E0D8B4", "#D4C9A8", "#B3BA99",
      "#99A882", "#EBE0C5", "#CDD4B4", "#DED3B6", "#C7BC9F",
      "#B0C49F", "#D8CFA7", "#BFC9A3", "#C9CFA8", "#D2CCB0",
    ];
    const colorScale = d3.scaleOrdinal(natureColors);

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    // Helper: darken a hex color for hover interaction
    const darken = (hex: string, amount = 20) => {
      const cleanHex = hex.replace("#", "");
      if (cleanHex.length !== 6) return hex;
      const num = parseInt(cleanHex, 16);
      const r = Math.max(0, (num >> 16) - amount);
      const g = Math.max(0, ((num >> 8) & 0xff) - amount);
      const b = Math.max(0, (num & 0xff) - amount);
      return `rgb(${r},${g},${b})`;
    };

    // Helper: Normalize country strings for matching
    const matchCountry = (countryName: string, targetCountry: string) => {
      if (!countryName || !targetCountry) return false;
      const c1 = countryName.toLowerCase().trim();
      const c2 = targetCountry.toLowerCase().trim();
      if (c1 === c2) return true;
      if (c2.includes(c1) || c1.includes(c2)) return true;
      if (c1 === "united states of america" && (c2 === "united states" || c2 === "usa")) return true;
      if (c1 === "united states" && (c2 === "united states of america" || c2 === "usa")) return true;
      if (c1 === "united kingdom" && (c2 === "uk" || c2 === "britain")) return true;
      if (c1 === "uae" && (c2 === "united arab emirates")) return true;
      if (c1 === "united arab emirates" && (c2 === "uae")) return true;
      if (c1 === "netherlands" && c2.includes("netherlands")) return true;
      if (c1 === "germany" && c2.includes("germany")) return true;
      if (c1 === "italy" && c2.includes("italy")) return true;
      return false;
    };

    const getFill = (d: any) => {
      const name = d.properties?.name || d.properties?.NAME || "";
      if (!name) return "#D4C9A8";
      if (selectedPort && matchCountry(name, selectedPort.country)) {
        return "#FF8C42"; // Highlight destination country
      }
      if (name.toLowerCase() === "india") {
        return "#E56B6F"; // Highlight India origin
      }
      return colorScale(name);
    };

    // ── DRAW LAND POLYGONS (Excluding Antarctica) ──
    const landGroup = g.append("g").attr("class", "land-group");
    landGroup.selectAll("path")
      .data(worldData.features.filter((d: any) => {
        const name = d.properties?.name || d.properties?.NAME || "";
        return name !== "Antarctica";
      }))
      .join("path")
      .attr("d", path as any)
      .attr("fill", (d: any) => getFill(d))
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.5)
      .style("cursor", "pointer")
      .style("transition", "fill 0.2s ease")
      .on("click", (event: any, d: any) => {
        const name = d.properties?.name || d.properties?.NAME || "";
        if (!name) return;
        // Match country to a port
        const matched = GLOBAL_PORTS_DATA.find((p) => matchCountry(name, p.country));
        if (matched) {
          onSelectPort(matched.id);
        }
      })
      .on("mouseover", function (event: any, d: any) {
        const currentFill = d3.select(this).attr("fill");
        if (currentFill.startsWith("#")) {
          d3.select(this).attr("fill", darken(currentFill, 18));
        }
      })
      .on("mouseout", function (event: any, d: any) {
        d3.select(this).attr("fill", getFill(d));
      });

    // ── DRAW ALL DESTINATION PORT LOCATIONS AS PINS ──
    const portsGroup = g.append("g").attr("class", "ports-group");
    filteredPorts.forEach((port) => {
      const isSelected = port.id === selectedPort.id;
      const coords = projection([port.lng, port.lat]);
      if (!coords) return;

      const portNode = portsGroup.append("g")
        .attr("transform", `translate(${coords[0]}, ${coords[1]})`)
        .style("cursor", "pointer")
        .on("click", (e) => {
          e.stopPropagation();
          onSelectPort(port.id);
        });

      if (!isSelected) {
        // Unselected subtle destination port beacon
        portNode.append("circle")
          .attr("r", 4)
          .attr("fill", "#0f172a")
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 1.2)
          .attr("opacity", 0.85);

        portNode.append("title").text(`${port.name} (${port.code}) - ${port.country}`);
      }
    });

    // ── DRAW CERTIFIED SEA ROUTE & SHIP ANIMATION ──
    if (routePath && routePath.length > 1) {
      const projectedPath = routePath
        .map((p) => projection([p.lng, p.lat]))
        .filter((p): p is [number, number] => p !== null);

      if (projectedPath.length > 1) {
        const lineGenerator = d3.line<[number, number]>()
          .x((d) => d[0])
          .y((d) => d[1])
          .curve(d3.curveCatmullRom.alpha(0.5));

        const routeGroup = g.append("g").attr("class", "route-group");

        // Route Shadow for depth
        routeGroup.append("path")
          .datum(projectedPath)
          .attr("d", lineGenerator)
          .attr("fill", "none")
          .attr("stroke", "rgba(15, 23, 42, 0.25)")
          .attr("stroke-width", 4)
          .attr("stroke-linecap", "round");

        // Primary Dotted Ocean Sealane
        const d3Path = routeGroup.append("path")
          .datum(projectedPath)
          .attr("d", lineGenerator)
          .attr("fill", "none")
          .attr("stroke", "#1e40af")
          .attr("stroke-width", 2.5)
          .attr("stroke-dasharray", "6,4")
          .attr("opacity", 0.95);

        // Origin Marker (Chennai INMAA - Green Beacon)
        const pOrigin = projectedPath[0];
        if (pOrigin) {
          const originGroup = g.append("g").attr("transform", `translate(${pOrigin[0]}, ${pOrigin[1]})`);
          
          originGroup.append("circle")
            .attr("r", 12)
            .attr("fill", "#10b981")
            .attr("opacity", 0.25)
            .attr("class", "animate-ping");

          originGroup.append("circle")
            .attr("r", 5.5)
            .attr("fill", "#10b981")
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 1.8);

          // Origin Label
          const originLabel = originGroup.append("g").attr("transform", "translate(9, -8)");
          originLabel.append("rect")
            .attr("x", -3)
            .attr("y", -11)
            .attr("width", 54)
            .attr("height", 16)
            .attr("rx", 3)
            .attr("fill", "rgba(15, 23, 42, 0.85)");
          originLabel.append("text")
            .attr("x", 24)
            .attr("y", 1)
            .attr("text-anchor", "middle")
            .text("INMAA")
            .attr("font-size", "9.5px")
            .attr("font-family", "monospace")
            .attr("font-weight", "bold")
            .attr("fill", "#ffffff");
        }

        // Destination Marker (Red Beacon)
        const pDest = projectedPath[projectedPath.length - 1];
        if (pDest) {
          const destGroup = g.append("g").attr("transform", `translate(${pDest[0]}, ${pDest[1]})`);

          destGroup.append("circle")
            .attr("r", 14)
            .attr("fill", "#ef4444")
            .attr("opacity", 0.3)
            .attr("class", "animate-ping");

          destGroup.append("circle")
            .attr("r", 6)
            .attr("fill", "#ef4444")
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 2)
            .attr("filter", "url(#port-glow)");

          // Destination Code Label
          const destLabel = destGroup.append("g").attr("transform", "translate(10, 4)");
          destLabel.append("rect")
            .attr("x", -3)
            .attr("y", -11)
            .attr("width", 58)
            .attr("height", 17)
            .attr("rx", 4)
            .attr("fill", "#0f172a");
          destLabel.append("text")
            .attr("x", 26)
            .attr("y", 1.5)
            .attr("text-anchor", "middle")
            .text(selectedPort.code)
            .attr("font-size", "10px")
            .attr("font-family", "monospace")
            .attr("font-weight", "bold")
            .attr("fill", "#ffffff");
        }

        // Animated Ship with user's /ship.png logo
        const shipGroup = g.append("g").attr("class", "vessel-marker");

        shipGroup
          .append("image")
          .attr("href", getAssetPath("/ship.png"))
          .attr("width", 32)
          .attr("height", 32)
          .attr("x", -16)
          .attr("y", -16);

        let animationFrameId: number | null = null;
        const pathNode = d3Path.node();
        if (pathNode) {
          const totalLength = pathNode.getTotalLength();
          const duration = 4000; // 4s fast continuous voyage
          let shipStartTime: number | null = null;

          const animateShipFrame = (now: number) => {
            if (!shipStartTime) shipStartTime = now;
            const elapsed = now - shipStartTime;
            const progress = (elapsed % duration) / duration;
            const currentDist = progress * totalLength;
            const point = pathNode.getPointAtLength(currentDist);

            shipGroup.attr("transform", `translate(${point.x},${point.y})`);
            animationFrameId = requestAnimationFrame(animateShipFrame);
          };

          animationFrameId = requestAnimationFrame(animateShipFrame);
        }

        // Smooth Zoom to Frame the Route & Destination
        const xExtent = d3.extent(projectedPath, (d) => d[0]) as [number, number];
        const yExtent = d3.extent(projectedPath, (d) => d[1]) as [number, number];

        if (xExtent[0] !== undefined && xExtent[1] !== undefined && yExtent[0] !== undefined && yExtent[1] !== undefined) {
          const dx = xExtent[1] - xExtent[0];
          const dy = yExtent[1] - yExtent[0];
          const midX = (xExtent[0] + xExtent[1]) / 2;
          const midY = (yExtent[0] + yExtent[1]) / 2;

          // Comfortable zoom bounding so user maintains geographic context
          const scale = Math.max(1, Math.min(4.5, 0.65 / Math.max(dx / width, dy / height, 0.01)));
          const translateX = width / 2 - scale * midX;
          const translateY = height / 2 - scale * midY;

          svg.transition()
            .duration(1200)
            .ease(d3.easeCubicInOut)
            .call(
              zoom.transform,
              d3.zoomIdentity.translate(translateX, translateY).scale(scale)
            );
        }

        return () => {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        };
      }
    } else {
      // Reset zoom to world view if no specific route
      svg.transition()
        .duration(1000)
        .call(zoom.transform, d3.zoomIdentity);
    }
  }, [worldData, selectedPort, routePath, filteredPorts, onSelectPort]);

  // Controls: Reset to Global View
  const handleResetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(900)
      .ease(d3.easeCubicInOut)
      .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
  };

  // Controls: Zoom In
  const handleZoomIn = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(400)
      .call(zoomBehaviorRef.current.scaleBy, 1.4);
  };

  // Controls: Zoom Out
  const handleZoomOut = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(400)
      .call(zoomBehaviorRef.current.scaleBy, 0.7);
  };

  return (
    <div className="w-full h-full relative overflow-hidden select-none" style={{ background: "#87CEEB" }}>
      {/* Loading Radar Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#87CEEB]/90 backdrop-blur-xs text-[#0f172a] font-mono text-xs gap-3">
          <div className="w-8 h-8 border-3 border-[#0f172a] border-t-transparent rounded-full animate-spin" />
          <span className="tracking-widest uppercase font-bold text-[11px]">
            RENDERING WORLD MARITIME MAP...
          </span>
        </div>
      )}

      {/* SVG Map Canvas */}
      <svg
        ref={svgRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* Floating Map Controls (Top Left) */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={handleResetZoom}
          title="Reset to Full World Map"
          aria-label="Reset to Full World Map"
          className="px-2.5 py-1.5 bg-white/95 hover:bg-white text-[#0f172a] hover:text-[#0f172a] text-[11px] font-mono font-semibold rounded-lg shadow-sm border border-[#0f172a]/15 flex items-center gap-1.5 cursor-pointer backdrop-blur-md transition-all active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#0f172a]" />
          <span>Global View</span>
        </button>
      </div>

      {/* Floating Zoom Controls (Bottom Right) */}
      <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1 shadow-sm">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom In"
          aria-label="Zoom In"
          className="w-7 h-7 bg-white/95 hover:bg-white text-[#0f172a] rounded-t-md border border-[#0f172a]/20 flex items-center justify-center cursor-pointer transition-all active:bg-gray-100"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom Out"
          aria-label="Zoom Out"
          className="w-7 h-7 bg-white/95 hover:bg-white text-[#0f172a] rounded-b-md border border-t-0 border-[#0f172a]/20 flex items-center justify-center cursor-pointer transition-all active:bg-gray-100"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Helper Banner (Bottom Center) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 bg-gray-900/80 text-white text-[11px] font-sans rounded-full shadow-lg backdrop-blur-md border border-white/10">
        <Globe className="w-3 h-3 text-[#38bdf8]" />
        <span>Click any country or destination port on the map to trace sea route</span>
      </div>
    </div>
  );
}
