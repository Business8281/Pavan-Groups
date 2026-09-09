"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Pickaxe,
  Factory,
  Globe2,
  Package,
  ShieldCheck,
  Camera,
  Anchor,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

interface FAQItem {
  id: string;
  num: string;
  icon: React.ElementType;
  question: string;
  topic: string;
  answer: string;
  highlights: string[];
}

const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-direct-sourcing",
    num: "01",
    icon: Pickaxe,
    topic: "Direct Sourcing from India",
    question: "How do you ensure direct sourcing and competitive pricing from India?",
    answer:
      "We own and operate primary quarry concessions across Markapur (Slate), Cuddapah (Limestone), and Chimakurthy (Black Galaxy Granite). By cutting out brokers, trading middlemen, and secondary markups, we guarantee 100% authentic mineral provenance and factory-direct commercial pricing.",
    highlights: [
      "100% Owned Mining Concessions",
      "Direct Quarry-to-Container Lineage",
      "Zero Middleman Markups",
    ],
  },
  {
    id: "faq-processing-capability",
    num: "02",
    icon: Factory,
    topic: "Supply and Processing Capability",
    question: "What are your supply, processing, and calibration capabilities?",
    answer:
      "Our infrastructure spans 9 state-of-the-art manufacturing plants equipped with Italian multi-blade diamond gang saws, automatic line polishers, and CNC edge profile calibrators. We deliver over 87.80 MSM in annual processing volume, capable of handling large-scale commercial projects with tight calibration tolerances (±0.5mm).",
    highlights: [
      "9 Processing Facilities",
      "87.80 MSM Annual Capacity",
      "Precision Italian CNC Machinery",
    ],
  },
  {
    id: "faq-worldwide-export",
    num: "03",
    icon: Globe2,
    topic: "Worldwide Export Support",
    question: "Which international markets and sea ports do you export to?",
    answer:
      "Over the past 26+ years, Pavan Groups has dispatched containerized shipments to 40+ major destination sea ports across the United States, United Kingdom, Europe, Australia, New Zealand, and the Middle East. Our dedicated logistics desk manages vessel bookings, bonded storage, and container stuffing.",
    highlights: [
      "40+ Global Sea Ports",
      "26+ Years Export Experience",
      "Dedicated Container Logistics",
    ],
  },
  {
    id: "faq-export-packaging",
    num: "04",
    icon: Package,
    topic: "Export-Standard Packaging",
    question: "What export packaging standards do you follow to prevent transit damage?",
    answer:
      "Every shipment is packed in ISPM-15 certified heat-treated, fumigated seaworthy wooden crates. Crates are lined with waterproof plastic barrier film, cushioned with high-density foam corner protectors, and reinforced with high-tensile galvanized steel strappings for zero transit damage over long ocean voyages.",
    highlights: [
      "ISPM-15 Heat-Treated Crates",
      "Shock-Proof Corner Protectors",
      "High-Tensile Steel Strapping",
    ],
  },
  {
    id: "faq-quality-inspection",
    num: "05",
    icon: ShieldCheck,
    topic: "Pre-Shipment Quality Inspection",
    question: "How are stones inspected before container stuffing?",
    answer:
      "Before crating, our quality assurance engineers perform a 100% piece-by-piece dry-lay inspection. We rigorously audit color uniformity, surface finish texture, diagonal squareness, water absorption rates, and strict thickness calibration adhering to ASTM C615 and EN 1341 international standards.",
    highlights: [
      "100% Dry-Lay Visual Audit",
      "ASTM C615 & EN 1341 Certified",
      "±0.5mm Thickness Tolerances",
    ],
  },
  {
    id: "faq-photos-videos",
    num: "06",
    icon: Camera,
    topic: "Photos and Videos of Actual Lots",
    question: "Will I receive photos and videos of my actual stone batch before shipment?",
    answer:
      "Yes, absolutely. We provide complete digital transparency before you approve final container sealing. You receive 4K ultra-high-definition photos, 360° dry-lay video walkthroughs, crate packaging photos, and live container seal confirmation with unique serial numbers.",
    highlights: [
      "4K UHD Batch Photographs",
      "360° Video Dry-Lay Inspection",
      "Live Container Sealing Proof",
    ],
  },
  {
    id: "faq-shipment-options",
    num: "07",
    icon: Anchor,
    topic: "FOB / CIF Shipment Options",
    question: "What commercial shipping terms do you support (FOB vs. CIF)?",
    answer:
      "We offer flexible Incoterms tailored to your company's requirements. You can contract on FOB terms (Free On Board at Indian ports: Chennai, Krishnapatnam, or Vizag) or CIF terms (Cost, Insurance, and Freight delivered with comprehensive marine transit insurance directly to your local destination port).",
    highlights: [
      "FOB Indian Ports (Chennai / Vizag)",
      "CIF Direct to Destination Port",
      "Comprehensive Marine Insurance",
    ],
  },
  {
    id: "faq-export-docs",
    num: "08",
    icon: FileCheck2,
    topic: "Export Documentation Support",
    question: "Do you handle complete customs and international trade documentation?",
    answer:
      "Our in-house international documentation desk prepares and fast-tracks all required customs paperwork: Master Bill of Lading (B/L), Certificate of Origin (COO), Fumigation / Phytosanitary Certificates, ASTM Laboratory Physical Test Reports, Commercial Invoices, and itemized Packing Lists.",
    highlights: [
      "Certificate of Origin & B/L",
      "Official Fumigation Certificates",
      "ASTM Laboratory Test Reports",
    ],
  },
];

