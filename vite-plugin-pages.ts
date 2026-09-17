import type { Plugin, Connect } from "vite";
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

export default function pagesPlugin(): Plugin {
  return {
    name: "bunker-pages",

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

    resolveId(id) {
      for (const route of routes) {
        const fileName =
          route.path === "/"
            ? "index.html"
            : route.path === "/404"
              ? "404.html"
              : `${route.path.slice(1)}/index.html`;
        if (id === fileName || id === `/${fileName}`) {
          return id;
        }
      }
      return null;
    },

    load(id) {
      for (const route of routes) {
        const fileName =
          route.path === "/"
            ? "index.html"
            : route.path === "/404"
              ? "404.html"
              : `${route.path.slice(1)}/index.html`;
        if (id === fileName || id === `/${fileName}`) {
          return htmlShell(route.entry);
        }
      }
      return null;
    },

    generateBundle() {
      for (const route of routes) {
        const fileName =
          route.path === "/"
            ? "index.html"
            : route.path === "/404"
              ? "404.html"
              : `${route.path.slice(1)}/index.html`;
        this.emitFile({
          type: "asset",
          fileName,
          source: htmlShell(route.entry),
        });
      }
    },
  };
}
