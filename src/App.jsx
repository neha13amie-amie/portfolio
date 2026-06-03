import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Certifications from './components/Certifications/Certifications'
import Resume from './components/Resume/Resume'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'
import { GradientBackground } from './components/GradientBackground/GradientBackground'
import styles from './App.module.css'

function LoadingScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1200)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className={styles.loader}>
      <span className={`${styles.loaderText} gradient-text`}>N</span>
    </div>
  )
}

function CursorGlow() {
  useEffect(() => {
    const glow = document.createElement('div')
    glow.id = 'cursor-glow'
    Object.assign(glow.style, {
      position: 'fixed', pointerEvents: 'none', zIndex: '9998',
      width: '400px', height: '400px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(96, 73, 90,0.12) 0%, transparent 70%)',
      transform: 'translate(-50%, -50%)',
      transition: 'left 0.08s ease, top 0.08s ease',
      left: '-999px', top: '-999px',
    })
    document.body.appendChild(glow)
    const move = e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px' }
    window.addEventListener('mousemove', move)
    return () => { window.removeEventListener('mousemove', move); glow.remove() }
  }, [])
  return null
}

function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, zIndex: 9999, height: '2px',
      width: pct + '%', background: 'linear-gradient(90deg,#3f3244,#2f2235,#bfc3ba)',
      transition: 'width 0.1s linear', pointerEvents: 'none',
    }} />
  )
}


function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.05,
      wheelMultiplier: 0.8,
    })
    window.__lenis = lenis
    let id
    function raf(time) {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
  return null
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <ThemeProvider>
      <GradientBackground />
      <SmoothScroll />
      <CursorGlow />
      <ScrollProgress />
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  )
}
