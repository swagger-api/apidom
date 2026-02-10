import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-api-design-systems',
  libraryName: 'apidomNsApiDesignSystems',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
