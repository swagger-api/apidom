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
  expected: '25.06 ops/sec ±1.16% (656 runs sampled)',
  async fn(deferred) {
    await parse(source);
    deferred.resolve();
  },
};

/**
 * # Analysis of ApiDOM stages
 *
 * Parse stage: 24,15 ms
 *   Lexical Analysis phase: 1,28 ms
 *   Syntactic Analysis phase: 14,99 ms
 *     Traversing time: 0,59 ms
 *     Building time: 14,39 ms
 * Refract stage: 15,75 ms
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
