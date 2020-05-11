'use strict';

const { length, pathEq } = require('ramda');
const { isInteger } = require('ramda-adjunct');

// isComponentsSchemas :: (Options, JsonNode) -> Boolean
const isComponentsSchemas = ({ ancestors }, node) => {
  const totalAncestors = length(ancestors);

  return isInteger(totalAncestors)
    && pathEq(['key', 'value'], 'schemas', node)
    && pathEq([totalAncestors - 2, 'key', 'value'], 'components', ancestors)
};

module.exports = {
  isComponentsSchemas,
};
