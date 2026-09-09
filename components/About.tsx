"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const pillars = [
  { icon: "⬡", title: "Origin Traceability", desc: "Every block traced to its quarry face. GPS-tagged, ethically sourced." },
  { icon: "◎", title: "26+ Year Mastery", desc: "Over two decades of geological expertise and finishing craftsmanship." },
  { icon: "✦", title: "ISO 9001 Certified", desc: "Quality management systems ensuring consistency across every slab." },
  { icon: "◈", title: "Global Logistics", desc: "40+ countries. Full container to breakbulk. Customs handled end-to-end." },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-36 px-6 md:px-14 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
      style={{ background: "#f8fafc" }}
    >
      {/* Left */}
      <motion.div
        initial={{ opacity: 1, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[9px] tracking-[0.32em] uppercase text-[#c85a32] font-medium mb-5 block">
          About Pavan Groups
        </span>
        <h2
          className="font-display font-light leading-[1.1] tracking-[-0.01em] mb-7 text-ink"
          style={{ fontSize: "clamp(32px,3.8vw,58px)" }}
        >
          Carved from the
          <br />
          <em className="not-italic text-[#c85a32]">heart of India</em>
        </h2>
        <p className="text-ink/60 leading-[1.8] mb-5 text-[15px]">
          Headquartered in Markapur, Andhra Pradesh since 2000, Pavan Stones Group began with a single
          conviction: that natural stone, handled with respect and expertise, transforms
          spaces into timeless architectural legacies.
        </p>
        <p className="text-ink/60 leading-[1.8] mb-10 text-[15px]">
          Operating through Pavan Impex, Sai Balaji Impex, and Pavan Granite, we manage quarrying, custom processing, export, and installation across Slate, Limestone, and Premium Granite for architects across 40+ countries.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-[#c85a32] font-medium border-b pb-1 hover:gap-5 transition-all duration-300"
          style={{ borderColor: "rgba(255,68,58,0.3)" }}
        >
          Our Story & Quarries
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <div className="mt-12 inline-flex items-center gap-4 border-l-2 pl-5" style={{ borderColor: "#c85a32" }}>
          <span className="font-display text-5xl font-light text-[#c85a32]">2000</span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-ink/50 leading-relaxed">
            Year<br />Founded
          </span>
        </div>
      </motion.div>

      {/* Right */}
      <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative p-8 md:p-10 overflow-hidden"
            style={{ background: "#f8fafc" }}
          >
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700"
              style={{ background: "linear-gradient(90deg,#c85a32,transparent)", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            />
            <div className="text-2xl mb-5 text-[#c85a32] opacity-70 group-hover:opacity-100 transition-opacity">{p.icon}</div>
            <h4 className="font-display text-lg font-light text-ink mb-2.5 leading-tight">{p.title}</h4>
            <p className="text-ink/50 text-[13px] leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
