"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// 3 Master Supply Chain Milestones
const JOURNEY_PHASES = [
  {
    phaseId: "phase-01",
    stepNum: "01",
    days: "Days 1–20",
    title: "Quarry Extraction & Precision Calibration",
    location: "Markapur & Chimakurthy Quarry Units",
    description:
      "Selective extraction from captive quarry benches, multi-blade Italian gangsaw slicing, diamond vernier caliper calibration (±0.5mm), and 100% dry-lay surface inspection under 5000K daylight.",
    highlights: ["±0.5mm Diamond Calibration", "Italian Gangsaw Slicing", "100% Dry-Lay Staging"],
    photos: {
      leftBack: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      leftFront: "/images/calibrated_stone_tiles.jpg",
      rightSingle: "/images/premium_slate_texture.jpg",
      singleCaption: "Natural Mineral Texture Audit & Caliper Calibration",
    },
  },
  {
    phaseId: "phase-02",
    stepNum: "02",
    days: "Days 21–27",
    title: "Export Packing & Port Dispatch",
    location: "Chennai Ocean Terminal (INMAA)",
    description:
      "Stone crates strapped with high-tensile steel bands and fumigated with ISPM-15 heat treatment stamps. Containers packed with Level-3 air dunnage bags, timber chocks, and hauled via air-suspension trailers with GPS tracking.",
    highlights: ["ISPM-15 Certified Timber", "Level-3 Maritime Air Dunnage", "ISO 17712 Bolt Seal"],
    photos: {
      leftSingle: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
      singleCaption: "Chennai Port Gantry · Level-3 Maritime Loading",
      rightBack: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      rightFront: "/images/calibrated_stone_tiles.jpg",
    },
  },
  {
    phaseId: "phase-03",
    stepNum: "03",
    days: "Days 28–50",
    title: "Direct Ocean Transit & Jobsite Handover",
    location: "Direct Maritime Sea Lanes → Buyer Laydown",
    description:
      "Weekly direct express liner departures to major international ports (Rotterdam, Sydney, Houston, Dubai). Complete customs clearance, biosecurity AQIS/USDA entry, and hydraulic tailgate delivery directly to the project site.",
    highlights: ["Weekly Express Liners", "Biosecurity Quarantine Release", "Hydraulic Tailgate Offload"],
    photos: {
      leftSingle: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
      singleCaption: "Direct Maritime Sea Lanes Transit · Global Delivery",
      rightBack: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      rightFront: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&w=800&q=80",
    },
  },
];

