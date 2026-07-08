import React, { lazy, Suspense, useEffect, useState } from 'react';
import bg from './../assets/compressedImages/Backgroundhero.webp';
import { motion } from 'framer-motion';
import img1 from '../assets/compressedImages/./img (1).webp';
import img2 from '../assets/compressedImages/img (2).webp';
import img3 from '../assets/compressedImages/img (3).webp';
import img4 from '../assets/compressedImages/img (4).webp';

const Particles = lazy(() => import('react-tsparticles'));

const images = [img1, img2, img3, img4];

const Hero = () => {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768) {
      const id = requestIdleCallback
        ? requestIdleCallback(() => setShowParticles(true))
        : setTimeout(() => setShowParticles(true), 200);

      return () => {
        if (requestIdleCallback && typeof id !== 'number') {
          cancelIdleCallback(id);
        } else {
          clearTimeout(id);
        }
      };
    }
  }, []);

  const scrollToProject = () => {
    document.getElementById('project-section')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="home"
      className="w-full bg-[#FAF6EC] flex items-center justify-center relative overflow-hidden"
    >
      {showParticles && (
        <Suspense fallback={null}>
          <Particles
            options={{
              fpsLimit: 30,
              particles: {
                number: { value: 40 },
                color: { value: '#FE8535' },
                links: {
                  enable: true,
                  color: '#FE8535',
                  distance: 150,
                },
                move: {
                  enable: true,
                  speed: 0.3,
                },
                size: {
                  value: 2,
                  random: true,
                },
              },
            }}
            className="absolute inset-0 z-0"
          />
        </Suspense>
      )}

      <div
        className="mx-auto px-4 text-[#FAF6EC] w-full min-h-[150svh] md:min-h-220 flex flex-col justify-center items-center md:bottom-0 bottom-20 max-w-400 relative z-10"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="absolute inset-0 mx-auto max-w-400 w-full h-full z-10 pointer-events-none opacity-40 md:opacity-100"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.4) 1.5px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.4) 1.5px, transparent 1px)
            `,
            backgroundSize:
              'clamp(30px, 10vw, 60px) clamp(45px, 15vw, 90px)',
          }}
        />

        <div className="flex flex-col top-7 justify-center items-center text-center px-4 md:px-9 space-y-6 md:space-y-2 md:relative md:bottom-14 relative z-20 mt-10 md:mt-0">
          <motion.p
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="m-0 bg-[#FE8535] backdrop-blur-3xl px-3 py-2 rounded-full font-black uppercase tracking-widest shadow-2xl text-[10px] md:text-base md:relative md:top-9 md:-rotate-10"
          >
            Digital Marketing Agency
          </motion.p>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="hidden md:block m-0 font-black tracking-tighter text-[8rem] leading-none text-[#FAF6EC] uppercase"
          >
            Team Uraan
          </motion.h1>

          <h1 className="flex flex-col md:hidden m-0 font-black tracking-tighter text-[25vw] leading-[0.9] text-[#FAF6EC] uppercase text-center">
            <span className="block">Team</span>
            <span className="block">Uraan</span>
          </h1>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="m-0 text-xl md:text-4xl tracking-tight font-light max-w-[280px] md:max-w-[640px] leading-tight"
          >
            Elevating Brands. <span className="font-bold">Amplifying Success.</span>
          </motion.h3>

          <motion.button
            onClick={scrollToProject}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(254, 133, 53, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            className="m-0 bg-[#FAF6EC] text-[#FE8535] md:px-10 md:py-3 py-3 mt-4 md:w-full w-40 max-w-[260px] rounded-full font-black uppercase text-xs tracking-widest shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all"
          >
            Start Project
          </motion.button>
        </div>

        <div className="hidden md:flex justify-center z-10 items-center gap-3 md:relative md:top-0 mt-10">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={240}
              height={240}
              alt="Portfolio work"
              className={`w-60 h-60 object-cover relative top-30 rounded-lg shadow-lg ${
                idx % 2 === 0 ? 'rotate-6' : '-rotate-6'
              }`}
            />
          ))}
        </div>

        <div className="md:hidden w-full mt-12 px-4 z-30">
          <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="min-w-[70%] h-[35vh] rounded-2xl overflow-hidden shadow-xl border-2 border-white/20"
              >
                <img
                  src={img}
                   
                  alt="Portfolio work"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;