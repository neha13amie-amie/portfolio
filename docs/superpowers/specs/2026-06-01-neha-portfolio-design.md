# Neha Portfolio — Design Spec
**Date:** 2026-06-01  
**Stack:** React 18 + Vite, CSS Modules  
**Status:** Approved

---

## 1. Overview

A modern, fully responsive personal portfolio website for Neha — a Computer Science, Electronics and Mathematics student. The site showcases her skills, projects, experience, and certifications with a bold Aurora color palette, smooth animations, and light/dark mode support.

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| Styling | CSS Modules (no UI framework) |
| Routing | None — single-page, anchor-scroll |
| Animations | CSS keyframes + IntersectionObserver |
| Icons | React Icons (react-icons) |
| Fonts | Google Fonts — Inter (body), Poppins (headings) |

---

## 3. Folder Structure

```
portfolio/
├── public/
│   └── resume.pdf
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.module.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.module.css
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.module.css
│   │   ├── Skills/
│   │   │   ├── Skills.jsx
│   │   │   └── Skills.module.css
│   │   ├── Projects/
│   │   │   ├── Projects.jsx
│   │   │   └── Projects.module.css
│   │   ├── Experience/
│   │   │   ├── Experience.jsx
│   │   │   └── Experience.module.css
│   │   ├── Certifications/
│   │   │   ├── Certifications.jsx
│   │   │   └── Certifications.module.css
│   │   ├── Resume/
│   │   │   ├── Resume.jsx
│   │   │   └── Resume.module.css
│   │   ├── Contact/
│   │   │   ├── Contact.jsx
│   │   │   └── Contact.module.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.module.css
│   │   └── BackToTop/
│   │       ├── BackToTop.jsx
│   │       └── BackToTop.module.css
│   ├── hooks/
│   │   └── useScrollReveal.js
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── assets/
│   │   └── images/
│   │       └── profile-placeholder.jpg
│   ├── styles/
│   │   └── globals.css
│   └── App.jsx
├── index.html
└── package.json
```

---

## 4. Visual System

### 4.1 Color Palette — Aurora

| Token | Dark Mode | Light Mode |
|---|---|---|
| `--primary` | `#6366f1` | `#6366f1` |
| `--secondary` | `#8b5cf6` | `#8b5cf6` |
| `--accent` | `#ec4899` | `#ec4899` |
| `--gradient` | `linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)` | same |
| `--bg-primary` | `#0a0a0f` | `#f8fafc` |
| `--bg-secondary` | `#0f0f1a` | `#f1f5f9` |
| `--bg-card` | `#1a1a2e` | `#ffffff` |
| `--text-primary` | `#f8fafc` | `#0f172a` |
| `--text-secondary` | `#94a3b8` | `#475569` |
| `--border` | `rgba(99,102,241,0.25)` | `rgba(99,102,241,0.2)` |

Dark mode is the default. Light mode activated by `data-theme="light"` on `<html>`.

### 4.2 Typography

- **Headings:** Poppins, 700 weight
- **Body:** Inter, 400/500 weight
- **Section titles:** 2.5rem, gradient text clip
- **Code/tech tags:** monospace, small

### 4.3 Card Style — Gradient Border

All cards use a gradient border technique:
- Outer wrapper: `background: var(--gradient); border-radius: 16px; padding: 2px`
- Inner wrapper: `background: var(--bg-card); border-radius: 14px`
- Hover: `transform: translateY(-4px)` + outer wrapper glows via `box-shadow`
- Transition: `0.3s ease`

---

## 5. Theme System

`ThemeContext.jsx` exposes `{ theme, toggleTheme }`. Persists to `localStorage`. On mount, reads saved preference or defaults to `dark`. Sets `document.documentElement.setAttribute('data-theme', theme)`. All colors defined as CSS custom properties in `globals.css` under `:root` (dark) and `[data-theme="light"]` (light).

---

## 6. Section Specifications

### 6.1 Navbar

- **Position:** Fixed, full width, `z-index: 1000`
- **Default state:** Fully transparent, no background
- **Scrolled state (>50px):** `background: rgba(10,10,15,0.85)`, `backdrop-filter: blur(12px)`, bottom border `1px solid var(--border)`
- **Logo:** "Neha" in gradient text, Poppins bold
- **Links:** Home · About · Skills · Projects · Experience · Certifications · Resume · Contact
- **Active link:** Gradient text color, tracked via `IntersectionObserver` on each section
- **Dark/light toggle:** Sun/moon icon button, calls `toggleTheme()`
- **Mobile (<768px):** Hamburger icon opens a full-height slide-in drawer with nav links

