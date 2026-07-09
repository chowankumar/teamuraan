import React, { useEffect, Suspense } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Lenis from 'lenis'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

const Home = React.lazy(() => import("./Pages/Home"))
const AboutPage = React.lazy(() => import("./Pages/AboutPage"))
const ServicesPage = React.lazy(() => import("./Pages/Servicespage"))

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
      <Suspense fallback={<div className="min-h-screen bg-[#141414]" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App