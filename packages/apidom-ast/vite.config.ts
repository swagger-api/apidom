import { createViteConfig } from 'apidom-monorepo/config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-ast',
  libraryName: 'apidomAst',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
