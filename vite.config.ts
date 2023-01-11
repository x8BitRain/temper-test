import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Icons({
      defaultClass: 'tt-icon',
    }),
  ],
  test: {
    include: ['test/**/*.test.ts'],
    includeSource: ['src/**/*.{ts}'],
    environment: 'happy-dom',
  },
})
