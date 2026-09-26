"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle2, ChevronDown } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "Natural Slate",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white min-h-screen text-[#241919] font-sans selection:bg-[#ff5500] selection:text-white flex flex-col pt-20 sm:pt-24 pb-12">
      <main className="flex-grow w-full relative">
        <div className="px-4 sm:px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          
          {/* Left Side: Abstract Architectural Visual Block */}
          <div className="relative w-full h-[320px] sm:h-[450px] lg:h-[650px] flex justify-center items-center lg:items-start lg:justify-start order-2 lg:order-1">
             {/* Wide Background Image */}
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="absolute top-6 sm:top-10 left-0 lg:left-8 w-[68%] lg:w-[340px] h-[75%] lg:h-[480px] overflow-hidden rounded-lg shadow-lg border border-[#747474]/15"
             >
                <img 
                  src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
                  alt="Marble Texture Background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
             </motion.div>
             
             {/* Main Image */}
             <motion.img 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80" 
               alt="Pavan Stones Group Extraction" 
               className="relative z-10 top-4 sm:top-12 lg:top-16 right-0 lg:-right-16 w-[75%] lg:w-[380px] h-[80%] lg:h-[520px] object-cover rounded-lg shadow-2xl grayscale-[15%]"
             />
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
                     <input 
                       type="text" 
                       name="name"
                       required
                       value={formState.name}
                       onChange={handleInputChange}
                       className="w-full bg-transparent border-b border-[#747474]/30 pb-2.5 text-[#241919] focus:outline-none focus:border-[#ff5500] placeholder:text-[#747474] text-sm transition-colors"
                       placeholder="Your Name *"
                     />
                     
                     <input 
                       type="email" 
                       name="email"
                       required
                       value={formState.email}
                       onChange={handleInputChange}
                       className="w-full bg-transparent border-b border-[#747474]/30 pb-2.5 text-[#241919] focus:outline-none focus:border-[#ff5500] placeholder:text-[#747474] text-sm transition-colors"
                       placeholder="Corporate / Professional Email *"
                     />

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
                       <input 
                         type="text" 
                         name="company"
                         value={formState.company}
                         onChange={handleInputChange}
                         className="w-full bg-transparent border-b border-[#747474]/30 pb-2.5 text-[#241919] focus:outline-none focus:border-[#ff5500] placeholder:text-[#747474] text-sm transition-colors"
                         placeholder="Architectural Firm / Company"
                       />

                       <input 
                         type="tel" 
                         name="phone"
                         value={formState.phone}
                         onChange={handleInputChange}
                         className="w-full bg-transparent border-b border-[#747474]/30 pb-2.5 text-[#241919] focus:outline-none focus:border-[#ff5500] placeholder:text-[#747474] text-sm transition-colors"
                         placeholder="Contact / WhatsApp Phone"
                       />
                     </div>

                     <div className="relative">
                       <select 
                         name="interest"
                         value={formState.interest}
                         onChange={handleInputChange}
                         className="w-full bg-transparent border-b border-[#747474]/30 pb-2.5 text-[#241919] focus:outline-none focus:border-[#ff5500] text-sm appearance-none cursor-pointer transition-colors"
                       >
                         <option value="Natural Slate">Natural Slate & 3D Wall Cladding</option>
                         <option value="Premium Granite">Black Galaxy & Gangsaw Granite Slabs</option>
                         <option value="Limestone">Calcareous Limestone & Tumbled Pavers</option>
                         <option value="Custom Project">Custom Architectural / CNC Project</option>
                         <option value="Distributorship">Container Import / Distributorship</option>
                       </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pb-2 text-[#747474]">
                         <ChevronDown size={16} />
                       </div>
                     </div>

                     <textarea 
                       name="message"
                       required
                       rows={3}
                       value={formState.message}
                       onChange={handleInputChange}
                       className="w-full bg-transparent border-b border-[#747474]/30 pb-2 text-[#241919] focus:outline-none focus:border-[#ff5500] placeholder:text-[#747474] text-sm resize-none transition-colors"
                       placeholder="Project dimensions, target port (e.g. USNYC, AUSYD, NLRTM) or requirements *"
                     />
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

              {/* ── Quick Contact Telemetry ── */}
              <div className="mt-10 space-y-4 border-t border-[#747474]/20 pt-8">
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
                  href="mailto:export@pavangroups.com"
                  className="flex items-center gap-3.5 group p-2.5 rounded-lg hover:bg-[#faf8f5] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full border border-[#747474]/25 flex items-center justify-center text-[#241919] shrink-0 group-hover:bg-[#241919] group-hover:text-white transition-all">
                    <Mail size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#241919] group-hover:text-[#ff5500] transition-colors">Official Export Email</p>
                    <p className="text-[11px] text-[#747474] font-mono">export@pavangroups.com</p>
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
