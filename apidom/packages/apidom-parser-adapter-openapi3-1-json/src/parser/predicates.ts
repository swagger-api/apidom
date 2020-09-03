import { isJsonObject, isJsonProperty } from 'apidom-ast';
import { length, pathEq, pathSatisfies, startsWith, both, curry } from 'ramda';
import { isInteger } from 'ramda-adjunct';

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
  // @ts-ignore
  const requiredProperties = node.properties.filter((property) => {
    return property.key.value === 'name' || property.key.value === 'in';
  });

  return requiredProperties.length === 2;
});

// isReferenceObject :: Options -> JsonObject -> Boolean
export const isReferenceObject = curry((options, node) => {
  if (!isJsonObject(node)) {
    return false;
  }
  // @ts-ignore
  const requiredProperties = node.properties.filter((property) => property.key.value === '$ref');

  return requiredProperties.length === 1;
});
