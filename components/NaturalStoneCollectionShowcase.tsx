"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, ImageOff } from "lucide-react";
import { scrollToHash } from "@/components/SmoothScroll";

interface StoneSwatch {
  name: string;
  image: string | null;
  href: string;
}

interface CategoryGroup {
  id: string;
  title: string;
  viewAllHref: string;
  swatches: StoneSwatch[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "slate-stone",
    title: "Slate Stone",
    viewAllHref: "/products/slate-stone",
    swatches: [
      { name: "Black Slate", image: "/images/black-slate-stone-1.jpg", href: "/products/slate-stone?stone=black" },
      { name: "Indian Autumn", image: "/images/autumn-slate-stone-1.jpg", href: "/products/slate-stone?stone=autumn" },
      { name: "California Gold", image: "/images/gold-slate-stone-1.jpg", href: "/products/slate-stone?stone=gold" },
      { name: "Grey Slate", image: "/images/premium_slate_texture.jpg", href: "/products/slate-stone?stone=grey" },
      { name: "Gold Rustic", image: "/images/gold-slate-stone-2.jpg", href: "/products/slate-stone?stone=rustic" },
      { name: "Multicolour Slate", image: "/images/autumn-slate-stone-2.jpg", href: "/products/slate-stone?stone=multi" },
    ],
  },
  {
    id: "mosaic",
    title: "Stone Mosaics",
    viewAllHref: "/products/mosaic",
    swatches: [
      { name: "Geometric Slate", image: "/images/pavan-impex/pavan-impex-001.jpg", href: "/products/mosaic" },
      { name: "Leaf Motif Slate", image: "/images/pavan-impex/pavan-impex-002.jpg", href: "/products/mosaic" },
      { name: "Diamond Slate", image: "/images/pavan-impex/pavan-impex-005.jpg", href: "/products/mosaic" },
      { name: "Beige Diamond", image: "/images/pavan-impex/pavan-impex-006.jpg", href: "/products/mosaic" },
      { name: "Grey Diamond", image: "/images/pavan-impex/pavan-impex-007.jpg", href: "/products/mosaic" },
      { name: "And More", image: "/images/pavan-impex/pavan-impex-008.jpg", href: "/products/mosaic" },
    ],
  },
  {
    id: "south-indian-granite",
    title: "South Indian Granite",
    viewAllHref: "/products/south-indian-granite",
    swatches: [
      { name: "Black Galaxy", image: "/images/south-indian-granite/black-galaxy.jpg", href: "/products/south-indian-granite?stone=galaxy" },
      { name: "Steel Grey", image: "/images/south-indian-granite/steel-grey.jpg", href: "/products/south-indian-granite?stone=steel-grey" },
      { name: "Black Pearl", image: "/images/south-indian-granite/black-pearl.jpg", href: "/products/south-indian-granite?stone=black-pearl" },
      { name: "Andhra Black", image: "/images/rajasthan-z-black-granite-2.jpg", href: "/products/south-indian-granite?stone=andhra-black" },
      { name: "Tan Brown", image: "/images/south-indian-granite/tan-brown.jpg", href: "/products/south-indian-granite?stone=tan-brown" },
      { name: "Moon White", image: "/images/ice-white-granite.jpg", href: "/products/south-indian-granite?stone=moon-white" },
    ],
  },
  {
    id: "north-indian-granite",
    title: "North Indian Granite",
    viewAllHref: "/products/north-indian-granite",
    swatches: [
      { name: "P White", image: "/images/jirawal-white-granite.jpg", href: "/products/north-indian-granite?stone=p-white" },
      { name: "Tiger Skin", image: "/images/tiger-skin-granite.jpg", href: "/products/north-indian-granite?stone=tiger-skin" },
      { name: "M Red", image: "/images/m-red-granite.jpg", href: "/products/north-indian-granite?stone=m-red" },
      { name: "Colombo Red", image: "/images/colombo-red-granite.jpg", href: "/products/north-indian-granite?stone=colombo-red" },
      { name: "Desert Gold", image: "/images/desert-gold-granite.jpg", href: "/products/north-indian-granite?stone=desert-gold" },
      { name: "Glacier White", image: "/images/glacier-white-granite.jpg", href: "/products/north-indian-granite?stone=glacier-white" },
    ],
  },
];

