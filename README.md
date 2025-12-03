# MovieOn

A modern, performant movie browsing interface built with Next.js 15 and Tailwind CSS v4. Designed with focus on theming capabilities, accessibility standards, and developer experience.

## Overview

- Repository: [github.com/ldanh270/movie-on](https://github.com/ldanh270/movie-on)
- Design System: [Figma Design Files](https://www.figma.com/design/JUm0ZPXFneSCVI0kRQNzCX/MovieOn?node-id=20-565&t=OZpMAp3OYFcs1E2M-1)
- Maintained by: [ldanh270](https://github.com/ldanh270)

## Key Features

- Dynamic light and dark theme system using CSS custom properties and Tailwind CSS v4 theme directive
- Client-side theme persistence with HTML class-based dark mode implementation
- Semantic color token system supporting background, foreground, primary, muted, card, border, and focus ring variants
- Optimized font loading using Next.js font optimization with Google Fonts integration
- Animation utilities powered by tw-animate-css library
- Modern App Router architecture with built-in SEO optimization

## Technology Stack

- Next.js 15 with App Router
- Tailwind CSS v4 with native CSS import and theme configuration
- TypeScript for type safety
- Next.js Font Optimization for Google Fonts

## System Requirements

- Node.js version 18.18 or higher
- Package manager: pnpm (recommended), npm, or yarn

## Installation and Setup

```bash
# Clone the repository
git clone https://github.com/ldanh270/movie-on.git
cd movie-on

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Production build and deployment
pnpm build
pnpm start
```

The development server will be available at `http://localhost:3000`.

## Available Scripts

- `dev` - Starts the Next.js development server with hot reload
- `build` - Creates an optimized production build
- `start` - Runs the production server

## Project Architecture

```
app/
  layout.tsx          # Root layout with theme providers
  page.tsx            # Home page component
components/
  theme-provider.tsx  # Theme context and toggle logic
styles/
  globals.css         # Global styles and Tailwind configuration
public/
  logo.svg            # Application logo and static assets
```

## Theme System

The application uses Tailwind CSS v4 theme tokens defined in `styles/globals.css`.

**Implementation Details:**

- Light mode variables are defined in the `:root` selector
- Dark mode variables are scoped under the `.dark` class selector
- Theme switching is handled by toggling the `.dark` class on the HTML or body element

**Usage Example:**

```tsx
<button className="bg-primary text-primary-foreground rounded-lg px-5 py-2">Watch Now</button>
```

## Typography Configuration

The project uses Next.js font optimization with three Google Font families:

- **Oswald** - Headings and titles (CSS variable: `--font-title`)
- **Source Sans 3** - Body text (CSS variable: `--font-text`)
- **Montserrat Alternates** - Accent elements (CSS variable: `--font-accent`)

Font variables are applied to the body element and integrated with Tailwind CSS through the theme directive.

## Deployment

**Vercel (Recommended):**

1. Connect your GitHub repository to Vercel
2. Configure build settings (automatically detected)
3. Deploy with zero configuration

**Self-Hosted:**

```bash
pnpm build
pnpm start
```

Ensure environment variables are properly configured for production deployment.

## Contributing

Contributions are welcome. Please follow these guidelines:

- Submit detailed issue reports with reproduction steps
- Keep pull requests focused and well-documented
- Follow the existing code style and conventions
- Write descriptive commit messages

## License

MIT License - See LICENSE file for details
