import { visit, BREAK } from 'apidom-ast';
import stampit from 'stampit';
import { ArraySlice } from 'minim';
import { Pred, curry, curryN, pipe, F as stubFalse, complement, pathOr } from 'ramda';
import { isString, isNotUndefined } from 'ramda-adjunct';

import {
  isObjectElement,
  isArrayElement,
  isNumberElement,
  isNullElement,
  isBooleanElement,
  isMemberElement,
  isStringElement,
} from './predicates';

// getNodeType :: Node -> String
const getNodeType = <T extends Element>(element: T): string | undefined => {
  /*
   * We're translating every possible higher element type to primitive minim type here.
   * This allows us keep key mapping to minimum.
   */
  /* eslint-disable no-nested-ternary */
  return isObjectElement(element)
    ? 'object'
    : isArrayElement(element)
    ? 'array'
    : isNumberElement(element)
    ? 'number'
    : isNullElement(element)
    ? 'null'
    : isBooleanElement(element)
    ? 'boolean'
    : isMemberElement(element)
    ? 'member'
    : isStringElement(element)
    ? 'string'
    : undefined;
  /* eslint-enable */
};

// isNode :: Node -> Boolean
const isNode = curryN(1, pipe(getNodeType, isString));

const keyMap = {
  object: ['content'],
  array: ['content'],
  member: ['key', 'value'],
};

const Visitor = stampit({
  props: {
    result: [],
    predicate: stubFalse,
    return: undefined,
  },
  init({ predicate }) {
    this.result = [];
    this.predicate = predicate;
  },
  methods: {
    enter(element) {
      if (this.predicate(element)) {
        this.result.push(element);
        return this.return;
      }
      return undefined;
    },
  },
});

// finds all elements matching the predicate
// filter :: Pred -> Element -> ArraySlice
export const filter = curry(
  <T extends Element>(predicate: Pred, element: T): ArraySlice => {
    const visitor = Visitor({ predicate });

    // @ts-ignore
    visit(element, visitor, { keyMap, nodeTypeGetter: getNodeType, nodePredicate: isNode });

    return new ArraySlice(visitor.result);
  },
);

// complement of filter
// reject :: Pred -> Element -> ArraySlice
export const reject = curry(
  <T extends Element>(predicate: Pred, element: T): ArraySlice => {
    return filter(complement(predicate))(element);
  },
);

// first first element in that satisfies the provided predicate
// find :: Pred -> Element -> Element | Undefined
export const find = curry(<T extends Element>(predicate: Pred, element: T): T | undefined => {
  const visitor = Visitor({ predicate, return: BREAK });

  // @ts-ignore
  visit(element, visitor, { keyMap, nodeTypeGetter: getNodeType, nodePredicate: isNode });

  return pathOr(undefined, [0], visitor.result);
});

// tests whether at least one element passes the predicate
// some :: Pred -> Element -> Boolean
export const some = curry(<T extends Element>(predicate: Pred, element: T): boolean => {
  return isNotUndefined(find(predicate)(element));
});
