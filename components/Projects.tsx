"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "The Leela Palace",
    location: "New Delhi, India",
    material: "Makrana White Marble • Granite",
    category: "Hospitality",
    year: "2023",
  },
  {
    title: "Marina Bay Promenade",
    location: "Singapore",
    material: "Grey Limestone • Cobblestone",
    category: "Urban Landscape",
    year: "2022",
  },
  {
    title: "Al Hamra Tower Podium",
    location: "Kuwait City",
    material: "Absolute Black Granite",
    category: "Commercial",
    year: "2023",
  },
  {
    title: "Seaview Villa Estate",
    location: "Marbella, Spain",
    material: "Autumn Slate • Pool Coping",
    category: "Residential",
    year: "2024",
  },
  {
    title: "Parliament Quarter",
    location: "Canberra, Australia",
    material: "Pink Granite • Sandstone",
    category: "Civic",
    year: "2022",
  },
  {
    title: "Bandra Kurla Complex",
    location: "Mumbai, India",
    material: "Black Galaxy Granite",
    category: "Commercial",
    year: "2024",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-36 px-6 md:px-14 lg:px-20" style={{ background: "#f2ece2" }}>
      {/* Header */}
      <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
        <div>
          <span className="text-[9px] tracking-[0.32em] uppercase text-[#c85a32] font-medium mb-4 block">
            Landmark Projects
          </span>
          <h2
            className="font-display font-light leading-[1.1] tracking-[-0.01em] text-ink"
            style={{ fontSize: "clamp(30px,3.6vw,56px)" }}
          >
            Stone that
            <br />
            <em className="not-italic text-[#c85a32]">defines places</em>
          </h2>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2.5 text-[10px] tracking-[0.22em] uppercase text-[#c85a32] font-medium border-b pb-1 hover:gap-5 transition-all duration-300"
          style={{ borderColor: "rgba(255,68,58,0.3)" }}
        >
          All Projects Archive
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Table list */}
      <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
        {projects.map((p, i) => (
          <Link
            key={p.title}
            href={`/projects?category=${encodeURIComponent(p.category)}`}
            className="group flex items-center justify-between py-6 border-b cursor-pointer gap-4"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
          >
            {/* Index + title */}
            <div className="flex items-center gap-6 min-w-0 flex-1">
              <span className="text-[10px] tracking-[0.2em] text-ink/30 flex-none tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h4 className="font-display font-light text-lg md:text-xl text-ink group-hover:text-[#c85a32] transition-colors duration-300 truncate">
                  {p.title}
                </h4>
                <p className="text-[11px] text-ink/40 mt-0.5 hidden md:block">{p.material}</p>
              </div>
            </div>

            {/* Meta */}
            <div className="hidden lg:flex items-center gap-8 flex-none">
              <span
                className="text-[9px] tracking-[0.24em] uppercase px-3 py-1.5 border"
                style={{ borderColor: "rgba(255,68,58,0.25)", color: "rgba(255,68,58,0.6)" }}
              >
                {p.category}
              </span>
              <span className="text-[11px] text-ink/40 w-28">{p.location}</span>
              <span className="text-[11px] text-ink/30 tabular-nums">{p.year}</span>
            </div>

            {/* Arrow */}
            <div
              className="w-8 h-8 flex-none flex items-center justify-center border rounded-full text-ink/20 group-hover:border-[#c85a32] group-hover:text-[#c85a32] transition-all duration-300"
              style={{ borderColor: "rgba(0,0,0,0.12)" }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
