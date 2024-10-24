import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Benchmark from 'benchmark';
import type { Deferred, Event } from 'benchmark';

import { parse } from '../../src/adapter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/asyncapi.yaml');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'parse',
  defer: true,
  minSamples: 600,
  expected: '8.26 ops/sec ±0.92% (639 runs sampled)',
  async fn(deferred: Deferred) {
    await parse(source);
    deferred.resolve();
  },
};

/**
 * # Analysis of ApiDOM stages
 *
 * Parse stage: 121,06 ms
 *   Lexical Analysis phase: 0,89 ms
 *   Syntactic Analysis phase: 114,94 ms
 * Refract stage: 2,85 ms
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
