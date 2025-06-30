import {
  Element,
  StringElement,
  NumberElement,
  NullElement,
  BooleanElement,
  ArrayElement,
  ObjectElement,
  MemberElement,
  LinkElement,
  RefElement,
} from 'minim';
import { all } from 'ramda';
import { included } from 'ramda-adjunct';

import AnnotationElement from '../elements/Annotation.ts';
import CommentElement from '../elements/Comment.ts';
import ParserResultElement from '../elements/ParseResult.ts';
import createPredicate, { isElementType as isElementTypeHelper } from './helpers.ts';
import type { ElementPredicate } from './helpers.ts';

/**
 * @public
 */
export const isElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  return (element: unknown): element is Element =>
    element instanceof Element ||
    (hasBasicElementProps(element) && primitiveEq(undefined, element));
});

/**
 * @public
 */
export const isStringElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  return (element: unknown): element is StringElement =>
    element instanceof StringElement ||
    (hasBasicElementProps(element) && primitiveEq('string', element));
});

/**
 * @public
 */
export const isNumberElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  return (element: unknown): element is NumberElement =>
    element instanceof NumberElement ||
    (hasBasicElementProps(element) && primitiveEq('number', element));
});

/**
 * @public
 */
export const isNullElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  return (element: unknown): element is NullElement =>
    element instanceof NullElement ||
    (hasBasicElementProps(element) && primitiveEq('null', element));
});

/**
 * @public
 */
export const isBooleanElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  return (element: unknown): element is BooleanElement =>
    element instanceof BooleanElement ||
    (hasBasicElementProps(element) && primitiveEq('boolean', element));
});

/**
 * @public
 */
export const isObjectElement = createPredicate(
  ({ hasBasicElementProps, primitiveEq, hasMethod }) => {
    return (element: unknown): element is ObjectElement =>
      element instanceof ObjectElement ||
      (hasBasicElementProps(element) &&
        primitiveEq('object', element) &&
        hasMethod('keys', element) &&
        hasMethod('values', element) &&
        hasMethod('items', element));
  },
);

/**
 * @public
 */
export const isArrayElement = createPredicate(
  ({ hasBasicElementProps, primitiveEq, hasMethod }) => {
    return (element: unknown): element is ArrayElement =>
      (element instanceof ArrayElement && !(element instanceof ObjectElement)) ||
      (hasBasicElementProps(element) &&
        primitiveEq('array', element) &&
        hasMethod('push', element) &&
        hasMethod('unshift', element) &&
        hasMethod('map', element) &&
        hasMethod('reduce', element));
  },
);

/**
 * @public
 */
export const isMemberElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is MemberElement =>
      element instanceof MemberElement ||
      (hasBasicElementProps(element) &&
        isElementType('member', element) &&
        primitiveEq(undefined, element));
  },
);

/**
 * @public
 */
export const isLinkElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is LinkElement =>
      element instanceof LinkElement ||
      (hasBasicElementProps(element) &&
        isElementType('link', element) &&
        primitiveEq(undefined, element));
  },
);

/**
 * @public
 */
export const isRefElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is RefElement =>
      element instanceof RefElement ||
      (hasBasicElementProps(element) &&
        isElementType('ref', element) &&
        primitiveEq(undefined, element));
  },
);

/**
 * @public
 */
export const isAnnotationElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is AnnotationElement =>
      element instanceof AnnotationElement ||
      (hasBasicElementProps(element) &&
        isElementType('annotation', element) &&
        primitiveEq('array', element));
  },
);

/**
 * @public
 */
export const isCommentElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is CommentElement =>
      element instanceof CommentElement ||
      (hasBasicElementProps(element) &&
        isElementType('comment', element) &&
        primitiveEq('string', element));
  },
);

/**
 * @public
 */
export const isParseResultElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: unknown): element is ParserResultElement =>
      element instanceof ParserResultElement ||
      (hasBasicElementProps(element) &&
        isElementType('parseResult', element) &&
        primitiveEq('array', element));
  },
);

/**
 * @public
 */
export type PrimitiveElement =
  | ObjectElement
  | ArrayElement
  | BooleanElement
  | NumberElement
  | StringElement
  | NullElement
  | MemberElement;

/**
 * @public
 */
export const isPrimitiveElement: ElementPredicate<PrimitiveElement> = (
  element: unknown,
): element is PrimitiveElement => {
  return (
    isElementTypeHelper('object', element) ||
    isElementTypeHelper('array', element) ||
    isElementTypeHelper('boolean', element) ||
    isElementTypeHelper('number', element) ||
    isElementTypeHelper('string', element) ||
    isElementTypeHelper('null', element) ||
    isElementTypeHelper('member', element)
  );
};

/**
 * @public
 */
export const hasElementSourceMap = <T extends Element>(element: T): boolean => {
  if (!isElement(element)) {
    return false;
  }

  return (
    Number.isInteger(element.startPositionRow) &&
    Number.isInteger(element.startPositionColumn) &&
    Number.isInteger(element.startIndex) &&
    Number.isInteger(element.endPositionRow) &&
    Number.isInteger(element.endPositionColumn) &&
    Number.isInteger(element.endIndex)
  );
};

/**
 * @public
 */
export const includesSymbols = <T extends Element>(symbols: string[], element: T): boolean => {
  if (symbols.length === 0) {
    return true;
  }

  const elementSymbols = element.attributes.get('symbols');

  if (!isArrayElement(elementSymbols)) {
    return false;
  }

  return all(included(elementSymbols.toValue()), symbols);
};

/**
 * @public
 */
export const includesClasses = <T extends Element>(classes: string[], element: T): boolean => {
  if (classes.length === 0) {
    return true;
  }

  return all(included(element.classes.toValue()), classes);
};
