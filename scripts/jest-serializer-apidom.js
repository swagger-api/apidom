const { isElement, dehydrate } = require('../packages/apidom');

module.exports = {
  test: isElement,
  print: (val) => JSON.stringify(dehydrate(val), null, 2),
};
