require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');

const parsingSyntacticAnalysisDirectBench = require('./parsing-syntactic-analysis-direct');
const parsingSyntacticAnalysisIndirectBench = require('./parsing-syntactic-analysis-indirect');

const suite = new Benchmark.Suite();

suite
  .add(parsingSyntacticAnalysisDirectBench)
  .add(parsingSyntacticAnalysisIndirectBench)
  // add listeners
  .on('cycle', function (event) {
    console.info(String(event.target));
  })
  .on('complete', function () {
    console.info('\nAll benchmarks have completed');
  })
  // run
  .run();
