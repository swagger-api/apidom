import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Benchmark from 'benchmark';
import type { Deferred, Event } from 'benchmark';

import { parse } from '../../src/adapter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/openapi.json');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'parse',
  defer: true,
  minSamples: 600,
  expected: '25.06 ops/sec ±1.16% (656 runs sampled)',
  async fn(deferred: Deferred) {
    await parse(source);
    deferred.resolve();
  },
};

/**
 * # Analysis of ApiDOM stages
 *
 * Parse stage: 24,15 ms
 *   Lexical Analysis phase: 1,28 ms
 *   Syntactic Analysis phase: 14,99 ms
 *     Traversing time: 0,59 ms
 *     Building time: 14,39 ms
 * Refract stage: 15,75 ms
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
