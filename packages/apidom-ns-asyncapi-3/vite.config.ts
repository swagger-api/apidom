import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-asyncapi-3',
  libraryName: 'apidomNsAsyncapi3',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
