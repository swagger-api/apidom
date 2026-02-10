import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-reference',
  libraryName: 'apidomReference',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
