import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Benchmark from 'benchmark';
import type { Deferred, Event } from 'benchmark';

import { parse } from '../../src/adapter.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/openapi.yaml');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'parse',
  defer: true,
  minSamples: 600,
  expected: '4.25 ops/sec ±0.72% (620 runs sampled)',
  async fn(deferred: Deferred) {
    await parse(source);
    deferred.resolve();
  },
};

/**
 * # Analysis of ApiDOM stages
 *
 * Parse stage: 235,29 ms
 *   Lexical Analysis phase: 1,49 ms
 *   Syntactic Analysis phase: 215,98 ms
 * Refract stage: 18,18 ms
 */

export default options;

// we're running as a script
if (import.meta.url === `file://${process.argv[1]}`) {
  const bench = new Benchmark({
    ...options,
    onComplete(event: Event) {
      console.info(String(event.target));
    },
    onError(event: Event) {
      console.error(event);
    },
  });
  bench.run();
}
