import { useState, useEffect, type ReactNode } from 'react'
import './App.css'

const NAME = 'abdul'
// Non-breaking spaces keep each title on one line when the tagline wraps
const TAGLINE = 'Software Engineer | Platform Engineer'
const LINKEDIN = 'https://www.linkedin.com/in/abdulhannan-ahmad-0447b7149/'
const GITHUB = 'https://github.com/Abdul-213'
const EMAIL = 'me@abdul.fyi'
const CV = 'https://www.files.abdul.fyi/Abdul_CV.pdf'

interface CertData {
  name: string
  url: string
}

// Add the Credly URL to a certification to make it a link
const CERTS: CertData[] = [
  {
    name: 'Certified Kubernetes Application Developer',
    url: 'https://www.credly.com/badges/85baebc1-16fb-4db6-8e1b-6b92f355eff6',
  },
  {
    name: 'HashiCorp Certified: Terraform Associate (004)',
    url: '',
  },
]

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
  pinned?: boolean
}

const WORK: WorkData[] = [
  {
    name: 'Riftcodex',
    pinned: true,
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
    pinned: true,
    url: 'https://domesday.m-abdulhannan-ahmad.workers.dev',
    blurb: 'Built a site that shows crime, deprivation and income statistics for any postcode or place in England, using data from the UK Government, police forces and the Office for National Statistics. Developed the frontend with Next.js/TypeScript and a small TypeScript API, with figures pre-computed from the raw government files. Deployed on Cloudflare Workers.',
    tags: ['nextjs', 'typescript', 'cloudflare workers'],
    stats: [],
  },
  {
    name: 'MTGuru',
    pinned: true,
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

function ProjectRow({ work }: { work: WorkData }) {
  return (
    <div className="work-row">
      <div className="work-header">
        <div className="work-title-group">
          <h3 className="work-title">
            {work.url ? (
              <a href={work.url} target="_blank" rel="noopener noreferrer">
                {work.name}
              </a>
            ) : (
              work.name
            )}
          </h3>
          {work.pinned && (
            <span className="pinned" title="Pinned project">
              <span aria-hidden="true">★</span>
              <span className="visually-hidden">Pinned project</span>
            </span>
          )}
        </div>
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
        <a className="tagline-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <ul className="certs" aria-label="Certifications">
          {CERTS.map(cert => (
            <li key={cert.name}>
              {cert.url ? (
                <a href={cert.url} target="_blank" rel="noopener noreferrer">{cert.name}</a>
              ) : (
                cert.name
              )}
            </li>
          ))}
        </ul>

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
          {WORK.map(work => (
            <ProjectRow work={work} key={work.name} />
          ))}
        </div>

        <footer className="footer">
          <span className="footer-left">© 2026 {NAME}</span>
          <span className="footer-right">↵ end of file</span>
        </footer>
      </div>
    </>
  )
}

export default App
