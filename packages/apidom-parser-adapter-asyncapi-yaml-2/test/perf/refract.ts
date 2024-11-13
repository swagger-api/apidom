import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Benchmark from 'benchmark';
import type { Event } from 'benchmark';
import { ObjectElement, toValue } from '@swagger-api/apidom-core';
import { AsyncApi2Element } from '@swagger-api/apidom-ns-asyncapi-2';

import { parse } from '../../src/adapter.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturePath = path.join(__dirname, 'fixtures/asyncapi.yaml');
const source = fs.readFileSync(fixturePath).toString();
const pojo = toValue((await parse(source)).result);

const genericObjectElement = new ObjectElement(pojo);

const options = {
  name: 'refract',
  minSamples: 600,
  expected: '350 ops/sec ±1.29% (679 runs sampled)',
  fn() {
    AsyncApi2Element.refract(genericObjectElement);
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
