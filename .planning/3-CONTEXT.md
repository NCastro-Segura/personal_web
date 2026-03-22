# Phase 3 Context — Content & Config Files

## Decisions

### Two-file architecture
- `config.json` — visual/feature settings (theme, glass variant, opacity, toggles)
- `content.json` — all editable text and image references

### config.json shape
```json
{
  "theme": "theme-dark",
  "glassEffect": "glass-css",
  "cardOpacity": 0.12,
  "showPublicationStats": false,
  "publicationsPerPage": 12
}
```

### content.json shape
```json
{
  "about": {
    "paragraphs": ["..."],
    "image": null
  },
  "research": [
    {
      "title": "...",
      "body": ["paragraph 1", "..."],
      "image": "agn_wind.png",
      "imageAlt": "...",
      "imageCaption": "...",
      "imageCredits": "..."
    }
  ]
}
```

### Loading
- `Promise.all([fetch('config.json'), fetch('content.json')])` before DOM render
- Config applied immediately: theme class on body, CSS variable for opacity, glass class
- Content replaces hard-coded HTML in About and Research sections
- `publicationsPerPage` overrides hard-coded value in fetch logic
- Local dev: requires a local server (e.g. `npx serve .`) — document in README

### Images
- All images served from `img/` directory
- Image paths in content.json are relative filenames (e.g. `"agn_wind.png"`)
- index.html prepends `img/` prefix when rendering
