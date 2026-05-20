import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tsconfigPaths from "vite-tsconfig-paths";
import { build } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await build({
  root,
  configFile: false,
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(root, "index.netlify.html"),
    },
  },
});

await rename(path.join(root, "dist", "index.netlify.html"), path.join(root, "dist", "index.html"));
await writeFile(path.join(root, "dist", "_redirects"), "/* /index.html 200\n");
