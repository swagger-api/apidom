import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-core',
  libraryName: 'apidomCore',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
