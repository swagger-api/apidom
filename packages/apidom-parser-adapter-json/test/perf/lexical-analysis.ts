/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Benchmark from 'benchmark';
import type { Deferred } from 'benchmark';

import analyze from '../../src/lexical-analysis/node';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/data.json');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'lexical-analysis',
  defer: true,
  minSamples: 600,
  expected: '814 ops/sec ±0.48% (677 runs sampled)',
  async fn(deferred: Deferred) {
    await analyze(source);
    deferred.resolve();
  },
};

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
