# Neha Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully responsive React 18 + Vite personal portfolio for Neha with Aurora palette, dark/light mode, scroll animations, and 9 content sections.

**Architecture:** Single-page React app with one component per section, each in its own folder with a CSS Module. Theme is controlled via a React context that writes a `data-theme` attribute to `<html>`, which flips all CSS custom properties at once. Animations use `IntersectionObserver` via a shared `useScrollReveal` hook.

**Tech Stack:** React 18, Vite, CSS Modules, react-icons, Google Fonts (Inter + Poppins)

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Document shell, font imports, SEO meta tags |
| `src/styles/globals.css` | CSS custom properties (dark/light tokens), resets, shared utilities, keyframe animations |
| `src/context/ThemeContext.jsx` | Theme state, localStorage persistence, `data-theme` DOM attribute |
| `src/hooks/useScrollReveal.js` | IntersectionObserver hook — sets `data-visible` on elements entering viewport |
| `src/App.jsx` | Root component — renders LoadingScreen + all sections in order |
| `src/components/Navbar/Navbar.jsx` | Fixed nav, scroll-blur effect, active link tracking, mobile drawer |
| `src/components/Navbar/Navbar.module.css` | Navbar styles |
| `src/components/Hero/Hero.jsx` | Full-screen gradient hero, blobs, text column, image column, badge chips |
| `src/components/Hero/Hero.module.css` | Hero styles including blob keyframes |
| `src/components/About/About.jsx` | Two-column: summary + education |
| `src/components/About/About.module.css` | About styles |
| `src/components/Skills/Skills.jsx` | Technical + soft skill cards with animated progress bars |
| `src/components/Skills/Skills.module.css` | Skills styles |
| `src/components/Projects/Projects.jsx` | Project cards grid |
| `src/components/Projects/Projects.module.css` | Projects styles |
| `src/components/Experience/Experience.jsx` | Vertical timeline with two entries |
| `src/components/Experience/Experience.module.css` | Experience styles |
| `src/components/Certifications/Certifications.jsx` | Certification cards grid |
| `src/components/Certifications/Certifications.module.css` | Certifications styles |
| `src/components/Resume/Resume.jsx` | Resume preview card + download button |
| `src/components/Resume/Resume.module.css` | Resume styles |
| `src/components/Contact/Contact.jsx` | Contact info + static form |
| `src/components/Contact/Contact.module.css` | Contact styles |
| `src/components/Footer/Footer.jsx` | Three-column footer + copyright bar |
| `src/components/Footer/Footer.module.css` | Footer styles |
| `src/components/BackToTop/BackToTop.jsx` | Scroll-triggered back-to-top button |
| `src/components/BackToTop/BackToTop.module.css` | BackToTop styles |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `src/main.jsx`

- [ ] **Step 1: Scaffold Vite + React project**

Run in `c:\Users\user\OneDrive\Desktop\portfolio`:
```bash
npm create vite@latest . -- --template react
```
When prompted "Current directory is not empty. Remove existing files and continue?" — choose **Yes**.

- [ ] **Step 2: Install dependencies**

```bash
npm install react-icons
```

- [ ] **Step 3: Clean up Vite boilerplate**

Delete these files:
- `src/App.css`
- `src/assets/react.svg`
- `public/vite.svg`

- [ ] **Step 4: Replace `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 5: Replace `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Neha — Computer Science, Electronics & Mathematics student passionate about web development, UI/UX design, and technology." />
    <meta property="og:title" content="Neha | CS & Electronics Portfolio" />
    <meta property="og:description" content="Personal portfolio of Neha — CS, Electronics & Mathematics student." />
    <meta property="og:type" content="website" />
    <title>Neha | CS & Electronics Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```
Expected: Vite server running at `http://localhost:5173` with blank React page (no errors in console).

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Vite + React project"
```

---

## Task 2: Global CSS & Theme System

**Files:**
- Create: `src/styles/globals.css`
- Create: `src/context/ThemeContext.jsx`

- [ ] **Step 1: Create `src/styles/globals.css`**

```css
/* ── Fonts ── */
:root {
  font-family: 'Inter', sans-serif;
}

/* ── Dark mode tokens (default) ── */
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  --gradient: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  --bg-primary: #0a0a0f;
  --bg-secondary: #0f0f1a;
  --bg-card: #1a1a2e;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border: rgba(99, 102, 241, 0.25);
  --shadow-glow: 0 0 30px rgba(99, 102, 241, 0.3);
}

