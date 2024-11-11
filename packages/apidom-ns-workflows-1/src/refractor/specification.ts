import { omit } from 'ramda';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-1';

import WorkflowsSpecificationVisitor from './visitors/workflows-1/index.ts';
import WorkflowsSpecVisitor from './visitors/workflows-1/WorkflowsSpecVisitor.ts';
import InfoVisitor from './visitors/workflows-1/info/index.ts';
import InfoVersionVisitor from './visitors/workflows-1/info/VersionVisitor.ts';
import SourceDescriptionVisitor from './visitors/workflows-1/source-description/index.ts';
import SourceDescriptionUrlVisitor from './visitors/workflows-1/source-description/UrlVisitor.ts';
import WorkflowVisitor from './visitors/workflows-1/workflow/index.ts';
import WorkflowStepsVisitor from './visitors/workflows-1/workflow/StepsVisitor.ts';
import workflowOutputsVisitor from './visitors/workflows-1/workflow/OutputsVisitor.ts';
import StepVisitor from './visitors/workflows-1/step/index.ts';
import StepOutputsVisitor from './visitors/workflows-1/step/OutputsVisitor.ts';
import StepParametersVisitor from './visitors/workflows-1/step/ParametersVisitor.ts';
import StepDependsOnVisitor from './visitors/workflows-1/step/DependsOnVisitor.ts';
import StepSuccessCriteriaVisitor from './visitors/workflows-1/step/SuccessCriteriaVisitor.ts';
import StepOnSuccessVisitor from './visitors/workflows-1/step/OnSuccessVisitor.ts';
import StepOnFailureVisitor from './visitors/workflows-1/step/OnFailureVisitor.ts';
import ParameterVisitor from './visitors/workflows-1/parameter/index.ts';
import SourceDescriptionsVisitor from './visitors/workflows-1/SourceDescriptionsVisitor.ts';
import WorkflowsVisitor from './visitors/workflows-1/WorkflowsVisitor.ts';
import SuccessActionVisitor from './visitors/workflows-1/success-action/index.ts';
import SuccessActionCriteriaVisitor from './visitors/workflows-1/SuccessActionCriteriaVisitor.ts';
import FailureActionVisitor from './visitors/workflows-1/failure-action/index.ts';
import FailureActionCriteriaVisitor from './visitors/workflows-1/FailureActionCriteriaVisitor.ts';
import ComponentsVisitor from './visitors/workflows-1/components/index.ts';
import ComponentsInputsVisitor from './visitors/workflows-1/components/InputsVisitor.ts';
import ComponentsParametersVisitor from './visitors/workflows-1/components/ParametersVisitor.ts';
import CriterionVisitor from './visitors/workflows-1/criterion/index.ts';
import ReferenceVisitor from './visitors/workflows-1/reference/index.ts';
import Reference$RefVisitor from './visitors/workflows-1/reference/$RefVisitor.ts';
import JSONSchemaVisitor from './visitors/workflows-1/json-schema/index.ts';
import SpecificationExtensionVisitor from './visitors/SpecificationExtensionVisitor.ts';
import FallbackVisitor from './visitors/FallbackVisitor.ts';

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
