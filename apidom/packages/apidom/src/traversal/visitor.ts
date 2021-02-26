import stampit from 'stampit';
import { Element } from 'minim';
import { curryN, F as stubFalse, pipe } from 'ramda';
import { isString } from 'ramda-adjunct';
import { visit as astVisit, BREAK, mergeAllVisitors } from 'apidom-ast';

import {
  isMemberElement,
  isArrayElement,
  isStringElement,
  isBooleanElement,
  isLinkElement,
  isRefElement,
  isObjectElement,
  isNullElement,
  isNumberElement,
} from '../predicates';

export { BREAK, mergeAllVisitors };

// getNodeType :: Node -> String
export const getNodeType = <T extends Element>(element: T): string | undefined => {
  /*
   * We're translating every possible higher element type to primitive minim type here.
   * We're using polymorphism to recognize any higher element type as ObjectElement or ArrayElement.
   * Using polymorphism allows us to assume any namespace.
   *
   * There is a problem with naming visitor methods described here: https://github.com/babel/babel/discussions/12874
   */
  /* eslint-disable no-nested-ternary */
  return isObjectElement(element)
    ? 'ObjectElement'
    : isArrayElement(element)
    ? 'ArrayElement'
    : isMemberElement(element)
    ? 'MemberElement'
    : isStringElement(element)
    ? 'StringElement'
    : isBooleanElement(element)
    ? 'BooleanElement'
    : isNumberElement(element)
    ? 'NumberElement'
    : isNullElement(element)
    ? 'NullElement'
    : isLinkElement(element)
    ? 'LinkElement'
    : isRefElement(element)
    ? 'RefElement'
    : undefined;
  /* eslint-enable */
};

// isNode :: Node -> Boolean
const isNode = curryN(1, pipe(getNodeType, isString));

export const keyMapDefault = {
  ObjectElement: ['content'],
  ArrayElement: ['content'],
  MemberElement: ['key', 'value'],
  StringElement: [],
  BooleanElement: [],
  NumberElement: [],
  NullElement: [],
  RefElement: [],
  LinkElement: [],
  Annotation: [],
  Comment: [],
  ParseResultElement: ['content'],
  SourceMap: ['content'],
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
  // @ts-ignore
  return astVisit(root, visitor, {
    // @ts-ignore
    keyMap,
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
  // @ts-ignore
  return astVisit[Symbol.for('nodejs.util.promisify.custom')](root, visitor, {
    // @ts-ignore
    keyMap,
    // @ts-ignore
    nodeTypeGetter: getNodeType,
    nodePredicate: isNode,
    ...rest,
  });
};
