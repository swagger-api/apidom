import Benchmark from 'benchmark';
import type { Event } from 'benchmark';
import { ObjectElement } from '@swagger-api/apidom-core';

import { OpenApi3_2Element } from '../../src/index.ts';

const genericObjectElement = new ObjectElement({
  openapi: '3.2.0',
  info: {
    title: 'Webhook Example',
    version: '1.0.0',
    description: 'description',
    summary: 'summary',
    termsOfService: 'tos',
  },
});

const options = {
  name: 'visitor-shortcut',
  minSamples: 500,
  expected: '303 ops/sec ±1.93% (578 runs sampled)',
  fn() {
    OpenApi3_2Element.refract(genericObjectElement);
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
