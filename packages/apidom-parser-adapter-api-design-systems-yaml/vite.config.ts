import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-api-design-systems-yaml',
  libraryName: 'apidomParserAdapterApiDesignSystemsYaml',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
