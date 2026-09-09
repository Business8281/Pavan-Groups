"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Pavan Groups delivered 340 tonnes of Absolute Black Granite to our Singapore site. Every slab matched the approved sample exactly — exceptional consistency.",
    name: "Rajiv Menon",
    role: "Principal, Menon Associates Architects",
    country: "Singapore",
  },
  {
    quote: "We have worked with stone suppliers on four continents. Pavan Groups stands alone in their combination of quality and logistics capability. They handle it all.",
    name: "Elena Vasquez",
    role: "Procurement Director, Meridian Construction",
    country: "Spain",
  },
  {
    quote: "Our pool coping order arrived ahead of schedule with full certification documents. The slate quality surpassed what we could source locally at twice the cost.",
    name: "James Hartfield",
    role: "Project Manager, Hartfield Landscaping",
    country: "Australia",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ background: "#f8fafc" }}>
      {/* Header */}
      <div className="mb-16">
        <span className="text-[9px] tracking-[0.32em] uppercase text-[#c85a32] font-medium mb-4 block">
          Client Voices
        </span>
        <h2
          className="font-display font-light leading-[1.1] tracking-[-0.01em] text-ink"
          style={{ fontSize: "clamp(28px,3.2vw,50px)" }}
        >
          Words from
          <br />
          <em className="not-italic text-[#c85a32]">those who've built</em>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(0,0,0,0.06)" }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-8 md:p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
            style={{ background: "#f8fafc" }}
          >
            {/* Hover fill */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(ellipse 80% 60% at 0% 100%, rgba(255,68,58,0.05) 0%, transparent 70%)" }}
            />
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700"
              style={{ background: "linear-gradient(90deg,#c85a32,transparent)", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            />

            {/* Quote mark */}
            <span
              className="font-display text-[80px] font-light leading-none select-none absolute -top-2 right-6 opacity-[0.06]"
              style={{ color: "#c85a32" }}
            >
              "
            </span>

            {/* Quote */}
            <p className="text-[14px] leading-[1.8] text-ink/65 mb-8 relative z-10 flex-1">
              "{t.quote}"
            </p>

            {/* Author */}
            <div className="relative z-10 flex items-center gap-3 border-t pt-5" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium text-white flex-none"
                style={{ background: "#c85a32" }}
              >
                {t.name[0]}
              </div>
              <div>
                <p className="text-[12px] font-medium text-ink">{t.name}</p>
                <p className="text-[10px] text-ink/40">{t.role} · {t.country}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
