import { pathSatisfies, startsWith, both, curry } from 'ramda';
import { isJsonObject, isJsonProperty } from 'apidom-ast';
// @ts-ignore
import { hasKeys } from 'apidom-parser-adapter-json';

// isAsyncApiExtension :: (Options, PropertyNode) -> Boolean
// eslint-disable-next-line import/prefer-default-export
export const isAsyncApiExtension = curry((options, node) =>
  both(isJsonProperty, pathSatisfies(startsWith('x-'), ['key', 'value']))(node),
);

// isReferenceObject :: Options -> JsonObject -> Boolean
export const isReferenceObject = curry((options, node) => {
  if (!isJsonObject(node)) {
    return false;
  }
  return hasKeys(['$ref'], node.properties);
});
