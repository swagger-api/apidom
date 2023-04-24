import { Pred } from 'ramda';
import { ArraySlice, Element } from 'minim';

import { PredicateVisitor, visit } from './visitor';

// finds all elements matching the predicate
const filter = <T extends Element>(predicate: Pred, element: T): ArraySlice => {
  const visitor = PredicateVisitor({ predicate });

  visit(element, visitor);

  return new ArraySlice(visitor.result);
};

export default filter;
