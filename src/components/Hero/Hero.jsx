import { FiArrowDown } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import nehaPhoto from '../../assets/images/neha.jpeg'
import styles from './Hero.module.css'

const TICKER_ITEMS = [
  'Web Development', 'UI/UX Design', 'Electronics', 'Mathematics',
  'C Programming', 'MATLAB', 'Circuit Design', 'Figma', 'Git & GitHub', 'Canva',
]

export default function Hero() {
  const revealRef = useScrollReveal()

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container} ref={revealRef}>

        {/* ── Left / Text column ── */}
        <div className={styles.textCol}>

          {/* 1. Eyebrow */}
          <div data-reveal data-delay="1">
            <span className={styles.eyebrow}>Portfolio 2025 — Bangalore, India</span>
          </div>

          {/* 2. Giant name */}
          <div data-reveal data-delay="2">
            <p className={styles.hello}>Hello, I'm</p>
            <h1 className={styles.name}>Neha</h1>
          </div>

          {/* 4. Bio with left border */}
          <div data-reveal data-delay="3">
            <p className={styles.bio}>
              A CS, Electronics &amp; Mathematics student who builds web apps,
              designs interfaces, and solves problems across code, circuits, and calculus.
            </p>
          </div>

          {/* 5. Chip tags */}
          <div data-reveal data-delay="4" className={styles.chips}>
            {['Web Development', 'UI/UX Design', 'Electronics', 'Mathematics'].map(tag => (
              <span key={tag} className={styles.chip}>{tag}</span>
            ))}
          </div>

          {/* 6. CTA buttons */}
          <div data-reveal data-delay="5" className={styles.buttons}>
            <a href="#projects" className="gradient-btn">View Projects →</a>
            <a href="#contact" className="outline-btn">Contact Me</a>
          </div>
        </div>

        {/* ── Right / Photo column ── */}
        <div className={styles.decoCol} data-reveal data-delay="3">
          <div className={styles.photoWrap}>
            <img src={nehaPhoto} alt="Neha" className={styles.photo} />
          </div>
          <span className={styles.photoTitle}>Student</span>
        </div>
      </div>

      {/* Skills ticker */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              {item} <span className={styles.tickerDot}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll-down arrow */}
      <a href="#about" className={styles.scrollDown} aria-label="Scroll to About">
        <FiArrowDown size={22} />
      </a>
    </section>
  )
}
