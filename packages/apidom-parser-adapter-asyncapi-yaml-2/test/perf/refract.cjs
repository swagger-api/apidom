require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('node:fs');
const path = require('node:path');
const Benchmark = require('benchmark');
const { ObjectElement } = require('apidom-core');
const { AsyncApi2Element } = require('apidom-ns-asyncapi-2');

const fixturePath = path.join(__dirname, 'fixtures/asyncapi.yaml');
const source = fs.readFileSync(fixturePath).toString();
const pojo = JSON.parse(source);
const genericObjectElement = new ObjectElement(pojo);

const options = {
  name: 'refract',
  minSamples: 600,
  expected: '350 ops/sec ±1.29% (679 runs sampled)',
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
