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
import { all, isEmpty, either, curry, allPass, is, both, anyPass } from 'ramda';
import { included } from 'ramda-adjunct';

import AnnotationElement from '../elements/Annotation';
import CommentElement from '../elements/Comment';
import ParserResultElement from '../elements/ParseResult';
import SourceMapElement from '../elements/SourceMap';
import createPredicate, { isElementType as isElementTypeHelper } from './helpers';

export const isElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  const primitiveEqUndefined = primitiveEq(undefined);

  return either(is(Element), both(hasBasicElementProps, primitiveEqUndefined));
});

export const isStringElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  const primitiveEqString = primitiveEq('string');

  return either(is(StringElement), allPass([hasBasicElementProps, primitiveEqString]));
});

export const isNumberElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  const primitiveEqNumber = primitiveEq('number');

  return either(is(NumberElement), allPass([hasBasicElementProps, primitiveEqNumber]));
});

export const isNullElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  const primitiveEqNull = primitiveEq('null');

  return either(is(NullElement), allPass([hasBasicElementProps, primitiveEqNull]));
});

export const isBooleanElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  const primitiveEqBoolean = primitiveEq('boolean');

  return either(is(BooleanElement), allPass([hasBasicElementProps, primitiveEqBoolean]));
});

export const isArrayElement = createPredicate(
  ({ hasBasicElementProps, primitiveEq, hasMethod }) => {
    const primitiveEqArray = primitiveEq('array');
    const hasMethodPush = hasMethod('push');
    const hasMethodUnshift = hasMethod('unshift');
    const hasMethodMap = hasMethod('map');
    const hasMethodReduce = hasMethod('reduce');

    return either(
      is(ArrayElement),
      allPass([
        hasBasicElementProps,
        primitiveEqArray,
        hasMethodPush,
        hasMethodUnshift,
        hasMethodMap,
        hasMethodReduce,
      ]),
    );
  },
);

export const isObjectElement = createPredicate(
  ({ hasBasicElementProps, primitiveEq, hasMethod }) => {
    const primitiveEqObject = primitiveEq('object');
    const hasMethodKeys = hasMethod('keys');
    const hasMethodValues = hasMethod('values');
    const hasMethodItems = hasMethod('items');

    return either(
      is(ObjectElement),
      allPass([
        hasBasicElementProps,
        primitiveEqObject,
        hasMethodKeys,
        hasMethodValues,
        hasMethodItems,
      ]),
    );
  },
);

export const isMemberElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeMember = isElementType('member');
    const primitiveEqUndefined = primitiveEq(undefined);

    return either(
      is(MemberElement),
      allPass([hasBasicElementProps, isElementTypeMember, primitiveEqUndefined]),
    );
  },
);

export const isLinkElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeLink = isElementType('link');
    const primitiveEqUndefined = primitiveEq(undefined);

    return either(
      is(LinkElement),
      allPass([hasBasicElementProps, isElementTypeLink, primitiveEqUndefined]),
    );
  },
);

export const isRefElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeRef = isElementType('ref');
    const primitiveEqUndefined = primitiveEq(undefined);

    return either(
      is(RefElement),
      allPass([hasBasicElementProps, isElementTypeRef, primitiveEqUndefined]),
    );
  },
);

export const isAnnotationElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeAnnotation = isElementType('annotation');
    const primitiveEqString = primitiveEq('array');

    return either(
      is(AnnotationElement),
      allPass([hasBasicElementProps, isElementTypeAnnotation, primitiveEqString]),
    );
  },
);

export const isCommentElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeComment = isElementType('comment');
    const primitiveEqString = primitiveEq('string');

    return either(
      is(CommentElement),
      allPass([hasBasicElementProps, isElementTypeComment, primitiveEqString]),
    );
  },
);

export const isParseResultElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeParseResult = isElementType('parseResult');
    const primitiveEqString = primitiveEq('array');

    return either(
      is(ParserResultElement),
      allPass([hasBasicElementProps, isElementTypeParseResult, primitiveEqString]),
    );
  },
);

export const isSourceMapElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeSourceMap = isElementType('sourceMap');
    const primitiveEqArray = primitiveEq('array');

    return either(
      is(SourceMapElement),
      allPass([hasBasicElementProps, isElementTypeSourceMap, primitiveEqArray]),
    );
  },
);

export const isPrimitiveElement = anyPass([
  // @ts-ignore
  isElementTypeHelper('object'),
  // @ts-ignore
  isElementTypeHelper('array'),
  // @ts-ignore
  isElementTypeHelper('member'),
  // @ts-ignore
  isElementTypeHelper('boolean'),
  // @ts-ignore
  isElementTypeHelper('number'),
  // @ts-ignore
  isElementTypeHelper('string'),
  // @ts-ignore
  isElementTypeHelper('null'),
]);

export const hasElementSourceMap = createPredicate(() => {
  return (element) => isSourceMapElement(element.meta.get('sourceMap'));
});

export const includesSymbols = curry(
  <T extends Element>(symbols: string[], element: T): boolean => {
    if (isEmpty(symbols)) {
      return true;
    }

    const elementSymbols = element.attributes.get('symbols');

    if (!isArrayElement(elementSymbols)) {
      return false;
    }

    return all(included(elementSymbols.toValue()), symbols);
  },
);

export const includesClasses = curry(
  <T extends Element>(classes: string[], element: T): boolean => {
    if (isEmpty(classes)) {
      return true;
    }

    return all(included(element.classes.toValue()), classes);
  },
);
