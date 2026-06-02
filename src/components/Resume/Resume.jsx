import { FiDownload, FiCalendar, FiUser, FiCode } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Resume.module.css'

const HIGHLIGHTS = [
  { icon: <FiUser />, label: 'Background', value: 'B.Sc. CS, Electronics & Mathematics' },
  { icon: <FiCode />, label: 'Focus Areas', value: 'Web Dev · UI/UX · Electronics' },
  { icon: <FiCalendar />, label: 'Last Updated', value: 'June 2026' },
]

export default function Resume() {
  const ref = useScrollReveal()

  return (
    <section id="resume" className={styles.resume}>
      <div className="section" ref={ref}>
        <span className="section-label">MY RESUME</span>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">Resume</h2>

        <div className={styles.layout} data-reveal data-delay="2">

          {/* Left — description block */}
          <div className={styles.descBlock}>
            <p className={styles.description}>
              A second-year B.Sc. Computer Science, Electronics &amp; Mathematics student with
              hands-on experience in web development, UI/UX design, and electronics. Skilled in
              C, MATLAB, Figma, and modern web tools. Proven leadership as Tech &amp; Electronics
              Secretary and practical experience through a Product Development internship.
              Passionate about building impactful digital solutions and growing across both
              technical and organizational domains.
            </p>

            <hr className={styles.divider} />

            <div className={styles.highlights}>
              {HIGHLIGHTS.map(h => (
                <div key={h.label} className={styles.highlightRow}>
                  <span className={styles.hlIcon}>{h.icon}</span>
                  <span className={styles.hlLabel}>{h.label}</span>
                  <span className={styles.hlValue}>{h.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — download CTA */}
          <div className={styles.ctaBlock}>
            <p className={styles.ctaEyebrow}>READY TO DOWNLOAD</p>
            <p className={styles.ctaName}>Neha's Resume</p>
            <p className={styles.ctaNote}>PDF · Latest version</p>
            <a
              href="/Neha_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={`gradient-btn ${styles.downloadBtn}`}
            >
              <FiDownload />
              Download Resume
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
