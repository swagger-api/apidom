require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');
const { ObjectElement } = require('@swagger-api/apidom-core');

const { AsyncApi2Element } = require('../../src');

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
