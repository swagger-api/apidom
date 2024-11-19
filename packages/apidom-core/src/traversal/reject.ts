import { complement } from 'ramda';
import { ArraySlice, Element } from 'minim';

import filter from './filter.ts';

/**
 * Complement of filter.
 * @public
 */
const reject = <T extends Element>(
  predicate: (element: any) => boolean,
  element: T,
): ArraySlice => {
  return filter(complement(predicate), element);
};

export default reject;
