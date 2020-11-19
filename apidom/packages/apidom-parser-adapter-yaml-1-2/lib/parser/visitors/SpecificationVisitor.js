"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _Visitor = _interopRequireDefault(require("./Visitor"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * This is a base Type for every visitor that does
 * internal look-ups to retrieve other child visitors.
 */
var SpecificationVisitor = (0, _stampit["default"])(_Visitor["default"], {
  props: {
    specObj: null
  },
  // @ts-ignore
  init: function init(_ref) {
    var _ref$specObj = _ref.specObj,
        specObj = _ref$specObj === void 0 ? this.specObj : _ref$specObj;
    this.specObj = specObj;
  },
  methods: {
    retrievePassingOptions: function retrievePassingOptions() {
      return (0, _ramda.pick)(['namespace', 'sourceMap', 'specObj'], this);
    },
    retrieveFixedFields: function retrieveFixedFields(specPath) {
      return (0, _ramda.pipe)((0, _ramda.path)(['visitors'].concat(_toConsumableArray(specPath), ['fixedFields'])), _ramda.keys)(this.specObj);
    },
    retrieveVisitor: function retrieveVisitor(specPath) {
      if ((0, _ramda.pathSatisfies)(_ramdaAdjunct.isFunction, ['visitors'].concat(_toConsumableArray(specPath)), this.specObj)) {
        return (0, _ramda.path)(['visitors'].concat(_toConsumableArray(specPath)), this.specObj);
      }

      return (0, _ramda.path)(['visitors'].concat(_toConsumableArray(specPath), ['$visitor']), this.specObj);
    },
    retrieveVisitorInstance: function retrieveVisitorInstance(specPath) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var passingOpts = this.retrievePassingOptions();
      return this.retrieveVisitor(specPath)(_objectSpread(_objectSpread({}, passingOpts), options));
    },
    nodeToElement: function nodeToElement(specPath, node) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var visitor = this.retrieveVisitorInstance(specPath);
      (0, _.visit)(node, visitor, options);
      return visitor.element;
    }
  }
});
var _default = SpecificationVisitor;
exports["default"] = _default;