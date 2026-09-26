"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { scrollToHash } from "@/components/SmoothScroll";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

// Crisp brand SVGs for social platforms
const InstagramIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="currentColor" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" fill="currentColor" stroke="currentColor" />
  </svg>
);

const TwitterIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DIVISIONS = [
  {
    name: "Pavan Impex",
    focus: "Slate & Wall Cladding",
    products: ["Black Slate Stone", "Indian Autumn Slate", "California Gold Slate", "3D Ledgers & Mosaics"],
    origin: "Markapur Quarry Basin",
  },
  {
    name: "Sai Balaji Impex",
    focus: "Limestone Products",
    products: ["Cuddapah Black Limestone", "Lime Yellow", "Lime Blue", "Pool Pavers & Stepping Stones"],
    origin: "Andhra Calcareous Belt",
  },
  {
    name: "Pavan Granite",
    focus: "Monolithic Granite",
    products: ["Black Galaxy Granite", "Mirror Slabs (8x3 ft / 9x4 ft)", "Custom Architectural Tiles"],
    origin: "Chimakurthy Magma Field",
  },
  {
    name: "Pavan Stones World",
    focus: "Exotic Quartzite & Marble",
    products: ["Emerald Green Quartzite", "Makrana White Marble", "Teakwood Sandstone", "Custom Stone Murals"],
    origin: "Global Architectural Hub",
  },
];

