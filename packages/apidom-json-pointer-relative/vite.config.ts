import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-json-pointer-relative',
  libraryName: 'apidomJsonPointerRelative',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
