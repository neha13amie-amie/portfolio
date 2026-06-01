import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi'
import styles from './Footer.module.css'

const QUICK_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

const SOCIALS = [
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/neha', label: 'LinkedIn' },
  { icon: <FiGithub />, href: 'https://github.com/neha', label: 'GitHub' },
  { icon: <FiMail />, href: 'mailto:neha@email.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <a href="#home" className={`${styles.brand} gradient-text`}>Neha</a>
          <p className={styles.tagline}>CS · Electronics · Mathematics</p>
          <p className={styles.bio}>Building digital experiences with code and creativity.</p>
        </div>

        <div>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            {QUICK_LINKS.map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className={styles.footLink}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={styles.colTitle}>Connect</h4>
          <div className={styles.socials}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} className={styles.socialIcon} aria-label={s.label} target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Neha. Built with React &amp; ❤️</p>
      </div>
    </footer>
  )
}
