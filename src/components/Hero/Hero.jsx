import { FiArrowDown } from 'react-icons/fi'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      {/* Decorative blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />

      <div className={styles.container}>
        {/* Text column */}
        <div className={styles.textCol}>
          <span className={styles.greeting}>👋 Hello, I'm</span>
          <h1 className={styles.name}>Neha</h1>
          <h2 className={`${styles.title} gradient-text`}>
            Computer Science, Electronics &amp; Mathematics Student
          </h2>
          <p className={styles.intro}>
            Passionate about technology, web development, UI/UX design.
            I enjoy creating innovative solutions and learning new technologies.
          </p>
          <div className={styles.buttons}>
            <a href="#projects" className="gradient-btn">View Projects</a>
            <a href="#contact" className="outline-btn">Contact Me</a>
          </div>
        </div>

        {/* Image column */}
        <div className={styles.imageCol}>
          <div className={styles.imageRing}>
            <div className={styles.imagePlaceholder}>
              <span>N</span>
            </div>
          </div>
          <span className={`${styles.badge} ${styles.badge1}`}>HTML5</span>
          <span className={`${styles.badge} ${styles.badge2}`}>React</span>
          <span className={`${styles.badge} ${styles.badge3}`}>Figma</span>
        </div>
      </div>

      <a href="#about" className={styles.scrollDown} aria-label="Scroll to About">
        <FiArrowDown size={24} />
      </a>
    </section>
  )
}
