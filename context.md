Developer Guidelines & Best Practices

This project follows a scalable, production-ready React architecture inspired by modern industry standards (TanStack ecosystem & Bulletproof React principles).
The goal is to keep the codebase predictable, maintainable, and easy to scale.

1. Project Architecture

The application is organized by feature/domain, not by file type.

src/
  app/                # App-level setup (providers, router)
  routes/             # Centralized routing configuration
  features/           # Feature-based modules (core of the app)
  components/         # Shared, reusable UI components
  lib/                # Shared utilities & configuration
  types/              # Global TypeScript types

Feature Structure

Each feature is self-contained and may include:

features/games/
  api/                # API calls related to games
  hooks/              # Feature-specific hooks
  components/         # UI components used only by this feature
  types.ts            # Feature-specific types


Rule:
Features must not directly depend on each other’s internals.

2. Routing (TanStack Router)

All routing is centralized in src/routes.

Rules

Never hardcode URLs

Always import route paths from PathConstants.tsx

import PathConsts from 'src/routes/PathConstants';

<Link to={PathConsts.MY_GAMES} />


❌ Bad:

<Link to="/user/games" />

Adding a New Page

Create the page component in src/pages/

Lazy-load it in src/routes/Pages.tsx

Add the path to PathConstants.tsx

Register the route in router.tsx

Protected Routes

Pages that require authentication must be children of protectedRoute.
Authentication checks and redirects are handled automatically at the routing level.

Route Parameters

Always access route params using:

useParams({ from: '/route/path' })


(from @tanstack/react-router)

3. Data Fetching & Server State (TanStack Query)

All server state is managed by TanStack Query.

Rules

❌ Do NOT use useEffect + fetch

✅ Use useQuery for data fetching

✅ Use useMutation for create/update/delete

❌ Do NOT store server data in React Context or local state

API Layer

All API calls must live in feature-specific API files.

features/games/api/gamesApi.ts

export const getGames = () => api.get('/games');


Components never call fetch or axios directly.

Custom Hooks

Complex or repeated data logic must be wrapped in custom hooks:

useGames()
useCreateGame()


This keeps components focused on UI.

4. State Management Strategy

The application clearly separates three types of state:

1. Server State

Managed by TanStack Query

Cached, refetched, and synchronized automatically

2. Global Client State

Used only when truly global (auth, theme)

Implemented using React Context

Provided at app/router level

3. Local Component State

Managed with useState or useReducer

UI-only concerns (modals, form inputs)

5. Component Design Philosophy

Components follow Single Responsibility Principle

Favor composition over large, complex components

Extract reusable logic into custom hooks

Avoid prop drilling (lift state only when necessary)

6. Styling (Tailwind CSS)

Use Tailwind utility classes directly in JSX

Avoid custom CSS unless absolutely necessary

Global styles belong in src/index.css

For complex conditional styles, use clsx

7. TypeScript & Code Quality

strict: true is enabled — type safety is mandatory

All props must be explicitly typed

Functional components and hooks only

Always run npm run lint before committing

8. Naming & File Organization

Components: PascalCase → GameCard.tsx

Hooks: useCamelCase → useGames.ts

Feature folders: lowercase and descriptive

Colocate related files for complex components

Use index.ts barrel files to control exports

9. Imports

Use absolute imports via src/

Import order:

React

Third-party libraries

Absolute src/ imports

Relative imports

Type-only imports

10. Error Handling
UI Errors

Use TanStack Router error boundaries

Display graceful fallback UIs

Query & Mutation Errors

Handle isError and error from useQuery

Use onError in mutations for user notifications

Rule:
Never show raw error objects or stack traces to users.