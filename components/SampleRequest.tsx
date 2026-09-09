"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StoneSpecimen {
  id: string;
  name: string;
  division: string;
  category: "slate" | "limestone" | "granite";
  gradient: string;
  origin: string;
  defaultFinishes: string[];
  recommendedThickness: string;
}

const SPECIMENS: StoneSpecimen[] = [
  {
    id: "black-galaxy-granite",
    name: "Black Galaxy Granite",
    division: "Pavan Granite",
    category: "granite",
    gradient: "linear-gradient(135deg, #090a0c 0%, #221f17 50%, #040506 100%)",
    origin: "Chimakurthy, AP",
    defaultFinishes: ["95+ Diamond Mirror Polish", "Leathered Velvet Touch", "Honed Matte"],
    recommendedThickness: "20mm (3/4 in)",
  },
  {
    id: "black-slate-stone",
    name: "Black Slate Stone",
    division: "Pavan Impex",
    category: "slate",
    gradient: "linear-gradient(135deg, #17191d 0%, #282b31 50%, #101114 100%)",
    origin: "Markapur, AP",
    defaultFinishes: ["Natural Cleft", "Calibrated Bottom", "Honed Smooth"],
    recommendedThickness: "15mm (5/8 in)",
  },
  {
    id: "cuddapah-black-limestone",
    name: "Cuddapah Black Limestone",
    division: "Sai Balaji Impex",
    category: "limestone",
    gradient: "linear-gradient(135deg, #151719 0%, #25282d 50%, #0d0e10 100%)",
    origin: "Cuddapah Basin, AP",
    defaultFinishes: ["Natural Non-Slip (R11)", "Honed Matte", "Tumbled Antique"],
    recommendedThickness: "20mm (3/4 in)",
  },
  {
    id: "indian-autumn-slate",
    name: "Indian Autumn Slate",
    division: "Pavan Impex",
    category: "slate",
    gradient: "linear-gradient(135deg, #532f1f 0%, #7d4428 50%, #3a1f13 100%)",
    origin: "Markapur, AP",
    defaultFinishes: ["Hand-Split Layered", "Tumbled Rustic", "Calibrated"],
    recommendedThickness: "18mm (3/4 in)",
  },
  {
    id: "lime-yellow-limestone",
    name: "Lime Yellow Limestone",
    division: "Sai Balaji Impex",
    category: "limestone",
    gradient: "linear-gradient(135deg, #7c6433 0%, #a48a4c 50%, #524220 100%)",
    origin: "Cuddapah, AP",
    defaultFinishes: ["Antiqued Velvet", "Brushed", "Calibrated"],
    recommendedThickness: "20mm (3/4 in)",
  },
  {
    id: "lime-blue-limestone",
    name: "Lime Blue Limestone",
    division: "Sai Balaji Impex",
    category: "limestone",
    gradient: "linear-gradient(135deg, #2e3842 0%, #475564 50%, #1e242b 100%)",
    origin: "Cuddapah, AP",
    defaultFinishes: ["Calibrated Coping", "Cobbled", "Flamed"],
    recommendedThickness: "20mm (3/4 in)",
  },
  {
    id: "california-gold-slate",
    name: "California Gold Slate",
    division: "Pavan Impex",
    category: "slate",
    gradient: "linear-gradient(135deg, #6c471c 0%, #96692f 50%, #442a0e 100%)",
    origin: "Markapur, AP",
    defaultFinishes: ["Golden Sparkle", "Riven Surface", "Calibrated"],
    recommendedThickness: "15mm (5/8 in)",
  },
  {
    id: "silver-sparkle-granite",
    name: "Silver Sparkle Granite",
    division: "Pavan Granite",
    category: "granite",
    gradient: "linear-gradient(135deg, #0e1012 0%, #22262b 50%, #090a0c 100%)",
    origin: "Chimakurthy, AP",
    defaultFinishes: ["Diamond Gloss", "Honed Matte", "Lapato"],
    recommendedThickness: "20mm (3/4 in)",
  },
  {
    id: "absolute-black-granite",
    name: "Absolute Black Granite",
    division: "Pavan Granite",
    category: "granite",
    gradient: "linear-gradient(135deg, #060607 0%, #111214 50%, #030304 100%)",
    origin: "South India Basin",
    defaultFinishes: ["Flawless Mirror Polish", "Flamed", "Water Jet"],
    recommendedThickness: "20mm (3/4 in)",
  },
];

