# Bunker — Build Reference

## Overview

Bunker is a static marketing site with a blog, built with **Vite 8** and **TypeScript 7**. The blog is powered by a custom Vite plugin that reads Markdown files from disk and emits them as static HTML pages at build time. There is no framework (no React, no Vue) — the frontend is vanilla TypeScript modules attached to a hand-written `index.html`.

## Project Structure

```
bunker/
├── index.html              # Landing page (entry point for Vite)
├── src/
│   ├── main.ts             # JS entry — wires up all client modules
│   ├── contours.ts         # Generates SVG contour-line animation for hero
│   ├── reveal.ts           # IntersectionObserver scroll-reveal animations
│   └── program-steps.ts    # Scroll-driven diagram highlight for "Program" section
├── posts/                  # Blog content (Markdown with YAML frontmatter)
│   ├── why-eradication.md
│   └── causal-mapping.md
├── vite-plugin-blog.ts     # Custom Vite plugin — the blog engine
├── vite.config.ts          # Vite config (loads the blog plugin)
├── tsconfig.json           # TypeScript config
├── package.json            # Dependencies and scripts
└── dist/                   # Build output (git-ignored)
    ├── index.html
    ├── assets/             # Hashed JS/CSS bundles
    └── blog/
        ├── index.html                  # Blog index page
        ├── why-eradication/index.html  # Individual post
        └── causal-mapping/index.html   # Individual post
```

## NPM Scripts

| Command         | What it does                                                              |
| --------------- | ------------------------------------------------------------------------- |
| `npm run dev`   | Starts Vite dev server with HMR on `localhost:5173`                       |
| `npm run build` | Runs `tsc` (type-check only, `noEmit: true`) then `vite build` to `dist/`|
| `npm run preview`| Serves the `dist/` folder locally on `localhost:4173`                    |
| `npm start`     | Same as preview, but binds to `0.0.0.0` on `$PORT` (default 4173) — used for production hosting |

## How the Build Works

### 1. Type-checking (`tsc`)

The `build` script runs `tsc` first. TypeScript is configured with `noEmit: true`, so it only validates types — it does not produce output files. Vite handles the actual transpilation via its own TS/esbuild pipeline. The tsconfig compiles `src/`, `vite.config.ts`, and `vite-plugin-blog.ts`.

Key strictness flags: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`.

### 2. Vite build (`vite build`)

Vite processes `index.html` as the entry point. It:

1. Discovers `<script type="module" src="/src/main.ts">` in `index.html`
2. Bundles `main.ts` → `contours.ts`, `reveal.ts`, `program-steps.ts` into hashed JS assets in `dist/assets/`
3. Emits the processed `index.html` to `dist/`

### 3. Blog generation (custom Vite plugin)

The file `vite-plugin-blog.ts` exports a Vite plugin named `bunker-blog` that handles the entire blog pipeline:

#### Blog content pipeline

1. **Read**: Scans the `posts/` directory for `.md` files
2. **Parse frontmatter**: Uses `front-matter` to extract YAML metadata (`title`, `date`, `description`) from each post
3. **Derive slug**: The filename minus `.md` becomes the URL slug
4. **Render Markdown**: Uses `markdown-it` (with `html: true` and `typographer: true`) to convert the body to HTML
5. **Sort**: Posts are sorted newest-first by `date`
6. **Wrap in shell**: Each post and the blog index get a full HTML document with inline CSS (nav, typography, styles matching the main site's design)

#### Build-time behavior (`generateBundle` hook)

During `vite build`, the plugin emits the generated HTML pages as Vite assets:

- `blog/index.html` — the blog listing page with post cards
- `blog/{slug}/index.html` — one page per post

These are emitted via `this.emitFile()`, so they appear in `dist/` alongside the main site output.

#### Dev-time behavior (`configureServer` hook)

During `npm run dev`, the plugin registers two middleware layers:

1. **URL rewriter** (early): Normalizes `/blog` and `/blog/` to `/blog/index.html`, and `/blog/{slug}` to `/blog/{slug}/index.html`
2. **HTML server** (late, after Vite's own middleware): Intercepts `/blog/*` requests, re-reads and re-renders the Markdown files on every request (so edits to posts are reflected without restart), and serves the HTML directly

This means the blog works in dev with live content refresh, without needing Vite HMR wiring for the Markdown files.

## Client-Side Modules

All client JS is vanilla TypeScript — no framework, no dependencies.

- **`main.ts`**: Entry point. Checks `prefers-reduced-motion`, then initializes all modules.
- **`contours.ts`**: Programmatically generates 14 SVG sine-wave paths for the hero background. Applies a slow `drift` CSS animation (60s, alternating) unless reduced motion is preferred.
- **`reveal.ts`**: Finds all `[data-reveal]` elements, hides them with `opacity: 0` and a slight downward offset, then uses an `IntersectionObserver` (threshold 0.15) to fade them in on scroll. Each element reveals once and is then unobserved.
- **`program-steps.ts`**: Watches the four `[data-step]` elements in the "Program" section with an `IntersectionObserver` (root margin `-40% 0px -50% 0px`). As each step scrolls into the viewport center, it highlights the corresponding concentric rectangle in the SVG diagram and updates the stage label.

## Dependencies

| Package          | Purpose                                     |
| ---------------- | ------------------------------------------- |
| `vite`           | Build tool, dev server, bundler             |
| `typescript`     | Type-checking (build step only)             |
| `markdown-it`    | Markdown → HTML rendering (blog plugin)     |
| `front-matter`   | YAML frontmatter parsing (blog plugin)      |

Dev dependencies are just `@types/markdown-it` and `@types/node`.

## Adding a Blog Post

Create a new `.md` file in `posts/` with YAML frontmatter:

```markdown
---
title: Post Title
date: 2026-09-03
description: One-line summary shown on the blog index.
---

Post body in Markdown.
```

The filename (minus `.md`) becomes the URL slug. The post appears automatically — no config changes needed.

## Build Output

`npm run build` produces `dist/` with:

- `index.html` — the main landing page
- `assets/` — hashed JS bundle(s) and any processed CSS
- `blog/index.html` — blog listing
- `blog/{slug}/index.html` — one per post

The output is fully static and can be served from any static host or CDN. The `npm start` script serves it via Vite's preview server for production use.
