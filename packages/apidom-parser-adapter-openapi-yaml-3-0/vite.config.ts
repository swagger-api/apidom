import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-openapi-yaml-3-0',
  libraryName: 'apidomParserAdapterOpenapiYaml30',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
