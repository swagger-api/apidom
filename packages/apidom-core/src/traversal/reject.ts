import { complement } from 'ramda';
import { ArraySlice, Element } from 'minim';

import filter from './filter';

// complement of filter
const reject = <T extends Element>(
  predicate: (val: unknown) => boolean,
  element: T,
): ArraySlice => {
  return filter(complement(predicate), element);
};

export default reject;
