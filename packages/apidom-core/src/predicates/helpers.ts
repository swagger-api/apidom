const hasMethod = (name: string, obj: Record<string, unknown>): boolean =>
  typeof obj?.[name] === 'function';

const hasBasicElementProps = (element: any) =>
  element != null &&
  Object.prototype.hasOwnProperty.call(element, '_storedElement') &&
  Object.prototype.hasOwnProperty.call(element, '_content');

const primitiveEq = (val: unknown, obj: any): boolean => obj?.primitive?.() === val;

const hasClass = (cls: string, obj: any): boolean => obj?.classes?.includes?.(cls) || false;

export const isElementType = (name: string, element: any): boolean => element?.element === name;

interface PredicateHelpers {
  hasMethod: typeof hasMethod;
  hasBasicElementProps: typeof hasBasicElementProps;
  primitiveEq: typeof primitiveEq;
  isElementType: typeof isElementType;
  hasClass: typeof hasClass;
}

type PredicateCreator = (helpers: PredicateHelpers) => (element: any) => boolean;

const createPredicate = (predicateCreator: PredicateCreator) => {
  // @ts-ignore
  return predicateCreator({
    hasMethod,
    hasBasicElementProps,
    primitiveEq,
    isElementType,
    hasClass,
  });
};

export default createPredicate;
