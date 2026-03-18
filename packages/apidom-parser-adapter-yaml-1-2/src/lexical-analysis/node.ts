import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import createAnalyze from './analyze.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

const treeSitterYamlPath = resolve(__dirname, '../../wasm/tree-sitter-yaml.wasm');
const treeSitterYaml = fs.readFileSync(treeSitterYamlPath);

/**
 * Lexical Analysis of source string using WebTreeSitter.
 * This is WebAssembly version of TreeSitters Lexical Analysis.
 *
 * Given JavaScript doesn't support true parallelism, this
 * code should be as lazy as possible and temporal safety should be fine.
 * @public
 */
const analyze = createAnalyze(treeSitterYaml);

export default analyze;
