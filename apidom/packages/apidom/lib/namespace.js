"use strict";

exports.__esModule = true;
exports["default"] = exports.Namespace = void 0;

var _minim = _interopRequireDefault(require("minim"));

var _ParseResult = _interopRequireDefault(require("./elements/ParseResult"));

var _Annotation = _interopRequireDefault(require("./elements/Annotation"));

var _SourceMap = _interopRequireDefault(require("./elements/SourceMap"));

var _Comment = _interopRequireDefault(require("./elements/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Namespace = /*#__PURE__*/function (_minim$Namespace) {
  _inherits(Namespace, _minim$Namespace);

  var _super = _createSuper(Namespace);

  function Namespace() {
    var _this;

    _classCallCheck(this, Namespace);

    _this = _super.call(this);

    _this.register('parseResult', _ParseResult["default"]);

    _this.register('annotation', _Annotation["default"]);

    _this.register('sourceMap', _SourceMap["default"]);

    _this.register('comment', _Comment["default"]);

    return _this;
  }

  return Namespace;
}(_minim["default"].Namespace);

exports.Namespace = Namespace;
var namespace = new Namespace();
var _default = namespace;
exports["default"] = _default;