import React from 'react'
import QuickTake from './QuickTake.jsx'
import AdSlot from './ads/AdSlot.jsx'

export default function Hero(){
  const quickData = {
    type: 'summary',
    bullets: [
      'Markets rally on strong earnings',
      'India–Pak match draws record viewership',
      'EC likely to announce dates next week'
    ],
    metrics: { nifty: '+0.6%' },
    updatedAt: new Date().toISOString(),
    cta: { label: 'Read full story', href: '/india/budget-2025#quick-take' }
  }

  return (
    <section className="py-6">
      {/* Optional leaderboard ad */}
      <AdSlot id="ad-leaderboard" enabled className="w-full h-[120px] border border-token rounded-xl mb-6 grid place-items-center">
        <span className="text-sm text-muted">Ad (optional)</span>
      </AdSlot>

      <div className="grid grid-cols-12 gap-8">
        {/* Lead */}
        <div className="col-span-12 lg:col-span-8">
          <div className="relative rounded-2xl overflow-hidden border border-token">
            <div className="aspect-[16/9] bg-[var(--border)]/50"></div>
            {/* overlay card */}
            <div className="absolute left-4 right-4 bottom-4 md:left-6 md:right-auto md:bottom-6 md:w-[56%] bg-card border border-token rounded-xl p-4 md:p-5">
              <div className="flex items-center gap-3">
                <QuickTake data={quickData} />
              </div>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold">Lead Story: Clean, readable, compelling</h2>
              <p className="mt-2 text-muted">Deck: Two-line standfirst with crisp context.</p>
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {[1,2].map(i => (
            <div key={i} className="bg-card border border-token rounded-xl p-4">
              <div className="aspect-[7/2] bg-[var(--border)]/50 rounded-lg mb-3"></div>
              <div className="text-lg font-medium">Secondary {i} headline (two lines max)</div>
              <div className="text-sm text-muted">Two-line teaser for the story…</div>
            </div>
          ))}
          {/* Sticky right ad */}
          <AdSlot id="ad-rail" enabled className="w-[300px] max-w-full h-[600px] border border-token rounded-xl grid place-items-center sticky top-20">
            <span className="text-sm text-muted">Ad (sticky)</span>
          </AdSlot>
        </div>
      </div>
    </section>
  )
}
