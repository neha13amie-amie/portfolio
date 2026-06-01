import { MdVerified } from 'react-icons/md'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Certifications.module.css'

const CERTS = [
  { name: 'Your Certification Name', issuer: 'Issuing Organization', date: 'Month Year' },
  { name: 'Your Certification Name', issuer: 'Issuing Organization', date: 'Month Year' },
  { name: 'Your Certification Name', issuer: 'Issuing Organization', date: 'Month Year' },
]

export default function Certifications() {
  const ref = useScrollReveal()

  return (
    <section id="certifications" className={styles.certs}>
      <div className="section" ref={ref}>
        <p className={styles.label}>CREDENTIALS</p>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">Certifications</h2>
        <p className="section-subtitle" data-reveal data-delay="2">
          Courses and certifications that have shaped my skills.
        </p>

        <div className={styles.grid}>
          {CERTS.map((cert, i) => (
            <div key={i} className="card-wrapper" data-reveal data-delay={String(i + 2)}>
              <div className={`card-inner ${styles.card}`}>
                <div className={styles.iconWrap}>
                  <MdVerified size={32} />
                </div>
                <h3 className={styles.certName}>{cert.name}</h3>
                <p className={styles.issuer}>{cert.issuer}</p>
                <span className={styles.date}>{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
