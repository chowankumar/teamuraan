 import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import star from '../assets/compressedImages/Star1.png';
import img from '../assets/compressedImages/about img.webp'
import img1 from './../assets/compressedImages/about img2.jpg'


export default function About() {
  const { scrollYProgress } = useScroll();
  
  const smoothY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), {
    stiffness: 100,
    damping: 30
  });

  const rotateStar = useTransform(scrollYProgress, [0, 1], [20, 360]);

  const lineVariant = {
    hidden: { y: "110%", skewY: 10 },
    visible: { 
      y: 0, 
      skewY: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="w-full flex items-center justify-center bg-center scroll-m-2 relative py-20 overflow-x-hidden" id='about'>
      <div className="px-6 md:px-8 grid md:grid-cols-2 gap-9 max-w-347 items-start relative">
        
        {/* THE STAR */}
        <motion.img 
          style={{ rotate: rotateStar }}
          src={star} 
          className='h-16 md:h-24 z-30 top-[30%] md:top-[50%] absolute pointer-events-none opacity-50 md:opacity-100' 
          alt="star decoration" 
        />

        {/* LEFT COLUMN: Text Content */}
        <div className="space-y-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="overflow-hidden">
              <motion.h2 variants={lineVariant} className="text-[15vw] md:text-6xl font-extrabold uppercase text-[#222222] leading-[0.9] md:leading-tight">
                About
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2 variants={lineVariant} className="text-[15vw] md:text-6xl font-extrabold uppercase text-[#222222] leading-[0.9] md:leading-tight">
                Team Uraan
              </motion.h2>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-gray-700 text-base md:text-lg leading-tight max-w-md mt-6 md:mt-6"
            >
              At Team Uraan, we transform brands through powerful social media 
              storytelling and data driven marketing strategies. We specialize in 
              crafting captivating content that doesn’t just look good it delivers 
              measurable results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6"
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#222222] text-white px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#FE8535] transition-all group"
              >
                Learn More About Us
                <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
          
          {/* LANDSCAPE BOX with Image */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover="hover"
            className="bg-gray-200 rounded-3xl h-48 md:h-64 w-full mt-6 md:mt-10 shadow-xl overflow-hidden group relative cursor-pointer"
          >
              {/* Added Image here */}
              <motion.img 
                src={img} 
                variants={{ hover: { scale: 1.1 } }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full object-cover" 
                alt="About Team Uraan Landscape"
              />
              
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FE8535]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/3 h-full bg-white/10 skew-x-[25deg] pointer-events-none"
              />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Tall Portrait Box with Image */}
        <motion.div 
          style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? smoothY : 0 }}
          className="h-full flex flex-col pt-4 md:pt-0"
        >
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover="hover"
            className="bg-gray-200 rounded-3xl h-[450px] md:h-[600px] w-full  overflow-hidden group relative cursor-pointer"
          >
            {/* Added Image here */}
            <motion.img 
              src={img1} 
              variants={{ hover: { scale: 1.05 } }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover" 
              alt="About Team Uraan Portrait"
            />

            <div className="absolute inset-0 bg-[#FE8535]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute bottom-6 left-6 md:hidden z-20">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white drop-shadow-md">Our Essence ✦</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}