const NAVIGATION_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Stone Ecosystem", href: "#products" },
      { label: "Explore Collections", href: "#browse" },
      { label: "Why Buy From Pavan", href: "#why-us" },
      { label: "Global Shipping Radar", href: "#shipping" },
      { label: "Quarry Infrastructure", href: "/gallery" },
      { label: "Featured Projects", href: "/projects" },
    ],
  },
  {
    title: "Stone Products",
    links: [
      { label: "South Indian Granite", href: "/products/south-indian-granite" },
      { label: "Natural Slate & Ledgers", href: "/products/slate-stone" },
      { label: "Limestone & Pavers", href: "/products/limestone" },
      { label: "Architectural Hardscapes", href: "/products/applications" },
      { label: "Pavan Stones World", href: "/companies/pavan-stones-world" },
      { label: "Full Stone Catalog", href: "/products" },
    ],
  },
  {
    title: "Company & Trade",
    links: [
      { label: "About Pavan Group", href: "/about" },
      { label: "Request Sample Box", href: "/request-sample" },
      { label: "Global Export & Freight", href: "/export" },
      { label: "Quarry & Factory Units", href: "/gallery" },
      { label: "Leadership & Team", href: "/team" },
      { label: "Factory Direct Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [istTime, setIstTime] = useState("");
  const [aestTime, setAestTime] = useState("");

  // Scroll-linked parallax reveal under the FAQ section
  const quoteBannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: quoteBannerRef,
    offset: ["start end", "center 45%"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-120, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.75], [0.2, 1]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  const bannerY = useSpring(rawY, { stiffness: 50, damping: 22, restDelta: 0.001 });
  const bannerOpacity = useSpring(rawOpacity, { stiffness: 50, damping: 22 });
  const bannerScale = useSpring(rawScale, { stiffness: 50, damping: 22 });

  // Live clocks for India HQ and Global client hubs
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setAestTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Australia/Sydney",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (href: string, isContact = false) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (isContact || href === "/contact") {
      router.push("/contact");
      return;
    }

    if (href.startsWith("#")) {
      scrollToHash(href, 1.4);
      window.history.replaceState(null, "", href);
    } else {
      router.push(href);
    }
  };

  const handleScrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.8 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.history.replaceState(null, "", window.location.pathname);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative bg-white text-[#252422] border-t border-[#252422]/15 overflow-hidden z-20">
      
      {/* Background Architectural Monogram Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] select-none flex items-center justify-center overflow-hidden">
        <span
          className="font-display uppercase tracking-widest text-[#252422] whitespace-nowrap leading-none"
          style={{ fontSize: "clamp(120px, 22vw, 320px)" }}
        >
          PAVAN STONES
        </span>
      </div>

      {/* ── TOP BANNER: FLOATING ELEVATED LUXURY CARD REVEALING UNDER FAQ ── */}
      <div
        ref={quoteBannerRef}
        className="relative z-10 w-full overflow-hidden bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 border-b border-[#252422]/10"
      >
        {/* Subtle Ambient Radial Flame Glow Layer */}
        <motion.div
          style={{ opacity: bannerOpacity, scale: bannerScale }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <div
            className="w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(255,85,0,0.18) 0%, rgba(255,85,0,0.04) 60%, transparent 80%)",
            }}
          />
        </motion.div>

        {/* Floating Elevated Luxury Card */}
        <motion.div
          style={{ y: bannerY, opacity: bannerOpacity, scale: bannerScale }}
          className="relative z-10 max-w-6xl mx-auto will-change-transform"
        >
          <div className="bg-white border border-[#252422]/15 p-6 sm:p-10 md:p-12 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
              
              {/* Left Column: Heading & Narrative */}
              <div className="max-w-2xl space-y-3.5">
                <h3
                  className="font-display font-light text-[#252422] leading-tight"
                  style={{ fontSize: "clamp(26px, 3.8vw, 42px)" }}
                >
                  Get Your Stone Quote{" "}
                  <span className="italic text-[#ff5500] font-normal">Within 24 Hours.</span>
                </h3>

                <p className="text-[13.5px] sm:text-[14.5px] text-[#555555] font-light leading-relaxed">
                  Submit your technical project requirements today. Our export logistics desk delivers complete FOB/CIF freight matrices, ASTM test certificates, and container loading schedules.
                </p>
              </div>

              {/* Right Column: Specsheet Form Card */}
              <div className="lg:max-w-md w-full p-5 sm:p-6 bg-white border border-[#252422]/15 rounded-xl space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#ff5500] font-bold">
                    PRIORITY SPEC DESK
                  </span>
                  <span className="text-[10px] font-mono text-[#747474]">Response &lt; 24h</span>
                </div>

                <p className="text-[12px] text-[#444444] font-normal leading-relaxed">
                  Enter your email to receive direct catalog specs and container pricing:
                </p>

                {subscribed ? (
                  <div className="p-3.5 bg-white border border-[#ff5500] text-xs font-mono text-[#ff5500] font-semibold flex items-center gap-2 rounded-[4px] shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5500] flex-none" />
                    <span>Spec Catalog &amp; Pricing index sent to your inbox!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      placeholder="architect@company.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white border border-[#252422]/20 text-xs font-mono text-[#252422] placeholder:text-[#888888] font-medium focus:outline-none focus:border-[#ff5500] rounded-[4px] shadow-2xs transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 text-[11px] font-mono uppercase tracking-wider font-bold bg-[#252422] hover:bg-[#ff5500] active:scale-95 text-white transition-all duration-300 cursor-pointer rounded-[4px] flex-none shadow-md hover:shadow-lg hover:shadow-[#ff5500]/25 touch-manipulation"
                    >
                      Send Specs →
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* ── MAIN NAVIGATION & BRAND SECTION ── */}
      <div className="px-5 sm:px-10 lg:px-16 py-14 sm:py-16 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Brand Identity & Provenance (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <Link href="/" className="inline-block group">
                <span className="font-display text-2xl sm:text-[26px] tracking-[0.14em] uppercase text-[#252422] font-semibold block">
                  PAVAN STONES GROUP
                </span>
                <span className="text-[11px] font-mono text-[#ff5500] uppercase tracking-[0.2em] font-bold block mt-1">
                  Natural Stone Extraction &amp; Global Direct Exports · Est. 2000
                </span>
              </Link>

              <p className="text-[13.5px] text-[#555555] font-light leading-relaxed max-w-md mt-3">
                Quarry owners, precision processors, and international exporters headquartered in Markapur, Andhra Pradesh, India. Operating across 9 processing units with direct sea port connectivity.
              </p>
            </div>

            {/* Clean Structured Contact Lines */}
            <div className="space-y-2.5 text-[13px] font-sans text-[#444444] pt-1">
              <div className="flex items-center gap-3">
                <span className="text-[#888888] font-mono text-xs uppercase tracking-wider w-28 flex-none">Quarry Line:</span>
                <a href="tel:+919246462600" className="text-[#252422] hover:text-[#ff5500] font-bold transition-colors">
                  +91 9246462600
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#888888] font-mono text-xs uppercase tracking-wider w-28 flex-none">Export Desk:</span>
                <a href="mailto:export@pavangroups.com" className="text-[#252422] hover:text-[#ff5500] font-bold transition-colors">
                  export@pavangroups.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#888888] font-mono text-xs uppercase tracking-wider w-28 flex-none">Ocean Ports:</span>
                <span className="text-[#252422] font-medium">Chennai (INMAA) &amp; Krishnapatnam</span>
              </div>
            </div>

            {/* Quick Sample CTA Box */}
            <div className="pt-2">
              <Link
                href="/request-sample"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#252422] hover:bg-[#ff5500] text-white text-xs font-mono uppercase tracking-[0.16em] font-bold rounded-[4px] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Request Physical Sample Box</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Navigation Columns (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {NAVIGATION_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-3">
                
                {/* Clean Column Header */}
                <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#252422] font-bold pb-2.5 border-b border-gray-200">
                  {col.title}
                </h4>

                <ul className="space-y-2.5 p-0 m-0 list-none text-xs">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={handleNavClick(link.href, (link as any).isContact)}
                        className="text-[#555555] hover:text-[#ff5500] transition-colors duration-200 cursor-pointer border-none bg-transparent p-0 text-left block text-[13px] font-normal touch-manipulation hover:font-medium"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR: COPYRIGHT, SOCIALS & BACK TO TOP ── */}
      <div className="border-t border-gray-200 px-5 sm:px-10 lg:px-16 py-6 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-xs font-mono text-[#747474]">
          
          {/* Legal / Copyright */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-center md:text-left justify-center md:justify-start">
            <span className="text-[#252422] font-medium">© {new Date().getFullYear()} Pavan Stones Group. All Rights Reserved.</span>
            <span className="text-gray-300">•</span>
            <Link href="/privacy-policy" className="hover:text-[#252422] transition-colors">Privacy Policy</Link>
            <span className="text-gray-300">•</span>
            <Link href="/terms" className="hover:text-[#252422] transition-colors">Terms &amp; Conditions</Link>
          </div>

          {/* Social Media & Back to Top */}
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-1.5">
              {[
                { name: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
                { name: "YouTube", icon: YoutubeIcon, href: "https://youtube.com" },
                { name: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com" },
                { name: "Twitter", icon: TwitterIcon, href: "https://twitter.com" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-8 h-8 rounded-[4px] bg-[#ff5500] text-white border border-[#ff5500] hover:bg-white hover:text-[#ff5500] hover:border-[#ff5500] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs active:scale-95 group"
                  >
                    <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>

            <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />

            <button
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#252422] text-[#252422] hover:text-white border border-gray-200 hover:border-[#252422] rounded-[4px] text-[11px] font-mono uppercase tracking-wider font-bold transition-all duration-300 shadow-2xs cursor-pointer active:scale-95"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
