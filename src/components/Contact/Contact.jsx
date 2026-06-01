import { useState } from 'react'
import { FiMail, FiLinkedin, FiGithub, FiMapPin, FiSend } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Contact.module.css'

const CONTACT_INFO = [
  { icon: <FiMail />, label: 'Email', value: 'neha@email.com', href: 'mailto:neha@email.com' },
  { icon: <FiLinkedin />, label: 'LinkedIn', value: 'linkedin.com/in/neha', href: 'https://linkedin.com/in/neha' },
  { icon: <FiGithub />, label: 'GitHub', value: 'github.com/neha', href: 'https://github.com/neha' },
  { icon: <FiMapPin />, label: 'Location', value: 'India', href: null },
]

export default function Contact() {
  const ref = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className="section" ref={ref}>
        <p className={styles.label}>GET IN TOUCH</p>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">Contact Me</h2>
        <p className="section-subtitle" data-reveal data-delay="2">
          Have a project or opportunity in mind? I'd love to hear from you.
        </p>

        <div className={styles.grid}>
          {/* Contact info */}
          <div data-reveal data-delay="2">
            <h3 className={styles.colTitle}>Let's Connect</h3>
            <p className={styles.colText}>
              I'm open to internship opportunities, freelance projects, collaborations, and new connections.
            </p>
            <div className={styles.infoList}>
              {CONTACT_INFO.map(item => (
                <div key={item.label} className={styles.infoRow}>
                  <div className={styles.infoIcon}>{item.icon}</div>
                  <div>
                    <p className={styles.infoLabel}>{item.label}</p>
                    {item.href
                      ? <a href={item.href} className={styles.infoValue}>{item.value}</a>
                      : <span className={styles.infoValue}>{item.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div data-reveal data-delay="3">
            <div className="card-wrapper">
              <div className="card-inner">
                {sent ? (
                  <div className={styles.successMsg}>
                    <div className={styles.successIcon}>✓</div>
                    <h3>Message Sent!</h3>
                    <p>Thanks for reaching out. I'll get back to you soon.</p>
                    <button className="gradient-btn" onClick={() => setSent(false)}>Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                      <label htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        placeholder="Tell me about your project or opportunity..."
                        rows={5}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        required
                      />
                    </div>
                    <button type="submit" className={`gradient-btn ${styles.submitBtn}`}>
                      <FiSend /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
