import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
})
