"use strict";

exports.__esModule = true;
exports.hasKeys = exports.hasKey = void 0;

var _apidomAst = require("apidom-ast");

var _ramda = require("ramda");

// hasKey :: String -> YamlKeyValuePair -> Boolean
var hasKey = (0, _ramda.curry)(function (keyName, node) {
  var key = node.key;

  if (!(0, _apidomAst.isYamlScalar)(key)) {
    return false;
  }

  return key.content === keyName;
}); // hasKeys :: [String] -> [YamlKeyValuePair] -> Boolean

exports.hasKey = hasKey;
var hasKeys = (0, _ramda.curry)(function (keyNames, keyValuePairs) {
  var predicates = keyNames.map(function (keyName) {
    return hasKey(keyName);
  });
  return (0, _ramda.filter)((0, _ramda.anyPass)(predicates), keyValuePairs).length === keyNames.length;
});
exports.hasKeys = hasKeys;