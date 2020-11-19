"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ramda = require("ramda");

var _apidomParserAdapterJson = require("apidom-parser-adapter-json");

var _DocumentVisitor = _interopRequireDefault(require("./visitors/DocumentVisitor"));

var _asyncApi = _interopRequireDefault(require("./visitors/async-api-2-0"));

var _SpecificationExtensionVisitor = _interopRequireDefault(require("./visitors/SpecificationExtensionVisitor"));

var _AsyncapiVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/AsyncapiVisitor"));

var _IdentifierVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/IdentifierVisitor"));

var _info = _interopRequireDefault(require("./visitors/async-api-2-0/info"));

var _TitleVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/info/TitleVisitor"));

var _DescriptionVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/info/DescriptionVisitor"));

var _SummaryVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/info/SummaryVisitor"));

var _TermsOfServiceVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/info/TermsOfServiceVisitor"));

var _VersionVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/info/VersionVisitor"));

var _contact = _interopRequireDefault(require("./visitors/async-api-2-0/contact"));

var _NameVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/contact/NameVisitor"));

var _UrlVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/contact/UrlVisitor"));

var _EmailVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/contact/EmailVisitor"));

var _license = _interopRequireDefault(require("./visitors/async-api-2-0/license"));

var _NameVisitor2 = _interopRequireDefault(require("./visitors/async-api-2-0/license/NameVisitor"));

var _UrlVisitor2 = _interopRequireDefault(require("./visitors/async-api-2-0/license/UrlVisitor"));

var _schema = _interopRequireDefault(require("./visitors/async-api-2-0/schema"));

var _components = _interopRequireDefault(require("./visitors/async-api-2-0/components"));

var _SchemasVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/components/SchemasVisitor"));

var _channels = _interopRequireDefault(require("./visitors/async-api-2-0/channels"));

var _channelItem = _interopRequireDefault(require("./visitors/async-api-2-0/channel-item"));

var _$RefVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/channel-item/$RefVisitor"));

var _DescriptionVisitor2 = _interopRequireDefault(require("./visitors/async-api-2-0/channel-item/DescriptionVisitor"));

var _channelBindings = _interopRequireDefault(require("./visitors/async-api-2-0/channel-bindings"));

var _operation = _interopRequireDefault(require("./visitors/async-api-2-0/operation"));

var _parameters = _interopRequireDefault(require("./visitors/async-api-2-0/parameters"));

var _servers = _interopRequireDefault(require("./visitors/async-api-2-0/servers"));

var _server = _interopRequireDefault(require("./visitors/async-api-2-0/server"));

var _UrlVisitor3 = _interopRequireDefault(require("./visitors/async-api-2-0/server/UrlVisitor"));

var _ProtocolVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/server/ProtocolVisitor"));

var _ProtocolVersionVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/server/ProtocolVersionVisitor"));

var _DescriptionVisitor3 = _interopRequireDefault(require("./visitors/async-api-2-0/server/DescriptionVisitor"));

var _VariablesVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/server/VariablesVisitor"));

var _SecurityVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/server/SecurityVisitor"));

var _serverVariable = _interopRequireDefault(require("./visitors/async-api-2-0/server-variable"));

var _EnumVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/server-variable/EnumVisitor"));

var _DefaultVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/server-variable/DefaultVisitor"));

var _DescriptionVisitor4 = _interopRequireDefault(require("./visitors/async-api-2-0/server-variable/DescriptionVisitor"));

var _ExamplesVisitor = _interopRequireDefault(require("./visitors/async-api-2-0/server-variable/ExamplesVisitor"));

var _serverBindings = _interopRequireDefault(require("./visitors/async-api-2-0/server-bindings"));

var _securityRequirement = _interopRequireDefault(require("./visitors/async-api-2-0/security-requirement"));

var _generics = require("./visitors/generics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the AST.
 * Specification also allows us to create new parser adapters from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use relative JSON pointers.
 */
var specification = (0, _ramda.mergeDeepRight)(_apidomParserAdapterJson.specification, {
  visitors: {
    object: _generics.ObjectVisitor,
    document: {
      $visitor: _DocumentVisitor["default"],
      objects: {
        AsyncApi: {
          $visitor: _asyncApi["default"],
          fixedFields: {
            asyncapi: _AsyncapiVisitor["default"],
            id: _IdentifierVisitor["default"],
            info: {
              $ref: '#/visitors/document/objects/Info'
            },
            servers: {
              $ref: '#/visitors/document/objects/Servers'
            },
            channels: {
              $ref: '#/visitors/document/objects/Channels'
            },
            components: {
              $ref: '#/visitors/document/objects/Components'
            }
          }
        },
        Info: {
          $visitor: _info["default"],
          fixedFields: {
            title: _TitleVisitor["default"],
            description: _DescriptionVisitor["default"],
            summary: _SummaryVisitor["default"],
            termsOfService: _TermsOfServiceVisitor["default"],
            version: _VersionVisitor["default"],
            contact: {
              $ref: '#/visitors/document/objects/Contact'
            },
            license: {
              $ref: '#/visitors/document/objects/License'
            }
          }
        },
        Contact: {
          $visitor: _contact["default"],
          fixedFields: {
            name: _NameVisitor["default"],
            url: _UrlVisitor["default"],
            email: _EmailVisitor["default"]
          }
        },
        License: {
          $visitor: _license["default"],
          fixedFields: {
            name: _NameVisitor2["default"],
            url: _UrlVisitor2["default"]
          }
        },
        Servers: {
          $visitor: _servers["default"]
        },
        Server: {
          $visitor: _server["default"],
          fixedFields: {
            url: _UrlVisitor3["default"],
            protocol: _ProtocolVisitor["default"],
            protocolVersion: _ProtocolVersionVisitor["default"],
            description: _DescriptionVisitor3["default"],
            variables: _VariablesVisitor["default"],
            security: _SecurityVisitor["default"],
            bindings: {
              $ref: '#/visitors/document/objects/Operation'
            }
          }
        },
        ServerVariable: {
          $visitor: _serverVariable["default"],
          fixedFields: {
            "enum": _EnumVisitor["default"],
            "default": _DefaultVisitor["default"],
            description: _DescriptionVisitor4["default"],
            examples: _ExamplesVisitor["default"]
          }
        },
        ServerBindings: {
          $visitor: _serverBindings["default"],
          fixedFields: {}
        },
        SecurityRequirement: {
          $visitor: _securityRequirement["default"]
        },
        Schema: {
          $visitor: _schema["default"]
        },
        Channels: {
          $visitor: _channels["default"]
        },
        ChannelItem: {
          $visitor: _channelItem["default"],
          fixedFields: {
            $ref: _$RefVisitor["default"],
            description: _DescriptionVisitor2["default"],
            subscribe: {
              $ref: '#/visitors/document/objects/Operation'
            },
            publish: {
              $ref: '#/visitors/document/objects/Operation'
            },
            parameters: {
              $ref: '#/visitors/document/objects/Parameters'
            },
            bindings: {
              $ref: '#/visitors/document/objects/ChannelBindings'
            }
          }
        },
        Operation: {
          $visitor: _operation["default"],
          fixedFields: {}
        },
        ChannelBindings: {
          $visitor: _channelBindings["default"],
          fixedFields: {}
        },
        Parameters: {
          $visitor: _parameters["default"]
        },
        Components: {
          $visitor: _components["default"],
          fixedFields: {
            schemas: _SchemasVisitor["default"]
          }
        }
      },
      extension: _SpecificationExtensionVisitor["default"]
    }
  }
});
var _default = specification;
exports["default"] = _default;