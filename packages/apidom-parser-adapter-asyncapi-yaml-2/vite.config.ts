import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-asyncapi-yaml-2',
  libraryName: 'apidomParserAdapterAsyncapiYaml2',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
