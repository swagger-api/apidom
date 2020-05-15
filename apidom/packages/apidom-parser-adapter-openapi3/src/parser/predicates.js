'use strict';

const { length, pathEq, pathSatisfies, startsWith, both, curry } = require('ramda');
const { isInteger } = require('ramda-adjunct');

// isComponentsSchemas :: (Options, PropertyNode) -> Boolean
const isComponentsSchemas = ({ ancestors }, node) => {
  const totalAncestors = length(ancestors);

  return isInteger(totalAncestors)
    && pathEq(['key', 'value'], 'schemas', node)
    && pathEq([totalAncestors - 2, 'key', 'value'], 'components', ancestors)
};

// isOpenApiExtension :: (Options, PropertyNode) -> Boolean
const isOpenApiExtension = curry((options, node) =>
  both(
    pathEq(['type'], 'property'),
    pathSatisfies(startsWith('x-'), ['key', 'value'])
  )(node)
);

module.exports = {
  isComponentsSchemas,
  isOpenApiExtension,
};
