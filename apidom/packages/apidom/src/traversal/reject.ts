import { complement, curry, Pred } from 'ramda';
import { ArraySlice, Element } from 'minim';

import filter from './filter';

// complement of filter
// reject :: Pred -> Element -> ArraySlice
const reject = curry(<T extends Element>(predicate: Pred, element: T): ArraySlice => {
  return filter(complement(predicate))(element);
});

export default reject;
