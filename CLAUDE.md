# CLAUDE.md - LLM Agent Instructions

## Project Overview

HonoX blog + research knowledge base framework deployed to Cloudflare Workers.
Published as `@karukan029/dev` npm package. Content lives in consuming repos (e.g., dev-blog).

## Tech Stack

- Framework: HonoX (Hono meta-framework)
- Build: Vite + Wrangler
- Deploy: Cloudflare Workers
- Styling: Tailwind CSS v4
- Language: TypeScript (strict mode)
- Linter/Formatter: Biome (`pnpm check`, `pnpm check:fix`)
- Package Manager: pnpm

## Content Locations

- Blog posts: `contents/posts/` (or consumer repo's `postsDir`)
- Research raw sources: `contents/research/raw/`
- Research wiki: `contents/research/wiki/`
- Config: `dev.config.ts` (sections.research.dir for wiki path)

## Research Wiki Operations

### Frontmatter Schema

```yaml
---
title: "Article Title"
category: "category-name"
tags: ["tag1", "tag2"]
sources: ["raw/source-dir-name"]
related: ["other-wiki-slug"]
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
status: "draft" | "review" | "stable"
---
```

### Compiling Raw -> Wiki

1. Read all files in the specified `raw/<source>/` directory
2. Create or update a wiki article in `wiki/<topic>.md`
3. Use the frontmatter schema above
4. Set status to "draft" for new articles
5. Add cross-references via `related` field
6. Update `wiki/_index.md` after any article creation/deletion

### Updating the Index (`wiki/_index.md`)

Use `lib/research/index-generator.ts`:
- Scans all `.md` files in `wiki/` (excluding `_index.md`)
- Groups by `category` frontmatter field
- Lists each article with title, status, and tags
- Includes a "Recently Updated" section (top 10 by `updated` date)

### Linting the Wiki

Use `lib/research/linter.ts`. Checks for:
- Broken related links (references to non-existent wiki slugs)
- Missing required frontmatter fields (title, category, status, created, updated)
- Orphan articles (not linked from any other article)
- Missing backlinks (A links to B, but B doesn't list A in `related`)
- Raw sources with no corresponding wiki article
- Stale drafts (not updated in 30+ days)

### Q&A Mode

When asked a question about the wiki:
1. Read `wiki/_index.md` for overview
2. Read relevant wiki articles (use tags/categories to narrow scope)
3. If needed, read raw sources for deeper detail
4. Answer with citations in the form `[source: wiki/topic-name]`
5. If the answer reveals a gap, suggest a new wiki article

### Output Generation

- Reports go to `wiki/` with category "report"
- Use standard markdown

## Code Conventions

- TypeScript strict mode, ESNext target
- Biome for formatting and linting (run `pnpm check` before committing)
- HonoX route pattern: `createRoute(async (c) => { ... })`
- SSG params in `_middleware.ts` files
- Imports use `@dev-config` alias for config
- Do not modify `contents/posts/` without explicit user request
