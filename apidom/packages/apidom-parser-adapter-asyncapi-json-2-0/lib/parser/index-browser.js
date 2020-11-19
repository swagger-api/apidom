"use strict";

exports.__esModule = true;
exports["default"] = exports.namespace = void 0;

require("./index-browser-patch");

var _webTreeSitter = _interopRequireDefault(require("web-tree-sitter"));

var _treeSitterJson = _interopRequireDefault(require("tree-sitter-json/tree-sitter-json.wasm"));

var _ = _interopRequireDefault(require("."));

var _index = require("./index");

exports.namespace = _index.namespace;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var parserP = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var JsonLanguage, parser;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _webTreeSitter["default"].init();

        case 2:
          _context.next = 4;
          return _webTreeSitter["default"].Language.load(_treeSitterJson["default"]);

        case 4:
          JsonLanguage = _context.sent;
          parser = new _webTreeSitter["default"]();
          parser.setLanguage(JsonLanguage);
          return _context.abrupt("return", parser);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

var parseBrowser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(source) {
    var options,
        parser,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            _context2.next = 3;
            return parserP;

          case 3:
            parser = _context2.sent;
            return _context2.abrupt("return", (0, _["default"])(source, _objectSpread(_objectSpread({}, options), {}, {
              parser: parser
            })));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function parseBrowser(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = parseBrowser;
exports["default"] = _default;