/* ── Light mode tokens ── */
[data-theme="light"] {
  --bg-primary: #f8fafc;
  --bg-secondary: #f1f5f9;
  --bg-card: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border: rgba(99, 102, 241, 0.2);
  --shadow-glow: 0 0 30px rgba(99, 102, 241, 0.15);
}

/* ── Reset ── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  transition: background-color 0.3s ease, color 0.3s ease;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', sans-serif;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}

/* ── Shared utilities ── */
.gradient-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.gradient-btn {
  background: var(--gradient);
  color: #fff;
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.gradient-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.outline-btn {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--primary);
  padding: 0.75rem 1.75rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.outline-btn:hover {
  background: var(--primary);
  color: #fff;
  transform: translateY(-2px);
}

/* ── Gradient border card wrapper ── */
.card-wrapper {
  background: var(--gradient);
  border-radius: 16px;
  padding: 2px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card-wrapper:hover {
  box-shadow: var(--shadow-glow);
  transform: translateY(-4px);
}

.card-inner {
  background: var(--bg-card);
  border-radius: 14px;
  padding: 1.5rem;
  height: 100%;
}

/* ── Scroll reveal ── */
[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-reveal][data-visible="true"] {
  opacity: 1;
  transform: translateY(0);
}

/* ── Stagger delays ── */
[data-delay="1"] { transition-delay: 0.1s; }
[data-delay="2"] { transition-delay: 0.2s; }
[data-delay="3"] { transition-delay: 0.3s; }
[data-delay="4"] { transition-delay: 0.4s; }
[data-delay="5"] { transition-delay: 0.5s; }
[data-delay="6"] { transition-delay: 0.6s; }

/* ── Section layout ── */
.section {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Create `src/context/ThemeContext.jsx`**

```jsx
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css src/context/ThemeContext.jsx
git commit -m "feat: add global CSS tokens and ThemeContext"
```

---

## Task 3: useScrollReveal Hook

**Files:**
- Create: `src/hooks/useScrollReveal.js`

- [ ] **Step 1: Create `src/hooks/useScrollReveal.js`**

```js
import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('[data-reveal]')
    if (targets.length === 0) {
      // The element itself is the target
      el.setAttribute('data-reveal', '')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const allTargets = targets.length > 0 ? targets : [el]
    allTargets.forEach(t => observer.observe(t))

    return () => observer.disconnect()
  }, [])

  return ref
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useScrollReveal.js
git commit -m "feat: add useScrollReveal hook"
```

---

## Task 4: App Shell + Loading Screen

**Files:**
- Create: `src/App.jsx`

- [ ] **Step 1: Create `src/App.jsx`**

```jsx
import { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Certifications from './components/Certifications/Certifications'
import Resume from './components/Resume/Resume'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'
import styles from './App.module.css'

function LoadingScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1200)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className={styles.loader}>
      <span className={`${styles.loaderText} gradient-text`}>N</span>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <ThemeProvider>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  )
}
```

- [ ] **Step 2: Create `src/App.module.css`**

```css
.loader {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeOut 0.4s ease 0.8s forwards;
}

.loaderText {
  font-family: 'Poppins', sans-serif;
  font-size: 6rem;
  font-weight: 800;
}

@keyframes fadeOut {
  to { opacity: 0; pointer-events: none; }
}
```

- [ ] **Step 3: Create all component stub files**

Create these files so imports don't fail. Each exports a minimal component:

`src/components/Navbar/Navbar.jsx`:
```jsx
export default function Navbar() { return null }
```

`src/components/Hero/Hero.jsx`:
```jsx
export default function Hero() { return <section id="home" style={{height:'100vh'}} /> }
```

`src/components/About/About.jsx`:
```jsx
export default function About() { return <section id="about" /> }
```

`src/components/Skills/Skills.jsx`:
```jsx
export default function Skills() { return <section id="skills" /> }
```

`src/components/Projects/Projects.jsx`:
```jsx
export default function Projects() { return <section id="projects" /> }
```

`src/components/Experience/Experience.jsx`:
```jsx
export default function Experience() { return <section id="experience" /> }
```

`src/components/Certifications/Certifications.jsx`:
```jsx
export default function Certifications() { return <section id="certifications" /> }
```

`src/components/Resume/Resume.jsx`:
```jsx
export default function Resume() { return <section id="resume" /> }
```

`src/components/Contact/Contact.jsx`:
```jsx
export default function Contact() { return <section id="contact" /> }
```

`src/components/Footer/Footer.jsx`:
```jsx
export default function Footer() { return <footer /> }
```

`src/components/BackToTop/BackToTop.jsx`:
```jsx
export default function BackToTop() { return null }
```

- [ ] **Step 4: Verify app loads with loading screen**

```bash
npm run dev
```
Expected: "N" in gradient text appears for ~1 second then fades out. No console errors.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: app shell with loading screen and component stubs"
```

---

## Task 5: Navbar

**Files:**
- Modify: `src/components/Navbar/Navbar.jsx`
- Create: `src/components/Navbar/Navbar.module.css`

- [ ] **Step 1: Write `src/components/Navbar/Navbar.jsx`**

```jsx
import { useState, useEffect } from 'react'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.href.slice(1))).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#home" className={`${styles.logo} gradient-text`}>Neha</a>

      <ul className={styles.links}>
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`${styles.link} ${activeSection === link.href.slice(1) ? styles.active : ''}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle color theme"
      >
        {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <ul className={styles.drawerLinks}>
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.drawerLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Write `src/components/Navbar/Navbar.module.css`**

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  transition: background 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease;
}

.scrolled {
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

[data-theme="light"] .scrolled {
  background: rgba(248, 250, 252, 0.85);
}

.logo {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
}

.links {
  display: flex;
  list-style: none;
  gap: 0.25rem;
}

.link {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.link:hover,
.active {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.themeToggle {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-primary);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-left: 1rem;
}

.themeToggle:hover {
  background: var(--bg-secondary);
}

.hamburger {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  margin-left: 0.5rem;
}

.drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: 75%;
  max-width: 300px;
  height: 100vh;
  background: var(--bg-secondary);
  border-left: 1px solid var(--border);
  padding: 5rem 2rem 2rem;
  transition: right 0.3s ease;
  z-index: 999;
}

.drawerOpen {
  right: 0;
}

.drawerLinks {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.drawerLink {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  transition: color 0.2s ease;
}

.drawerLink:hover {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .links,
  .themeToggle {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}
```

- [ ] **Step 3: Verify navbar renders**

```bash
npm run dev
```
Expected: Transparent navbar with "Neha" logo. Scrolling makes it blur. Theme toggle button visible. On mobile width, hamburger shows and drawer slides in.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar/
git commit -m "feat: navbar with scroll-blur, active tracking, mobile drawer"
```

---

## Task 6: Hero Section

**Files:**
- Modify: `src/components/Hero/Hero.jsx`
- Create: `src/components/Hero/Hero.module.css`

- [ ] **Step 1: Write `src/components/Hero/Hero.jsx`**

```jsx
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
```

- [ ] **Step 2: Write `src/components/Hero/Hero.module.css`**

```css
.hero {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0521 0%, #1a0533 30%, #0a0a1f 60%, #1a0a2e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6rem 2rem 4rem;
}

/* ── Blobs ── */
.blob1, .blob2, .blob3 {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.35;
}

.blob1 {
  width: 500px;
  height: 500px;
  background: #6366f1;
  top: -100px;
  left: -100px;
  animation: blob 8s infinite alternate;
}

.blob2 {
  width: 400px;
  height: 400px;
  background: #ec4899;
  bottom: -80px;
  right: -80px;
  animation: blob 10s infinite alternate-reverse;
}

.blob3 {
  width: 300px;
  height: 300px;
  background: #8b5cf6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: blob 12s infinite alternate;
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes blob {
    0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    100% { border-radius: 50% 60% 40% 60% / 40% 50% 60% 50%; }
  }
}

/* ── Layout ── */
.container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1100px;
  width: 100%;
}

