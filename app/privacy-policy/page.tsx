"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            LEGAL &amp; DATA GOVERNANCE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-[#140d0a] leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[#747474] mt-2">
            Last Updated: January 2025 · Pavan Stones Group
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-[#3a3a3a] text-sm sm:text-[15px] font-light leading-relaxed">
          
          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-[#140d0a]/10 shadow-xs">
            <h2 className="font-display font-medium text-xl text-[#140d0a] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#ff5500]" />
              1. Overview &amp; Data Commitment
            </h2>
            <p>
              Pavan Stones Group (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy and is committed to protecting any personal and commercial inquiry data you share with us. This policy explains how we collect, store, and process your information when you visit our digital platform, request stone sample kits, or submit export commercial inquiries.
            </p>
          </section>

          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-[#140d0a]/10 shadow-xs">
            <h2 className="font-display font-medium text-xl text-[#140d0a] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#ff5500]" />
              2. Information We Collect
            </h2>
            <p>
              When you submit a quotation inquiry, request a physical stone sample box, or interact with our ocean freight calculator, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-light">
              <li>Full Name, Corporate Email Address, and Phone/WhatsApp contact details.</li>
              <li>Company Name, Architecture/Design Practice, and business location.</li>
              <li>Delivery address for physical sample kits (via DHL, FedEx, or international courier).</li>
              <li>Project scope specifications, stone varieties, and target destination discharge sea ports.</li>
            </ul>
          </section>

          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-[#140d0a]/10 shadow-xs">
            <h2 className="font-display font-medium text-xl text-[#140d0a] flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#ff5500]" />
              3. Use of Information
            </h2>
            <p>
              We use the collected information exclusively for legitimate commercial purposes, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-light">
              <li>Preparing accurate FOB/CIF export quotations and container stuffing plans.</li>
              <li>Dispatching authenticated physical stone sample kits directly from our Markapur mills.</li>
              <li>Providing technical architectural data sheets (MTR, ASTM, ISO compliance reports).</li>
              <li>Communicating vessel transit updates and international ocean freight schedules.</li>
            </ul>
            <p className="pt-2 text-xs text-[#747474]">
              We do <strong>not</strong> sell, rent, or trade your personal or commercial contact information to third parties.
            </p>
          </section>

          <section className="space-y-3 bg-white p-6 sm:p-8 rounded-xl border border-[#140d0a]/10 shadow-xs">
            <h2 className="font-display font-medium text-xl text-[#140d0a]">
              4. Contact Our Compliance Desk
            </h2>
            <p>
              If you have any questions or data requests regarding this Privacy Policy, please contact our export desk:
            </p>
            <div className="pt-2 text-xs font-mono space-y-1 text-[#241919]">
              <p><strong>Pavan Stones Group — Legal &amp; Export Compliance</strong></p>
              <p>Markapur Quarry Belt, Prakasam District, Andhra Pradesh, India</p>
              <p>Email: <a href="mailto:export@pavangroups.com" className="text-[#ff5500] underline">export@pavangroups.com</a></p>
              <p>Phone: <a href="tel:+919246462600" className="text-[#ff5500] underline">+91 9246462600</a></p>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}
