import { useState, useEffect } from 'react'
import GooeyNav from './GooeyNav'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.href.slice(1)))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = NAV_LINKS.findIndex(l => l.href.slice(1) === entry.target.id)
            if (idx !== -1) setActiveIndex(idx)
          }
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <GooeyNav
      items={NAV_LINKS}
      activeIndex={activeIndex}
      initialActiveIndex={0}
      particleCount={15}
      particleDistances={[90, 10]}
      particleR={100}
      animationTime={600}
      timeVariance={300}
      colors={[1, 2, 3, 1, 2, 3, 1, 4]}
    />
  )
}
