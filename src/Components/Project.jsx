import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import arrow from "./Group 19.png";
import yumyumcover1 from './Artboard-WebP/Artboard 1.webp'
import shawarmacover2 from './Artboard-WebP/Artboard 4.webp'
import stovevlubcover3 from './Artboard-WebP/Artboard 5.webp'
import mistycover4 from './Artboard-WebP/Artboard 8.webp'
import naanstopcover5 from './Artboard-WebP/Artboard 9.webp'
import chaideewarcover6 from './Artboard-WebP/Artboard 11.webp'
import chollahcover7 from './Artboard-WebP/Artboard 13.webp'
import jazzycover8 from './Artboard-WebP/Artboard 16.webp'

import stoveimg1 from './Mockups-WebP/stove club.webp'
import stoveimg2 from './Mockups-WebP/stove club (2).webp'
import naanstopimg1 from './Mockups-WebP/naanstop.webp'
import naanstopimg2 from './Mockups-WebP/naanstop (2).webp'
import mistycafeimg1 from './Mockups-WebP/Misty Cafe.webp'
import mistycafeimg2 from './Mockups-WebP/Misty Cafe2.webp'
import Shawarmaimg1 from './Mockups-WebP/Shawarma Kaizer.webp'
import Shawarmaimg2 from './Mockups-WebP/Shawarma Kaizer1.webp'
import yumimg1 from './Mockups-WebP/yum yum.webp'
import yumimg2 from './Mockups-WebP/yum yum (2).webp'
import jazzyfood1 from './Mockups-WebP/Jazzy Foods.webp'
import jazzyfood2 from './Mockups-WebP/Jazzy Foods2.webp'
import cholaah1 from './Mockups-WebP/Choolaah.webp'
import cholaah2 from './Mockups-WebP/Choolaah1.webp'
import chai1 from './Mockups-WebP/CHAI DEEWARI.webp'
import chai2 from './Mockups-WebP/CHAI DEEWARI1.webp'

const dummyProjects = [
  { id: 1, title: "Yum Yum", category: "Food Branding", img: yumyumcover1, gallery: [yumimg1, yumimg2] },
  { id: 2, title: "Shawarma Kaizer", category: "Restaurant Identity", img: shawarmacover2, gallery: [Shawarmaimg1, Shawarmaimg2] },
  { id: 3, title: "The Stove Club", category: "Culinary Branding", img: stovevlubcover3, gallery: [stoveimg1, stoveimg2] },
  { id: 4, title: "Misty Cafe", category: "Cafe Branding", img: mistycover4, gallery: [mistycafeimg1, mistycafeimg2] },
  { id: 5, title: "Naanstop", category: "Digital Strategy", img: naanstopcover5, gallery: [naanstopimg1, naanstopimg2] },
  { id: 6, title: "Chai Deewari", category: "Content Creation", img: chaideewarcover6, gallery: [chai1, chai2] },
  { id: 7, title: "Choolaah", category: "Restaurant Branding", img: chollahcover7, gallery: [cholaah1, cholaah2] },
  { id: 8, title: "Jazzy Foods", category: "Photography", img: jazzycover8, gallery: [jazzyfood1, jazzyfood2] },
];

