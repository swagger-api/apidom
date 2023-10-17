import { isNotUndefined } from 'ramda-adjunct';
import { Element } from 'minim';

import find from './find';

// tests whether at least one element passes the predicate
const some = <T extends Element>(predicate: (val: unknown) => boolean, element: T): boolean => {
  return isNotUndefined(find(predicate, element));
};

export default some;
