import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-openapi-3-2',
  libraryName: 'apidomNsOpenapi32',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
