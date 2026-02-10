import { createViteConfig } from '../../config/vite/vite.config.base.ts';

export default createViteConfig({
  packageName: 'apidom-parser-adapter-json-schema-yaml-2020-12',
  libraryName: 'apidomParserAdapterJsonSchemaYaml202012',
  entry: './src/adapter.ts',
  chunkSizeWarningLimit: 1100,
});
