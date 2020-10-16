import { pathSatisfies, startsWith, both, curry } from 'ramda';
import { isYamlKeyValuePair } from 'apidom-ast';

// isAsyncApiExtension :: (Options, YamlKeyValuePair) -> Boolean
// eslint-disable-next-line import/prefer-default-export
export const isAsyncApiExtension = curry((options, node) =>
  both(isYamlKeyValuePair, pathSatisfies(startsWith('x-'), ['key', 'content']))(node),
);
