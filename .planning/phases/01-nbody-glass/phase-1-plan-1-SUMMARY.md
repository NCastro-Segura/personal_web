---
phase: 1
plan: 1
subsystem: frontend-visual
tags: [animation, canvas, css, glass-morphism, n-body, background]
dependency_graph:
  requires: []
  provides: [nbody-background, glass-card-system, theme-classes]
  affects: [index.html]
tech_stack:
  added: [Canvas2D-nbody-simulation, backdrop-filter, SVG-feTurbulence]
  patterns: [liquid-glass-morphism, fixed-canvas-background, CSS-custom-properties, IIFE-module-pattern]
key_files:
  created: []
  modified: [index.html]
decisions:
  - "N-body JS extracted verbatim from nbody.html and wrapped in IIFE to avoid polluting global scope"
  - "Used body.theme-dark as default class (black background) — theme-space available by toggling class"
  - "Glass cards apply to existing wrapper divs where possible; new wrapper div added for about and research sections"
  - "Footer z-index reduced from 1000 to 100 per spec; header elevated to z-index:100 via position:relative"
metrics:
  duration: "8 minutes"
  completed: "2026-03-22T18:24:18Z"
  tasks_completed: 1
  files_modified: 1
---

# Phase 1 Plan 1: N-body Background + Liquid Glass Card System Summary

**One-liner:** Fixed-canvas n-body gravity simulation (3 stars + 40 particles) as site background with liquid-glass backdrop-filter card system across all 5 tabs.

## What Was Built

Replaced the old CSS constellation animation (div-based dots/lines) with a physics-accurate n-body gravity simulation rendered to a `<canvas id="nbody-bg">` fixed full-page element. Introduced a two-variant liquid glass card system applied to all main content sections.

### N-body Background

- **Canvas**: `position: fixed; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events:none`
- **Simulation**: 3 massive stars in stable orbits + 40 colored particles with trails, re-centering to prevent drift, particle respawning on escape
- **Physics**: Leapfrog integration with gravitational softening, 3 substeps per frame for stability
- **Source**: JS extracted verbatim from `nbody.html`, wrapped in an IIFE, `document.getElementById('nbody-bg')` as canvas reference

### Liquid Glass Card System

- **CSS variable**: `--card-opacity: 0.12` on `:root`
- **`.glass-css`**: `backdrop-filter: blur(18px) saturate(160%)`, `rgba(255,255,255,0.12)` background, `1px solid rgba(255,255,255,0.12)` border
- **Specular highlight**: `::before` pseudo-element with `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)`
- **`.glass-svg`**: inherits `.glass-css` + applies `filter: url(#glass-distortion)` (feTurbulence + feDisplacementMap)
- **SVG filter**: Defined in hidden `<svg aria-hidden="true">` at top of `<body>`

### Theme Classes

- `body.theme-dark`: `background: #000` (default, set on `<body>`)
- `body.theme-space`: `background: radial-gradient(ellipse at center, #0a0a2e 0%, #050510 100%)`

### Z-index Stack

| Layer | Element | z-index |
|-------|---------|---------|
| Background | `#nbody-bg` canvas | 0 |
| Content | `.content-area`, `.tab-content` | 1 |
| Navigation | `.header` | 100 |
| Footer | `.global-footer` | 100 |

### Glass Cards Applied To

| Tab | Element |
|-----|---------|
| Home | `.home-content` (class added) |
| About | New wrapper `div.content-card.glass-css` wrapping title + `.about-content` |
| Research | New wrapper `div.content-card.glass-css` wrapping title + stats + `.research-content` |
| Publications | New wrapper `div.content-card.glass-css` around publications content |
| Contact | `.contact-form` (class added) |

## Removed

- `createConstellation()` function (100+ lines of DOM-based animation)
- `<div class="constellation-bg" id="constellation">` element
- CSS: `.constellation-bg`, `.dot`, `.line`, `@keyframes twinkle`
- Old `body { background: linear-gradient(135deg, ...) }` gradient

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] `index.html` modified with all changes
- [x] Commit `7d4749a` exists: "feat: Phase 1 — n-body background + liquid glass card system"
- [x] JS syntax validated with `new Function()` parser — no errors
- [x] All 16 structural checks passed (canvas, SVG filter, theme classes, glass cards × 5, z-index, etc.)
- [x] Old constellation code fully removed (createConstellation, .constellation-bg, twinkle animation)

## Self-Check: PASSED
