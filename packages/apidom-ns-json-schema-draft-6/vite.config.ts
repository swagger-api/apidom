import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-json-schema-draft-6',
  libraryName: 'apidomNsJsonSchemaDraft6',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
