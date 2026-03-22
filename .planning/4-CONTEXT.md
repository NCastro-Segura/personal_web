# Phase 4 Context — Research Page with Illustrations

## Decisions

### Section Layout
- Each section is a `.content-card` (glass style from Phase 1)
- Two-column layout: image + text side by side (min 40% / 60% split)
- Alternating: odd sections → image left; even sections → image right
- Mobile (≤768px): image always stacks above text
- If no image: single-column full-width text

### Image Footnote
- Below each image: `<figure>` with `<figcaption>`
- Caption: `imageCaption` text (description)
- Credits: `imageCredits` text, styled as smaller, muted text (`opacity: 0.6`, `font-size: 0.8rem`)
- Caption has a subtle top border separator

### Section rendering
- Generated from `content.json` `research` array at load time
- Empty array → show placeholder text "Research sections coming soon"
- Section `title` rendered as `<h2>`, body paragraphs as `<p>` tags
