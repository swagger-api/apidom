import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'remove-sourcemaps',
      transform(code) {
        return {
          code,
          map: { mappings: '' },
        };
      },
    },
  ],
  server: {
    port: 3000,
  },
  assetsInclude: ['**/*.wasm'],
  build: {
    target: 'esnext',
    outDir: 'build',
    chunkSizeWarningLimit: 825,
  },
});
