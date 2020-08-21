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
import { either, allPass, is, both, has, curry, pathSatisfies, pathEq } from 'ramda';
import { invokeArgs, isFunction } from 'ramda-adjunct';

// hasGetter :: String -> Object -> Boolean
const hasGetter = curry((name: string, obj: Record<string, unknown>): boolean => {
  // @ts-ignore
  const descriptor = Object.getOwnPropertyDescriptor(obj, name);

  return pathSatisfies(isFunction, ['get'], descriptor);
});

// hasMethod :: String -> Object -> Boolean
const hasMethod = curry((name: string, obj: Record<string, unknown>): boolean =>
  pathSatisfies(isFunction, [name], obj),
);

// hasBasicElementProps :: Object -> Boolean
const hasBasicElementProps = both(has('element'), has('content'));

// primitiveEq :: * -> Object -> Boolean
const primitiveEq = curry(
  (val: undefined, obj: Record<string, unknown>): boolean =>
    invokeArgs(['primitive'], [], obj) === val,
);

// isElementType :: String -> Boolean
const isElementType = pathEq(['element']);

// @ts-ignore
export const isElement = either(is(Element), both(hasBasicElementProps, primitiveEq(undefined)));

export const isStringElement = either(
  is(StringElement),
  allPass([
    hasBasicElementProps,
    // @ts-ignore
    isElementType('string'),
    // @ts-ignore
    primitiveEq('string'),
    // @ts-ignore
    hasGetter('length'),
  ]),
);

export const isNumberElement = either(
  is(NumberElement),
  // @ts-ignore
  allPass([hasBasicElementProps, isElementType('number'), primitiveEq('number')]),
);

export const isNullElement = either(
  is(NullElement),
  // @ts-ignore
  allPass([hasBasicElementProps, isElementType('null'), primitiveEq('null')]),
);

export const isBooleanElement = either(
  is(BooleanElement),
  // @ts-ignore
  allPass([hasBasicElementProps, isElementType('boolean'), primitiveEq('boolean')]),
);

export const isArrayElement = either(
  is(ArrayElement),
  allPass([
    hasBasicElementProps,
    // @ts-ignore
    isElementType('array'),
    // @ts-ignore
    primitiveEq('array'),
    // @ts-ignore
    hasMethod('push'),
    // @ts-ignore
    hasMethod('unshift'),
    // @ts-ignore
    hasMethod('map'),
    // @ts-ignore
    hasMethod('reduce'),
  ]),
);

export const isObjectElement = either(
  is(ObjectElement),
  allPass([
    hasBasicElementProps,
    // @ts-ignore
    isElementType('object'),
    // @ts-ignore
    primitiveEq('object'),
    // @ts-ignore
    hasMethod('keys'),
    // @ts-ignore
    hasMethod('values'),
    // @ts-ignore
    hasMethod('items'),
  ]),
);

export const isMemberElement = either(
  is(MemberElement),
  allPass([
    hasBasicElementProps,
    // @ts-ignore
    isElementType('member'),
    // @ts-ignore
    primitiveEq(undefined),
    // @ts-ignore
    hasGetter('key'),
    // @ts-ignore
    hasGetter('value'),
  ]),
);

export const isLinkElement = either(
  is(LinkElement),
  allPass([
    hasBasicElementProps,
    // @ts-ignore
    isElementType('link'),
    // @ts-ignore
    primitiveEq(undefined),
    // @ts-ignore
    hasGetter('relation'),
    // @ts-ignore
    hasGetter('href'),
  ]),
);

export const isRefElement = either(
  is(RefElement),
  allPass([
    hasBasicElementProps,
    // @ts-ignore
    isElementType('ref'),
    // @ts-ignore
    primitiveEq(undefined),
    // @ts-ignore
    hasGetter('path'),
  ]),
);
