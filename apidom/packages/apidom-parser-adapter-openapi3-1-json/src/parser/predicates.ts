import { isJsonObject, isJsonProperty } from 'apidom-ast';
import { length, pathEq, pathSatisfies, startsWith, both, curry, anyPass, filter } from 'ramda';
import { isInteger } from 'ramda-adjunct';

// hasKey :: String -> JsonProperty -> Boolean
const hasKey = pathEq(['key', 'value']);

// hasKeys :: [String] -> [JsonProperty] -> Boolean
const hasKeys = curry((keyNames, properties) => {
  const predicates = keyNames.map((keyName: string) => hasKey(keyName));
  return filter(anyPass(predicates), properties).length === keyNames.length;
});

// isComponentsSchemas :: (Options, PropertyNode) -> Boolean
// @ts-ignore
export const isComponentsSchemas = ({ ancestors }, node) => {
  const totalAncestors = length(ancestors);

  return (
    isInteger(totalAncestors) &&
    pathEq(['key', 'value'], 'schemas', node) &&
    pathEq([totalAncestors - 2, 'key', 'value'], 'components', ancestors)
  );
};

// isOpenApiExtension :: Options -> JsonProperty -> Boolean
export const isOpenApiExtension = curry((options, node) =>
  both(isJsonProperty, pathSatisfies(startsWith('x-'), ['key', 'value']))(node),
);

// isParameterObject :: Options -> JsonObject -> Boolean
export const isParameterObject = curry((options, node) => {
  if (!isJsonObject(node)) {
    return false;
  }
  return hasKeys(['name', 'in'], node.properties);
});

// isReferenceObject :: Options -> JsonObject -> Boolean
export const isReferenceObject = curry((options, node) => {
  if (!isJsonObject(node)) {
    return false;
  }
  return hasKeys(['$ref'], node.properties);
});

// isServerObject :: Options -> JsonObject -> Boolean
export const isServerObject = curry((options, node) => {
  if (!isJsonObject(node)) {
    return false;
  }
  return hasKeys(['url'], node.properties);
});

// isRequestBodyObject :: Options -> JsonObject -> Boolean
export const isRequestBodyObject = curry((options, node) => {
  if (!isJsonObject(node)) {
    return false;
  }
  return hasKeys(['content'], node.properties);
});
