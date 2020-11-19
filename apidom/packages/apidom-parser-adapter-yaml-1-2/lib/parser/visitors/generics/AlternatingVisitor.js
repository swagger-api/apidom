"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _ = require("..");

var _SpecificationVisitor = _interopRequireDefault(require("../SpecificationVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AlternatingVisitor = (0, _stampit["default"])(_SpecificationVisitor["default"], {
  props: {
    alternator: []
  },
  methods: {
    mapping: function mapping(mappingNode) {
      var functions = this.alternator.map(function (_ref) {
        var predicate = _ref.predicate,
            specPath = _ref.specPath;
        return (0, _ramda.ifElse)(predicate, (0, _ramda.always)(specPath), _ramdaAdjunct.stubUndefined);
      });
      var specPath = (0, _ramdaAdjunct.dispatch)(functions)(mappingNode);
      this.element = this.nodeToElement(specPath, mappingNode);
      this.maybeAddSourceMap(mappingNode, this.element);
      return _.BREAK;
    }
  }
});
var _default = AlternatingVisitor;
exports["default"] = _default;