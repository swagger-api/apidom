import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Benchmark from 'benchmark';
import type { Deferred, Event } from 'benchmark';
import { lexicalAnalysis, syntacticAnalysis } from '@swagger-api/apidom-parser-adapter-json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/openapi.json');
const source = fs.readFileSync(fixturePath).toString();
const cstP = lexicalAnalysis(source);

const options = {
  name: 'syntactic-analysis',
  defer: true,
  minSamples: 600,
  expected: '66.69 ops/sec ±1.30% (671 runs sampled)',
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
