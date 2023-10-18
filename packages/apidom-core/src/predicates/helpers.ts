import { Element, ArrayElement } from 'minim';

interface PredicateHelpers {
  hasMethod: typeof hasMethod;
  hasBasicElementProps: typeof hasBasicElementProps;
  primitiveEq: typeof primitiveEq;
  isElementType: typeof isElementType;
  hasClass: typeof hasClass;
}

interface ElementBasicsTrait {
  _storedElement: string;
  _content: unknown;
}

interface ElementPrimitiveBehavior {
  primitive: () => unknown;
}

interface ElementTypeTrait<T = string> {
  element: T;
}

interface ElementClassesTrait {
  classes: ArrayElement | Array<string>;
}

type PredicateCreator<T extends Element> = (helpers: PredicateHelpers) => ElementPredicate<T>;

export type ElementPredicate<T extends Element> = (element: unknown) => element is T;

const hasMethod = <T extends string>(
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

const hasBasicElementProps = (element: unknown): element is ElementBasicsTrait =>
  typeof element === 'object' &&
  element != null &&
  '_storedElement' in element &&
  typeof element._storedElement === 'string' && // eslint-disable-line no-underscore-dangle
  '_content' in element;

const primitiveEq = (val: unknown, element: unknown): element is ElementPrimitiveBehavior => {
  if (typeof element === 'object' && element !== null && 'primitive' in element) {
    return typeof element.primitive === 'function' && element.primitive() === val;
  }
  return false;
};

const hasClass = (cls: string, element: unknown): element is ElementClassesTrait => {
  return (
    typeof element === 'object' &&
    element !== null &&
    'classes' in element &&
    (Array.isArray(element.classes) || element.classes instanceof ArrayElement) &&
    element.classes.includes(cls)
  );
};

export const isElementType = (name: string, element: unknown): element is ElementTypeTrait =>
  typeof element === 'object' &&
  element !== null &&
  'element' in element &&
  element.element === name;

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
