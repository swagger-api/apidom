import { Element } from 'minim';

import Transcluder from './Transcluder';

/**
 * This is a mutating function. If you don't want your Element to be mutated,
 * clone in before passing it to this function.
 */
export const transclude = (search: Element, replace: Element, element: Element) => {
  const transcluder = new Transcluder({ element });
  return transcluder.transclude(search, replace);
};

export default Transcluder;
