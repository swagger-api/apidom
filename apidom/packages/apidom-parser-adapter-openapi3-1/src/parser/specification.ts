import DocumentVisitor from './visitors/DocumentVisitor';
import CommentVisitor from './visitors/CommentVisitor';
import OpenApi3_1Visitor from './visitors/OpenApi3-1Visitor';
import OpenApiExtensionVisitor from './visitors/OpenApiExtensionVisitor';
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
 */
const specification = {
  visitors: {
    value: ValueVisitor,
    object: ObjectVisitor,
    array: ArrayVisitor,
    document: {
      $visitor: DocumentVisitor,
      comment: CommentVisitor,
      openApi: {
        openApiExtension: OpenApiExtensionVisitor,
        schema: SchemaVisitor,
        server: {
          $visitor: ServerVisitor,
          url: ServerUrlVisitor,
          description: ServerDescriptionVisitor,
          variables: ServerVariablesVisitor,
        },
        serverVariable: {
          $visitor: ServerVariableVisitor,
          enum: ServerVariableEnumVisitor,
          default: ServerVariableDefaultVisitor,
          description: ServerVariableDescriptionVisitor,
        },
        $visitor: OpenApi3_1Visitor,
        openapi: OpenapiVisitor,
        info: {
          $visitor: InfoVisitor,
          title: InfoTitleVisitor,
          description: InfoDescriptionVisitor,
          summary: InfoSummaryVisitor,
          termsOfService: InfoTermsOfServiceVisitor,
          version: InfoVersionVisitor,
          contact: {
            $visitor: ContactVisitor,
            name: ContactNameVisitor,
            url: ContactUrlVisitor,
            email: ContactEmailVisitor,
          },
          license: {
            $visitor: LicenseVisitor,
            name: LicenseNameVisitor,
            identifier: LicenseIdentifierVisitor,
            url: LicenseUrlVisitor,
          },
        },
        servers: ServersVisitor,
        components: {
          $visitor: ComponentsVisitor,
          schemas: SchemasVisitor,
        },
      },
    },
  },
};

export default specification;
