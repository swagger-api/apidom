require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');

const refractBench = require('./refract');
const visitorShortcutBench = require('./visitor-shortcut');

const suite = new Benchmark.Suite();

suite
  .add(refractBench)
  .add(visitorShortcutBench)
  // add listeners
  .on('cycle', function (event) {
    console.info(String(event.target));
  })
  .on('complete', function () {
    console.info('\nAll benchmarks have completed');
  })
  // run
  .run();