### 6.2 Hero

- **Layout:** Full viewport height (`100vh`), Aurora gradient background
- **Decorative blobs:** 3 absolutely-positioned circles with `border-radius` morphing animation (`@keyframes blob`) + slow float — `aria-hidden="true"`
- **Left column (text):**
  - Greeting chip: "👋 Hello, I'm" — small pill with border
  - Name: "Neha" — large (4rem), white, bold, Poppins
  - Title: "Computer Science, Electronics & Mathematics Student" — gradient text
  - Intro: "Passionate about technology, web development, UI/UX design. I enjoy creating innovative solutions and learning new technologies."
  - Buttons: "View Projects" (filled gradient) + "Contact Me" (outline with gradient border) — both smooth-scroll to target sections
- **Right column (visual):**
  - Circular profile image with 3px gradient ring border
  - 3 floating badge chips (HTML5, React, Figma) — positioned around image, subtle float animation
- **Responsive:** Stack to single column on mobile, image above text

### 6.3 About

- **Layout:** Two columns on desktop, single column on mobile
- **Left:**
  - Section heading "About Me"
  - Profile summary paragraph
  - Career objective card (gradient border)
  - Interests chips: Web Development · UI/UX Design · Digital Marketing · Technology (each with icon)
- **Right:**
  - Education card with timeline dot style
  - Degree: B.Sc. Computer Science, Electronics & Mathematics
  - Skills overview tags

### 6.4 Skills

- **Two sub-sections:** Technical Skills · Soft Skills — separated by a labeled heading row (no tabs)
- **Technical skill cards** (gradient border cards):
  - Icon (from react-icons)
  - Skill name
  - Animated progress bar — fills from 0 to target % on scroll-reveal
  - Skills: HTML (90%), CSS (85%), JavaScript (80%), React (75%), Figma (80%), SQL (70%), Git & GitHub (85%)
- **Soft skill cards:**
  - Icon + name + one-line description
  - Skills: Communication, Teamwork, Problem Solving, Leadership
- **Grid:** 3–4 columns desktop, 2 columns tablet, 1 column mobile

### 6.5 Projects

- **Grid:** 2 columns desktop, 1 column mobile
- **Project card (gradient border):**
  - Image area: gradient placeholder with project initials centered
  - Project title
  - Short description (2–3 sentences)
  - Tech tag chips
  - Two buttons: "Live Demo" (external link icon) + "GitHub" (GitHub icon)
- **Projects:**

  **Admin Portal Dashboard**
  - Description: A full-featured admin dashboard with data visualization, user management, and responsive layout.
  - Tech: React, CSS, JavaScript, Chart.js
  - Demo/GitHub: `#` placeholders

  **E-commerce Website**
  - Description: A modern e-commerce platform with product listings, cart functionality, and checkout flow.
  - Tech: HTML, CSS, JavaScript, React
  - Demo/GitHub: `#` placeholders

### 6.6 Experience

- **Layout:** Vertical timeline — center line on desktop, left-aligned on mobile
- **Timeline dot:** Gradient circle on the center line
- **Each entry:**
  - Role title (bold) + org/company
  - Date range
  - Responsibilities as bullet list
  - Skills-gained tags (gradient border chips)

- **Entry 1 — Product Development & User Growth Intern**
  - Responsibilities: Assisted in development/improvement of digital products; conducted market & user research; collaborated cross-functionally; analyzed user feedback & metrics; contributed feature improvement ideas; supported testing & documentation.
  - Skills: Product Management · User Research · Data Analysis · Problem Solving · Cross-functional Collaboration · Growth Strategy · Communication

- **Entry 2 — Tech & Electronics Secretary**
  - Responsibilities: Organized technical events, workshops & competitions; coordinated technical requirements & logistics; worked with faculty & student teams; promoted participation; assisted in project exhibitions & demonstrations.
  - Skills: Leadership · Event Management · Team Coordination · Communication · Project Planning

### 6.7 Certifications

- **Grid:** 3 columns desktop, 2 tablet, 1 mobile
- **Certification card (gradient border):**
  - Certificate icon (react-icons `MdVerified` or similar)
  - Certification name
  - Issuing organization
  - Completion date
- **Placeholder cards:** 3 placeholder certs with "Add your certification" placeholder text — easily replaced

