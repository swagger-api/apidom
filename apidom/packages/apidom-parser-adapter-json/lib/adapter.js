"use strict";

exports.__esModule = true;
exports.detect = exports.mediaTypes = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mediaTypes = ['application/javascript'];
exports.mediaTypes = mediaTypes;

var detect = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            JSON.parse(source);
            _context.next = 7;
            break;

          case 4:
            _context.prev = 4;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", false);

          case 7:
            return _context.abrupt("return", true);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 4]]);
  }));

  return function detect(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.detect = detect;