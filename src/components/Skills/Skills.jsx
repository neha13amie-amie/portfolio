import {
  FiPenTool, FiDatabase, FiGithub,
  FiMessageSquare, FiUsers, FiTarget, FiStar, FiCpu, FiTool, FiGrid,
  FiMonitor, FiBarChart2
} from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import ScrollStack, { ScrollStackItem } from '../Projects/ScrollStack'
import styles from './Skills.module.css'

const ALL_SKILLS = [
  {
    category: 'Design & Tools',
    items: [
      { icon: <FiPenTool />, name: 'Figma', desc: 'UI/UX wireframing, prototyping and design systems' },
      { icon: <FiGrid />, name: 'Canva', desc: 'Digital creatives, social media graphics, and visual content' },
      { icon: <FiMonitor />, name: 'MS Office / Excel', desc: 'Data analysis, reporting, presentations, and spreadsheets' },
    ],
    accent: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(99,102,241,0.03))',
  },
  {
    category: 'Engineering & Science',
    items: [
      { icon: <FiCpu />, name: 'C Programming', desc: 'Algorithms, data structures, and low-level problem solving' },
      { icon: <FiBarChart2 />, name: 'MATLAB', desc: 'Mathematical modelling, simulations, and signal analysis' },
      { icon: <FiTool />, name: 'Circuit Design', desc: 'Component handling, troubleshooting, and circuit assembly' },
    ],
    accent: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.03))',
  },
  {
    category: 'Data & Version Control',
    items: [
      { icon: <FiDatabase />, name: 'SQL / DBMS', desc: 'Relational databases, queries, and data management' },
      { icon: <FiGithub />, name: 'Git & GitHub', desc: 'Version control, branching, and collaborative workflows' },
    ],
    accent: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(236,72,153,0.03))',
  },
  {
    category: 'Soft Skills',
    items: [
      { icon: <FiMessageSquare />, name: 'Communication', desc: 'Fluent in English, Hindi, Kannada & Tamil — clear verbal and written' },
      { icon: <FiUsers />, name: 'Teamwork', desc: 'Collaborative mindset with cross-functional experience' },
      { icon: <FiTarget />, name: 'Problem Solving', desc: 'Analytical approach to breaking down complex challenges' },
      { icon: <FiStar />, name: 'Leadership', desc: 'Organized and motivated teams as Tech & Electronics Secretary' },
    ],
    accent: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(236,72,153,0.08))',
  },
]

export default function Skills() {
  const ref = useScrollReveal()

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.header} ref={ref}>
        <span className="section-label">WHAT I KNOW</span>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">My Skills</h2>
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
        {ALL_SKILLS.map((group, i) => (
          <ScrollStackItem key={group.category} itemClassName={styles.stackCard}>
            <div className={styles.cardInner} style={{ background: group.accent }}>
              <div className={styles.cardTop}>
                <span className={styles.cardNum}>0{i + 1}</span>
                <h3 className={styles.cardCategory}>{group.category}</h3>
              </div>
              <div className={styles.skillGrid}>
                {group.items.map(skill => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillIcon}>{skill.icon}</span>
                      <span className={styles.skillName}>{skill.name}</span>
                    </div>
                    <p className={styles.skillDesc}>{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}
