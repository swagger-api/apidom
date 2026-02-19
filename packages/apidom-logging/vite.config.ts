import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-logging',
  libraryName: 'apidomLogging',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
});
