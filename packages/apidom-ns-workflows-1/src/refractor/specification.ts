import { omit } from 'ramda';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-1';

import WorkflowsSpecificationVisitor from './visitors/workflows-1';
import WorkflowsSpecVisitor from './visitors/workflows-1/WorkflowsSpecVisitor';
import InfoVisitor from './visitors/workflows-1/info';
import InfoVersionVisitor from './visitors/workflows-1/info/VersionVisitor';
import SourceDescriptionVisitor from './visitors/workflows-1/source-description';
import SourceDescriptionUrlVisitor from './visitors/workflows-1/source-description/UrlVisitor';
import WorkflowVisitor from './visitors/workflows-1/workflow';
import WorkflowStepsVisitor from './visitors/workflows-1/workflow/StepsVisitor';
import workflowOutputsVisitor from './visitors/workflows-1/workflow/OutputsVisitor';
import StepVisitor from './visitors/workflows-1/step';
import StepOutputsVisitor from './visitors/workflows-1/step/OutputsVisitor';
import StepParametersVisitor from './visitors/workflows-1/step/ParametersVisitor';
import StepDependsOnVisitor from './visitors/workflows-1/step/DependsOnVisitor';
import StepSuccessCriteriaVisitor from './visitors/workflows-1/step/SuccessCriteriaVisitor';
import StepOnSuccessVisitor from './visitors/workflows-1/step/OnSuccessVisitor';
import StepOnFailureVisitor from './visitors/workflows-1/step/OnFailureVisitor';
import ParameterVisitor from './visitors/workflows-1/parameter';
import SourceDescriptionsVisitor from './visitors/workflows-1/SourceDescriptionsVisitor';
import WorkflowsVisitor from './visitors/workflows-1/WorkflowsVisitor';
import SuccessActionVisitor from './visitors/workflows-1/success-action';
import SuccessActionCriteriaVisitor from './visitors/workflows-1/SuccessActionCriteriaVisitor';
import FailureActionVisitor from './visitors/workflows-1/failure-action';
import FailureActionCriteriaVisitor from './visitors/workflows-1/FailureActionCriteriaVisitor';
import ComponentsVisitor from './visitors/workflows-1/components';
import ComponentsInputsVisitor from './visitors/workflows-1/components/InputsVisitor';
import ComponentsParametersVisitor from './visitors/workflows-1/components/ParametersVisitor';
import CriterionVisitor from './visitors/workflows-1/criterion';
import ReferenceVisitor from './visitors/workflows-1/reference';
import Reference$RefVisitor from './visitors/workflows-1/reference/$RefVisitor';
import JSONSchemaVisitor from './visitors/workflows-1/json-schema';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor';
import FallbackVisitor from './visitors/FallbackVisitor';

/**
 * Specification object allows us to have complete control over visitors
 * when traversing the ApiDOM.
 * Specification also allows us to create amended refractors from
 * existing ones by manipulating it.
 *
 * Note: Specification object allows to use absolute internal JSON pointers.
 */

const { fixedFields: schemaFixedFields } = OpenApi3_1Specification.visitors.document.objects.Schema;
const jsonSchemaFixedFields = omit(
  ['discriminator', 'xml', 'externalDocs', 'example'],
  schemaFixedFields,
); // getting rid of OAS base dialect keywords

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
            workflows: WorkflowsVisitor,
            components: {
              $ref: '#/visitors/document/objects/Components',
            },
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
        Workflow: {
          $visitor: WorkflowVisitor,
          fixedFields: {
            workflowId: { $ref: '#/visitors/value' },
            summary: { $ref: '#/visitors/value' },
            description: { $ref: '#/visitors/value' },
            inputs: JSONSchemaVisitor,
            steps: WorkflowStepsVisitor,
            outputs: workflowOutputsVisitor,
          },
        },
        Step: {
          $visitor: StepVisitor,
          fixedFields: {
            description: { $ref: '#/visitors/value' },
            stepId: { $ref: '#/visitors/value' },
            operationId: { $ref: '#/visitors/value' },
            operationRef: { $ref: '#/visitors/value' },
            workflowId: { $ref: '#/visitors/value' },
            parameters: StepParametersVisitor,
            dependsOn: StepDependsOnVisitor,
            successCriteria: StepSuccessCriteriaVisitor,
            onSuccess: StepOnSuccessVisitor,
            onFailure: StepOnFailureVisitor,
            outputs: StepOutputsVisitor,
          },
        },
        Parameter: {
          $visitor: ParameterVisitor,
          fixedFields: {
            name: { $ref: '#/visitors/value' },
            in: { $ref: '#/visitors/value' },
            style: { $ref: '#/visitors/value' },
            target: { $ref: '#/visitors/value' },
            value: { $ref: '#/visitors/value' },
          },
        },
        SuccessAction: {
          $visitor: SuccessActionVisitor,
          fixedFields: {
            type: { $ref: '#/visitors/value' },
            workflowId: { $ref: '#/visitors/value' },
            stepId: { $ref: '#/visitors/value' },
            criteria: SuccessActionCriteriaVisitor,
          },
        },
        FailureAction: {
          $visitor: FailureActionVisitor,
          fixedFields: {
            type: { $ref: '#/visitors/value' },
            workflowId: { $ref: '#/visitors/value' },
            stepId: { $ref: '#/visitors/value' },
            retryAfter: { $ref: '#/visitors/value' },
            retryLimit: { $ref: '#/visitors/value' },
            criteria: FailureActionCriteriaVisitor,
          },
        },
        Components: {
          $visitor: ComponentsVisitor,
          fixedFields: {
            inputs: ComponentsInputsVisitor,
            parameters: ComponentsParametersVisitor,
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
        Reference: {
          $visitor: ReferenceVisitor,
          fixedFields: {
            $ref: Reference$RefVisitor,
            value: { $ref: '#/visitors/value' },
          },
        },
        Schema: {
          /**
           * Internally the fixed field visitors are using references to `/document/objects/Schema`.
           * Schema spec make sure it's pointing to our JSONSchema visitor and basically acts like
           * an alias for it.
           */
          $visitor: JSONSchemaVisitor,
          fixedFields: jsonSchemaFixedFields,
        },
        JSONSchema: {
          $visitor: JSONSchemaVisitor,
          fixedFields: jsonSchemaFixedFields,
        },
      },
      extension: {
        $visitor: SpecificationExtensionVisitor,
      },
    },
  },
} as const;

export default specification;
