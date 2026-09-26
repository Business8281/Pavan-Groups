"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { scrollToHash } from "@/components/SmoothScroll";

import { ArrowRight, Heart, Search, X } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS_DATABASE } from "@/lib/productsData";

interface NavLink {
  label: string;
  href: string;
  isContact?: boolean;
}

const links: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Export", href: "/export" },
  { label: "Contact", href: "/contact", isContact: false },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const lastY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const { wishlistCount, openWishlistDrawer } = useWishlist();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape key handler to close search dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter stones live
  const filteredStones = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS_DATABASE.filter((stone) => {
      return (
        stone.name.toLowerCase().includes(q) ||
        stone.company.toLowerCase().includes(q) ||
        stone.category.toLowerCase().includes(q) ||
        stone.color.toLowerCase().includes(q) ||
        stone.origin.toLowerCase().includes(q) ||
        stone.finish.toLowerCase().includes(q) ||
        stone.description.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Determine if navbar is in light-mode state (when scrolled or on any inner page)
  const isLightNav = pathname !== "/" || stuck;

  // Close the mobile sheet whenever the route changes
  useEffect(() => {
    setOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Lock body scroll while the sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // GSAP animation for mobile drawer opening and closing
  useEffect(() => {
    const sheet = mobileSheetRef.current;
    const linksContainer = mobileLinksRef.current;
    if (!sheet || !linksContainer) return;

    if (open) {
      gsap.to(sheet, {
        opacity: 1,
        visibility: "visible",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.fromTo(
        linksContainer.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    } else {
      gsap.to(sheet, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(sheet, { visibility: "hidden" });
        },
      });
    }
  }, [open]);

  // Scroll visibility logic
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 40);
      if (y < 80) {
        gsap.to(navRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
      } else if (y > lastY.current + 10) {
        gsap.to(navRef.current, { y: "-100%", duration: 0.45, ease: "power2.inOut" });
      } else if (y < lastY.current - 5) {
        gsap.to(navRef.current, { y: 0, duration: 0.35, ease: "power2.out" });
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleContactClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      setOpen(false);
      scrollToHash("#contact", 1.6);
      window.history.replaceState(null, "", "#contact");
    } else {
      setOpen(false);
      router.push("/#contact");
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full h-[72px] z-[80] flex items-center px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 gap-3 lg:gap-6 xl:gap-8 transition-all duration-400"
        style={{ willChange: "transform" }}
      >
        {/* Dynamic Frosted Backdrop */}
        <div
          className="absolute inset-0 transition-all duration-400 pointer-events-none"
          style={{
            background: stuck
              ? "rgba(255, 255, 255, 0.96)"
              : "rgba(255, 255, 255, 0.8)",
            borderBottom: stuck
              ? "1px solid rgba(20, 13, 10, 0.08)"
              : "1px solid rgba(20, 13, 10, 0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        />

        {/* Brand */}
        <Link href="/" className="flex flex-col gap-[2px] flex-none relative z-10 group">
          <span className="font-display font-medium text-[15px] tracking-[0.28em] uppercase text-[#140d0a] transition-colors duration-300 group-hover:text-[#ff5500]">
            Pavan Stones Group
          </span>
          <span className="text-[7.5px] tracking-[0.42em] uppercase text-[#140d0a]/60 transition-colors duration-300">
            Natural Stone Excellence
          </span>
        </Link>

        {/* Center: Product Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[210px] lg:max-w-[260px] xl:max-w-xs mx-auto relative z-20" ref={searchContainerRef}>
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3 w-3.5 h-3.5 text-[#747474] pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search stones..."
                className="w-full pl-8 pr-8 py-1.5 bg-[#fbfbfb] hover:bg-white focus:bg-white text-xs font-sans text-[#140d0a] placeholder:text-[#747474]/80 border border-[#252422]/25 hover:border-[#252422]/50 focus:border-[#ff5500] rounded-[4px] transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#ff5500]/20 shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  className="absolute right-2.5 p-0.5 rounded-full hover:bg-black/5 text-[#747474] hover:text-[#140d0a] cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Instant Dropdown Preview */}
          <AnimatePresence>
            {isSearchOpen && searchQuery.trim().length >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/98 backdrop-blur-xl border border-[#252422]/20 rounded-[4px] shadow-2xl overflow-hidden z-50 divide-y divide-[#140d0a]/5 min-w-[280px]"
              >
                {/* Header */}
                <div className="px-3.5 py-2 bg-[#faf8f5] flex items-center justify-between text-[9.5px] font-mono text-[#747474] uppercase tracking-wider">
                  <span>{filteredStones.length} Stones Found</span>
                  <span>Press ↵ to view</span>
                </div>

                {/* List of matches */}
                <div className="max-h-[280px] overflow-y-auto p-1.5 space-y-0.5">
                  {filteredStones.slice(0, 5).map((stone) => (
                    <Link
                      key={stone.id}
                      href={`/products/${stone.id}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-[4px] hover:bg-[#faf8f5] transition-colors group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-[4px] overflow-hidden bg-[#f4f4f5] flex-none border border-black/5">
                        <img src={stone.image} alt={stone.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-[#140d0a] truncate group-hover:text-[#ff5500] transition-colors">
                          {stone.name}
                        </div>
                        <div className="text-[9.5px] font-mono text-[#747474] flex items-center gap-1 truncate">
                          <span className="text-[#ff5500] font-semibold">{stone.company}</span>
                          <span>•</span>
                          <span className="capitalize">{stone.category}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3 h-3 text-[#747474] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-none" />
                    </Link>
                  ))}

                  {filteredStones.length === 0 && (
                    <div className="py-5 text-center text-xs font-mono text-[#747474]">
                      No matching stones found for &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>

                {/* View All in Catalog Link */}
                {filteredStones.length > 0 && (
                  <Link
                    href={`/products?search=${encodeURIComponent(searchQuery.trim())}`}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="block w-full py-2 px-3 bg-[#faf8f5] hover:bg-[#ff5500] text-[#140d0a] hover:text-white text-center text-[10px] font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer"
                  >
                    View All {filteredStones.length} Results in Catalog →
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Links (Desktop) with Smooth Liquid Flow Underline */}
        <LayoutGroup id="navbar-links">
          <ul
            onMouseLeave={() => setHoveredPath(null)}
            className="hidden lg:flex items-center gap-6 xl:gap-8 ml-auto list-none p-0 m-0 relative z-10"
          >
            {links.map((l) => {
              const active = isActive(l.href);
              const isHighlighted = hoveredPath !== null ? hoveredPath === l.href : active;
              const linkColor = isHighlighted ? "#ff5500" : "rgba(20, 13, 10, 0.75)";

              if (l.isContact) {
                return (
                  <li key={l.label} className="relative">
                    <button
                      onClick={handleContactClick}
                      onMouseEnter={() => setHoveredPath(l.href)}
                      onFocus={() => setHoveredPath(l.href)}
                      className="relative text-[10px] font-bold tracking-[0.24em] uppercase transition-colors duration-300 py-2 cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                      style={{ color: linkColor }}
                    >
                      <span>{l.label}</span>
                      {isHighlighted && (
                        <motion.span
                          layoutId="navbar-flow-underline"
                          className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full pointer-events-none"
                          style={{
                            background: "linear-gradient(90deg, #ff5500 0%, #ff7733 50%, #ff5500 100%)",
                            boxShadow: "0 2px 10px rgba(255, 85, 0, 0.45)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 28,
                            mass: 0.75,
                          }}
                        />
                      )}
                    </button>
                  </li>
                );
              }

              return (
                <li key={l.label} className="relative">
                  <Link
                    href={l.href}
                    onMouseEnter={() => setHoveredPath(l.href)}
                    onFocus={() => setHoveredPath(l.href)}
                    className="relative text-[10px] font-bold tracking-[0.24em] uppercase transition-colors duration-300 py-2 inline-block focus:outline-none"
                    style={{ color: linkColor }}
                  >
                    <span>{l.label}</span>
                    {isHighlighted && (
                      <motion.span
                        layoutId="navbar-flow-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full pointer-events-none"
                        style={{
                          background: "linear-gradient(90deg, #ff5500 0%, #ff7733 50%, #ff5500 100%)",
                          boxShadow: "0 2px 10px rgba(255, 85, 0, 0.45)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 28,
                          mass: 0.75,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </LayoutGroup>

        {/* Wishlist Button (Desktop) */}
        <button
          type="button"
          onClick={openWishlistDrawer}
          className="relative z-10 p-2.5 rounded-full text-[#140d0a] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-all duration-300 cursor-pointer flex items-center justify-center focus:outline-none ml-auto lg:ml-0"
          aria-label={`View Shortlisted Stones (${wishlistCount} items)`}
          title="View Shortlisted Stones"
        >
          <Heart className={`w-5 h-5 transition-transform active:scale-90 ${wishlistCount > 0 ? "fill-[#ef4444] text-[#ef4444]" : ""}`} />
          {wishlistCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={wishlistCount}
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#ef4444] text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center shadow-xs"
            >
              {wishlistCount}
            </motion.span>
          )}
        </button>

        {/* CTA (Get Quote) */}
        <button
          onClick={handleContactClick}
          className="hidden md:inline-flex items-center gap-2.5 relative z-10 px-5 py-2.5 text-[10px] font-medium tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer bg-transparent border border-[#ff5500] text-[#ff5500] hover:bg-[#ff5500] hover:text-white shadow-sm focus:outline-none"
        >
          <span>Get Quote</span>
          <ArrowRight size={12} />
        </button>

        {/* Burger Button with enlarged touch target */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden relative z-10 w-10 h-10 -mr-2 flex flex-col justify-center items-center gap-1.5 bg-transparent border-none p-0 cursor-pointer touch-manipulation"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className="block h-[1.5px] bg-[#140d0a] transition-all duration-400 origin-center"
            style={{
              transform: open ? "translateY(7.5px) rotate(45deg)" : "none",
              width: "24px",
            }}
          />
          <span
            className="block h-[1.5px] bg-[#140d0a] transition-all duration-300"
            style={{
              width: open ? "0px" : "18px",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block h-[1.5px] bg-[#140d0a] transition-all duration-400 origin-center"
            style={{
              transform: open ? "translateY(-7.5px) rotate(-45deg)" : "none",
              width: "24px",
            }}
          />
        </button>
      </nav>

      {/* Mobile & Tablet Drawer (Smooth Responsive Viewport) */}
      <div
        ref={mobileSheetRef}
        className="fixed inset-x-0 top-[72px] z-[75] flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:hidden opacity-0 pointer-events-auto overflow-y-auto"
        style={{
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          visibility: "hidden",
          height: "calc(100dvh - 72px)",
        }}
      >
        <div ref={mobileLinksRef} className="flex flex-col items-center gap-3.5 sm:gap-4.5 my-auto py-4 max-w-md mx-auto w-full">
          {/* Mobile Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                setOpen(false);
                router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
              }
            }}
            className="w-full max-w-xs mb-2"
          >
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3.5 w-3.5 h-3.5 text-[#747474] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stones, granites..."
                className="w-full pl-9 pr-4 py-2 bg-[#fbfbfb] text-xs font-sans text-[#140d0a] placeholder:text-[#747474] border border-[#252422]/25 rounded-[4px] focus:outline-none focus:border-[#ff5500]"
              />
            </div>
          </form>

          <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-[#c85a32] font-semibold mb-0.5">
            Navigation Menu
          </span>
          {links.map((l) => (
            <div key={l.label} className="text-center w-full">
              {l.isContact ? (
                <button
                  onClick={handleContactClick}
                  className="font-display text-2xl sm:text-3xl font-light transition-colors duration-300 bg-transparent border-none cursor-pointer text-[#140d0a] hover:text-[#ff5500] py-1 touch-manipulation"
                >
                  {l.label}
                </button>
              ) : (
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl sm:text-3xl font-light transition-colors duration-300 block py-1 touch-manipulation"
                  style={{
                    color: isActive(l.href) ? "#ff5500" : "#140d0a",
                  }}
                >
                  {l.label}
                </Link>
              )}
            </div>
          ))}

          <button
            onClick={() => {
              setOpen(false);
              openWishlistDrawer();
            }}
            className="mt-2 w-full max-w-xs py-3 bg-[#faf8f5] hover:bg-[#ef4444]/10 border border-[#241919]/15 text-[#241919] hover:text-[#ef4444] text-[11px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 rounded-lg cursor-pointer transition-all"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? "fill-[#ef4444] text-[#ef4444]" : ""}`} />
            <span>Shortlisted Stones ({wishlistCount})</span>
          </button>

          <button
            onClick={handleContactClick}
            className="mt-1 w-full max-w-xs py-3.5 bg-[#ff5500] hover:bg-[#e04b00] active:scale-[0.98] text-white text-[10.5px] tracking-[0.24em] uppercase font-semibold border-none cursor-pointer transition-all shadow-md touch-manipulation"
          >
            Request Quotation
          </button>
        </div>

        {/* Mobile Drawer Footer Contacts */}
        <div className="pt-4 border-t border-[#140d0a]/10 flex flex-col items-center gap-2 text-center text-xs font-mono text-[#747474] pb-4">
          <div className="flex items-center justify-center gap-3 text-[11px]">
            <a href="tel:+919246462600" className="text-[#241919] font-semibold hover:text-[#ff5500] py-1">
              +91 9246462600
            </a>
            <span>•</span>
            <a href="mailto:export@pavangroups.com" className="text-[#241919] font-semibold hover:text-[#ff5500] py-1">
              export@pavangroups.com
            </a>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-[#747474]/80">
            Headquarters: Markapur, Andhra Pradesh, India
          </span>
        </div>
      </div>
    </>
  );
}