/* ── Text column ── */
.greeting {
  display: inline-block;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50px;
  padding: 0.4rem 1rem;
  font-size: 0.95rem;
  color: #e2e8f0;
  margin-bottom: 1rem;
}

.name {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 0.75rem;
}

.title {
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 600;
  margin-bottom: 1.25rem;
  line-height: 1.4;
}

.intro {
  color: rgba(255,255,255,0.75);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 480px;
}

.buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ── Image column ── */
.imageCol {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.imageRing {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
  padding: 4px;
}

.imagePlaceholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #1a1a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-size: 6rem;
  font-weight: 800;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.badge {
  position: absolute;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.25);
  color: #fff;
  padding: 0.4rem 0.9rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
}

.badge1 {
  top: 10%;
  left: 0;
  animation: float 3s ease-in-out infinite;
}

.badge2 {
  bottom: 15%;
  left: -5%;
  animation: float 3.5s ease-in-out infinite 0.5s;
}

.badge3 {
  top: 20%;
  right: 0;
  animation: float 4s ease-in-out infinite 1s;
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
}

/* ── Scroll cue ── */
.scrollDown {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.5);
  animation: bounce 2s ease-in-out infinite;
  z-index: 1;
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }

  .imageCol {
    order: -1;
  }

  .imageRing {
    width: 200px;
    height: 200px;
  }

  .intro {
    margin-left: auto;
    margin-right: auto;
  }

  .buttons {
    justify-content: center;
  }
}
```

- [ ] **Step 3: Verify hero renders**

```bash
npm run dev
```
Expected: Full-screen gradient hero with blobs, "Neha" name, title, intro text, two buttons, circular placeholder, floating badges.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero/
git commit -m "feat: hero section with gradient background, blobs, and badges"
```

