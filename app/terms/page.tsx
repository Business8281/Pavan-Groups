"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileCheck, Scale, Anchor } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#140d0a] pt-24 sm:pt-28 lg:pt-32 pb-20 px-4 sm:px-6 md:px-12 lg:px-16 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#747474] hover:text-[#ff5500] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </Link>

        {/* Page Header */}
        <div className="border-b border-[#140d0a]/10 pb-8 mb-10">
          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#ff5500] font-bold block mb-2">
            COMMERCIAL EXPORT PROTOCOLS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-[#140d0a] leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs font-mono text-[#747474] mt-2">
            Last Updated: January 2025 · Pavan Stones Group
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-[#3a3a3a] text-sm sm:text-[15px] font-light leading-relaxed">
          
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-[#140d0a]/10 shadow-xs">
            <h2 className="font-display font-medium text-xl text-[#140d0a] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#ff5500]" />
              1. Commercial Engagement &amp; Sourcing
            </h2>
            <p>
              All natural stone orders, specimen deliveries, and container dispatches are governed by commercial sales contracts confirmed between Pavan Stones Group and the buyer. By requesting sample kits, architectural specifications, or container stuffing allocations, you agree to these standard commercial terms.
            </p>
          </section>

          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-[#140d0a]/10 shadow-xs">
            <h2 className="font-display font-medium text-xl text-[#140d0a] flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#ff5500]" />
              2. Natural Material Tolerances &amp; Variations
            </h2>
            <p>
              Natural slate, limestone, granite, and quartzite are organic geological formations created over hundreds of millions of years.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-light">
              <li>Natural variations in shade, veining, crystal distribution, and cleft relief are inherent characteristics of genuine stone.</li>
              <li>Calibrated tiles and gangsaw slabs are fabricated to strict international tolerances (±0.5mm to ±1.0mm thickness calibration).</li>
              <li>High-resolution dry-lay photos and video dossiers are provided prior to crate sealing for final buyer signoff.</li>
            </ul>
          </section>

          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-[#140d0a]/10 shadow-xs">
            <h2 className="font-display font-medium text-xl text-[#140d0a] flex items-center gap-2">
              <Anchor className="w-5 h-5 text-[#ff5500]" />
              3. International Shipping &amp; Incoterms
            </h2>
            <p>
              Standard ocean freight contracts are executed under <strong>Incoterms 2020</strong> (FOB Chennai/Krishnapatnam, CIF Destination Port, or CFR).
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-light">
              <li>All wooden crating and A-frames are ISPM-15 certified, heat-treated, and stamped with phytosanitary certificates.</li>
              <li>Containers are loaded, braced, and sealed with tamper-evident high-security customs seals.</li>
              <li>Marine insurance coverage is provided on all CIF shipments under Institute Cargo Clauses (A).</li>
            </ul>
          </section>

          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-[#140d0a]/10 shadow-xs">
            <h2 className="font-display font-medium text-xl text-[#140d0a]">
              4. Inquiries &amp; Dispute Governance
            </h2>
            <p>
              Commercial contracts are governed under Indian commercial laws and international maritime arbitration standards. For contractual questions, reach our commercial desk at <a href="mailto:export@pavangroups.com" className="text-[#ff5500] underline">export@pavangroups.com</a>.
            </p>
          </section>

        </div>

      </div>
    </main>
  );
}
