# Dev

A modern web application built with HonoX and Cloudflare Workers.

## Tech Stack

- [HonoX](https://github.com/honojs/honox) - Full-stack web framework based on Hono
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless execution environment
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## Prerequisites

- Node.js 22.19.0 (managed by Volta)
- pnpm

## Setup

1. Clone the repository

2. Install dependencies:
```bash
pnpm install
```

3. Copy `.env.sample` to `.env` and configure your environment variables:
```bash
cp .env.sample .env
```

4. Edit `.env` with your configuration:
```env
CMS_URL=http://localhost:5173
READ_API_KEY=your-api-key-here
```

## Environment Variables

Environment variables are accessed via `process.env` thanks to the `nodejs_compat_populate_process_env` flag in `wrangler.jsonc`.

| Variable | Description | Required |
|----------|-------------|----------|
| `CMS_URL` | CMS API endpoint URL | Yes |
| `READ_API_KEY` | API key for CMS read access | Yes |

Type definitions for environment variables are available in `app/global.d.ts`.

## Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

For preview with Wrangler:
```bash
pnpm preview
```

## Build

Build the application:
```bash
pnpm build
```

This creates two builds:
1. Client build (static assets)
2. Server build (SSR + SSG)

## Deploy

Deploy to Cloudflare Workers:
```bash
pnpm deploy
```

## Code Quality

This project uses [Biome](https://biomejs.dev/) for code formatting and linting.

Format code:
```bash
pnpm format
```

Run linter:
```bash
pnpm lint
```

Auto-fix lint issues:
```bash
pnpm lint:fix
```

Check formatting and linting:
```bash
pnpm check
```

Auto-fix all issues:
```bash
pnpm check:fix
```

## API Schema Generation

Generate OpenAPI TypeScript types:
```bash
pnpm generate:openapi
```

This fetches the OpenAPI schema from the running dev server and generates type definitions in `lib/openapi/schema.d.ts`.

## Project Structure

```
app/
  routes/         # Application routes
  islands/        # Interactive components
  client.ts       # Client entry point
  server.ts       # Server entry point
  style.css       # Global styles
  global.d.ts     # Global type definitions
lib/
  openapi/        # OpenAPI client and schema
  dist/               # Build output
  wrangler.jsonc      # Cloudflare Workers configuration
  vite.config.ts      # Vite configuration
  package.json        # Project dependencies
```

## Features

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Island architecture for interactive components
- Type-safe API client with OpenAPI
- Markdown rendering support
- Tailwind CSS for styling

