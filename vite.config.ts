import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// 🔴 1. Import Nitro at the top
import { nitro } from "nitro/vite";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    // 🔴 2. Add nitro() right inside your plugins array
    nitro(), 
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});