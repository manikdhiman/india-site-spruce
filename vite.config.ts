import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: process.env.VERCEL ? true : false,
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
  // ⚡ Explicitly intercept the Rolldown/Vite compilation layer for both client and server bundlers
  vite: {
    ssr: {
      external: ["resend"],
    },
    build: {
      rollupOptions: {
        external: ["resend"],
      },
    },
  },
});