import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-openapi-3-1',
  libraryName: 'apidomNsOpenapi31',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
