"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Lightbulb, Award, Heart, Globe, Users, Cpu, UserCheck, CheckCircle2, Phone, MessageSquare, Briefcase, User, Sparkles, ArrowUpRight, Layers, ChevronRight, Gem, ChevronLeft, Play, Pause } from "lucide-react";

// Smooth Animated Number Counter Component
function AnimatedCounter({
  target,
  duration = 2.0,
  decimals = 0,
  suffix = "",
}: {
  target: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const startValue = 0;
    let animationFrameId: number;

    const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = startValue + (target - startValue) * easedProgress;

      setCount(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const milestones = [
  {
    year: "2000",
    title: "The Rajasthan Genesis",
    location: "Dholpur Basin",
    stone: "Sedimentary Buff Sandstone",
    era: "Founding Era",
    highlight: "Acquired first 15-hectare quarry lease with zero-compromise geological surveying.",
    story: "Founded on the conviction that Indian stone, quarry-managed with geological respect and precision, rivals any material extracted in Carrara or Verona. Our early days focused on supplying historic restorations and private Indian estates.",
    metrics: "Initial yield: 800 m³ / yr",
  },
  {
    year: "2003",
    title: "Peninsular Granite Veins",
    location: "Karnataka & Andhra Pradesh",
    stone: "Precambrian Plutonic Granite",
    era: "Export Expansion",
    highlight: "Discovered the deep-crystal Absolute Black and golden Bronzite Black Galaxy formations.",
    story: "Secured high-yield granite deposits in the Deccan plateau. Installed heavy extraction cranes and established direct container shipping channels through Chennai and Nhava Sheva ports to European distributors.",
    metrics: "Export reach: 14 countries",
  },
  {
    year: "2012",
    title: "The 120,000 Sq Ft Processing Hub",
    location: "Industrial Stone Corridor",
    stone: "Automated Gang Saw Lines",
    era: "Technological Leap",
    highlight: "Commissioned computerized 5-axis CNC bridge saws and multi-head resin treatment lines.",
    story: "Transformed raw block fabrication into a high-precision science. Achieved ±0.5mm slab calibration tolerances and integrated ultrasonic flaw detectors to inspect interior crystalline continuity.",
    metrics: "Capacity: 15,000 m² slabs / mo",
  },
  {
    year: "2019",
    title: "Circular Water & Reforestation",
    location: "All Active Leases",
    stone: "Eco-Quarrying Protocol",
    era: "Sustainable Modernity",
    highlight: "Pioneered closed-loop water filtration, recycling 88% of process slurry into paving bricks.",
    story: "Committed to progressive land rehabilitation. Every extracted bench is backfilled with organic topsoil and indigenous flora, setting the benchmark for ethical stone stewardship in South Asia.",
    metrics: "Recycled water: 450,000 L / day",
  },
  {
    year: "Present",
    title: "Global Architectural Vanguard",
    location: "40+ Sovereign Markets",
    stone: "Bespoke Monumental Supply",
    era: "Global Leadership",
    highlight: "Direct material partner to premier international architects, hotel groups, and civic precincts.",
    story: "From Singapore's waterfront to civic assemblies in Australia and desert towers in the Gulf, Pavan Groups provides turnkey quarry-to-port logistics for the world's most demanding projects.",
    metrics: "2,400+ landmarks completed",
  },
];

const quarries = [
  {
    id: "rajasthan",
    name: "North Basin Quarry",
    region: "Rajasthan",
    geology: "Calcitic Limestone & Dholpur Sandstone",
    depth: "48 meters",
    density: "2,600 kg/m³",
    mineral: "Quartz 92% · Iron Oxides 4%",
    featuredStones: ["Dholpur Beige", "Kota Blue", "Jaisalmer Gold"],
    yieldColor: "#c85a32",
  },
  {
    id: "karnataka",
    name: "Deccan Igneous Pluton",
    region: "Karnataka",
    geology: "Deep-crust Plutonic Absolute Black Granite",
    depth: "72 meters",
    density: "2,980 kg/m³",
    mineral: "Feldspar 65% · Pyroxene 25%",
    featuredStones: ["Absolute Black", "Galaxy Bronzite", "Ruby Red"],
    yieldColor: "#d94e34",
  },
  {
    id: "himachal",
    name: "Himalayan Slate Escarpment",
    region: "Himachal Pradesh",
    geology: "Foliated Metamorphic Clay Slate",
    depth: "35 meters (Bench Cut)",
    density: "2,750 kg/m³",
    mineral: "Mica 45% · Quartz 35%",
    featuredStones: ["Autumn Rustic", "Black Raj", "Silver Grey"],
    yieldColor: "#b37d36",
  },
  {
    id: "andhra",
    name: "Riverine Quartzite Fields",
    region: "Andhra Pradesh",
    geology: "Tumbled Basalt & Hard Cobblestone",
    depth: "Surface Alluvial Deposits",
    density: "2,900 kg/m³",
    mineral: "Microcrystalline Silica 95%",
    featuredStones: ["Charcoal Cobbles", "Teak Sandstone", "Pebbles"],
    yieldColor: "#c25e00",
  },
];

interface StoneMonolithItem {
  num: string;
  roman: string;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  specimen: string;
  category: string;
  finish: string;
  density: string;
  geology: string;
  accentColor: string;
  accentBg: string;
  bgGradient: string;
  textColor: string;
  mutedColor: string;
  sheenColor: string;
  borderActive: string;
  glowColor: string;
}

const STONE_MONOLITHS: StoneMonolithItem[] = [
  {
    num: "01",
    roman: "I",
    icon: Lightbulb,
    title: "Innovation",
    subtitle: "is a State of Mind",
    description: "Pioneering diamond-wire cutting and computerized calibration to transform raw geological stone into flawless architectural elements.",
    specimen: "Luminescent Quartzite",
    category: "Natural Quartzite",
    finish: "Polished Crystalline Surface",
    density: "2,650 kg/m³",
    geology: "92% Crystalline Silica Matrix",
    accentColor: "#fb923c",
    accentBg: "rgba(251, 146, 60, 0.15)",
    bgGradient: "linear-gradient(160deg, #1c1917 0%, #0c0a09 50%, #151210 100%)",
    textColor: "#ffffff",
    mutedColor: "#a8a29e",
    sheenColor: "rgba(255, 255, 255, 0.45)",
    borderActive: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.2)",
  },
  {
    num: "02",
    roman: "II",
    icon: Award,
    title: "Quality",
    subtitle: "Begets Excellence",
    description: "Multi-stage dimensional verification and optical surface inspections enforcing zero-defect tolerances on every slab.",
    specimen: "Absolute Black Granite",
    category: "Plutonic Granite",
    finish: "Diamond Wire Mirror Polish",
    density: "2,980 kg/m³",
    geology: "Deep-Crust Igneous Pluton",
    accentColor: "#f59e0b",
    accentBg: "rgba(245, 158, 11, 0.15)",
    bgGradient: "linear-gradient(160deg, #18191d 0%, #0a0b0d 50%, #131418 100%)",
    textColor: "#ffffff",
    mutedColor: "#94a3b8",
    sheenColor: "rgba(255, 255, 255, 0.45)",
    borderActive: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.2)",
  },
  {
    num: "03",
    roman: "III",
    icon: Heart,
    title: "Integrity",
    subtitle: "Makes Us Who We Are",
    description: "Absolute transparency from quarry source to project handover, built upon four decades of uncompromised trust.",
    specimen: "Himalayan Foliated Slate",
    category: "Metamorphic Slate",
    finish: "Natural Cleft Split-Face",
    density: "2,750 kg/m³",
    geology: "Stratified Bedrock Escarpment",
    accentColor: "#d4a373",
    accentBg: "rgba(212, 163, 115, 0.15)",
    bgGradient: "linear-gradient(160deg, #1e242c 0%, #0f1217 50%, #191e25 100%)",
    textColor: "#f8fafc",
    mutedColor: "#cbd5e1",
    sheenColor: "rgba(255, 255, 255, 0.4)",
    borderActive: "#d4a373",
    glowColor: "rgba(212, 163, 115, 0.2)",
  },
  {
    num: "04",
    roman: "IV",
    icon: Globe,
    title: "A Global Outlook",
    subtitle: "Breaks All Boundaries",
    description: "Seamless multimodal ocean freight connecting Indian natural reserves directly to landmark projects across 40+ countries.",
    specimen: "Verde Imperial Granite",
    category: "Exotic Serpentinite",
    finish: "Water-Jet Calibrated Surface",
    density: "2,890 kg/m³",
    geology: "High-Pressure Metasediment",
    accentColor: "#34d399",
    accentBg: "rgba(52, 211, 153, 0.15)",
    bgGradient: "linear-gradient(160deg, #12251d 0%, #081611 50%, #0f2019 100%)",
    textColor: "#f0fdf4",
    mutedColor: "#a7f3d0",
    sheenColor: "rgba(52, 211, 153, 0.4)",
    borderActive: "#34d399",
    glowColor: "rgba(52, 211, 153, 0.2)",
  },
  {
    num: "05",
    roman: "V",
    icon: Users,
    title: "Teamwork",
    subtitle: "Can Build Empires",
    description: "Quarry masters, precision stonecutters, and structural engineers working together in synchronized harmony.",
    specimen: "Teakwood Sandstone",
    category: "Sedimentary Sandstone",
    finish: "Gang-Saw Cut & Fine Honed",
    density: "2,550 kg/m³",
    geology: "Layered Desert Quartz Matrix",
    accentColor: "#f97316",
    accentBg: "rgba(249, 115, 22, 0.15)",
    bgGradient: "linear-gradient(160deg, #241c16 0%, #130d09 50%, #1c1510 100%)",
    textColor: "#fdf8f6",
    mutedColor: "#d6c7b9",
    sheenColor: "rgba(255, 255, 255, 0.4)",
    borderActive: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.18)",
  },
  {
    num: "06",
    roman: "VI",
    icon: Cpu,
    title: "Systematic",
    subtitle: "Thinking & Precision",
    description: "Audited operating protocols governing extraction, calibration, moisture curing, and sea-worthy crating.",
    specimen: "Kota Blue Limestone",
    category: "Dense Calcarenite",
    finish: "CNC Calibrated Zero-Tolerance",
    density: "2,680 kg/m³",
    geology: "Dense Microcrystalline Matrix",
    accentColor: "#38bdf8",
    accentBg: "rgba(56, 189, 248, 0.15)",
    bgGradient: "linear-gradient(160deg, #14202e 0%, #091018 50%, #101a26 100%)",
    textColor: "#ffffff",
    mutedColor: "#94a3b8",
    sheenColor: "rgba(56, 189, 248, 0.35)",
    borderActive: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.2)",
  },
  {
    num: "07",
    roman: "VII",
    icon: UserCheck,
    title: "Service",
    subtitle: "Mindset Always",
    description: "Dedicated project stewardship from initial specimen curation to port delivery and on-site architectural execution.",
    specimen: "Sunset Porphyry",
    category: "Pavan Signature Igneous",
    finish: "Thermal Flamed & Antiqued",
    density: "2,820 kg/m³",
    geology: "Porphyritic Quartz Feldspar",
    accentColor: "#fda4af",
    accentBg: "rgba(253, 164, 175, 0.18)",
    bgGradient: "linear-gradient(160deg, #2d1419 0%, #16070a 50%, #230f13 100%)",
    textColor: "#ffffff",
    mutedColor: "#fbcfe8",
    sheenColor: "rgba(255, 255, 255, 0.45)",
    borderActive: "#fda4af",
    glowColor: "rgba(253, 164, 175, 0.2)",
  },
];

