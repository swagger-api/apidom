import FallbackVisitor from './visitors/FallbackVisitor';
import XmlVisitor from './visitors/open-api-2/xml';
import SecurityDefinitionsVisitor from './visitors/open-api-2/security-definitions';
import SecuritySchemeVisitor from './visitors/open-api-2/security-scheme';
import ScopesVisitor from './visitors/open-api-2/scopes';
import SecurityRequirementVisitor from './visitors/open-api-2/security-requirement';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';

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
        XML: {
          $visitor: XmlVisitor,
          fixedFields: {
            name: FallbackVisitor,
            namespace: FallbackVisitor,
            prefix: FallbackVisitor,
            attribute: FallbackVisitor,
            wrapped: FallbackVisitor,
          },
        },
        SecurityDefinitions: {
          $visitor: SecurityDefinitionsVisitor,
        },
        SecurityScheme: {
          $visitor: SecuritySchemeVisitor,
          fixedFields: {
            type: FallbackVisitor,
            description: FallbackVisitor,
            name: FallbackVisitor,
            in: FallbackVisitor,
            flow: FallbackVisitor,
            authorizationUrl: FallbackVisitor,
            token: FallbackVisitor,
            scopes: {
              $ref: '#/visitors/document/objects/Scopes',
            },
          },
        },
        Scopes: {
          $visitor: ScopesVisitor,
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
