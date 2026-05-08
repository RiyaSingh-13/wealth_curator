# Wealth Curator - Finance Dashboard

Wealth Curator is a frontend finance dashboard built with React, Vite, and React Native Web.  
It gives a clean overview of personal finance data like net worth, spending trends, portfolio insights, alerts, and recent transactions.

The app currently runs with mock data so you can work on UI, flows, and states without needing a backend first.

## What this project includes

- Dashboard layout with sidebar navigation and top header
- Portfolio insights cards and charts
- Transactions list with search and virtualization for performance
- Theme support (light/dark) with shared design tokens
- Loading, error, and empty states for realistic UX testing
- Basic analytics hooks for page and action events

## Quick start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Mock API test params

Use these in the browser URL while running locally:

- `?fail=1` -> simulates an API failure
- `?empty=1` -> returns empty dashboard sections

## Project structure (important folders)

```text
src/
├── App.jsx
├── main.jsx
├── hooks/
├── theme/
├── components/
└── features/dashboard/
```

- `src/features/dashboard/` holds main dashboard screens, mock data, and section components.
- `src/hooks/` contains reusable hooks like fetch, debounce, analytics, and local storage helpers.
- `src/theme/` keeps design tokens and theme values used across the app.

## Tech stack

- React 18
- Vite
- React Native Web
- React Router
- Recharts
- TanStack React Virtual

## Deployment

This is a static SPA build. Deploy the `dist/` folder to any static host (Vercel, Netlify, Firebase, S3 + CloudFront, etc.) and make sure SPA fallback is enabled (`index.html` for unknown routes).
