require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');

const parseSyntacticAnalysisIndirectBench = require('./parse-syntactic-analysis-indirect.cjs');
const lexicalAnalysisBench = require('./lexical-analysis.cjs');

const suite = new Benchmark.Suite();

suite
  .add(parseSyntacticAnalysisIndirectBench)
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
