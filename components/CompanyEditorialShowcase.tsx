"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface PillarStage {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
  imageAlt: string;
  tagline: string;
  coordinate: string;
}

export interface MetricItem {
  value: string;
  label: string;
  detail: string;
}

export interface ArchitecturalApplication {
  title: string;
  category: string;
  description: string;
  image: string;
  linkHref?: string;
}

export interface CompanyEditorialData {
  companySlug: string;
  divisionNum: string;
  divisionCode: string;
  companyName: string;
  stoneFamily: string;
  establishedYear: string;
  locationName: string;
  coordinates: string;
  accentColor: string;
  heroStatement?: {
    lead: string;
    italicAccent: string;
  };
  narrative?: {
    foundingStory: string;
    craftsmanshipStory: string;
  };
  metrics?: MetricItem[];
  pillars?: PillarStage[];
  applications: ArchitecturalApplication[];
}

export default function CompanyEditorialShowcase({ data }: { data: CompanyEditorialData }) {
  return (
    <section className="bg-white text-[#140d0a] overflow-hidden border-b border-[#140d0a]/10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-[#140d0a]/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#c85a32] block mb-2">
              PROJECT REPERTOIRE · SPECIFIED GLOBALLY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-light text-[#140d0a] tracking-tight">
              Architectural Contexts & Installations
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#140d0a] hover:text-[#c85a32] transition-colors pb-1 border-b border-[#140d0a]/20 hover:border-[#c85a32]"
          >
            Explore Project Gallery <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── 3-CARD INSTALLATIONS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {data.applications.map((app, aIdx) => {
            const productHref =
              app.linkHref ||
              (data.companySlug
                ? `/products?company=${data.companySlug}`
                : "/products");

            return (
              <Link
                key={aIdx}
                href={productHref}
                className="group flex flex-col bg-white border border-[#140d0a]/10 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer block"
              >
                {/* Image Container with Category Badge */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#140d0a] relative">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white font-mono text-[9.5px] uppercase tracking-wider">
                    {app.category}
                  </div>
                </div>

                {/* Caption Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-display text-xl sm:text-[22px] font-medium text-[#140d0a] mb-3 leading-snug group-hover:text-[#c85a32] transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#555555] font-light leading-relaxed">
                      {app.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#140d0a]/10 flex items-center justify-between text-[10.5px] font-mono text-[#747474]">
                    <span className="uppercase tracking-wider">Certified Installation</span>
                    <span className="text-[#140d0a] font-medium group-hover:text-[#c85a32] group-hover:translate-x-1 transition-all inline-flex items-center gap-1">
                      <span>View Specs</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
