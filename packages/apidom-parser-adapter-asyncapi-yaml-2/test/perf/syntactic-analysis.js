require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('fs');
const path = require('path');
const Benchmark = require('benchmark');
const { lexicalAnalysis, syntacticAnalysis } = require('apidom-parser-adapter-yaml-1-2');

const fixturePath = path.join(__dirname, 'fixtures/asyncapi.yaml');
const source = fs.readFileSync(fixturePath).toString();
const cstP = lexicalAnalysis(source);

const options = {
  name: 'syntactic-analysis',
  defer: true,
  minSamples: 600,
  expected: '8.70 ops/sec ±0.76% (639 runs sampled)',
  async fn(deferred) {
    const cst = await cstP;
    syntacticAnalysis(cst);
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
