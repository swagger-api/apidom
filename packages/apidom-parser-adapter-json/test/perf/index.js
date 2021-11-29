require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');

const lexicalAnalysisBench = require('./lexical-analysis');
const parseSyntacticAnalysisDirectBench = require('./parse-syntactic-analysis-direct');
const parseSyntacticAnalysisIndirectBench = require('./parse-syntactic-analysis-indirect');

const suite = new Benchmark.Suite();

suite
  .add(lexicalAnalysisBench)
  .add(parseSyntacticAnalysisDirectBench)
  .add(parseSyntacticAnalysisIndirectBench)
  // add listeners
  .on('cycle', function (event) {
    console.info(String(event.target));
  })
  .on('complete', function () {
    console.info('\nAll benchmarks have completed');
  })
  // run
  .run();
