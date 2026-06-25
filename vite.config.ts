import { defineConfig } from "vite";
import path from "path";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react-swc";
import { nitro } from "nitro/vite";

// ⚡ Detects if the build is running on Vercel or locally
const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL;

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    tanstackStart(),
    // 🔴 Inject Nitro ONLY during Vercel's production chunk assembly pipeline
    ...(isVercel ? [nitro()] : []),
    viteReact()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});