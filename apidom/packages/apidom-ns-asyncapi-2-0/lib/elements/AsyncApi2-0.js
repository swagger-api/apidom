"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _minim = require("minim");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AsyncApi2_0 = /*#__PURE__*/function (_ObjectElement) {
  _inherits(AsyncApi2_0, _ObjectElement);

  var _super = _createSuper(AsyncApi2_0);

  function AsyncApi2_0(content, meta, attributes) {
    var _this;

    _classCallCheck(this, AsyncApi2_0);

    _this = _super.call(this, content, meta, attributes);
    _this.element = 'asyncApi2-0';

    _this.classes.push('api');

    return _this;
  }

  _createClass(AsyncApi2_0, [{
    key: "asyncapi",
    get: function get() {
      return this.get('asyncapi');
    },
    set: function set(asyncapi) {
      this.set('asyncapi', asyncapi);
    }
  }, {
    key: "id",
    get: function get() {
      return this.get('id');
    },
    set: function set(id) {
      this.set('id', id);
    }
  }, {
    key: "info",
    get: function get() {
      return this.get('info');
    },
    set: function set(info) {
      this.set('info', info);
    }
  }, {
    key: "channels",
    get: function get() {
      return this.get('channels');
    },
    set: function set(channels) {
      this.set('channels', channels);
    }
  }, {
    key: "components",
    get: function get() {
      return this.get('components');
    },
    set: function set(components) {
      this.set('components', components);
    }
  }]);

  return AsyncApi2_0;
}(_minim.ObjectElement);

var _default = AsyncApi2_0;
exports["default"] = _default;