import DocumentVisitor from './visitors/DocumentVisitor';
import CommentVisitor from './visitors/CommentVisitor';
import OpenApi3_1Visitor from './visitors/open-api-3-1';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
import OpenapiVisitor from './visitors/open-api-3-1/OpenapiVisitor';
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
import ServersVisitor from './visitors/open-api-3-1/ServersVisitor';
import ServerVisitor from './visitors/open-api-3-1/server';
import ServerUrlVisitor from './visitors/open-api-3-1/server/UrlVisitor';
import ServerDescriptionVisitor from './visitors/open-api-3-1/server/DescriptionVisitor';
import ServerVariablesVisitor from './visitors/open-api-3-1/server/VariablesVisitor';
import ServerVariableVisitor from './visitors/open-api-3-1/server-variable';
import ServerVariableEnumVisitor from './visitors/open-api-3-1/server-variable/EnumVisitor';
import ServerVariableDefaultVisitor from './visitors/open-api-3-1/server-variable/DefaultVisitor';
import ServerVariableDescriptionVisitor from './visitors/open-api-3-1/server-variable/DescriptionVisitor';
import ComponentsVisitor from './visitors/open-api-3-1/components';
import SchemasVisitor from './visitors/open-api-3-1/components/SchemasVisitor';
import SchemaVisitor from './visitors/open-api-3-1/SchemaVisitor';
import { ValueVisitor, ObjectVisitor, ArrayVisitor } from './visitors/generics';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the AST.
 * Specification also allows us to create new parser adapters from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use relative JSON pointers.
 */
const specification = {
  visitors: {
    value: ValueVisitor,
    object: ObjectVisitor,
    array: ArrayVisitor,
    document: {
      $visitor: DocumentVisitor,
      comment: CommentVisitor,
      objects: {
        OpenApi: {
          $visitor: OpenApi3_1Visitor,
          fields: {
            openapi: OpenapiVisitor,
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
            servers: ServersVisitor,
            components: {
              $ref: '#/visitors/document/objects/Components',
            },
          },
        },
        Info: {
          $visitor: InfoVisitor,
          fields: {
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
          fields: {
            name: ContactNameVisitor,
            url: ContactUrlVisitor,
            email: ContactEmailVisitor,
          },
        },
        License: {
          $visitor: LicenseVisitor,
          fields: {
            name: LicenseNameVisitor,
            identifier: LicenseIdentifierVisitor,
            url: LicenseUrlVisitor,
          },
        },
        Server: {
          $visitor: ServerVisitor,
          fields: {
            url: ServerUrlVisitor,
            description: ServerDescriptionVisitor,
            variables: ServerVariablesVisitor,
          },
        },
        ServerVariable: {
          $visitor: ServerVariableVisitor,
          fields: {
            enum: ServerVariableEnumVisitor,
            default: ServerVariableDefaultVisitor,
            description: ServerVariableDescriptionVisitor,
          },
        },
        Schema: {
          $visitor: SchemaVisitor,
        },
        Components: {
          $visitor: ComponentsVisitor,
          fields: {
            schemas: SchemasVisitor,
          },
        },
      },
      extension: SpecificationExtensionVisitor,
    },
  },
};

export default specification;
