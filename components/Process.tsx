"use client";

import { motion } from "framer-motion";

const processSteps = [
  {
    id: 1,
    title: "Research & Ideation",
    desc: "We start by understanding user needs, market trends, and business goals to generate innovative product ideas.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    progress: 35,
    time: "~1 week",
    isActive: true,
  },
  {
    id: 2,
    title: "Design & Development",
    desc: "Concepts evolve into tangible experiences through structured UX design, polished interfaces, and agile engineering.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    progress: 70,
    time: "~3 weeks",
    isActive: true,
  },
  {
    id: 3,
    title: "Production & Quality Testing",
    desc: "Each element of the product undergoes thorough validation. We test functionality, usability, accessibility, and performance.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    progress: 0,
    time: "~1 month",
    isActive: false,
  },
  {
    id: 4,
    title: "Launch & Support",
    desc: "Once launched, we monitor performance, resolve issues quickly, and continuously refine the product.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    progress: 0,
    time: "Launch Completed",
    isActive: false,
  }
];

export default function Process() {
  return (
    <section className="py-24 md:py-32 bg-white w-full border-t border-gray-100 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium mb-4">
            Process
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Product Development Lifecycle
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            We follow a streamlined lifecycle that ensures reliability and excellence at every stage from requirements to launch. Our lifecycle is built around clarity, collaboration, and continuous improvement.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Desktop Connecting Line Background */}
          <div className="hidden lg:block absolute top-6 left-6 right-6 h-[1.5px] bg-gray-100 -z-10" />
          {/* Desktop Connecting Line Active (Black) - hardcoded to reach halfway through step 2 to match mockup */}
          <div className="hidden lg:block absolute top-6 left-6 w-[40%] h-[1.5px] bg-gray-900 -z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col">
                
                {/* Icon Circle */}
                <div className="mb-6 lg:mb-8 self-start bg-white pr-4 lg:pr-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors ${
                    step.isActive 
                      ? "bg-gray-900 border-gray-900 text-white" 
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  }`}>
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-8 flex-1">
                  {step.desc}
                </p>

                {/* Progress Bar Area */}
                <div className="mt-auto">
                  {/* Progress Line */}
                  <div className="relative h-[3px] w-full bg-gray-100 rounded-full mb-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${step.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full bg-gray-900 rounded-full"
                    />
                  </div>
                  
                  {/* Bottom Labels */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">{step.time}</span>
                    <span className="text-gray-600 font-bold">{step.progress}%</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
