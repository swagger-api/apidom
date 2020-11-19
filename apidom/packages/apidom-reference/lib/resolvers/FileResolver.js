"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _fs = require("fs");

var _util = require("util");

var _Resolver = _interopRequireDefault(require("./Resolver"));

var _url = require("../util/url");

var _errors = require("../util/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var FileResolver = (0, _stampit["default"])(_Resolver["default"], {
  methods: {
    canRead: function canRead(uri) {
      return (0, _url.isFileSystemPath)(uri);
    },
    read: function read(uri) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var fileSystemPath;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fileSystemPath = (0, _url.toFileSystemPath)({}, uri);
                _context.prev = 1;
                _context.next = 4;
                return (0, _util.promisify)(_fs.readFile)(fileSystemPath);

              case 4:
                return _context.abrupt("return", _context.sent);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                throw new _errors.ResolverError("Error opening file \"".concat(uri, "\""), _context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 7]]);
      }))();
    }
  }
});
var _default = FileResolver;
exports["default"] = _default;