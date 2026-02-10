import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-openapi-json-3-0',
  libraryName: 'apidomParserAdapterOpenapiJson30',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
