import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import star from '../assets/compressedImages/Star2.webp'
import img from "../assets/compressedImages/p5.webp"
import design1 from '../assets/compressedImages/design1.avif'
import design2 from '../assets/compressedImages/design2.avif'
import design3 from '../assets/compressedImages/design3.avif'
const steps = [
  {
    title: "Discovery",
    desc: "We start by getting to know our clients, their business goals, and their target audience.",
    image: design1,
  },
  {
    title: "Strategy",
    desc: "We develop a strategy that outlines the design approach, user experience, and key features.",
    image: design2,
  },
  {
    title: "Design",
    desc: "We work closely with our clients to refine visuals and user experience.",
    image: img
  },
  {
    title: "Development",
    desc: "Our developers bring the final design to life with scalable solutions.",
    image: design3,
  },
];

const ProcessCard = ({ step, index }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const brightness = useTransform(scrollYProgress, [0, 1], ["100%", "40%"]);

  return (
    <div 
      ref={containerRef} 
      className="sticky top-[10vh] md:relative mb-[4vh] md:mb-0" // Reduced mb from 10vh to 4vh
    >
      <motion.div
        style={{ 
          scale: typeof window !== "undefined" && window.innerWidth < 768 ? scale : 1,
          filter: typeof window !== "undefined" && window.innerWidth < 768 ? `brightness(${brightness})` : "none",
          opacity: typeof window !== "undefined" && window.innerWidth < 768 ? opacity : 1
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: typeof window !== "undefined" && window.innerWidth >= 768 ? -10 : 0 }}
        className="group bg-[#161616] rounded-[40px] md:rounded-[52px] p-6 md:p-8 flex flex-col border border-white/5 md:border-white/10 hover:border-[#FE8535]/40 transition-colors duration-500 z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.6)] md:shadow-none" // Reduced padding p-8->p-6
      >
        <div className="flex justify-between items-start mb-4"> {/* Reduced mb-6 to mb-4 */}
          <div className="flex flex-col">
              <span className="text-[#FE8535] text-[10px] font-bold uppercase tracking-[0.3em] mb-0.5">Step</span>
              <span className="text-white group-hover:text-[#FE8535] text-4xl font-black transition-colors duration-500"> {/* Reduced text size slightly */}
                {String(index + 1).padStart(2, "0")}
              </span>
          </div>
          
          <motion.div 
            className="bg-[#FE8535] p-2.5 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-[#FE8535]/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </motion.div>
        </div>

        <div className="relative rounded-[24px] md:rounded-[28px] h-[200px] sm:h-[240px] md:h-[280px] mb-5 overflow-hidden"> {/* Reduced height and mb-8 to mb-5 */}
          <motion.img 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={step.image} 
            alt={step.title}
            className="w-full h-full object-cover grayscale-[0.2] md:grayscale-[1] group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
        </div>

        <h4 className="text-2xl md:text-3xl text-[#FAF6EC] font-bold mb-2 uppercase tracking-tighter"> {/* Reduced text size and mb-4 to mb-2 */}
          {step.title}
        </h4>

        <p className="text-[#999] group-hover:text-white text-base leading-snug transition-colors duration-500 max-w-[95%] md:max-w-full">
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
};

const Process = () => {
  return (
    <section className="relative bg-[#0A0A0A] text-white py-16 md:py-25 overflow-hidden"> {/* Reduced py-24/33 to py-16/20 */}
      
      <div className="absolute top-0 w-full h-8 md:hidden block bg-[#ffffff] origin-bottom-left" /> {/* Reduced h-12 to h-8 */}
      <div className="absolute md:top-0 top-5 left-0 w-full h-12 bg-[#FE8535] md:-skew-y-0 skew-y-1 origin-top-left z-10 flex items-center overflow-hidden  shadow-2xl"> {/* Reduced height and top offset */}
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-black font-black uppercase text-lg mx-4 flex items-center">
              Discovery <span className="mx-4 text-lg">★</span> Strategy <span className="mx-4 text-lg">★</span> Design <span className="mx-4 text-lg">★</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-14 mt-12 md:mt-8"> {/* Reduced mt-16 to mt-12/8 */}
        <div className="relative text-left md:text-center max-w-4xl mx-auto mb-12 md:mb-16"> {/* Reduced mb-20/24 to mb-12/16 */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[13vw] sm:text-6xl md:text-8xl font-black mb-4 uppercase tracking-tighter leading-[0.85]" // Slightly smaller text and mb-8 to mb-4
          >
            How Our <br className="md:hidden" /> <span className="text-[#FE8535] italic">Design</span> <br /> Process Works
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#888] text-sm md:text-base max-w-2xl mx-auto font-medium leading-tight"
          >
           Katalyst Studio follows a collaborative and iterative approach to design, with a focus on understanding and meeting the unique needs of each client.
          </motion.p>
        </div>

        <motion.img 
          src={star} 
          alt="" 
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          animate={{ rotate: 360 }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 8, ease: "linear" },
            scale: { duration: 0.8 }
          }}
          className="absolute h-8 md:h-10 top-0 left-0 md:left-10 z-0 opacity-50 md:opacity-100" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:relative md:bottom-12 md:gap-8 mb-12 relative"> {/* Reduced gap and mb-20 to mb-12 */}
          {steps.map((step, i) => (
            <ProcessCard key={i} step={step} index={i} />
          ))}
        </div>

        <motion.img 
          src={star} 
          alt="" 
          initial={{ scale: 0, rotate: 180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          animate={{ rotate: -360 }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 12, ease: "linear" },
            scale: { duration: 0.8 }
          }}
          className="absolute h-10 md:h-12 top-[10%] right-0 md:right-14 z-0 opacity-40 md:opacity-100" 
        />
      </div>

      <div className="absolute bottom-8 left-0 w-full h-12 bg-[#FE8535] -skew-y-1 origin-bottom-right z-10 flex justify-center items-center overflow-hidden ">
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-black font-black uppercase text-lg mx-4 flex items-center">
              Innovation ★ Execution ★ Precision ★
            </span>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 w-full h-8 bg-[#ffffff] origin-bottom-left" />
    </section>
  );
};

export default Process;