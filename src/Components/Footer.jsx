import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter, } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from './logo2.png';

const Footer = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax for the massive background text
  const xMove = useTransform(scrollYProgress, [0.8, 1], [-20, -150]);
  const opacityFade = useTransform(scrollYProgress, [0.9, 1], [0.1, 0.4]);

  // Unified data structure to fix the "socialLinks is not defined" error
  const socialIcons = [
    {
      name: "Instagram",
      handle: "@teamuraan.marketing",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/teamuraan.marketing",
      label: "Instagram",
    },
    {
      name: "Facebook",
      handle: "Team Uraan",
      icon: <FaFacebookF />,
      url: "https://www.facebook.com/profile.php?id=61566306183826",
      label: "Facebook",
    },
    {
      name: "LinkedIn",
      handle: "team-uraan",
      icon: <FaLinkedinIn />,
      url: "https://www.linkedin.com/company/team-uraanproductioncompany/",
      label: "LinkedIn",
    },
    {
      name: "Twitter",
      handle: "@teamuraan",
      icon: <FaXTwitter/>,
      url: "https://x.com/teamuraan",
      label: "Twitter",
    },
  ];

  return (
    <footer className="bg-[#0D0D0D] text-white pt-20 pb-6 px-6 relative overflow-hidden">
      
      {/* ============================================================
          DESKTOP VERSION
          ============================================================ */}
      <div className="hidden md:block max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-14">
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="Team Uraan Logo" className="h-10 w-auto object-contain" />
            <h2 className="text-4xl font-bold tracking-tight">
              Team <span className="text-[#FE8535]">Uraan</span>
            </h2>
          </div>
          <p className="text-gray-400 tracking-[0.3em] uppercase text-xs font-light">
            Design <span className="text-[#FE8535]">✦</span> Capture <span className="text-[#FE8535]">✦</span> Create
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          {socialIcons.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="w-11 h-11 rounded-full border border-white/10 
                         flex items-center justify-center 
                         text-white text-lg
                         hover:bg-[#FE8535] hover:border-[#FE8535] 
                         hover:text-black hover:scale-110 
                         transition-all duration-300"
            >
              {item.icon}
            </a>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-6">
          <div className="flex items-center gap-2 group cursor-default">
            <span className="text-gray-500 text-sm">Powered by</span>
            <span className="text-white font-bold tracking-wider group-hover:text-[#FE8535] transition-colors duration-300">HayViral</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FE8535] animate-pulse" />
          </div>
          <p className="text-sm text-gray-500 font-medium">© 2026 Team Uraan. All rights reserved.</p>
        </div>
      </div>

      {/* ============================================================
          MOBILE/TABLET VERSION
          ============================================================ */}
      <div className="block md:hidden">
        {/* Massive Parallax Background Label */}
        <motion.div 
          style={{ x: xMove, opacity: opacityFade }}
          className="absolute top-10 left-0 text-[35vw] font-black text-white pointer-events-none whitespace-nowrap leading-none tracking-tighter"
        >
          URAAN STUDIO
        </motion.div>

        <div className="relative z-10 flex flex-col min-h-[85vh]">
          
          {/* Top: The Statement */}
          <div className="pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 border border-[#FE8535] rounded-full mb-6"
            >
              <span className="text-[#FE8535] text-[10px] font-bold uppercase tracking-[0.3em]">Ready for Liftoff?</span>
            </motion.div>
            <h2 className="text-5xl font-black leading-[0.9] tracking-tighter mb-10">
              LET'S BUILD <br /> <span className="italic font-light text-[#FE8535]">SOMETHING</span> <br /> ICONIC.
            </h2>
          </div>

          {/* Middle: Kinetic Social List - Fixed to use socialIcons */}
          <div className="flex-grow flex flex-col justify-center gap-1">
            {socialIcons.map((item, i) => (
              <motion.a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98, x: 10 }}
                className="flex items-end justify-between py-8 border-b border-white/5 group"
              >
                <div>
                  <span className="block text-[10px] text-[#FE8535] font-bold uppercase tracking-[0.2em] mb-1">{item.name}</span>
                  <span className="text-2xl font-bold tracking-tight uppercase">{item.handle}</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-active:bg-[#FE8535] transition-colors">
                  <span className="text-xl">↗</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Bottom: Technical Metadata & Credit */}
          <div className="mt-16 space-y-10">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Local Time</p>
                <p className="text-lg font-mono tracking-tighter uppercase">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} PKT
                </p>
              </div>
              <div className="text-right">
                <img src={logo} alt="Logo" className="h-10 w-auto ml-auto mb-2 opacity-50" />
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Systems Operational</span>
                </div>
                <span className="text-[10px] text-gray-600">v2.0.26</span>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <p className="text-xs text-gray-500">© 2026 Team Uraan</p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest">A powered by</span>
                  <span className="text-[10px] font-black uppercase text-[#FE8535] tracking-widest">HAYVIRAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;