export default function TheJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Framer Motion scroll animation for timeline spine (animates dynamically on scroll down and scroll up)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 75%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="journey"
      className="w-full bg-white text-[#003049] py-20 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-10 lg:px-14 border-t border-[#003049]/10 relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* ── HEADER WITH HORIZONTAL FLANKING RULES (MATCHING REFERENCE IMAGE) ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 sm:gap-8 max-w-5xl mx-auto"
        >
          <div className="flex-1 h-[2px] bg-[#ff5500]/40" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl text-[#003049] uppercase tracking-wide font-light text-center px-4 select-none">
            The Journey: <span className="italic font-normal">Factory to Buyer&apos;s Site</span>
          </h2>
          <div className="flex-1 h-[2px] bg-[#ff5500]/40" />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            CENTERED MASTER TIMELINE WITH FRAMER MOTION SCROLL SPINE
            (Dynamic scroll down/up expansion, crisp spine, zero background glow)
        ══════════════════════════════════════════════════════════════════════ */}
        <div ref={timelineRef} className="relative w-full">
          {/* ── Background Guide Track (Clean, subtle neutral track) ── */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-[1px] bg-[#003049]/15 pointer-events-none" />

          {/* ── Active Animated Orange Spine (Framer Motion scroll-linked progress on scroll down & up) ── */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-[1px] bg-[#ff5500] pointer-events-none"
          />

          <div className="space-y-28 sm:space-y-40">
            {/* ══════════════════════════════════════════════════════════════
                MILESTONE 1 (DAYS 1–20): EXTRACTION & CALIBRATION
            ══════════════════════════════════════════════════════════════ */}
            <MilestoneOne phase={JOURNEY_PHASES[0]} />

            {/* ══════════════════════════════════════════════════════════════
                MILESTONE 2 (DAYS 21–27): PACKING & PORT DISPATCH
            ══════════════════════════════════════════════════════════════ */}
            <MilestoneTwo phase={JOURNEY_PHASES[1]} />

            {/* ══════════════════════════════════════════════════════════════
                MILESTONE 3 (DAYS 28–50): OCEAN TRANSIT & JOBSITE HANDOVER
            ══════════════════════════════════════════════════════════════ */}
            <MilestoneThree phase={JOURNEY_PHASES[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * MILESTONE 1 COMPONENT
 * Full Framer Motion scroll entrance & continuous parallax on text, images, and cards.
 */
function MilestoneOne({ phase }: { phase: (typeof JOURNEY_PHASES)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 20, restDelta: 0.001 });

  // Continuous scroll parallax for images and cards
  const yBack = useTransform(smooth, [0, 1], [-50, 50]);
  const yFront = useTransform(smooth, [0, 1], [60, -60]);
  const rotateFront = useTransform(smooth, [0, 0.5, 1], [-3, 0, 3]);
  const scaleFront = useTransform(smooth, [0, 0.5, 1], [0.93, 1.04, 0.93]);
  const ySingle = useTransform(smooth, [0, 1], [-40, 40]);
  const yTelemetry = useTransform(smooth, [0, 1], [25, -25]);

  return (
    <div ref={cardRef} className="relative w-full">
      {/* ── STATIONARY DEAD-CENTER NODE DOT (Clean, architectural, zero background glow) ── */}
      <div className="absolute left-6 md:left-1/2 top-4 md:top-6 -translate-x-1/2 z-20 pointer-events-none">
        {/* Outer Orange Milestone Dot */}
        <motion.div
          initial={{ scale: 0.85 }}
          whileInView={{ scale: 1.2 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-6 h-6 rounded-full border-2 border-[#ff5500] bg-white flex items-center justify-center shadow-xs"
        >
          {/* Inner Core */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]" />
        </motion.div>
      </div>

      {/* ── DESKTOP 2-COLUMN BALANCED LAYOUT (MD & UP) ── */}
      <div className="hidden md:flex items-start justify-between relative w-full">
        {/* ── LEFT WING (Stops before dead-center spine: w-[calc(50%-40px)]) ── */}
        <div className="w-[calc(50%-40px)] flex flex-col items-end text-right space-y-6 pr-2">
          {/* Extra Text: Pipeline Curatorial Overview with Framer Motion Entrance */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-5 rounded-[4px] bg-[#f8fafc] border border-[#003049]/10 text-right space-y-2 max-w-lg shadow-2xs group"
          >
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#ff5500] font-bold block">
              DIRECT QUARRY-TO-SITE PIPELINE
            </span>
            <p className="text-xs sm:text-[13px] font-sans font-light text-[#003049] leading-relaxed">
              We have engineered an airtight, highly documented 30–50 day export pipeline from our captive quarry reserves in Markapur directly to international jobsite laydowns. Every consignment transitions through three verified checkpoints:{" "}
              <span className="font-semibold text-[#003049]">
                Quarry Calibration, Seaworthy Containerization, and Global Jobsite Handover
              </span>
              .
            </p>
          </motion.div>

          {/* Milestone Header (Aligned right towards spine with Framer Motion Entrance) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1.5 pt-2"
          >
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#ff5500] font-bold block">
              {phase.days}
            </span>
            <h3 className="font-display text-2xl lg:text-3xl font-medium text-[#003049] leading-tight">
              {phase.title}
            </h3>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-[#0077b6] text-xs font-sans font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                {phase.location}
              </span>
            </div>
          </motion.div>

          {/* Description Text Entrance */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm font-sans font-light text-[#003049]/80 leading-relaxed max-w-lg"
          >
            {phase.description}
          </motion.p>

          {/* Overlapping Photo Pair on the Left with Reveal & Continuous Parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[280px] lg:h-[330px] w-full max-w-[430px] ml-auto"
          >
            {/* Back Photo (Quarry extraction villa) with Scroll Parallax */}
            <motion.div
              style={{ y: yBack }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="w-[72%] h-[82%] rounded-[4px] overflow-hidden border border-[#003049]/15 shadow-md absolute left-0 top-0 z-0 group cursor-pointer"
            >
              <img
                src={phase.photos.leftBack}
                alt="Quarry extraction"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </motion.div>

            {/* Front Photo with Counter-Parallax, Tilt, and Hover Lift */}
            <motion.div
              style={{ y: yFront, rotate: rotateFront, scale: scaleFront }}
              whileHover={{ scale: 1.06, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="w-[62%] h-[75%] rounded-[4px] overflow-hidden border-2 border-white shadow-xl absolute right-0 bottom-0 z-10 group cursor-pointer"
            >
              <img
                src={phase.photos.leftFront}
                alt="Calibrated stone tiles"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Staggered Verification Badges with Framer Motion */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-end gap-2 pt-1"
          >
            {phase.highlights.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.06, borderColor: "#ff5500" }}
                className="px-2.5 py-1 text-xs font-sans text-[#003049] bg-white border border-[#ff5500]/30 rounded-[2px] shadow-2xs transition-colors"
              >
                ✓ {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT WING (Starts after dead-center spine: w-[calc(50%-40px)]) ── */}
        <div className="w-[calc(50%-40px)] flex flex-col items-start text-left space-y-6 pl-2">
          {/* Single Detailed Slate Audit Photo with Framer Motion Reveal & Parallax */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: ySingle }}
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-[430px] h-[300px] lg:h-[350px] rounded-[4px] overflow-hidden border border-[#003049]/15 shadow-md relative group mr-auto cursor-pointer"
          >
            <img
              src={phase.photos.rightSingle}
              alt="Raw slate texture"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003049]/85 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-sans font-medium">
                {phase.photos.singleCaption}
              </span>
            </div>
          </motion.div>

          {/* Extra Text: SLA & Quarry Telemetry Card in Remaining Space */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: yTelemetry }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="w-full max-w-[430px] p-5 rounded-[4px] bg-[#f8fafc] border border-[#003049]/10 space-y-3 shadow-xs mr-auto"
          >
            <div className="flex items-center justify-between text-xs font-sans pb-2 border-b border-[#003049]/10">
              <span className="text-[#003049]/70">Standard Transit SLA:</span>
              <span className="text-[#ff5500] font-bold text-sm">30–50 Days</span>
            </div>
            <div className="flex items-center justify-between text-xs font-sans pb-2 border-b border-[#003049]/10">
              <span className="text-[#003049]/70">Phytosanitary Protocol:</span>
              <span className="text-[#003049] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
                ISPM-15 Core 56°C
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-sans pb-2 border-b border-[#003049]/10">
              <span className="text-[#003049]/70">Quality Assurance:</span>
              <span className="text-[#003049] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
                ±0.5mm Diamond Sawn
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="text-[#003049]/70">Surface Staging:</span>
              <span className="text-[#003049] font-medium">100% 5000K Daylight Audit</span>
            </div>
          </motion.div>

          {/* Curatorial Note in Remaining Space with Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-[430px] mr-auto"
          >
            <span className="text-xs font-sans uppercase tracking-widest text-[#ff5500] font-semibold block">
              CAPTIVE QUARRY RESERVES
            </span>
            <p className="text-xs font-sans text-[#003049]/70 mt-1 leading-relaxed">
              Markapur & Chimakurthy captive benches ensure zero batch color mismatch across multi-container architectural projects.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE VIEW (< MD) ── */}
      <MobileMilestone phase={phase} isPhaseOne={true} />
    </div>
  );
}

/**
 * MILESTONE 2 COMPONENT
 * Full Framer Motion scroll entrance & continuous parallax on text, images, and cards.
 */
function MilestoneTwo({ phase }: { phase: (typeof JOURNEY_PHASES)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 20, restDelta: 0.001 });

  // Scroll parallax transforms
  const yBack = useTransform(smooth, [0, 1], [-50, 50]);
  const yFront = useTransform(smooth, [0, 1], [60, -60]);
  const rotateFront = useTransform(smooth, [0, 0.5, 1], [-3, 0, 3]);
  const scaleFront = useTransform(smooth, [0, 0.5, 1], [0.93, 1.04, 0.93]);
  const ySingle = useTransform(smooth, [0, 1], [-40, 40]);
  const yLogistics = useTransform(smooth, [0, 1], [25, -25]);

  return (
    <div ref={cardRef} className="relative w-full">
      {/* ── STATIONARY DEAD-CENTER NODE DOT (Clean, architectural, zero background glow) ── */}
      <div className="absolute left-6 md:left-1/2 top-4 md:top-6 -translate-x-1/2 z-20 pointer-events-none">
        {/* Outer Orange Milestone Dot */}
        <motion.div
          initial={{ scale: 0.85 }}
          whileInView={{ scale: 1.2 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-6 h-6 rounded-full border-2 border-[#ff5500] bg-white flex items-center justify-center shadow-xs"
        >
          {/* Inner Core */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]" />
        </motion.div>
      </div>

      {/* ── DESKTOP 2-COLUMN BALANCED LAYOUT (MD & UP) ── */}
      <div className="hidden md:flex items-start justify-between relative w-full">
        {/* ── LEFT WING (Port Gantry + Dunnage Specs in Remaining Space) ── */}
        <div className="w-[calc(50%-40px)] flex flex-col items-end text-right space-y-6 pr-2">
          {/* Single Port Dispatch Photo with Framer Motion Reveal & Parallax */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: ySingle }}
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-[430px] h-[300px] lg:h-[350px] rounded-[4px] overflow-hidden border border-[#003049]/15 shadow-md relative group ml-auto cursor-pointer"
          >
            <img
              src={phase.photos.leftSingle}
              alt="Terminal dispatch"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003049]/85 via-transparent to-transparent flex items-end p-4 justify-end">
              <span className="text-white text-xs font-sans font-medium text-right">
                {phase.photos.singleCaption}
              </span>
            </div>
          </motion.div>

          {/* Extra Text: Maritime Packaging Specifications Card in Remaining Space */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: yLogistics }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="w-full max-w-[430px] p-5 rounded-[4px] bg-[#f8fafc] border border-[#003049]/10 space-y-3 shadow-xs ml-auto text-right"
          >
            <div className="flex items-center justify-between text-xs font-sans pb-2 border-b border-[#003049]/10">
              <span className="text-[#003049]/70">Port Terminal:</span>
              <span className="text-[#003049] font-bold">Chennai INMAA (Direct Rail)</span>
            </div>
            <div className="flex items-center justify-between text-xs font-sans pb-2 border-b border-[#003049]/10">
              <span className="text-[#003049]/70">Container Dunnage:</span>
              <span className="text-[#ff5500] font-semibold">Level-3 Air Dunnage Bags</span>
            </div>
            <div className="flex items-center justify-between text-xs font-sans pb-2 border-b border-[#003049]/10">
              <span className="text-[#003049]/70">Security Seal:</span>
              <span className="text-[#003049] font-medium">ISO 17712 Bolt Certified</span>
            </div>
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="text-[#003049]/70">Road Transit:</span>
              <span className="text-[#003049] font-medium">Air-Suspension Trailer Fleet</span>
            </div>
          </motion.div>

          {/* Curatorial Logistics Note with Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-[430px] ml-auto"
          >
            <span className="text-xs font-sans uppercase tracking-widest text-[#ff5500] font-semibold block">
              ZERO-SHIFT CONTAINERIZATION
            </span>
            <p className="text-xs font-sans text-[#003049]/70 mt-1 leading-relaxed">
              Every crate is lashed with 32mm high-tensile steel strapping and timber floor chocks to withstand extreme sea pitching.
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT WING (Header + Narrative + Overlapping Crates Photos) ── */}
        <div className="w-[calc(50%-40px)] flex flex-col items-start text-left space-y-6 pl-2">
          {/* Milestone Header (Aligned left from spine with Framer Motion Entrance) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1.5"
          >
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#ff5500] font-bold block">
              {phase.days}
            </span>
            <h3 className="font-display text-2xl lg:text-3xl font-medium text-[#003049] leading-tight">
              {phase.title}
            </h3>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-[#0077b6] text-xs font-sans font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                {phase.location}
              </span>
            </div>
          </motion.div>

          {/* Description Entrance */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm font-sans font-light text-[#003049]/80 leading-relaxed max-w-lg"
          >
            {phase.description}
          </motion.p>

          {/* Overlapping Photo Pair on the Right with Reveal & Parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[280px] lg:h-[330px] w-full max-w-[430px] mr-auto"
          >
            {/* Back Photo (Hardwood Timber Crates) with Scroll Parallax */}
            <motion.div
              style={{ y: yBack }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="w-[72%] h-[82%] rounded-[4px] overflow-hidden border border-[#003049]/15 shadow-md absolute right-0 top-0 z-0 group cursor-pointer"
            >
              <img
                src={phase.photos.rightBack}
                alt="Hardwood timber crates"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </motion.div>

            {/* Front Photo with Counter-Parallax, Tilt, and Hover Lift */}
            <motion.div
              style={{ y: yFront, rotate: rotateFront, scale: scaleFront }}
              whileHover={{ scale: 1.06, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="w-[62%] h-[75%] rounded-[4px] overflow-hidden border-2 border-white shadow-xl absolute left-0 bottom-0 z-10 group cursor-pointer"
            >
              <img
                src={phase.photos.rightFront}
                alt="Finished crate inspection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Staggered Verification Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap justify-start gap-2 pt-1"
          >
            {phase.highlights.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.06, borderColor: "#ff5500" }}
                className="px-2.5 py-1 text-xs font-sans text-[#003049] bg-white border border-[#ff5500]/30 rounded-[2px] shadow-2xs transition-colors"
              >
                ✓ {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE VIEW (< MD) ── */}
      <MobileMilestone phase={phase} isPhaseOne={false} />
    </div>
  );
}

/**
 * MILESTONE 3 COMPONENT
 * Full Framer Motion scroll entrance & continuous parallax on text, images, and cards.
 */
function MilestoneThree({ phase }: { phase: (typeof JOURNEY_PHASES)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 20, restDelta: 0.001 });

  // Scroll parallax transforms
  const yBack = useTransform(smooth, [0, 1], [-50, 50]);
  const yFront = useTransform(smooth, [0, 1], [60, -60]);
  const rotateFront = useTransform(smooth, [0, 0.5, 1], [-3, 0, 3]);
  const scaleFront = useTransform(smooth, [0, 0.5, 1], [0.93, 1.04, 0.93]);
  const ySingle = useTransform(smooth, [0, 1], [-40, 40]);
  const yAssurance = useTransform(smooth, [0, 1], [25, -25]);

  return (
    <div ref={cardRef} className="relative w-full">
      {/* ── STATIONARY DEAD-CENTER NODE DOT (Clean, architectural, zero background glow) ── */}
      <div className="absolute left-6 md:left-1/2 top-4 md:top-6 -translate-x-1/2 z-20 pointer-events-none">
        {/* Outer Orange Milestone Dot */}
        <motion.div
          initial={{ scale: 0.85 }}
          whileInView={{ scale: 1.2 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-6 h-6 rounded-full border-2 border-[#ff5500] bg-white flex items-center justify-center shadow-xs"
        >
          {/* Inner Core */}
          <div className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]" />
        </motion.div>
      </div>

      {/* ── DESKTOP 2-COLUMN BALANCED LAYOUT (MD & UP) ── */}
      <div className="hidden md:flex items-start justify-between relative w-full">
        {/* ── LEFT WING (Header + Ocean Liner Photo + Installation Guarantee in Remaining Space) ── */}
        <div className="w-[calc(50%-40px)] flex flex-col items-end text-right space-y-6 pr-2">
          {/* Milestone Header (Aligned right towards spine with Framer Motion Entrance) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1.5"
          >
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#ff5500] font-bold block">
              {phase.days}
            </span>
            <h3 className="font-display text-2xl lg:text-3xl font-medium text-[#003049] leading-tight">
              {phase.title}
            </h3>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-[#0077b6] text-xs font-sans font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                {phase.location}
              </span>
            </div>
          </motion.div>

          {/* Description Entrance */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm font-sans font-light text-[#003049]/80 leading-relaxed max-w-lg"
          >
            {phase.description}
          </motion.p>

          {/* Single Ocean Liner Vessel Photo with Framer Motion Reveal & Parallax */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: ySingle }}
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-[430px] h-[260px] lg:h-[300px] rounded-[4px] overflow-hidden border border-[#003049]/15 shadow-md relative group ml-auto cursor-pointer"
          >
            <img
              src={phase.photos.leftSingle}
              alt="Maritime container liner"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003049]/80 via-transparent to-transparent flex items-end p-4 justify-end">
              <span className="text-white text-xs font-sans font-medium text-right">
                {phase.photos.singleCaption}
              </span>
            </div>
          </motion.div>

          {/* Verification Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-end gap-2 pt-1"
          >
            {phase.highlights.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.06, borderColor: "#ff5500" }}
                className="px-2.5 py-1 text-xs font-sans text-[#003049] bg-white border border-[#ff5500]/30 rounded-[2px] shadow-2xs transition-colors"
              >
                ✓ {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Extra Text: Contractor Installation Guarantee Card in Remaining Space */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: yAssurance }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="w-full max-w-[430px] p-5 rounded-[4px] bg-[#f8fafc] border border-[#003049]/10 space-y-2.5 shadow-xs ml-auto text-right"
          >
            <div className="flex items-center justify-end gap-2 text-xs font-sans font-bold text-[#ff5500] uppercase tracking-wider">
              <span>ZERO-RISK INSTALLATION ASSURANCE</span>
              <ShieldCheck className="w-4 h-4 text-[#ff5500]" />
            </div>
            <p className="text-xs sm:text-[13px] font-sans font-light text-[#003049] leading-relaxed">
              No need to worry about calibration variations, rough sea transit stresses, or port customs bottlenecks — every container is laser-squared, dunnage-cushioned, and photo-inspected before departure, so architects and contractors can simply{" "}
              <span className="font-semibold text-[#003049]">
                install with complete confidence
              </span>
              .
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT WING (Overlapping Delivered Photos + Dossier CTA in Remaining Space) ── */}
        <div className="w-[calc(50%-40px)] flex flex-col items-start text-left space-y-6 pl-2">
          {/* Overlapping Photo Pair on the Right with Reveal & Parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[280px] lg:h-[330px] w-full max-w-[430px] mr-auto"
          >
            {/* Back Photo (Exterior Pavers) with Scroll Parallax */}
            <motion.div
              style={{ y: yBack }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="w-[72%] h-[82%] rounded-[4px] overflow-hidden border border-[#003049]/15 shadow-md absolute right-0 top-0 z-0 group cursor-pointer"
            >
              <img
                src={phase.photos.rightBack}
                alt="Luxury architectural pavers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </motion.div>

            {/* Front Photo with Counter-Parallax, Tilt, and Hover Lift */}
            <motion.div
              style={{ y: yFront, rotate: rotateFront, scale: scaleFront }}
              whileHover={{ scale: 1.06, rotate: 0 }}
              transition={{ duration: 0.4 }}
              className="w-[62%] h-[75%] rounded-[4px] overflow-hidden border-2 border-white shadow-xl absolute left-0 bottom-0 z-10 group cursor-pointer"
            >
              <img
                src={phase.photos.rightFront}
                alt="Delivered architectural facade"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Micro label with Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-[430px] mr-auto"
          >
            <span className="text-xs font-sans uppercase tracking-widest text-[#ff5500] font-semibold block">
              ARCHITECTURAL JOBSITE LAYDOWN
            </span>
            <p className="text-xs font-sans text-[#003049]/70 mt-1 leading-relaxed">
              Delivered on schedule with complete AQIS/USDA biosecurity clearance and hydraulic tailgate offloading directly at the project laydown.
            </p>
          </motion.div>

          {/* Extra Text: Project Export Dossier & CTA Card in Remaining Space */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="w-full max-w-[430px] p-5 rounded-[4px] bg-[#f8fafc] border border-[#003049]/10 space-y-3.5 shadow-xs mr-auto"
          >
            <div className="flex items-center justify-between text-xs font-sans pb-2 border-b border-[#003049]/10">
              <span className="text-[#003049]/70">Biosecurity Entry:</span>
              <span className="text-[#003049] font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
                DAFF / USDA Verified
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-sans pb-2 border-b border-[#003049]/10">
              <span className="text-[#003049]/70">On-Time Global SLA:</span>
              <span className="text-[#ff5500] font-bold">99.4% Delivery Precision</span>
            </div>

            <div className="pt-1">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[2px] bg-[#ff5500] text-white text-xs font-sans uppercase tracking-[0.14em] font-bold hover:bg-[#e04a00] transition-colors shadow-xs group"
              >
                <span>Request Export Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE VIEW (< MD) ── */}
      <MobileMilestone phase={phase} isPhaseOne={false} />
    </div>
  );
}

/**
 * REUSABLE MOBILE MILESTONE VIEW (< MD) WITH FULL FRAMER MOTION
 */
function MobileMilestone({
  phase,
  isPhaseOne,
}: {
  phase: (typeof JOURNEY_PHASES)[0];
  isPhaseOne: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="md:hidden pl-14 space-y-6"
    >
      {/* Header Block */}
      <div className="space-y-1.5">
        <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#ff5500] font-bold block">
          {phase.days}
        </span>
        <h3 className="font-display text-xl sm:text-2xl font-medium text-[#003049] leading-tight">
          {phase.title}
        </h3>
        <div className="pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-[#0077b6] text-xs font-sans font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
            {phase.location}
          </span>
        </div>
      </div>

      <p className="text-sm font-sans font-light text-[#003049]/80 leading-relaxed">
        {phase.description}
      </p>

      {/* Mobile Overlapping Photo Pair */}
      <div className="relative h-[230px] sm:h-[260px] w-full max-w-[340px]">
        <div className="w-[72%] h-[82%] rounded-[4px] overflow-hidden border border-[#003049]/15 shadow-md absolute left-0 top-0 z-0">
          <img
            src={phase.photos.leftBack || phase.photos.rightBack}
            alt={phase.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="w-[62%] h-[75%] rounded-[4px] overflow-hidden border-2 border-white shadow-xl absolute right-0 bottom-0 z-10">
          <img
            src={phase.photos.leftFront || phase.photos.rightFront}
            alt={phase.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Verification Badges */}
      <div className="flex flex-wrap gap-1.5">
        {phase.highlights.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-sans text-[#003049] bg-white border border-[#ff5500]/30 rounded-[2px]"
          >
            ✓ {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
