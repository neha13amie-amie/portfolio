import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Experience.module.css'

const EXPERIENCE = [
  {
    role: 'Product Development & User Growth Intern',
    org: 'Company / Organization',
    period: '2024 – Present',
    responsibilities: [
      'Assisted in the development and improvement of digital products and user-facing features.',
      'Conducted market and user research to identify opportunities for growth.',
      'Collaborated with cross-functional teams to enhance user experience and engagement.',
      'Analyzed user feedback and performance metrics to support product decisions.',
      'Contributed ideas for feature improvements, onboarding flows, and user retention strategies.',
      'Supported testing, documentation, and implementation of new product initiatives.',
    ],
    skills: ['Product Management', 'User Research', 'Data Analysis', 'Problem Solving', 'Cross-functional Collaboration', 'Growth Strategy', 'Communication'],
  },
  {
    role: 'Tech & Electronics Secretary',
    org: 'College Technical Club',
    period: '2023 – 2024',
    responsibilities: [
      'Organized technical events, workshops, and competitions.',
      'Coordinated technical requirements and event logistics.',
      'Worked with faculty and student teams to execute technology-focused initiatives.',
      'Promoted participation in electronics and technology activities.',
      'Assisted in project exhibitions and technical demonstrations.',
    ],
    skills: ['Leadership', 'Event Management', 'Team Coordination', 'Communication', 'Project Planning'],
  },
]

export default function Experience() {
  const ref = useScrollReveal()

  return (
    <section id="experience" className={styles.experience}>
      <div className="section" ref={ref}>
        <p className={styles.label}>MY JOURNEY</p>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">Experience</h2>
        <p className="section-subtitle" data-reveal data-delay="2">
          Roles where I've grown as a collaborator, thinker, and builder.
        </p>

        <div className={styles.timeline}>
          {EXPERIENCE.map((exp, i) => (
            <div key={exp.role} className={styles.entry} data-reveal data-delay={String(i + 2)}>
              <div className={styles.dot} />
              <div className="card-wrapper" style={{flex:1}}>
                <div className="card-inner">
                  <div className={styles.header}>
                    <div>
                      <h3 className={styles.role}>{exp.role}</h3>
                      <p className={styles.org}>{exp.org}</p>
                    </div>
                    <span className={styles.period}>{exp.period}</span>
                  </div>
                  <ul className={styles.list}>
                    {exp.responsibilities.map(r => <li key={r}>{r}</li>)}
                  </ul>
                  <div className={styles.skillTags}>
                    {exp.skills.map(s => (
                      <span key={s} className={styles.skillTag}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.line} />
        </div>
      </div>
    </section>
  )
}
