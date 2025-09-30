import React, { useEffect, useRef, useState } from 'react'

export default function QuickTake({ data }){
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(()=>{
    function onKey(e){
      if(e.key === 'Escape') setOpen(false)
    }
    function onClick(e){
      if(panelRef.current && !panelRef.current.contains(e.target) && !btnRef.current.contains(e.target)){
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return ()=>{
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  if(!data || !data.bullets?.length) return null

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls="quicktake-panel"
        onClick={()=>setOpen(o=>!o)}
        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-[var(--border)]/50 text-[var(--fg)]"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        Quick Take
      </button>

      {/* Desktop popover */}
      <div
        ref={panelRef}
        id="quicktake-panel"
        role="dialog"
        className={`hidden md:block absolute z-50 mt-2 w-[min(560px,90vw)] rounded-xl border border-token bg-card p-4 shadow-lg ${open ? '' : 'opacity-0 pointer-events-none'}`}
      >
        <ul className="space-y-2 text-sm text-[var(--fg)]/80">
          {data.bullets.slice(0,3).map((b,i)=>(<li key={i}>• {b}</li>))}
        </ul>
        {data.metrics && (
          <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
            {data.metrics.score && <Metric label="Score" value={data.metrics.score} />}
            {data.metrics.nifty && <Metric label="NIFTY" value={data.metrics.nifty} />}
            {data.metrics.seats && <Metric label="Seats" value={`NDA ${data.metrics.seats.NDA} · INDIA ${data.metrics.seats.INDIA}`} />}
          </div>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-[var(--muted)]">Updated {new Date(data.updatedAt).toLocaleTimeString()}</span>
          {data.cta?.href && <a className="text-sm font-medium text-[var(--link)]" href={data.cta.href}>{data.cta.label} →</a>}
        </div>
      </div>

      {/* Mobile inline expand */}
      {open && (
        <div className="md:hidden mt-2 rounded-xl border border-token bg-card p-4" role="region" aria-label="Quick Take">
          <ul className="space-y-2 text-sm text-[var(--fg)]/80">
            {data.bullets.slice(0,3).map((b,i)=>(<li key={i}>• {b}</li>))}
          </ul>
          {data.metrics && (
            <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
              {data.metrics.nifty && <Metric label="NIFTY" value={data.metrics.nifty} />}
              {data.metrics.score && <Metric label="Score" value={data.metrics.score} />}
            </div>
          )}
          {data.cta?.href && <a className="mt-3 inline-block text-sm font-medium text-[var(--link)]" href={data.cta.href}>{data.cta.label} →</a>}
        </div>
      )}
    </div>
  )
}

function Metric({ label, value }){
  return (
    <div className="rounded-md bg-[var(--border)]/40 p-2">
      <div className="text-[var(--muted)]">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}
