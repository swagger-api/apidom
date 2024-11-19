import { ArraySlice, Element } from 'minim';

import { PredicateVisitor, visit } from './visitor.ts';

/**
 * Finds all elements matching the predicate.
 * @public
 */
const filter = <T extends Element>(
  predicate: (element: any) => boolean,
  element: T,
): ArraySlice => {
  const visitor = new PredicateVisitor({ predicate });

  visit(element, visitor);

  return new ArraySlice(visitor.result);
};

export default filter;
