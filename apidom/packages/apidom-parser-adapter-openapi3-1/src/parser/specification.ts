import DocumentVisitor from './visitors/DocumentVisitor';
import CommentVisitor from './visitors/CommentVisitor';
import OpenApi3_1Visitor from './visitors/OpenApi3-1Visitor';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
import OpenapiVisitor from './visitors/OpenapiVisitor';
import InfoVisitor from './visitors/info';
import InfoTitleVisitor from './visitors/info/TitleVisitor';
import InfoDescriptionVisitor from './visitors/info/DescriptionVisitor';
import InfoSummaryVisitor from './visitors/info/SummaryVisitor';
import InfoTermsOfServiceVisitor from './visitors/info/TermsOfServiceVisitor';
import InfoVersionVisitor from './visitors/info/VersionVisitor';
import ContactVisitor from './visitors/info/contact';
import ContactNameVisitor from './visitors/info/contact/NameVisitor';
import ContactUrlVisitor from './visitors/info/contact/UrlVisitor';
import ContactEmailVisitor from './visitors/info/contact/EmailVisitor';
import LicenseVisitor from './visitors/info/license';
import LicenseNameVisitor from './visitors/info/license/NameVisitor';
import LicenseIdentifierVisitor from './visitors/info/license/IdentifierVisitor';
import LicenseUrlVisitor from './visitors/info/license/UrlVisitor';
import ServersVisitor from './visitors/ServersVisitor';
import ServerVisitor from './visitors/server';
import ServerUrlVisitor from './visitors/server/UrlVisitor';
import ServerDescriptionVisitor from './visitors/server/DescriptionVisitor';
import ServerVariablesVisitor from './visitors/server/VariablesVisitor';
import ServerVariableVisitor from './visitors/server-variable';
import ServerVariableEnumVisitor from './visitors/server-variable/EnumVisitor';
import ServerVariableDefaultVisitor from './visitors/server-variable/DefaultVisitor';
import ServerVariableDescriptionVisitor from './visitors/server-variable/DescriptionVisitor';
import ComponentsVisitor from './visitors/components';
import SchemasVisitor from './visitors/components/SchemasVisitor';
import SchemaVisitor from './visitors/SchemaVisitor';
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
