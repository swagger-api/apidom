import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-json-path',
  libraryName: 'apidomJsonPath',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
