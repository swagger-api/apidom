import WorkflowsSpecificationVisitor from './visitors/workflows-1/index';
import WorkflowsSpecVisitor from './visitors/workflows-1/WorkflowsSpecVisitor';
import InfoVisitor from './visitors/workflows-1/info';
import InfoVersionVisitor from './visitors/workflows-1/info/VersionVisitor';
import SourceDescriptionVisitor from './visitors/workflows-1/source-description';
import SourceDescriptionUrlVisitor from './visitors/workflows-1/source-description/UrlVisitor';
import SourceDescriptionsVisitor from './visitors/workflows-1/SourceDescriptionsVisitor';
import CriterionVisitor from './visitors/workflows-1/criterion';
import FallbackVisitor from './visitors/FallbackVisitor';
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
        WorkflowsSpecification: {
          $visitor: WorkflowsSpecificationVisitor,
          fixedFields: {
            workflowSpec: WorkflowsSpecVisitor,
            info: {
              $ref: '#/visitors/document/objects/Info',
            },
            sourceDescriptions: SourceDescriptionsVisitor,
          },
        },
        Info: {
          $visitor: InfoVisitor,
          fixedFields: {
            title: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            version: InfoVersionVisitor,
          },
        },
        SourceDescription: {
          $visitor: SourceDescriptionVisitor,
          fixedFields: {
            name: { $ref: '#/visitors/value' },
            url: SourceDescriptionUrlVisitor,
            type: { $ref: '#/visitors/value' },
          },
        },
        Criterion: {
          $visitor: CriterionVisitor,
          fixedFields: {
            context: { $ref: '#/visitors/value' },
            condition: { $ref: '#/visitors/value' },
            type: { $ref: '#/visitors/value' },
          },
        },
      },
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
};

export default specification;
