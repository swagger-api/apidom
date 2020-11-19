"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _Resolver = _interopRequireDefault(require("./Resolver"));

var _url = require("../util/url");

var _NotImplementedError = _interopRequireDefault(require("../util/errors/NotImplementedError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var HttpResolver = (0, _stampit["default"])(_Resolver["default"], {
  props: {
    timeout: 5000,
    redirects: 5,
    withCredentials: false
  },
  init: function init() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? this.timeout : _ref$timeout,
        _ref$redirects = _ref.redirects,
        redirects = _ref$redirects === void 0 ? this.redirects : _ref$redirects,
        _ref$withCredentials = _ref.withCredentials,
        withCredentials = _ref$withCredentials === void 0 ? this.withCredentials : _ref$withCredentials;

    this.timeout = timeout;
    this.redirects = redirects;
    this.withCredentials = withCredentials;
  },
  methods: {
    canRead: function canRead(uri) {
      return (0, _url.isHttpUrl)(uri);
    },
    read: function read() {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new _NotImplementedError["default"]();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getHttpClient: function getHttpClient() {
      throw new _NotImplementedError["default"]();
    }
  }
});
var _default = HttpResolver;
exports["default"] = _default;