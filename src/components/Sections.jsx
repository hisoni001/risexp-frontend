import React from 'react'
import AdSlot from './ads/AdSlot.jsx'

export default function Sections(){
  return (
    <div className="space-y-10 pb-12">
      {/* Top Stories */}
      <Section title="Top Stories">
        <Grid cols={3} rows={2} />
      </Section>

      {/* Inline Ad */}
      <AdSlot id="ad-inline-1" enabled className="w-full h-[120px] border border-token rounded-xl grid place-items-center">
        <span className="text-sm text-muted">Ad (optional)</span>
      </AdSlot>

      {/* Latest + Newsletter */}
      <Section title="Latest">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <LatestList />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <NewsletterCard />
          </div>
        </div>
      </Section>

      <Section title="Videos"><RowVideos /></Section>
      <Section title="Explainers"><RowExplainers /></Section>
      <Section title="Web Stories"><RowStories /></Section>
      <Section title="Deep Dives"><Grid cols={3} rows={1} /></Section>

      {/* Footer Ad */}
      <AdSlot id="ad-footer" enabled className="w-full h-[100px] border border-token rounded-xl grid place-items-center">
        <span className="text-sm text-muted">Ad (optional)</span>
      </AdSlot>
    </div>
  )
}

function Section({ title, children }){
  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="h-px bg-[var(--border)] my-3"></div>
      {children}
    </section>
  )
}

function Grid({ cols = 3, rows = 1 }){
  const items = Array.from({ length: cols * rows })
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols} gap-7`}>
      {items.map((_,i)=> (
        <article key={i}>
          <div className="aspect-[16/9] bg-[var(--border)]/50 rounded-xl border border-token"></div>
          <div className="mt-2 text-brand text-sm">Section</div>
          <h4 className="text-lg font-medium">Story headline fits two lines cleanly</h4>
          <p className="text-sm text-muted">Short caption under image</p>
        </article>
      ))}
    </div>
  )
}

function LatestList(){
  const items = Array.from({ length: 9 })
  return (
    <div className="space-y-4">
      {items.map((_,i)=> (
        i === 4 ? (
          <div key={i} className="rounded-xl border border-dashed border-token p-3 flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-md bg-[var(--border)]/50 text-xs text-muted">Sponsored</span>
            <div className="text-sm">Partner story — presented by Acme. Learn more →</div>
          </div>
        ) : (
          <div key={i} className="flex items-center gap-4">
            <div className="w-20 h-14 bg-[var(--border)]/50 rounded-md border border-token"></div>
            <div className="min-w-[72px] text-sm text-muted">08:{String(10+i).padStart(2,'0')}</div>
            <div className="text-base">Latest update headline across all sections — clear and crisp</div>
          </div>
        )
      ))}
    </div>
  )
}

function NewsletterCard(){
  return (
    <div className="bg-card border border-token rounded-xl p-4">
      <div className="text-xl font-semibold">Get the Morning Brief</div>
      <p className="text-sm text-muted mt-2">Top stories, every morning in your inbox.</p>
      <button className="mt-4 px-4 py-2 rounded-lg bg-[var(--brand)] text-black font-medium">Subscribe</button>
    </div>
  )
}

function RowVideos(){
  return (
    <div className="flex gap-6 overflow-x-auto pb-2">
      {Array.from({ length: 5 }).map((_,i)=> (
        <div key={i} className="min-w-[360px]">
          <div className="relative aspect-video rounded-xl border border-token bg-[var(--border)]/50">
            <div className="absolute inset-0 grid place-items-center text-muted">▶</div>
          </div>
          <div className="mt-2 text-sm">Interview: Key insights (4:12)</div>
        </div>
      ))}
    </div>
  )
}

function RowExplainers(){
  return (
    <div className="flex gap-6 overflow-x-auto pb-2">
      {Array.from({ length: 4 }).map((_,i)=> (
        <div key={i} className="min-w-[360px]">
          <div className="aspect-[16/9] rounded-xl border border-token bg-[var(--border)]/50"></div>
          <div className="mt-2 text-base font-medium">Why X matters — quick Q&A</div>
        </div>
      ))}
    </div>
  )
}

function RowStories(){
  return (
    <div className="flex gap-6 overflow-x-auto pb-2">
      {Array.from({ length: 7 }).map((_,i)=> (
        <div key={i} className="min-w-[180px]">
          <div className="w-[180px] h-[320px] rounded-xl border border-token bg-[var(--border)]/50"></div>
          <div className="mt-2 text-sm">Web Story title</div>
        </div>
      ))}
    </div>
  )
}
