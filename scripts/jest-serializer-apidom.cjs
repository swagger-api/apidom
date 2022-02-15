const { isElement, dehydrate } = require('../packages/apidom-core/es/index.js');

module.exports = {
  test: isElement,
  print: (val) => JSON.stringify(dehydrate(val), null, 2),
};
