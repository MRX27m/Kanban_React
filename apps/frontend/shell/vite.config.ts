import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        auth: "http://localhost:3002/assets/remoteEntry.js",
        workspace: "http://localhost:3003/assets/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.3.1" },
        "react-dom": { singleton: true, requiredVersion: "^18.3.1" },
        "react-router-dom": { singleton: true, requiredVersion: "^6.26.0" },
        zustand: { singleton: true },
        "@tanstack/react-query": { singleton: true },
      },
    }),
  ],
  server: { port: 3001 },
  preview: { port: 3001 },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
