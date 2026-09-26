"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Trash2, ArrowRight, Package, MessageSquare, ExternalLink } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistDrawer() {
  const {
    isDrawerOpen,
    closeWishlistDrawer,
    wishlistItems,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Build WhatsApp inquiry message with all wishlisted stones
  const whatsappUrl = React.useMemo(() => {
    if (wishlistItems.length === 0) {
      return "https://wa.me/919440271559?text=Hello%20Pavan%20Stones%20Group%2C%20I%20would%20like%20to%20inquire%20about%20natural%20stone%20specifications.";
    }
    const stoneList = wishlistItems
      .map((item, idx) => `${idx + 1}. ${item.name} (${item.company} - ${item.finish || "Standard"})`)
      .join("%0A");
    const message = `Hello Pavan Stones Group,%0A%0AI have shortlisted the following ${wishlistItems.length} stone specimen(s) from your digital catalog and would like FOB/CIF pricing and physical sample availability:%0A%0A${stoneList}%0A%0APlease assist with export specifications.`;
    return `https://wa.me/919440271559?text=${message}`;
  }, [wishlistItems]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeWishlistDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Slide-Over Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden border-l border-[#241919]/10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wishlist-title"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#241919]/10 bg-[#faf8f5] flex items-center justify-between flex-none">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#ef4444]">
                  <Heart className="w-5 h-5 fill-[#ef4444] text-[#ef4444]" />
                </div>
                <div>
                  <h2 id="wishlist-title" className="text-base sm:text-lg font-bold text-[#241919] leading-tight">
                    Shortlisted Stones
                  </h2>
                  <p className="text-[11px] font-mono text-[#747474]">
                    {wishlistCount} {wishlistCount === 1 ? "specimen" : "specimens"} saved in project shortlist
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {wishlistCount > 0 && (
                  <button
                    type="button"
                    onClick={clearWishlist}
                    className="text-[11px] font-mono uppercase tracking-wider text-[#747474] hover:text-[#ef4444] transition-colors px-2 py-1 cursor-pointer"
                    title="Clear all shortlisted stones"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeWishlistDrawer}
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#241919] text-[#241919] hover:text-white border border-[#241919]/15 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close shortlist drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {wishlistCount === 0 ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#faf8f5] border border-[#241919]/10 flex items-center justify-center text-[#747474]/60 shadow-inner">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5 max-w-xs">
                    <h3 className="font-bold text-base text-[#241919]">Your Shortlist is Empty</h3>
                    <p className="text-xs text-[#747474] leading-relaxed">
                      Click the heart icon on any stone specimen in our catalog to save it here for instant comparison, sample box dispatch, and FOB/CIF inquiries.
                    </p>
                  </div>
                  <Link
                    href="/products"
                    onClick={closeWishlistDrawer}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#241919] hover:bg-[#ff5500] text-white text-xs font-mono uppercase tracking-wider font-bold rounded-lg transition-all shadow-sm cursor-pointer"
                  >
                    <span>Browse Stone Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative bg-white border border-[#241919]/10 hover:border-[#ff5500]/40 rounded-xl p-3 sm:p-3.5 shadow-2xs hover:shadow-md transition-all flex items-center gap-3 sm:gap-4"
                    >
                      {/* Image Thumbnail */}
                      <Link
                        href={`/products/${item.id}`}
                        onClick={closeWishlistDrawer}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#faf8f5] flex-none border border-[#241919]/5"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#ff5500]/10 text-[#ff5500] font-semibold">
                            {item.company}
                          </span>
                          {item.origin && (
                            <span className="text-[9.5px] font-mono text-[#747474] truncate">
                              • {item.origin.split(",")[0]}
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/products/${item.id}`}
                          onClick={closeWishlistDrawer}
                          className="block font-bold text-xs sm:text-sm text-[#241919] hover:text-[#ff5500] transition-colors leading-snug line-clamp-1"
                        >
                          {item.name}
                        </Link>

                        <div className="text-[10.5px] font-mono text-[#747474] mt-1 space-y-0.5">
                          {item.finish && <p className="truncate">Finish: {item.finish}</p>}
                          {item.thickness && <p className="truncate">Thickness: {item.thickness}</p>}
                        </div>

                        <Link
                          href={`/products/${item.id}`}
                          onClick={closeWishlistDrawer}
                          className="inline-flex items-center gap-1 text-[10.5px] font-bold text-[#241919] hover:text-[#ff5500] mt-1.5 transition-colors"
                        >
                          <span>Inspect Specs</span>
                          <ExternalLink className="w-2.5 h-2.5 text-[#ff5500]" />
                        </Link>
                      </div>

                      {/* Delete from Wishlist Button */}
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-3 right-3 p-1.5 text-[#747474] hover:text-[#ef4444] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove from shortlist"
                        aria-label={`Remove ${item.name} from shortlist`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {wishlistCount > 0 && (
              <div className="p-4 sm:p-6 border-t border-[#241919]/10 bg-[#faf8f5] space-y-2.5 flex-none">
                <Link
                  href="/request-sample"
                  onClick={closeWishlistDrawer}
                  className="w-full py-3 px-4 bg-[#c85a32] hover:bg-[#b04a25] text-white text-xs sm:text-sm font-sans font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Package className="w-4 h-4" />
                  <span>Request Physical Sample Box</span>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-sans font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiry with Shortlist ({wishlistCount})</span>
                </a>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={closeWishlistDrawer}
                    className="text-[11px] font-mono uppercase tracking-wider text-[#747474] hover:text-[#241919] transition-colors cursor-pointer"
                  >
                    Continue Browsing Catalog
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
