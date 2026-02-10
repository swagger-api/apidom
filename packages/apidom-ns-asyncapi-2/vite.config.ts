import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-asyncapi-2',
  libraryName: 'apidomNsAsyncapi2',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
