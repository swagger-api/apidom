import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// eslint-disable-next-line import/no-relative-packages
import { wasmUrlLoader } from '../../config/vite/vite.config.base.ts';

export default defineConfig({
  base: 'https://swagger-api.github.io/apidom/',
  plugins: [wasmUrlLoader(), react()],
  server: {
    port: 3000,
    sourcemap: false,
    sourcemapExcludeSources: true,
  },
  worker: { format: 'es', plugins: () => [wasmUrlLoader()] },
  assetsInclude: ['**/*.wasm'],
  build: {
    sourcemap: false,
    sourcemapExcludeSources: true,
    target: 'esnext',
    outDir: 'build',
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
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
