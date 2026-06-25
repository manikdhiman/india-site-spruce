import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // ⚡ This tells Lovable's internal Nitro engine to dynamically output 
  // a Vercel-compatible server bundle only when building on Vercel
  nitro: process.env.VERCEL ? true : false,
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});