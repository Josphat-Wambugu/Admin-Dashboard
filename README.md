# Nexus Dashboard

An advanced admin dashboard built with **React**, **TypeScript**, and **Vite**, featuring a full set of pages and a light/dark theme toggle.

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.tsx                 # Root component — page routing & theme state
├── main.tsx                # React entry point
├── index.css               # Global reset
├── types/
│   └── index.ts            # Shared TypeScript types/interfaces
├── theme/
│   └── theme.ts             # DARK and LIGHT theme token objects
├── data/
│   └── mockData.ts          # Mock data used by the pages
├── components/
│   └── ui.tsx               # Shared UI components: Button, Badge, Avatar,
│                             #   Card, ProgressBar, SearchInput, Toggle, etc.
├── layout/
│   └── Layout.tsx            # Sidebar, Header, and page Layout wrapper
└── pages/
    ├── OverviewPage.tsx
    ├── AnalyticsPage.tsx
    ├── UsersPage.tsx
    ├── ProjectsPage.tsx
    ├── MessagesPage.tsx
    ├── CalendarPage.tsx
    ├── SettingsPage.tsx
    ├── HelpPage.tsx
    └── index.ts              # Barrel export
```

## Pages

- **Overview** — KPI stat cards, revenue chart, recent transactions, traffic sources
- **Analytics** — weekly performance chart, user growth, key metrics, system health
- **Users** — searchable user table with roles, statuses, and pagination
- **Projects** — filterable project cards with progress, team avatars, and priority
- **Messages** — split-pane inbox with message list and conversation view
- **Calendar** — monthly calendar grid with events and an upcoming events panel
- **Settings** — profile, notifications, security, and appearance (theme) tabs
- **Help & Support** — searchable help center with topic cards

## Theme Toggle

Click the sun/moon icon in the header (or go to **Settings → Appearance**) to switch between light and dark mode. The theme is controlled centrally in `App.tsx` and passed down to every page and layout component via the `t` (theme) prop.

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (configured for utility classes / `dark:` variants; component styling currently uses theme-token inline styles for dynamic light/dark switching — see `src/theme/theme.ts`)
- [Recharts](https://recharts.org/) for charts
- [Lucide React](https://lucide.dev/) for icons
