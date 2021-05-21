require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');

const parseBench = require('./parse');
const lexicalAnalysisBench = require('./lexical-analysis');

const suite = new Benchmark.Suite();

suite
  .add(parseBench)
  .add(lexicalAnalysisBench)
  // add listeners
  .on('cycle', function (event) {
    console.info(String(event.target));
  })
  .on('complete', function () {
    console.info('\nAll benchmarks have completed');
  })
  // run
  .run();
