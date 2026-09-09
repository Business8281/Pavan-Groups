"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { scrollToHash } from "@/components/SmoothScroll";
import {
  Globe2,
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

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
];

const NAVIGATION_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Stone Ecosystem", href: "#products" },
      { label: "Explore Collections", href: "#browse" },
      { label: "Why Buy From Pavan", href: "#why-us" },
      { label: "Global Shipping Radar", href: "#shipping" },
      { label: "Beginner's Stone Guide", href: "#guide" },
      { label: "Scale & Trust Metrics", href: "#stats" },
      { label: "Featured Projects", href: "#projects" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Premium Granite", href: "/companies/pavan-granite" },
      { label: "Natural Slate", href: "/companies/pavan-impex" },
      { label: "Limestone & Pavers", href: "/companies/sai-balaji-impex" },
      { label: "Quartzite", href: "/companies/pavan-impex" },
      { label: "Architectural Stones", href: "#products" },
    ],
  },
  {
    title: "Map Location",
    links: [
      { label: "🇺🇸 United States (USNYC, USLAX)", href: "#shipping" },
      { label: "🇦🇺 Australia (Sydney, Melbourne)", href: "#shipping" },
      { label: "🇦🇪 UAE & Gulf (Jebel Ali, Khalifa)", href: "#shipping" },
      { label: "🇬🇧 United Kingdom (Felixstowe)", href: "#shipping" },
      { label: "🇪🇺 Europe (Rotterdam, Hamburg)", href: "#shipping" },
      { label: "Landed Freight Cost Radar", href: "#shipping" },
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

  // Slowly and smoothly slides out from under the bottom of the FAQ
  const rawY = useTransform(scrollYProgress, [0, 1], [-150, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.75], [0.15, 1]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);

  // Spring physics for slow, weighted, ultra-smooth movement
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
    <footer className="relative bg-[#ffffff] text-[#241919] border-t border-[#747474]/20 overflow-hidden z-20">
      
      {/* Background Architectural Monogram Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center overflow-hidden">
        <span
          className="font-display uppercase tracking-widest text-[#241919] whitespace-nowrap leading-none"
          style={{ fontSize: "clamp(120px, 22vw, 320px)" }}
        >
          PAVAN GROUPS
        </span>
      </div>

      {/* ── TOP BANNER: FLOATING ELEVATED LUXURY CARD REVEALING UNDER THE FAQ SLOWLY & SMOOTHLY ── */}
      <div
        ref={quoteBannerRef}
        className="relative z-10 w-full overflow-hidden bg-[#fafafa] py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 border-b border-[#747474]/20"
      >

        {/* Ambient Subtle Radial Light Layer */}
        <motion.div
          style={{ opacity: bannerOpacity, scale: bannerScale }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <div
            className="w-[750px] h-[380px] rounded-full blur-[120px] pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(200,90,50,0.18) 0%, rgba(200,90,50,0.04) 60%, transparent 80%)",
            }}
          />
        </motion.div>

        {/* Floating Elevated Luxury Architectural Card (Reveals Under FAQ slowly & smoothly) */}
        <motion.div
          style={{ y: bannerY, opacity: bannerOpacity, scale: bannerScale }}
          className="relative z-10 max-w-6xl mx-auto will-change-transform"
        >
          <div className="bg-white border border-[#747474]/25 p-8 sm:p-12 md:p-14 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
              
              {/* Left Column: Heading & Narrative */}
              <div className="max-w-2xl space-y-4">
                <h3
                  className="font-display font-light text-[#241919] leading-tight"
                  style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}
                >
                  Get Your Stone Quote{" "}
                  <span className="italic text-[#c85a32] font-normal">Within 24 Hours.</span>
                </h3>

                <p className="text-xs sm:text-[14.5px] text-[#241919]/80 font-normal leading-relaxed">
                  We understand the pace of modern architecture. Submit your requirements today and our export specialists will provide a comprehensive proposal including FOB/CIF freight indices, tolerance standards, and container loading schedules.
                </p>
              </div>

              {/* Right Column: Instant Specsheet Form Card */}
              <div className="lg:max-w-md w-full p-6 sm:p-7 bg-[#faf8f5] border border-[#747474]/20 rounded-xl space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#c85a32] font-bold block mb-1">
                  PRIORITY RESPONSE
                </span>
                <p className="text-[12px] text-[#241919]/90 mb-3 font-medium leading-relaxed">
                  Enter your professional email to initiate your direct 24-hour consultation.
                </p>

                {subscribed ? (
                  <div className="p-3.5 bg-white border border-[#c85a32] text-xs font-mono text-[#c85a32] font-semibold flex items-center gap-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#c85a32]" />
                    <span>Spec Catalog &amp; Export Index dispatched to your inbox!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      required
                      placeholder="architect@domain.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="flex-1 px-3.5 py-3 bg-white border border-[#747474]/25 text-xs font-mono text-[#241919] placeholder:text-[#747474]/70 font-medium focus:outline-none focus:border-[#c85a32] rounded-lg shadow-2xs"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 text-[10.5px] font-mono uppercase tracking-wider font-bold bg-[#c85a32] hover:bg-[#a84a27] text-white transition-all cursor-pointer border border-[#c85a32] hover:border-[#a84a27] rounded-lg flex-none shadow-sm hover:shadow-md active:scale-95"
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



      {/* Main Navigation & Telemetry Hub */}
      <div className="px-6 sm:px-10 lg:px-16 py-14 md:py-16 relative z-10 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Identity & Global Factory Telemetry (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <Link href="/" className="inline-block mb-2 group">
                <span className="font-display text-2xl tracking-[0.2em] uppercase text-[#241919] group-hover:text-[#0f172a] transition-colors font-medium">
                  PAVAN GROUPS
                </span>
                <span className="text-[9.5px] font-mono uppercase tracking-[0.35em] text-[#747474] block mt-0.5">
                  Natural Stone Extraction &amp; Global Exports · Est. 2000
                </span>
              </Link>

              <p className="text-xs sm:text-[13px] text-[#454545] font-light leading-relaxed max-w-sm">
                Quarry owners, precision processors, and international exporters headquartered in Markapur, Andhra Pradesh, India. Shipping direct container loads to UAE, Europe, United States, United Kingdom, and Australia.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 text-xs font-mono text-[#241919]">
              <div className="flex items-center gap-2">
                <span className="text-[#0f172a] font-bold">Direct Quarry Line:</span>
                <a href="tel:+919246462600" className="text-[#241919] hover:text-[#0f172a] hover:underline underline-offset-2">
                  +91 9246462600
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0f172a] font-bold">Export Desk:</span>
                <a href="mailto:export@pavangroups.com" className="text-[#241919] hover:text-[#0f172a] hover:underline underline-offset-2">
                  export@pavangroups.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#747474]">
                <span>Dispatch Ocean Port:</span>
                <span className="text-[#241919] font-medium">Chennai Port (INMAA) &amp; Krishnapatnam</span>
              </div>
            </div>
          </div>

          {/* Navigation Columns (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {NAVIGATION_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#0f172a] font-bold block pb-2 border-b border-[#747474]/20">
                  {col.title}
                </span>

                <ul className="space-y-2.5 p-0 m-0 list-none text-xs">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={handleNavClick(link.href, (link as any).isContact)}
                        className="text-[#454545] hover:text-[#0f172a] hover:translate-x-1 transition-all duration-200 cursor-pointer border-none bg-transparent p-0 text-left block text-xs"
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

      {/* Bottom Bar: Copyright, Compliance, and Smooth Back to Top */}
      <div className="border-t border-[#747474]/15 px-6 sm:px-10 lg:px-16 py-6 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-[#747474]">
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-[#241919] font-medium">© {new Date().getFullYear()} Pavan Groups. All Rights Reserved.</span>
            <span className="hidden sm:inline-block text-[#747474]/40">•</span>
            <Link href="/privacy-policy" className="hover:text-[#c85a32] transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline-block text-[#747474]/40">•</span>
            <Link href="/terms" className="hover:text-[#c85a32] transition-colors">Terms &amp; Conditions</Link>
          </div>

        </div>
      </div>

    </footer>
  );
}
