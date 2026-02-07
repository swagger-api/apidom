import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-yaml-1-2',
  libraryName: 'apidomParserAdapterYaml12',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
