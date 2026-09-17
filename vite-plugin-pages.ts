import type { Plugin, Connect, UserConfig } from "vite";
import fs from "node:fs";
import path from "node:path";
import { routes } from "./src/routes.ts";

function htmlShell(entry: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<script type="module" src="${entry}"></script>
</body>
</html>`;
}

function routeFileName(routePath: string): string {
  if (routePath === "/") return "index.html";
  if (routePath === "/404") return "404.html";
  return `${routePath.slice(1)}/index.html`;
}

const generatedFiles: string[] = [];

export default function pagesPlugin(): Plugin {
  return {
    name: "bunker-pages",
    enforce: "pre",

    config(_cfg, { command }): Partial<UserConfig> | null {
      if (command !== "build") return null;

      const root = process.cwd();
      const input: Record<string, string> = {};

      for (const route of routes) {
        const fileName = routeFileName(route.path);
        const filePath = path.join(root, fileName);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, htmlShell(route.entry));
        generatedFiles.push(filePath);
        const key = route.path === "/" ? "main" : route.path.slice(1).replace(/\//g, "-");
        input[key] = filePath;
      }

      return {
        build: {
          rollupOptions: { input },
        },
      };
    },

    closeBundle() {
      const dirs = new Set<string>();
      for (const f of generatedFiles) {
        try { fs.unlinkSync(f); } catch {}
        dirs.add(path.dirname(f));
      }
      for (const d of dirs) {
        if (d !== process.cwd()) {
          try { fs.rmdirSync(d); } catch {}
        }
      }
      generatedFiles.length = 0;
    },

    configureServer(server) {
      server.middlewares.use((_req: Connect.IncomingMessage, res: import("node:http").ServerResponse, next: Connect.NextFunction) => {
        const url = (_req.url ?? "").split("?")[0] ?? "";

        if (url !== "/" && !url.endsWith("/") && !url.includes(".")) {
          const match = routes.find((r) => r.path === url);
          if (match) {
            res.writeHead(301, { Location: url + "/" });
            res.end();
            return;
          }
        }

        const normalized: string = url.endsWith("/") ? url.slice(0, -1) || "/" : url;
        const route = routes.find((r) => r.path === normalized);

        if (route) {
          const html = htmlShell(route.entry);
          server.transformIndexHtml(url, html).then((transformed) => {
            res.setHeader("Content-Type", "text/html");
            res.end(transformed);
          }).catch(next);
          return;
        }

        next();
      });
    },
  };
}
