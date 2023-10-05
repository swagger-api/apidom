import FallbackVisitor from './visitors/FallbackVisitor';
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
        SecurityRequirement: {
          $visitor: SecurityRequirementVisitor,
        },
        Scopes: {
          $visitor: ScopesVisitor,
        },
      },
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
};

export default specification;
