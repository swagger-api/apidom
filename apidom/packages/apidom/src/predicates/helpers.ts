import { both, curry, has, pathSatisfies, curryN, pathEq, Pred } from 'ramda';
import { isFunction, invokeArgs } from 'ramda-adjunct';

const hasGetter = curry((name: string, obj: Record<string, unknown>): boolean => {
  // @ts-ignore
  const descriptor = Object.getOwnPropertyDescriptor(obj, name);

  return pathSatisfies(isFunction, ['get'], descriptor);
});

const hasMethod = curry((name: string, obj: Record<string, unknown>): boolean =>
  pathSatisfies(isFunction, [name], obj),
);

const hasBasicElementProps = both(has('element'), has('content'));

const primitiveEq = curry(
  (val: unknown, obj: Record<string, unknown>): boolean =>
    invokeArgs(['primitive'], [], obj) === val,
);

const isElementType = pathEq(['element']);

interface PredicateHelpers {
  hasGetter: typeof hasGetter;
  hasMethod: typeof hasMethod;
  hasBasicElementProps: typeof hasBasicElementProps;
  primitiveEq: typeof primitiveEq;
  isElementType: typeof isElementType;
}

type PredicateCreator = (helpers: PredicateHelpers) => Pred;

const createPredicate = (predicateCreator: PredicateCreator): Pred => {
  return curryN(
    1,
    predicateCreator({ hasGetter, hasMethod, hasBasicElementProps, primitiveEq, isElementType }),
  );
};

export default createPredicate;
