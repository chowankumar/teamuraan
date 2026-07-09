import React, { Suspense } from 'react'
import Navbar from '../pages/Navbar'
import Hero from '../Components/Hero'
import background from '../assets/compressedImages/bg about-optimized.webp'

const Services = React.lazy(() => import("./Services"));
const ProjectsSection = React.lazy(() => import("./Project"));
const About = React.lazy(() => import("./About"));
const Testimonials = React.lazy(() => import("./Testinomial"));
const ContactSection = React.lazy(() => import("./Contact"));
const CTASection = React.lazy(() => import("./CTA"));
const Footer = React.lazy(() => import("../Components/Footer"));
const Design = React.lazy(() => import("./Design"));

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <div
        className="mx-auto px-4 text-[#FAF6EC] w-full min-h-450 flex flex-col justify-center items-center relative z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Suspense fallback={null}>
          <div data-aos="fade-up"><About /></div>
        </Suspense>
        <Suspense fallback={null}>
          <div data-aos="fade-up"><Services /></div>
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <div data-aos="fade-up" className="z-50"><Design /></div>
      </Suspense>

      <Suspense fallback={null}>
        <div data-aos="fade-up" id="project-section">
          <ProjectsSection />
        </div>
      </Suspense>

      <Suspense fallback={null}>
        <div data-aos="fade-up"><Testimonials /></div>
      </Suspense>

      <Suspense fallback={null}>
        <div data-aos="fade-up"><CTASection /></div>
      </Suspense>

      <Suspense fallback={null}>
        <div data-aos="fade-up"><ContactSection /></div>
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Home