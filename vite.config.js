import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  base: mode === 'production' ? '/oshi-no-50/' : '/',
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
}))
