"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, LayoutGroup } from "framer-motion";
import { gsap } from "gsap";
import { scrollToHash } from "@/components/SmoothScroll";

import { ArrowRight } from "@animateicons/react/lucide";

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

  // Determine if navbar is in light-mode state (when scrolled or on any inner page)
  const isLightNav = pathname !== "/" || stuck;

  // Close the mobile sheet whenever the route changes
  useEffect(() => {
    setOpen(false);
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
        className="fixed top-0 left-0 w-full h-[72px] z-[80] flex items-center px-6 md:px-14 lg:px-20 gap-8 transition-all duration-400"
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

        {/* Links (Desktop) with Smooth Liquid Flow Underline */}
        <LayoutGroup id="navbar-links">
          <ul
            onMouseLeave={() => setHoveredPath(null)}
            className="hidden lg:flex items-center gap-8 ml-auto list-none p-0 m-0 relative z-10"
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

        {/* CTA (Get Quote) */}
        <button
          onClick={handleContactClick}
          className="hidden md:inline-flex items-center gap-2.5 relative z-10 px-5 py-2.5 text-[10px] font-medium tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer bg-transparent border border-[#ff5500] text-[#ff5500] hover:bg-[#ff5500] hover:text-white shadow-sm focus:outline-none"
        >
          <span>Get Quote</span>
          <ArrowRight size={12} />
        </button>

        {/* Burger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden relative z-10 w-7 h-5 flex flex-col justify-between ml-auto bg-transparent border-none p-0 cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className="block h-[1.5px] bg-[#140d0a] transition-all duration-400 origin-center"
            style={{
              transform: open ? "translateY(8.5px) rotate(45deg)" : "none",
              width: "26px",
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
              transform: open ? "translateY(-8.5px) rotate(-45deg)" : "none",
              width: "26px",
            }}
          />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        ref={mobileSheetRef}
        className="fixed inset-0 top-[72px] z-[75] flex flex-col items-center justify-center gap-6 lg:hidden opacity-0 pointer-events-auto"
        style={{
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          visibility: "hidden",
        }}
      >
        <div ref={mobileLinksRef} className="flex flex-col items-center gap-5">
          {links.map((l) => (
            <div key={l.label} className="text-center">
              {l.isContact ? (
                <button
                  onClick={handleContactClick}
                  className="font-display text-3xl md:text-4xl font-light transition-colors duration-300 bg-transparent border-none cursor-pointer text-[#140d0a] hover:text-[#ff5500]"
                >
                  {l.label}
                </button>
              ) : (
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl md:text-4xl font-light transition-colors duration-300 block"
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
            onClick={handleContactClick}
            className="mt-6 px-10 py-3.5 bg-[#ff5500] text-white text-[10px] tracking-[0.24em] uppercase font-medium border-none cursor-pointer hover:bg-[#e04b00] transition-colors shadow-sm"
          >
            Request Quotation
          </button>
        </div>
      </div>
    </>
  );
}
