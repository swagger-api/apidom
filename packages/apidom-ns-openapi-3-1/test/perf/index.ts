import Benchmark from 'benchmark';
import type { Event } from 'benchmark';

import refractBench from './refract';
import visitorShortcutBench from './visitor-shortcut';

const suite = new Benchmark.Suite();

suite
  .add(refractBench)
  .add(visitorShortcutBench)
  // add listeners
  .on('cycle', function (event: Event) {
    console.info(String(event.target));
  })
  .on('complete', function () {
    console.info('\nAll benchmarks have completed');
  })
  // run
  .run();
