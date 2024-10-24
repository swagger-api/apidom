import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Benchmark from 'benchmark';
import type { Deferred, Event } from 'benchmark';
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';

import { dereferenceApiDOM } from '../../src/configuration/saturated';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/openapi-3-1.json');
const source = fs.readFileSync(fixturePath).toString();
const apidom = OpenApi3_1Element.refract(JSON.parse(source));

const options = {
  name: 'openapi-3-1-dereference',
  defer: true,
  minSamples: 600,
  expected: '1,738 ops/sec ±2.66% (674 runs sampled)',
  async fn(deferred: Deferred) {
    await dereferenceApiDOM(apidom);
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
