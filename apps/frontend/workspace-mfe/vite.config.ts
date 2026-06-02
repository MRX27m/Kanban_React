import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'workspace',
      filename: 'remoteEntry.js',
      exposes: {
        './SelectWorkSpace': './src/components/SelectWorkSpace',
        './WorkSpace': './src/components/WorkSpace',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
        'react-router-dom': { singleton: true, requiredVersion: '^6.26.0' },
        zustand: { singleton: true },
        '@tanstack/react-query': { singleton: true },
      },
    }),
  ],
  server: { port: 3003 },
  preview: { port: 3003 },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
