import { defineConfig } from "vite";
import path from "path";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  // 🔴 We include tanstackStart so it knows how to handle the TSX entry points,
  // but we pass standard vite options to keep things stable.
  plugins: [
    tanstackStart()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 🔴 Force the bundler to skip any experimental server edge compilation steps
  build: {
    ssr: false,
    target: "esnext"
  }
});