// Alias for backward compatibility
const CORE_VALUES = STONE_MONOLITHS;

interface LeadershipMember {
  name: string;
  role: string;
  bio: string;
  contact: string;
  phoneRaw: string;
  whatsapp: string;
  initials: string;
  image: string;
}

const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    name: "Mr. Perla Chalama Rao",
    role: "Chairman",
    bio: "Leading the organization with extensive industry experience and a long-term vision for growth, quality, and customer trust.",
    contact: "+91 92464 62600",
    phoneRaw: "+919246462600",
    whatsapp: "https://wa.me/919246462600",
    initials: "PCR",
    image: "",
  },
  {
    name: "Mr. Perla V. S. Ratnam",
    role: "Managing Director (MD)",
    bio: "Responsible for strategic business development, operations, and the overall growth and direction of the organization.",
    contact: "+91 92464 62500",
    phoneRaw: "+919246462500",
    whatsapp: "https://wa.me/919246462500",
    initials: "PVR",
    image: "",
  },
  {
    name: "Mr. Perla Nageswara Rao",
    role: "Marketing Manager",
    bio: "Focused on customer relationships, marketing activities, business development, and expanding our market presence.",
    contact: "+91 90106 26349",
    phoneRaw: "+919010626349",
    whatsapp: "https://wa.me/919010626349",
    initials: "PNR",
    image: "",
  },
  {
    name: "Mr. Perla Sai Mahesh",
    role: "Marketing Manager | Business Development",
    bio: "Responsible for domestic and international customer enquiries, business development, client coordination, and expanding the company’s global natural stone network.",
    contact: "+91 90638 17054",
    phoneRaw: "+919063817054",
    whatsapp: "https://wa.me/919063817054",
    initials: "PSM",
    image: "",
  },
];

