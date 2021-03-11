import { curry, pathOr, Pred } from 'ramda';
import { Element } from 'minim';

import { PredicateVisitor, BREAK, visit } from './visitor';

// find first element that satisfies the provided predicate
// find :: Pred -> Element -> Element | Undefined
const find = curry(<T extends Element>(predicate: Pred, element: T): T | undefined => {
  const visitor = PredicateVisitor({ predicate, returnOnTrue: BREAK });

  // @ts-ignore
  visit(element, visitor);

  return pathOr(undefined, [0], visitor.result);
});

export default find;
