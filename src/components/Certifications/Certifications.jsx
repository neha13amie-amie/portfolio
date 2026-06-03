import { MdVerified, MdEmojiEvents, MdMilitaryTech, MdStar } from 'react-icons/md'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import ScrollStack, { ScrollStackItem } from '../Projects/ScrollStack'
import styles from './Certifications.module.css'

const CERTS = [
  { icon: <MdVerified size={26} />, title: 'Your Certification Name', sub: 'Issuing Organization · Month Year', accent: 'linear-gradient(135deg, rgba(96, 73, 90,0.12), rgba(96, 73, 90,0.03))' },
  { icon: <MdVerified size={26} />, title: 'Your Certification Name', sub: 'Issuing Organization · Month Year', accent: 'linear-gradient(135deg, rgba(63, 50, 68,0.12), rgba(63, 50, 68,0.03))' },
  { icon: <MdVerified size={26} />, title: 'Your Certification Name', sub: 'Issuing Organization · Month Year', accent: 'linear-gradient(135deg, rgba(47, 34, 53,0.12), rgba(47, 34, 53,0.03))' },
]

const ACHIEVEMENTS = [
  { icon: <MdEmojiEvents size={26} />, title: 'IIOS State Rank 9', sub: 'India International Olympiad of Science', accent: 'linear-gradient(135deg, rgba(96, 73, 90,0.12), rgba(96, 73, 90,0.03))' },
  { icon: <MdEmojiEvents size={26} />, title: 'IIOM State Rank 14', sub: 'India International Olympiad of Mathematics', accent: 'linear-gradient(135deg, rgba(63, 50, 68,0.12), rgba(63, 50, 68,0.03))' },
  { icon: <MdMilitaryTech size={26} />, title: 'NCC A Certificate', sub: 'National Cadet Corps — A Certificate (Cadet)', accent: 'linear-gradient(135deg, rgba(47, 34, 53,0.12), rgba(47, 34, 53,0.03))' },
  { icon: <MdStar size={26} />, title: 'Throwball Second Runner Up', sub: 'Inter-Class Throwball Match', accent: 'linear-gradient(135deg, rgba(96, 73, 90,0.1), rgba(47, 34, 53,0.06))' },
]

function StackList({ items }) {
  return (
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
      {items.map((item, i) => (
        <ScrollStackItem key={i} itemClassName={styles.stackCard}>
          <div className={styles.cardInner} style={{ background: item.accent }}>
            <span className={styles.cardIcon}>{item.icon}</span>
            <div className={styles.cardText}>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p className={styles.cardSub}>{item.sub}</p>
            </div>
          </div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  )
}

export default function Certifications() {
  const ref = useScrollReveal()

  return (
    <section id="certifications" className={styles.certs}>
      <div className={styles.header} ref={ref}>
        <span className="section-label">CREDENTIALS &amp; ACHIEVEMENTS</span>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">
          Certifications &amp; Achievements
        </h2>
      </div>

      {/* Certifications */}
      <div className={styles.block}>
        <h3 className={styles.blockHeading}>Certifications</h3>
        <StackList items={CERTS} />
      </div>

      {/* Achievements */}
      <div className={styles.block}>
        <h3 className={styles.blockHeading}>Achievements</h3>
        <StackList items={ACHIEVEMENTS} />
      </div>
    </section>
  )
}
