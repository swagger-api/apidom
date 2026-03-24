import './browser-patch.ts';

// @ts-ignore
import treeSitterYaml from '../../wasm/tree-sitter-yaml.wasm';
import createAnalyze from './analyze.ts';

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
