import { pathOr } from 'ramda';
import { Element } from 'minim';

import { PredicateVisitor, BREAK, visit } from './visitor.ts';

// find first element that satisfies the provided predicate
const find = <T extends Element>(
  predicate: (element: any) => boolean,
  element: T,
): T | undefined => {
  const visitor = new PredicateVisitor({ predicate, returnOnTrue: BREAK });

  visit(element, visitor);

  return pathOr(undefined, [0], visitor.result);
};

export default find;
