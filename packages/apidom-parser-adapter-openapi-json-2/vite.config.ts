import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-openapi-json-2',
  libraryName: 'apidomParserAdapterOpenapiJson2',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
