import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ls',
  libraryName: 'apidomLs',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
