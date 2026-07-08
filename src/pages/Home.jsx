import React from 'react'
// import Navbar from '../Components/Navbar'
//import Hero from '../Components/Hero'
// import About from './About'
// import Services from './Services'
import background from '../assets/compressedImages/bg about.webp'
// import ProjectsSection from './Project'
//import Testimonials from './Testinomial'
//import ContactSection from './Contact'
//import CTASection from './CTA'
//import Footer from '../Components/Footer'
//import Design from './Design'

const Services = React.lazy(() => import("./Services"));
const ProjectsSection = React.lazy(() => import("./Project"));
const About = React.lazy(() => import("./About"));
const Testimonials = React.lazy(() => import("./Testinomial"));
const ContactSection = React.lazy(() => import("./Contact"));
const CTASection = React.lazy(() => import("./CTA"))
const Footer = React.lazy(() => import("../Components/Footer"))
const Design = React.lazy(() => import("./Design"))
const Hero = React.lazy(() => import("../Components/Hero"))
const Navbar = React.lazy(() => import("../pages/Navbar"))

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