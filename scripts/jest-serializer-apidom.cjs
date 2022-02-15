const { isElement, dehydrate } = require('@swagger-api/apidom-core');

module.exports = {
  test: isElement,
  print: (val) => JSON.stringify(dehydrate(val), null, 2),
};
