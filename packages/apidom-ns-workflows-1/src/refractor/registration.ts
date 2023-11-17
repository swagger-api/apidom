import WorkflowsSpecification1Element from '../elements/WorkflowsSpecification1';
import WorkflowsSpecElement from '../elements/WorkflowsSpec';
import InfoElement from '../elements/Info';
import SourceDescriptionElement from '../elements/SourceDescription';
import SuccessActionElement from '../elements/SuccessAction';
import CriterionElement from '../elements/Criterion';
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
SuccessActionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'SuccessAction',
  '$visitor',
]);
CriterionElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'Criterion',
  '$visitor',
]);

export {
  WorkflowsSpecification1Element,
  WorkflowsSpecElement,
  InfoElement,
  SourceDescriptionElement,
  SuccessActionElement,
  CriterionElement,
};
