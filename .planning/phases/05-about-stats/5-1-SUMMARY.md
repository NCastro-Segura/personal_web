---
phase: 5
plan: 1
subsystem: about-page
tags: [charts, chart.js, publications, stats, optional-feature]
dependency_graph:
  requires: [netlify/functions/fetch-publications.js, config.json]
  provides: [publication-stats-charts]
  affects: [index.html, #about-tab]
tech_stack:
  added: [Chart.js 4 (CDN, dynamic load)]
  patterns: [guard-flag, dynamic-script-loader, graceful-degradation]
key_files:
  modified: [index.html]
decisions:
  - Chart.js loaded dynamically from CDN only when showPublicationStats is true — zero cost when disabled
  - Stats container always in DOM but display:none; JS shows it only on successful data fetch
  - Local fallback uses generateMockPubData() to allow local preview without ADS credentials
  - Silent failure: any error (CDN, ADS, parse) hides stats section without user-visible error
metrics:
  duration: 5min
  completed: 2026-03-22T19:08:55Z
---

# Phase 5 Plan 1: Optional About Page Publication Stats Summary

**One-liner:** Dynamic Chart.js-powered publication/citation bar+line charts on About tab, gated by `showPublicationStats` config flag with zero-cost default-off behavior.

## What Was Built

Added an optional publication statistics section to the About tab of the personal website. When `showPublicationStats: true` in `config.json`, Chart.js is loaded from CDN dynamically after page load, ADS publication data is fetched, and two charts are rendered:

1. **Publications per Year** — bar chart (blue, `rgba(100,181,246,…)`)
2. **Citations per Year** — line chart with fill (same palette)

Charts are displayed in a 2-column grid on desktop, stacked on mobile (responsive via CSS grid + `@media`).

When `showPublicationStats: false` (the default), **nothing happens**: no CDN request, no DOM mutation, no network fetch.

## Tasks Completed

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Guard + dynamic Chart.js loader in `loadSiteData()` | bbba77a |
| 2 | Stats container HTML + CSS in `#about` tab | bbba77a |
| 3 | `fetchAndRenderStats()` + `generateMockPubData()` functions | bbba77a |

## Key Implementation Details

### Guard (Task 1)
```javascript
if (SITE_CONFIG.showPublicationStats) {
    loadPublicationStats();
}
```
Added in `loadSiteData()` after `renderResearch()`. `loadPublicationStats()` creates a `<script>` tag pointing to `chart.js@4` CDN with `onload = fetchAndRenderStats`.

### HTML Container (Task 2)
`#pub-stats-container` added inside `#about` after the bio `.content-card`, with `display:none`. CSS grid layout via `.stats-charts-row` / `.stats-chart-wrap`.

### Data + Rendering (Task 3)
`fetchAndRenderStats()` detects environment (same hostname check pattern as existing `fetchPublications`):
- **Netlify:** `/.netlify/functions/fetch-publications?page=1&rows=500`
- **Local:** `generateMockPubData()` (random years 2016–present)

Builds `pubsByYear` / `citsByYear` maps, renders two `Chart` instances, then shows the container.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] `index.html` modified with all three tasks
- [x] `config.json` still has `showPublicationStats: false`
- [x] Commit `bbba77a` exists
- [x] `#pub-stats-container`, `loadPublicationStats`, `fetchAndRenderStats`, `generateMockPubData` all present in index.html
