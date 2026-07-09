import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import img1 from '../assets/compressedImages/p2.webp'
import img2 from '../assets/compressedImages/p1.webp'
import img3 from '../assets/compressedImages/p4.webp'
import img4 from '../assets/compressedImages/p3.webp'

const services = [
  {
    id: 1,
    slug: "content-creation",
    title: "Content Creation",
    image: img1,
    summary: "Turning your social media platforms into engagement engines that attract, convert, and retain customers.",
    details: [
      "From eye-catching visuals to compelling captions, we build a content system for your brand — not just one-off posts. Every piece is designed to stop the scroll and move people to act.",
      "Our strategies go beyond likes and comments. We focus on lead generation, conversions, and sustainable growth, using a content calendar built around what your audience actually responds to.",
      "This includes short-form video concepts, carousel design, caption writing, and a consistent visual identity across every platform you're active on."
    ]
  },
  {
    id: 2,
    slug: "digital-marketing",
    title: "Digital Marketing",
    image: img2,
    summary: "Performance-driven campaigns using SEO, paid ads, and analytics to increase visibility and measurable ROI.",
    details: [
      "We design and run digital marketing campaigns with one goal: measurable return. That means clear KPIs before a single dollar is spent, not vague 'brand awareness' promises.",
      "Our approach combines SEO to build long-term organic visibility, paid ads (Meta, Google, TikTok) for immediate reach, and ongoing analytics so every campaign gets sharper over time.",
      "You get transparent reporting on traffic, conversions, and cost-per-result — no guesswork, just numbers you can act on."
    ]
  },
  {
    id: 3,
    slug: "video-photography",
    title: "Video & Photography",
    image: img3,
    summary: "High-quality videos and photography that capture attention, tell stories, and elevate your brand.",
    details: [
      "Visuals are often the first impression a customer has of your brand — we make sure it's a strong one. Our team handles everything from concept to final edit.",
      "This covers product photography, brand shoots, short-form reels, and longer brand films, all shot and edited to match your brand's tone and platform requirements.",
      "Every shoot is planned around how the content will actually be used — ads, website, social — so nothing gets wasted."
    ]
  },
  {
    id: 4,
    slug: "restaurant-pos",
    title: "Restaurant POS",
    image: img4,
    summary: "Smart POS solutions that streamline restaurant operations and enhance customer experience.",
    details: [
      "We help restaurants set up point-of-sale systems that actually match how their floor and kitchen operate — not a generic one-size-fits-all install.",
      "This includes order management, menu configuration, staff access controls, and integration with your existing payment and inventory tools.",
      "The result is faster order turnaround, fewer errors at the counter, and a smoother experience for both staff and customers."
    ]
  },
];

const ServicesPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <main className="w-full bg-[#FAF6EC] text-[#222222] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#FE8535] transition-colors mb-12"
        >
          <FiArrowLeft /> Back Home
        </Link>

        <p className="text-[#FE8535] uppercase tracking-[0.4em] text-xs font-black mb-4">
          What We Do
        </p>
        <h1 className="text-[12vw] md:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
          Our Services
        </h1>
        <p className="text-[#222222]/70 text-base md:text-lg max-w-2xl leading-relaxed">
          Everything Team Uraan offers, in detail. Jump to any service below, or scroll
          through to see how each one fits into growing your brand.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-black/10 hover:border-[#FE8535] hover:text-[#FE8535] transition-colors"
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        {services.map((s, i) => (
          <motion.section
            key={s.slug}
            id={s.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-24 border-t border-black/10 scroll-mt-28"
          >
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="rounded-3xl overflow-hidden h-64 md:h-96 shadow-xl">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <span className="text-[#FE8535] font-black text-sm">0{i + 1}</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2 mb-5 leading-none">
                {s.title}
              </h2>
              <p className="text-[#222222]/80 font-medium mb-6">{s.summary}</p>
              <div className="space-y-4">
                {s.details.map((p, idx) => (
                  <p key={idx} className="text-sm md:text-base text-[#222222]/70 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24 text-center">
        <Link
          to="/#contact"
          className="inline-flex items-center gap-2 bg-[#222222] text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#FE8535] transition-all group"
        >
          Start a Project
          <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </main>
  );
};

export default ServicesPage;