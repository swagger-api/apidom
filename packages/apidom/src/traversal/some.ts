import { curry, Pred } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { Element } from 'minim';

import find from './find';

// tests whether at least one element passes the predicate
// some :: Pred -> Element -> Boolean
const some = curry(<T extends Element>(predicate: Pred, element: T): boolean => {
  return isNotUndefined(find(predicate)(element));
});

export default some;
