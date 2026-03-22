# Project State

**Milestone:** v1.0 — Website Redesign & Content Management  
**Current Phase:** 5 (Phase 5 complete — all phases done)  
**Last Updated:** 2026-03-22

## Completed Phases

### Phase 1 — N-body Background + Card System
- **Completed:** 2026-03-22
- **Commit:** `7d4749a`
- **Summary:** `.planning/phases/01-nbody-glass/phase-1-plan-1-SUMMARY.md`
- **Key changes:** Replaced constellation animation with n-body simulation; added liquid-glass card system across all 5 tabs

### Phase 5 — About Page Publication Stats (Optional)
- **Completed:** 2026-03-22
- **Commit:** `bbba77a`
- **Summary:** `.planning/phases/05-about-stats/5-1-SUMMARY.md`
- **Key changes:** Dynamic Chart.js loader + publications/citations bar+line charts on About tab, gated by `showPublicationStats` config flag (default off)

## Phase Status
- [x] Phase 1 — N-body Background + Card System ✅
- [ ] Phase 2 — Navigation Restructuring + Publications
- [ ] Phase 3 — Content Management File (JSON)
- [ ] Phase 4 — Research Page with Illustrations
- [x] Phase 5 — About Page Publication Stats (Optional) ✅

## Key Decisions
1. N-body JS wrapped in IIFE to avoid global scope pollution
2. `body.theme-dark` set as default (black background); `theme-space` available via class toggle
3. Glass cards use `--card-opacity: 0.12` CSS variable for easy tuning
4. Footer z-index reduced from 1000 → 100 per spec

5. Chart.js loaded dynamically via script injection — zero-cost when feature disabled

## Key Files
- `index.html` — Main SPA (all tabs) — **Modified in Phase 1**
- `nbody.html` — Standalone n-body simulation (source for background JS)
- `netlify/functions/fetch-publications.js` — ADS serverless function
- `img/` — Image assets (agn_wind.png, SwiftJ1727_ilustration_low.jpg)
- `content.json` — *(to be created in Phase 3)* Site content config

## Performance Metrics
| Phase | Plan | Duration | Tasks | Files |
|-------|------|----------|-------|-------|
| 1     | 1    | 8 min    | 1     | 1     |
| 5     | 1    | 5 min    | 3     | 1     |

## Last Session
- **Stopped at:** Completed Phase 5 Plan 1
- **Timestamp:** 2026-03-22T19:08:55Z
