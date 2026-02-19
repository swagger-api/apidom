import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { defineConfig, type UserConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import terser from '@rollup/plugin-terser';
import type { Plugin } from 'rollup';

/**
 * Rollup plugin that replicates webpack file-loader behavior for WASM files:
 * emits each .wasm file as a separate asset with a hash-based name and
 * returns its URL as the module export value.
 */
function wasmUrlLoader(): Plugin {
  return {
    name: 'wasm-url-loader',
    load(id) {
      if (!id.endsWith('.wasm')) return null;
      const source = readFileSync(id);
      const hash = createHash('md5').update(source).digest('hex');
      const refId = this.emitFile({ type: 'asset', fileName: `${hash}.wasm`, source });
      return `export default import.meta.ROLLUP_FILE_URL_${refId}`;
    },
  };
}

/**
 * Configuration options for creating a Vite build config.
 */
export interface ViteConfigOptions {
  /**
   * Name of the package (e.g., 'apidom-core')
   */
  packageName: string;
  /**
   * Global variable name for UMD (e.g., 'apidomCore')
   */
  libraryName: string;
  /**
   * Entry file path relative to package root (default: './src/index.ts')
   */
  entry?: string;
  /**
   * Size warning limit in KB (default: 1100)
   */
  chunkSizeWarningLimit?: number;
  /**
   * Whether to minify (default: false)
   */
  minify?: boolean;
}

/**
 * Creates a Vite configuration for building UMD browser bundles.
 * Generates both minified and non-minified versions in a single build.
 */
export function createViteConfig(options: Omit<ViteConfigOptions, 'minify'>): UserConfig {
  const {
    packageName,
    libraryName,
    entry = './src/index.ts',
    chunkSizeWarningLimit = 1100,
  } = options;

  return defineConfig({
    mode: 'production',
    plugins: [wasmUrlLoader(), topLevelAwait()],
    build: {
      target: 'esnext',
      outDir: 'dist',
      emptyOutDir: true,
      minify: false, // Minification handled per-output
      sourcemap: false,
      lib: {
        entry: path.resolve(entry),
        name: libraryName,
      },
      rollupOptions: {
        plugins: [],
        external: ['fs', 'path'],
        output: [
          // Non-minified build
          {
            format: 'umd',
            name: libraryName,
            entryFileNames: `${packageName}.browser.js`,
            exports: 'named',
            compact: false,
            globals: {
              fs: 'fs',
              path: 'path',
            },
            inlineDynamicImports: false,
            plugins: [],
          },
          // Minified build
          {
            format: 'umd',
            name: libraryName,
            entryFileNames: `${packageName}.browser.min.js`,
            exports: 'named',
            compact: true,
            globals: {
              fs: 'fs',
              path: 'path',
            },
            inlineDynamicImports: false,
            plugins: [
              terser({
                compress: {
                  warnings: false,
                },
                format: {
                  comments: false,
                },
              }),
            ],
          },
        ],
        onwarn(warning, warn) {
          // Suppress known safe warnings
          if (warning.message?.includes('Use of eval')) return;
          if (warning.message?.includes('Module "fs" has been externalized')) return;
          if (warning.message?.includes('Module "path" has been externalized')) return;
          if (warning.message?.includes('depends on Node.js built-in modules')) return;
          if (warning.code === 'UNRESOLVED_IMPORT' && warning.exporter?.endsWith('.wasm')) return;
          if (warning.message?.includes('.wasm')) return;
          if (warning.message?.includes('Circular dependency')) return;
          warn(warning);
        },
      },
      chunkSizeWarningLimit,
    },
    resolve: {
      extensions: ['.ts', '.mjs', '.js', '.json'],
    },
    esbuild: {
      target: 'es2015',
      supported: {
        'top-level-await': false,
      },
    },
  });
}

/**
 * Creates both minified and non-minified Vite configurations.
 * Use this to generate an array of configs for building both versions.
 */
export function createDualViteConfigs(options: Omit<ViteConfigOptions, 'minify'>): UserConfig[] {
  return [
    createViteConfig({ ...options, minify: false }),
    createViteConfig({ ...options, minify: true }),
  ];
}
