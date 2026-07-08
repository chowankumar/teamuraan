import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectModal = ({ isOpen, project, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);

  // 1. STABILITY: Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
    document.body.style.overflow = "unset";
  }, [isOpen, onClose]);

  // 2. GALLERY: Reset slide index when a new project opens
  useEffect(() => {
    if (isOpen) setActiveImg(0);
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} 
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-0 md:p-10"
     
      >
        {/* Click outside to close (Desktop) */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-5xl bg-white md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* --- MODAL HEADER --- */}
          <div className="px-8 py-6 flex justify-between items-center border-b border-gray-100 bg-white z-20">
            <div>
              <h4 className="text-2xl font-black uppercase tracking-tighter text-black leading-none">
                {project.title}
              </h4>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mt-1">
                {project.category}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-sm hover:scale-110 active:scale-90 transition-transform"
            >
              ✕
            </button>
          </div>

          {/* --- MODAL BODY (SCROLLABLE) --- */}
          <div className="flex-1 overflow-y-auto bg-[#fcfcfc]">
            {/* Gallery Progress Bar */}
            <div className="sticky top-0 z-30 flex gap-1 px-8 py-4 bg-white/80 backdrop-blur-md">
              {project.gallery?.map((_, i) => (
                <div key={i} className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: activeImg === i ? "100%" : activeImg > i ? "100%" : "0%" }}
                    className="h-full bg-orange-500"
                  />
                </div>
              ))}
            </div>

            {/* Main Content Padding */}
            <div className="p-6 md:p-12 space-y-10">
              
              {/* Image Slideshow Area */}
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-100 shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={project.gallery[activeImg]}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-contain md:object-cover"
                  />
                </AnimatePresence>

                {/* Left/Right Click Zones */}
                <div className="absolute inset-0 flex">
                  <div 
                    className="w-1/2 h-full cursor-w-resize" 
                    onClick={() => setActiveImg(prev => (prev === 0 ? project.gallery.length - 1 : prev - 1))}
                  />
                  <div 
                    className="w-1/2 h-full cursor-e-resize" 
                    onClick={() => setActiveImg(prev => (prev === project.gallery.length - 1 ? 0 : prev + 1))}
                  />
                </div>
              </div>

              {/* Text / Context Area */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-gray-100 pt-10">
                <div className="md:col-span-2">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Project Story</h5>
                  <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed italic">
                    "Creating a unique visual language for {project.title} required a deep dive into the brand's core values and target audience."
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Services</h5>
                    <p className="text-xs font-bold uppercase">{project.category}</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Date</h5>
                    <p className="text-xs font-bold uppercase">January 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- MODAL FOOTER --- */}
          <div className="p-8 border-t border-gray-100 bg-white" >
            <button className="w-full py-5 bg-black text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-orange-500 transition-colors shadow-lg shadow-black/10">
              Launch Live Project
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;