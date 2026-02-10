import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-openapi-yaml-2',
  libraryName: 'apidomParserAdapterOpenapiYaml2',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
