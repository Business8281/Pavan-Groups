"use client";
import { motion } from "framer-motion";

const stats = [
  { num: "26+", label: "Years of Expertise", detail: "Quarrying & processing since 2000" },
  { num: "150K+", label: "Sqm Annual Output", detail: "State-of-the-art gangsaw facilities" },
  { num: "2,400+", label: "Projects Delivered", detail: "Across global residential & commercial" },
  { num: "40+", label: "Destination Ports", detail: "USA, UK, Europe, UAE, Australia" },
  { num: "9", label: "Processing Plants", detail: "Markapur, Chimakurthy & Cuddapah" },
  { num: "99.4%", label: "On-Schedule Delivery", detail: "Verified global maritime logistics" },
];

export default function Stats() {
  return (
    <section id="stats" className="py-24 md:py-32 px-6 md:px-14 lg:px-20 bg-[#181111] text-[#f1f5f9]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto will-change-transform"
      >
        {/* Header */}
        <div className="max-w-xl mb-16 space-y-3">
          <span className="text-[9.5px] font-mono tracking-[0.32em] uppercase text-[#94a3b8] font-semibold block">
            PRODUCTION CAPACITY &amp; SCALE
          </span>
          <h2
            className="font-display font-light leading-[1.05] tracking-[-0.01em] text-[#f1f5f9]"
            style={{ fontSize: "clamp(32px, 3.8vw, 56px)" }}
          >
            Scale that earns{" "}
            <span className="italic font-normal text-[#c86a3b]">your trust</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#94a3b8]/15 border border-[#94a3b8]/15">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group p-8 md:p-12 relative overflow-hidden bg-[#181111] transition-all duration-300 hover:bg-[#201616]"
            >
              <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 bg-[#0f172a]"
                style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
              />
              <span
                className="font-display font-light block leading-none mb-3 text-[#f1f5f9] group-hover:text-[#94a3b8] transition-colors"
                style={{ fontSize: "clamp(36px, 4.5vw, 68px)" }}
              >
                {s.num}
              </span>
              <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#94a3b8] mb-1 font-semibold">
                {s.label}
              </p>
              <p className="text-[12px] text-[#f1f5f9]/40 font-light">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
