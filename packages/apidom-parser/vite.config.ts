import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser',
  libraryName: 'apidomParser',
  entry: './src/parser.ts',
  chunkSizeWarningLimit: 1100,
});
