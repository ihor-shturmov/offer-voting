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

## Offer Voting

An Angular 20 demo using signals, the new template control flow (@if/@for), and Tailwind v4. Browse offers and upvote/downvote them with state persisted in localStorage.

### Prerequisites
- Node.js 18+
- npm 9+

### Setup
1) Install dependencies: `npm install`
2) Start dev server: `npm start` and open http://localhost:4200
3) Build for production: `npm run build` (output in `dist/offer-voting`)
4) Run unit tests: `npm test`
5) Format code: `npm run format`

### Technical decisions (brief)
- Angular standalone + signals store
	- Central state in `OfferStore` (signals, computed) with a thin `OfferFacade` for consumption.
	- Persistence via a tiny `LocalStorageService` wrapper (JSON get/set), used by the store.
- Router and data flow
	- Lazy routes: `/offers`, `/offers/:id` with `withComponentInputBinding()`.
	- `offerResolver` sets the selected offer id early; detail page reads `facade.currentOffer()`.
	- Route paths centralized in `RoutesPaths` to avoid magic strings.
- Modern templates and forms
	- New control flow syntax: `@if`/`@for` throughout.
	- Search field uses Reactive Forms with `debounceTime` + `distinctUntilChanged` and `takeUntilDestroyed(DestroyRef)` for cleanup.
- UI and styling
	- Tailwind CSS
	- Reusable components: `app-page-container`, `app-header`, `app-offer-card`, `app-offer-info`, `app-upvote-button`, `app-downvote-button`.

### Project structure (key files)
- `src/app/core/offer.model.ts` — Offer interface
- `src/app/core/mock-offers.ts` — Initial data set
- `src/app/core/offer.store.ts` — Signal-based store (state, computed, mutations)
- `src/app/core/offer.facade.ts` — Read-only signals, filtering, actions
- `src/app/app.routes.ts` — Routes (list/detail)
- `src/app/features/offers-list/offers-list.page.ts` — Offers list page
- `src/app/features/offer-detail/offer-detail.page.ts` — Offer detail page
- `src/app/shared/ui/*` — Reusable UI components and buttons

### Troubleshooting
- Reset demo data by clearing the `offers` key in browser localStorage.
