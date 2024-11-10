import Benchmark from 'benchmark';
import type { Event } from 'benchmark';

import parseSyntacticAnalysisIndirectBench from './parse-syntactic-analysis-indirect.ts';
import lexicalAnalysisBench from './lexical-analysis.ts';

const suite = new Benchmark.Suite();

suite
  .add(parseSyntacticAnalysisIndirectBench)
  .add(lexicalAnalysisBench)
  // add listeners
  .on('cycle', function (event: Event) {
    console.info(String(event.target));
  })
  .on('complete', function () {
    console.info('\nAll benchmarks have completed');
  })
  // run
  .run();
