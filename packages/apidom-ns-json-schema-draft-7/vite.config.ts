import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-json-schema-draft-7',
  libraryName: 'apidomNsJsonSchemaDraft7',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
