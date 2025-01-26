import { JSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2020-12';

import WorkflowsSpecification1Element from '../elements/WorkflowsSpecification1.ts';
import WorkflowsSpecElement from '../elements/WorkflowsSpec.ts';
import InfoElement from '../elements/Info.ts';
import SourceDescriptionElement from '../elements/SourceDescription.ts';
import WorkflowElement from '../elements/Workflow.ts';
import StepElement from '../elements/Step.ts';
import ParameterElement from '../elements/Parameter.ts';
import SuccessActionElement from '../elements/SuccessAction.ts';
import FailureActionElement from '../elements/FailureAction.ts';
import ComponentsElement from '../elements/Components.ts';
import CriterionElement from '../elements/Criterion.ts';
import ReferenceElement from '../elements/Reference.ts';
import { createRefractor } from './index.ts';

InfoElement.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
WorkflowsSpecElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'WorkflowsSpecification',
  'fixedFields',
  'workflowsSpec',
]);
WorkflowsSpecification1Element.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'WorkflowsSpecification',
  '$visitor',
]);
SourceDescriptionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SourceDescription',
  '$visitor',
]);
WorkflowElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Workflow',
  '$visitor',
]);
StepElement.refract = createRefractor(['visitors', 'document', 'objects', 'Step', '$visitor']);
ParameterElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Parameter',
  '$visitor',
]);
SuccessActionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SuccessAction',
  '$visitor',
]);
FailureActionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'FailureAction',
  '$visitor',
]);
ComponentsElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Components',
  '$visitor',
]);
CriterionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Criterion',
  '$visitor',
]);
ReferenceElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Reference',
  '$visitor',
]);
JSONSchemaElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'JSONSchema',
  '$visitor',
]);

export {
  WorkflowsSpecification1Element,
  WorkflowsSpecElement,
  InfoElement,
  SourceDescriptionElement,
  WorkflowElement,
  StepElement,
  ParameterElement,
  SuccessActionElement,
  FailureActionElement,
  ComponentsElement,
  CriterionElement,
  ReferenceElement,
  JSONSchemaElement,
};
