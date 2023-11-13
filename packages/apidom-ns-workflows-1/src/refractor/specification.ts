// import { specificationObj as JSONSchemaDraft7Specification } from '@swagger-api/apidom-ns-json-schema-draft-7';

import WorkflowsSpecificationVisitor from './visitors/workflows-1/index';
import WorkflowsSpecVisitor from './visitors/workflows-1/WorkflowsSpecVisitor';
import InfoVisitor from './visitors/workflows-1/info';
import InfoTitleVisitor from './visitors/workflows-1/info/TitleVisitor';
import InfoDescriptionVisitor from './visitors/workflows-1/info/DescriptionVisitor';
import InfoSummaryVisitor from './visitors/workflows-1/info/SummaryVisitor';
import InfoVersionVisitor from './visitors/workflows-1/info/VersionVisitor';
import FallbackVisitor from './visitors/FallbackVisitor';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 */

// const { fixedFields: jsonSchemaFixedFields } = JSONSchemaDraft7Specification.visitors.document.objects.JSONSchema;

const specification = {
  visitors: {
    value: FallbackVisitor,
    document: {
      objects: {
        WorkflowsSpecification: {
          $visitor: WorkflowsSpecificationVisitor,
          fixedFields: {
            workflowSpec: WorkflowsSpecVisitor,
            info: {
              $ref: '#/visitors/document/object/Info',
            },
          },
        },
        Info: {
          $visitor: InfoVisitor,
          fixedFields: {
            title: InfoTitleVisitor,
            summary: InfoSummaryVisitor,
            description: InfoDescriptionVisitor,
            version: InfoVersionVisitor,
          },
        },
      },
    },
  },
};

export default specification;
