import StreamVisitor from './visitors/StreamVisitor';
import DocumentVisitor from './visitors/DocumentVisitor';

import ErrorVisitor from './visitors/ErrorVisitor';
import { ScalarVisitor, MappingVisitor, SequenceVisitor, KindVisitor } from './visitors/generics';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
import OpenApi3_1Visitor from './visitors/open-api-3-1';
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
    scalar: ScalarVisitor,
    mapping: MappingVisitor,
    sequence: SequenceVisitor,
    kind: KindVisitor,
    error: ErrorVisitor,
    stream: {
      $visitor: StreamVisitor,
    },
    document: {
      $visitor: DocumentVisitor,
      objects: {
        OpenApi: {
          $visitor: OpenApi3_1Visitor,
          fixedFields: {
            openapi: OpenapiVisitor,
            info: {
              $ref: '#/visitors/document/objects/Info',
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
      },
      extension: SpecificationExtensionVisitor,
    },
  },
};

export default specification;
