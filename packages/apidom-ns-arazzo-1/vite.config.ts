import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-arazzo-1',
  libraryName: 'apidomNsArazzo1',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
