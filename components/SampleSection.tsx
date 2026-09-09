"use client";
import Link from "next/link";

export default function SampleSection() {
  return (
    <section
      id="sample-cta"
      className="relative py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden border-t border-[#747474]/20"
      style={{
        background: "linear-gradient(135deg, #181514 0%, #26201b 50%, #12100f 100%)",
      }}
    >
      {/* Background Architectural Stone Texture & Lighting Vignette */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 50%, rgba(139, 69, 19, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(81, 74, 56, 0.35) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
        
        {/* Subtle Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/15 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#94a3b8] animate-pulse" />
          <span className="text-[9.5px] font-mono tracking-[0.24em] uppercase font-bold text-[#94a3b8]">
            DIRECT FACTORY SUPPLY & EXPORT
          </span>
        </div>

        {/* Minimal Grand Headline */}
        <h2
          className="font-display font-light text-white leading-[1.05] tracking-[-0.015em]"
          style={{ fontSize: "clamp(32px, 4.2vw, 56px)" }}
        >
          Evaluate Our Natural Stones in Person.
        </h2>

        {/* Brief Formal Line */}
        <p className="text-[14px] sm:text-[15.5px] leading-relaxed text-white/75 font-light max-w-2xl mx-auto">
          Complimentary calibrated physical stone sample kits and customized containerized FOB/CIF quotations for global architects, builders, and wholesalers.
        </p>

        {/* Two Formal Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          
          {/* Button 1: Request Sample (Links to /request-sample) */}
          <Link
            href="/request-sample"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#94a3b8] hover:bg-[#c9b08f] text-[#1e1614] text-[11px] font-mono uppercase tracking-[0.22em] font-bold transition-all shadow-lg hover:translate-y-[-1px] cursor-pointer"
          >
            <span>REQUEST SAMPLE</span>
            <span className="text-sm">→</span>
          </Link>

          {/* Button 2: Contact Us (Links to #contact) */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-transparent hover:bg-white/10 border border-white/30 text-white text-[11px] font-mono uppercase tracking-[0.22em] font-semibold transition-all hover:border-white cursor-pointer"
          >
            <span>CONTACT US</span>
            <span className="text-sm">→</span>
          </Link>

        </div>

      </div>
    </section>
  );
}
