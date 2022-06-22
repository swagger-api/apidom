require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('node:fs');
const path = require('node:path');
const Benchmark = require('benchmark');
const { lexicalAnalysis, syntacticAnalysis } = require('@swagger-api/apidom-parser-adapter-yaml-1-2');

const fixturePath = path.join(__dirname, 'fixtures/openapi.yaml');
const source = fs.readFileSync(fixturePath).toString();
const cstP = lexicalAnalysis(source);

const options = {
  name: 'syntactic-analysis',
  defer: true,
  minSamples: 600,
  expected: '4.63 ops/sec ±0.95% (622 runs sampled)',
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
