# Dev

A modern web application built with HonoX and Cloudflare Workers.

## Tech Stack

- [HonoX](https://github.com/honojs/honox) - Full-stack web framework based on Hono
- [Cloudflare Workers](https://workers.cloudflare.com/) - Serverless execution environment
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [unified](https://unifiedjs.com/) (remark / rehype) + [Shiki](https://shiki.style/) - Markdown rendering & syntax highlighting
- [Biome](https://biomejs.dev/) - Formatter & linter

This repository is both a runnable app and a package published to GitHub Packages,
which can be consumed as a CLI (`dev-cli`) from a separate content repository.
See [PUBLISHING.md](./PUBLISHING.md) for details.

## Prerequisites

- Node.js 24.18.0 (managed by [Volta](https://volta.sh/))
- pnpm 10.16+ (the repo enables the `minimumReleaseAge` supply-chain safeguard, which requires pnpm >= 10.16)

## Setup

1. Clone the repository

2. Install dependencies:
```bash
pnpm install
```

   > Dependency resolution is protected by a release cooldown: `minimumReleaseAge: 10080`
   > in `pnpm-workspace.yaml` makes pnpm resolve only package versions that have been
   > public for at least 7 days, mitigating supply-chain attacks via freshly published
   > malicious versions. Use `minimumReleaseAgeExclude` to bypass it for specific versions.

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

## Content

Blog posts are Markdown (`.md` / `.mdx`) files. By default they live in
`contents/posts/` and are served under `/posts/<slug>`. Each post supports
frontmatter:

```md
---
title: "Post Title"
description: "Short summary"
topics: ["React", "TypeScript"]
icon: "tea-cup"
private: true
---

Post body in Markdown...
```

Set `private: true` to keep a post out of the public list (handled in
`app/routes/posts/_middleware.ts` and `lib/content/markdown.ts`). Code blocks are
highlighted at build time with Shiki.

The content source and routing are configured in `dev.config.ts`:

```ts
const config: DevConfig = {
  postsDir: "contents/posts",        // where Markdown posts are read from
  routes: {
    postsPrefix: "/posts",           // base path for posts
    indexBehavior: "directory",      // "directory" | "explicit"
  },
};
```

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
  routes/
    posts/
      [slug].tsx        # Individual post page (SSG)
      _middleware.ts    # Post route middleware (SSG params)
    server/
      markdown/         # Server API route for markdown
    index.tsx           # Home / post list
    _renderer.tsx       # HTML renderer
    _404.tsx            # Not found page
    _error.tsx          # Error page
  islands/
    counter.tsx         # Interactive island component
  client.ts             # Client entry point
  server.ts             # Server entry point
  style.css             # Global styles
  global.d.ts           # Global type definitions
lib/
  content/
    markdown.ts         # Markdown loading & rendering
  openapi/
    apiClient.ts        # Typed OpenAPI client
    schema.d.ts         # Generated OpenAPI types
contents/
  posts/                # Markdown posts (configurable via dev.config.ts)
bin/
  cli.js                # `dev-cli` entry point
public/                 # Static assets
dev.config.ts           # Content & routing configuration
vite.config.ts          # Vite configuration
wrangler.jsonc          # Cloudflare Workers configuration
```

## Features

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Island architecture for interactive components
- Type-safe API client with OpenAPI
- Markdown rendering with frontmatter and Shiki syntax highlighting
- Private posts (`private: true` frontmatter)
- Configurable content directory and routing via `dev.config.ts`
- Distributable as a CLI package (`dev-cli`)
- Tailwind CSS for styling

