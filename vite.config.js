import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 프론트에서 '/api'로 호출하면 8080으로 프록시
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // 필요시:
        // rewrite: (path) => path.replace(/^\/api/, ''), // 백엔드가 /api prefix를 안 쓴다면
      },
    },
  },
});
