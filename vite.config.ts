import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: process.env.VERCEL ? true : false,
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
  // ⚡ This tells the compiler to safely treat 'resend' as a standard external server dependency
  vite: {
    ssr: {
      external: ["resend"],
    },
  },
});