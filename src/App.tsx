import { useState, useEffect } from 'react'
import './App.css'

const NAME = 'abdul'
const TAGLINE = 'Software Engineer'
const LINKEDIN = 'https://www.linkedin.com/in/abdulhannan-ahmad-0447b7149/'
const GITHUB = 'https://github.com/Abdul-213'
const EMAIL = 'mailto:m.abdulhannan.ahmad@gmail.com'
const CV = '/src/assets/Abdul_CV.pdf'

interface StatData {
  value: string
  label: string
}

interface WorkData {
  name: string
  url: string
  blurb: string
  year: string
  tags: string[]
  stats: StatData[]
}

const WORK: WorkData[] = [
  {
    name: 'Riftcodex',
    url: 'https://riftcodex.com',
    blurb: 'A free rest API for Riftbound, a trading card game. The backend was built using FastAPI, and runs on Railway. The frontend is built with React/Typescript and deployed on Cloudflare Pages. Added observability with Prometheus, Loki, Tempo and Grafana.',
    year: '2026',
    tags: ['python', 'fastapi', 'prometheus', 'loki', 'grafana', 'react', 'cloudflare', 'railway', 'mongodb'],
    stats: [
      { value: '12K', label: 'visitors / month' },
      { value: '296K', label: 'requests / month' },
    ],
  },
  {
    name: 'MTGuru',
    url: 'https://mtguru.com',
    blurb: 'Natural language search engine for Magic: The Gathering cards using Retrieval Augmented Generation (RAG). Backend built with Go, running on AWS and utilizing Cloudflare Vectorize for embedding generation and storage. The frontend is built with React and hosted on Cloudflare Pages.',
    year: '2025',
    tags: ['go', 'aws', 'react', 'cloudflare vectorize', 'react'],
    stats: [
    ],
  },
  {
    name: 'Multiplayer Administration Tool',
    url: '',
    blurb: 'An administration tool for a multiplayer game community server. Built using Python (asyncio) and MongoDB, enabling real time monitoring and management of players. Included dashboards in Grafana with metrics collected via Prometheus.',
    year: '2026',
    tags: ['python', 'asyncio', 'mongodb', 'cloudflare', 'grafana', 'prometheus'],
    stats: [
      { value: '31,000', label: 'registered users' },
      { value: '1,500', label: 'active users / week' },
    ],
  }
]

function App() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return true
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-dark', String(dark))
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <>
      <button
        className="theme-toggle"
        onClick={() => setDark(d => !d)}
        aria-label="Toggle dark mode"
      >
        {dark ? '☀' : '☾'}
      </button>

      <div className="page-inner">
        <h1 className="name">
          $ whoami {NAME}<span className="caret">█</span>
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

        <p className="eyebrow">─── Personal Projects ───</p>

        <div className="work-list">
          {WORK.map(work => (
            <div className="work-row" key={work.name}>
              <div className="work-header">
                <a
                  className="work-title"
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {work.name}
                </a>
                <span className="work-arrow">→</span>
              </div>
              <div className="work-details">
                <div className="work-blurb">{work.blurb}</div>
                <dl className="work-stats">
                  {work.stats.map(stat => (
                    <div className="stat" key={stat.label}>
                      <dt className="stat-value">{stat.value}</dt>
                      <dd className="stat-label">{stat.label}</dd>
                    </div>
                  ))}
                </dl>
                <div className="work-tags">
                  {work.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
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
