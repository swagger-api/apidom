import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-a2a-yaml-1',
  libraryName: 'apidomParserAdapterA2AYaml1',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
