import { ArraySlice, Element } from 'minim';

import { PredicateVisitor, visit } from './visitor';

// finds all elements matching the predicate
const filter = <T extends Element>(
  predicate: (element: unknown) => boolean,
  element: T,
): ArraySlice => {
  const visitor = new PredicateVisitor({ predicate });

  visit(element, visitor);

  return new ArraySlice(visitor.result);
};

export default filter;
