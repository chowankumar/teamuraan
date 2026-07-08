 import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Lenis from 'lenis'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

const Home  = React.lazy(() => import("./Pages/Home"))
const AboutPage = React.lazy(() => import("./Pages/AboutPage"))
const ServicesPage = React.lazy(() => import("./Pages/Servicespage"))
// import Home from './Pages/Home'
// import AboutPage from './Pages/AboutPage'
// import ServicesPage from './Pages/Servicespage';

const App = () => {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    AOS.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out',
    })

    return () => lenis.destroy()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App