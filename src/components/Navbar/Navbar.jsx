import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Navbar.module.css'

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

function Tab({ children, href, setPosition }) {
  const ref = useRef(null)
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      className={styles.tab}
    >
      <a href={href}>{children}</a>
    </li>
  )
}

function Cursor({ position }) {
  return <motion.li animate={position} className={styles.cursor} />
}

export default function Navbar() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })

  // Keep scroll-spy working: no-op observer kept removed since cursor is hover-driven.
  // (Active section tracking dropped per request to use only this nav style.)
  useEffect(() => {}, [])

  return (
    <nav className={styles.nav}>
      <ul
        className={styles.list}
        onMouseLeave={() => setPosition(pv => ({ ...pv, opacity: 0 }))}
      >
        {NAV_LINKS.map(link => (
          <Tab key={link.href} href={link.href} setPosition={setPosition}>
            {link.label}
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>
    </nav>
  )
}
