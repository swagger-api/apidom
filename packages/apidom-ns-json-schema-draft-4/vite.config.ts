import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-json-schema-draft-4',
  libraryName: 'apidomNsJsonSchemaDraft4',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
