import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-json-pointer',
  libraryName: 'apidomJsonPointer',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
