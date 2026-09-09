"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = ["Granite", "Marble", "Quartz", "Sandstone", "Limestone", "Onyx", "Travertine", "Slate", "Quartzite"];

const galleryItems = [
  {
    id: 1,
    title: "Absolute Black Granite",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Statuario Marble",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Calacatta Gold",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d14effd5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Emperador Dark",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Blue Pearl Granite",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Desert Sandstone",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
];

export default function GalleryPage() {

  const [angledImages, setAngledImages] = useState([
    { id: 1, src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80", type: "tall" },
    { id: 2, src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80", type: "wide" },
    { id: 3, src: "https://images.unsplash.com/photo-1542314831-c6a4d14effd5?auto=format&fit=crop&q=80", type: "square" },
    { id: 4, src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80", type: "tall-border" },
    { id: 5, src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80", type: "medium" },
    { id: 6, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80", type: "tall-red" },
  ]);

  const handleNext = () => {
    setAngledImages((prev) => {
      const newArr = [...prev];
      const last = newArr.pop(); // Take from the end
      if (last) newArr.unshift(last); // Put at the beginning
      return newArr;
    });
  };

  const handlePrev = () => {
    setAngledImages((prev) => {
      const newArr = [...prev];
      const first = newArr.shift(); // Take from the beginning
      if (first) newArr.push(first); // Put at the end
      return newArr;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000); // 3 seconds per step
    return () => clearInterval(timer);
  }, [angledImages]);

  const handleCardClick = (index: number) => {
    if (index === 2) handleNext(); // Left card clicked
    if (index === 4) handlePrev(); // Right card clicked
  };

  return (
    <main className="min-h-screen relative flex flex-col font-sans bg-white">
      
      {/* Header */}
      <div className="relative z-10 w-full p-6 flex justify-between items-center">
        <Link href="/" className="text-[#241919] font-display text-xl uppercase tracking-[0.2em] font-bold">
          Pavan Groups
        </Link>
      </div>
      {/* Dynamic Gallery Section - Premium Stack */}
      <section className="relative z-10 bg-white overflow-hidden pt-4 pb-12 md:pt-6 md:pb-16 flex flex-col items-center justify-center border-b border-[#747474]/15">
        
        {/* Gallery Heading */}
        <div className="text-center mb-4 md:mb-6 px-6 z-20">
          <h1 className="font-display text-5xl md:text-6xl text-[#241919] font-medium leading-none tracking-tight">
            Gallery
          </h1>
        </div>

        {/* Container */}
        <div className="relative w-full max-w-7xl mx-auto h-[600px] flex items-center justify-center">
          
          {/* Full-Width Immersive Carousel */}
          {angledImages.map((img, index) => {
            
            // Define states for a symmetrical full-width layout with 6 items
            let x = "0vw";
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;
            let rotateY = 0;

            switch (index) {
              case 0: // Hidden far left
              case 1: 
                x = "-50vw";
                scale = 0.6;
                opacity = 0;
                zIndex = 0;
                break;
              case 2: // Visible left
                x = "-30vw";
                scale = 0.8;
                opacity = 1;
                zIndex = 10;
                rotateY = 15; // Subtle 3D fold
                break;
              case 3: // CENTER HERO
                x = "0vw";
                scale = 1;
                opacity = 1;
                zIndex = 30;
                rotateY = 0;
                break;
              case 4: // Visible right
                x = "30vw";
                scale = 0.8;
                opacity = 1;
                zIndex = 10;
                rotateY = -15; // Subtle 3D fold
                break;
              case 5: // Hidden far right
                x = "50vw";
                scale = 0.6;
                opacity = 0;
                zIndex = 0;
                break;
              default:
                break;
            }

            return (
              <motion.div 
                key={img.id}
                onClick={() => handleCardClick(index)}
                animate={{ 
                  x,
                  scale,
                  opacity,
                  rotateY,
                  zIndex,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 60, 
                  damping: 15, 
                  mass: 1 
                }}
                className="absolute w-[85vw] max-w-[900px] h-[50vh] md:h-[70vh] max-h-[800px] bg-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-black/5 rounded-xl overflow-hidden cursor-pointer"
                style={{ perspective: 1000 }}
              >
                <div className="w-full h-full relative group">
                  <img 
                    src={img.src} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    alt="Gallery Stone" 
                  />
                  
                  {/* Light overlay for side cards to make center pop slightly, instead of washed out blur */}
                  <div 
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-700" 
                    style={{ opacity: index === 3 ? 0 : 0.15 }}
                  />
                  
                  {/* Title / View Button on the Center Hero Card */}
                  {index === 3 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <h3 className="text-white font-display text-3xl md:text-5xl font-light tracking-wide mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Premium Selection
                      </h3>
                      <button className="self-start text-white text-xs tracking-[0.3em] uppercase font-bold border border-white/50 px-8 py-3 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
          
        </div>
      </section>

      {/* Hero Masonry Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Text and Button */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4 pr-0 lg:pr-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-[#241919]">
              GALLERY
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] text-[#241919] font-medium leading-[1.1]">
              Our Story in Pictures
            </h2>
            <p className="text-[#454545] text-lg sm:text-xl font-light mt-2 mb-4 leading-relaxed max-w-md">
              Every image tells a story—explore our gallery to see our journey unfold
            </p>
            <button className="bg-[#140d0a] text-white px-6 py-2.5 rounded-md flex items-center gap-2 hover:bg-black transition-colors text-sm font-medium tracking-wide mt-2 group">
              See all <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </button>
          </div>

          {/* Right Side: Masonry Grid */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-3 md:gap-4 h-[400px] sm:h-[500px] md:h-[600px]">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-3 md:gap-4 h-full pt-12 pb-0">
              <div className="flex-[0.45] rounded-xl overflow-hidden shadow-sm relative group cursor-pointer bg-gray-100">
                <img src={galleryItems[0].image} alt="Gallery 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-[0.55] rounded-xl overflow-hidden shadow-sm relative group cursor-pointer bg-gray-100">
                <img src={galleryItems[1].image} alt="Gallery 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3 md:gap-4 h-full pt-0 pb-12">
              <div className="flex-[0.6] rounded-xl overflow-hidden shadow-sm relative group cursor-pointer bg-gray-100">
                <img src={galleryItems[2].image} alt="Gallery 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-[0.4] rounded-xl overflow-hidden shadow-sm relative group cursor-pointer bg-gray-100">
                <img src={galleryItems[3].image} alt="Gallery 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3 md:gap-4 h-full pt-6 pb-6">
              <div className="flex-[0.4] rounded-xl overflow-hidden shadow-sm relative group cursor-pointer bg-gray-100">
                <img src={galleryItems[4].image} alt="Gallery 5" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex-[0.6] rounded-xl overflow-hidden shadow-sm relative group cursor-pointer bg-gray-100">
                <img src={galleryItems[5]?.image || galleryItems[0].image} alt="Gallery 6" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Luxury Section from Mockup */}
      <section className="relative z-10 bg-white/60 backdrop-blur-sm py-24 px-6 md:px-12 lg:px-20 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column */}
          <div className="md:col-span-7 flex flex-col gap-16">
            {/* Header Text */}
            <div className="max-w-xl">
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-widest leading-tight mb-6 text-[#241919]">
                DISCOVER PREMIUM <br/> STONE CRAFTSMANSHIP
              </h2>
              <p className="text-[#454545] text-sm leading-relaxed font-light">
                Pavan Groups offers an exquisite collection of premium granite, marble, and natural stones, bringing timeless elegance and unmatched durability to your architectural and interior design projects.
              </p>
            </div>

            {/* Two Side-by-Side Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="flex flex-col gap-5">
                <div className="relative aspect-square overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1542314831-c6a4d14effd5?auto=format&fit=crop&q=80" alt="Royal Family Suite" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 border border-white/40 bg-black/10 backdrop-blur-md text-white text-[9px] tracking-widest uppercase px-3 py-1 flex items-center gap-2">
                    <span>★</span> NEW
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg uppercase tracking-widest mb-3 flex items-center justify-between text-[#241919]">
                    ABSOLUTE BLACK GRANITE <span className="text-xl font-light">↗</span>
                  </h3>
                  <p className="text-[9px] uppercase tracking-widest text-[#747474] leading-relaxed">
                    DURABILITY & ELEGANCE ARE THE ESSENCE OF OUR PREMIUM STONE SELECTION.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col gap-5">
                <div className="relative aspect-square overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80" alt="Royal Family Suite" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 border border-white/40 bg-black/10 backdrop-blur-md text-white text-[9px] tracking-widest uppercase px-3 py-1 flex items-center gap-2">
                    <span>★</span> NEW
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg uppercase tracking-widest mb-3 flex items-center justify-between text-[#241919]">
                    STATUARIO MARBLE <span className="text-xl font-light">↗</span>
                  </h3>
                  <p className="text-[9px] uppercase tracking-widest text-[#747474] leading-relaxed">
                    ELEVATE YOUR INTERIORS WITH OUR IMPORTED MARBLE COLLECTIONS.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Offset Card */}
            <div className="flex gap-8 mt-8">
              <div className="w-[1px] bg-black/20 ml-6 hidden sm:block"></div>
              <div className="flex-1 flex flex-col gap-5 pl-0 sm:pl-8 max-w-[85%]">
                <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
                  <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80" alt="Premier Sea View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div>
                  <h3 className="font-display text-lg uppercase tracking-widest mb-3 flex items-center justify-between text-[#241919]">
                    CALACATTA GOLD <span className="text-xl font-light">↗</span>
                  </h3>
                  <p className="text-[9px] uppercase tracking-widest text-[#747474] leading-relaxed">
                    PRECISION CUTTING & POLISHING FOR YOUR UNIQUE ARCHITECTURAL NEEDS.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-5 flex flex-col gap-16 md:pt-0 pt-16">
            
            {/* Top Card */}
            <div className="flex flex-col gap-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80" alt="Superior Garden View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <h3 className="font-display text-lg uppercase tracking-widest mb-3 flex items-center justify-between text-[#241919]">
                  EMPERADOR DARK <span className="text-xl font-light">↗</span>
                </h3>
                <p className="text-[9px] uppercase tracking-widest text-[#747474] leading-relaxed">
                  BRING RUSTIC WARMTH AND CHARACTER TO YOUR EXTERIOR LANDSCAPING.
                </p>
              </div>
            </div>

            {/* Middle Card */}
            <div className="flex flex-col gap-5">
              <div className="relative aspect-square overflow-hidden bg-black/5">
                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80" alt="Royal Family Suite" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <h3 className="font-display text-lg uppercase tracking-widest mb-3 flex items-center justify-between text-[#241919]">
                  BLUE PEARL GRANITE <span className="text-xl font-light">↗</span>
                </h3>
                <p className="text-[9px] uppercase tracking-widest text-[#747474] leading-relaxed">
                  ENGINEERED PERFECTION AND RESILIENCE FOR MODERN KITCHENS.
                </p>
              </div>
            </div>

            {/* Bottom Card (offset to the right) */}
            <div className="flex flex-col gap-5 pl-0 md:pl-16">
              <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
                <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80" alt="Executive Suite Hill View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <h3 className="font-display text-lg uppercase tracking-widest mb-3 flex items-center justify-between text-[#241919]">
                  PREMIUM QUARTZITE <span className="text-xl font-light">↗</span>
                </h3>
                <p className="text-[9px] uppercase tracking-widest text-[#747474] leading-relaxed">
                  THE ULTIMATE BLEND OF NATURAL BEAUTY AND INCREDIBLE STRENGTH.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>



      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>
  );
}
