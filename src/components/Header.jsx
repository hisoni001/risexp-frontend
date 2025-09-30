import React, { useEffect, useState } from 'react'
import { useTheme } from '../lib/theme.js'

const CATS = [
  { name: 'Home' },
  { name: 'India' },
  { name: 'World' },
  { name: 'Business', status: 'trend' },
  { name: 'Tech' },
  { name: 'Sports', status: 'live', label: 'IND vs PAK' },
  { name: 'Entertainment' },
  { name: 'Lifestyle' },
  { name: 'Explainers' },
  { name: 'Videos' },
  { name: 'Elections', status: 'breaking', label: 'EC dates' },
]

export default function Header(){
  const { theme, toggle } = useTheme()
  const [moreFrom, setMoreFrom] = useState(CATS.length)

  useEffect(()=>{
    // simple measurement to determine how many categories fit
    const handle = () => {
      const rightReserve = 80 // search icon width
      const container = document.querySelector('#nav-measure')
      if(!container) return
      const max = container.clientWidth - rightReserve
      const ctx = document.createElement('canvas').getContext('2d')
      ctx.font = '16px Inter'
      let width = 0; let count = 0
      for(const c of CATS){
        const w = ctx.measureText(c.name).width + 24 + (c.status ? 50 : 0)
        if(width + w > max){ break }
        width += w; count++
      }
      setMoreFrom(count)
    }
    handle()
    window.addEventListener('resize', handle)
    return ()=>window.removeEventListener('resize', handle)
  }, [])

  return (
    <header className="w-full">
      {/* Top strip */}
      <div className="h-12 bg-[var(--border)]/30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-[var(--muted)]">Mon, Sep 29 — Edition: India • English</div>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="w-9 h-9 rounded-full bg-card border border-token grid place-items-center" aria-label="Toggle theme">
            {theme === 'dark' ? '☀︎' : '☾'}
          </button>
          <button className="w-9 h-9 rounded-full bg-card border border-token grid place-items-center" aria-label="Account">
            <span className="sr-only">Account</span>
            <div className="w-5 h-5 rounded-full border border-token"></div>
          </button>
        </div>
      </div>

      {/* Logo + nav + search */}
      <div className="relative h-24 border-b border-token bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-black text-white px-3 py-2">
              <span className="font-semibold">RISE</span><span className="text-brand">XP</span>
            </div>
            <nav id="nav-measure" className="hidden md:flex items-center gap-4 text-[16px]">
              {CATS.slice(0, moreFrom).map((c,i)=> (
                <Cat key={i} {...c} />
              ))}
              {moreFrom < CATS.length && (
                <div className="text-[var(--muted)]">More ▾</div>
              )}
            </nav>
          </div>
          <button className="w-10 h-10 rounded-full bg-[var(--border)]/40 grid place-items-center" aria-label="Search">
            🔍
          </button>
        </div>
      </div>
    </header>
  )
}

function Cat({ name, status, label }){
  return (
    <div className="flex items-center gap-2">
      <a href="#" className="hover:underline">{name}</a>
      {status && <Status status={status} label={label} />}
    </div>
  )
}

function Status({ status, label }){
  const color = status === 'live' ? 'bg-[var(--danger)]' : status === 'breaking' ? 'bg-[var(--warning)]' : 'bg-blue-500'
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block w-2 h-2 rounded-full ${color}`}></span>
      {(status === 'live' || status === 'breaking') && (
        <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--border)]/50">
          {status === 'live' ? 'LIVE: ' : 'Breaking: '}{label}
        </span>
      )}
    </div>
  )
}
