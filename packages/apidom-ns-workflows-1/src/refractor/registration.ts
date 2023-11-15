import WorkflowsSpecification1Element from '../elements/WorkflowsSpecification1';
import WorkflowsSpecElement from '../elements/WorkflowsSpec';
import InfoElement from '../elements/Info';
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

export { WorkflowsSpecification1Element, WorkflowsSpecElement, InfoElement };
