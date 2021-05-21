require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('fs');
const path = require('path');
const Benchmark = require('benchmark');

const { parse } = require('../../src/adapter');

const fixturePath = path.join(__dirname, 'fixtures/openapi.json');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'parse',
  defer: true,
  minSamples: 600,
  expected: '8.88 ops/sec ±1.09% (642 runs sampled)',
  async fn(deferred) {
    await parse(source);
    deferred.resolve();
  },
};

/**
 * # Analysis of ApiDOM stages
 *
 * Parse stage: 112,61 ms
 *   Lexical Analysis phase: 1,42 ms
 *   Syntactic Analysis phase: 85,91 ms
 * Refract stage: 18,18 ms
 */

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
