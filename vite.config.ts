import { defineConfig } from "vite";
import { resolve } from "node:path";
import fs from "node:fs";
import type { Plugin } from "vite";
import blogPlugin from "./vite-plugin-blog.ts";

function trailingSlashPlugin(): Plugin {
  return {
    name: "trailing-slash",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? "";
        if (
          !url.endsWith("/") &&
          !url.includes(".") &&
          fs.existsSync(resolve(import.meta.dirname, url.slice(1), "index.html"))
        ) {
          res.writeHead(301, { Location: url + "/" });
          res.end();
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  appType: "mpa",
  plugins: [trailingSlashPlugin(), blogPlugin()],
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        "ai-models": resolve(import.meta.dirname, "ai-models/index.html"),
        "404": resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
