import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-openapi-2',
  libraryName: 'apidomNsOpenapi2',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
