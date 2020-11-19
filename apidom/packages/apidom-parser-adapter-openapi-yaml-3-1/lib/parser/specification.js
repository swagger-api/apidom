"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ramda = require("ramda");

var _apidomParserAdapterYaml = require("apidom-parser-adapter-yaml-1-2");

var _DocumentVisitor = _interopRequireDefault(require("./visitors/DocumentVisitor"));

var _generics = require("./visitors/generics");

var _SpecificationExtensionVisitor = _interopRequireDefault(require("./visitors/SpecificationExtensionVisitor"));

var _openApi = _interopRequireDefault(require("./visitors/open-api-3-1"));

var _OpenapiVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/OpenapiVisitor"));

var _info = _interopRequireDefault(require("./visitors/open-api-3-1/info"));

var _TitleVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/info/TitleVisitor"));

var _DescriptionVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/info/DescriptionVisitor"));

var _SummaryVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/info/SummaryVisitor"));

var _TermsOfServiceVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/info/TermsOfServiceVisitor"));

var _VersionVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/info/VersionVisitor"));

var _contact = _interopRequireDefault(require("./visitors/open-api-3-1/contact"));

var _NameVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/contact/NameVisitor"));

var _UrlVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/contact/UrlVisitor"));

var _EmailVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/contact/EmailVisitor"));

var _license = _interopRequireDefault(require("./visitors/open-api-3-1/license"));

var _NameVisitor2 = _interopRequireDefault(require("./visitors/open-api-3-1/license/NameVisitor"));

var _IdentifierVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/license/IdentifierVisitor"));

var _UrlVisitor2 = _interopRequireDefault(require("./visitors/open-api-3-1/license/UrlVisitor"));

var _ServersVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/ServersVisitor"));

var _server = _interopRequireDefault(require("./visitors/open-api-3-1/server"));

var _UrlVisitor3 = _interopRequireDefault(require("./visitors/open-api-3-1/server/UrlVisitor"));

var _DescriptionVisitor2 = _interopRequireDefault(require("./visitors/open-api-3-1/server/DescriptionVisitor"));

var _VariablesVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/server/VariablesVisitor"));

var _serverVariable = _interopRequireDefault(require("./visitors/open-api-3-1/server-variable"));

var _EnumVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/server-variable/EnumVisitor"));

var _DefaultVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/server-variable/DefaultVisitor"));

var _DescriptionVisitor3 = _interopRequireDefault(require("./visitors/open-api-3-1/server-variable/DescriptionVisitor"));

var _SecurityVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/SecurityVisitor"));

var _securityRequirement = _interopRequireDefault(require("./visitors/open-api-3-1/security-requirement"));

var _components = _interopRequireDefault(require("./visitors/open-api-3-1/components"));

var _SchemasVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/components/SchemasVisitor"));

var _schema = _interopRequireDefault(require("./visitors/open-api-3-1/schema"));

var _paths = _interopRequireDefault(require("./visitors/open-api-3-1/paths"));

var _pathItem = _interopRequireDefault(require("./visitors/open-api-3-1/path-item"));

var _$RefVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/path-item/$RefVisitor"));

var _SummaryVisitor2 = _interopRequireDefault(require("./visitors/open-api-3-1/path-item/SummaryVisitor"));

var _DescriptionVisitor4 = _interopRequireDefault(require("./visitors/open-api-3-1/path-item/DescriptionVisitor"));

var _ParametersVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/ParametersVisitor"));

var _operation = _interopRequireDefault(require("./visitors/open-api-3-1/operation"));

var _TagsVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/operation/TagsVisitor"));

var _SummaryVisitor3 = _interopRequireDefault(require("./visitors/open-api-3-1/operation/SummaryVisitor"));

var _DescriptionVisitor5 = _interopRequireDefault(require("./visitors/open-api-3-1/operation/DescriptionVisitor"));

var _OperationIdVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/operation/OperationIdVisitor"));

var _DeprecatedVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/operation/DeprecatedVisitor"));

var _RequestBodyVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/operation/RequestBodyVisitor"));

var _CallbacksVisitor = _interopRequireDefault(require("./visitors/open-api-3-1/operation/CallbacksVisitor"));

var _externalDocumentation = _interopRequireDefault(require("./visitors/open-api-3-1/external-documentation"));

var _DescriptionVisitor6 = _interopRequireDefault(require("./visitors/open-api-3-1/external-documentation/DescriptionVisitor"));

var _UrlVisitor4 = _interopRequireDefault(require("./visitors/open-api-3-1/external-documentation/UrlVisitor"));

var _requestBody = _interopRequireDefault(require("./visitors/open-api-3-1/request-body"));

var _reference = _interopRequireDefault(require("./visitors/open-api-3-1/reference"));

var _$RefVisitor2 = _interopRequireDefault(require("./visitors/open-api-3-1/reference/$RefVisitor"));

