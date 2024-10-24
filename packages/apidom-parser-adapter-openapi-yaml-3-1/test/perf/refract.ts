import fs from 'node:fs';
import path from 'node:path';
import Benchmark from 'benchmark';
import type { Event } from 'benchmark';
import { ObjectElement } from '@swagger-api/apidom-core';
import { OpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/openapi.json');
const source = fs.readFileSync(fixturePath).toString();
const pojo = JSON.parse(source);
const genericObjectElement = new ObjectElement(pojo);

const options = {
  name: 'refract',
  minSamples: 600,
  expected: '55.02 ops/sec ±1.39% (651 runs sampled)',
  fn() {
    OpenApi3_1Element.refract(genericObjectElement);
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
