require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('fs');
const path = require('path');
const Benchmark = require('benchmark');
const { lexicalAnalysis } = require('apidom-parser-adapter-yaml-1-2');

const fixturePath = path.join(__dirname, 'fixtures/openapi.yaml');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'lexical-analysis',
  defer: true,
  minSamples: 1400,
  expected: '670 ops/sec ±2.63% (1469 runs sampled)',
  async fn(deferred) {
    await lexicalAnalysis(source);
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
