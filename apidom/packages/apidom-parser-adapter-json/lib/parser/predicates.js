"use strict";

exports.__esModule = true;
exports.hasKeys = exports.hasKey = void 0;

var _ramda = require("ramda");

// hasKey :: String -> JsonProperty -> Boolean
var hasKey = (0, _ramda.pathEq)(['key', 'value']); // hasKeys :: [String] -> [JsonProperty] -> Boolean

exports.hasKey = hasKey;
var hasKeys = (0, _ramda.curry)(function (keyNames, properties) {
  var predicates = keyNames.map(function (keyName) {
    return hasKey(keyName);
  });
  return (0, _ramda.filter)((0, _ramda.anyPass)(predicates), properties).length === keyNames.length;
});
exports.hasKeys = hasKeys;