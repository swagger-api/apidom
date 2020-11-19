"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _stampit = _interopRequireDefault(require("stampit"));

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ApiDOMParser = (0, _stampit["default"])().init(function ApiDOMParser() {
  var adapters = [];

  var detectAdapterCandidates = function detectAdapterCandidates(source) {
    return adapters.filter(function (adapter) {
      if (!(0, _ramdaAdjunct.isFunction)(adapter.detect)) return false;
      return adapter.detect(source);
    });
  };

  var findAdapter = function findAdapter(source, mediaType) {
    if ((0, _ramdaAdjunct.isString)(mediaType)) {
      return adapters.find(function (adapter) {
        if (!(0, _ramdaAdjunct.isArray)(adapter.mediaTypes)) return false;
        return adapter.mediaTypes.includes(mediaType);
      });
    }

    return (0, _ramda.head)(detectAdapterCandidates(source));
  };

  this.use = function use(adapter) {
    adapters.push(adapter);
    return this;
  };

  this.parse = /*#__PURE__*/function () {
    var _parse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
      var options,
          adapter,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              adapter = findAdapter(source, options.mediaType);

              if (!(0, _ramdaAdjunct.isUndefined)(adapter)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", Promise.reject(new Error('Document did not match any registered parsers')));

            case 4:
              return _context.abrupt("return", adapter.parse(source, options));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function parse(_x) {
      return _parse.apply(this, arguments);
    }

    return parse;
  }();
});
var _default = ApiDOMParser;
exports["default"] = _default;