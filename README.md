# MovieOn

A clean, fast online movie UI built with **Next.js 15** and **Tailwind CSS v4**. Focused on modern theming, accessibility, and DX.

## Overview

- Repository: [github/MovieOn](https://github.com/ldanh270/movie-on)
- Design: [figma/MovieOn](https://www.figma.com/design/JUm0ZPXFneSCVI0kRQNzCX/MovieOn?node-id=20-565&t=OZpMAp3OYFcs1E2M-1)
- Owner: [ldanh270](https://github.com/ldanh270)

## Features

- Light/Dark theming via CSS variables and Tailwind v4 `@theme`.
- Dark mode toggle by adding/removing `.dark` on `<html>` (or via a `ThemeProvider`).
- Semantic color tokens: `background`, `foreground`, `primary`, `muted`, `card`, `border`, `ring`, etc.
- Google Fonts with `next/font` (title, body, accent).
- Animations with `tw-animate-css`.
- App Router structure and SEO-ready metadata.

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS v4 (`@import 'tailwindcss'`, `@theme`)
- TypeScript
- next/font (Google Fonts)

## Requirements

- Node.js ≥ 18.18
- pnpm, npm, or yarn

## Getting Started

```bash
# clone
git clone <repo-url>
cd movieon

# install deps
pnpm i   # or npm i / yarn

# run dev
pnpm dev # or npm run dev / yarn dev

# build & start
pnpm build && pnpm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Scripts

- `dev` – start Next.js dev server
- `build` – production build
- `start` – start production server

## Project Structure

```
app/
  layout.tsx
  page.tsx
components/
  theme-provider.tsx
styles/
  globals.css
public/
  logo.svg
```

## Theming

Tailwind v4 tokens are mapped through `@theme` in `styles/globals.css`.

- Light mode tokens live under `:root`.
- Dark mode tokens live under `.dark`.
- Toggle dark by adding/removing `.dark` on `<html>` or `<body>`.

Example usage:

```tsx
<button className="bg-primary text-primary-foreground rounded-lg px-5 py-2">Watch Now</button>
```

## Fonts

Configured with `next/font/google` and exposed as CSS variables:

- **Title**: Oswald → `--font-title`
- **Body**: Source Sans 3 → `--font-text`
- **Accent**: Montserrat Alternates → `--font-accent`

Attach variables to `<body>` and map to Tailwind via `@theme`.

## Deployment

- Vercel (recommended): connect repository and deploy.
- Self-host: `pnpm build && pnpm start`.

## Contributing

Issues and PRs are welcome. Please keep commits scoped and descriptive.

## License

MIT © <your-name>
