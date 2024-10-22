/* eslint-disable no-console */
import Benchmark from 'benchmark';
import type { Event } from 'benchmark';

import lexicalAnalysisBench from './lexical-analysis';
import parseSyntacticAnalysisDirectBench from './parse-syntactic-analysis-direct';
import parseSyntacticAnalysisIndirectBench from './parse-syntactic-analysis-indirect';

const suite = new Benchmark.Suite();

suite
  .add(lexicalAnalysisBench)
  .add(parseSyntacticAnalysisDirectBench)
  .add(parseSyntacticAnalysisIndirectBench)
  // add listeners
  .on('cycle', function (event: Event) {
    console.info(String(event.target));
  })
  .on('complete', function () {
    console.info('\nAll benchmarks have completed');
  })
  // run
  .run();
