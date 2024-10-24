import fs from 'node:fs';
import path from 'node:path';
import Benchmark from 'benchmark';
import type { Deferred, Event } from 'benchmark';
import { lexicalAnalysis } from '@swagger-api/apidom-parser-adapter-json';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/openapi.json');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'lexical-analysis',
  defer: true,
  minSamples: 1400,
  expected: '780 ops/sec ±1.18% (1474 runs sampled)',
  async fn(deferred: Deferred) {
    await lexicalAnalysis(source);
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
