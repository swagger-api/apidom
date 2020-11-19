"use strict";

exports.__esModule = true;
exports.isOperationElement = exports.isPathItemElement = exports.isPathsElement = exports.isServerVariableElement = exports.isServerElement = exports.isSchemaElement = exports.isComponentsElement = exports.isContactElement = exports.isLicenseElement = exports.isInfoElement = exports.isOpenapiElement = exports.isOpenApiApi3_1Element = void 0;

var _ramda = require("ramda");

var _apidom = require("apidom");

var _Components = _interopRequireDefault(require("./elements/Components"));

var _Contact = _interopRequireDefault(require("./elements/Contact"));

var _Info = _interopRequireDefault(require("./elements/Info"));

var _License = _interopRequireDefault(require("./elements/License"));

var _Openapi = _interopRequireDefault(require("./elements/Openapi"));

var _OpenApi = _interopRequireDefault(require("./elements/OpenApi3-1"));

var _Schema = _interopRequireDefault(require("./elements/Schema"));

var _Server = _interopRequireDefault(require("./elements/Server"));

var _ServerVariable = _interopRequireDefault(require("./elements/ServerVariable"));

var _Paths = _interopRequireDefault(require("./elements/Paths"));

var _PathItem = _interopRequireDefault(require("./elements/PathItem"));

var _Operation = _interopRequireDefault(require("./elements/Operation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isOpenApiApi3_1Element = (0, _apidom.createPredicate)(function (_ref) {
  var hasBasicElementProps = _ref.hasBasicElementProps,
      isElementType = _ref.isElementType,
      primitiveEq = _ref.primitiveEq,
      hasClass = _ref.hasClass;
  var isElementTypeOpenApi3_1 = isElementType('openApi3-1');
  var primitiveEqObject = primitiveEq('object');
  var hasClassApi = hasClass('api');
  return (0, _ramda.either)((0, _ramda.is)(_OpenApi["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeOpenApi3_1, primitiveEqObject, hasClassApi]));
});
exports.isOpenApiApi3_1Element = isOpenApiApi3_1Element;
var isOpenapiElement = (0, _apidom.createPredicate)(function (_ref2) {
  var hasBasicElementProps = _ref2.hasBasicElementProps,
      isElementType = _ref2.isElementType,
      primitiveEq = _ref2.primitiveEq;
  var isElementTypeOpenapi = isElementType('openapi');
  var primitiveEqString = primitiveEq('string');
  return (0, _ramda.either)((0, _ramda.is)(_Openapi["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeOpenapi, primitiveEqString]));
});
exports.isOpenapiElement = isOpenapiElement;
var isInfoElement = (0, _apidom.createPredicate)(function (_ref3) {
  var hasBasicElementProps = _ref3.hasBasicElementProps,
      isElementType = _ref3.isElementType,
      primitiveEq = _ref3.primitiveEq;
  var isElementTypeInfo = isElementType('info');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Info["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeInfo, primitiveEqObject]));
});
exports.isInfoElement = isInfoElement;
var isLicenseElement = (0, _apidom.createPredicate)(function (_ref4) {
  var hasBasicElementProps = _ref4.hasBasicElementProps,
      isElementType = _ref4.isElementType,
      primitiveEq = _ref4.primitiveEq;
  var isElementTypeLicense = isElementType('license');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_License["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeLicense, primitiveEqObject]));
});
exports.isLicenseElement = isLicenseElement;
var isContactElement = (0, _apidom.createPredicate)(function (_ref5) {
  var hasBasicElementProps = _ref5.hasBasicElementProps,
      isElementType = _ref5.isElementType,
      primitiveEq = _ref5.primitiveEq;
  var isElementTypeContact = isElementType('contact');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Contact["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeContact, primitiveEqObject]));
});
exports.isContactElement = isContactElement;
var isComponentsElement = (0, _apidom.createPredicate)(function (_ref6) {
  var hasBasicElementProps = _ref6.hasBasicElementProps,
      isElementType = _ref6.isElementType,
      primitiveEq = _ref6.primitiveEq;
  var isElementTypeComponents = isElementType('components');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Components["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeComponents, primitiveEqObject]));
});
exports.isComponentsElement = isComponentsElement;
var isSchemaElement = (0, _apidom.createPredicate)(function (_ref7) {
  var hasBasicElementProps = _ref7.hasBasicElementProps,
      isElementType = _ref7.isElementType,
      primitiveEq = _ref7.primitiveEq;
  var isElementTypeSchema = isElementType('schema');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Schema["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeSchema, primitiveEqObject]));
});
exports.isSchemaElement = isSchemaElement;
var isServerElement = (0, _apidom.createPredicate)(function (_ref8) {
  var hasBasicElementProps = _ref8.hasBasicElementProps,
      isElementType = _ref8.isElementType,
      primitiveEq = _ref8.primitiveEq;
  var isElementTypeServer = isElementType('server');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Server["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeServer, primitiveEqObject]));
});
exports.isServerElement = isServerElement;
var isServerVariableElement = (0, _apidom.createPredicate)(function (_ref9) {
  var hasBasicElementProps = _ref9.hasBasicElementProps,
      isElementType = _ref9.isElementType,
      primitiveEq = _ref9.primitiveEq;
  var isElementTypeServerVariable = isElementType('serverVariable');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_ServerVariable["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeServerVariable, primitiveEqObject]));
});
exports.isServerVariableElement = isServerVariableElement;
var isPathsElement = (0, _apidom.createPredicate)(function (_ref10) {
  var hasBasicElementProps = _ref10.hasBasicElementProps,
      isElementType = _ref10.isElementType,
      primitiveEq = _ref10.primitiveEq;
  var isElementTypePaths = isElementType('paths');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Paths["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypePaths, primitiveEqObject]));
});
exports.isPathsElement = isPathsElement;
var isPathItemElement = (0, _apidom.createPredicate)(function (_ref11) {
  var hasBasicElementProps = _ref11.hasBasicElementProps,
      isElementType = _ref11.isElementType,
      primitiveEq = _ref11.primitiveEq;
  var isElementTypePathItem = isElementType('pathItem');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_PathItem["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypePathItem, primitiveEqObject]));
});
exports.isPathItemElement = isPathItemElement;
var isOperationElement = (0, _apidom.createPredicate)(function (_ref12) {
  var hasBasicElementProps = _ref12.hasBasicElementProps,
      isElementType = _ref12.isElementType,
      primitiveEq = _ref12.primitiveEq;
  var isElementTypeOperation = isElementType('operation');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Operation["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeOperation, primitiveEqObject]));
});
exports.isOperationElement = isOperationElement;