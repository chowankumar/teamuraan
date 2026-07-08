import React, { useState, useEffect } from 'react'
import logo from './../assets/compressedImages/Logo.png'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll on mobile when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Testimonials", id: "testimonials" },
  ];

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Motion variants
  const menuBgVariants = {
    initial: { scaleY: 0 },
    animate: { 
      scaleY: 1, 
      transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] } 
    },
    exit: { 
      scaleY: 0, 
      transition: { delay: 0.4, duration: 0.8, ease: [0.85, 0, 0.15, 1] } 
    }
  };

  const containerVariants = {
    animate: {
      transition: { staggerChildren: 0.08, delayChildren: 0.3 }
    }
  };

  const linkVariants = {
    initial: { y: 100, rotateX: -90, opacity: 0 },
    animate: { 
      y: 0, 
      rotateX: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } 
    },
    exit: { 
      y: -20, 
      opacity: 0, 
      transition: { duration: 0.4, ease: "easeIn" } 
    }
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-4 md:top-6 left-0 w-full z-50 px-4"
    >
      <nav className="max-w-5xl mx-auto px-4 md:px-6 py-2 bg-[#faf7f0]/80 backdrop-blur-xl rounded-full border border-white/20 shadow-lg relative z-[70]">
        <div className="flex items-center justify-between">
          
          <motion.img 
            onClick={() => scrollToSection('home')}
            src={logo} 
            className="h-8 md:h-10 px-2 md:px-4 cursor-pointer" 
            alt="Logo" 
          />

          {/* DESKTOP LINKS */}
          <ul className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <motion.li
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ y: -2 }}
                className="relative group cursor-pointer text-sm text-[#FE8535] uppercase tracking-tight font-medium"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FE8535] transition-all duration-300 group-hover:w-full" />
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <motion.button 
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block bg-[#FE8535] text-sm md:text-base text-white px-5 md:px-7 py-2.5 md:py-3 rounded-full"
            >
              Contact Us
            </motion.button>

            {/* HAMBURGER BUTTON */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden flex-col gap-1.5 p-3 relative z-[80]"
              aria-label="Toggle Mobile Menu"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className={`w-6 h-0.5 block origin-center ${isOpen ? 'bg-[#141414]' : 'bg-[#FE8535]'}`}
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-[#FE8535] block"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className={`w-6 h-0.5 block origin-center ${isOpen ? 'bg-[#141414]' : 'bg-[#FE8535]'}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              variants={menuBgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 bg-[#FE8535] z-[61] origin-top md:hidden"
            />

            {/* Foreground overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[62] flex flex-col justify-center px-6 md:hidden overflow-hidden"
              style={{ perspective: "1000px" }}
            >
              <motion.div 
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <p className="text-[#FE8535] text-xs font-bold tracking-[0.2em] mb-4">NAVIGATION</p>
                {navLinks.map((link) => (
                  <div key={link.id} className="overflow-hidden py-1">
                    <motion.button
                      variants={linkVariants}
                      onClick={() => scrollToSection(link.id)}
                      className="text-4xl font-black text-[#141414] text-left uppercase tracking-tighter italic w-full text-ellipsis"
                    >
                      {link.name}
                    </motion.button>
                  </div>
                ))}
              </motion.div>

              {/* Footer inside mobile overlay */}
             
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar;
