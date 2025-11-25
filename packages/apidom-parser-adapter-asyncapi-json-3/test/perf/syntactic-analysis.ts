import fs from 'node:fs';
import path from 'node:path';
import Benchmark from 'benchmark';
import type { Deferred, Event } from 'benchmark';
import { lexicalAnalysis, syntacticAnalysis } from '@swagger-api/apidom-parser-adapter-json';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(dirname, 'fixtures/asyncapi.json');
const source = fs.readFileSync(fixturePath).toString();
const cstP = lexicalAnalysis(source);

const options = {
  name: 'syntactic-analysis',
  defer: true,
  minSamples: 600,
  expected: '123 ops/sec ±1.38% (676 runs sampled)',
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
