import { both, curry, has, pathSatisfies, curryN, pathEq, Pred } from 'ramda';
import { isFunction, invokeArgs } from 'ramda-adjunct';

const hasMethod = curry((name: string, obj: Record<string, unknown>): boolean =>
  pathSatisfies(isFunction, [name], obj),
);

const hasBasicElementProps = both(has('_storedElement'), has('_content'));

const primitiveEq = curry(
  (val: unknown, obj: Record<string, unknown>): boolean =>
    invokeArgs(['primitive'], [], obj) === val,
);

const hasClass = curry((cls: string, obj: Record<string, unknown>): boolean =>
  invokeArgs(['classes', 'includes'], [cls], obj),
);

export const isElementType = pathEq(['element']);

interface PredicateHelpers {
  hasMethod: typeof hasMethod;
  hasBasicElementProps: typeof hasBasicElementProps;
  primitiveEq: typeof primitiveEq;
  isElementType: typeof isElementType;
  hasClass: typeof hasClass;
}

type PredicateCreator = (helpers: PredicateHelpers) => Pred;

const createPredicate = (predicateCreator: PredicateCreator): Pred => {
  // @ts-ignore
  return curryN(
    1,
    predicateCreator({
      hasMethod,
      hasBasicElementProps,
      primitiveEq,
      isElementType,
      hasClass,
    }),
  );
};

export default createPredicate;
