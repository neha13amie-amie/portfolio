import { FiExternalLink } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    num: '01',
    title: 'Admin Portal Dashboard',
    description: 'A full-featured admin dashboard with data visualization, user management, and a fully responsive layout. Designed to streamline business operations.',
    tech: ['React', 'CSS', 'JavaScript', 'Chart.js'],
    demo: 'https://fruitopia-nine.vercel.app/admin/login',
    github: '#',
    accent: 'linear-gradient(135deg, rgba(96, 73, 90,0.15), rgba(96, 73, 90,0.05))',
  },
  {
    num: '02',
    title: 'E-commerce Website',
    description: 'A modern e-commerce platform featuring product listings, cart functionality, and a complete checkout flow with a clean, mobile-first design.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    demo: 'https://fruitopia-nine.vercel.app/',
    github: '#',
    accent: 'linear-gradient(135deg, rgba(63, 50, 68,0.15), rgba(47, 34, 53,0.05))',
  },
]

export default function Projects() {
  const ref = useScrollReveal()

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.header} ref={ref}>
        <span className="section-label">WHAT I'VE BUILT</span>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">Projects</h2>
      </div>

      <ScrollStack
        useWindowScroll={true}
        itemDistance={200}
        itemScale={0.03}
        itemStackDistance={30}
        stackPosition="20%"
        scaleEndPosition="10%"
        baseScale={0.85}
        blurAmount={0}
        rotationAmount={0}
      >
        {PROJECTS.map(p => (
          <ScrollStackItem key={p.title} itemClassName={styles.stackCard}>
            <div className={styles.cardInner} style={{ background: p.accent }}>
              <div className={styles.cardNum}>{p.num}</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.description}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.tags}>
                    {p.tech.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                  </div>
                  <div className={styles.links}>
                    <a href={p.demo} className={styles.iconBtn} target="_blank" rel="noreferrer" aria-label="Live demo">
                      <FiExternalLink />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}
