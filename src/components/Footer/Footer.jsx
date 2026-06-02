import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi'
import styles from './Footer.module.css'

const QUICK_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

const SOCIALS = [
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/neha', label: 'LinkedIn' },
  { icon: <FiGithub />, href: 'https://github.com/neha13amie-amie', label: 'GitHub' },
  { icon: <FiMail />, href: 'mailto:neha7army@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.brandBlock}>
            <a href="#home" className={styles.bigName}>Neha</a>
          </div>
          <div className={styles.rightBlock}>
            <p className={styles.tagline}>CS · Electronics · Mathematics</p>
            <div className={styles.socials}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.socialBtn}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <nav className={styles.quickLinks}>
            {QUICK_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className={styles.quickLink}>
                {link}
              </a>
            ))}
          </nav>
          <p className={styles.copy}>© 2026 Neha. Built with React.</p>
        </div>
      </div>
    </footer>
  )
}
