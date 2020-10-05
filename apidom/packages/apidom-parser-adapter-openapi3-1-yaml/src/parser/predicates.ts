import { isYamlKeyValuePair } from 'apidom-ast';
import { pathSatisfies, startsWith, both, curry } from 'ramda';

// isOpenApiExtension :: Options -> YamlKeyValuePair -> Boolean
// eslint-disable-next-line import/prefer-default-export
export const isOpenApiExtension = curry((options, node) =>
  both(isYamlKeyValuePair, pathSatisfies(startsWith('x-'), ['key', 'content']))(node),
);
