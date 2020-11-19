"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;
exports.treeSitterYamlKeyMap = exports.treeSitterJsonKeyMap = exports.transformTreeSitterYamlCST = exports.transformTreeSitterJsonCST = exports.visit = exports.BREAK = exports.getVisitFn = exports.Point = exports.isYamlTag = exports.isYamlStream = exports.isYamlSequence = exports.isYamlScalar = exports.isYamlMapping = exports.isYamlDocument = exports.isYamlDirective = exports.isYamlKeyValuePair = exports.isYamlAlias = exports.isJsonTrue = exports.isJsonString = exports.isJsonObject = exports.isJsonNumber = exports.isJsonNull = exports.isJsonKey = exports.isJsonArray = exports.isJsonEscapeSequence = exports.isJsonStringContent = exports.isJsonProperty = exports.isJsonFalse = exports.ParseResult = exports.Error = exports.Position = exports.Literal = exports.YamlAnchor = exports.YamlTag = exports.YamlStream = exports.YamlSequence = exports.YamlScalar = exports.YamlNode = exports.YamlMapping = exports.YamlKeyValuePair = exports.YamlDocument = exports.YamlDirective = exports.YamlComment = exports.YamlCollection = exports.YamlAlias = exports.JsonNull = exports.JsonFalse = exports.JsonTrue = exports.JsonNumber = exports.JsonEscapeSequence = exports.JsonStringContent = exports.JsonString = exports.JsonKey = exports.JsonValue = exports.JsonArray = exports.JsonProperty = exports.JsonObject = exports.JsonDocument = exports.JsonNode = void 0;

var _JsonNode = _interopRequireDefault(require("./nodes/json/JsonNode"));

exports.JsonNode = _JsonNode["default"];

var _JsonDocument = _interopRequireDefault(require("./nodes/json/JsonDocument"));

exports.JsonDocument = _JsonDocument["default"];

var _JsonObject = _interopRequireDefault(require("./nodes/json/JsonObject"));

exports.JsonObject = _JsonObject["default"];

var _JsonProperty = _interopRequireDefault(require("./nodes/json/JsonProperty"));

exports.JsonProperty = _JsonProperty["default"];

var _JsonArray = _interopRequireDefault(require("./nodes/json/JsonArray"));

exports.JsonArray = _JsonArray["default"];

var _JsonValue = _interopRequireDefault(require("./nodes/json/JsonValue"));

exports.JsonValue = _JsonValue["default"];

var _JsonKey = _interopRequireDefault(require("./nodes/json/JsonKey"));

exports.JsonKey = _JsonKey["default"];

var _JsonString = _interopRequireDefault(require("./nodes/json/JsonString"));

exports.JsonString = _JsonString["default"];

var _JsonStringContent = _interopRequireDefault(require("./nodes/json/JsonStringContent"));

exports.JsonStringContent = _JsonStringContent["default"];

var _JsonEscapeSequence = _interopRequireDefault(require("./nodes/json/JsonEscapeSequence"));

exports.JsonEscapeSequence = _JsonEscapeSequence["default"];

var _JsonNumber = _interopRequireDefault(require("./nodes/json/JsonNumber"));

exports.JsonNumber = _JsonNumber["default"];

var _JsonTrue = _interopRequireDefault(require("./nodes/json/JsonTrue"));

exports.JsonTrue = _JsonTrue["default"];

var _JsonFalse = _interopRequireDefault(require("./nodes/json/JsonFalse"));

exports.JsonFalse = _JsonFalse["default"];

var _JsonNull = _interopRequireDefault(require("./nodes/json/JsonNull"));

exports.JsonNull = _JsonNull["default"];

var _predicates = require("./nodes/json/predicates");

