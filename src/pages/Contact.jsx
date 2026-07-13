import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import emailjs from '@emailjs/browser';

const Scene = lazy(() => import('./Scene'));

emailjs.init({ publicKey: 'Hp-IPbCBAOEv53OCK' });

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

    emailjs.sendForm('service_znk136e', 'template_hicl5y8', formRef.current)
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
    <section className="bg-[#141414] text-[#FAF7F2] min-h-200 py-20 md:py-24 px-6 relative overflow-hidden flex items-center" id="contact">
      <style>{`
        .stroke-text {
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <Suspense fallback={null}>
        <Scene />
      </Suspense>

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
              <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Create</span> <br /> 
              Together.
            </h2>
            
            <div className="space-y-6 md:space-y-8">
              <p className="text-gray-500 uppercase text-[10px] md:text-[17px] tracking-[0.3em] font-bold">Inquiries</p>

              <div>
                <p className="text-gray-500 uppercase text-[9px] md:text-[15px] tracking-[0.25em] font-bold mb-1">Syed Musab</p>
                <button className="text-2xl md:text-[27px] font-bold hover:text-[#FE8535] transition-all flex items-center gap-4 group">
                  +92 331 1380533
                  <FiArrowUpRight className="text-[#FE8535] group-active:translate-x-2 group-active:-translate-y-2 transition-transform" />
                </button>
              </div>

              <div>
                <p className="text-gray-500 uppercase text-[9px] md:text-[15px] tracking-[0.25em] font-bold mb-1">Muhammad Jibrael</p>
                <button className="text-2xl md:text-[27px] font-bold hover:text-[#FE8535] transition-all flex items-center gap-4 group">
                  +92 332 1763674
                  <FiArrowUpRight className="text-[#FE8535] group-active:translate-x-2 group-active:-translate-y-2 transition-transform" />
                </button>
              </div>

              <div>
                <p className="text-gray-500 uppercase text-[9px] md:text-[15px] tracking-[0.25em] font-bold mb-1">Muhammad Jibrael — UK</p>
                <button className="text-2xl md:text-[27px] font-bold hover:text-[#FE8535] transition-all flex items-center gap-4 group">
                  +44 7745 335504
                  <FiArrowUpRight className="text-[#FE8535] group-active:translate-x-2 group-active:-translate-y-2 transition-transform" />
                </button>
              </div>
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
              {/* Fixed recipient — must match the "To Email" configured in your EmailJS template */}
              <input type="hidden" name="to_email" 
              value="connect.hello@teamuraanagency.com" />


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
                  pattern="[0-9+\s()-]{7,20}"
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
    </section>
  );
};

export default ContactSection;