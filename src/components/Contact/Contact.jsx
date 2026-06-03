import { useState } from 'react'
import { FiMail, FiGithub, FiMapPin, FiSend } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { supabase } from '../../lib/supabase'
import styles from './Contact.module.css'

const CONTACT_INFO = [
  { icon: <FiMail />, label: 'Email', value: 'neha7army@gmail.com', href: 'mailto:neha7army@gmail.com' },
  { icon: <FiGithub />, label: 'GitHub', value: 'github.com/neha13amie-amie', href: 'https://github.com/neha13amie-amie' },
  { icon: <FiMapPin />, label: 'Location', value: 'Bangalore, India', href: null },
]

export default function Contact() {
  const ref = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!supabase) {
      setError('Form is not configured yet. Please email me directly.')
      return
    }

    setSending(true)
    const { error: insertError } = await supabase
      .from('messages')
      .insert([{ name: form.name, email: form.email, message: form.message }])
    setSending(false)

    if (insertError) {
      setError('Something went wrong. Please try again or email me directly.')
      return
    }

    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className="section" ref={ref}>
        <span className="section-label">GET IN TOUCH</span>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">Contact Me</h2>

        <div className={styles.grid}>
          {/* Left column */}
          <div className={styles.leftCol} data-reveal data-delay="2">
            <h3 className={styles.displayText}>
              <span>Let's</span>
              <br />
              <span>Work</span>
              <br />
              <span className="gradient-text">Together.</span>
            </h3>

            <div className={styles.infoList}>
              {CONTACT_INFO.map(item => (
                <div key={item.label} className={styles.infoRow}>
                  <span className={styles.infoIcon}>{item.icon}</span>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>{item.label}</span>
                    {item.href
                      ? <a href={item.href} className={styles.infoValue}>{item.value}</a>
                      : <span className={styles.infoValue}>{item.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — form */}
          <div className={styles.rightCol} data-reveal data-delay="3">
            <div className={styles.formCard}>
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
                    <label htmlFor="contact-name" className={styles.fieldLabel}>Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.fieldLabel}>Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className={styles.input}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-message" className={styles.fieldLabel}>Message</label>
                    <textarea
                      id="contact-message"
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`${styles.input} ${styles.textarea}`}
                      required
                    />
                  </div>
                  {error && <p className={styles.errorMsg}>{error}</p>}
                  <button type="submit" className={`gradient-btn ${styles.submitBtn}`} disabled={sending}>
                    <FiSend /> {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
