"use strict";

exports.__esModule = true;
exports.isChannelItemElement = exports.isChannelsElement = exports.isSchemaElement = exports.isComponentsElement = exports.isServerVariableElement = exports.isServerElement = exports.isServersElement = exports.isContactElement = exports.isLicenseElement = exports.isInfoElement = exports.isIdentifierElement = exports.isAsycapiElement = exports.isAsycApi2_0Element = void 0;

var _ramda = require("ramda");

var _apidom = require("apidom");

var _AsyncApi = _interopRequireDefault(require("./elements/AsyncApi2-0"));

var _Asyncapi = _interopRequireDefault(require("./elements/Asyncapi"));

var _Identifier = _interopRequireDefault(require("./elements/Identifier"));

var _Info = _interopRequireDefault(require("./elements/Info"));

var _License = _interopRequireDefault(require("./elements/License"));

var _Contact = _interopRequireDefault(require("./elements/Contact"));

var _Components = _interopRequireDefault(require("./elements/Components"));

var _Schema = _interopRequireDefault(require("./elements/Schema"));

var _Channels = _interopRequireDefault(require("./elements/Channels"));

var _ChannelItem = _interopRequireDefault(require("./elements/ChannelItem"));

var _Servers = _interopRequireDefault(require("./elements/Servers"));

var _Server = _interopRequireDefault(require("./elements/Server"));

var _ServerVariable = _interopRequireDefault(require("./elements/ServerVariable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isAsycApi2_0Element = (0, _apidom.createPredicate)(function (_ref) {
  var hasBasicElementProps = _ref.hasBasicElementProps,
      isElementType = _ref.isElementType,
      primitiveEq = _ref.primitiveEq,
      hasClass = _ref.hasClass;
  var isElementTypeAsyncApi2_0 = isElementType('asyncApi2-0');
  var primitiveEqObject = primitiveEq('object');
  var hasClassApi = hasClass('api');
  return (0, _ramda.either)((0, _ramda.is)(_AsyncApi["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeAsyncApi2_0, primitiveEqObject, hasClassApi]));
});
exports.isAsycApi2_0Element = isAsycApi2_0Element;
var isAsycapiElement = (0, _apidom.createPredicate)(function (_ref2) {
  var hasBasicElementProps = _ref2.hasBasicElementProps,
      isElementType = _ref2.isElementType,
      primitiveEq = _ref2.primitiveEq;
  var isElementTypeAsyncapi = isElementType('asyncapi');
  var primitiveEqString = primitiveEq('string');
  return (0, _ramda.either)((0, _ramda.is)(_Asyncapi["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeAsyncapi, primitiveEqString]));
});
exports.isAsycapiElement = isAsycapiElement;
var isIdentifierElement = (0, _apidom.createPredicate)(function (_ref3) {
  var hasBasicElementProps = _ref3.hasBasicElementProps,
      isElementType = _ref3.isElementType,
      primitiveEq = _ref3.primitiveEq;
  var isElementTypeIdentifier = isElementType('identifier');
  var primitiveEqString = primitiveEq('string');
  return (0, _ramda.either)((0, _ramda.is)(_Identifier["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeIdentifier, primitiveEqString]));
});
exports.isIdentifierElement = isIdentifierElement;
var isInfoElement = (0, _apidom.createPredicate)(function (_ref4) {
  var hasBasicElementProps = _ref4.hasBasicElementProps,
      isElementType = _ref4.isElementType,
      primitiveEq = _ref4.primitiveEq;
  var isElementTypeInfo = isElementType('info');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Info["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeInfo, primitiveEqObject]));
});
exports.isInfoElement = isInfoElement;
var isLicenseElement = (0, _apidom.createPredicate)(function (_ref5) {
  var hasBasicElementProps = _ref5.hasBasicElementProps,
      isElementType = _ref5.isElementType,
      primitiveEq = _ref5.primitiveEq;
  var isElementTypeLicense = isElementType('license');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_License["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeLicense, primitiveEqObject]));
});
exports.isLicenseElement = isLicenseElement;
var isContactElement = (0, _apidom.createPredicate)(function (_ref6) {
  var hasBasicElementProps = _ref6.hasBasicElementProps,
      isElementType = _ref6.isElementType,
      primitiveEq = _ref6.primitiveEq;
  var isElementTypeContact = isElementType('contact');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Contact["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeContact, primitiveEqObject]));
});
exports.isContactElement = isContactElement;
var isServersElement = (0, _apidom.createPredicate)(function (_ref7) {
  var hasBasicElementProps = _ref7.hasBasicElementProps,
      isElementType = _ref7.isElementType,
      primitiveEq = _ref7.primitiveEq;
  var isElementTypeChannels = isElementType('servers');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Servers["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeChannels, primitiveEqObject]));
});
exports.isServersElement = isServersElement;
var isServerElement = (0, _apidom.createPredicate)(function (_ref8) {
  var hasBasicElementProps = _ref8.hasBasicElementProps,
      isElementType = _ref8.isElementType,
      primitiveEq = _ref8.primitiveEq;
  var isElementTypeChannels = isElementType('server');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Server["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeChannels, primitiveEqObject]));
});
exports.isServerElement = isServerElement;
var isServerVariableElement = (0, _apidom.createPredicate)(function (_ref9) {
  var hasBasicElementProps = _ref9.hasBasicElementProps,
      isElementType = _ref9.isElementType,
      primitiveEq = _ref9.primitiveEq;
  var isElementTypeChannels = isElementType('serverVariable');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_ServerVariable["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeChannels, primitiveEqObject]));
});
exports.isServerVariableElement = isServerVariableElement;
var isComponentsElement = (0, _apidom.createPredicate)(function (_ref10) {
  var hasBasicElementProps = _ref10.hasBasicElementProps,
      isElementType = _ref10.isElementType,
      primitiveEq = _ref10.primitiveEq;
  var isElementTypeInfo = isElementType('components');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Components["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeInfo, primitiveEqObject]));
});
exports.isComponentsElement = isComponentsElement;
var isSchemaElement = (0, _apidom.createPredicate)(function (_ref11) {
  var hasBasicElementProps = _ref11.hasBasicElementProps,
      isElementType = _ref11.isElementType,
      primitiveEq = _ref11.primitiveEq;
  var isElementTypeInfo = isElementType('schema');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Schema["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeInfo, primitiveEqObject]));
});
exports.isSchemaElement = isSchemaElement;
var isChannelsElement = (0, _apidom.createPredicate)(function (_ref12) {
  var hasBasicElementProps = _ref12.hasBasicElementProps,
      isElementType = _ref12.isElementType,
      primitiveEq = _ref12.primitiveEq;
  var isElementTypeChannels = isElementType('channels');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_Channels["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeChannels, primitiveEqObject]));
});
exports.isChannelsElement = isChannelsElement;
var isChannelItemElement = (0, _apidom.createPredicate)(function (_ref13) {
  var hasBasicElementProps = _ref13.hasBasicElementProps,
      isElementType = _ref13.isElementType,
      primitiveEq = _ref13.primitiveEq;
  var isElementTypeChannelItem = isElementType('channelItem');
  var primitiveEqObject = primitiveEq('object');
  return (0, _ramda.either)((0, _ramda.is)(_ChannelItem["default"]), (0, _ramda.allPass)([hasBasicElementProps, isElementTypeChannelItem, primitiveEqObject]));
});
exports.isChannelItemElement = isChannelItemElement;