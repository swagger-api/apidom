import Benchmark from 'benchmark';
import type { Event } from 'benchmark';
import { ObjectElement } from '@swagger-api/apidom-core';

import { AsyncApi2Element } from '../../src/index.ts';

const genericObjectElement = new ObjectElement({
  asyncapi: '2.6.0',
  info: {
    title: 'Webhook Example',
    version: '1.0.0',
    description: 'description',
    termsOfService: 'tos',
  },
});

const options = {
  name: 'visitor-shortcut',
  minSamples: 700,
  expected: '640 ops/sec ±0.82% (780 runs sampled)',
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