const DESTINATION_PORTS = [
  "Sydney, Australia (Port Botany)",
  "Melbourne, Australia (Port of Melbourne)",
  "Brisbane, Australia (Port of Brisbane)",
  "Fremantle / Perth, Australia",
  "Auckland, New Zealand",
  "Dubai / Jebel Ali, UAE",
  "Dammam / Jeddah, Saudi Arabia",
  "Los Angeles / Long Beach, USA",
  "New York / New Jersey, USA",
  "London Gateway / Felixstowe, UK",
  "Hamburg, Germany",
  "Antwerp, Belgium",
  "Singapore, Port of Singapore",
  "Other International Sea Port",
];

export default function SampleRequest() {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>("black-galaxy-granite");
  const [selectedFinish, setSelectedFinish] = useState<string>("95+ Diamond Mirror Polish");
  const [selectedSize, setSelectedSize] = useState<string>("600 x 300 mm (2x1 ft)");
  const [selectedThickness, setSelectedThickness] = useState<string>("20mm (3/4 in)");
  const [estimatedVolume, setEstimatedVolume] = useState<string>("1 x 20ft FCL Container (~700-900 sqm)");
  const [destinationPort, setDestinationPort] = useState<string>("Sydney, Australia (Port Botany)");
  const [customPort, setCustomPort] = useState<string>("");

  const [companyName, setCompanyName] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [courierAddress, setCourierAddress] = useState<string>("");
  const [projectNotes, setProjectNotes] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");

  const currentSpecimen =
    SPECIMENS.find((s) => s.id === selectedSpecimenId) || SPECIMENS[0];

  const handleSpecimenSelect = (specimenId: string) => {
    setSelectedSpecimenId(specimenId);
    const spec = SPECIMENS.find((s) => s.id === specimenId);
    if (spec && spec.defaultFinishes.length > 0) {
      setSelectedFinish(spec.defaultFinishes[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `PAVAN-SMP-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceNumber(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section
      id="request-sample"
      className="relative pt-8 pb-16 md:pt-10 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-white overflow-hidden"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="max-w-2xl mb-8 md:mb-12">
          <h2 className="font-display font-light text-[#514a38] leading-[1.1] tracking-[-0.01em] text-4xl md:text-5xl">
            Request a Sample
          </h2>
        </div>

        {/* ── 2-COLUMN ATELIER LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── LEFT COLUMN: BESPOKE SAMPLE REQUEST CONCIERGE FORM (7 Cols) ── */}
          <div className="lg:col-span-7 bg-[#fcfcfc] border border-[#747474]/15 rounded-sm p-6 sm:p-10 shadow-sm relative overflow-hidden">
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-8"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-20 h-20 rounded-full bg-white border-2 border-[#514a38] flex items-center justify-center mx-auto shadow-sm text-3xl text-[#514a38]"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    ✔
                  </motion.div>
                </motion.div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#747474] block mb-3">
                    SAMPLE DISPATCH QUEUED SUCCESSFULLY
                  </span>
                  <h3 className="font-display text-4xl font-light text-[#241919] mb-3">
                    Thank You, {contactName || "Valued Client"}
                  </h3>
                  <p className="text-xs font-mono text-[#454545] font-semibold mb-6 flex items-center justify-center gap-3">
                    Sample Tracking ID: 
                    <span className="text-[#241919] bg-white px-4 py-1.5 rounded border border-[#747474]/20 tracking-wider shadow-inner">{referenceNumber}</span>
                  </p>
                  <p className="text-[15px] text-[#454545] font-light max-w-md mx-auto leading-relaxed">
                    Our export logistics desk has queued your curated <strong className="text-[#241919] font-medium">{currentSpecimen.name}</strong> sample kit for express air courier dispatch to <strong className="text-[#241919] font-medium">{destinationPort}</strong>.
                  </p>
                </div>

                <div className="p-5 bg-white border border-[#747474]/15 rounded-sm max-w-md mx-auto text-left space-y-3 text-xs font-mono text-[#747474]">
                  <div className="flex justify-between border-b border-[#747474]/10 pb-2">
                    <span>Stone Specimen:</span>
                    <span className="font-bold text-[#241919] text-right">{currentSpecimen.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#747474]/10 pb-2">
                    <span>Selected Finish:</span>
                    <span className="font-bold text-[#241919] text-right">{selectedFinish}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#747474]/10 pb-2">
                    <span>Target Port:</span>
                    <span className="font-bold text-[#241919] text-right">{destinationPort}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Est. Dispatch:</span>
                    <span className="font-bold text-[#514a38]">Within 48 Hours (Air)</span>
                  </div>
                </div>

                <div className="pt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-4 bg-[#241919] text-white hover:bg-[#3e352a] rounded-sm text-[10.5px] font-mono uppercase tracking-[0.18em] font-bold transition-all cursor-pointer shadow-sm"
                  >
                    Submit Another Request
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* ── STEP 1: STONE SPECIMEN SELECTION ── */}
                <div className="space-y-5 pb-8 border-b border-[#747474]/15">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#241919] text-white font-mono text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <h3 className="font-display text-2xl font-light text-[#241919] tracking-tight">
                      Select Stone Variety & Texture
                    </h3>
                  </div>

                  {/* Visual Specimen Swatch Grid */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-3 pl-9">
                      Click Stone Specimen: *
                    </label>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pl-9">
                      {SPECIMENS.map((spec) => {
                        const isSelected = selectedSpecimenId === spec.id;
                        return (
                          <button
                            key={spec.id}
                            type="button"
                            onClick={() => handleSpecimenSelect(spec.id)}
                            className={`p-3 rounded-sm border text-left transition-all duration-300 cursor-pointer flex items-center gap-3 relative overflow-hidden ${
                              isSelected
                                ? "bg-white border-[#241919] shadow-[0_0_0_1px_#241919] text-[#241919]"
                                : "bg-white hover:bg-[#f8fafc] border-[#747474]/20 text-[#241919]"
                            }`}
                          >
                            <div
                              className="w-6 h-6 rounded-none border border-[#747474]/30 shadow-sm flex-none relative z-10"
                              style={{ background: spec.gradient }}
                            />
                            <div className="min-w-0 relative z-10">
                              <span className={`text-[12px] font-medium block leading-tight truncate ${isSelected ? "text-[#241919] font-bold" : "text-[#241919]"}`}>
                                {spec.name}
                              </span>
                              <span
                                className={`text-[9px] font-mono block truncate mt-0.5 ${
                                  isSelected ? "text-[#514a38] font-semibold" : "text-[#747474]"
                                }`}
                              >
                                {spec.division.split(" ")[0]}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Surface Finish Chips */}
                  <div className="pl-9 mt-4">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-3">
                      Surface Finish Profile: *
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {currentSpecimen.defaultFinishes.map((fin) => (
                        <button
                          key={fin}
                          type="button"
                          onClick={() => setSelectedFinish(fin)}
                          className={`px-4 py-2 text-xs font-mono rounded-sm transition-all cursor-pointer ${
                            selectedFinish === fin
                              ? "bg-white border-[#241919] shadow-[0_0_0_1px_#241919] text-[#241919] font-bold"
                              : "bg-white border border-[#747474]/20 text-[#454545] hover:border-[#241919] hover:text-[#241919]"
                          }`}
                        >
                          {fin}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── STEP 2: DIMENSIONS & VOLUME ESTIMATE ── */}
                <div className="space-y-5 pb-8 border-b border-[#747474]/15">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#241919] text-white font-mono text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <h3 className="font-display text-2xl font-light text-[#241919] tracking-tight">
                      Target Sizing & Project Scope
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pl-9">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                        Target Sizing / Form Factor:
                      </label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full bg-white border border-[#747474]/30 rounded-sm text-[#241919] p-3.5 text-sm focus:outline-none focus:border-[#241919] transition-all cursor-pointer"
                      >
                        <option value="600 x 300 mm (2x1 ft)">600 x 300 mm (2x1 ft)</option>
                        <option value="600 x 600 mm (2x2 ft)">600 x 600 mm (2x2 ft)</option>
                        <option value="300 x 300 mm (1x1 ft)">300 x 300 mm (1x1 ft)</option>
                        <option value="1200 x 600 mm (4x2 ft)">1200 x 600 mm (4x2 ft)</option>
                        <option value="Jumbo Gangsaw Slabs (10x6 ft)">Jumbo Gangsaw Slabs (10x6 ft)</option>
                        <option value="Tumbled Pavers (200x100mm)">Tumbled Pavers (200x100mm)</option>
                        <option value="Custom Cut-to-Size">Custom Cut-to-Size (Architectural)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                        Target Thickness:
                      </label>
                      <select
                        value={selectedThickness}
                        onChange={(e) => setSelectedThickness(e.target.value)}
                        className="w-full bg-white border border-[#747474]/30 rounded-sm text-[#241919] p-3.5 text-sm focus:outline-none focus:border-[#241919] transition-all cursor-pointer"
                      >
                        <option value="12mm (1/2 in)">12mm (1/2 in)</option>
                        <option value="15mm (5/8 in)">15mm (5/8 in)</option>
                        <option value="18mm (3/4 in)">18mm (3/4 in)</option>
                        <option value="20mm (3/4 in) [Most Popular]">20mm (3/4 in) [Standard]</option>
                        <option value="25mm (1 in)">25mm (1 in)</option>
                        <option value="30mm (1 3/16 in)">30mm (1 3/16 in)</option>
                        <option value="40mm (1 1/2 in) Paver">40mm (1 1/2 in) Paver</option>
                      </select>
                    </div>
                  </div>

                  <div className="pl-9 mt-4">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                      Estimated Project Requirement: *
                    </label>
                    <select
                      value={estimatedVolume}
                      onChange={(e) => setEstimatedVolume(e.target.value)}
                      className="w-full bg-white border border-[#747474]/30 rounded-sm text-[#241919] p-3.5 text-sm focus:outline-none focus:border-[#241919] transition-all cursor-pointer"
                      required
                    >
                      <option value="Trial Sample Evaluation (< 200 sqm)">Trial Sample Evaluation (&lt; 200 sqm)</option>
                      <option value="200 to 500 sqm (Partial Container)">200 to 500 sqm (Partial Container / LCL)</option>
                      <option value="1 x 20ft FCL Container (~700-900 sqm)">1 x 20ft FCL Container (~700-900 sqm)</option>
                      <option value="2 to 5 x 20ft FCL Containers (1,500 - 4,000 sqm)">2 to 5 x 20ft FCL Containers (1,500 - 4,000 sqm)</option>
                      <option value="5+ FCL Containers (Commercial Project Supply)">5+ FCL Containers (Commercial Project Supply)</option>
                    </select>
                  </div>
                </div>

                {/* ── STEP 3: DESTINATION SEA PORT ── */}
                <div className="space-y-5 pb-8 border-b border-[#747474]/15">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#241919] text-white font-mono text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    <h3 className="font-display text-2xl font-light text-[#241919] tracking-tight">
                      Destination Sea Port <span className="text-[#747474] text-lg hidden sm:inline">(For CIF Freight Quotation)</span>
                    </h3>
                  </div>

                  <div className="pl-9">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                      Nearest Port of Discharge: *
                    </label>
                    <select
                      value={destinationPort}
                      onChange={(e) => setDestinationPort(e.target.value)}
                      className="w-full bg-white border border-[#747474]/30 rounded-sm text-[#241919] p-3.5 text-sm focus:outline-none focus:border-[#241919] transition-all cursor-pointer"
                      required
                    >
                      {DESTINATION_PORTS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  {destinationPort.includes("Other") && (
                    <div className="pl-9 mt-4">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                        Specify Your Target Port / City:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Port of Rotterdam, Netherlands"
                        value={customPort}
                        onChange={(e) => setCustomPort(e.target.value)}
                        className="w-full bg-white border border-[#747474]/30 rounded-sm text-[#241919] p-3.5 text-sm focus:outline-none focus:border-[#241919] transition-all"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* ── STEP 4: COMPANY & COURIER DISPATCH DETAILS ── */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#241919] text-white font-mono text-xs flex items-center justify-center font-bold">
                      4
                    </span>
                    <h3 className="font-display text-2xl font-light text-[#241919] tracking-tight">
                      Company & Courier Delivery
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pl-9">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                        Company / Practice: *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Studio Arc / Stone Direct"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full bg-white border border-[#747474]/30 rounded-sm text-[#241919] p-3.5 text-sm focus:outline-none focus:border-[#241919] transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                        Contact Person: *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. David Henderson"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-white border border-[#747474]/30 rounded-sm text-[#241919] p-3.5 text-sm focus:outline-none focus:border-[#241919] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pl-9 mt-4">
                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                        Corporate Email: *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. hello@studioarc.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-[#747474]/30 rounded-sm text-[#241919] p-3.5 text-sm focus:outline-none focus:border-[#241919] transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                        Phone / WhatsApp: *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +61 412 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-[#747474]/30 rounded-sm text-[#241919] p-3.5 text-sm focus:outline-none focus:border-[#241919] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="pl-9 mt-4">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                      Sample Delivery Street Address (For DHL / FedEx): *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Suite 402, Level 4, 120 Collins Street, Melbourne VIC 3000, Australia"
                      value={courierAddress}
                      onChange={(e) => setCourierAddress(e.target.value)}
                      className="w-full bg-white border border-[#747474]/30 rounded-sm text-[#241919] p-3.5 text-sm focus:outline-none focus:border-[#241919] transition-all resize-none"
                      required
                    />
                  </div>

                  <div className="pl-9 mt-4">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-[#747474] font-bold block mb-2">
                      Specific Architectural Requirements (Optional):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Looking for pool coping pieces with bullnose edge profiles."
                      value={projectNotes}
                      onChange={(e) => setProjectNotes(e.target.value)}
                      className="w-full bg-white border border-[#747474]/30 rounded-sm text-[#241919] p-3.5 text-sm focus:outline-none focus:border-[#241919] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* ── SUBMIT BUTTON ── */}
                <div className="pt-6 pl-9">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full p-4 rounded-sm bg-[#241919] hover:bg-[#3e352a] text-white text-[11.5px] font-mono uppercase tracking-[0.22em] font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Queuing Express Dispatch...
                      </span>
                    ) : (
                      <>
                        <span>Submit Sample Kit Dispatch Request</span>
                        <span className="text-base font-normal">→</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] font-mono text-[#747474] text-center mt-4 flex items-center justify-center gap-1.5">
                    <span>🔒</span> Compliant with ISO 9001:2015 standards. Dispatched directly from our factory within 48-72 hours.
                  </p>
                </div>

              </form>
            )}

          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE SAMPLE ATELIER BOX VISUALIZER (5 Cols) ── */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            
            {/* 3D-Feel Luxury Curated Sample Box Visualizer */}
            <div className="bg-white border border-[#747474]/15 rounded-sm p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#747474]/15">
                <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#514a38] font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#514a38]" />
                  SELECTED SPECIMEN
                </span>
                <span className="text-[10px] font-mono text-[#747474]">
                  {currentSpecimen.origin}
                </span>
              </div>

              {/* Dynamic Live Specimen Tile (Changes in Real Time) */}
              <div
                className="w-full h-48 mb-5 rounded-none border border-black/20 shadow-inner flex flex-col justify-between p-4 relative overflow-hidden transition-all duration-500"
                style={{ background: currentSpecimen.gradient }}
              >
                
                <div className="flex justify-between items-start relative z-10">
                  <span className="text-[9px] font-mono uppercase px-2.5 py-1 rounded-sm bg-black/70 text-white backdrop-blur-sm border border-white/10">
                    {selectedFinish}
                  </span>
                  <span className="text-[9px] font-mono uppercase px-2.5 py-1 rounded-sm bg-white text-[#0a0a0a] font-bold shadow-md">
                    {selectedThickness.split(" ")[0]}
                  </span>
                </div>

                <div className="relative z-10 bg-black/75 backdrop-blur-sm p-3 inline-block self-start border border-white/10 text-white">
                  <span className="text-sm font-mono font-bold block leading-tight">
                    {currentSpecimen.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#94a3b8] block mt-1 uppercase tracking-widest">
                    {currentSpecimen.category} · {currentSpecimen.division}
                  </span>
                </div>
              </div>

              {/* Live Specimen Summary Details */}
              <div className="p-4 rounded-sm bg-[#f8fafc] border border-[#747474]/15 text-xs font-mono space-y-2.5 text-[#454545]">
                <div className="flex justify-between items-center">
                  <span className="text-[#747474]">Target Port:</span>
                  <span className="font-medium text-[#241919] max-w-[60%] text-right truncate">{destinationPort.split("(")[0]}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#747474]">Project Scope:</span>
                  <span className="font-medium text-[#241919] max-w-[60%] text-right truncate">{estimatedVolume.split("(")[0]}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-[#747474]/15">
                  <span className="text-[#747474]">Air Courier:</span>
                  <span className="font-bold text-[#514a38]">DHL / FedEx Priority</span>
                </div>
              </div>
            </div>

            {/* What is Included Inside the Pavan Groups Sample Box */}
            <div className="bg-[#f8fafc] border border-[#747474]/20 rounded-sm p-8 shadow-sm">
              <div className="mb-6 border-b border-[#747474]/15 pb-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#747474] font-bold block mb-2">
                  EXPRESS SAMPLE KIT CONTENTS
                </span>
                <h4 className="font-display text-3xl font-light text-[#241919]">
                  What's Inside Your Box
                </h4>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <span className="text-[#514a38]/60 font-mono text-sm leading-none pt-0.5">01</span>
                  <div>
                    <strong className="block text-[12px] text-[#241919] uppercase tracking-wider font-bold mb-1">3x Calibrated Specimens</strong>
                    <span className="text-[14px] text-[#747474] font-light leading-snug">150x150mm genuine quarry cut samples in your selected finish.</span>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <span className="text-[#514a38]/60 font-mono text-sm leading-none pt-0.5">02</span>
                  <div>
                    <strong className="block text-[12px] text-[#241919] uppercase tracking-wider font-bold mb-1">Multi-Finish Swatch Deck</strong>
                    <span className="text-[14px] text-[#747474] font-light leading-snug">Physical reference cards for Cleft, Honed, Polished & Tumbled finishes.</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="text-[#514a38]/60 font-mono text-sm leading-none pt-0.5">03</span>
                  <div>
                    <strong className="block text-[12px] text-[#241919] uppercase tracking-wider font-bold mb-1">ASTM Test Reports</strong>
                    <span className="text-[14px] text-[#747474] font-light leading-snug">Certified documentation for Density, Compressive Strength & Slip Ratings.</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="text-[#514a38]/60 font-mono text-sm leading-none pt-0.5">04</span>
                  <div>
                    <strong className="block text-[12px] text-[#241919] uppercase tracking-wider font-bold mb-1">FOB & CIF Pricing Schedule</strong>
                    <span className="text-[14px] text-[#747474] font-light leading-snug">Calculated logistics data tailored to your specific discharge sea port.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#747474]/15 flex items-center justify-between text-[10px] font-mono text-[#747474]">
                <span className="uppercase tracking-wider">DHL Priority Dispatch</span>
                <span className="font-bold tracking-widest text-[#241919]">48-72 HOUR DELIVERY</span>
              </div>
            </div>

            {/* Direct Export WhatsApp Hotline */}
            <div className="p-5 bg-white border border-[#747474]/20 rounded-sm shadow-sm flex items-center justify-between gap-4">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#747474] block font-bold mb-1">
                  DIRECT EXPORT DESK:
                </span>
                <span className="text-xs font-mono font-bold text-[#241919] block">
                  +91 94402 71559
                </span>
                <span className="text-[10px] font-mono text-[#747474]">
                  export@pavangroups.com
                </span>
              </div>

              <a
                href="https://wa.me/919440271559?text=Hello%2C%20I%20would%20like%20to%20request%20natural%20stone%20samples%20from%20Pavan%20Groups."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-sm bg-[#25D366] hover:bg-[#20ba59] text-white text-[10px] font-mono uppercase tracking-widest font-bold shadow-sm transition-all flex-none flex items-center gap-2"
              >
                <span>WhatsApp</span>
                <span>↗</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