var _SummaryVisitor4 = _interopRequireDefault(require("./visitors/open-api-3-1/reference/SummaryVisitor"));

var _DescriptionVisitor7 = _interopRequireDefault(require("./visitors/open-api-3-1/reference/DescriptionVisitor"));

var _callback = _interopRequireDefault(require("./visitors/open-api-3-1/callback"));

var _responses = _interopRequireDefault(require("./visitors/open-api-3-1/responses"));

var _DefaultVisitor2 = _interopRequireDefault(require("./visitors/open-api-3-1/responses/DefaultVisitor"));

var _response = _interopRequireDefault(require("./visitors/open-api-3-1/response"));

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
var specification = (0, _ramda.mergeDeepRight)(_apidomParserAdapterYaml.specification, {
  visitors: {
    mapping: _generics.MappingVisitor,
    document: {
      $visitor: _DocumentVisitor["default"],
      objects: {
        OpenApi: {
          $visitor: _openApi["default"],
          fixedFields: {
            openapi: _OpenapiVisitor["default"],
            info: {
              $ref: '#/visitors/document/objects/Info'
            },
            servers: _ServersVisitor["default"],
            components: {
              $ref: '#/visitors/document/objects/Components'
            },
            security: _SecurityVisitor["default"],
            paths: {
              $ref: '#/visitors/document/objects/Paths'
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
            identifier: _IdentifierVisitor["default"],
            url: _UrlVisitor2["default"]
          }
        },
        Server: {
          $visitor: _server["default"],
          fixedFields: {
            url: _UrlVisitor3["default"],
            description: _DescriptionVisitor2["default"],
            variables: _VariablesVisitor["default"]
          }
        },
        ServerVariable: {
          $visitor: _serverVariable["default"],
          fixedFields: {
            "enum": _EnumVisitor["default"],
            "default": _DefaultVisitor["default"],
            description: _DescriptionVisitor3["default"]
          }
        },
        Schema: {
          $visitor: _schema["default"]
        },
        Components: {
          $visitor: _components["default"],
          fixedFields: {
            schemas: _SchemasVisitor["default"]
          }
        },
        Paths: {
          $visitor: _paths["default"]
        },
        PathItem: {
          $visitor: _pathItem["default"],
          fixedFields: {
            $ref: _$RefVisitor["default"],
            summary: _SummaryVisitor2["default"],
            description: _DescriptionVisitor4["default"],
            get: {
              $ref: '#/visitors/document/objects/Operation'
            },
            put: {
              $ref: '#/visitors/document/objects/Operation'
            },
            post: {
              $ref: '#/visitors/document/objects/Operation'
            },
            "delete": {
              $ref: '#/visitors/document/objects/Operation'
            },
            options: {
              $ref: '#/visitors/document/objects/Operation'
            },
            head: {
              $ref: '#/visitors/document/objects/Operation'
            },
            patch: {
              $ref: '#/visitors/document/objects/Operation'
            },
            trace: {
              $ref: '#/visitors/document/objects/Operation'
            },
            servers: _ServersVisitor["default"],
            parameters: _ParametersVisitor["default"]
          }
        },
        Operation: {
          $visitor: _operation["default"],
          fixedFields: {
            tags: _TagsVisitor["default"],
            summary: _SummaryVisitor3["default"],
            description: _DescriptionVisitor5["default"],
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation'
            },
            operationId: _OperationIdVisitor["default"],
            parameters: _ParametersVisitor["default"],
            requestBody: _RequestBodyVisitor["default"],
            responses: {
              $ref: '#/visitors/document/objects/Responses'
            },
            callbacks: _CallbacksVisitor["default"],
            deprecated: _DeprecatedVisitor["default"],
            security: _SecurityVisitor["default"],
            servers: _ServersVisitor["default"]
          }
        },
        ExternalDocumentation: {
          $visitor: _externalDocumentation["default"],
          fixedFields: {
            description: _DescriptionVisitor6["default"],
            url: _UrlVisitor4["default"]
          }
        },
        RequestBody: {
          $visitor: _requestBody["default"],
          fixedFields: {}
        },
        Responses: {
          $visitor: _responses["default"],
          fixedFields: {
            "default": _DefaultVisitor2["default"]
          }
        },
        Response: {
          $visitor: _response["default"],
          fixedFields: {}
        },
        Callback: {
          $visitor: _callback["default"],
          fixedFields: {}
        },
        Reference: {
          $visitor: _reference["default"],
          fixedFields: {
            $ref: _$RefVisitor2["default"],
            summary: _SummaryVisitor4["default"],
            description: _DescriptionVisitor7["default"]
          }
        },
        SecurityRequirement: {
          $visitor: _securityRequirement["default"]
        }
      },
      extension: _SpecificationExtensionVisitor["default"]
    }
  }
});
var _default = specification;
exports["default"] = _default;