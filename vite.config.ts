import { defineConfig } from "vite";
import path from "path";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    // 🔴 Native framework plugins that Vite understands cleanly
    tanstackStart(),
    viteReact()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});