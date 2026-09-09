"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
    <div className="bg-white min-h-screen text-[#3A5B5E] font-sans selection:bg-[#DDBA9B]/30 flex flex-col">
      <Navigation />

      <main className="flex-grow pt-24 lg:pt-32 pb-0 flex flex-col justify-between w-full relative">
        


        <div className="px-6 md:px-14 lg:px-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start flex-grow">
          
          {/* Left Side: Abstract Image Block */}
          <div className="relative w-full h-[500px] lg:h-[700px] flex justify-center items-center lg:items-start lg:justify-start">
             {/* Wide Background Image */}
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="absolute top-10 left-0 lg:left-10 w-[70%] lg:w-[350px] h-[80%] lg:h-[500px] overflow-hidden shadow-xl"
             >
                <img 
                  src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80"
                  alt="Marble Texture Background"
                  className="w-full h-full object-cover"
                />
                {/* Subtle dark tint to make it sit back visually */}
                <div className="absolute inset-0 bg-black/10" />
             </motion.div>
             
             {/* Main Image */}
             <motion.img 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80" 
               alt="Pavan Groups Stone" 
               className="relative z-10 top-0 lg:top-20 right-0 lg:-right-20 w-[75%] lg:w-[400px] h-[85%] lg:h-[550px] object-cover shadow-xl grayscale-[20%]"
             />
          </div>

          {/* Right Side: Form */}
          <div className="w-full max-w-xl mx-auto lg:mx-0 pt-10">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
             >
               <div className="flex items-center gap-4 mb-6">
                 <span className="text-sm font-medium text-[#859698]">Any question ? Just write us a message!</span>
                 <div className="h-[2px] w-12 bg-[#3A5B5E]"></div>
               </div>

               <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-semibold leading-tight mb-4 text-[#3A5B5E]">
                 We'd love to hear <br /> from you
               </h1>
               
               <p className="text-[#859698] text-sm mb-12">
                 Fill up the form and we will get back to you within 24 hours.
               </p>

               {!isSubmitted ? (
                 <form onSubmit={handleSubmit} className="space-y-8">
                   
                   <div className="space-y-8">
                     <input 
                       type="text" 
                       name="name"
                       required
                       value={formState.name}
                       onChange={handleInputChange}
                       className="w-full bg-transparent border-b border-[#859698]/30 pb-2 text-[#3A5B5E] focus:outline-none focus:border-[#3A5B5E] placeholder:text-[#859698] text-sm transition-colors"
                       placeholder="Name:"
                     />
                     
                     <input 
                       type="email" 
                       name="email"
                       required
                       value={formState.email}
                       onChange={handleInputChange}
                       className="w-full bg-transparent border-b border-[#859698]/30 pb-2 text-[#3A5B5E] focus:outline-none focus:border-[#3A5B5E] placeholder:text-[#859698] text-sm transition-colors"
                       placeholder="Email:"
                     />

                     <input 
                       type="text" 
                       name="company"
                       value={formState.company}
                       onChange={handleInputChange}
                       className="w-full bg-transparent border-b border-[#859698]/30 pb-2 text-[#3A5B5E] focus:outline-none focus:border-[#3A5B5E] placeholder:text-[#859698] text-sm transition-colors"
                       placeholder="Company:"
                     />

                     <input 
                       type="tel" 
                       name="phone"
                       value={formState.phone}
                       onChange={handleInputChange}
                       className="w-full bg-transparent border-b border-[#859698]/30 pb-2 text-[#3A5B5E] focus:outline-none focus:border-[#3A5B5E] placeholder:text-[#859698] text-sm transition-colors"
                       placeholder="Phone:"
                     />

                     <div className="relative">
                       <select 
                         name="interest"
                         value={formState.interest}
                         onChange={handleInputChange}
                         className="w-full bg-transparent border-b border-[#859698]/30 pb-2 text-[#3A5B5E] focus:outline-none focus:border-[#3A5B5E] text-sm appearance-none cursor-pointer transition-colors"
                       >
                         <option value="Natural Slate">Natural Slate Collection</option>
                         <option value="Premium Granite">Premium Granite Slabs</option>
                         <option value="Limestone">Architectural Limestone</option>
                         <option value="Custom Project">Custom Architectural Project</option>
                         <option value="Distributorship">Distributorship Inquiry</option>
                       </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pb-2 text-[#859698]">
                         <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                       </div>
                     </div>

                     <textarea 
                       name="message"
                       required
                       rows={1}
                       value={formState.message}
                       onChange={handleInputChange}
                       className="w-full bg-transparent border-b border-[#859698]/30 pb-2 text-[#3A5B5E] focus:outline-none focus:border-[#3A5B5E] placeholder:text-[#859698] text-sm resize-none transition-colors overflow-hidden h-8"
                       placeholder="Message:"
                     />
                   </div>

                   <div className="pt-4">
                     <button 
                       type="submit"
                       disabled={isSubmitting}
                       className="bg-[#F47140] hover:bg-[#d65f32] text-white px-10 py-3 text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                     >
                       {isSubmitting ? "Sending..." : "Send message"}
                     </button>
                   </div>
                 </form>
               ) : (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="py-16 text-center space-y-6 bg-white shadow-sm p-10"
                 >
                   <div className="w-16 h-16 bg-[#F47140]/20 rounded-full flex items-center justify-center mx-auto text-[#F47140]">
                     <CheckCircle2 className="w-8 h-8" />
                   </div>
                   <div className="space-y-2">
                     <h3 className="text-2xl font-serif text-[#3A5B5E]">Inquiry Received!</h3>
                     <p className="max-w-sm mx-auto text-[#859698] text-sm leading-relaxed">
                       Thank you, {formState.name}. We have received your message and will get back to you shortly.
                     </p>
                   </div>
                   <button 
                     onClick={() => setIsSubmitted(false)}
                     className="text-[#F47140] text-sm font-medium hover:underline"
                   >
                     Send another message
                   </button>
                 </motion.div>
               )}
             </motion.div>
          </div>
        </div>

        {/* Footer info block */}
        <div className="w-full mt-24">
           {/* Follow Us */}
           <div className="px-6 md:px-14 lg:px-20 max-w-7xl mx-auto flex items-center gap-6 mb-8">
              <div className="h-[1px] w-12 sm:w-24 bg-[#F47140]"></div>
              <span className="text-[#F47140] text-sm font-medium whitespace-nowrap">follow us</span>
              <div className="flex gap-4 text-[#F47140]">
                {/* Facebook */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:text-[#3A5B5E] transition-colors"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                {/* Instagram */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:text-[#3A5B5E] transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                {/* Twitter */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer hover:text-[#3A5B5E] transition-colors"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </div>
              <div className="h-[1px] flex-grow bg-[#F47140]"></div>
           </div>

           {/* Contact Info Bar */}
           <div className="w-full bg-white py-16 border-t border-gray-100">
              <div className="px-6 md:px-14 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
                 
                 <div className="flex flex-col gap-2">
                   <p className="text-sm font-medium text-[#3A5B5E]">Email</p>
                   <p className="text-sm text-[#859698]">export@pavangroups.com</p>
                 </div>
                 
                 <div className="flex flex-col gap-2 md:border-l md:border-[#3A5B5E]/20 md:pl-10">
                   <p className="text-sm font-medium text-[#3A5B5E]">Phone</p>
                   <p className="text-sm text-[#859698]">+91 98765 43210</p>
                 </div>

                 <div className="flex flex-col gap-2 md:border-l md:border-[#3A5B5E]/20 md:pl-10">
                   <p className="text-sm font-medium text-[#3A5B5E]">Location</p>
                   <p className="text-sm text-[#859698]">Markapur, AP, India</p>
                 </div>

              </div>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
