import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-openapi-yaml-3-2',
  libraryName: 'apidomParserAdapterOpenapiYaml32',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
