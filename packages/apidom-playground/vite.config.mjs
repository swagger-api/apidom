import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: 'https://swagger-api.github.io/apidom/',
  plugins: [react()],
  server: {
    port: 3000,
    sourcemap: false,
    sourcemapExcludeSources: true,
  },
  assetsInclude: ['**/*.wasm'],
  build: {
    sourcemap: false,
    sourcemapExcludeSources: true,
    target: 'esnext',
    outDir: 'build',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: { format: 'umd' },
      external: ['fs', 'path'],      
      onwarn(warning, warn) {
        if (warning.message.includes('Use of eval')) return;
        if (warning.message.includes('Module "fs" has been externalized')) return;
        if (warning.message.includes('Module "path" has been externalized')) return;
        warn(warning);
      },
    },
  },
});
