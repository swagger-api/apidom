import { complement, Pred } from 'ramda';
import { ArraySlice, Element } from 'minim';

import filter from './filter';

// complement of filter
const reject = <T extends Element>(predicate: Pred, element: T): ArraySlice => {
  return filter(complement(predicate), element);
};

export default reject;
