import { isNotUndefined } from 'ramda-adjunct';
import { Element } from 'minim';

import find from './find.ts';

// tests whether at least one element passes the predicate
const some = <T extends Element>(predicate: (element: any) => boolean, element: T): boolean => {
  return isNotUndefined(find(predicate, element));
};

export default some;
