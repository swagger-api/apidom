"use strict";

exports.__esModule = true;
exports.visit = exports.PredicateVisitor = exports.BREAK = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _apidomAst = require("apidom-ast");

exports.BREAK = _apidomAst.BREAK;

var _predicates = require("../predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// getNodeType :: Node -> String
var getNodeType = function getNodeType(element) {
  /*
   * We're translating every possible higher element type to primitive minim type here.
   * This allows us keep key mapping to minimum.
   */

  /* eslint-disable no-nested-ternary */
  return (0, _predicates.isObjectElement)(element) ? 'object' : (0, _predicates.isArrayElement)(element) ? 'array' : (0, _predicates.isNumberElement)(element) ? 'number' : (0, _predicates.isNullElement)(element) ? 'null' : (0, _predicates.isBooleanElement)(element) ? 'boolean' : (0, _predicates.isMemberElement)(element) ? 'member' : (0, _predicates.isStringElement)(element) ? 'string' : undefined;
  /* eslint-enable */
}; // isNode :: Node -> Boolean


var isNode = (0, _ramda.curryN)(1, (0, _ramda.pipe)(getNodeType, _ramdaAdjunct.isString));
var keyMapDefault = {
  object: ['content'],
  array: ['content'],
  member: ['key', 'value']
};
var PredicateVisitor = (0, _stampit["default"])({
  props: {
    result: [],
    predicate: _ramda.F,
    returnOnTrue: undefined,
    returnOnFalse: undefined
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$predicate = _ref.predicate,
        predicate = _ref$predicate === void 0 ? this.predicate : _ref$predicate,
        _ref$returnOnTrue = _ref.returnOnTrue,
        returnOnTrue = _ref$returnOnTrue === void 0 ? this.returnOnTrue : _ref$returnOnTrue,
        _ref$returnOnFalse = _ref.returnOnFalse,
        returnOnFalse = _ref$returnOnFalse === void 0 ? this.returnOnFalse : _ref$returnOnFalse;

    this.result = [];
    this.predicate = predicate;
    this.returnOnTrue = returnOnTrue;
    this.returnOnFalse = returnOnFalse;
  },
  methods: {
    enter: function enter(element) {
      if (this.predicate(element)) {
        this.result.push(element);
        return this.returnOnTrue;
      }

      return this.returnOnFalse;
    }
  }
}); // @ts-ignore

exports.PredicateVisitor = PredicateVisitor;

var visit = function visit(root, visitor) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _ref2$keyMap = _ref2.keyMap,
      keyMap = _ref2$keyMap === void 0 ? keyMapDefault : _ref2$keyMap,
      rest = _objectWithoutProperties(_ref2, ["keyMap"]);

  // if visitor is associated with the keymap, we prefer this visitor keymap
  var effectiveKeyMap = (0, _ramda.propOr)(keyMap, 'keyMap', visitor); // @ts-ignore

  return (0, _apidomAst.visit)(root, visitor, _objectSpread(_objectSpread({}, rest), {}, {
    // @ts-ignore
    keyMap: effectiveKeyMap,
    // @ts-ignore
    nodeTypeGetter: getNodeType,
    nodePredicate: isNode
  }));
};

exports.visit = visit;