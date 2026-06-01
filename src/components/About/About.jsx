import { FiCode, FiLayout, FiTrendingUp, FiCpu } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './About.module.css'

const INTERESTS = [
  { icon: <FiCode />, label: 'Web Development' },
  { icon: <FiLayout />, label: 'UI/UX Design' },
  { icon: <FiTrendingUp />, label: 'Digital Marketing' },
  { icon: <FiCpu />, label: 'Technology' },
]

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" className={styles.about}>
      <div className="section" ref={ref}>
        <div className={styles.grid}>
          {/* Left column */}
          <div>
            <p className={styles.label}>GET TO KNOW ME</p>
            <h2 className="section-title gradient-text" data-reveal data-delay="1">About Me</h2>
            <p className={styles.summary} data-reveal data-delay="2">
              I'm Neha, a passionate student pursuing a Bachelor's degree in Computer Science,
              Electronics and Mathematics. I love the intersection of technology and creativity —
              whether it's building responsive web applications, designing intuitive user interfaces,
              or exploring new digital tools.
            </p>
            <p className={styles.summary} data-reveal data-delay="3">
              My goal is to contribute to innovative projects that make a real-world impact while
              continuously growing my technical and professional skills. I thrive in collaborative
              environments and enjoy turning complex problems into simple, elegant solutions.
            </p>

            {/* Career objective */}
            <div className="card-wrapper" style={{marginTop:'1.5rem'}} data-reveal data-delay="3">
              <div className="card-inner">
                <h3 className={styles.cardTitle}>🎯 Career Objective</h3>
                <p className={styles.cardText}>
                  To secure a challenging role in technology where I can apply my skills in
                  software development, UI/UX design, and data-driven thinking to build
                  impactful digital products.
                </p>
              </div>
            </div>

            {/* Interests */}
            <div className={styles.interests} data-reveal data-delay="4">
              {INTERESTS.map(item => (
                <span key={item.label} className={styles.interestChip}>
                  {item.icon} {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — Education */}
          <div data-reveal data-delay="2">
            <p className={styles.label}>EDUCATION</p>
            <div className="card-wrapper" style={{marginTop:'1rem'}}>
              <div className={`card-inner ${styles.eduCard}`}>
                <div className={styles.eduDot} />
                <div>
                  <span className={styles.eduDegree}>B.Sc. Computer Science, Electronics &amp; Mathematics</span>
                  <p className={styles.eduInstitute}>University / College Name</p>
                  <p className={styles.eduYear}>2022 – 2025 (Expected)</p>
                  <ul className={styles.eduList}>
                    <li>Core focus: Algorithms, Data Structures, Digital Electronics, Calculus</li>
                    <li>Electives: Web Technologies, Database Management, UI/UX Principles</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-wrapper" style={{marginTop:'1.25rem'}}>
              <div className={`card-inner ${styles.statsGrid}`}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>7+</span>
                  <span className={styles.statLabel}>Tech Skills</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>2+</span>
                  <span className={styles.statLabel}>Projects</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>2</span>
                  <span className={styles.statLabel}>Experience Roles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
