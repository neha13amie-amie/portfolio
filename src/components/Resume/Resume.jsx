import { FiDownload, FiFileText } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Resume.module.css'

export default function Resume() {
  const ref = useScrollReveal()

  return (
    <section id="resume" className={styles.resume}>
      <div className="section" ref={ref}>
        <p className={styles.label}>MY RESUME</p>
        <h2 className={`section-title gradient-text ${styles.centered}`} data-reveal data-delay="1">Resume</h2>
        <p className={`section-subtitle ${styles.centered}`} data-reveal data-delay="2">
          Download my latest resume to learn more about my background.
        </p>

        <div className={styles.cardOuter} data-reveal data-delay="3">
          <div className="card-wrapper" style={{maxWidth: 600, margin: '0 auto'}}>
            <div className={`card-inner ${styles.card}`}>
              <div className={styles.previewIcon}>
                <FiFileText size={48} />
              </div>
              <h3 className={styles.resumeName}>Neha's Resume</h3>
              <p className={styles.updated}>Last updated: June 2026</p>
              <div className={styles.lines}>
                <div className={styles.line} />
                <div className={styles.line} style={{width:'75%'}} />
                <div className={styles.line} style={{width:'85%'}} />
                <div className={styles.line} style={{width:'60%'}} />
              </div>
              <a
                href="/resume.pdf"
                download="Neha_Resume.pdf"
                className={`gradient-btn ${styles.downloadBtn}`}
              >
                <FiDownload /> Download Resume
              </a>
              <p className={styles.note}>Click to download the latest version of my resume.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
