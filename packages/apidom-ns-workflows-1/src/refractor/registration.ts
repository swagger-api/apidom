import WorkflowsSpecificationElement from '../elements/WorkflowsSpecification';
import WorkflowsSpecElement from '../elements/WorkflowsSpec';
import InfoElement from '../elements/Info';

InfoElement.refract = createRefractor(['visitors', 'document', 'objects', 'Info', '$visitor']);
WorkflowsSpecElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'WorkflowsSpecification',
  'fixedFields',
  'workflowsSpec',
]);
WorkflowsSpecificationElement.refract = createRefractor([
  'visitors',
  'document',
  'objects',
  'WorkflowsSpecification',
  '$visitor',
]);

export { InfoElement, WorkflowsSpecElement, WorkflowsSpecificationElement };
