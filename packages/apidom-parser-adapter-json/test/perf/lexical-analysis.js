require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('fs');
const path = require('path');
const Benchmark = require('benchmark');

const { default: analyze } = require('../../src/lexical-analysis/node');

const fixturePath = path.join(__dirname, 'fixtures/data.json');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'lexical-analysis',
  defer: true,
  minSamples: 600,
  expected: '814 ops/sec ±0.48% (677 runs sampled)',
  async fn(deferred) {
    await analyze(source);
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
