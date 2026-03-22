# Roadmap — v1.0: Website Redesign & Content Management

## Milestone: v1.0
**Goal:** Redesign the personal website with an n-body simulation background, liquid-glass card system, restructured navigation, working contact form, and two-file content/config management.

---

## Phase 1 — Visual Foundation (N-body Background + Liquid Glass Cards)
**Goal:** Embed the n-body simulation as a full-page background, replace the constellation animation, and introduce a liquid-glass card system for all text content blocks. Two background themes and two glass variants.

**Scope:**
- Extract canvas + JS from `nbody.html` verbatim → embed as fixed background layer in `index.html`
- Remove old constellation animation entirely
- Two CSS themes on `<body>`: `theme-dark` (pure black) and `theme-space` (deep dark blue-purple)
- Liquid glass card system — two variants:
  - `glass-css`: high backdrop-filter blur + specular edge highlight + layered gradients (pure CSS)
  - `glass-svg`: same as above + SVG `feTurbulence`/`feDisplacementMap` filter for real light-refraction
- Active variant controlled by `glassEffect` key in `config.json` (wired up in Phase 3)
- For now: variant toggled by CSS class `.glass-svg` on `.content-card`
- CSS variable `--card-opacity` (default: `0.12`) — adjustable by editing CSS
- Cards applied to: Home intro, About, Research, Publications, Contact

---

## Phase 2 — Navigation Restructuring + Publications + Contact Form
**Goal:** Move current Research content (pub stats + article list) to the Publications tab. Wire up the contact form with Netlify Forms. Navigation order unchanged.

**Scope:**
- Publications tab: receives all current Research content (stats cards, article grid, pagination, ADS/ORCID links)
- Research tab: cleared, ready for Phase 4 custom sections
- Contact form: add `data-netlify="true"` + hidden `form-name` input → Netlify Forms
  - Success/error state messaging (no page reload)
  - Basic validation feedback
- Navigation tabs stay: Home, About, Research, Publications, Contact

---

## Phase 3 — Content & Config Files
**Goal:** Create two standalone files (`config.json` + `content.json`) as the single editable sources of truth. `index.html` fetches and applies both at load time.

**Scope:**

### `config.json` — Feature toggles & visual settings
```json
{
  "theme": "theme-dark",          // "theme-dark" | "theme-space"
  "glassEffect": "glass-css",     // "glass-css" | "glass-svg"
  "cardOpacity": 0.12,
  "showPublicationStats": false,  // Phase 5 toggle
  "publicationsPerPage": 12
}
```

### `content.json` — All editable text & image references
```json
{
  "about": {
    "paragraphs": ["..."],
    "image": "profile.jpg"          // optional, from img/
  },
  "research": [
    {
      "title": "Section Title",
      "body": ["paragraph 1", "..."],
      "image": "agn_wind.png",       // optional, from img/
      "imageAlt": "AGN Wind diagram",
      "imageCaption": "Short description",
      "imageCredits": "Credit line"
    }
  ]
}
```

- `index.html` fetches both files with `Promise.all([fetch('config.json'), fetch('content.json')])`
- Config values applied before render (theme class, opacity variable, etc.)
- Content values populate About text and Research sections
- Local development note: fetch() on `file://` needs a local server (document in README)

---

## Phase 4 — Research Page with Illustrations
**Goal:** Build the new Research page dynamically from `content.json` sections. Each section supports a heading, body text, and an optional illustration with footnote.

**Scope:**
- Arbitrary number of sections from `content.json`
- Section layout: alternating image placement (left on odd, right on even)
- On mobile: image always stacks above text
- Image footnote: short caption + credits line (styled subtly, smaller font)
- Each section wrapped in a liquid glass card (from Phase 1)
- Graceful if no image: full-width text section

---

## Phase 5 — About Page Publication Stats (Optional)
**Goal:** Optionally render publication statistics charts on the About page, controlled entirely by `showPublicationStats` in `config.json`.

**Scope:**
- `showPublicationStats: false` → feature invisible (no Chart.js loaded, no DOM impact)
- `showPublicationStats: true` → Chart.js loaded from CDN, charts rendered below bio
- Charts: publications per year (bar), citation history (line)
- Data from same ADS Netlify function (extended endpoint or reuse existing)
- Graceful fallback if ADS unavailable

---

## Deferred / Out of Scope for v1.0
- Dark/light mode toggle
- Blog/news section
- i18n / multilingual support
