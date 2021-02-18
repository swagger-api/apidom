import OpenApi3_1Visitor from './visitors/open-api-3-1';
import OpenapiVisitor from './visitors/open-api-3-1/OpenapiVisitor';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
import InfoVisitor from './visitors/open-api-3-1/info';
import InfoTitleVisitor from './visitors/open-api-3-1/info/TitleVisitor';
import InfoDescriptionVisitor from './visitors/open-api-3-1/info/DescriptionVisitor';
import InfoSummaryVisitor from './visitors/open-api-3-1/info/SummaryVisitor';
import InfoTermsOfServiceVisitor from './visitors/open-api-3-1/info/TermsOfServiceVisitor';
import InfoVersionVisitor from './visitors/open-api-3-1/info/VersionVisitor';
import ContactVisitor from './visitors/open-api-3-1/contact';
import ContactNameVisitor from './visitors/open-api-3-1/contact/NameVisitor';
import ContactUrlVisitor from './visitors/open-api-3-1/contact/UrlVisitor';
import ContactEmailVisitor from './visitors/open-api-3-1/contact/EmailVisitor';
import LicenseVisitor from './visitors/open-api-3-1/license';
import LicenseNameVisitor from './visitors/open-api-3-1/license/NameVisitor';
import LicenseIdentifierVisitor from './visitors/open-api-3-1/license/IdentifierVisitor';
import LicenseUrlVisitor from './visitors/open-api-3-1/license/UrlVisitor';
import ServerVisitor from './visitors/open-api-3-1/server';
import ServerUrlVisitor from './visitors/open-api-3-1/server/UrlVisitor';
import ServerDescriptionVisitor from './visitors/open-api-3-1/server/DescriptionVisitor';
import ServersVisitor from './visitors/open-api-3-1/ServersVisitor';
import ServerVariableVisitor from './visitors/open-api-3-1/server-variable';
import ServerVariableEnumVisitor from './visitors/open-api-3-1/server-variable/EnumVisitor';
import ServerVariableDefaultVisitor from './visitors/open-api-3-1/server-variable/DefaultVisitor';
import ServerVariableDescriptionVisitor from './visitors/open-api-3-1/server-variable/DescriptionVisitor';
import ServerVariablesVisitor from './visitors/open-api-3-1/server/VariablesVisitor';
import FallbackVisitor from './visitors/FallbackVisitor';
import SecurityRequirementVisitor from './visitors/open-api-3-1/security-requirement';
import SecurityVisitor from './visitors/open-api-3-1/SecurityVisitor';
import ComponentsVisitor from './visitors/open-api-3-1/components';
import ReferenceVisitor from './visitors/open-api-3-1/reference';
import Reference$RefVisitor from './visitors/open-api-3-1/reference/$RefVisitor';
import ReferenceSummaryVisitor from './visitors/open-api-3-1/reference/SummaryVisitor';
import ReferenceDescriptionVisitor from './visitors/open-api-3-1/reference/DescriptionVisitor';
import ParameterVisitor from './visitors/open-api-3-1/parameter';
import ParameterNameVisitor from './visitors/open-api-3-1/parameter/NameVisitor';
import ParameterInVisitor from './visitors/open-api-3-1/parameter/InVisitor';
import ParameterDescriptionVisitor from './visitors/open-api-3-1/parameter/DescriptionVisitor';
import ParameterRequiredVisitor from './visitors/open-api-3-1/parameter/RequiredVisitor';
import ParameterDeprecatedVisitor from './visitors/open-api-3-1/parameter/DeprecatedVisitor';
import ParameterAllowEmptyValueVisitor from './visitors/open-api-3-1/parameter/AllowEmptyValueVisitor';
import ParameterStyleVisitor from './visitors/open-api-3-1/parameter/StyleVisitor';
import ParameterExplodeVisitor from './visitors/open-api-3-1/parameter/ExplodeVisitor';
import ParameterAllowReservedVisitor from './visitors/open-api-3-1/parameter/AllowReservedVisitor';
import SchemaVisitor from './visitors/open-api-3-1/schema';
import ParameterExampleVisitor from './visitors/open-api-3-1/parameter/ExampleVisitor';
import ExamplesVisitor from './visitors/open-api-3-1/ExamplesVisitor';
import ContentVisitor from './visitors/open-api-3-1/ContentVisitor';
import ComponentSchemasVisitor from './visitors/open-api-3-1/components/SchemasVisitor';
import ComponentParametersVisitor from './visitors/open-api-3-1/components/ParametersVisitor';
import ExternalDocumentationVisitor from './visitors/open-api-3-1/external-documentation';
import ExternalDocumentationDescriptionVisitor from './visitors/open-api-3-1/external-documentation/DescriptionVisitor';
import ExternalDocumentationUrlVisitor from './visitors/open-api-3-1/external-documentation/UrlVisitor';
import PathsVisitor from './visitors/open-api-3-1/paths';
import RequestBodyVisitor from './visitors/open-api-3-1/request-body';
import CallbackVisitor from './visitors/open-api-3-1/callback';
import ResponseVisitor from './visitors/open-api-3-1/response';
import ResponsesVisitor from './visitors/open-api-3-1/responses';
import ResponsesDefaultVisitor from './visitors/open-api-3-1/responses/DefaultVisitor';
import OperationVisitor from './visitors/open-api-3-1/operation';
import OperationTagsVisitor from './visitors/open-api-3-1/operation/TagsVisitor';
import OperationSummaryVisitor from './visitors/open-api-3-1/operation/SummaryVisitor';
import OperationDescriptionVisitor from './visitors/open-api-3-1/operation/DescriptionVisitor';
import OperationOperationIdVisitor from './visitors/open-api-3-1/operation/OperationIdVisitor';
import OperationRequestBodyVisitor from './visitors/open-api-3-1/operation/RequestBodyVisitor';
import OperationCallbacksVisitor from './visitors/open-api-3-1/operation/CallbacksVisitor';
import OperationDeprecatedVisitor from './visitors/open-api-3-1/operation/DeprecatedVisitor';
import ParametersVisitor from './visitors/open-api-3-1/ParametersVisitor';
import PathItemVisitor from './visitors/open-api-3-1/path-item';
import PathItem$RefVisitor from './visitors/open-api-3-1/path-item/$RefVisitor';
import PathItemSummaryVisitor from './visitors/open-api-3-1/path-item/SummaryVisitor';
import PathItemDescriptionVisitor from './visitors/open-api-3-1/path-item/DescriptionVisitor';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 */
const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        OpenApi: {
          $visitor: OpenApi3_1Visitor,
          fixedFields: {
            openapi: OpenapiVisitor,
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
            servers: ServersVisitor,
            paths: {
              $ref: '#/visitors/document/objects/Paths',
            },
            components: {
              $ref: '#/visitors/document/objects/Components',
            },
            security: SecurityVisitor,
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
          },
        },
        Info: {
          $visitor: InfoVisitor,
          fixedFields: {
            title: InfoTitleVisitor,
            description: InfoDescriptionVisitor,
            summary: InfoSummaryVisitor,
            termsOfService: InfoTermsOfServiceVisitor,
            version: InfoVersionVisitor,
            contact: {
              $ref: '#/visitors/document/objects/Contact',
            },
            license: {
              $ref: '#/visitors/document/objects/License',
            },
          },
        },
        Contact: {
          $visitor: ContactVisitor,
          fixedFields: {
            name: ContactNameVisitor,
            url: ContactUrlVisitor,
            email: ContactEmailVisitor,
          },
        },
        License: {
          $visitor: LicenseVisitor,
          fixedFields: {
            name: LicenseNameVisitor,
            identifier: LicenseIdentifierVisitor,
            url: LicenseUrlVisitor,
          },
        },
        Server: {
          $visitor: ServerVisitor,
          fixedFields: {
            url: ServerUrlVisitor,
            description: ServerDescriptionVisitor,
            variables: ServerVariablesVisitor,
          },
        },
        ServerVariable: {
          $visitor: ServerVariableVisitor,
          fixedFields: {
            enum: ServerVariableEnumVisitor,
            default: ServerVariableDefaultVisitor,
            description: ServerVariableDescriptionVisitor,
          },
        },
        Components: {
          $visitor: ComponentsVisitor,
          fixedFields: {
            schemas: ComponentSchemasVisitor,
            parameters: ComponentParametersVisitor,
          },
        },
        Paths: {
          $visitor: PathsVisitor,
        },
        PathItem: {
          $visitor: PathItemVisitor,
          fixedFields: {
            $ref: PathItem$RefVisitor,
            summary: PathItemSummaryVisitor,
            description: PathItemDescriptionVisitor,
            get: {
              $ref: '#/visitors/document/objects/Operation',
            },
            put: {
              $ref: '#/visitors/document/objects/Operation',
            },
            post: {
              $ref: '#/visitors/document/objects/Operation',
            },
            delete: {
              $ref: '#/visitors/document/objects/Operation',
            },
            options: {
              $ref: '#/visitors/document/objects/Operation',
            },
            head: {
              $ref: '#/visitors/document/objects/Operation',
            },
            patch: {
              $ref: '#/visitors/document/objects/Operation',
            },
            trace: {
              $ref: '#/visitors/document/objects/Operation',
            },
            servers: ServersVisitor,
            parameters: ParametersVisitor,
          },
        },
        Operation: {
          $visitor: OperationVisitor,
          fixedFields: {
            tags: OperationTagsVisitor,
            summary: OperationSummaryVisitor,
            description: OperationDescriptionVisitor,
            externalDocs: {
              $ref: '#/visitors/document/objects/ExternalDocumentation',
            },
            operationId: OperationOperationIdVisitor,
            parameters: ParametersVisitor,
            requestBody: OperationRequestBodyVisitor,
            responses: {
              $ref: '#/visitors/document/objects/Responses',
            },
            callbacks: OperationCallbacksVisitor,
            deprecated: OperationDeprecatedVisitor,
            security: SecurityVisitor,
            servers: ServersVisitor,
          },
        },
        ExternalDocumentation: {
          $visitor: ExternalDocumentationVisitor,
          fixedFields: {
            description: ExternalDocumentationDescriptionVisitor,
            url: ExternalDocumentationUrlVisitor,
          },
        },
        Parameter: {
          $visitor: ParameterVisitor,
          fixedFields: {
            name: ParameterNameVisitor,
            in: ParameterInVisitor,
            description: ParameterDescriptionVisitor,
            required: ParameterRequiredVisitor,
            deprecated: ParameterDeprecatedVisitor,
            allowEmptyValue: ParameterAllowEmptyValueVisitor,
            style: ParameterStyleVisitor,
            explode: ParameterExplodeVisitor,
            allowReserved: ParameterAllowReservedVisitor,
            schema: SchemaVisitor,
            example: ParameterExampleVisitor,
            examples: ExamplesVisitor,
            content: ContentVisitor,
          },
        },
        RequestBody: {
          $visitor: RequestBodyVisitor,
          fixedFields: {},
        },
        Responses: {
          $visitor: ResponsesVisitor,
          fixedFields: {
            default: ResponsesDefaultVisitor,
          },
        },
        Response: {
          $visitor: ResponseVisitor,
          fixedFields: {},
        },
        Callback: {
          $visitor: CallbackVisitor,
          fixedFields: {},
        },
        Reference: {
          $visitor: ReferenceVisitor,
          fixedFields: {
            $ref: Reference$RefVisitor,
            summary: ReferenceSummaryVisitor,
            description: ReferenceDescriptionVisitor,
          },
        },
        Schema: {
          $visitor: SchemaVisitor,
        },
        SecurityRequirement: {
          $visitor: SecurityRequirementVisitor,
        },
      },
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
};

export default specification;
