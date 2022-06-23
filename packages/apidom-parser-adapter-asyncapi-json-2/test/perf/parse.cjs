require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const fs = require('node:fs');
const path = require('node:path');
const Benchmark = require('benchmark');

const { parse } = require('../../src/adapter');

const fixturePath = path.join(__dirname, 'fixtures/asyncapi.json');
const source = fs.readFileSync(fixturePath).toString();

const options = {
  name: 'parse',
  defer: true,
  minSamples: 600,
  expected: '41.22 ops/sec ±1.71% (658 runs sampled)',
  async fn(deferred) {
    await parse(source);
    deferred.resolve();
  },
};

/**
 * # Analysis of ApiDOM stages
 *
 * Parse stage: 14,56 ms
 *   Lexical Analysis phase: 0,77 ms
 *   Syntactic Analysis phase: 8,13 ms
 * Refract stage: 9,7 ms
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
