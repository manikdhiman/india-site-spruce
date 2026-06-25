import { defineConfig } from "@tanstack/react-start/config";
import path from "path";

// ⚡ We use the native TanStack defineConfig wrapper. 
// This automatically injects the exact plugins, compiler adapters, and 
// server bundles needed for Vercel without manual arrays.
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});