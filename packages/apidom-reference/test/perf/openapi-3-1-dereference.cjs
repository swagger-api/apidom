require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('node:fs');
const path = require('node:path');
const Benchmark = require('benchmark');
const { OpenApi3_1Element } = require('@swagger-api/apidom-ns-openapi-3-1')

const { dereferenceApiDOM } = require('../../src/configuration/saturated')

const fixturePath = path.join(__dirname, 'fixtures/openapi-3-1.json');
const source = fs.readFileSync(fixturePath).toString();
const apidom = OpenApi3_1Element.refract(JSON.parse(source))

const options = {
  name: 'openapi-3-1-dereference',
  defer: true,
  minSamples: 600,
  expected: '1,738 ops/sec ±2.66% (674 runs sampled)',
  async fn(deferred) {
    await dereferenceApiDOM(apidom);
    deferred.resolve();
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
