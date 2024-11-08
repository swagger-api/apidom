import Benchmark from 'benchmark';
import type { Event } from 'benchmark';

import refractBench from './refract.ts';
import visitorShortcutBench from './visitor-shortcut.ts';

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
