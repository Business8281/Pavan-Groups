"use client";
import { useState } from "react";
import { MapPin, Navigation, Phone, Mail, ExternalLink, Building2, Compass } from "lucide-react";
import { CompanyLocationInfo } from "@/lib/companyLocations";

interface CompanyLocationSectionProps {
  location: CompanyLocationInfo;
  brandColor?: string;
}

export default function CompanyLocationSection({
  location,
  brandColor = "#ea580c",
}: CompanyLocationSectionProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  const encodedAddress = encodeURIComponent(location.embedQuery || `${location.name}, ${location.address}, ${location.city}, ${location.state} ${location.pincode}`);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-16 bg-white border-t border-[#747474]/15 relative z-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#747474]/15">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: brandColor }} />
              <span
                className="text-[10.5px] font-mono uppercase tracking-[0.24em] font-bold"
                style={{ color: brandColor }}
              >
                Factory &amp; Processing Facility Location
              </span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-[42px] text-[#241919] tracking-tight leading-tight">
              Visit {location.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] font-light max-w-2xl leading-relaxed">
              {location.tagline}. Direct road and freight connectivity to international container ports.
            </p>
          </div>

          {/* Quick Action Button */}
          <a
            href={location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[4px] text-white text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-[1.02] shadow-sm flex-none self-start md:self-auto cursor-pointer"
            style={{ backgroundColor: brandColor }}
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* 2-Column Showcase: Details on Left + Live Interactive Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#faf9f8] border border-[#747474]/20 rounded-[4px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Division Badge */}
              <div className="space-y-3">
                {location.logo && (
                  <div className="inline-block py-1">
                    <img
                      src={location.logo}
                      alt={`${location.name} Logo`}
                      className="h-10 sm:h-12 w-auto object-contain max-w-[160px]"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#747474] font-semibold block">
                    Operated Under Pavan Stones Group
                  </span>
                  <h3 className="font-display font-medium text-2xl text-[#241919]">
                    {location.name}
                  </h3>
                  <p className="text-xs font-mono font-medium" style={{ color: brandColor }}>
                    {location.divisionTitle}
                  </p>
                </div>
              </div>

              {/* Physical Address */}
              <div className="p-4 rounded-[4px] bg-white border border-[#747474]/15 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#747474] font-semibold">
                  <MapPin className="w-4 h-4 text-[#ff5500] flex-none" />
                  <span>Factory / Processing Yard Address</span>
                </div>
                <p className="text-sm font-sans text-[#241919] font-medium leading-relaxed pl-6">
                  {location.address}
                  <br />
                  {location.city}, {location.state} – {location.pincode}, {location.country}
                </p>
              </div>

              {/* Direct Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-white rounded-[4px] border border-[#747474]/15">
                  <span className="text-[9px] uppercase tracking-wider text-[#747474] block">Port Link</span>
                  <span className="font-semibold text-[#241919] block mt-0.5">{location.port}</span>
                </div>

                <div className="p-3 bg-white rounded-[4px] border border-[#747474]/15">
                  <span className="text-[9px] uppercase tracking-wider text-[#747474] block">Speciality</span>
                  <span className="font-semibold text-[#241919] block mt-0.5 truncate">{location.speciality}</span>
                </div>
              </div>

            </div>

            {/* Direct Contact Links */}
            <div className="pt-6 border-t border-[#747474]/15 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <a
                  href={`tel:${location.phone}`}
                  className="inline-flex items-center gap-2 font-bold text-[#241919] hover:text-[#ff5500] transition-colors"
                >
                  <div className="w-7 h-7 rounded-[4px] bg-white border border-[#747474]/20 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5 text-[#ff5500]" />
                  </div>
                  <span>{location.phoneDisplay}</span>
                </a>

                <a
                  href={`mailto:${location.email}`}
                  className="inline-flex items-center gap-2 text-[#555555] hover:text-[#ff5500] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#747474]" />
                  <span>{location.email}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Live Google Map Stage (7 Cols) */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full rounded-[4px] overflow-hidden border border-[#747474]/20 bg-[#faf9f8] shadow-xs group">
            {/* Interactive map iframe */}
            <iframe
              src={mapEmbedUrl}
              title={`${location.name} Factory Location Map`}
              className="w-full h-full min-h-[380px] lg:min-h-[460px] border-0 filter saturate-90 contrast-105"
              loading="lazy"
              allowFullScreen
              onLoad={() => setMapLoaded(true)}
            />

            {/* Ambient map corner tag */}
            <div className="absolute top-4 left-4 pointer-events-none bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-[4px] border border-[#747474]/20 shadow-sm flex items-center gap-2 text-xs font-mono font-bold text-[#241919]">
              <Compass className="w-4 h-4 text-[#ff5500]" />
              <span>{location.city}, {location.state}</span>
            </div>

            {/* Overlay Navigation Button at Bottom Right */}
            <div className="absolute bottom-4 right-4">
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#241919]/90 hover:bg-[#ff5500] text-white backdrop-blur-md rounded-[4px] text-[11px] font-mono uppercase tracking-wider font-bold transition-all duration-300 shadow-md"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
