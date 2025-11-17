import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Benchmark from 'benchmark';
import type { Event } from 'benchmark';
import { ObjectElement } from '@swagger-api/apidom-core';
import { AsyncApi3Element } from '@swagger-api/apidom-ns-asyncapi-3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/asyncapi.json');
const source = fs.readFileSync(fixturePath).toString();
const pojo = JSON.parse(source);
const genericObjectElement = new ObjectElement(pojo);

const options = {
  name: 'refract',
  minSamples: 600,
  expected: '103 ops/sec ±0.92% (668 runs sampled)',
  fn() {
    AsyncApi3Element.refract(genericObjectElement);
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