export default function AboutPage() {
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/#contact");
  };

  return (
    <div className="bg-white text-[#140d0a] overflow-hidden min-h-screen">
      {/* ── 16:9 ASPECT RATIO ARCHITECTURAL HERO PHOTO ── */}
      <section className="relative w-full aspect-video max-h-[70vh] overflow-hidden bg-[#140d0a]">
        {/* Full-Bleed Architectural Living Space Background Photo (16:9 Ratio) */}
        <img
          src="/about-hero.jpg"
          alt="Pavan Groups Luxury Architectural Stone Living Space"
          className="w-full h-full object-cover object-center"
        />
        {/* Extremely Subtle Overlay (letting the original image shine 80%+) */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </section>

      {/* ── ABOUT PAVAN GROUPS EDITORIAL CARD (POSITIONED AT CENTER BOTTOM OF HERO IMAGE) ── */}
      <div id="company" className="relative max-w-5xl mx-auto px-4 sm:px-6 -mt-24 sm:-mt-32 md:-mt-40 z-30 mb-12 sm:mb-16 scroll-mt-28">
        <div className="bg-white border border-[#747474]/20 p-8 sm:p-12 md:p-14 text-center shadow-2xl rounded-sm">
          
          {/* Main Grand Title with Sketch Mark directly under PAVAN GROUPS */}
          <h1
            className="font-display font-light text-[#241919] leading-[1.1] tracking-[-0.015em] mb-4"
            style={{ fontSize: "clamp(34px, 4.5vw, 64px)" }}
          >
            About{" "}
            <span className="relative inline-block font-normal">
              PAVAN GROUPS
              <svg
                viewBox="0 0 260 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 sm:-bottom-3 left-0 w-full text-[#c85a32]"
              >
                <path
                  d="M3 8C65 3.5 150 3.5 257 7.5"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Border Divider Line */}
          <div className="w-full h-[1px] bg-[#747474]/15 max-w-3xl mx-auto my-6 sm:my-8" />

          {/* Lead Narrative Sentence */}
          <p className="text-[14.5px] sm:text-[16px] md:text-[17px] leading-[1.8] text-[#333333] font-light max-w-4xl mx-auto text-center sm:text-justify">
            <strong className="font-semibold text-[#241919]">Paving the way to the future of natural stone, PAVAN GROUPS is a premier natural stone conglomerate in India.</strong> Established since 2000, the company has made its mark both locally and globally for its unique quarry-extracted natural stone products that amalgamate the finest raw material, gangsaw technology, industrial expertise, and master craftsmanship to create natural slates, limestones, and granites that are of the highest architectural quality and authenticity.
          </p>

        </div>
      </div>

      {/* ── WHAT WE GOT: CLEAN EDITORIAL COUNTER METRICS SECTION (COMPACT LOW HEIGHT LAYOUT) ── */}
      <section className="relative py-8 sm:py-12 md:py-14 px-6 md:px-14 lg:px-20 bg-white text-[#140d0a] overflow-hidden z-20">

        <div className="max-w-6xl mx-auto relative z-10 space-y-6 sm:space-y-8">
          
          {/* Main Headline (Compact Sans-Serif Clean Editorial Typography) */}
          <h2 className="font-sans font-medium text-[#140d0a] text-xl sm:text-2xl md:text-3xl lg:text-[34px] leading-[1.25] tracking-tight max-w-4xl mx-auto text-center">
            More Than Products — We Quarry, Translate Complex Requirements, And Help You Choose With Confidence.
          </h2>

          {/* 3 Count Up Metrics Grid (Compact Floating Numbers, Low Height) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-4xl mx-auto text-center">
            
            {/* Metric 1 */}
            <div className="space-y-1">
              <div className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a] tracking-tight flex items-baseline justify-center">
                <AnimatedCounter target={26} />
                <span className="text-2xl sm:text-3xl font-light text-[#0f172a] ml-0.5">+</span>
              </div>
              <p className="text-[11px] sm:text-xs font-sans text-[#555555] font-normal leading-relaxed max-w-[190px] mx-auto">
                Years of Combined Expertise in Quarrying &amp; Stone Processing
              </p>
            </div>

            {/* Metric 2 */}
            <div className="space-y-1">
              <div className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a] tracking-tight flex items-baseline justify-center">
                <AnimatedCounter target={40} />
                <span className="text-2xl sm:text-3xl font-light text-[#0f172a] ml-0.5">+</span>
              </div>
              <p className="text-[11px] sm:text-xs font-sans text-[#555555] font-normal leading-relaxed max-w-[200px] mx-auto">
                Thousand Corporate &amp; Architectural Clients Worldwide
              </p>
            </div>

            {/* Metric 3 */}
            <div className="space-y-1">
              <div className="font-sans text-3xl sm:text-4xl md:text-5xl font-light text-[#140d0a] tracking-tight flex items-baseline justify-center">
                <AnimatedCounter target={500} />
                <span className="text-2xl sm:text-3xl font-light text-[#140d0a] ml-0.5">k+</span>
              </div>
              <p className="text-[11px] sm:text-xs font-sans text-[#555555] font-normal leading-relaxed max-w-[200px] mx-auto">
                Slab &amp; Dimensional Stone Portfolios Under Management
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── OUR MISSION & OUR VISION SECTION (EXACT REFERENCE IMAGE COMPOSITION) ── */}
      <section className="py-16 sm:py-24 px-6 md:px-14 lg:px-20 bg-white border-t border-[#747474]/15 relative z-20">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-28">

          {/* 1. OUR MISSION BLOCK (Images Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Overlapping Dual Image Composition */}
            <div className="lg:col-span-6 relative pr-4 sm:pr-8 pb-8 sm:pb-12">
              {/* Primary Main Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#747474]/20 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                  alt="Architectural Blueprint & Stone Engineering"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Inset Secondary Image - Smooth floating glide from top-left corner of big image to current position */}
              <motion.div
                initial={{ x: "-88%", y: "-110%", opacity: 0.85, scale: 0.96, rotate: -1.2 }}
                whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{
                  duration: 2.8,
                  delay: 0.15,
                  ease: [0.4, 0, 0.2, 1], // Gentle, cinematic ease-in-out for a true smooth floating feel
                }}
                className="absolute bottom-0 right-0 w-[55%] sm:w-[50%] aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-10 will-change-transform"
              >
                <img
                  src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80"
                  alt="Stonemasons & Quarry Engineers On Site"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Right: Narrative Content */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-[#241919] leading-tight">
                Our Mission
              </h2>

              <p className="text-xs sm:text-sm text-[#454545] font-light leading-relaxed">
                To provide exceptional natural stone products that exceed global architectural expectations through quarry-direct extraction, gangsaw precision, and an unyielding commitment to sustainability. We aim to build lasting partnerships and create spaces that inspire across 40+ countries. Through geological expertise, quality control, and a customer-centric export approach, we strive to exceed standards in every shipment.
              </p>

              {/* 4 Verified Bullet Points */}
              <div className="space-y-3 pt-2">
                {[
                  "Fostering Sustainable Quarrying and Green Development",
                  "Innovating Gangsaw Technology for a Sustainable Future",
                  "Customer-Centric Turnkey Export Solutions",
                  "Building Enduring Architectural Legacies Worldwide",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0f172a] flex-none mt-0.5" />
                    <span className="text-xs sm:text-sm font-sans font-medium text-[#241919]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 2. OUR VISION BLOCK (Text Left, Images Right - Zig-Zag Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Narrative Content */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-[#241919] leading-tight">
                Our Vision
              </h2>

              <p className="text-xs sm:text-sm text-[#454545] font-light leading-relaxed">
                Our vision is to redefine the future of natural stone quarrying and processing through innovation, sustainability, and international quality leadership. We aim to supply calibrated slates, limestones, and monolithic granites that not only inspire landmark structures but also contribute to eco-conscious building practices. By embracing 5-axis CNC technology and closed-loop water filtration, we lead the natural stone industry toward a greener, smarter future.
              </p>

              {/* 4 Verified Bullet Points */}
              <div className="space-y-3 pt-2">
                {[
                  "Inspiring Modern Global Architecture",
                  "Pioneering Closed-Loop Sustainable Extraction",
                  "Empowering Local Mining Communities Through Innovation",
                  "Leading the Future of Natural Stone Solutions",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0f172a] flex-none mt-0.5" />
                    <span className="text-xs sm:text-sm font-sans font-medium text-[#241919]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Overlapping Dual Image Composition */}
            <div className="lg:col-span-6 relative pl-4 sm:pl-8 pb-8 sm:pb-12 order-1 lg:order-2">
              {/* Primary Main Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#747474]/20 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Stone Architecture"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Inset Secondary Image - Smooth floating glide from top-right corner of big image to current position */}
              <motion.div
                initial={{ x: "88%", y: "-110%", opacity: 0.85, scale: 0.96, rotate: 1.2 }}
                whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{
                  duration: 2.8,
                  delay: 0.15,
                  ease: [0.4, 0, 0.2, 1], // Gentle, cinematic ease-in-out for a true smooth floating feel
                }}
                className="absolute bottom-0 left-0 w-[55%] sm:w-[50%] aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-10 will-change-transform"
              >
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
                  alt="Geological Surveyors & Stone Quality Audit"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

          </div>

        </div>
      </section>
      {/* ── THE PAVAN CREED · 07 PILLARS (MINIMALIST ARCHITECTURAL STRIP) ── */}
      <section
        id="values"
        className="py-8 sm:py-10 px-4 sm:px-6 md:px-14 lg:px-20 bg-white border-y border-[#747474]/15 relative z-20"
      >
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* Subtle Compact Eyebrow */}
          <div className="flex items-center justify-between gap-2 border-b border-[#747474]/15 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c85a32]" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.24em] text-[#c85a32] font-semibold">
                The Pavan Creed · 07 Pillars
              </span>
            </div>
            <span className="font-serif italic text-xs text-[#747474] hidden sm:inline-block">
              Founding principles carved in bedrock
            </span>
          </div>

          {/* Precision 7-Column Architectural Horizon */}
          <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[720px] lg:min-w-0 grid grid-cols-7 divide-x divide-[#747474]/15 bg-white border border-[#747474]/15 rounded-lg overflow-hidden">
              {STONE_MONOLITHS.map((pillar) => (
                <div
                  key={pillar.num}
                  className="p-3.5 sm:p-4 flex flex-col justify-between hover:bg-[#faf8f5] transition-colors duration-200 group"
                >
                  <span className="font-mono text-[11px] font-bold text-[#c85a32] tracking-wider">
                    {pillar.num}
                  </span>

                  <div className="mt-2.5">
                    <h3 className="font-display font-medium text-[15px] sm:text-[16px] text-[#241919] group-hover:text-[#c85a32] transition-colors leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="font-serif italic text-[11.5px] text-[#747474] mt-0.5 leading-snug">
                      &ldquo;{pillar.subtitle}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>



      {/* ── OUR LEADERSHIP TEAM / LEADERSHIP & MANAGEMENT SECTION ── */}
      <section
        id="team"
        className="py-20 sm:py-28 px-4 sm:px-6 md:px-14 lg:px-20 bg-white border-t border-b border-[#747474]/15 relative z-20 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#241919] leading-[1.1] tracking-tight">
              Leadership &amp; Management
            </h2>

            <p className="text-sm sm:text-[15.5px] text-[#555555] font-light leading-relaxed max-w-2xl mx-auto">
              Our leadership team brings together extensive experience in the natural stone industry, international business, sourcing, processing, and customer relationships. With a strong focus on quality and reliability, we are committed to delivering premium natural stone solutions to customers worldwide.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="h-px w-12 bg-[#747474]/20" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#c85a32]" />
              <div className="h-px w-12 bg-[#747474]/20" />
            </div>
          </div>

          {/* Leadership Cards Grid (Single Section: 4 Square Cards Row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 max-w-7xl mx-auto">
            {LEADERSHIP_TEAM.map((member) => (
              <div
                key={member.name}
                className="group relative bg-white border border-[#747474]/15 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-2xl hover:border-[#c85a32]/50 transition-all duration-400 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Subtle Hover Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#c85a32] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* 1:1 PERFECT SQUARE PHOTO / ALT IMAGE CONTAINER */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#faf8f5] border border-[#747474]/15 shadow-xs mb-4 flex flex-col items-center justify-center p-6 text-center group-hover:border-[#c85a32]/30 transition-all duration-300">
                    {member.image ? (
                      <>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                      </>
                    ) : (
                      <>
                        {/* Executive Monogram Circle with Initials */}
                        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border border-[#747474]/20 shadow-sm flex flex-col items-center justify-center group-hover:scale-105 group-hover:border-[#c85a32] transition-all duration-300">
                          <span className="font-display font-medium text-2xl sm:text-3xl text-[#241919] tracking-widest group-hover:text-[#c85a32] transition-colors">
                            {member.initials}
                          </span>
                          <span className="text-[8px] font-mono uppercase tracking-[0.28em] text-[#c85a32] font-bold -mt-0.5">
                            PAVAN
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Member Meta Info */}
                  <div className="space-y-2">
                    <div className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-[0.2em] text-[#c85a32] font-semibold">
                      {member.role}
                    </div>

                    <h3 className="font-display font-medium text-lg sm:text-[21px] text-[#241919] leading-snug group-hover:text-[#c85a32] transition-colors">
                      {member.name}
                    </h3>

                    <div className="w-8 h-0.5 bg-[#c85a32]/30 mt-1.5 mb-2.5 group-hover:w-14 group-hover:bg-[#c85a32] transition-all duration-300" />

                    {/* Narrative Bio */}
                    <p className="text-[12px] sm:text-[12.5px] text-[#555555] font-light leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Footer Direct Contact Actions */}
                <div className="mt-5 pt-3.5 border-t border-[#747474]/15 flex items-center justify-between gap-1.5 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#faf6f0] border border-[#c85a32]/20 flex items-center justify-center text-[#c85a32] flex-none">
                      <Phone className="w-2.5 h-2.5" />
                    </div>
                    <a
                      href={`tel:${member.phoneRaw}`}
                      className="font-mono text-[11px] font-bold text-[#241919] hover:text-[#c85a32] transition-colors truncate"
                    >
                      {member.contact}
                    </a>
                  </div>

                  <div className="flex items-center gap-1 ml-auto">
                    <a
                      href={`tel:${member.phoneRaw}`}
                      className="p-1.5 rounded-lg bg-white border border-[#747474]/25 hover:border-[#c85a32] hover:text-[#c85a32] text-[#241919] transition-all shadow-2xs hover:shadow-xs"
                      title={`Call ${member.name}`}
                      aria-label={`Call ${member.name}`}
                    >
                      <Phone className="w-3 h-3 text-[#c85a32]" />
                    </a>

                    <a
                      href={member.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-[9.5px] font-mono font-medium transition-colors shadow-2xs"
                      title={`WhatsApp message to ${member.name}`}
                    >
                      <MessageSquare className="w-2.5 h-2.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust & Inquiry Callout */}
          <div className="mt-12 bg-white border border-[#747474]/20 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <h4 className="font-display font-medium text-xl text-[#241919]">
                Have a Commercial Project or Custom Sourcing Inquiry?
              </h4>
              <p className="text-xs sm:text-sm text-[#555555] font-light">
                Our leadership team provides direct advisory for global architects, distributors, and bulk container procurement.
              </p>
            </div>
            <button
              onClick={handleContactClick}
              className="flex-none px-6 py-3 bg-[#140d0a] hover:bg-[#c85a32] text-white text-[10.5px] font-mono uppercase tracking-[0.2em] font-medium rounded-lg transition-colors cursor-pointer"
            >
              Connect With Leadership
            </button>
          </div>

        </div>
      </section>










    </div>
  );
}
