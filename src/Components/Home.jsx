import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Services from './Services'
import background from './bg about.png'
import ProjectsSection from './Project'
import Testimonials from './Testinomial'
import ContactSection from './Contact'
import CTASection from './CTA'
import Footer from './Footer'
import Design from './Design'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero/>
      <div
        className="mx-auto px-4  text-[#FAF6EC] w-full min-h-450 flex flex-col justify-center items-center  relative z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div data-aos="fade-up"><About/></div>
        <div data-aos="fade-up "><Services/></div>
      </div>
      <div data-aos="fade-up" className='z-50'><Design/></div>

      <div data-aos="fade-up" id="project-section">
        <ProjectsSection />
      </div>
      <div data-aos="fade-up"><Testimonials/></div>
      <div data-aos="fade-up"><CTASection/></div>
      <div data-aos="fade-up"><ContactSection/></div>

      <Footer/>
    </>
  )
}

export default Home