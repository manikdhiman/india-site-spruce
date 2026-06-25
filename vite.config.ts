import { defineConfig } from "vite";
import path from "path";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  // 🔴 Clear out manually added nitro() and react() plugins. 
  // tanstackStart() handles both automatically under the hood!
  plugins: [
    tanstackStart()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});