### 6.8 Resume

- **Layout:** Centered, max-width 600px
- **Resume preview card (gradient border):**
  - Document icon
  - "Neha's Resume" heading
  - "Last updated: June 2026" note
  - Horizontal lines simulating text
- **Download button:** Gradient filled, links to `public/resume.pdf`, `download` attribute
- **Note text:** "Click to download the latest version of my resume."

### 6.9 Contact

- **Layout:** Two columns on desktop, single column mobile
- **Left — contact info:**
  - Email: `neha@email.com` (placeholder) — mail icon
  - LinkedIn: `linkedin.com/in/neha` (placeholder) — LinkedIn icon
  - GitHub: `github.com/neha` (placeholder) — GitHub icon
  - Location: "India" — map pin icon
  - Each row: icon in gradient circle + text
- **Right — contact form:**
  - Fields: Name, Email, Message (textarea)
  - Submit button: "Send Message" — gradient filled
  - Form is static (no backend) — `onSubmit` shows a success alert; easily swapped for EmailJS or Formspree

### 6.10 Footer

- **Dark background:** `#06060d`
- **Three columns:**
  - Brand: "Neha" gradient logo + tagline "CS · Electronics · Mathematics"
  - Quick Links: About · Skills · Projects · Experience · Contact
  - Social: LinkedIn · GitHub · Email icons (gradient hover)
- **Bottom bar:** "© 2026 Neha. Built with React & ❤️"

---

## 7. Shared Components & Utilities

### 7.1 `useScrollReveal` hook

- Uses `IntersectionObserver` with `threshold: 0.1`
- Returns a `ref` to attach to any element
- Adds `data-visible="true"` when element enters viewport
- CSS handles the actual animation via `[data-visible="true"]` selector
- Supports `delay` option for staggered children

### 7.2 `ThemeContext`

- `createContext` with `{ theme: 'dark', toggleTheme: fn }`
- `ThemeProvider` wraps `App`
- Reads `localStorage.getItem('theme')` on init
- Sets `document.documentElement.setAttribute('data-theme', theme)` on change

### 7.3 `BackToTop`

- Fixed bottom-right, hidden until `scrollY > 300`
- Gradient background circle button with up arrow icon
- `window.scrollTo({ top: 0, behavior: 'smooth' })` on click

### 7.4 Loading Screen

- Full-screen overlay, `position: fixed`, `z-index: 9999`
- Shows "N" initial in large gradient text
- CSS animation fades out after 1s, then component unmounts
- Rendered in `App.jsx`, removed on `useEffect` timer

---

## 8. Animations

| Animation | Implementation |
|---|---|
| Scroll reveal | `IntersectionObserver` → `data-visible` → CSS `opacity` + `translateY` |
| Hero blobs | `@keyframes blob` — border-radius morph + float |
| Progress bars | Width `0 → X%` transition on scroll-reveal trigger |
| Card hover | `translateY(-4px)` + box-shadow glow |
| Navbar blur | CSS transition on `background` + `backdrop-filter` |
| Loading fade | CSS `@keyframes fadeOut` on overlay |
| Badge float | `@keyframes float` — subtle up/down on hero badges |

All animations respect `prefers-reduced-motion: reduce` — wrap keyframe declarations in `@media (prefers-reduced-motion: no-preference)`.

---

## 9. Responsiveness

| Breakpoint | Behavior |
|---|---|
| `< 480px` | Single column everywhere, smaller font sizes |
| `480px–768px` | Single column, tablet optimizations |
| `768px–1024px` | Two-column layouts activate |
| `> 1024px` | Full multi-column layouts |

Navbar collapses to hamburger below 768px.

---

## 10. Accessibility

- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`
- All sections have `id` attributes for anchor navigation
- `aria-label` on icon-only buttons
- Focus-visible outlines on all interactive elements
- Decorative blobs are `aria-hidden="true"`
- Color contrast ratio ≥ 4.5:1 for all text
- Form fields have associated `<label>` elements

---

## 11. SEO

- `<title>Neha | CS & Electronics Portfolio</title>`
- `<meta name="description">` with intro text
- `<meta property="og:*">` Open Graph tags
- Semantic heading hierarchy (`h1` → `h2` → `h3`)

---

## 12. Out of Scope

- Backend / API integration
- Authentication
- CMS
- Deployment configuration
- EmailJS / Formspree wiring (contact form is static)
