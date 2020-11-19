"use strict";

exports.__esModule = true;
exports["default"] = void 0;

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

var _Operation = _interopRequireDefault(require("./elements/Operation"));

var _Parameters = _interopRequireDefault(require("./elements/Parameters"));

var _ChannelBindings = _interopRequireDefault(require("./elements/ChannelBindings"));

var _Servers = _interopRequireDefault(require("./elements/Servers"));

var _Server = _interopRequireDefault(require("./elements/Server"));

var _ServerVariable = _interopRequireDefault(require("./elements/ServerVariable"));

var _SecurityRequirement = _interopRequireDefault(require("./elements/SecurityRequirement"));

var _ServerBindings = _interopRequireDefault(require("./elements/ServerBindings"));

var _Reference = _interopRequireDefault(require("./elements/Reference"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var asyncApi2_0 = {
  namespace: function namespace(options) {
    var base = options.base;
    base.register('asyncApi2_0', _AsyncApi["default"]);
    base.register('asyncapi', _Asyncapi["default"]);
    base.register('identifier', _Identifier["default"]);
    base.register('info', _Info["default"]);
    base.register('license', _License["default"]);
    base.register('contact', _Contact["default"]);
    base.register('components', _Components["default"]);
    base.register('schema', _Schema["default"]);
    base.register('channels', _Channels["default"]);
    base.register('channelItem', _ChannelItem["default"]);
    base.register('operation', _Operation["default"]);
    base.register('parameters', _Parameters["default"]);
    base.register('channelBindings', _ChannelBindings["default"]);
    base.register('servers', _Servers["default"]);
    base.register('server', _Server["default"]);
    base.register('serverVariable', _ServerVariable["default"]);
    base.register('securityRequirement', _SecurityRequirement["default"]);
    base.register('serverBindings', _ServerBindings["default"]);
    base.register('reference', _Reference["default"]);
    return base;
  }
};
var _default = asyncApi2_0;
exports["default"] = _default;