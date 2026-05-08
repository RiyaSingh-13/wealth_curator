# Wealth Curator – Personal Finance Dashboard

## 📌 Live Demo
[Deployed on Vercel – add your link after deployment]

## 🎯 Assignment Context
This project is a submission for the **Frontend Intern Assignment** at Bright Money. It implements a production-grade AI-powered personal finance dashboard with Net Worth tracking, AI insights, alerts, transaction history, spending charts, dark mode, analytics, and performance optimizations.

## 🚀 Tech Stack
- **React 18** + **Vite** (fast build and hot reload)
- **Tailwind CSS** (utility-first styling, dark mode support)
- **Recharts** (charting library)
- **Custom Hooks** (data fetching, debounce, localStorage, analytics)

## 📁 Architecture Decisions
- **Component-based structure** (Header, SummaryCards, AIInsights, AlertsSection, TransactionsTable, SpendingChart) – each component has a single responsibility.
- **Custom hooks** for reusable logic – `useFetch`, `useDebounce`, `useLocalStorage`, `useAnalytics`.
- **Mock API** (`mockData.js`) simulates asynchronous data fetching with artificial delay to demonstrate loading states.
- **Dark mode** implemented using Tailwind's `class` strategy and persisted via `useLocalStorage`.
- **Performance** optimizations: `React.lazy` + `Suspense` for the chart, `React.memo` for summary cards, `useCallback` and `useMemo` where needed.

## 🔧 Custom Hooks Explained
| Hook | Purpose | Key Implementation |
|------|---------|---------------------|
| `useFetch` | Generic async data fetcher, returns `{data, loading, error, refetch}` | Uses `useRef` to prevent state updates on unmounted components, includes cleanup. |
| `useDebounce` | Delays search input to avoid excessive re‑renders/API calls | Uses `setTimeout` and cleanup inside `useEffect`. |
| `useLocalStorage` | Persists theme preference and any key-value pair in `localStorage` | Wraps `localStorage.getItem/setItem` with `useState`. |
| `useAnalytics` | Abstracts Google Analytics event tracking | Conditionally calls `window.gtag` or falls back to `console.log`. |

## 📊 Data Flow
1. `mockData.js` exports async functions that return financial data after a 1s delay (simulating network).
2. `Dashboard` uses `useFetch(fetchDashboardData)` to obtain `{data, loading, error, refetch}`.
3. While loading, a spinner is shown; error shows a retry button; success renders all child components.
4. Child components receive specific slices of data via props and render accordingly.
5. User interactions (search, CTA clicks, theme toggle) trigger tracking events via `useAnalytics` and update UI state.

## ⚡ Performance Optimizations
- **Lazy Loading** – `SpendingChart` is loaded asynchronously using `React.lazy` and `Suspense`.
- **Memoization** – `SummaryCards` wrapped with `React.memo` to prevent unnecessary re‑renders.
- **Debounced Search** – Search input uses `useDebounce` (500ms) to reduce computational load.
- **Cleanup in Effects** – All `useEffect` hooks return cleanup functions to avoid memory leaks.

## 🔍 SEO & Accessibility
- Semantic HTML (`<header>`, `<main>`, `<section>`).
- Meta tags for title, description, and Open Graph in `index.html`.
- `alt` attributes (where images are present), `aria-label` for icon buttons.
- Keyboard accessibility – all interactive elements are focusable and have focus rings.

## 🤖 Simulated AI Insights
The `AIInsights` component receives an array of strings from `mockData`. The insights are dynamic based on the mock data (e.g., "Your tech exposure increased by 14%"). Each insight has an **Apply Strategy** button that triggers a tracking event and shows a demo alert.

## 🌙 Dark Mode
Toggle button in the header switches between light and dark themes. The preference is saved to `localStorage` and applied on page reload using the `useLocalStorage` hook. All components have dark mode variants using Tailwind's `dark:` modifier.

## 📦 Setup & Running Locally
```bash
git clone <your-repo-url>
cd finance-dashboard
npm install
npm run dev# wealth_curator