const ProjectsSection = () => {
  const [page, setPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const totalPages = Math.ceil(dummyProjects.length / 2);
  const visibleProjects = dummyProjects.slice(page * 2, page * 2 + 2);

  const nextProject = () => setPage((p) => (p + 1) % totalPages);
  const prevProject = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  const nextMobile = () => setMobileIndex((prev) => (prev + 1) % dummyProjects.length);
  const prevMobile = () => setMobileIndex((prev) => (prev - 1 + dummyProjects.length) % dummyProjects.length);

  useEffect(() => {
    if (!selectedProject) return;
    const timer = setTimeout(() => {
      setActiveImage((i) => (i + 1) % selectedProject.gallery.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeImage, selectedProject]);

  return (
    <section className="py-16 md:py-28 bg-[#ffffff] overflow-hidden relative" id="portfolio">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 md:px-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
            <span className="text-[#FE8535] font-bold tracking-[0.3em] text-[10px] uppercase block mb-2">Our Portfolio</span>
            <h2 className="text-5xl md:text-6xl font-black text-[#111] leading-[0.9] tracking-tighter">
              FEATURED <br /> <span className="italic font-light">PROJECTS</span>
            </h2>
          </motion.div>

          <div className="hidden md:flex items-center gap-4 mb-2">
            <div className="h-[1px] w-20 bg-black/20" />
            <span className="text-xl font-medium">0{page + 1} / 0{totalPages}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">

          <button onClick={prevProject} className="hidden md:flex w-10 h-10 rounded-full border border-black/10 items-center justify-center hover:bg-black hover:text-white transition-all">←</button>

          <div className="w-full">

            <div className="md:hidden relative w-full aspect-[4/5] max-h-[400px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileIndex}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -40) nextMobile();
                    else if (offset.x > 40) prevMobile();
                  }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  onClick={() => { setSelectedProject(dummyProjects[mobileIndex]); setActiveImage(0); }}
                  className="relative w-full h-full rounded-[30px] overflow-hidden shadow-xl"
                >
                  <img
                    src={dummyProjects[mobileIndex].img}
                    alt={dummyProjects[mobileIndex].title}
                    loading="eager"
                    decoding="async"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-0 left-0 w-full flex gap-1 px-8 pt-6">
                    {dummyProjects.map((_, i) => (
                      <div key={i} className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
                        {i === mobileIndex && <motion.div layoutId="activeTab" className="w-full h-full bg-[#FE8535]" />}
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent p-8 flex flex-col justify-end">
                    <span className="text-white/60 text-[9px] tracking-[0.3em] uppercase mb-1">{dummyProjects[mobileIndex].category}</span>
                    <h3 className="text-white text-2xl font-black uppercase tracking-tighter mb-4">{dummyProjects[mobileIndex].title}</h3>

                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-[2px] bg-white/20 overflow-hidden">
                        <motion.div animate={{ x: [-50, 50] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute inset-0 w-full h-full bg-[#FE8535]" />
                      </div>
                      <span className="text-white/40 text-[8px] font-bold uppercase tracking-[0.2em]">Swipe Project</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="hidden md:block">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={page}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {visibleProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      onClick={() => { setSelectedProject(project); setActiveImage(0); }}
                      whileTap={{ scale: 0.96 }}
                      className="relative group h-[400px] rounded-[40px] overflow-hidden cursor-pointer shadow-sm"
                    >
                      <motion.img
                        src={project.img}
                        alt={project.title}
                        loading={page === 0 && i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        width={480}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex">
                        <span className="text-white text-xs tracking-widest border border-white/40 px-6 py-2 rounded-full uppercase">View Case</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button onClick={nextProject} className="hidden md:flex w-10 h-10 rounded-full border border-black/10 items-center justify-center hover:bg-black hover:text-white transition-all">→</button>
        </div>

        <div className="mt-12 md:mt-20 text-center max-w-4xl mx-auto px-4">

          <div className="md:hidden flex flex-col items-center mb-10">
            <span className="text-[10px] font-black tracking-widest text-[#111] mb-2 uppercase">
              0{mobileIndex + 1} / 0{dummyProjects.length}
            </span>
            <div className="w-20 h-[1px] bg-black/10 relative overflow-hidden">
              <motion.div animate={{ width: `${((mobileIndex + 1) / dummyProjects.length) * 100}%` }} className="absolute inset-0 bg-black" />
            </div>
          </div>

          <div className="text-[9px]    md:text-[15px] flex  md:h-1 justify-between md:justify-around md:px-15 items-center md:text-sm text-[#888]    tracking-tight mb-6 font-medium">
            <p>Content Creation</p> <p>Digital Marketing</p> <p>Video - Photography</p>
          </div>
          <div className="md:flex justify-center  items-center">
            <h3 className="text-lg md:text-2xl md:h-9 font-black text-[#111] leading-[1.2] mb-8 ">
              The Stove Club, Naanstop, Chai Deewari, Jazzy Foods, Choolaah <br /> Yum Yum Hotpot, Misty Coffee Cafe, Shawarma Kaizer & More
            </h3>
            <motion.img src={arrow} alt="" loading="lazy" decoding="async" className="h-8 md:block hidden md:h-15  ml-4" />
          </div>
          <p className="text-[#666] text-xs md:block hidden md:text-base leading-relaxed max-w-2xl mx-auto">
            We start by getting to know our clients...
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="
                relative z-[501] w-full md:max-w-[980px]
                bg-white shadow-[0_40px_120px_rgba(0,0,0,0.4)]
                overflow-hidden rounded-t-[10px] md:rounded-[32px]
                flex flex-col md:flex-row
                h-[100dvh] md:h-[420px]
              "
            >
              <div className="relative w-full h-[60%] md:w-[60%] md:h-[420px] bg-neutral-900 overflow-hidden shrink-0">

                <button
                  onClick={() => setSelectedProject(null)}
                  className="md:hidden absolute top-8 right-8 z-[60] w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center text-xl active:scale-90 transition-transform"
                >
                  ✕
                </button>

                <div className="absolute inset-0 h-full w-full">
                  {selectedProject.gallery.map((img, i) => (
                    <motion.img
                      key={img}
                      src={img}
                      alt={`${selectedProject.title} preview ${i + 1}`}
                      decoding="async"
                      loading={i === 0 ? "eager" : "lazy"}
                      initial={false}
                      animate={{
                        opacity: i === activeImage ? 1 : 0,
                        scale: i === activeImage ? 1 : 1.1,
                      }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-10 left-10 right-10 flex gap-2 z-50">
                  {selectedProject.gallery.map((_, i) => (
                    <div key={i} className="flex-1 h-[3px] bg-white/20 rounded-full overflow-hidden">
                      {i === activeImage && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3, ease: "linear" }}
                          className="h-full bg-[#FE8535] shadow-[0_0_10px_#FE8535]"
                        />
                      )}
                      {i < activeImage && <div className="w-full h-full bg-[#FE8535]" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-[40%] flex flex-col p-8 md:p-12 bg-white justify-between">

                <div className="hidden md:block space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-[#FE8535] tracking-[0.35em] uppercase block">
                        {selectedProject.category}
                      </span>
                      <h3 className="text-black font-black uppercase text-[40px] tracking-tighter leading-[0.9]">
                        {selectedProject.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-10 h-10 rounded-full bg-black/5 hover:bg-black text-black hover:text-white transition-all flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-[15px] text-gray-400 font-medium leading-relaxed">
                    Experience the fusion of culinary identity and digital storytelling.
                    Focusing on clarity, motion, and emotional engagement.
                  </p>
                </div>

                <div className="mt-auto pt-6 md:pt-8 border-t border-neutral-100">
                  <div className="grid grid-cols-2 gap-y-6 md:gap-y-8">

                    <div className="flex flex-col gap-1 md:gap-2">
                      <span className="text-[8px] md:text-[9px] font-medium text-neutral-400 uppercase tracking-[0.2em]">
                        Reference
                      </span>
                      <span className="text-[10px] md:text-[11px] font-bold text-black uppercase tracking-wider">
                        {selectedProject.title}_026
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 md:gap-2 text-right">
                      <span className="text-[8px] md:text-[9px] font-medium text-neutral-400 uppercase tracking-[0.2em]">
                        Design System
                      </span>
                      <span className="text-[10px] md:text-[11px] font-bold text-black uppercase tracking-wider">
                        Boutique / Custom
                      </span>
                    </div>

                    <div className="col-span-2 pt-4 flex justify-between items-end">
                      <div className="space-y-1">
                        <div className="w-8 md:w-12 h-[1px] bg-black" />
                        <p className="text-[7px] md:text-[8px] text-neutral-400 uppercase tracking-[0.3em] leading-none pt-2">
                          Verified Premium Experience
                        </p>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-xs md:text-[14px] font-black text-black">01</span>
                        <span className="text-[10px] text-neutral-300">/</span>
                        <span className="text-[10px] text-neutral-300">04</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ProjectsSection;