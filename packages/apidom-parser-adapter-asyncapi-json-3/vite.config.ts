import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-asyncapi-json-3',
  libraryName: 'apidomParserAdapterAsyncapiJson3',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
