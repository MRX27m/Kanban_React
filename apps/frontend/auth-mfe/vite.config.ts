import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './LoginPage': './src/components/LoginPage',
        './RegisterPage': './src/components/RegisterPage',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
        'react-router-dom': { singleton: true, requiredVersion: '^6.26.0' },
        zustand: { singleton: true },
      },
    }),
  ],
  server: { port: 3002 },
  preview: { port: 3002 },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
