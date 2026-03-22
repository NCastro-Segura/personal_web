# Site Configuration Reference

There are two files you edit to customise the website. No changes to `index.html` are needed for routine updates.

| File | Purpose |
|---|---|
| `config.json` | Visual settings and feature toggles |
| `content.json` | All text content and image references |

> **Local preview:** `fetch()` requires an HTTP server. Run `npx serve .` and open http://localhost:3000. The site still loads without a server, but config/content changes won't apply under `file://`.

---

## `config.json`

Controls how the site looks and which optional features are active.

```json
{
  "theme": "theme-dark",
  "glassEffect": "glass-css",
  "cardOpacity": 0.12,
  "showPublicationStats": false,
  "publicationsPerPage": 12
}
```

### `theme`

Sets the background colour behind the n-body simulation.

| Value | Appearance |
|---|---|
| `"theme-dark"` | Pure black — maximum contrast with the simulation glows |
| `"theme-space"` | Deep dark blue-purple radial gradient (`#050510` → `#0a0a2e`) |

```json
"theme": "theme-space"
```

---

### `glassEffect`

Controls the style of the transparent cards used on every text section.

| Value | Appearance |
|---|---|
| `"glass-css"` | High backdrop blur + saturation boost + specular edge highlight. Performant, works everywhere. |
| `"glass-svg"` | Same as above + an SVG `feTurbulence` / `feDisplacementMap` filter that adds a subtle light-refraction distortion to the card edges (the "liquid" effect). Slightly more GPU-intensive. |

```json
"glassEffect": "glass-svg"
```

---

### `cardOpacity`

Controls how opaque the card background tint is. Lower = more transparent (simulation more visible). Higher = more readable text.

- **Type:** number between `0.0` and `1.0`
- **Default:** `0.12`
- **Recommended range:** `0.08` – `0.35`

```json
"cardOpacity": 0.20
```

> If you find the text hard to read against the simulation, increase this value.

---

### `showPublicationStats`

Toggles optional publication statistics charts on the **About** page (publications per year + citations per year, fetched from ADS).

| Value | Effect |
|---|---|
| `false` | Feature completely hidden. Chart.js is never loaded. No network requests. *(default)* |
| `true` | Charts appear below the bio on the About tab. Chart.js loaded from CDN on demand. |

```json
"showPublicationStats": true
```

> Charts require the site to be deployed on Netlify (ADS data comes from the serverless function). On localhost the charts render with mock data for preview.

---

### `publicationsPerPage`

Number of publication cards shown per page in the **Publications** tab.

- **Type:** integer
- **Default:** `12`

```json
"publicationsPerPage": 6
```

---

## `content.json`

Controls all text and images shown on the **About** and **Research** pages.

```json
{
  "about": { ... },
  "research": [ ... ]
}
```

---

### `about`

Content for the **About** tab.

```json
"about": {
  "paragraphs": [
    "First paragraph text.",
    "Second paragraph text."
  ],
  "image": null
}
```

#### `about.paragraphs`

An array of strings. Each string becomes a `<p>` tag in the About section. Write as many paragraphs as you like.

```json
"paragraphs": [
  "I am an astrophysicist at the University of Warwick...",
  "My research focuses on..."
]
```

#### `about.image`

Optional profile photo filename from the `img/` folder. Set to `null` to show the placeholder.

```json
"image": "profile.jpg"
```

> Place the file in `img/` first, then set the filename here (no path prefix needed).

---

### `research`

An array of section objects for the **Research** tab. Add, remove, or reorder objects to control what appears. The page renders them in array order.

```json
"research": [
  { ... },
  { ... }
]
```

Each section has these fields:

#### `title` *(required)*

Heading shown at the top of the section in blue.

```json
"title": "Accretion Disc Winds in X-ray Binaries"
```

#### `body` *(required)*

Array of paragraph strings. Each becomes a `<p>` tag.

```json
"body": [
  "First paragraph of this section.",
  "Second paragraph of this section."
]
```

#### `image` *(optional)*

Filename of an illustration from the `img/` folder. Omit or set to `null` for a text-only section.

```json
"image": "agn_wind.png"
```

Image layout alternates automatically:
- **Section 0, 2, 4…** → image on the **left**, text on the right
- **Section 1, 3, 5…** → image on the **right**, text on the left
- **Mobile** → image always stacks above text

#### `imageAlt` *(optional, recommended)*

Alt text for accessibility and SEO.

```json
"imageAlt": "Illustration of an AGN wind driven from an accretion disc"
```

#### `imageCaption` *(optional)*

Short description shown below the image in the figure footnote.

```json
"imageCaption": "Artist's impression of a disc wind driven from the inner accretion disc."
```

#### `imageCredits` *(optional)*

Credit line shown below the caption in smaller, italic text.

```json
"imageCredits": "Credit: ESA / NASA"
```

---

### Full example — adding a new Research section

```json
{
  "title": "OPTICAM: High-Speed Optical Instrumentation",
  "body": [
    "OPTICAM is a triple-camera optical system designed to explore the fastest timescales in astrophysics.",
    "The instrument allows simultaneous observations in three optical bands with sub-second time resolution, enabling studies of rapid variability in accreting compact objects."
  ],
  "image": "opticam_instrument.jpg",
  "imageAlt": "The OPTICAM triple-camera instrument",
  "imageCaption": "The OPTICAM instrument mounted at the telescope.",
  "imageCredits": "Credit: OPTICAM Collaboration"
}
```

Place the image file in `img/` and add this object to the `research` array in `content.json`.

---

## Quick-reference card

```
config.json
├── theme              "theme-dark" | "theme-space"
├── glassEffect        "glass-css"  | "glass-svg"
├── cardOpacity        0.0 – 1.0   (default 0.12)
├── showPublicationStats  true | false  (default false)
└── publicationsPerPage   integer     (default 12)

content.json
├── about
│   ├── paragraphs     [ "string", ... ]
│   └── image          "filename.jpg" | null
└── research           [ section, ... ]
    └── section
        ├── title          string  (required)
        ├── body           [ "string", ... ]  (required)
        ├── image          "filename.jpg" | null
        ├── imageAlt       string
        ├── imageCaption   string
        └── imageCredits   string
```
