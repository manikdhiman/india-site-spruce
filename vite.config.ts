import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// 🔴 Import the official TanStack Start build engine plugin
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    /* 🔴 This handles all full-stack SSR mechanics, pages, and API routes */
    tanstackStart(),
    /* 🔴 This compiles it cleanly as serverless edge bundles for Vercel */
    nitro(),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});