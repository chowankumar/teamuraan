import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import * as THREE from 'three';
import emailjs from '@emailjs/browser';

emailjs.init({ publicKey: 'Jz9bj5v9gJJlcavUj' });

const Scene = () => {
  const mountRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_res: { value: new THREE.Vector2(width, height) },
        u_color: { value: new THREE.Color("#FE8535") }
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform vec2 u_res;
        uniform vec3 u_color;
        varying vec2 vUv;
        float noise(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        void main() {
          vec2 st = gl_FragCoord.xy / u_res.xy;
          float aspect = u_res.x / u_res.y;
          st.x *= aspect;
          vec2 m = u_mouse;
          m.x *= aspect;
          float d = distance(st, m);
          float glow = 0.08 / (d + 0.15);
          float n = noise(st + u_time * 0.1);
          glow *= (0.8 + n * 0.2);
          float alpha = smoothstep(0.8, 0.2, d);
          gl_FragColor = vec4(u_color, glow * alpha * 0.6);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMouseMove = (e) => {
      const rect = mountRef.current.getBoundingClientRect();
      targetMouse.current.x = (e.clientX - rect.left) / rect.width;
      targetMouse.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animate = (t) => {
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.05;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.05;
      material.uniforms.u_time.value = t * 0.001;
      material.uniforms.u_mouse.value.set(mouse.current.x, mouse.current.y);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const ContactSection = () => {
  const [focused, setFocused] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm('service_iomgprj', 'template_baqgonn', formRef.current)
      .then(() => {
        setStatus('success');
        formRef.current.reset();
      })
      .catch((err) => {
        console.error('EmailJS send failed:', err);
        setStatus('error');
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const inputClasses = "w-full bg-transparent border-b border-white/20 py-5 md:py-4 focus:outline-none text-white transition-all placeholder:text-gray-600 autofill:shadow-[0_0_0_30px_#141414_inset] [-webkit-text-fill-color:white]";

  return (
    <section className="bg-[#141414] text-[#FAF7F2] min-h-200 py-20 md:py-24 px-6 relative overflow-hidden  flex items-center" id="contact">
      <Scene />

      <AnimatePresence>
        {status && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 left-6 right-6 md:left-1/2 md:-translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-3xl bg-black/80 border border-[#FE8535]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            {status === 'success' ? (
              <><FiCheckCircle className="text-[#FE8535] text-2xl" /> <span className="text-sm font-bold uppercase tracking-widest">Sent Successfully</span></>
            ) : (
              <><FiAlertCircle className="text-red-500 text-2xl" /> <span className="text-sm font-bold uppercase tracking-widest">Failed to Send</span></>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#FE8535] uppercase tracking-[0.5em] text-[10px] md:text-xs font-black mb-4 md:mb-6 block"
            >
              Get in Touch
            </motion.span>
            
            <h2 className="text-[15vw] md:text-[100px] font-black leading-[0.8] mb-8 md:mb-12 tracking-tighter uppercase">
              Let's <br /> 
              <span  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Create</span> <br /> 
              Together.
            </h2>
            
            <div className="space-y-4 md:space-y-6">
              <p className="text-gray-500 uppercase text-[10px] md:text-xs tracking-[0.3em] font-bold">Inquiries</p>
             <button
             
                className="text-2xl md:text-3xl font-bold hover:text-[#FE8535] transition-all flex items-center gap-4 group"
              >
             +92 331 1380533
                <FiArrowUpRight className="text-[#FE8535] group-active:translate-x-2 group-active:-translate-y-2 transition-transform" />
             </button>
             <button
             
                className="text-2xl md:text-3xl font-bold hover:text-[#FE8535] transition-all flex items-center gap-4 group"
              >
            +92 332 1763674
                <FiArrowUpRight className="text-[#FE8535] group-active:translate-x-2 group-active:-translate-y-2 transition-transform" />
             </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] md:bg-white/[0.03] backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 shadow-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FE8535]/10 blur-[80px] -z-10" />
            
            <form ref={formRef} onSubmit={sendEmail} className="space-y-10 md:space-y-12">
              <div className="relative group">
                <input 
                  type="text" name="name" required placeholder="Full Name"
                  onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                  className={inputClasses}
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: focused === 'name' ? '100%' : '0%' }} 
                  className="absolute bottom-0 left-0 h-[2px] bg-[#FE8535] shadow-[0_0_10px_#FE8535]" 
                />
              </div>

              <div className="relative group">
                <input 
                  type="email" name="email" required placeholder="Email Address"
                  onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                  className={inputClasses}
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: focused === 'email' ? '100%' : '0%' }} 
                  className="absolute bottom-0 left-0 h-[2px] bg-[#FE8535] shadow-[0_0_10px_#FE8535]" 
                />
              </div>

              <div className="relative group">
                <input 
                  type="tel" name="phone" required placeholder="Phone Number"
                  pattern="[0-9+\-\s()]{7,20}"
                  onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                  className={inputClasses}
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: focused === 'phone' ? '100%' : '0%' }} 
                  className="absolute bottom-0 left-0 h-[2px] bg-[#FE8535] shadow-[0_0_10px_#FE8535]" 
                />
              </div>

              <div className="relative group">
                <textarea 
                  name="message" required placeholder="Project Details" rows="1"
                  onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                  className={`${inputClasses} resize-none overflow-hidden min-h-[100px]`}
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: focused === 'message' ? '100%' : '0%' }} 
                  className="absolute bottom-0 left-0 h-[2px] bg-[#FE8535] shadow-[0_0_10px_#FE8535]" 
                />
              </div>

              <motion.button 
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSending}
                className="w-full bg-[#FE8535] disabled:bg-gray-800 text-black font-black py-5 md:py-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-xl shadow-[#FE8535]/20"
              >
                {isSending ? "In Transit..." : "Commit Message"} <FiSend size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;