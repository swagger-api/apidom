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

import AnnotationElement from '../elements/Annotation';
import CommentElement from '../elements/Comment';
import ParserResultElement from '../elements/ParseResult';
import SourceMapElement from '../elements/SourceMap';
import createPredicate, { isElementType as isElementTypeHelper } from './helpers';

export const isElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  return (element: any) =>
    element instanceof Element ||
    (hasBasicElementProps(element) && primitiveEq(undefined, element));
});

export const isStringElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  return (element: any) =>
    element instanceof StringElement ||
    (hasBasicElementProps(element) && primitiveEq('string', element));
});

export const isNumberElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  return (element: any) =>
    element instanceof NumberElement ||
    (hasBasicElementProps(element) && primitiveEq('number', element));
});

export const isNullElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  return (element: any) =>
    element instanceof NullElement ||
    (hasBasicElementProps(element) && primitiveEq('null', element));
});

export const isBooleanElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  return (element: any) =>
    element instanceof BooleanElement ||
    (hasBasicElementProps(element) && primitiveEq('boolean', element));
});

export const isObjectElement = createPredicate(
  ({ hasBasicElementProps, primitiveEq, hasMethod }) => {
    return (element: any) =>
      element instanceof ObjectElement ||
      (hasBasicElementProps(element) &&
        primitiveEq('object', element) &&
        hasMethod('keys', element) &&
        hasMethod('values', element) &&
        hasMethod('items', element));
  },
);

export const isArrayElement = createPredicate(
  ({ hasBasicElementProps, primitiveEq, hasMethod }) => {
    return (element: any) =>
      (element instanceof ArrayElement && !(element instanceof ObjectElement)) ||
      (hasBasicElementProps(element) &&
        primitiveEq('array', element) &&
        hasMethod('push', element) &&
        hasMethod('unshift', element) &&
        hasMethod('map', element) &&
        hasMethod('reduce', element));
  },
);

export const isMemberElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof MemberElement ||
      (hasBasicElementProps(element) &&
        isElementType('member', element) &&
        primitiveEq(undefined, element));
  },
);

export const isLinkElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof LinkElement ||
      (hasBasicElementProps(element) &&
        isElementType('link', element) &&
        primitiveEq(undefined, element));
  },
);

export const isRefElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof RefElement ||
      (hasBasicElementProps(element) &&
        isElementType('ref', element) &&
        primitiveEq(undefined, element));
  },
);

export const isAnnotationElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof AnnotationElement ||
      (hasBasicElementProps(element) &&
        isElementType('annotation', element) &&
        primitiveEq('array', element));
  },
);

export const isCommentElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof CommentElement ||
      (hasBasicElementProps(element) &&
        isElementType('comment', element) &&
        primitiveEq('string', element));
  },
);

export const isParseResultElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof ParserResultElement ||
      (hasBasicElementProps(element) &&
        isElementType('parseResult', element) &&
        primitiveEq('array', element));
  },
);

export const isSourceMapElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    return (element: any) =>
      element instanceof SourceMapElement ||
      (hasBasicElementProps(element) &&
        isElementType('sourceMap', element) &&
        primitiveEq('array', element));
  },
);

export const isPrimitiveElement = (element: any): boolean => {
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

export const hasElementSourceMap = (element: any): boolean => {
  return isSourceMapElement(element?.meta?.get?.('sourceMap'));
};

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

export const includesClasses = <T extends Element>(classes: string[], element: T): boolean => {
  if (classes.length === 0) {
    return true;
  }

  return all(included(element.classes.toValue()), classes);
};
