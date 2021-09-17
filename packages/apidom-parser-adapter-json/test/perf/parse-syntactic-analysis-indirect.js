require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('fs');
const path = require('path');
const Benchmark = require('benchmark');

const { parse } = require('../../src/adapter-node');

const fixturePath = path.join(__dirname, 'fixtures/data.json');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'parse-syntactic-analysis-indirect',
  defer: true,
  minSamples: 600,
  expected: '4.45 ops/sec ±0.92% (621 runs sampled)',
  async fn(deferred) {
    await parse(source, { syntacticAnalysis: 'indirect' });
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
