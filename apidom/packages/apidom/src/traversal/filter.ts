import { curry, Pred } from 'ramda';
import { ArraySlice, Element } from 'minim';

import { PredicateVisitor, visit } from './visitor';

// finds all elements matching the predicate
// filter :: Pred -> Element -> ArraySlice
const filter = curry(<T extends Element>(predicate: Pred, element: T): ArraySlice => {
  const visitor = PredicateVisitor({ predicate });

  // @ts-ignore
  visit(element, visitor);

  return new ArraySlice(visitor.result);
});

export default filter;