---

## Task 7: About Section

**Files:**
- Modify: `src/components/About/About.jsx`
- Create: `src/components/About/About.module.css`

- [ ] **Step 1: Write `src/components/About/About.jsx`**

```jsx
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
```

- [ ] **Step 2: Write `src/components/About/About.module.css`**

```css
.about {
  background: var(--bg-secondary);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.summary {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.cardTitle {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.cardText {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
}

.interests {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.interestChip {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 50px;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.eduCard {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.eduDot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--gradient);
  flex-shrink: 0;
  margin-top: 4px;
}

.eduDegree {
  font-weight: 700;
  font-size: 1rem;
  display: block;
  margin-bottom: 0.25rem;
}

.eduInstitute {
  color: var(--primary);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.eduYear {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.eduList {
  color: var(--text-secondary);
  font-size: 0.875rem;
  padding-left: 1.25rem;
  line-height: 1.8;
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.statNum {
  font-family: 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.statLabel {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/About/
git commit -m "feat: about section with education card and interests"
```

---

## Task 8: Skills Section

**Files:**
- Modify: `src/components/Skills/Skills.jsx`
- Create: `src/components/Skills/Skills.module.css`

- [ ] **Step 1: Write `src/components/Skills/Skills.jsx`**

```jsx
import { useEffect, useRef } from 'react'
import {
  FiCode, FiLayers, FiZap, FiBox, FiPenTool, FiDatabase, FiGithub,
  FiMessageSquare, FiUsers, FiTarget, FiStar
} from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Skills.module.css'

const TECH_SKILLS = [
  { icon: <FiCode />, name: 'HTML', level: 90 },
  { icon: <FiLayers />, name: 'CSS', level: 85 },
  { icon: <FiZap />, name: 'JavaScript', level: 80 },
  { icon: <FiBox />, name: 'React', level: 75 },
  { icon: <FiPenTool />, name: 'Figma', level: 80 },
  { icon: <FiDatabase />, name: 'SQL', level: 70 },
  { icon: <FiGithub />, name: 'Git & GitHub', level: 85 },
]

const SOFT_SKILLS = [
  { icon: <FiMessageSquare />, name: 'Communication', desc: 'Clear verbal and written communication across teams' },
  { icon: <FiUsers />, name: 'Teamwork', desc: 'Collaborative mindset with cross-functional experience' },
  { icon: <FiTarget />, name: 'Problem Solving', desc: 'Analytical approach to breaking down complex challenges' },
  { icon: <FiStar />, name: 'Leadership', desc: 'Organized and motivated teams as Tech & Electronics Secretary' },
]

function SkillCard({ icon, name, level }) {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bar.style.width = `${level}%`
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(bar.parentElement)
    return () => observer.disconnect()
  }, [level])

  return (
    <div className="card-wrapper">
      <div className={`card-inner ${styles.techCard}`}>
        <div className={styles.skillIcon}>{icon}</div>
        <div className={styles.skillName}>{name}</div>
        <div className={styles.progressTrack}>
          <div ref={barRef} className={styles.progressBar} style={{ width: 0 }} />
        </div>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useScrollReveal()

  return (
    <section id="skills" className={styles.skills}>
      <div className="section" ref={ref}>
        <p className={styles.label}>WHAT I KNOW</p>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">My Skills</h2>
        <p className="section-subtitle" data-reveal data-delay="2">
          A blend of technical expertise and soft skills built through study and experience.
        </p>

        <h3 className={styles.subHeading} data-reveal data-delay="2">Technical Skills</h3>
        <div className={styles.techGrid} data-reveal data-delay="3">
          {TECH_SKILLS.map(s => <SkillCard key={s.name} {...s} />)}
        </div>

        <h3 className={`${styles.subHeading} ${styles.subHeadingSpaced}`} data-reveal data-delay="2">Soft Skills</h3>
        <div className={styles.softGrid} data-reveal data-delay="3">
          {SOFT_SKILLS.map(s => (
            <div key={s.name} className="card-wrapper">
              <div className={`card-inner ${styles.softCard}`}>
                <div className={styles.softIcon}>{s.icon}</div>
                <h4 className={styles.softName}>{s.name}</h4>
                <p className={styles.softDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `src/components/Skills/Skills.module.css`**

```css
.skills {
  background: var(--bg-primary);
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.subHeading {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.subHeadingSpaced {
  margin-top: 3.5rem;
}

.techGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.25rem;
}

.techCard {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1.5rem 1rem;
}

.skillIcon {
  font-size: 2rem;
  color: var(--primary);
}

.skillName {
  font-weight: 600;
  font-size: 0.95rem;
}

.progressTrack {
  width: 100%;
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 6px;
  overflow: hidden;
}

.progressBar {
  height: 100%;
  background: var(--gradient);
  border-radius: 6px;
  transition: width 1s ease;
}

.skillLevel {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.softGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

.softCard {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.softIcon {
  font-size: 1.75rem;
  color: var(--accent);
}

.softName {
  font-weight: 700;
  font-size: 1rem;
}

.softDesc {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
}

@media (max-width: 480px) {
  .techGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills/
git commit -m "feat: skills section with animated progress bars"
```

---

## Task 9: Projects Section

**Files:**
- Modify: `src/components/Projects/Projects.jsx`
- Create: `src/components/Projects/Projects.module.css`

- [ ] **Step 1: Write `src/components/Projects/Projects.jsx`**

```jsx
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    initials: 'AD',
    title: 'Admin Portal Dashboard',
    description: 'A full-featured admin dashboard with data visualization, user management, and a fully responsive layout. Designed to streamline business operations.',
    tech: ['React', 'CSS', 'JavaScript', 'Chart.js'],
    demo: '#',
    github: '#',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    initials: 'EC',
    title: 'E-commerce Website',
    description: 'A modern e-commerce platform featuring product listings, cart functionality, and a complete checkout flow with a clean, mobile-first design.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    demo: '#',
    github: '#',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
  },
]

export default function Projects() {
  const ref = useScrollReveal()

  return (
    <section id="projects" className={styles.projects}>
      <div className="section" ref={ref}>
        <p className={styles.label}>WHAT I'VE BUILT</p>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">Projects</h2>
        <p className="section-subtitle" data-reveal data-delay="2">
          A selection of projects that showcase my skills and creativity.
        </p>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="card-wrapper" data-reveal data-delay={String(i + 2)}>
              <div className={`card-inner ${styles.card}`}>
                <div className={styles.imageArea} style={{ background: p.gradient }}>
                  <span className={styles.initials}>{p.initials}</span>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={styles.desc}>{p.description}</p>
                  <div className={styles.tags}>
                    {p.tech.map(t => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                  <div className={styles.buttons}>
                    <a href={p.demo} className={`gradient-btn ${styles.btn}`} target="_blank" rel="noreferrer">
                      <FiExternalLink /> Live Demo
                    </a>
                    <a href={p.github} className={`outline-btn ${styles.btn}`} target="_blank" rel="noreferrer">
                      <FiGithub /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `src/components/Projects/Projects.module.css`**

```css
.projects {
  background: var(--bg-secondary);
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.card {
  padding: 0;
  overflow: hidden;
}

.imageArea {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px 12px 0 0;
}

.initials {
  font-family: 'Poppins', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  color: rgba(255,255,255,0.5);
}

.body {
  padding: 1.5rem;
}

.title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.25);
  border-radius: 50px;
  font-size: 0.8rem;
  color: var(--primary);
}

.buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  padding: 0.6rem 1.25rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects/
git commit -m "feat: projects section with gradient-border cards"
```

---

## Task 10: Experience Section

**Files:**
- Modify: `src/components/Experience/Experience.jsx`
- Create: `src/components/Experience/Experience.module.css`

- [ ] **Step 1: Write `src/components/Experience/Experience.jsx`**

```jsx
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
```

- [ ] **Step 2: Write `src/components/Experience/Experience.module.css`**

```css
.experience {
  background: var(--bg-primary);
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 2rem;
}

.line {
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--gradient);
  border-radius: 2px;
}

.entry {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  position: relative;
}

.dot {
  position: absolute;
  left: -2rem;
  top: 1.25rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--gradient);
  flex-shrink: 0;
  z-index: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.role {
  font-size: 1.1rem;
  font-weight: 700;
}

.org {
  color: var(--primary);
  font-size: 0.9rem;
  margin-top: 0.2rem;
}

.period {
  font-size: 0.85rem;
  color: var(--text-secondary);
  white-space: nowrap;
  background: var(--bg-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  flex-shrink: 0;
}

.list {
  color: var(--text-secondary);
  font-size: 0.9rem;
  padding-left: 1.25rem;
  line-height: 1.9;
  margin-bottom: 1rem;
}

.skillTags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skillTag {
  padding: 0.25rem 0.75rem;
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.25);
  border-radius: 50px;
  font-size: 0.78rem;
  color: var(--primary);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience/
git commit -m "feat: experience section with vertical timeline"
```

---

## Task 11: Certifications Section

**Files:**
- Modify: `src/components/Certifications/Certifications.jsx`
- Create: `src/components/Certifications/Certifications.module.css`

- [ ] **Step 1: Write `src/components/Certifications/Certifications.jsx`**

```jsx
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
```

- [ ] **Step 2: Write `src/components/Certifications/Certifications.module.css`**

```css
.certs {
  background: var(--bg-secondary);
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.iconWrap {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.certName {
  font-size: 1rem;
  font-weight: 700;
}

.issuer {
  color: var(--primary);
  font-size: 0.875rem;
}

.date {
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  padding: 0.2rem 0.75rem;
  border-radius: 50px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Certifications/
git commit -m "feat: certifications section with placeholder cards"
```

---

## Task 12: Resume Section

**Files:**
- Modify: `src/components/Resume/Resume.jsx`
- Create: `src/components/Resume/Resume.module.css`

- [ ] **Step 1: Write `src/components/Resume/Resume.jsx`**

```jsx
import { FiDownload, FiFileText } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Resume.module.css'

export default function Resume() {
  const ref = useScrollReveal()

  return (
    <section id="resume" className={styles.resume}>
      <div className="section" ref={ref}>
        <p className={styles.label}>MY RESUME</p>
        <h2 className="section-title gradient-text" data-reveal data-delay="1">Resume</h2>
        <p className="section-subtitle" data-reveal data-delay="2">
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
```

- [ ] **Step 2: Write `src/components/Resume/Resume.module.css`**

```css
.resume {
  background: var(--bg-primary);
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--primary);
  margin-bottom: 0.5rem;
  text-align: center;
}

.resume .section-title,
.resume .section-subtitle {
  text-align: center;
}

.cardOuter {
  text-align: center;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.previewIcon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.resumeName {
  font-size: 1.3rem;
  font-weight: 700;
}

.updated {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.lines {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.line {
  height: 8px;
  background: var(--bg-secondary);
  border-radius: 4px;
  width: 100%;
}

.downloadBtn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.note {
  color: var(--text-secondary);
  font-size: 0.8rem;
}
```

- [ ] **Step 3: Add placeholder resume file**

Create an empty `public/resume.pdf` placeholder so the download link doesn't 404.

```bash
echo "" > public/resume.pdf
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Resume/ public/resume.pdf
git commit -m "feat: resume section with download card"
```

---

## Task 13: Contact Section

**Files:**
- Modify: `src/components/Contact/Contact.jsx`
- Create: `src/components/Contact/Contact.module.css`

- [ ] **Step 1: Write `src/components/Contact/Contact.jsx`**

```jsx
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
                    <span className={styles.successIcon}>✓</span>
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
```

- [ ] **Step 2: Write `src/components/Contact/Contact.module.css`**

```css
.contact {
  background: var(--bg-secondary);
}

.label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.colTitle {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.colText {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.infoList {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.infoRow {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.infoIcon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.infoLabel {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.1rem;
}

.infoValue {
  font-weight: 500;
  color: var(--text-primary);
  transition: color 0.2s;
}

a.infoValue:hover {
  color: var(--primary);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.field input,
.field textarea {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  resize: vertical;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.submitBtn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
}

.successMsg {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0;
}

.successIcon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--gradient);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact/
git commit -m "feat: contact section with info rows and static form"
```

---

## Task 14: Footer

**Files:**
- Modify: `src/components/Footer/Footer.jsx`
- Create: `src/components/Footer/Footer.module.css`

- [ ] **Step 1: Write `src/components/Footer/Footer.jsx`**

```jsx
import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi'
import styles from './Footer.module.css'

const QUICK_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

const SOCIALS = [
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/neha', label: 'LinkedIn' },
  { icon: <FiGithub />, href: 'https://github.com/neha', label: 'GitHub' },
  { icon: <FiMail />, href: 'mailto:neha@email.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <a href="#home" className={`${styles.brand} gradient-text`}>Neha</a>
          <p className={styles.tagline}>CS · Electronics · Mathematics</p>
          <p className={styles.bio}>Building digital experiences with code and creativity.</p>
        </div>

        <div>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            {QUICK_LINKS.map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className={styles.footLink}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={styles.colTitle}>Connect</h4>
          <div className={styles.socials}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} className={styles.socialIcon} aria-label={s.label} target="_blank" rel="noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Neha. Built with React &amp; ❤️</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Write `src/components/Footer/Footer.module.css`**

```css
.footer {
  background: #06060d;
  border-top: 1px solid var(--border);
  padding: 4rem 2rem 0;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 3rem;
}

.brand {
  font-family: 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  display: block;
  margin-bottom: 0.25rem;
}

.tagline {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.bio {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
  max-width: 260px;
}

.colTitle {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.linkList {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footLink {
  color: var(--text-secondary);
  font-size: 0.875rem;
  transition: color 0.2s;
}

.footLink:hover {
  color: var(--primary);
}

.socials {
  display: flex;
  gap: 0.75rem;
}

.socialIcon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.socialIcon:hover {
  background: var(--gradient);
  color: white;
  border-color: transparent;
}

.bottom {
  border-top: 1px solid var(--border);
  padding: 1.25rem 0;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.85rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer/
git commit -m "feat: footer with three columns and social links"
```

---

## Task 15: BackToTop Button

**Files:**
- Modify: `src/components/BackToTop/BackToTop.jsx`
- Create: `src/components/BackToTop/BackToTop.module.css`

- [ ] **Step 1: Write `src/components/BackToTop/BackToTop.jsx`**

```jsx
import { useState, useEffect } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import styles from './BackToTop.module.css'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <FiArrowUp size={20} />
    </button>
  )
}
```

- [ ] **Step 2: Write `src/components/BackToTop/BackToTop.module.css`**

```css
.btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gradient);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 900;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.visible {
  opacity: 1;
  transform: translateY(0);
}

.btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/BackToTop/
git commit -m "feat: back-to-top button"
```

---

## Task 16: Final Polish & Verification

**Files:**
- Verify: all component files render without errors

- [ ] **Step 1: Run the full dev build and visually check every section**

```bash
npm run dev
```

Open `http://localhost:5173` and scroll through every section. Verify:
- Loading screen fades in/out
- Navbar is transparent on hero, blurs on scroll
- Hero gradient background with blobs and badges
- About two-column layout with education card
- Skills progress bars animate on scroll into view
- Projects gradient-border cards with buttons
- Experience vertical timeline
- Certifications grid
- Resume download card
- Contact form submits and shows success state
- Footer three columns
- Back-to-top appears after scrolling down, scrolls back up
- Dark/light toggle switches theme
- Mobile: hamburger drawer works, single-column layouts

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: Build completes with no errors. Output in `dist/`.

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete Neha portfolio — all sections implemented"
```
