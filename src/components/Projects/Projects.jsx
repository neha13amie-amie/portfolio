import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    initials: 'AD',
    title: 'Admin Portal Dashboard',
    description: 'A full-featured admin dashboard with data visualization, user management, and a fully responsive layout. Designed to streamline business operations.',
    tech: ['React', 'CSS', 'JavaScript', 'Chart.js'],
    demo: '#',
    github: '#',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    initials: 'EC',
    title: 'E-commerce Website',
    description: 'A modern e-commerce platform featuring product listings, cart functionality, and a complete checkout flow with a clean, mobile-first design.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    demo: '#',
    github: '#',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
  },
]

export default function Projects() {
  const ref = useScrollReveal()

  return (
    <section id="projects" className={styles.projects}>
      <div className="section" ref={ref}>
        <p className={styles.label}>WHAT I'VE BUILT</p>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">Projects</h2>
        <p className="section-subtitle" data-reveal data-delay="2">
          A selection of projects that showcase my skills and creativity.
        </p>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="card-wrapper" data-reveal data-delay={String(i + 2)}>
              <div className={`card-inner ${styles.card}`}>
                <div className={styles.imageArea} style={{ background: p.gradient }}>
                  <span className={styles.initials}>{p.initials}</span>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={styles.desc}>{p.description}</p>
                  <div className={styles.tags}>
                    {p.tech.map(t => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                  <div className={styles.buttons}>
                    <a href={p.demo} className={`gradient-btn ${styles.btn}`} target="_blank" rel="noreferrer">
                      <FiExternalLink /> Live Demo
                    </a>
                    <a href={p.github} className={`outline-btn ${styles.btn}`} target="_blank" rel="noreferrer">
                      <FiGithub /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
