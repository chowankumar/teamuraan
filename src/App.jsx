 import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Lenis from 'lenis'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import AboutPage from './Components/AboutPage'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App