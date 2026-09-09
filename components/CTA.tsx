"use client";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="contact"
      className="py-24 md:py-36 px-6 md:px-14 lg:px-20 relative overflow-hidden bg-[#140e0e] text-[#f1f5f9]"
    >
      {/* Ambient Warm Rust Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 80% 50%, rgba(139,69,19,0.25) 0%, rgba(216,195,165,0.05) 45%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-4xl mx-auto will-change-transform space-y-6"
      >
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#94a3b8] font-semibold block">
          COMMENCE YOUR SPECIFICATION
        </span>

        <h2
          className="font-display font-light leading-[1.04] tracking-[-0.015em] text-[#f1f5f9]"
          style={{ fontSize: "clamp(36px, 5vw, 76px)" }}
        >
          Let&apos;s engineer something{" "}
          <span className="italic font-normal text-[#c86a3b]">monumental</span>
        </h2>

        <p className="text-[15px] sm:text-[16px] leading-[1.8] text-[#f1f5f9]/70 font-light max-w-2xl">
          Whether you are an architect specifying dimensional stone, an importer sourcing FCL containers at scale, or a developer seeking bespoke CNC detailing — our technical export desk is at your disposal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a
            href="mailto:exports@pavangroups.com"
            className="inline-flex items-center justify-center gap-3 px-9 py-4 text-xs font-mono uppercase tracking-[0.2em] font-bold bg-[#0f172a] hover:bg-[#a0522d] text-[#ffffff] transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-4 h-4 text-[#94a3b8]" />
            <span>Request Container Quote</span>
            <ArrowRight className="w-4 h-4 text-[#94a3b8]" />
          </a>

          <a
            href="tel:+919876543210"
            className="inline-flex items-center justify-center gap-3 px-9 py-4 border border-[#94a3b8]/30 text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#f1f5f9] hover:bg-white/5 transition-all hover:border-[#94a3b8]"
          >
            <Phone className="w-4 h-4 text-[#94a3b8]" />
            <span>+91 98765 43210</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="pt-10 flex flex-wrap gap-6 sm:gap-10 items-center border-t border-[#94a3b8]/15 text-[10px] font-mono tracking-[0.25em] uppercase text-[#94a3b8]/60">
          <span>● ISO 9001:2015 CERTIFIED</span>
          <span>● ISPM-15 CRATING</span>
          <span>● 100% DRY-LAY AUDIT</span>
          <span>● GLOBAL FCL LOGISTICS</span>
        </div>
      </motion.div>
    </section>
  );
}
