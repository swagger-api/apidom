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

// isOpenApiExtension :: (Options, PropertyNode) -> Boolean
export const isOpenApiExtension = curry((options, node) =>
  both(pathEq(['type'], 'property'), pathSatisfies(startsWith('x-'), ['key', 'value']))(node),
);
