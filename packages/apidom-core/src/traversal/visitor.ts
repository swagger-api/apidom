import { Element } from 'minim';
import { F as stubFalse, pipe } from 'ramda';
import { isString } from 'ramda-adjunct';
import {
  visit as astVisit,
  BREAK,
  mergeAllVisitors,
  cloneNode as cloneNodeDefault,
} from '@swagger-api/apidom-ast';

import {
  isElement,
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
import { cloneShallow } from '../clone';

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
};

// cloneNode :: a -> a
export const cloneNode = <T>(node: T): T => {
  if (isElement(node)) {
    return cloneShallow(node as Element) as T;
  }
  return cloneNodeDefault(node);
};

// isNode :: Node -> Boolean
export const isNode = pipe(getNodeType, isString);

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

export interface PredicateVisitorOptions {
  readonly predicate?: (element: unknown) => boolean;
  readonly returnOnTrue?: unknown;
  readonly returnOnFalse?: unknown;
}

export class PredicateVisitor {
  public result: Element[];

  protected readonly predicate: (element: unknown) => boolean;

  protected readonly returnOnTrue: unknown;

  protected readonly returnOnFalse: unknown;

  constructor({
    predicate = stubFalse,
    returnOnTrue = undefined,
    returnOnFalse = undefined,
  }: PredicateVisitorOptions = {}) {
    this.result = [];
    this.predicate = predicate;
    this.returnOnTrue = returnOnTrue;
    this.returnOnFalse = returnOnFalse;
  }

  public enter(element: Element): unknown {
    if (this.predicate(element)) {
      this.result.push(element);
      return this.returnOnTrue;
    }
    return this.returnOnFalse;
  }
}

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
    nodeCloneFn: cloneNode,
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
    nodeCloneFn: cloneNode,
    ...rest,
  });
};
