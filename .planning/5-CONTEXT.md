# Phase 5 Context — About Page Publication Stats (Optional)

## Decisions

### Toggle
- Controlled by `showPublicationStats` in `config.json`
- `false` (default) → Chart.js CDN never loaded, stats container never rendered
- `true` → Chart.js loaded dynamically, stats section appended below about bio

### Charts
- Publications per year: bar chart (blue, matches site palette)
- Citation history: line chart
- Data source: existing ADS Netlify function (may need extended fields)
- Both charts in a two-column flex row on desktop, stacked on mobile

### Graceful degradation
- If ADS fetch fails → stats section hidden silently
- If Chart.js CDN fails → same
