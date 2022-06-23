require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('node:fs');
const path = require('node:path');
const Benchmark = require('benchmark');
const { ObjectElement } = require('@swagger-api/apidom-core');
const { OpenApi3_1Element } = require('@swagger-api/apidom-ns-openapi-3-1');

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
