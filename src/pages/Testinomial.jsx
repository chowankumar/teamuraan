import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const testimonials = [
    { name: "Sarah Jenkins", role: "CEO, The Stove Club", text: "Working with Team Uraan was an incredible experience. Their strategy and execution helped our brand scale faster than we expected." },
    { name: "Ali Ahmed", role: "Founder, Naanstop", text: "The creative vision they brought to our digital marketing was game-changing. We saw a 40% increase in engagement within two months." },
    { name: "Misty Coffee", role: "Manager, Misty Cafe", text: "Highly professional team. They captured the essence of our cafe through photography and video perfectly. Our customers love the new look." }
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const diagonalStyle = {
    clipPath: "polygon(0 5%, 100% 0, 100% 92%, 0 97%)",
  };

  return (
    <div className="relative overflow-hidden">
     
      <section 
        className="hidden md:block bg-[#141414] text-white py-32 px-6 relative z-10" id='testimonials' 
        style={diagonalStyle}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl absolute right-10" >✦</h1>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-6xl tracking-tight px-6 font-bold mb-6">
              Testimonials that Speak to Our Results
            </h2>
            <p className="text-[#AAAAAA] text-lg leading-tight px-17">
              Read through our testimonials to see why our clients love working with us 
              and how we can help you achieve your business goals through creative 
              and effective design.
            </p>
          </div>
          <h1 className="text-5xl absolute top-80 bottom-8 left-27">✦</h1>
          <div className="relative w-full overflow-visible">
            <div 
              className="flex gap-12 transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(calc(50% - (${currentIndex} * 45%) - 22.5%))` 
              }}
            >
              {testimonials.map((item, i) => (
                <div
                  key={i}
                  className={`min-w-[45%] bg-[#1E1E1E] p-10 rounded-2xl border transition-all duration-500 transform
                    ${i === currentIndex 
                      ? "opacity-100 scale-105 border-white/20 shadow-xl" 
                      : "opacity-30 scale-95 border-white/5"
                    } hover:border-white/20`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gray-600 rounded-full" />
                    <div>
                      <h4 className="font-semibold text-xl">{item.name}</h4>
                      <p className="text-sm text-gray-500 uppercase tracking-wider">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-12 relative z-30">
            <button onClick={handlePrev} className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90">‹</button>
            <button onClick={handleNext} className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all active:scale-90">›</button>
          </div>
        </div>
      </section>

      {/* ============================================================
          MOBILE/TABLET VERSION (NEW AWWARDS-STYLE UI)
          ============================================================ */}
      <section 
        className="block md:hidden bg-[#141414] text-white py-20 px-4 relative z-10" 
        style={{ clipPath: "polygon(0 2%, 100% 0, 100% 96%, 0 98%)" }}
      >
        <div className="max-w-full overflow-hidden">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-black tracking-tighter leading-none mb-4 px-2">
              CLIENTS <br /> <span className="text-[#FE8535] italic font-light">FEEDBACK</span>
            </h2>
            <p className="text-[#888] text-sm leading-relaxed px-2">
              Creative design that achieves business goals.
            </p>
          </motion.div>

          {/* Draggable Slider Area */}
          <div className="relative active:cursor-grabbing">
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -40) handleNext();
                else if (offset.x > 40) handlePrev();
              }}
              className="flex gap-4"
              animate={{ x: `calc(5% - (${currentIndex} * 88%))` }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
            >
              {testimonials.map((item, i) => (
                <motion.div
                  key={i}
                  className={`min-w-[85vw] bg-[#1E1E1E] p-8 rounded-[32px] border transition-colors duration-500
                    ${i === currentIndex ? "border-[#FE8535]/40" : "border-white/5 opacity-40"}
                  `}
                >
                  <p className="text-xl font-medium leading-relaxed mb-8">
                    "{item.text}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FE8535] to-[#141414] rounded-full" />
                    <div>
                      <h4 className="font-bold text-base">{item.name}</h4>
                      <p className="text-[10px] text-[#FE8535] uppercase tracking-[0.2em]">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Footer: Progress & Nav */}
          <div className="flex items-center justify-between mt-10 px-4">
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? "w-8 bg-[#FE8535]" : "w-2 bg-white/10"}`} 
                />
              ))}
            </div>
            
            <div className="flex gap-3">
              <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center active:bg-[#FE8535]">‹</button>
              <button onClick={handleNext} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center active:bg-[#FE8535]">›</button>
            </div>
          </div>
        </div>
      </section>

      {/* Orange Accent Cut */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-[#FE8535] -skew-y-3 origin-bottom-left" />
    </div>
  );
};

export default Testimonials;