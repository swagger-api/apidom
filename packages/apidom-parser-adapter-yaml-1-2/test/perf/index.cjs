require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');

const parseBench = require('./parse-syntactic-analysis-indirect.cjs');
const lexicalAnalysisBench = require('./lexical-analysis.cjs');

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
