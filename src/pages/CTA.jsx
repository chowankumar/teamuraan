import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import img from '../assets/compressedImages/CTAimg.webp';

const CTASection = () => {
  const whatsappNumber = "923001380534";
  const calendlyLink = "https://calendly.com/your-profile";

  return (
    <>
     
      <section className="hidden md:block py-24 px-6 text-center">
        <h2 className="text-7xl font-extrabold tracking-wide mb-8 ">
          DESIGN <span className="text-[#FE8535] font-extrabold text-6xl text-center ">✦</span> CAPTURE <span className="text-[#FE8535] text-6xl text-center ">✦</span> CREATE
        </h2>

        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-0.5 w-131 bg-black"></div>
          <span className="text-black text-3xl">✦</span>
          <div className="h-0.5 w-131 bg-black"></div>
        </div>

        {/* IMAGE CONTAINER - DESKTOP */}
        <div className="max-w-6xl mx-auto rounded-3xl h-[400px] mb-8 overflow-hidden relative group">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={img} 
            className="w-full h-full object-cover"
            alt="CTA Background"
          />
          {/* Subtle dark overlay to match the brand feel */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <p className="max-w-2xl mx-auto text-[#000000] mb-8">
          Finding the right team for your business can be overwhelming.
          Let Team Uraan take the guesswork out of the process and help
          you find the perfect fit for your brand.
        </p>

        <div className="flex justify-center items-center gap-4">
          <a href={`https://wa.me/${+923001380534}`} target="_blank" rel="noopener noreferrer" className="bg-[#222222] text-white px-10 cursor-pointer py-3 rounded-full hover:bg-[#FE8535] transition-all duration-300 flex items-center gap-2 font-semibold">
            <FaWhatsapp className="text-xl" /> Hire Us Now
          </a>
       
        </div>
      </section>

      {/* ============================================================
          MOBILE/TABLET VERSION
          ============================================================ */}
      <section className="block md:hidden bg-[#FAF7F2] py-16 px-4 overflow-hidden">
        <div className="relative">
          <motion.div 
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-0 mb-8"
          >
            <h2 className="text-[14vw] font-black leading-[0.85] tracking-tighter text-[#111]">
              DESIGN <span className="text-[#FE8535] italic font-light lowercase text-[10vw]">✦</span>
            </h2>
            <h2 className="text-[14vw] font-black leading-[0.85] tracking-tighter text-[#111] self-end">
              CAPTURE <span className="text-[#FE8535] italic font-light lowercase text-[10vw]">✦</span>
            </h2>
            <h2 className="text-[14vw] font-black leading-[0.85] tracking-tighter text-[#111]">
              CREATE
            </h2>
          </motion.div>

          <div className="w-full flex items-center gap-2 mb-10 opacity-30">
             <div className="h-[1px] flex-grow bg-black" />
             <span className="text-xs">✦</span>
             <div className="h-[1px] w-12 bg-black" />
          </div>

          {/* IMAGE CONTAINER - MOBILE */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full rounded-[1rem] aspect-video mb-10 shadow-2xl relative overflow-hidden"
          >
            {/* Background Image */}
            <img 
              src={img} 
              className="absolute inset-0  w-full h-full object-cover" 
              alt="Team Uraan CTA"
            />
            
            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Your Original Soft Grain Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg leading-[1.4] text-black font-medium mb-12 px-2 border-l-2 border-[#FE8535] ml-2"
          >
            Finding the right team shouldn't be overwhelming. Let <span className="font-bold">Team Uraan</span> take the guesswork out.
          </motion.p>

          <div className="flex flex-col gap-4 px-2">
            <motion.a 
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${whatsappNumber}`}
              className="bg-[#111] text-white py-5 rounded-2xl flex items-center justify-center gap-4 shadow-xl shadow-black/10 transition-colors active:bg-[#FE8535]"
            >
              <FaWhatsapp className="text-2xl text-[#FE8535]" />
              <span className="font-bold uppercase tracking-widest text-sm">Hire Us Now</span>
            </motion.a>

        
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;