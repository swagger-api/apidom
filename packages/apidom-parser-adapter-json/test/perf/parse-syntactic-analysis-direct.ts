/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Benchmark, { Deferred } from 'benchmark';

import { parse } from '../../src/adapter-node.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/data.json');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'parse-syntactic-analysis-direct',
  defer: true,
  minSamples: 600,
  expected: '65.55 ops/sec ±1.47% (673 runs sampled)',
  async fn(deferred: Deferred) {
    await parse(source, { syntacticAnalysis: 'direct' });
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
