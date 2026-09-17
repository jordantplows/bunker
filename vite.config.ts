import { defineConfig } from "vite";
import blogPlugin from "./vite-plugin-blog.ts";
import pagesPlugin from "./vite-plugin-pages.ts";

export default defineConfig({
  appType: "custom",
  plugins: [pagesPlugin(), blogPlugin()],
  build: {
    outDir: "build",
  },
});
