import stampit from 'stampit';
import { ArraySlice } from 'minim';
import { Pred, curry, curryN, pipe, F as stubFalse, complement, pathOr, defaultTo } from 'ramda';
import { isString, isFunction, isNotUndefined, noop } from 'ramda-adjunct';
import { visit, BREAK } from 'apidom-ast';

import {
  isElement,
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

const PredicateVisitor = stampit({
  props: {
    result: [],
    predicate: stubFalse,
    return: undefined,
  },
  // @ts-ignore
  init({ predicate = this.predicate } = {}) {
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

const CallbackVisitor = stampit(PredicateVisitor, {
  props: {
    callback: noop,
  },
  // @ts-ignore
  init({ callback = this.callback } = {}) {
    this.callback = callback;
  },
  methods: {
    enter(element) {
      if (this.predicate(element)) {
        this.callback(element);
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
    const visitor = PredicateVisitor({ predicate });

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
  const visitor = PredicateVisitor({ predicate, return: BREAK });

  // @ts-ignore
  visit(element, visitor, { keyMap, nodeTypeGetter: getNodeType, nodePredicate: isNode });

  return pathOr(undefined, [0], visitor.result);
});

// tests whether at least one element passes the predicate
// some :: Pred -> Element -> Boolean
export const some = curry(<T extends Element>(predicate: Pred, element: T): boolean => {
  return isNotUndefined(find(predicate)(element));
});

type Callback = <T extends Element>(element: T) => void;
interface TraverseOptions {
  callback?: Callback;
  predicate?: Pred;
}

// executes the callback on this object and all descendants
// traverse :: Callback | { predicate: Pred, callback: Callback } -> Element -> Undefined
export const traverse = curry(
  <T extends Element>(options: Callback | TraverseOptions, element: T): void => {
    let callback;
    let predicate;

    if (isFunction(options)) {
      callback = options;
    } else {
      ({ callback, predicate } = options);
    }

    const visitor = CallbackVisitor({
      callback: defaultTo(noop, callback),
      predicate: defaultTo(isElement, predicate),
    });

    // @ts-ignore
    visit(element, visitor, { keyMap, nodeTypeGetter: getNodeType, nodePredicate: isNode });
  },
);
