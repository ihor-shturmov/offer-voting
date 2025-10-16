## Offer Voting

An Angular 20 demo app using signals, the new template control flow (@if/@for), and Tailwind v4. It lets users browse offers and upvote/downvote them, with state persisted to localStorage.

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run (dev)

```bash
npm start
```

Then open http://localhost:4200

### Build

```bash
npm run build
```

Output goes to `dist/offer-voting`.

### Test

```bash
npm test
```

### Tech highlights

- Angular 20 standalone components, signals, resolver, reactive forms
- New control flow: `@if`, `@for`
- Tailwind CSS v4 via `@tailwindcss/postcss`
- Reusable UI: `app-offer-card`, `app-page-container`, header
