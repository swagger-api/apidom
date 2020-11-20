import { pathSatisfies, startsWith, both, curry } from 'ramda';
import { isYamlMapping, isYamlKeyValuePair } from 'apidom-ast';
// @ts-ignore
import { hasKeys } from 'apidom-parser-adapter-yaml-1-2';

// isAsyncApiExtension :: (Options, YamlKeyValuePair) -> Boolean
// eslint-disable-next-line import/prefer-default-export
export const isAsyncApiExtension = curry((options, node) =>
  both(isYamlKeyValuePair, pathSatisfies(startsWith('x-'), ['key', 'content']))(node),
);

// isReferenceObject :: Options -> YamlMapping -> Boolean
export const isReferenceObject = curry((options, node) => {
  if (!isYamlMapping(node)) {
    return false;
  }
  return hasKeys(['$ref'], node.properties);
});
