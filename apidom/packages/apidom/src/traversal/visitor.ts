import stampit from 'stampit';
import { Element } from 'minim';
import { curryN, F as stubFalse, pipe, propOr } from 'ramda';
import { isString } from 'ramda-adjunct';
import { visit as astVisit } from 'apidom-ast';

import {
  isArrayElement,
  isBooleanElement,
  isMemberElement,
  isNullElement,
  isNumberElement,
  isObjectElement,
  isStringElement,
} from '../predicates';

export { BREAK } from 'apidom-ast';

// getNodeType :: Node -> String
export const getNodeType = <T extends Element>(element: T): string | undefined => {
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

export const keyMapDefault = {
  object: ['content'],
  array: ['content'],
  member: ['key', 'value'],
};

export const PredicateVisitor = stampit({
  props: {
    result: [],
    predicate: stubFalse,
    returnOnTrue: undefined,
    returnOnFalse: undefined,
  },
  init({
    // @ts-ignore
    predicate = this.predicate,
    // @ts-ignore
    returnOnTrue = this.returnOnTrue,
    // @ts-ignore
    returnOnFalse = this.returnOnFalse,
  } = {}) {
    this.result = [];
    this.predicate = predicate;
    this.returnOnTrue = returnOnTrue;
    this.returnOnFalse = returnOnFalse;
  },
  methods: {
    enter(element: Element): undefined {
      if (this.predicate(element)) {
        this.result.push(element);
        return this.returnOnTrue;
      }
      return this.returnOnFalse;
    },
  },
});

// @ts-ignore
export const visit = (
  root: Element,
  // @ts-ignore
  visitor,
  { keyMap = keyMapDefault, ...rest } = {},
): Element => {
  // if visitor is associated with the keymap, we prefer this visitor keymap
  const effectiveKeyMap = propOr(keyMap, 'keyMap', visitor);

  // @ts-ignore
  return astVisit(root, visitor, {
    // @ts-ignore
    keyMap: effectiveKeyMap,
    // @ts-ignore
    nodeTypeGetter: getNodeType,
    nodePredicate: isNode,
    ...rest,
  });
};

// @ts-ignore
visit[Symbol.for('nodejs.util.promisify.custom')] = async (
  root: Element,
  // @ts-ignore
  visitor,
  { keyMap = keyMapDefault, ...rest } = {},
): Promise<Element> => {
  // if visitor is associated with the keymap, we prefer this visitor keymap
  const effectiveKeyMap = propOr(keyMap, 'keyMap', visitor);

  // @ts-ignore
  return astVisit[Symbol.for('nodejs.util.promisify.custom')](root, visitor, {
    // @ts-ignore
    keyMap: effectiveKeyMap,
    // @ts-ignore
    nodeTypeGetter: getNodeType,
    nodePredicate: isNode,
    ...rest,
  });
};
