require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('node:fs');
const path = require('node:path');
const Benchmark = require('benchmark');
const { lexicalAnalysis } = require('@swagger-api/apidom-parser-adapter-json');

const fixturePath = path.join(__dirname, 'fixtures/openapi.json');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'lexical-analysis',
  defer: true,
  minSamples: 1400,
  expected: '780 ops/sec ±1.18% (1474 runs sampled)',
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
