import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-json-schema-2019-09',
  libraryName: 'apidomNsJsonSchema201909',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
