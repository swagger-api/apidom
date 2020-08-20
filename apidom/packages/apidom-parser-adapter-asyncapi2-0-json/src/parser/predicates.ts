import { pathEq, pathSatisfies, startsWith, both, curry } from 'ramda';

// isAsyncApiExtension :: (Options, PropertyNode) -> Boolean
// eslint-disable-next-line import/prefer-default-export
export const isAsyncApiExtension = curry((options, node) =>
  both(pathEq(['type'], 'property'), pathSatisfies(startsWith('x-'), ['key', 'value']))(node),
);
