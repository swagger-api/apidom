import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Benchmark from 'benchmark';
import type { Deferred, Event } from 'benchmark';
import { lexicalAnalysis, syntacticAnalysis } from '@swagger-api/apidom-parser-adapter-yaml-1-2';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/asyncapi.yaml');
const source = fs.readFileSync(fixturePath).toString();
const cstP = lexicalAnalysis(source);

const options = {
  name: 'syntactic-analysis',
  defer: true,
  minSamples: 600,
  expected: '8.70 ops/sec ±0.76% (639 runs sampled)',
  async fn(deferred: Deferred) {
    const cst = await cstP;
    syntacticAnalysis(cst);
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
