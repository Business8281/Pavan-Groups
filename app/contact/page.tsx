"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle2, ChevronDown } from "lucide-react";
import { Mascot } from "page-mascot";
import { getAssetPath } from "@/lib/basePath";
import { COUNTRY_DIAL_CODES } from "@/components/SampleRequest";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "Natural Slate",
    message: "",
  });
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("IN");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBackImage, setShowBackImage] = useState(false);

  const selectedCountry = useMemo(() => {
    return COUNTRY_DIAL_CODES.find((c) => c.code === selectedCountryCode) || COUNTRY_DIAL_CODES[0];
  }, [selectedCountryCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formState.phone.trim()) {
      const digitsOnly = formState.phone.replace(/\D/g, "");
      if (digitsOnly.length < selectedCountry.minDigits || digitsOnly.length > selectedCountry.maxDigits) {
        const msg =
          selectedCountry.minDigits === selectedCountry.maxDigits
            ? `Please enter a valid ${selectedCountry.minDigits}-digit number`
            : `Please enter ${selectedCountry.minDigits} to ${selectedCountry.maxDigits} digits`;
        setPhoneError(msg);
        return;
      }
    }
    setPhoneError("");

    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const raw = value.replace(/[^\d\s-]/g, "");
      const digits = raw.replace(/\D/g, "");
      if (digits.length > selectedCountry.maxDigits) {
        return;
      }
      setFormState((prev) => ({ ...prev, phone: raw }));
      if (digits.length > 0 && digits.length < selectedCountry.minDigits) {
        const msg =
          selectedCountry.minDigits === selectedCountry.maxDigits
            ? `Please enter a valid ${selectedCountry.minDigits}-digit number`
            : `Please enter ${selectedCountry.minDigits} to ${selectedCountry.maxDigits} digits`;
        setPhoneError(msg);
      } else {
        setPhoneError("");
      }
      return;
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="bg-white min-h-screen text-[#241919] font-sans selection:bg-[#ff5500] selection:text-white flex flex-col pt-20 sm:pt-24 pb-12">
      <main className="flex-grow w-full relative">
        <div className="px-4 sm:px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          
          {/* Left Side: Interactive Mascot (Above) & Abstract Architectural Visual Block (Below) */}
          <div className="w-full flex flex-col justify-start space-y-6 sm:space-y-8 order-2 lg:order-1">
            {/* Interactive Mascot (Above) - visible on desktop */}
            <div className="hidden lg:flex flex-col items-center justify-center pt-2 sm:pt-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <Mascot
                  directions={getAssetPath("/mascots/fox-riso-directions.webp")}
                  reactions={getAssetPath("/mascots/fox-riso-reactions.webp")}
                  size={150}
                />
              </motion.div>
            </div>

            {/* Architectural Visual Block (Below) */}
            <div 
              onMouseEnter={() => setShowBackImage(true)}
              onMouseLeave={() => setShowBackImage(false)}
              onClick={() => setShowBackImage(!showBackImage)}
              className="relative w-full h-[320px] sm:h-[450px] lg:h-[650px] flex justify-center items-center lg:items-start lg:justify-start group cursor-pointer select-none"
            >
              {/* Backside Image (Appears & elevates in front on hover) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`absolute top-6 sm:top-10 left-0 lg:left-8 w-[68%] lg:w-[340px] h-[75%] lg:h-[480px] overflow-hidden rounded-lg border border-[#747474]/15 transition-all duration-500 ease-out ${
                  showBackImage
                    ? "z-30 scale-105 translate-x-4 lg:translate-x-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]"
                    : "z-10 scale-100 translate-x-0 shadow-lg"
                } group-hover:z-30 group-hover:scale-105 group-hover:translate-x-4 lg:group-hover:translate-x-12 group-hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]`}
              >
                <img 
                  src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
                  alt="Marble Texture Background"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 transition-opacity duration-300 ${showBackImage ? "opacity-0" : "bg-black/10 group-hover:opacity-0"}`} />
              </motion.div>
              
              {/* Main Front Image (Recedes on hover) */}
              <motion.img 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80" 
                alt="Pavan Stones Group Extraction" 
                className={`relative top-4 sm:top-12 lg:top-16 right-0 lg:-right-16 w-[75%] lg:w-[380px] h-[80%] lg:h-[520px] object-cover rounded-lg transition-all duration-500 ease-out ${
                  showBackImage
                    ? "z-10 scale-95 opacity-70 shadow-lg grayscale-0"
                    : "z-20 scale-100 opacity-100 shadow-2xl grayscale-[15%]"
                } group-hover:z-10 group-hover:scale-95 group-hover:opacity-70 group-hover:grayscale-0`}
              />
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full max-w-xl mx-auto lg:mx-0 pt-4 sm:pt-6 order-1 lg:order-2">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
             >
               <div className="flex items-center gap-3 mb-4">
                 <span className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#c85a32] font-bold">
                   DIRECT EXPORT CONSULTATION
                 </span>
                 <div className="h-px w-10 bg-[#c85a32]"></div>
               </div>

               <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-3 text-[#241919]">
                 We&apos;d love to hear <br /> from you
               </h1>
               
               <p className="text-[#555555] text-xs sm:text-sm mb-8 sm:mb-10 font-light leading-relaxed">
                 Fill up the specification request form below and our international export desk will get back to you with FOB/CIF schedules within 24 hours.
               </p>

               {!isSubmitted ? (
                 <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                   <div className="space-y-5 sm:space-y-6">
                      <div className="relative">
                        <input 
                          type="text" 
                          name="name"
                          required
                          maxLength={50}
                          value={formState.name}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-[#747474]/30 pb-2.5 pr-14 text-[#241919] focus:outline-none focus:border-[#ff5500] placeholder:text-[#747474] text-sm transition-colors"
                          placeholder="Your Name *"
                        />
                        {formState.name.length > 0 && (
                          <span className="absolute right-0 top-1 text-[10px] font-mono text-[#747474]/60 pointer-events-none">
                            {formState.name.length}/50
                          </span>
                        )}
                      </div>
                      
                      <div className="relative">
                        <input 
                          type="email" 
                          name="email"
                          required
                          maxLength={80}
                          value={formState.email}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-[#747474]/30 pb-2.5 pr-14 text-[#241919] focus:outline-none focus:border-[#ff5500] placeholder:text-[#747474] text-sm transition-colors"
                          placeholder="Corporate / Professional Email *"
                        />
                        {formState.email.length > 0 && (
                          <span className="absolute right-0 top-1 text-[10px] font-mono text-[#747474]/60 pointer-events-none">
                            {formState.email.length}/80
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
                        <div className="relative">
                          <input 
                            type="text" 
                            name="company"
                            maxLength={80}
                            value={formState.company}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-[#747474]/30 pb-2.5 pr-14 text-[#241919] focus:outline-none focus:border-[#ff5500] placeholder:text-[#747474] text-sm transition-colors"
                            placeholder="Architectural Firm / Company"
                          />
                          {formState.company.length > 0 && (
                            <span className="absolute right-0 top-1 text-[10px] font-mono text-[#747474]/60 pointer-events-none">
                              {formState.company.length}/80
                            </span>
                          )}
                        </div>

                        <div>
                          <div className={`flex items-center border-b pb-2 transition-colors ${
                            phoneError
                              ? "border-red-500"
                              : "border-[#747474]/30 focus-within:border-[#ff5500]"
                          }`}>
                            <select
                              value={selectedCountryCode}
                              onChange={(e) => {
                                setSelectedCountryCode(e.target.value);
                                setFormState((prev) => ({ ...prev, phone: "" }));
                                setPhoneError("");
                              }}
                              className="w-[78px] sm:w-[84px] bg-transparent text-[#241919] text-xs font-mono font-bold pr-1 outline-none cursor-pointer shrink-0 border-r border-[#747474]/20 mr-2"
                              aria-label="Country Dialing Code"
                            >
                              {COUNTRY_DIAL_CODES.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.flag} {c.dialCode}
                                </option>
                              ))}
                            </select>
                            <input 
                              type="tel" 
                              name="phone"
                              value={formState.phone}
                              onChange={handleInputChange}
                              className="flex-1 min-w-0 w-full bg-transparent text-[#241919] focus:outline-none text-sm placeholder:text-[#747474]"
                              placeholder={selectedCountry.placeholder}
                            />
                          </div>
                          {phoneError && (
                            <p className="text-[10.5px] font-mono text-red-500 mt-1 flex items-center gap-1">
                              <span>⚠</span> {phoneError}
                            </p>
                          )}
                        </div>
                      </div>

                     <div className="relative">
                       <select 
                         name="interest"
                         value={formState.interest}
                         onChange={handleInputChange}
                         className="w-full bg-transparent border-b border-[#747474]/30 pb-2.5 text-[#241919] focus:outline-none focus:border-[#ff5500] text-sm appearance-none cursor-pointer transition-colors"
                       >
                         <optgroup label="── Natural Slate & Cladding ──">
                           <option value="Natural Slate">Natural Slate (Markapur Black, California Gold, Multi Slate)</option>
                           <option value="3D Wall Cladding">3D Wall Cladding & Stacked Ledger Panels</option>
                         </optgroup>
                         <optgroup label="── Granite Collections ──">
                           <option value="South Indian Granite">South Indian Granite (Black Galaxy, Absolute Black, Steel Grey)</option>
                           <option value="North Indian Granite">North Indian Granite (Rajasthan Slabs, Desert Gold, Flamed)</option>
                           <option value="Gangsaw Granite Slabs">Monolithic Gangsaw Granite Slabs & Polished Cutters</option>
                         </optgroup>
                         <optgroup label="── Limestone & Hardscapes ──">
                           <option value="Limestone">Calcareous Limestone (Cuddapah Black, Lime Yellow & Blue)</option>
                           <option value="Pavers & Cobbles">Architectural Pavers, Cobblestones & Flagstones</option>
                           <option value="Crazy Pattern & Chipouts">Crazy Pattern Paving & Decorative Stone Chipouts</option>
                         </optgroup>
                         <optgroup label="── Artisanal & Architectural ──">
                           <option value="CNC Murals & Carvings">CNC 3D Murals & Architectural Stone Carvings</option>
                           <option value="Natural Stone Mosaics">Natural Stone Mosaics & Mesh-Mounted Patterns</option>
                           <option value="River Pebbles">Natural River Pebbles & Polished Agate Stones</option>
                         </optgroup>
                         <optgroup label="── Commercial & Trade ──">
                           <option value="Custom Architectural Project">Bespoke Architectural / Cut-to-Size Project</option>
                           <option value="Container Import / FCL">Full Container Load (FCL) Import / Distributorship</option>
                         </optgroup>
                       </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pb-2 text-[#747474]">
                         <ChevronDown size={16} />
                       </div>
                     </div>

                      <div>
                        <div className="relative">
                          <textarea 
                            name="message"
                            required
                            maxLength={500}
                            rows={3}
                            value={formState.message}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-[#747474]/30 pb-2 text-[#241919] focus:outline-none focus:border-[#ff5500] placeholder:text-[#747474] text-sm resize-none transition-colors"
                            placeholder="Project dimensions, target port (e.g. USNYC, AUSYD, NLRTM) or requirements *"
                          />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#747474]/60 mt-0.5">
                          <span>Include target port & sizing specifications</span>
                          <span className={formState.message.length >= 500 ? "text-[#ff5500] font-bold" : ""}>
                            {formState.message.length}/500
                          </span>
                        </div>
                      </div>
                   </div>

                   <div className="pt-2">
                     <button 
                       type="submit"
                       disabled={isSubmitting}
                       className="w-full sm:w-auto bg-[#ff5500] hover:bg-[#e04b00] active:scale-98 text-white px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm touch-manipulation cursor-pointer"
                     >
                       {isSubmitting ? "Dispatching Dossier..." : "Send Export Message →"}
                     </button>
                   </div>
                 </form>
               ) : (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="py-12 text-center space-y-5 bg-[#faf8f5] border border-[#747474]/20 p-8 rounded-xl shadow-xs"
                 >
                   <div className="w-14 h-14 bg-[#ff5500]/15 rounded-full flex items-center justify-center mx-auto text-[#ff5500]">
                     <CheckCircle2 className="w-7 h-7" />
                   </div>
                   <div className="space-y-2">
                     <h3 className="text-2xl font-display font-medium text-[#241919]">Inquiry Dispatched Successfully!</h3>
                     <p className="max-w-sm mx-auto text-[#555555] text-xs sm:text-sm font-light leading-relaxed">
                       Thank you, {formState.name}. Your specifications have been forwarded to our international trade desk. You will receive a detailed proposal within 24 hours.
                     </p>
                   </div>
                   <button 
                     onClick={() => setIsSubmitted(false)}
                     className="text-[#ff5500] text-xs font-mono uppercase tracking-wider font-semibold hover:underline cursor-pointer"
                   >
                     Send another inquiry
                   </button>
                 </motion.div>
               )}
             </motion.div>

              {/* Mobile Interactive Mascot: Swapped above Quick Contact Telemetry */}
              <div className="flex lg:hidden flex-col items-center justify-center pt-8 pb-3">
                <Mascot
                  directions={getAssetPath("/mascots/fox-riso-directions.webp")}
                  reactions={getAssetPath("/mascots/fox-riso-reactions.webp")}
                  size={140}
                />
              </div>

              {/* ── Quick Contact Telemetry ── */}
              <div className="mt-4 lg:mt-10 space-y-4 border-t border-[#747474]/20 pt-8">
                {/* Request a Quote */}
                <a
                  href="/request-sample"
                  className="flex items-center gap-3.5 group p-2.5 rounded-lg hover:bg-[#faf8f5] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full border border-[#747474]/25 flex items-center justify-center text-[#ff5500] shrink-0 group-hover:bg-[#ff5500] group-hover:border-[#ff5500] group-hover:text-white transition-all">
                    <Mail size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#241919] group-hover:text-[#ff5500] transition-colors">Request Sample Box</p>
                    <p className="text-[11px] text-[#747474] font-light">Custom cut stone specimens dispatched via DHL/FedEx</p>
                  </div>
                </a>

                {/* WhatsApp Direct Line */}
                <a
                  href="https://wa.me/919246462600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 group p-2.5 rounded-lg hover:bg-[#faf8f5] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full border border-[#747474]/25 flex items-center justify-center text-[#25D366] shrink-0 group-hover:bg-[#25D366] group-hover:border-[#25D366] group-hover:text-white transition-all">
                    <Phone size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#241919] group-hover:text-[#25D366] transition-colors">Direct WhatsApp Desk</p>
                    <p className="text-[11px] text-[#747474] font-mono">+91 9246462600</p>
                  </div>
                </a>

                {/* Export Email */}
                <a
                  href="mailto:Pavanimpex2007@gmail.com"
                  className="flex items-center gap-3.5 group p-2.5 rounded-lg hover:bg-[#faf8f5] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full border border-[#747474]/25 flex items-center justify-center text-[#241919] shrink-0 group-hover:bg-[#241919] group-hover:text-white transition-all">
                    <Mail size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#241919] group-hover:text-[#ff5500] transition-colors">Official Export Email</p>
                    <p className="text-[11px] text-[#747474] font-mono">Pavanimpex2007@gmail.com</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-2.5">
                  <div className="w-9 h-9 rounded-full border border-[#747474]/25 flex items-center justify-center text-[#241919] shrink-0">
                    <MapPin size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#241919]">Headquarters & Primary Mills</p>
                    <p className="text-[11px] text-[#747474] font-light">Markapur, Prakasam District, Andhra Pradesh, India</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}