export default function WhyChooseUs() {
  // Allow multiple or single open FAQ accordion item (default opening item 0)
  const [openIds, setOpenIds] = useState<string[]>(["faq-direct-sourcing"]);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="why-choose-us"
      className="relative z-30 py-12 md:py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-white text-[#241919] border-t border-[#747474]/15 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.18)]"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── SECTION HEADER & TWO-COLUMN ARCHITECTURE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── LEFT COLUMN: STICKY BRAND OVERVIEW & TRUST CARD ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#514a38] text-white shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] animate-pulse" />
              <span className="text-[9.5px] font-mono tracking-[0.24em] uppercase font-bold">
                FAQS & TRUST ASSURANCE
              </span>
            </div>

            <h2
              className="font-display font-light leading-[1.02] tracking-[-0.015em]"
              style={{ fontSize: "clamp(34px, 4.2vw, 54px)" }}
            >
              <span className="text-[#241919]">Why Buy From</span>{" "}
              <span className="text-[#0f172a] italic font-normal">Pavan Groups?</span>
            </h2>

            <p className="text-[14px] sm:text-[15px] text-[#454545] font-light leading-relaxed">
              Frequently asked questions regarding our direct quarry concessions, global container export protocols, pre-shipment quality testing, and international logistics support.
            </p>

            {/* Trust Badges Card */}
            <div className="bg-white border border-[#747474]/15 p-6 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] space-y-3 group">
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-[#c85a32] block">
                EXPORT COMMITMENTS
              </span>

              <div className="space-y-3.5 text-[12.5px] font-sans text-[#555555]">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#f8fafc] flex items-center justify-center flex-none border border-[#0f172a]/10">
                    <CheckCircle2 className="w-3 h-3 text-[#c85a32]" />
                  </div>
                  <span>Direct Quarry Extraction & Processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#f8fafc] flex items-center justify-center flex-none border border-[#0f172a]/10">
                    <CheckCircle2 className="w-3 h-3 text-[#c85a32]" />
                  </div>
                  <span>100% Pre-Shipment Dry-Lay Inspection</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#f8fafc] flex items-center justify-center flex-none border border-[#0f172a]/10">
                    <CheckCircle2 className="w-3 h-3 text-[#c85a32]" />
                  </div>
                  <span>4K Lot Photos & Container Sealing Proof</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#f8fafc] flex items-center justify-center flex-none border border-[#0f172a]/10">
                    <CheckCircle2 className="w-3 h-3 text-[#c85a32]" />
                  </div>
                  <span>Zero Transit Breakage Guarantee</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#747474]/15">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#241919] hover:bg-[#c85a32] text-white rounded-lg text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md hover:shadow-[#c85a32]/25 cursor-pointer"
                >
                  <span>Contact Export Desk</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: 8 INTERACTIVE ACCORDION FAQS ── */}
          <div className="lg:col-span-8 space-y-3.5">
            {FAQS_DATA.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              const Icon = faq.icon;

              return (
                <div
                  key={faq.id}
                  className={`border transition-all duration-300 rounded-xl overflow-hidden bg-white ${isOpen
                      ? "border-[#c85a32]/40 shadow-[0_8px_30px_-12px_rgba(255,68,58,0.15)]"
                      : "border-[#747474]/15 hover:border-[#747474]/30 shadow-sm"
                    }`}
                >
                  {/* Accordion Trigger Button */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none transition-colors hover:bg-[#fcfaf7]"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1">

                      {/* Number Tag */}
                      <span className={`text-[11px] font-mono font-bold flex-none transition-colors ${isOpen ? "text-[#c85a32]" : "text-[#747474]/50"
                        }`}>
                        {faq.num}
                      </span>

                      {/* Icon Circle */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-none transition-all duration-300 ${isOpen
                          ? "bg-[#c85a32] text-white shadow-md shadow-[#c85a32]/20"
                          : "bg-[#f8fafc] text-[#747474] border border-[#0f172a]/10"
                        }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Question Heading & Topic */}
                      <div>
                        <span className={`text-[9.5px] font-mono uppercase tracking-[0.2em] font-bold block mb-1 transition-colors ${isOpen ? "text-[#c85a32]" : "text-[#747474]"}`}>
                          {faq.topic}
                        </span>
                        <h3 className="font-sans font-bold text-[14.5px] sm:text-[16px] text-[#241919] leading-snug">
                          {faq.question}
                        </h3>
                      </div>

                    </div>

                    {/* Expand/Collapse Chevron Indicator */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-none transition-transform duration-300 ${isOpen ? "bg-[#c85a32]/10 text-[#c85a32] rotate-180" : "text-[#747474]"
                      }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Content Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-[#747474]/10 bg-white"
                      >
                        <div className="p-5 sm:p-6 sm:pl-16 space-y-4">

                          {/* Answer Narrative */}
                          <p className="text-[13.5px] sm:text-[14.5px] leading-[1.7] text-[#454545] font-light">
                            {faq.answer}
                          </p>

                          {/* Highlight Badges */}
                          <div className="pt-2 flex flex-wrap gap-2">
                            {faq.highlights.map((badge) => (
                              <span
                                key={badge}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#747474]/20 rounded text-[11px] font-mono text-[#241919]"
                              >
                                <span className="w-1 h-1 rounded-full bg-[#0f172a]" />
                                <span>{badge}</span>
                              </span>
                            ))}
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
