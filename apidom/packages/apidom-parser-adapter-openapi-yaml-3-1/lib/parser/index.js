"use strict";

exports.__esModule = true;
exports["default"] = exports.namespace = void 0;

var _jsonSchemaRefParser = _interopRequireDefault(require("@apidevtools/json-schema-ref-parser"));

var _apidom = require("apidom");

var _apidomAst = require("apidom-ast");

var _apidomNsOpenapi = _interopRequireDefault(require("apidom-ns-openapi-3-1"));

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _specification = _interopRequireDefault(require("./specification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var namespace = (0, _apidom.createNamespace)(_apidomNsOpenapi["default"]);
exports.namespace = namespace;

var parse = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
    var _ref2,
        _ref2$sourceMap,
        sourceMap,
        _ref2$specObj,
        specObj,
        _ref2$parser,
        parser,
        resolvedSpecObj,
        parseResultElement,
        streamVisitor,
        cst,
        ast,
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

            streamVisitor = resolvedSpecObj.visitors.stream.$visitor(); // @ts-ignore

            cst = parser.parse(source);
            ast = (0, _apidomAst.transformTreeSitterYamlCST)(cst);
            (0, _apidomParserAdapterYaml.visit)(ast.rootNode, streamVisitor, {
              // @ts-ignore
              state: {
                namespace: namespace,
                specObj: resolvedSpecObj,
                sourceMap: sourceMap,
                element: parseResultElement
              }
            });
            return _context.abrupt("return", parseResultElement);

          case 10:
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