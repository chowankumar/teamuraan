import React from "react";
import { motion } from "framer-motion";

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0c]">
      {/* Volumetric Layer 1: Deep Purple Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-full h-full rounded-full bg-purple-900/30 blur-[120px]"
      />

      {/* Volumetric Layer 2: Warm Sunset Highlight */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -60, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-1/4 w-[80%] h-[80%] rounded-full bg-orange-600/10 blur-[100px]"
      />

      {/* Volumetric Layer 3: Soft Azure Depth */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, 40, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-1/4 left-1/3 w-full h-full rounded-full bg-blue-800/20 blur-[140px]"
      />

      {/* Premium Texture: Subtle Film Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: [0, 0.4, 0], 
            y: -200,
            x: Math.sin(i) * 50 
          }}
          transition={{ 
            duration: 10 + Math.random() * 10, 
            repeat: Infinity, 
            delay: i * 2 
          }}
          className="absolute w-[2px] h-[2px] bg-white rounded-full blur-[1px]"
          style={{
            left: `${10 + i * 15}%`,
            bottom: "10%",
          }}
        />
      ))}

      {/* Dark Vignette for Immersion */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

export default AuroraBackground;