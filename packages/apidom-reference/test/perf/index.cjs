require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');

const openapi31Dereference = require('./openapi-3-1-dereference.cjs');

const suite = new Benchmark.Suite();

suite
  .add(openapi31Dereference)
  // add listeners
  .on('cycle', function (event) {
    console.info(String(event.target));
  })
  .on('complete', function () {
    console.info('\nAll benchmarks have completed');
  })
  // run
  .run();
