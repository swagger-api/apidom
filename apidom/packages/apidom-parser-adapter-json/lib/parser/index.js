"use strict";

exports.__esModule = true;
exports["default"] = exports.namespace = void 0;

var _jsonSchemaRefParser = _interopRequireDefault(require("@apidevtools/json-schema-ref-parser"));

var _apidom = require("apidom");

var _apidomAst = require("apidom-ast");

var _specification = _interopRequireDefault(require("./specification"));

var _visitors = require("./visitors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var namespace = (0, _apidom.createNamespace)();
exports.namespace = namespace;

var parse = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
    var _keyMap;

    var _ref2,
        _ref2$sourceMap,
        sourceMap,
        _ref2$specObj,
        specObj,
        _ref2$parser,
        parser,
        resolvedSpecObj,
        parseResultElement,
        documentVisitor,
        cst,
        ast,
        keyMap,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref2$sourceMap = _ref2.sourceMap, sourceMap = _ref2$sourceMap === void 0 ? false : _ref2$sourceMap, _ref2$specObj = _ref2.specObj, specObj = _ref2$specObj === void 0 ? _specification["default"] : _ref2$specObj, _ref2$parser = _ref2.parser, parser = _ref2$parser === void 0 ? null : _ref2$parser;
            _context.next = 3;
            return _jsonSchemaRefParser["default"].dereference(specObj);

          case 3:
            resolvedSpecObj = _context.sent;
            // @ts-ignore
            parseResultElement = new namespace.elements.ParseResult(); // @ts-ignore

            documentVisitor = resolvedSpecObj.visitors.document.$visitor(); // @ts-ignore

            cst = parser.parse(source);
            ast = (0, _apidomAst.transformTreeSitterJsonCST)(cst);
            keyMap = (_keyMap = {}, _defineProperty(_keyMap, _apidomAst.JsonDocument.type, ['children']), _defineProperty(_keyMap, _apidomAst.JsonObject.type, ['children']), _defineProperty(_keyMap, _apidomAst.JsonProperty.type, ['children']), _defineProperty(_keyMap, _apidomAst.JsonArray.type, ['children']), _defineProperty(_keyMap, _apidomAst.Error.type, ['children']), _keyMap);
            (0, _visitors.visit)(ast.rootNode, documentVisitor, {
              keyMap: keyMap,
              // @ts-ignore
              state: {
                namespace: namespace,
                specObj: resolvedSpecObj,
                sourceMap: sourceMap,
                element: parseResultElement
              }
            });
            return _context.abrupt("return", parseResultElement);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function parse(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = parse;
exports["default"] = _default;