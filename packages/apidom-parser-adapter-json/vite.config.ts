import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-json',
  libraryName: 'apidomParserAdapterJson',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