export default function NaturalStoneCollectionShowcase() {
  return (
    <section className="relative z-10 w-full bg-white py-5 sm:py-7 md:py-9 px-3 sm:px-6 md:px-10 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        
        {/* ── SECTION HEADER ── */}
        <div className="mb-3 sm:mb-5">
          {/* Eyebrow */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-4 h-[1.5px] bg-[#9a3412]" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#78350f]">
              OUR PRODUCTS
            </span>
          </div>

          {/* Title and Top Right Link */}
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-normal text-[#1a1310] tracking-tight">
              Explore Our Natural Stone Collection
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#454545] hover:text-[#9a3412] transition-colors group flex-none"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* ── 4 COLUMNS CARD GRID (STACKING COVER CARDS ON MOBILE) ── */}
        <div className="flex flex-col space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 xl:grid-cols-4 sm:gap-4 md:gap-5 items-stretch">
          
          {CATEGORY_GROUPS.map((cat, idx) => {
            const isNorthIndian = cat.id === "north-indian-granite";
            const isSouthIndian = cat.id === "south-indian-granite";

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  zIndex: 10 + idx,
                }}
                className="sticky top-[80px] sm:static sm:top-auto sm:z-auto bg-white rounded-xl border border-gray-200/90 p-3 sm:p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] sm:shadow-2xs hover:shadow-xs transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <h3 className="font-sans text-[13px] sm:text-sm font-semibold text-[#1a1310] tracking-tight">
                      {cat.title}
                    </h3>
                    <Link
                      href={cat.viewAllHref}
                      className="inline-flex items-center gap-0.5 text-[10px] sm:text-[11px] font-medium text-[#777777] hover:text-[#9a3412] transition-colors group"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                  {/* Swatches Grid: Compact 3-columns */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2.5">
                    {cat.swatches.map((swatch, sIdx) => (
                      <Link
                        key={sIdx}
                        href={swatch.href}
                        className="group flex flex-col items-center select-none w-full"
                      >
                        <div className="w-full aspect-square rounded-md overflow-hidden bg-[#f6f3ee] border border-gray-200/70 shadow-2xs transition-all duration-300 group-hover:border-[#9a3412]/50 group-hover:shadow-xs flex items-center justify-center">
                          {swatch.image ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={swatch.image}
                              alt={swatch.name}
                              className="w-full h-full object-cover scale-100 group-hover:scale-108 transition-transform duration-500 ease-out"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-[#9c9184] bg-[#f8f6f2] p-1 select-none">
                              <ImageOff className="w-3.5 h-3.5 stroke-[1.5] text-[#a89d90] mb-0.5" />
                              <span className="text-[7.5px] font-mono tracking-wider text-[#8c8174] uppercase font-bold">
                                Null Image
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-medium text-[#3a3532] group-hover:text-[#9a3412] mt-1 text-center leading-tight transition-colors line-clamp-1 w-full">
                          {swatch.name}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* South Indian Granite "+7 More" note */}
                  {isSouthIndian && (
                    <div className="mt-2 text-center">
                      <Link
                        href={cat.viewAllHref}
                        className="text-[10.5px] text-[#9a3412] font-semibold hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>+7 More Granites</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Custom Solution Compact Bar for Column 4 (North Indian Granite) */}
                {isNorthIndian && (
                  <div className="mt-2.5 p-2 bg-[#fbf5ee] rounded-lg flex items-center justify-between gap-2 border border-[#eddccb]/60">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <FileText className="w-3.5 h-3.5 text-[#78350f] flex-none" />
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-[#1c1613] truncate">
                          Custom Solution?
                        </div>
                        <div className="text-[9.5px] text-[#665a52] truncate">
                          Cut-to-size & export orders
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="flex-none px-2 py-1 bg-[#140f0c] hover:bg-[#251b15] text-white text-[10px] font-semibold rounded cursor-pointer transition-colors"
                    >
                      Quote →
                    </Link>
                  </div>
                )}
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
