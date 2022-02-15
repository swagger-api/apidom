const { isElement, dehydrate } = require('../packages/apidom-core');

module.exports = {
  test: isElement,
  print: (val) => JSON.stringify(dehydrate(val), null, 2),
};
