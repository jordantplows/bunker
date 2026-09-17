import { defineConfig } from "vite";
import { resolve } from "node:path";
import blogPlugin from "./vite-plugin-blog.ts";

export default defineConfig({
  plugins: [blogPlugin()],
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "ai-models": resolve(__dirname, "ai-models/index.html"),
        "404": resolve(__dirname, "404.html"),
      },
    },
  },
});
