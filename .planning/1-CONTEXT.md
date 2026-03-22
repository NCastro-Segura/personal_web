# Phase 1 Context — Visual Foundation

## Decisions

### Background
- Extract canvas + all JS from `nbody.html` verbatim — no physics changes
- Canvas: `id="nbody-bg"`, `position: fixed; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events:none`
- Old `createConstellation()` function and its canvas removed entirely
- Two themes (class on `<body>`):
  - `.theme-dark`: `background: #000`
  - `.theme-space`: `background: #050510` with subtle radial gradient (#0a0a2e center)
- Both themes use same n-body rendering — just body background color differs

### Liquid Glass Cards
- Two variants as CSS classes on `.content-card`:
  - `.glass-css` (default): `backdrop-filter: blur(18px) saturate(160%)` + specular `::before` highlight + dark tint + subtle white border
  - `.glass-svg`: inherits `.glass-css` + wraps in SVG filter `<feTurbulence>` + `<feDisplacementMap>` for refraction distortion
- SVG filter defined once in `<defs>` at top of `<body>`
- CSS variable: `--card-opacity: 0.12` on `:root`
- Card border: `1px solid rgba(255,255,255,0.12)`
- Specular highlight: `::before` pseudo with `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)`
- Apply `.content-card` to: `.home-content`, `.about-content`, `.research-content`, `.publications-content`, `.contact-form`
- Z-index stack: bg canvas=0, page content wrapper=1, header=100, footer=100

### Phase 1 does NOT include
- Wiring to config.json (that's Phase 3)
- Research/Publications restructuring (Phase 2)
- Content from content.json (Phase 3)
