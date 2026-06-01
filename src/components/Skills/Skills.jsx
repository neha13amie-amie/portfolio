import { useEffect, useRef } from 'react'
import {
  FiCode, FiLayers, FiZap, FiBox, FiPenTool, FiDatabase, FiGithub,
  FiMessageSquare, FiUsers, FiTarget, FiStar
} from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Skills.module.css'

const TECH_SKILLS = [
  { icon: <FiCode />, name: 'HTML', level: 90 },
  { icon: <FiLayers />, name: 'CSS', level: 85 },
  { icon: <FiZap />, name: 'JavaScript', level: 80 },
  { icon: <FiBox />, name: 'React', level: 75 },
  { icon: <FiPenTool />, name: 'Figma', level: 80 },
  { icon: <FiDatabase />, name: 'SQL', level: 70 },
  { icon: <FiGithub />, name: 'Git & GitHub', level: 85 },
]

const SOFT_SKILLS = [
  { icon: <FiMessageSquare />, name: 'Communication', desc: 'Clear verbal and written communication across teams' },
  { icon: <FiUsers />, name: 'Teamwork', desc: 'Collaborative mindset with cross-functional experience' },
  { icon: <FiTarget />, name: 'Problem Solving', desc: 'Analytical approach to breaking down complex challenges' },
  { icon: <FiStar />, name: 'Leadership', desc: 'Organized and motivated teams as Tech & Electronics Secretary' },
]

function SkillCard({ icon, name, level }) {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bar.style.width = `${level}%`
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(bar.parentElement)
    return () => observer.disconnect()
  }, [level])

  return (
    <div className="card-wrapper">
      <div className={`card-inner ${styles.techCard}`}>
        <div className={styles.skillIcon}>{icon}</div>
        <div className={styles.skillName}>{name}</div>
        <div className={styles.progressTrack}>
          <div ref={barRef} className={styles.progressBar} style={{ width: 0 }} />
        </div>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useScrollReveal()

  return (
    <section id="skills" className={styles.skills}>
      <div className="section" ref={ref}>
        <p className={styles.label}>WHAT I KNOW</p>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">My Skills</h2>
        <p className="section-subtitle" data-reveal data-delay="2">
          A blend of technical expertise and soft skills built through study and experience.
        </p>

        <h3 className={styles.subHeading} data-reveal data-delay="2">Technical Skills</h3>
        <div className={styles.techGrid} data-reveal data-delay="3">
          {TECH_SKILLS.map(s => <SkillCard key={s.name} {...s} />)}
        </div>

        <h3 className={`${styles.subHeading} ${styles.subHeadingSpaced}`} data-reveal data-delay="2">Soft Skills</h3>
        <div className={styles.softGrid} data-reveal data-delay="3">
          {SOFT_SKILLS.map(s => (
            <div key={s.name} className="card-wrapper">
              <div className={`card-inner ${styles.softCard}`}>
                <div className={styles.softIcon}>{s.icon}</div>
                <h4 className={styles.softName}>{s.name}</h4>
                <p className={styles.softDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
