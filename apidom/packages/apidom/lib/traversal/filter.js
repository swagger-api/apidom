"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ramda = require("ramda");

var _minim = require("minim");

var _visitor = require("./visitor");

// finds all elements matching the predicate
// filter :: Pred -> Element -> ArraySlice
var filter = (0, _ramda.curry)(function (predicate, element) {
  var visitor = (0, _visitor.PredicateVisitor)({
    predicate: predicate
  }); // @ts-ignore

  (0, _visitor.visit)(element, visitor);
  return new _minim.ArraySlice(visitor.result);
});
var _default = filter;
exports["default"] = _default;