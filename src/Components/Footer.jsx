import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import logo from '../assets/compressedImages/logo2.webp';

 

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const XTwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// ============================================================
// MAIN FOOTER COMPONENT
// ============================================================

const Footer = () => {
  const { scrollYProgress } = useScroll();
  const xMove = useTransform(scrollYProgress, [0.8, 1], [-20, -150]);
  const opacityFade = useTransform(scrollYProgress, [0.9, 1], [0.1, 0.4]);

  // Social Icons Data - Using SVG Icons
  const socialIcons = [
    {
      name: "Instagram",
      handle: "@teamuraan.marketing",
      icon: <InstagramIcon />,
      url: "https://www.instagram.com/teamuraan.marketing",
      label: "Instagram",
    },
    {
      name: "Facebook",
      handle: "Team Uraan",
      icon: <FacebookIcon />,
      url: "https://www.facebook.com/profile.php?id=61566306183826",
      label: "Facebook",
    },
    {
      name: "LinkedIn",
      handle: "team-uraan",
      icon: <LinkedInIcon />,
      url: "https://www.linkedin.com/company/team-uraanproductioncompany/",
      label: "LinkedIn",
    },
    {
      name: "Twitter",
      handle: "@teamuraan",
      icon: <XTwitterIcon />,
      url: "https://x.com/teamuraan",
      label: "Twitter",
    },
  ];

  return (
    <footer className="bg-[#0D0D0D] text-white pt-20 pb-6 px-6 relative overflow-hidden">
      
      
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
            <span className="text-white font-bold tracking-wider group-hover:text-[#FE8535] transition-colors duration-300"> Team Uraan</span>
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

          {/* Middle: Kinetic Social List */}
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
                  <span className="text-[10px] font-black uppercase text-[#FE8535] tracking-widest">Team Uraan</span>
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