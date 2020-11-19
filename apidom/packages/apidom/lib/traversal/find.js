"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ramda = require("ramda");

var _visitor = require("./visitor");

// first first element in that satisfies the provided predicate
// find :: Pred -> Element -> Element | Undefined
var find = (0, _ramda.curry)(function (predicate, element) {
  var visitor = (0, _visitor.PredicateVisitor)({
    predicate: predicate,
    returnOnTrue: _visitor.BREAK
  }); // @ts-ignore

  (0, _visitor.visit)(element, visitor);
  return (0, _ramda.pathOr)(undefined, [0], visitor.result);
});
var _default = find;
exports["default"] = _default;