import { isYamlKeyValuePair, isYamlMapping, isYamlScalar } from 'apidom-ast';
import { pathSatisfies, startsWith, both, curry, filter, anyPass } from 'ramda';

// hasKey :: String -> YamlKeyValuePair -> Boolean
const hasKey = curry((keyName, node) => {
  const { key } = node;

  if (!isYamlScalar(key)) {
    return false;
  }

  return key.content === keyName;
});

// hasKeys :: [String] -> [YamlKeyValuePair] -> Boolean
const hasKeys = curry((keyNames, keyValuePairs) => {
  const predicates = keyNames.map((keyName: string) => hasKey(keyName));
  return filter(anyPass(predicates), keyValuePairs).length === keyNames.length;
});

// isOpenApiExtension :: Options -> YamlKeyValuePair -> Boolean
export const isOpenApiExtension = curry((options, node) =>
  both(isYamlKeyValuePair, pathSatisfies(startsWith('x-'), ['key', 'content']))(node),
);

// isServerObject :: Options -> YamlMapping -> Boolean
export const isServerObject = curry((options, node) => {
  if (!isYamlMapping(node)) {
    return false;
  }
  return hasKeys(['url'], node.content);
});

// isParameterObject :: Options -> YamlMapping -> Boolean
export const isParameterObject = curry((options, node) => {
  if (!isYamlMapping(node)) {
    return false;
  }
  return hasKeys(['name', 'in'], node.content);
});

// isReferenceObject :: Options -> YamlMapping -> Boolean
export const isReferenceObject = curry((options, node) => {
  if (!isYamlMapping(node)) {
    return false;
  }
  return hasKeys(['$ref'], node.content);
});

// isRequestBodyObject :: Options -> YamlMapping -> Boolean
export const isRequestBodyObject = curry((options, node) => {
  if (!isYamlMapping(node)) {
    return false;
  }
  return hasKeys(['content'], node.content);
});

// isResponseObject :: Options -> YamlMapping -> Boolean
export const isResponseObject = curry((options, node) => {
  if (!isYamlMapping(node)) {
    return false;
  }
  return hasKeys(['description'], node.content);
});
