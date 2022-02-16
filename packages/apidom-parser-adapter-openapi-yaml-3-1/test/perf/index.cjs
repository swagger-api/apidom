require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');

const lexicalAnalysisBench = require('./lexical-analysis.cjs');
const syntacticAnalysisBench = require('./syntactic-analysis.cjs');
const refractBench = require('./refract.cjs');
const parseBench = require('./parse.cjs');

const suite = new Benchmark.Suite();

suite
  .add(lexicalAnalysisBench)
  .add(syntacticAnalysisBench)
  .add(refractBench)
  .add(parseBench)
  // add listeners
  .on('cycle', function (event) {
    console.info(String(event.target));
  })
  .on('complete', function () {
    console.info('\nAll benchmarks have completed');
  })
  // run
  .run();
