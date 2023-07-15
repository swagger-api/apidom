require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('node:fs');
const path = require('node:path');
const Benchmark = require('benchmark');

const { parse: parseSyntacticAnalysisIndirect } = require('../../src/adapter-node');

const fixturePath = path.join(__dirname, 'fixtures/data.yaml');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'parse-syntactic-analysis-indirect',
  defer: true,
  minSamples: 600,
  expected: '68.33 ops/sec ±0.29% (675 runs sampled)',
  async fn(deferred) {
    await parseSyntacticAnalysisIndirect(source);
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
