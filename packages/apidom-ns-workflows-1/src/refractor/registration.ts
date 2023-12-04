import WorkflowsSpecification1Element from '../elements/WorkflowsSpecification1';
import WorkflowsSpecElement from '../elements/WorkflowsSpec';
import InfoElement from '../elements/Info';
import SourceDescriptionElement from '../elements/SourceDescription';
import WorkflowElement from '../elements/Workflow';
import StepElement from '../elements/Step';
import ParameterElement from '../elements/Parameter';
import SuccessActionElement from '../elements/SuccessAction';
import FailureActionElement from '../elements/FailureAction';
import ComponentsElement from '../elements/Components';
import CriterionElement from '../elements/Criterion';
import ReferenceElement from '../elements/Reference';
import JSONSchemaElement from '../elements/JSONSchema';
import { createRefractor } from './index';

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
