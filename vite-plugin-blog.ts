import type { Plugin, Connect } from "vite";
import fs from "node:fs";
import path from "node:path";
import fm from "front-matter";
import MarkdownIt from "markdown-it";

interface PostMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
}

const md = new MarkdownIt({ html: true, typographer: true });
const POSTS_DIR = path.resolve("posts");

function readPosts(): { meta: PostMeta; html: string }[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f: string) => f.endsWith(".md"))
    .map((file: string) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { attributes, body } = fm<Omit<PostMeta, "slug">>(raw);
      return {
        meta: { ...attributes, slug: file.replace(/\.md$/, "") },
        html: md.render(body),
      };
    })
    .sort(
      (a: { meta: PostMeta }, b: { meta: PostMeta }) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
}

function shell(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — BUNKER</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  html { scroll-behavior: smooth; }
  body { margin: 0; background: #14171A; color: #F2EFE9; font-family: 'Inter Tight', Helvetica, sans-serif; }
  a { color: inherit; text-decoration: none; }
  a:hover { opacity: 0.75; }
  .blog-nav { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 22px 40px; border-bottom: 1px solid rgba(242,239,233,0.14); font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; background: #14171A; }
  .blog-nav a:first-child { font-weight: 500; letter-spacing: 0.3em; }
  .blog-container { max-width: 720px; margin: 0 auto; padding: 80px 40px 120px; }
  .blog-container h1 { font-size: clamp(36px, 5vw, 56px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; margin: 0 0 16px; }
  .blog-container h2 { font-size: 24px; font-weight: 800; letter-spacing: -0.02em; margin: 48px 0 16px; }
  .blog-container h3 { font-size: 20px; font-weight: 600; margin: 36px 0 12px; }
  .blog-container p { font-size: 17px; line-height: 1.7; color: rgba(242,239,233,0.85); margin: 0 0 20px; }
  .blog-container ul, .blog-container ol { font-size: 17px; line-height: 1.7; color: rgba(242,239,233,0.85); padding-left: 24px; margin: 0 0 20px; }
  .blog-container li { margin-bottom: 8px; }
  .blog-container strong { color: #F2EFE9; }
  .blog-container code { font-family: 'IBM Plex Mono', monospace; font-size: 14px; background: rgba(242,239,233,0.08); padding: 2px 6px; border-radius: 3px; }
  .blog-container blockquote { border-left: 2px solid #3F8F5B; margin: 32px 0; padding: 0 0 0 24px; color: rgba(242,239,233,0.7); }
  .blog-meta { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(242,239,233,0.45); margin-bottom: 48px; }
  .post-card { display: block; padding: 40px 0; border-bottom: 1px solid rgba(242,239,233,0.14); }
  .post-card:first-child { border-top: 1px solid rgba(242,239,233,0.14); }
  .post-card h2 { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 10px; }
  .post-card p { font-size: 15px; line-height: 1.6; color: rgba(242,239,233,0.65); margin: 0 0 12px; }
  .post-card .date { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(242,239,233,0.4); }
  .back-link { display: inline-block; font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(242,239,233,0.5); margin-bottom: 48px; }
  .back-link:hover { color: #F2EFE9; }
</style>
</head>
<body>
<nav class="blog-nav">
  <a href="/">BUNKER</a>
  <div style="display:flex; gap:32px">
    <a href="/#approach">Approach</a>
    <a href="/#program">Program</a>
    <a href="/blog/">Blog</a>
  </div>
  <a href="/#join" style="border:1px solid rgba(242,239,233,0.4); padding:8px 16px">Investor briefing</a>
</nav>
<div class="blog-container">
${body}
</div>
</body>
</html>`;
}

function blogIndexHtml(posts: { meta: PostMeta }[]): string {
  const cards = posts
    .map(
      ({ meta }) => `
  <a href="/blog/${meta.slug}/" class="post-card">
    <h2>${meta.title}</h2>
    <p>${meta.description}</p>
    <span class="date">${formatDate(meta.date)}</span>
  </a>`
    )
    .join("\n");

  return shell(
    "Blog",
    `<h1>Blog</h1>
<div class="blog-meta">Research notes and updates from Bunker</div>
${cards}`
  );
}

function postHtml(meta: PostMeta, content: string): string {
  return shell(
    meta.title,
    `<a href="/blog/" class="back-link">← All posts</a>
<h1>${meta.title}</h1>
<div class="blog-meta">${formatDate(meta.date)}</div>
${content}`
  );
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function blogPlugin(): Plugin {
  const virtualIds = new Map<string, string>();

  return {
    name: "bunker-blog",

    configResolved() {
      const posts = readPosts();
      virtualIds.set("blog/index.html", blogIndexHtml(posts));
      for (const post of posts) {
        virtualIds.set(
          `blog/${post.meta.slug}/index.html`,
          postHtml(post.meta, post.html)
        );
      }
    },

    configureServer(server) {
      server.middlewares.use((req: Connect.IncomingMessage, _res: unknown, next: Connect.NextFunction) => {
        const url = req.url ?? "";
        if (url === "/blog" || url === "/blog/") {
          req.url = "/blog/index.html";
        } else if (url.startsWith("/blog/") && !url.endsWith(".html")) {
          const slug = url.replace(/^\/blog\//, "").replace(/\/$/, "");
          if (slug && !slug.includes(".")) {
            req.url = `/blog/${slug}/index.html`;
          }
        }
        next();
      });

      return () => {
        server.middlewares.use((req: Connect.IncomingMessage, res: import("node:http").ServerResponse, next: Connect.NextFunction) => {
          const url = req.url ?? "";
          if (url.startsWith("/blog/")) {
            const filePath = url.slice(1);
            const posts = readPosts();
            const fresh = new Map<string, string>();
            fresh.set("blog/index.html", blogIndexHtml(posts));
            for (const post of posts) {
              fresh.set(
                `blog/${post.meta.slug}/index.html`,
                postHtml(post.meta, post.html)
              );
            }
            const content = fresh.get(filePath);
            if (content) {
              res.setHeader("Content-Type", "text/html");
              res.end(content);
              return;
            }
          }
          next();
        });
      };
    },

    generateBundle() {
      const posts = readPosts();
      const freshIds = new Map<string, string>();
      freshIds.set("blog/index.html", blogIndexHtml(posts));
      for (const post of posts) {
        freshIds.set(
          `blog/${post.meta.slug}/index.html`,
          postHtml(post.meta, post.html)
        );
      }
      for (const [fileName, source] of freshIds) {
        this.emitFile({ type: "asset", fileName, source });
      }
    },
  };
}
