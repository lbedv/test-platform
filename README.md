# Test Platform

> **[Live Demo](https://online-testing-sepia.vercel.app/)**

A full-stack web application for taking and creating online tests, built with a monorepo structure for seamless client-server integration.

## Features

- **Dashboard:** View overall statistics, track recent attempts, and monitor completion history.
- **Test Catalog:** Browse, search, filter (by difficulty/category), and sort available tests.
- **Test Taking Interface:** Time-tracked quiz completion with detailed result analysis.
- **User Profiles:** Manage registration details and profile information.
- **User Authentication:** Secure JWT-based authentication with password hashing.
- **Modern UI/UX:** Fully responsive design with Light/Dark mode toggle.

## Tech Stack

### Frontend (`apps/client`)
- **Runtime:** React 19 with TypeScript
- **Build Tool:** Vite 7
- **State & Routing:** TanStack React Query v5, TanStack React Router v1
- **Styling:** Tailwind CSS 4, shadcn/ui (Radix UI components)
- **Forms & Validation:** React Hook Form, Zod
- **UI Utilities:** Lucide React, next-themes, Sonner (toasts)

### Backend (`apps/server`)
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens), bcrypt password hashing
- **Validation:** Zod schemas
- **Security:** CORS middleware

### Shared (`packages/shared`)
- **Validation Schemas:** Zod-based shared schemas for client-server consistency

## Project Structure

```
├── apps/
│   ├── client/                 # React frontend (Vite)
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI (shadcn) & Layouts
│   │   │   ├── features/       # Feature-based modules (auth, catalog, dashboard, etc.)
│   │   │   ├── pages/          # Route components
│   │   │   └── shared/         # Client-side utilities & hooks
│   │
│   └── server/                 # Express REST API
│       ├── src/
│       │   ├── features/       # Vertical slices (auth, tests, attempts - grouped logic)
│       │   ├── middleware/     # Auth, error handling, CORS
│       │   └── app.ts          # Express setup & entry point
│
└── packages/
    └── shared/                 # Shared Zod validation schemas
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB instance (for backend)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lbedv/online-testing
   cd online-testing
   ```

2. Install dependencies (root level - installs all workspaces):
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create `.env` files in `apps/server` with database and JWT configuration

### Development

#### Start Frontend Only
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

#### Start Frontend & Backend
```bash
npm run dev:all
```

#### Start Backend Only
```bash
npm run dev --workspace=apps/server
```

## Available Scripts

All necessary commands can be run from the root directory.

- **`npm install`** - Install dependencies for all workspaces
- **`npm run dev:all`** - Start both frontend and backend in development mode
- **`npm run build`** - Build all apps and packages for production
- **`npm run lint`** / **`npm run type-check`** - Run code quality checks across the monorepo

## Deployment

Deployed on Vercel.

## 📄 License

MIT License
