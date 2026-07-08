import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import jibraelPhoto from '../assets/compressedImages/1.jpg';
import musabPhoto from '../assets/compressedImages/2.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const owners = [
  {
    name: 'Muhammad Jibrael',
    role: 'Co-Founder',
    photo: jibraelPhoto,
    bio: 'Muhammad Jibrael leads Team Uraan\'s strategy and client partnerships, bringing a sharp eye for brand storytelling and a drive to turn ambitious ideas into measurable growth.'
  },
  {
    name: 'Syed Musab',
    role: 'Co-Founder',
    photo: musabPhoto,
    bio: 'Syed Musab drives the creative and operational engine behind Team Uraan, overseeing content, campaigns, and the systems that keep every project running smoothly.'
  }
];

export default function AboutPage() {
  return (
    <main className="w-full bg-[#FAF6EC] text-[#222222] min-h-screen px-6 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#222222] hover:text-[#FE8535] transition-colors mb-12"
        >
          <FiArrowLeft /> Back Home
        </Link>

        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-[#FE8535] uppercase tracking-[0.4em] text-xs font-black mb-4">
            Who We Are
          </p>
          <h1 className="text-[12vw] md:text-6xl font-extrabold uppercase leading-[0.95] mb-8">
            About Team Uraan
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
            Team Uraan is a digital marketing agency built around brand storytelling and
            data-driven strategy. We help brands grow through social media, content, and
            campaigns that don't just look good — they deliver measurable results. From
            positioning to execution, our team works closely with every client to turn
            ideas into growth.
          </p>
        </motion.div>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mt-20 md:mt-28"
        >
          <p className="text-[#FE8535] uppercase tracking-[0.4em] text-xs font-black mb-3">
            Global Reach
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase mb-6">
            Our UK Setup
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
            Alongside our home base, Team Uraan operates a dedicated UK setup that lets us
            work directly with international clients on their own time zone and terms. It
            gives our UK-based partners local accessibility and faster turnarounds, while
            still drawing on the same team, standards, and strategy behind every Team Uraan
            project.
          </p>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mt-20 md:mt-28"
        >
          <p className="text-[#FE8535] uppercase tracking-[0.4em] text-xs font-black mb-3">
            The People Behind It
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase mb-10 md:mb-14">
            Owners
          </h2>

          <div className="grid sm:grid-cols-2 gap-10 md:gap-12">
            {owners.map((owner) => (
              <motion.div
                key={owner.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="rounded-3xl overflow-hidden bg-gray-200 h-80 md:h-96 shadow-xl">
                  <img
                    src={owner.photo}
                    alt={owner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="mt-6 text-xl md:text-2xl font-extrabold uppercase">
                  {owner.name}
                </h3>
                <p className="text-[#FE8535] text-xs font-bold uppercase tracking-widest mt-1 mb-3">
                  {owner.role}
                </p>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {owner.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </main>
  );
}