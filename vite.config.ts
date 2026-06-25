import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  // We use the standard React plugin. This stops Rolldown from crashing 
  // because it removes the experimental full-stack SSR server-side loops.
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensures a clean, optimized client-side production build
    target: "esnext",
    minify: "esbuild",
  }
});