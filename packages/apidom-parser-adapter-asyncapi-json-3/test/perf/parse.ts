import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Benchmark from 'benchmark';
import type { Deferred, Event } from 'benchmark';

import { parse } from '../../src/adapter.ts';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(dirname, 'fixtures/asyncapi.json');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'parse',
  defer: true,
  minSamples: 600,
  expected: '41.22 ops/sec ±1.71% (658 runs sampled)',
  async fn(deferred: Deferred) {
    await parse(source);
    deferred.resolve();
  },
};

/**
 * # Analysis of ApiDOM stages
 *
 * Parse stage: 14,56 ms
 *   Lexical Analysis phase: 0,77 ms
 *   Syntactic Analysis phase: 8,13 ms
 * Refract stage: 9,7 ms
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
