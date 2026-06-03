import { FiGithub, FiMail, FiLinkedin } from 'react-icons/fi'
import styles from './Footer.module.css'

const year = 2026

const NAVIGATE = [
  { title: 'About', href: '#about' },
  { title: 'Skills', href: '#skills' },
  { title: 'Projects', href: '#projects' },
  { title: 'Experience', href: '#experience' },
  { title: 'Contact', href: '#contact' },
]

const MORE = [
  { title: 'Certifications', href: '#certifications' },
  { title: 'Resume', href: '#resume' },
  { title: 'Email', href: 'mailto:neha7army@gmail.com' },
  { title: 'GitHub', href: 'https://github.com/neha13amie-amie' },
]

const SOCIALS = [
  { icon: <FiGithub className={styles.icon} />, link: 'https://github.com/neha13amie-amie', label: 'GitHub' },
  { icon: <FiLinkedin className={styles.icon} />, link: 'https://linkedin.com/in/neha', label: 'LinkedIn' },
  { icon: <FiMail className={styles.icon} />, link: 'mailto:neha7army@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRule} />

        <div className={styles.grid}>
          {/* Brand block */}
          <div className={styles.brandCol}>
            <a href="#home" className={`${styles.brand} gradient-text`}>Neha</a>
            <p className={styles.tagline}>
              CS, Electronics &amp; Mathematics student building thoughtful digital experiences.
            </p>
            <div className={styles.socials}>
              {SOCIALS.map((item) => (
                <a
                  key={item.label}
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noreferrer"
                  href={item.link}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate column */}
          <div className={styles.linkCol}>
            <span className={styles.colLabel}>Navigate</span>
            <div className={styles.linkList}>
              {NAVIGATE.map(({ href, title }) => (
                <a key={title} className={styles.link} href={href}>{title}</a>
              ))}
            </div>
          </div>

          {/* More column */}
          <div className={styles.linkCol}>
            <span className={styles.colLabel}>More</span>
            <div className={styles.linkList}>
              {MORE.map(({ href, title }) => (
                <a key={title} className={styles.link} href={href} target={href.startsWith('#') ? undefined : '_blank'} rel="noreferrer">{title}</a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottomRule} />
        <p className={styles.copy}>© {year} Neha. All rights reserved.</p>
      </div>
    </footer>
  )
}
