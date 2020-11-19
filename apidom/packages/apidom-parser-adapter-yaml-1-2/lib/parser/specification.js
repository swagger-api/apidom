"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _StreamVisitor = _interopRequireDefault(require("./visitors/StreamVisitor"));

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
    scalar: _generics.ScalarVisitor,
    mapping: _generics.MappingVisitor,
    sequence: _generics.SequenceVisitor,
    kind: _generics.KindVisitor,
    error: _ErrorVisitor["default"],
    stream: {
      $visitor: _StreamVisitor["default"]
    },
    document: {
      $visitor: _DocumentVisitor["default"],
      extension: _generics.KindVisitor
    }
  }
};
var _default = specification;
exports["default"] = _default;