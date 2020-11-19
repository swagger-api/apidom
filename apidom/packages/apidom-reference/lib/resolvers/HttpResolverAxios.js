"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _axios = _interopRequireDefault(require("axios"));

var _ramda = require("ramda");

var _HttpResolver = _interopRequireDefault(require("./HttpResolver"));

var _ResolverError = _interopRequireDefault(require("../util/errors/ResolverError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var HttpResolverAxios = (0, _stampit["default"])(_HttpResolver["default"]).init(function HttpResolverAxios() {
  /**
   * Private Api.
   */
  var axiosInstance = _axios["default"].create({
    timeout: this.timeout,
    maxRedirects: this.redirects,
    withCredentials: this.withCredentials,
    responseType: 'arraybuffer'
  });
  /**
   * Public Api.
   */


  this.getHttpClient = function getHttpClient() {
    return (0, _ramda.clone)(axiosInstance);
  };

  this.read = /*#__PURE__*/function () {
    var _read = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(uri) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axiosInstance.get(uri);

            case 3:
              response = _context.sent;
              return _context.abrupt("return", response.data);

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              throw new _ResolverError["default"]("Error downloading \"".concat(uri, "\""), _context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    function read(_x) {
      return _read.apply(this, arguments);
    }

    return read;
  }();
});
var _default = HttpResolverAxios;
exports["default"] = _default;