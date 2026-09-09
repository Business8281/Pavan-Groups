"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TileCard {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  linkHref: string;
}

const TILE_COLLECTIONS: TileCard[] = [
  {
    id: "stone-slate",
    name: "Natural Slate Flooring",
    category: "Markapur Foliated Cleft",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    linkHref: "/products?company=Pavan+Impex&stone=slate",
  },
  {
    id: "stone-granite",
    name: "Black Galaxy Granite",
    category: "Chimakurthy Gold Sparkle",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    linkHref: "/products?company=Pavan+Granite&stone=granite",
  },
  {
    id: "stone-limestone",
    name: "Calcareous Limestone",
    category: "Cuddapah Anti-Skid Pavers",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
    linkHref: "/products?company=Sai+Balaji+Impex&stone=limestone",
  },
  {
    id: "stone-3d-cladding",
    name: "3D Wall Cladding",
    category: "Stacked Interlocking Panels",
    imageUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80",
    linkHref: "/products?finish=3D+Ledger+Relief",
  },
  {
    id: "stone-pavers",
    name: "Tumbled Cobble Pavers",
    category: "Heavy Vehicular Landscaping",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    linkHref: "/products?finish=Tumbled+Antique&size=200x100+mm+Pavers",
  },
  {
    id: "stone-gangsaw-slabs",
    name: "Monolithic Gangsaw Slabs",
    category: "Bespoke Countertops & Floors",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
    linkHref: "/products?size=Jumbo+Gangsaw+Slabs",
  },
];

export default function BrowseTilesBy() {
  return (
    <section
      id="browse-tiles"
      className="relative z-40 py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#ffffff] border-t border-[#747474]/15"
    >
      <div className="max-w-7xl mx-auto text-center">

        {/* ── CENTERED SECTION HEADER ── */}
        <div className="max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="font-display text-5xl md:text-6xl font-medium leading-none tracking-tight mb-4">
            <span className="text-[#241919]">Explore Natural Stone</span>{" "}
            <span className="text-[#747474]">Collections</span>
          </h2>

          <p className="text-[14px] sm:text-[15.5px] leading-relaxed text-[#454545] font-light">
            Explore our direct quarry-extracted Slate, Limestone, Granite, 3D Wall Cladding, Tumbled Pavers, and Monolithic Gangsaw Slabs.
          </p>
        </div>

        {/* ── 6-CARD CLEAN IMAGE GRID WITH SINGLE-COLOR ROTATING BORDER ONLY AROUND IMAGE ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {TILE_COLLECTIONS.map((card) => (
            <Link
              key={card.id}
              href={card.linkHref}
              className="group block relative cursor-pointer"
            >
              {/* ── IMAGE WRAPPER WITH SINGLE-COLOR ROTATING BORDER (SHARP EDGES, NO BORDER RADIUS) ── */}
              <div className="relative p-[2px] rounded-none overflow-hidden transition-all duration-500 hover:shadow-xl">
                {/* Single-Color Coral Light Beam Rotating Border */}
                <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,#c85a32_120deg,transparent_240deg)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-500 pointer-events-none" />

                {/* Inner Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1a1918] rounded-none z-10">
                  <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* ── ATTRACTIVE TITLE TEXT BELOW IMAGE (OUTSIDE BORDER) ── */}
              <div className="pt-3.5 pb-1 text-center">
                <h3 className="font-sans font-bold text-base sm:text-lg text-[#0f172a] group-hover:text-[#c85a32] transition-colors tracking-wide">
                  {card.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* ── BOTTOM CENTERED ACTION BUTTON ── */}
        <div className="pt-2">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-9 py-3.5 bg-[#241919] hover:bg-[#c85a32] text-[#f1f5f9] rounded-full text-xs font-sans font-medium transition-all shadow-md hover:shadow-lg hover:translate-y-[-1px] cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#94a3b8]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
