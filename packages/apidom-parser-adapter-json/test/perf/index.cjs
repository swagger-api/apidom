require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

const Benchmark = require('benchmark');

const lexicalAnalysisBench = require('./lexical-analysis.cjs');
const parseSyntacticAnalysisDirectBench = require('./parse-syntactic-analysis-direct.cjs');
const parseSyntacticAnalysisIndirectBench = require('./parse-syntactic-analysis-indirect.cjs');

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
