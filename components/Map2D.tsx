"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { IndianPort, DestinationPort } from "@/lib/shippingData";
import { Info } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

interface Map2DProps {
  origin: IndianPort | null;
  destination: DestinationPort | null;
  onCountryClick: (countryName: string) => void;
  routePath: { lat: number; lng: number; code?: string }[] | null;
}

export default function Map2D({
  origin,
  destination,
  onCountryClick,
  routePath,
}: Map2DProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [worldData, setWorldData] = useState<any>(null);

  useEffect(() => {
    fetch(getAssetPath("/world.geojson"))
      .then((res) => res.json())
      .then((data) => {
        setWorldData(data);
      })
      .catch((err) => console.error("Could not load map data", err));
  }, []);

  useEffect(() => {
    if (!worldData || !svgRef.current) return;

    let animationFrameId: number | null = null;

    const width = 1000;
    const height = 660;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "100%")
      .style("display", "block");

    svg.selectAll("*").remove();

    // Sky blue ocean fills the entire SVG
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#87CEEB");

    // Mercator projection
    const projection = d3
      .geoMercator()
      .scale(155)
      .translate([width / 2, height / 1.75]);

    const pathGenerator = d3.geoPath().projection(projection);

    const g = svg.append("g");

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);

    // Nature-inspired color palette for countries
    const natureColors = [
      "#AABF9B",
      "#C1CCB0",
      "#E0D8B4",
      "#D4C9A8",
      "#B3BA99",
      "#99A882",
      "#EBE0C5",
      "#CDD4B4",
      "#DED3B6",
      "#C7BC9F",
      "#B0C49F",
      "#D8CFA7",
      "#BFC9A3",
      "#C9CFA8",
      "#D2CCB0",
    ];
    const colorScale = d3.scaleOrdinal(natureColors);

    // Helper: darken a hex color by a small amount for hover
    const darken = (hex: string, amount = 20) => {
      const cleanHex = hex.replace("#", "");
      const num = parseInt(cleanHex, 16);
      if (isNaN(num)) return hex;
      const r = Math.max(0, (num >> 16) - amount);
      const g = Math.max(0, ((num >> 8) & 0xff) - amount);
      const b = Math.max(0, (num & 0xff) - amount);
      return `rgb(${r},${g},${b})`;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getFill = (d: any) => {
      const name = d.properties?.name || d.properties?.NAME;
      if (!name) return "#D4C9A8";
      if (
        destination &&
        (name.toLowerCase() === destination.country.toLowerCase() ||
          (destination.country.includes("United States") && name === "United States of America") ||
          (destination.country === "United States" && (name === "United States" || name === "USA" || name === "United States of America")))
      ) {
        return "#FF8C42";
      }
      if (name === "India") return "#E56B6F";
      return colorScale(name);
    };

    // Draw Land — exclude Antarctica
    g.selectAll("path")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .data(worldData.features.filter((d: any) => {
        const name = d.properties?.name || d.properties?.NAME;
        return name !== "Antarctica";
      }))
      .join("path")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("d", pathGenerator as any)
      .attr("fill", (d) => getFill(d))
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 0.5)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawName = (d as any).properties?.name || (d as any).properties?.NAME;
        const name = rawName === "United States of America" ? "United States" : rawName;
        if (onCountryClick && name) onCountryClick(name);
      })
      .on("mouseover", function (event, d) {
        const original = getFill(d);
        d3.select(this).attr("fill", darken(original, 18));
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr("fill", getFill(d));
      });

    // Draw Route if routePath exists
    if (routePath && routePath.length > 1) {
      const projectedPath = routePath
        .map((p) => projection([p.lng, p.lat]))
        .filter((p): p is [number, number] => p !== null && !isNaN(p[0]) && !isNaN(p[1]));

      const lineGenerator = d3
        .line<[number, number]>()
        .curve(d3.curveCatmullRom.alpha(0.5));

      const d3Path = g
        .append("path")
        .datum(projectedPath)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "#1e40af")
        .attr("stroke-width", 2.5)
        .attr("stroke-dasharray", "6,4")
        .attr("opacity", 0.85);

      const pathNode = d3Path.node();

      if (pathNode) {
        // Animated Ship with user's /ship.png logo
        const shipGroup = g.append("g").attr("class", "vessel-marker");

        shipGroup
          .append("image")
          .attr("href", getAssetPath("/ship.png"))
          .attr("width", 32)
          .attr("height", 32)
          .attr("x", -16)
          .attr("y", -16);

        const totalLength = pathNode.getTotalLength();
        const duration = 4000; // 4s fast continuous voyage
        let startTime: number | null = null;

        const animateShip = (now: number) => {
          if (!startTime) startTime = now;
          const elapsed = now - startTime;
          const progress = (elapsed % duration) / duration;
          const currentDist = progress * totalLength;
          const point = pathNode.getPointAtLength(currentDist);

          shipGroup.attr("transform", `translate(${point.x},${point.y})`);
          animationFrameId = requestAnimationFrame(animateShip);
        };

        animationFrameId = requestAnimationFrame(animateShip);
      }

      // Origin & Destination markers
      const pOrigin = projectedPath[0];
      const pDest = projectedPath[projectedPath.length - 1];

      if (pOrigin && origin) {
        g.append("circle")
          .attr("cx", pOrigin[0])
          .attr("cy", pOrigin[1])
          .attr("r", 6)
          .attr("fill", "#10b981")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5);
        g.append("text")
          .attr("x", pOrigin[0] + 9)
          .attr("y", pOrigin[1] + 4)
          .text(origin.code)
          .attr("font-size", "11px")
          .attr("font-weight", "bold")
          .attr("fill", "#1f2937");
      }

      if (pDest && destination) {
        g.append("circle")
          .attr("cx", pDest[0])
          .attr("cy", pDest[1])
          .attr("r", 6)
          .attr("fill", "#ef4444")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5);
        g.append("text")
          .attr("x", pDest[0] + 9)
          .attr("y", pDest[1] + 4)
          .text(destination.code)
          .attr("font-size", "11px")
          .attr("font-weight", "bold")
          .attr("fill", "#1f2937");
      }

      // Zoom to fit route
      const xExtent = d3.extent(projectedPath, (d) => d[0]) as [number, number];
      const yExtent = d3.extent(projectedPath, (d) => d[1]) as [number, number];

      if (
        xExtent[0] !== undefined &&
        xExtent[1] !== undefined &&
        yExtent[0] !== undefined &&
        yExtent[1] !== undefined
      ) {
        const dx = xExtent[1] - xExtent[0];
        const dy = yExtent[1] - yExtent[0];
        const x = (xExtent[0] + xExtent[1]) / 2;
        const y = (yExtent[0] + yExtent[1]) / 2;

        const scale = Math.max(
          1,
          Math.min(8, 0.7 / Math.max(dx / width, dy / height, 0.01))
        );
        const translate = [width / 2 - scale * x, height / 2 - scale * y];

        svg
          .transition()
          .duration(1000)
          .call(
            zoom.transform,
            d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
          );
      }
    } else {
      // Reset zoom if no route is active
      svg.transition().duration(1000).call(zoom.transform, d3.zoomIdentity);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [worldData, routePath, origin, destination]);

  return (
    <div
      className="w-full h-full relative"
      style={{ background: "#87CEEB", overflow: "hidden" }}
    >
      <svg
        ref={svgRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white px-4 py-2 rounded-full text-xs sm:text-sm flex items-center shadow-lg backdrop-blur-sm pointer-events-none z-10">
        <Info className="w-4 h-4 mr-2 text-white/90 flex-none" />
        <span>Click any country on the map to calculate route</span>
      </div>
    </div>
  );
}
