import Benchmark from 'benchmark';
import type { Event } from 'benchmark';

import openapi31Dereference from './openapi-3-1-dereference.ts';

const suite = new Benchmark.Suite();

suite
  .add(openapi31Dereference)
  // add listeners
  .on('cycle', function (event: Event) {
    console.info(String(event.target));
  })
  .on('complete', function () {
    console.info('\nAll benchmarks have completed');
  })
  // run
  .run();
