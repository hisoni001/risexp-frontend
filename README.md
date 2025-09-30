# RISEXP Frontend (Quick Take)

A Vite + React + Tailwind starter that implements:
- Header with category badges (LIVE/Breaking/Trending)
- Hero with **Quick Take** popover/expand
- Optional ad slots (header, right rail sticky, inline, footer)
- Sections: Top Stories, Latest (+ Sponsored card), Videos, Explainers, Web Stories, Deep Dives
- Light/Dark theme with persistent toggle

## 1) Setup locally
```bash
npm i
npm run dev
```

## 2) Configure
Copy `.env.example` to `.env` and set `VITE_WP_BASE_URL` to your WordPress URL (optional for now).

## 3) Build
```bash
npm run build
npm run preview
```

## 4) Deploy (Vercel recommended)
- Import the repo on Vercel
- Framework: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Add Environment Variable: `VITE_WP_BASE_URL`

## 5) Quick Take data
Today the hero uses sample data. To wire to WP, expose a REST endpoint:
`/wp-json/risexp/v1/quick-take` returning:
```json
{
  "bullets": ["...","...","..."],
  "metrics": {"nifty":"+0.6%"},
  "updatedAt":"2025-09-29T12:00:00+05:30",
  "cta":{"label":"Read full story","href":"/some/article#quick-take"}
}
```
Fetch it in `Hero.jsx` and pass to `<QuickTake />`.

---

### Notes
- Google Fonts are linked in `index.html` (no CSS @import) to avoid Vite/Tailwind order errors.
- All React files use `.jsx` to avoid JSX parse errors.