exports.isJsonFalse = _predicates.isFalse;
exports.isJsonProperty = _predicates.isProperty;
exports.isJsonStringContent = _predicates.isStringContent;
exports.isJsonEscapeSequence = _predicates.isEscapeSequence;
exports.isJsonArray = _predicates.isArray;
exports.isJsonKey = _predicates.isKey;
exports.isJsonNull = _predicates.isNull;
exports.isJsonNumber = _predicates.isNumber;
exports.isJsonObject = _predicates.isObject;
exports.isJsonString = _predicates.isString;
exports.isJsonTrue = _predicates.isTrue;

var _YamlAlias = _interopRequireDefault(require("./nodes/yaml/YamlAlias"));

exports.YamlAlias = _YamlAlias["default"];

var _YamlCollection = _interopRequireDefault(require("./nodes/yaml/YamlCollection"));

exports.YamlCollection = _YamlCollection["default"];

var _YamlComment = _interopRequireDefault(require("./nodes/yaml/YamlComment"));

exports.YamlComment = _YamlComment["default"];

var _YamlDirective = _interopRequireDefault(require("./nodes/yaml/YamlDirective"));

exports.YamlDirective = _YamlDirective["default"];

var _YamlDocument = _interopRequireDefault(require("./nodes/yaml/YamlDocument"));

exports.YamlDocument = _YamlDocument["default"];

var _YamlKeyValuePair = _interopRequireDefault(require("./nodes/yaml/YamlKeyValuePair"));

exports.YamlKeyValuePair = _YamlKeyValuePair["default"];

var _YamlMapping = _interopRequireDefault(require("./nodes/yaml/YamlMapping"));

exports.YamlMapping = _YamlMapping["default"];

var _YamlNode = _interopRequireDefault(require("./nodes/yaml/YamlNode"));

exports.YamlNode = _YamlNode["default"];

var _YamlScalar = _interopRequireDefault(require("./nodes/yaml/YamlScalar"));

exports.YamlScalar = _YamlScalar["default"];

var _YamlSequence = _interopRequireDefault(require("./nodes/yaml/YamlSequence"));

exports.YamlSequence = _YamlSequence["default"];

var _YamlStream = _interopRequireDefault(require("./nodes/yaml/YamlStream"));

exports.YamlStream = _YamlStream["default"];

var _YamlTag = _interopRequireDefault(require("./nodes/yaml/YamlTag"));

exports.YamlTag = _YamlTag["default"];

var _YamlAnchor = _interopRequireDefault(require("./nodes/yaml/YamlAnchor"));

exports.YamlAnchor = _YamlAnchor["default"];

var _predicates2 = require("./nodes/yaml/predicates");

exports.isYamlAlias = _predicates2.isAlias;
exports.isYamlKeyValuePair = _predicates2.isKeyValuePair;
exports.isYamlDirective = _predicates2.isDirective;
exports.isYamlDocument = _predicates2.isDocument;
exports.isYamlMapping = _predicates2.isMapping;
exports.isYamlScalar = _predicates2.isScalar;
exports.isYamlSequence = _predicates2.isSequence;
exports.isYamlStream = _predicates2.isStream;
exports.isYamlTag = _predicates2.isTag;

var _Literal = _interopRequireDefault(require("./Literal"));

exports.Literal = _Literal["default"];

var _Position = _interopRequireWildcard(require("./Position"));

exports.Point = _Position.Point;
exports.Position = _Position["default"];

var _Error = _interopRequireDefault(require("./Error"));

exports.Error = _Error["default"];

var _ParseResult = _interopRequireDefault(require("./ParseResult"));

exports.ParseResult = _ParseResult["default"];

var _visitor = require("./visitor");

exports.getVisitFn = _visitor.getVisitFn;
exports.BREAK = _visitor.BREAK;
exports.visit = _visitor.visit;

var _treeSitterJson = require("./transformers/tree-sitter-json");

exports.transformTreeSitterJsonCST = _treeSitterJson.transform;
exports.treeSitterJsonKeyMap = _treeSitterJson.keyMap;

var _treeSitterYaml = require("./transformers/tree-sitter-yaml");

exports.transformTreeSitterYamlCST = _treeSitterYaml.transform;
exports.treeSitterYamlKeyMap = _treeSitterYaml.keyMap;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }