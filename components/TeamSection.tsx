"use client";
import { motion } from "framer-motion";

export default function TeamSection() {
  const teamMembers = [
    { id: 1, img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" },
    { id: 2, img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" },
    { id: 3, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" },
    { id: 4, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80" },
    { id: 5, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80" },
  ];

  return (
    <section className="py-24 bg-white w-full border-t border-gray-100 font-sans">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-light text-3xl md:text-5xl text-[#241919] tracking-tight">
            The heart and soul behind the stone
          </h2>
        </div>

        {/* Top Row: 3 Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          {teamMembers.slice(0, 3).map((member, i) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden border border-gray-200 shadow-sm bg-gray-100 flex flex-col items-center justify-center text-gray-400 group"
            >
              <svg className="w-16 h-16 mb-4 opacity-50 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-mono tracking-wider">MEMBER {member.id}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Row: 2 Items Centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:w-2/3 mx-auto">
          {teamMembers.slice(3, 5).map((member, i) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + (i * 0.1), ease: "easeOut" }}
              className="aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden border border-gray-200 shadow-sm bg-gray-100 flex flex-col items-center justify-center text-gray-400 group"
            >
              <svg className="w-16 h-16 mb-4 opacity-50 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm font-mono tracking-wider">MEMBER {member.id}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
