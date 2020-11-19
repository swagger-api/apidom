"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _OpenApi = _interopRequireDefault(require("./elements/OpenApi3-1"));

var _Openapi = _interopRequireDefault(require("./elements/Openapi"));

var _Info = _interopRequireDefault(require("./elements/Info"));

var _License = _interopRequireDefault(require("./elements/License"));

var _Contact = _interopRequireDefault(require("./elements/Contact"));

var _Components = _interopRequireDefault(require("./elements/Components"));

var _Schema = _interopRequireDefault(require("./elements/Schema"));

var _Server = _interopRequireDefault(require("./elements/Server"));

var _ServerVariable = _interopRequireDefault(require("./elements/ServerVariable"));

var _Paths = _interopRequireDefault(require("./elements/Paths"));

var _PathItem = _interopRequireDefault(require("./elements/PathItem"));

var _Operation = _interopRequireDefault(require("./elements/Operation"));

var _Parameter = _interopRequireDefault(require("./elements/Parameter"));

var _Reference = _interopRequireDefault(require("./elements/Reference"));

var _ExternalDocumentation = _interopRequireDefault(require("./elements/ExternalDocumentation"));

var _RequestBody = _interopRequireDefault(require("./elements/RequestBody"));

var _Responses = _interopRequireDefault(require("./elements/Responses"));

var _Callback = _interopRequireDefault(require("./elements/Callback"));

var _SecurityRequirement = _interopRequireDefault(require("./elements/SecurityRequirement"));

var _Response = _interopRequireDefault(require("./elements/Response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var openApi3_1 = {
  namespace: function namespace(options) {
    var base = options.base;
    base.register('openApi3_1', _OpenApi["default"]);
    base.register('openapi', _Openapi["default"]);
    base.register('info', _Info["default"]);
    base.register('license', _License["default"]);
    base.register('contact', _Contact["default"]);
    base.register('components', _Components["default"]);
    base.register('schema', _Schema["default"]);
    base.register('server', _Server["default"]);
    base.register('serverVariable', _ServerVariable["default"]);
    base.register('paths', _Paths["default"]);
    base.register('pathItem', _PathItem["default"]);
    base.register('operation', _Operation["default"]);
    base.register('parameter', _Parameter["default"]);
    base.register('reference', _Reference["default"]);
    base.register('externalDocumentation', _ExternalDocumentation["default"]);
    base.register('requestBody', _RequestBody["default"]);
    base.register('responses', _Responses["default"]);
    base.register('callback', _Callback["default"]);
    base.register('securityRequirement', _SecurityRequirement["default"]);
    base.register('response', _Response["default"]);
    return base;
  }
};
var _default = openApi3_1;
exports["default"] = _default;