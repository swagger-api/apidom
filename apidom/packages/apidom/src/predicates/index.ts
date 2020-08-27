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
import { either, allPass, is, both } from 'ramda';

import createPredicate from './helpers';

export const isElement = createPredicate(({ hasBasicElementProps, primitiveEq }) => {
  const primitiveEqUndefined = primitiveEq(undefined);

  return either(is(Element), both(hasBasicElementProps, primitiveEqUndefined));
});

export const isStringElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeString = isElementType('string');
    const primitiveEqString = primitiveEq('string');
    const hasGetterLength = hasGetter('length');

    return either(
      is(StringElement),
      allPass([hasBasicElementProps, isElementTypeString, primitiveEqString, hasGetterLength]),
    );
  },
);

export const isNumberElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeNumber = isElementType('number');
    const primitiveEqNumber = primitiveEq('number');

    return either(
      is(NumberElement),
      allPass([hasBasicElementProps, isElementTypeNumber, primitiveEqNumber]),
    );
  },
);

export const isNullElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeNull = isElementType('null');
    const primitiveEqNull = primitiveEq('null');

    return either(
      is(NullElement),
      allPass([hasBasicElementProps, isElementTypeNull, primitiveEqNull]),
    );
  },
);

export const isBooleanElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq }) => {
    const isElementTypeBoolean = isElementType('boolean');
    const primitiveEqBoolean = primitiveEq('boolean');

    return either(
      is(BooleanElement),
      allPass([hasBasicElementProps, isElementTypeBoolean, primitiveEqBoolean]),
    );
  },
);

export const isArrayElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasMethod }) => {
    const isElementTypeArray = isElementType('array');
    const primitiveEqArray = primitiveEq('array');
    const hasMethodPush = hasMethod('push');
    const hasMethodUnshift = hasMethod('unshift');
    const hasMethodMap = hasMethod('map');
    const hasMethodReduce = hasMethod('reduce');

    return either(
      is(ArrayElement),
      allPass([
        hasBasicElementProps,
        isElementTypeArray,
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
  ({ hasBasicElementProps, isElementType, primitiveEq, hasMethod }) => {
    const isElementTypeObject = isElementType('object');
    const primitiveEqObject = primitiveEq('object');
    const hasMethodKeys = hasMethod('keys');
    const hasMethodValues = hasMethod('values');
    const hasMethodItems = hasMethod('items');

    return either(
      is(ObjectElement),
      allPass([
        hasBasicElementProps,
        isElementTypeObject,
        primitiveEqObject,
        hasMethodKeys,
        hasMethodValues,
        hasMethodItems,
      ]),
    );
  },
);

export const isMemberElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeMember = isElementType('member');
    const primitiveEqUndefined = primitiveEq(undefined);
    const hasGetterKey = hasGetter('key');
    const hasGetterValue = hasGetter('value');

    return either(
      is(MemberElement),
      allPass([
        hasBasicElementProps,
        isElementTypeMember,
        primitiveEqUndefined,
        hasGetterKey,
        hasGetterValue,
      ]),
    );
  },
);

export const isLinkElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeLink = isElementType('link');
    const primitiveEqUndefined = primitiveEq(undefined);
    const hasGetterRelation = hasGetter('relation');
    const hasGetterHref = hasGetter('href');

    return either(
      is(LinkElement),
      allPass([
        hasBasicElementProps,
        isElementTypeLink,
        primitiveEqUndefined,
        hasGetterRelation,
        hasGetterHref,
      ]),
    );
  },
);

export const isRefElement = createPredicate(
  ({ hasBasicElementProps, isElementType, primitiveEq, hasGetter }) => {
    const isElementTypeRef = isElementType('ref');
    const primitiveEqUndefined = primitiveEq(undefined);
    const hasGetterPath = hasGetter('path');

    return either(
      is(RefElement),
      allPass([hasBasicElementProps, isElementTypeRef, primitiveEqUndefined, hasGetterPath]),
    );
  },
);
