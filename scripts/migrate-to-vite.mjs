#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesDir = path.join(__dirname, '..', 'packages');

// Package name to library name mapping
const libraryNames = {
  'apidom-ast': 'apidomAst',
  'apidom-converter': 'apidomConverter',
  'apidom-core': 'apidomCore',
  'apidom-error': 'apidomError',
  'apidom-json-path': 'apidomJsonPath',
  'apidom-json-pointer': 'apidomJsonPointer',
  'apidom-json-pointer-relative': 'apidomJsonPointerRelative',
  'apidom-logging': 'apidomLogging',
  'apidom-ls': 'apidomLs',
  'apidom-ns-api-design-systems': 'apidomNsApiDesignSystems',
  'apidom-ns-arazzo-1': 'apidomNsArazzo1',
  'apidom-ns-asyncapi-2': 'apidomNsAsyncapi2',
  'apidom-ns-asyncapi-3': 'apidomNsAsyncapi3',
  'apidom-ns-json-schema-2019-09': 'apidomNsJsonSchema201909',
  'apidom-ns-json-schema-2020-12': 'apidomNsJsonSchema202012',
  'apidom-ns-json-schema-draft-4': 'apidomNsJsonSchemaDraft4',
  'apidom-ns-json-schema-draft-6': 'apidomNsJsonSchemaDraft6',
  'apidom-ns-json-schema-draft-7': 'apidomNsJsonSchemaDraft7',
  'apidom-ns-openapi-2': 'apidomNsOpenapi2',
  'apidom-ns-openapi-3-0': 'apidomNsOpenapi30',
  'apidom-ns-openapi-3-1': 'apidomNsOpenapi31',
  'apidom-parser': 'apidomParser',
  'apidom-parser-adapter-api-design-systems-json': 'apidomParserAdapterApiDesignSystemsJson',
  'apidom-parser-adapter-api-design-systems-yaml': 'apidomParserAdapterApiDesignSystemsYaml',
  'apidom-parser-adapter-arazzo-json-1': 'apidomParserAdapterArazzoJson1',
  'apidom-parser-adapter-arazzo-yaml-1': 'apidomParserAdapterArazzoYaml1',
  'apidom-parser-adapter-asyncapi-json-2': 'apidomParserAdapterAsyncapiJson2',
  'apidom-parser-adapter-asyncapi-json-3': 'apidomParserAdapterAsyncapiJson3',
  'apidom-parser-adapter-asyncapi-yaml-2': 'apidomParserAdapterAsyncapiYaml2',
  'apidom-parser-adapter-asyncapi-yaml-3': 'apidomParserAdapterAsyncapiYaml3',
  'apidom-parser-adapter-json': 'apidomParserAdapterJson',
  'apidom-parser-adapter-openapi-json-2': 'apidomParserAdapterOpenapiJson2',
  'apidom-parser-adapter-openapi-json-3-0': 'apidomParserAdapterOpenapiJson30',
  'apidom-parser-adapter-openapi-json-3-1': 'apidomParserAdapterOpenapiJson31',
  'apidom-parser-adapter-openapi-yaml-2': 'apidomParserAdapterOpenapiYaml2',
  'apidom-parser-adapter-openapi-yaml-3-0': 'apidomParserAdapterOpenapiYaml30',
  'apidom-parser-adapter-openapi-yaml-3-1': 'apidomParserAdapterOpenapiYaml31',
  'apidom-parser-adapter-yaml-1-2': 'apidomParserAdapterYaml12',
  'apidom-reference': 'apidomReference',
};

function getLibraryName(packageName) {
  return libraryNames[packageName] || packageName.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function createViteConfig(packageName, libraryName) {
  return `import { createViteConfig } from '../../config/vite/vite.config.base.ts';

const minify = process.env.MINIFY === 'true';

export default createViteConfig({
  packageName: '${packageName}',
  libraryName: '${libraryName}',
  entry: './src/index.ts',
  chunkSizeWarningLimit: 1100,
  minify,
});
`;
}

async function migratePackage(packagePath) {
  const packageName = path.basename(packagePath);
  const packageJsonPath = path.join(packagePath, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Check if package uses webpack
  if (!packageJson.scripts || !packageJson.scripts['build:umd:browser']?.includes('webpack')) {
    return;
  }

  console.log(`Migrating ${packageName}...`);

  // Get library name
  const libraryName = getLibraryName(packageName);

  // Create vite.config.ts
  const viteConfigPath = path.join(packagePath, 'vite.config.ts');
  if (!fs.existsSync(viteConfigPath)) {
    fs.writeFileSync(viteConfigPath, createViteConfig(packageName, libraryName), 'utf8');
    console.log(`  ✓ Created vite.config.ts`);
  } else {
    console.log(`  - vite.config.ts already exists, skipping`);
  }

  // Update package.json script
  if (packageJson.scripts['build:umd:browser'] !== 'vite build && cross-env MINIFY=true vite build') {
    packageJson.scripts['build:umd:browser'] = 'vite build && cross-env MINIFY=true vite build';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
    console.log(`  ✓ Updated package.json`);
  } else {
    console.log(`  - package.json already updated, skipping`);
  }
}

async function main() {
  const packages = fs.readdirSync(packagesDir);

  for (const pkg of packages) {
    const packagePath = path.join(packagesDir, pkg);
    if (fs.statSync(packagePath).isDirectory()) {
      await migratePackage(packagePath);
    }
  }

  console.log('\n✓ Migration complete!');
}

main().catch(console.error);
