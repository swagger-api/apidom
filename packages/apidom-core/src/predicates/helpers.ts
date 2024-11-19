import { Element, ArrayElement } from 'minim';

/**
 * @public
 */
export interface PredicateHelpers {
  hasMethod: typeof hasMethod;
  hasBasicElementProps: typeof hasBasicElementProps;
  primitiveEq: typeof primitiveEq;
  isElementType: typeof isElementType;
  hasClass: typeof hasClass;
}

/**
 * @public
 */
export interface ElementBasicsTrait {
  _storedElement: string;
  _content: unknown;
}

/**
 * @public
 */
export interface ElementPrimitiveBehavior {
  primitive: () => unknown;
}

/**
 * @public
 */
export interface ElementTypeTrait<T = string> {
  element: T;
}

/**
 * @public
 */
export interface ElementClassesTrait {
  classes: ArrayElement | Array<string>;
}

/**
 * @public
 */
export type PredicateCreator<T extends Element> = (
  helpers: PredicateHelpers,
) => ElementPredicate<T>;

/**
 * @public
 */
export type ElementPredicate<T extends Element> = (element: unknown) => element is T;

/**
 * @public
 */
export const hasMethod = <T extends string>(
  name: T,
  element: unknown,
): element is { [key in T]: (...args: unknown[]) => unknown } => {
  return (
    typeof element === 'object' &&
    element !== null &&
    name in element &&
    typeof (element as Record<string, unknown>)[name] === 'function'
  );
};

/**
 * @public
 */
export const hasBasicElementProps = (element: unknown): element is ElementBasicsTrait =>
  typeof element === 'object' &&
  element != null &&
  '_storedElement' in element &&
  typeof element._storedElement === 'string' && // eslint-disable-line no-underscore-dangle
  '_content' in element;

/**
 * @public
 */
export const primitiveEq = (
  val: unknown,
  element: unknown,
): element is ElementPrimitiveBehavior => {
  if (typeof element === 'object' && element !== null && 'primitive' in element) {
    return typeof element.primitive === 'function' && element.primitive() === val;
  }
  return false;
};

/**
 * @public
 */
export const hasClass = (cls: string, element: unknown): element is ElementClassesTrait => {
  return (
    typeof element === 'object' &&
    element !== null &&
    'classes' in element &&
    (Array.isArray(element.classes) || element.classes instanceof ArrayElement) &&
    element.classes.includes(cls)
  );
};

/**
 * @public
 */
export const isElementType = (name: string, element: unknown): element is ElementTypeTrait =>
  typeof element === 'object' &&
  element !== null &&
  'element' in element &&
  element.element === name;

/**
 * @public
 */
const createPredicate = <T extends Element>(predicateCreator: PredicateCreator<T>) => {
  return predicateCreator({
    hasMethod,
    hasBasicElementProps,
    primitiveEq,
    isElementType,
    hasClass,
  });
};

export default createPredicate;
