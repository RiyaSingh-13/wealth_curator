
# Wealth Curator 💰
### Personal Finance Dashboard

A clean, fast personal finance dashboard to track your portfolio, monitor spending, and stay on top of your net worth — all in one place. Built with React + Vite, it works entirely in the browser with no backend required to get started.

---

## What's Inside

- 📊 **Portfolio Insights** — performance charts, sector breakdown, signals & sentiment
- 💸 **Transaction Ledger** — virtualized list that handles thousands of rows, with live search
- 🏦 **Net Worth & Budget Tracking** — velocity summaries and cash flow intelligence
- 🔔 **Proactive Alerts** — surface what matters before you go looking for it
- 🌙 **Light / Dark Theme** — remembers your preference across tabs and sessions
- 🔍 **Debounced Search** — fast, responsive filtering without hammering renders
- 📱 **React Native Web Primitives** — same component model, ready for a future mobile shell
- ♿ **Accessible by Default** — skip links, landmark roles, and labeled controls throughout
- 🧪 **Mock-first Development** — simulate errors and empty states with a single URL param
- 📦 **Optimized Bundle** — code-split by route and feature, with long-lived cache groups

---

## Getting Started

### 1. Install dependencies

    npm install

### 2. Start the dev server

    npm run dev

### 3. Build for production

    npm run build && npm run preview

---

## Environment Setup

Copy the example env file and fill in your analytics ID:

    cp .env.example .env.local

| Variable | What it does |
|----------|--------------|
| `VITE_GA_MEASUREMENT_ID` | Enables Google Analytics 4 |
| `VITE_GTM_CONTAINER_ID` | Enables Google Tag Manager |

You only need one. Leave both empty to run without analytics — events will log to the console in development instead.

**To verify tracking:** GA4 → Configure → DebugView, then toggle search, filters, and theme to see events fire live.

---

## Simulating Data States

Append query params to the URL while developing — no code changes needed:

| Param | What happens |
|-------|--------------|
| `?fail=1` | Throws an API error — test your error UI and retry button |
| `?empty=1` | Returns empty data — test empty states across every section |

---

## Project Structure

    src/
    ├── analytics/
    │   └── events.js              # All event name constants live here
    ├── App.jsx                    # Router, lazy loading, error boundary
    ├── main.jsx                   # App entry point (AppRegistry for RN Web)
    │
    ├── hooks/
    │   ├── useFetch.js            # Data fetching with loading / error / success states
    │   ├── useAnalytics.js        # GTM + GA4 event tracking
    │   ├── useDebounce.js         # Debounced inputs (search uses 280ms)
    │   └── useLocalStorage.js     # Persistent preferences with cross-tab sync
    │
    ├── theme/
    │   └── tokens.js              # Single source for colors, spacing, shadows, typography
    │
    ├── components/
    │   ├── icons/IconGlyph.jsx    # Consistent icon sizing wrapper (lucide-react)
    │   └── states/                # Reusable loading, error, and empty state components
    │
    └── features/dashboard/
        ├── DashboardScreen.jsx    # Main layout: sidebar + header + scrollable sections
        ├── insights.js            # Portfolio insight logic and copy generation
        ├── mockApi.js             # Simulated API with latency, errors, empty states
        ├── mockData.js            # Seed data for all dashboard sections
        └── components/            # Charts, transaction list, alert cards, sector rail

---

## How It Works

### Data Fetching
`useFetch` manages a simple state machine: `idle → loading → success | error`. It supports abort signals so navigating away cancels in-flight requests. Swap `fetchDashboardMock` for a real endpoint using the included `createJsonFetcher` adapter — no other changes needed.

### Portfolio Insights
Insights are generated deterministically from your holdings and spend data — no LLM, no API key, no latency. The logic lives in `insights.js` and is fully testable.

### Transaction Ledger
Built with `@tanstack/react-virtual` for smooth scrolling even with thousands of rows. Search is debounced at 280ms. Clearing the search field resets instantly without waiting for the debounce. Scroll position also resets automatically when filters change so you never land on a blank viewport.

### Theming
All design decisions — colors, spacing, border radius, shadows — are in `theme/tokens.js`. Light and dark palettes are fully defined there, including sidebar and active nav surfaces. Theme preference is saved to localStorage and syncs across tabs instantly.

### Analytics Events
Every meaningful interaction fires a typed event through `useAnalytics`. Event names are constants in `analytics/events.js` to prevent string drift across the codebase.

| Event | Trigger |
|-------|---------|
| `PAGE_VIEW` | SPA route or query change |
| `SEARCH` | Debounced query (privacy-safe payload) |
| `FILTER_CLICK` | Nav, tabs, chips, profile, vault |
| `CTA_EXECUTE_STRATEGY` | Insight execute / dismiss / refine |
| `THEME_TOGGLE` | Light ↔ dark switch |
| `LAZY_CHUNK_ERROR` | Error boundary after failed chunk load |

---

## Performance

| Technique | Benefit |
|-----------|---------|
| Route-level code splitting | Dashboard bundle only loads when you hit `/` |
| Lazy-loaded charts | Recharts stays out of the initial JS payload |
| Virtualized ledger | Smooth scrolling regardless of transaction count |
| `React.memo` + `useMemo` | Prevents unnecessary re-renders in heavy sections |
| Rollup `manualChunks` | Splits vendor, router, and virtual into long-lived cache groups |
| Google Fonts preconnect | Faster font load with a single combined CSS request |

---

## Accessibility

- **Skip link** — "Skip to main content" targets the main scroll surface for keyboard users
- **Landmark roles** — `main`, `nav`, and named section anchors for screen readers
- **Labeled controls** — all inputs, tabs, and icon-only buttons have `accessibilityLabel`
- **Section anchors** — `section-overview`, `section-insights`, etc. support deep links from sidebar

---

## Deploying

    npm run build

Outputs to `dist/`. Drop it on any static host:

- **Vercel** — zero config, just connect your repo
- **Netlify** — same, works out of the box
- **S3 + CloudFront** — point CloudFront at the bucket
- **Firebase Hosting** — `firebase deploy`

> ⚠️ **Important:** Configure your host with an **SPA fallback** so all routes serve `index.html`. Without this, direct URL visits and refreshes will 404.

---

## Known Limitations

- **No real backend yet** — auth, pagination, and live data are not implemented. The mock layer is the starting point.
- **SEO is limited** — this is a client-rendered SPA. OG tags in `index.html` cover the homepage, but per-route metadata needs SSR (Next.js, Remix) if that matters to you.
- **RN Web boundaries** — Recharts and the virtualized ledger render inside raw DOM nodes, not pure React Native primitives. This is intentional for performance but worth knowing if you target native later.
- **Insights are templated** — copy is generated from holdings data, not a live AI model. Connecting a real LLM backend would replace `insights.js` with API calls.

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | React + Vite |
| Routing | React Router v7 |
| Charts | Recharts (lazy loaded) |
| Virtualization | @tanstack/react-virtual |
| Icons | lucide-react |
| Primitives | React Native Web |
| Analytics | GA4 / GTM |
| Fonts | Inter via Google Fonts |

---

## Contributing

1. Fork the repo and create a feature branch
2. Use `?fail=1` and `?empty=1` to test edge cases before opening a PR
3. Keep new event names in `analytics/events.js` — no inline strings
4. Run `npm run build` and check chunk sizes before submitting

---

## License 

MIT
## deployedLink
https://wealth-curator-taupe.vercel.app/
