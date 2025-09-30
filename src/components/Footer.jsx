import React from 'react'

export default function Footer(){
  const cols = [
    ['About',['Company','Team','Careers','Contact','Advertise']],
    ['Sections',['India','World','Business','Tech','Sports','Entertainment','Lifestyle','Explainers','Videos']],
    ['Legal',['Terms of Use','Privacy Policy','Cookie Policy','Editorial Guidelines','Sitemap']],
    ['Connect',['Newsletter','YouTube','Twitter/X','Instagram','Facebook']],
  ]
  return (
    <footer className="mt-8 border-t border-token bg-[var(--border)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cols.map(([title, items], idx)=>(
          <div key={idx}>
            <h5 className="font-semibold mb-3">{title}</h5>
            <ul className="space-y-2 text-sm text-muted">
              {items.map((t,i)=>(<li key={i}><a href="#" className="hover:underline">{t}</a></li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-muted py-4">© RISEXP News Network — All rights reserved</div>
    </footer>
  )
}
