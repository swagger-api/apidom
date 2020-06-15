import DocumentVisitor from './visitors/DocumentVisitor';
import CommentVisitor from './visitors/CommentVisitor';
import OpenApi3Visitor from './visitors/OpenApi3Visitor';
import OpenApiExtensionVisitor from './visitors/OpenApiExtensionVisitor';
import OpenapiVisitor from './visitors/OpenapiVisitor';
import InfoVisitor from './visitors/info';
import InfoTitleVisitor from './visitors/info/TitleVisitor';
import InfoDescriptionVisitor from './visitors/info/DescriptionVisitor';
import InfoTermsOfServiceVisitor from './visitors/info/TermsOfServiceVisitor';
import InfoVersionVisitor from './visitors/info/VersionVisitor';
import ContactVisitor from './visitors/info/contact';
import ContactNameVisitor from './visitors/info/contact/NameVisitor';
import ContactUrlVisitor from './visitors/info/contact/UrlVisitor';
import ContactEmailVisitor from './visitors/info/contact/EmailVisitor';
import LicenseVisitor from './visitors/info/license';
import LicenseNameVisitor from './visitors/info/license/NameVisitor';
import LicenseUrlVisitor from './visitors/info/license/UrlVisitor';
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
        $visitor: OpenApi3Visitor,
        openapi: OpenapiVisitor,
        info: {
          $visitor: InfoVisitor,
          title: InfoTitleVisitor,
          description: InfoDescriptionVisitor,
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
            url: LicenseUrlVisitor,
          },
        },
        components: {
          $visitor: ComponentsVisitor,
          schemas: SchemasVisitor,
        },
      },
    },
  },
};

export default specification;
