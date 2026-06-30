import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: process.env.VERCEL ? true : false,
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
  // ✨ Cleaned configuration layer allows Vite/Rolldown to inline server dependencies correctly
  vite: {
    ssr: {
      // Avoid making 'resend' completely external on server bundles
      noExternal: ["resend", "lucide-react"],
    },
  },
});