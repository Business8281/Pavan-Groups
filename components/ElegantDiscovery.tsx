"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const gridItems = [
  // 1. Tall left
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80", 
    className: "col-span-1 row-span-2",
    delay: 0
  },
  // 2. Wide top center
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80", 
    className: "col-span-2 row-span-1",
    delay: 0.1
  },
  // 3. Small top right
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80", 
    className: "col-span-1 row-span-1",
    delay: 0.2
  },
  // 4. TEXT BLOCK (Center)
  {
    type: "text",
    className: "col-span-2 row-span-1 flex flex-col items-center justify-center text-center p-6",
    delay: 0.3
  },
  // 5. Tall right
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&q=80", 
    className: "col-span-1 row-span-2",
    delay: 0.4
  },
  // 6. Small bottom left
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80", 
    className: "col-span-1 row-span-1",
    delay: 0.5
  },
  // 7. Wide bottom center
  { 
    type: "image",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80", 
    className: "col-span-2 row-span-1",
    delay: 0.6
  }
];

export default function ElegantDiscovery() {
  return (
    <section className="relative w-full h-auto md:h-[90vh] min-h-[600px] max-h-[900px] bg-white overflow-hidden border-t border-gray-100 flex items-center justify-center py-12 md:py-0">
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 h-full md:h-[80%] flex flex-col">
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-3 md:gap-4 lg:gap-6 w-full h-full">
          
          {gridItems.map((item, i) => {
            if (item.type === "text") {
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: item.delay, ease: "easeOut" }}
                  className={`${item.className} bg-white rounded-2xl md:order-none order-first my-8 md:my-0`}
                >
                  <span className="text-[#c85a32] text-xs font-mono uppercase tracking-widest mb-3 block">
                    Discover Quality
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#140d0a] font-light tracking-tight leading-none mb-6">
                    Our Gallery
                  </h2>
                  <Link 
                    href="/gallery"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#140d0a] hover:text-[#c85a32] transition-colors duration-300 pb-1 border-b border-[#140d0a]/20 hover:border-[#c85a32]"
                  >
                    View Collection <span className="text-lg leading-none">&rarr;</span>
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: item.delay, ease: "easeOut" }}
                className={`${item.className} relative overflow-hidden shadow-md rounded-2xl group h-[250px] md:h-auto`}
              >
                <img 
                  src={item.src} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt="Premium Stone Inspiration" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
