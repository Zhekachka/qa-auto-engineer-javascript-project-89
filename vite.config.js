import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    globals: true,
    server: {
      deps: {
        inline: ['@hexlet/chatbot-v2'],
        fallbackCJS: true,
      },
    },
    deps: {
      optimizer: {
        web: {
          include: ['parse5', 'jsdom'],
        },
      },
    },
  },
})
