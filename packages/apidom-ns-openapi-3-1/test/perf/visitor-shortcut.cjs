require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');
const { ObjectElement } = require('@swagger-api/apidom-core');

const { OpenApi3_1Element } = require('../../src');

const genericObjectElement = new ObjectElement({
  openapi: '3.1.0',
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
    OpenApi3_1Element.refract(genericObjectElement);
  },
};

module.exports = options;

// we're running as a script
if (module.parent === null) {
  const bench = new Benchmark({
    ...options,
    onComplete(event) {
      console.info(String(event.target));
    },
    onError(event) {
      console.error(event);
    },
  });
  bench.run();
}
