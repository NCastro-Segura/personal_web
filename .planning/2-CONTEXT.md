# Phase 2 Context — Navigation + Publications + Contact Form

## Decisions

### Navigation
- Tab order unchanged: Home | About | Research | Publications | Contact
- Research tab content cleared (will be populated in Phase 4)
- Research tab shows placeholder text until Phase 4

### Publications Tab
- Receives everything currently in Research tab:
  - Stats row (publications count, citations, h-index)
  - Article grid with pagination
  - ADS / ORCID links
- HTML IDs/classes preserved so existing JS continues working without changes
- Tab `data-tab` attribute updated from "research" to "publications"

### Contact Form (Netlify Forms)
- Add `data-netlify="true"` and `name="contact"` to the `<form>` element
- Add hidden input: `<input type="hidden" name="form-name" value="contact">`
- Replace `alert()` in submit handler with inline success/error message
- Success state: hide form, show `.form-success` div with thank-you message
- Error state: show `.form-error` div below submit button
- No page reload on submit (fetch to Netlify endpoint)
- Fields stay: name, email, subject, message (all required)
