"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _DocumentVisitor = _interopRequireDefault(require("./visitors/DocumentVisitor"));

var _ErrorVisitor = _interopRequireDefault(require("./visitors/ErrorVisitor"));

var _generics = require("./visitors/generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the AST.
 * Specification also allows us to create new parser adapters from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use relative JSON pointers.
 */
var specification = {
  visitors: {
    value: _generics.ValueVisitor,
    object: _generics.ObjectVisitor,
    array: _generics.ArrayVisitor,
    error: _ErrorVisitor["default"],
    document: {
      $visitor: _DocumentVisitor["default"],
      extension: _generics.ValueVisitor
    }
  }
};
var _default = specification;
exports["default"] = _default;