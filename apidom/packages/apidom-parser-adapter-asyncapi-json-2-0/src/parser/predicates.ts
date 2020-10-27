import { pathSatisfies, startsWith, both, curry } from 'ramda';
import { isJsonProperty } from 'apidom-ast';

// isAsyncApiExtension :: (Options, PropertyNode) -> Boolean
// eslint-disable-next-line import/prefer-default-export
export const isAsyncApiExtension = curry((options, node) =>
  both(isJsonProperty, pathSatisfies(startsWith('x-'), ['key', 'value']))(node),
);
