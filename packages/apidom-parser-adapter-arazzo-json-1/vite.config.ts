import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-arazzo-json-1',
  libraryName: 'apidomParserAdapterArazzoJson1',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
