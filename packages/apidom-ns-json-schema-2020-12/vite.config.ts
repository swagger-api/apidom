import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ns-json-schema-2020-12',
  libraryName: 'apidomNsJsonSchema202012',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
