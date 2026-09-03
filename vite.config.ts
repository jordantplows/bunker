import { defineConfig } from "vite";
import blogPlugin from "./vite-plugin-blog.ts";

export default defineConfig({
  plugins: [blogPlugin()],
  build: {
    outDir: "build",
  },
});
