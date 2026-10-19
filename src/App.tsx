import { useState, useEffect, type ReactNode } from 'react'
import './App.css'

const NAME = 'abdul'
const TAGLINE = 'Software Engineer'
const LINKEDIN = 'https://www.linkedin.com/in/abdulhannan-ahmad-0447b7149/'
const GITHUB = 'https://github.com/Abdul-213'
const EMAIL = 'mailto:m.abdulhannan.ahmad@gmail.com'
const CV = 'https://www.files.abdul.fyi/Abdul_CV.pdf'

interface StatData {
  value: string
  label: string
}

interface WorkData {
  name: string
  url: string
  blurb: ReactNode
  tags: string[]
  stats: StatData[]
}

const WORK: WorkData[] = [
  {
    name: 'Riftcodex',
    url: 'https://riftcodex.com',
    blurb: <>Built a free rest API for <a className="work-blurb-link" href="https://riftbound.leagueoflegends.com/en-us/" target="_blank" rel="noopener noreferrer">Riftbound</a> using FastAPI and deployed it on Railway. Developed the frontend with React/Typescript, hosted on Cloudflare Pages and implemented observability using Prometheus, Loki and Tempo with dashboards in Grafana.</>,
    tags: ['python', 'fastapi', 'prometheus', 'loki', 'grafana', 'react', 'cloudflare', 'railway', 'mongodb'],
    stats: [
      { value: '12K', label: 'visitors / month' },
      { value: '296K', label: 'requests / month' },
    ],
  },
  {
    name: 'Domesday',
    url: 'https://domesday.m-abdulhannan-ahmad.workers.dev',
    blurb: 'Built a site that shows crime, deprivation and income statistics for any postcode or place in England, using data from the UK Government, police forces and the Office for National Statistics. Developed the frontend with Next.js/TypeScript and a small TypeScript API, with figures pre-computed from the raw government files. Deployed on Cloudflare Workers.',
    tags: ['nextjs', 'typescript', 'cloudflare workers'],
    stats: [],
  },
  {
    name: 'MTGuru',
    url: 'https://mtguru.com',
    blurb: <>Built a natural language search engine for <a className="work-blurb-link" href="https://magic.wizards.com/en" target="_blank" rel="noopener noreferrer">Magic: The Gathering</a> cards using Retrieval Augmented Generation (RAG). Developed the backend in Go, deployed it on AWS with Cloudflare Vectorize handling embedding and storage. Created the frontend with React and deployed it on Cloudflare Pages.</>,
    tags: ['go', 'aws', 'react', 'cloudflare vectorize'],
    stats: [],
  },
  {
    name: 'Multiplayer Administration Tool',
    url: '',
    blurb: 'Built an administration tool for a multiplayer game community server using Asyncio (Python) and MongoDB, enabling real-time player monitoring and management. Added Grafana dashboards with metrics from Prometheus and MongoDB for observability.',
    tags: ['python', 'asyncio', 'mongodb', 'cloudflare', 'grafana', 'prometheus'],
    stats: [
      { value: '31,000', label: 'registered users' },
      { value: '1,500', label: 'active users / week' },
    ],
  },
]

// The first three projects are featured; the rest rotate in the carousel
const FEATURED = WORK.slice(0, 3)
const MORE = WORK.slice(3)

const AUTOPLAY_MS = 6000

function ProjectRow({ work }: { work: WorkData }) {
  return (
    <div className="work-row">
      <div className="work-header">
        <h3 className="work-title">
          {work.url ? (
            <a href={work.url} target="_blank" rel="noopener noreferrer">
              {work.name}
            </a>
          ) : (
            work.name
          )}
        </h3>
        {work.url && <span className="work-arrow" aria-hidden="true">→</span>}
      </div>
      <div className="work-details">
        <div className="work-blurb">{work.blurb}</div>
        {work.stats.length > 0 && (
          <dl className="work-stats">
            {work.stats.map(stat => (
              <div className="stat" key={stat.label}>
                <dt className="stat-label">{stat.label}</dt>
                <dd className="stat-value">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="work-tags">
          {work.tags.map(tag => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Shows one project at a time, sliding vertically between them
function ProjectCarousel({ projects }: { projects: WorkData[] }) {
  const [index, setIndex] = useState(0)
  // No direction until the first change, so the initial slide doesn't animate in
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const [playing, setPlaying] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [hovered, setHovered] = useState(false)
  const count = projects.length

  const go = (step: 1 | -1) => {
    setDirection(step === 1 ? 'up' : 'down')
    setIndex(i => (i + step + count) % count)
  }

  useEffect(() => {
    if (count < 2 || !playing || hovered) return
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  })

  // Manual navigation hands control to the visitor
  const navigate = (step: 1 | -1) => {
    setPlaying(false)
    go(step)
  }

  const work = projects[index]

  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      aria-label="More projects"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="carousel-viewport" aria-live={playing ? 'off' : 'polite'}>
        <div
          className={direction ? `carousel-slide carousel-slide-${direction}` : 'carousel-slide'}
          key={index}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${count}`}
        >
          <ProjectRow work={work} />
        </div>
      </div>
      {count > 1 && (
        <div className="carousel-controls">
          <button className="carousel-button" onClick={() => navigate(-1)} aria-label="Previous project">
            ↑ prev
          </button>
          <button className="carousel-button" onClick={() => navigate(1)} aria-label="Next project">
            ↓ next
          </button>
          <button
            className="carousel-button"
            onClick={() => setPlaying(p => !p)}
            aria-label={playing ? 'Pause carousel' : 'Play carousel'}
          >
            {playing ? 'pause' : 'play'}
          </button>
          <span className="carousel-count" aria-hidden="true">
            {index + 1} / {count}
          </span>
        </div>
      )}
    </section>
  )
}

function App() {
  // index.html sets data-dark before first paint
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute('data-dark') !== 'false'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-dark', String(dark))
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      // Storage blocked: the theme still applies for this visit
    }
  }, [dark])

  return (
    <>
      <button
        className="theme-toggle"
        onClick={() => setDark(d => !d)}
        aria-label="Dark mode"
        aria-pressed={dark}
      >
        {dark ? '☀' : '☾'}
      </button>

      <div className="page-inner">
        <h1 className="name">
          $ whoami {NAME}<span className="caret" aria-hidden="true">█</span>
        </h1>
        <p className="tagline">// {TAGLINE}</p>
        <a className="tagline-email" href={EMAIL}>m.abdulhannan.ahmad@gmail.com</a>

        <div className="social-links">
          <a className="social-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="social-link" href={GITHUB} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="social-link" href={CV} target="_blank" rel="noopener noreferrer">
            CV
          </a>
        </div>

        <h2 className="section-title">
          <span aria-hidden="true">─── </span>Personal Projects<span aria-hidden="true"> ───</span>
        </h2>

        <div className="work-list">
          {FEATURED.map(work => (
            <ProjectRow work={work} key={work.name} />
          ))}
        </div>

        {MORE.length > 0 && (
          <>
            <h2 className="section-title">
              <span aria-hidden="true">─── </span>More Projects<span aria-hidden="true"> ───</span>
            </h2>
            <ProjectCarousel projects={MORE} />
          </>
        )}

        <footer className="footer">
          <span className="footer-left">© 2026 {NAME}</span>
          <span className="footer-right">↵ end of file</span>
        </footer>
      </div>
    </>
  )
}

export default App
