const { identity } = require('ramda');
const { isString } = require('ramda-adjunct');

module.exports = {
  test: isString,
  print: identity,
};
