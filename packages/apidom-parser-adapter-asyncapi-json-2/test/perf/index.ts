import Benchmark from 'benchmark';
import type { Event } from 'benchmark';

import lexicalAnalysisBench from './lexical-analysis';
import syntacticAnalysisBench from './syntactic-analysis';
import refractBench from './refract';
import parseBench from './parse';

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
