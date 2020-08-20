import DocumentVisitor from './visitors/DocumentVisitor';
import AsyncApi2_0Visitor from './visitors/async-api-2-0';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
import AsyncapiVisitor from './visitors/async-api-2-0/AsyncapiVisitor';
import IdentifierVisitor from './visitors/async-api-2-0/IdentifierVisitor';
import InfoVisitor from './visitors/async-api-2-0/info';
import InfoTitleVisitor from './visitors/async-api-2-0/info/TitleVisitor';
import InfoDescriptionVisitor from './visitors/async-api-2-0/info/DescriptionVisitor';
import InfoSummaryVisitor from './visitors/async-api-2-0/info/SummaryVisitor';
import InfoTermsOfServiceVisitor from './visitors/async-api-2-0/info/TermsOfServiceVisitor';
import InfoVersionVisitor from './visitors/async-api-2-0/info/VersionVisitor';
import ContactVisitor from './visitors/async-api-2-0/contact';
import ContactNameVisitor from './visitors/async-api-2-0/contact/NameVisitor';
import ContactUrlVisitor from './visitors/async-api-2-0/contact/UrlVisitor';
import ContactEmailVisitor from './visitors/async-api-2-0/contact/EmailVisitor';
import LicenseVisitor from './visitors/async-api-2-0/license';
import LicenseNameVisitor from './visitors/async-api-2-0/license/NameVisitor';
import LicenseUrlVisitor from './visitors/async-api-2-0/license/UrlVisitor';
import ErrorVisitor from './visitors/ErrorVisitor';
import { ValueVisitor, ObjectVisitor, ArrayVisitor } from './visitors/generics';
import SchemaVisitor from './visitors/async-api-2-0/SchemaVisitor';
import ComponentsVisitor from './visitors/async-api-2-0/components';
import SchemasVisitor from './visitors/async-api-2-0/components/SchemasVisitor';

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
    error: ErrorVisitor,
    document: {
      $visitor: DocumentVisitor,
      objects: {
        AsyncApi: {
          $visitor: AsyncApi2_0Visitor,
          fields: {
            asyncapi: AsyncapiVisitor,
            id: IdentifierVisitor,
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
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
            url: LicenseUrlVisitor,
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
