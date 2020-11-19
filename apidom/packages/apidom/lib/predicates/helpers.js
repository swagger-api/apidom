"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var hasMethod = (0, _ramda.curry)(function (name, obj) {
  return (0, _ramda.pathSatisfies)(_ramdaAdjunct.isFunction, [name], obj);
});
var hasBasicElementProps = (0, _ramda.both)((0, _ramda.has)('_storedElement'), (0, _ramda.has)('_content'));
var primitiveEq = (0, _ramda.curry)(function (val, obj) {
  return (0, _ramdaAdjunct.invokeArgs)(['primitive'], [], obj) === val;
});
var hasClass = (0, _ramda.curry)(function (cls, obj) {
  return (0, _ramdaAdjunct.invokeArgs)(['classes', 'includes'], [cls], obj);
});
var isElementType = (0, _ramda.pathEq)(['element']);

var createPredicate = function createPredicate(predicateCreator) {
  return (0, _ramda.curryN)(1, predicateCreator({
    hasMethod: hasMethod,
    hasBasicElementProps: hasBasicElementProps,
    primitiveEq: primitiveEq,
    isElementType: isElementType,
    hasClass: hasClass
  }));
};

var _default = createPredicate;
exports["default"] = _default;