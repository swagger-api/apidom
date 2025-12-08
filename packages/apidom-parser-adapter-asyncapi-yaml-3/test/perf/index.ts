import Benchmark from 'benchmark';
import type { Event } from 'benchmark';

import lexicalAnalysisBench from './lexical-analysis.ts';
import syntacticAnalysisBench from './syntactic-analysis.ts';
import refractBench from './refract.ts';
import parseBench from './parse.ts';

const suite = new Benchmark.Suite();

suite
  .add(lexicalAnalysisBench)
  .add(syntacticAnalysisBench)
  .add(refractBench)
  .add(parseBench)
  // add listeners
  .on('cycle', function (event: Event) {
    console.info(String(event.target));
  })
  .on('complete', function () {
    console.info('\nAll benchmarks have completed');
  })
  // run
  .run();
